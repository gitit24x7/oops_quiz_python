/**
 * src/utils/pythonRunner.js
 * 
 * DESCRIPTION:
 * Utility for loading and executing Python code in the browser via WebAssembly (Pyodide).
 * It intercepts Python's standard output (print statements) to return it to the React UI.
 * 
 * CONTENTS:
 * - `loadPyodideOnce()`: A singleton loader to ensure Pyodide only initializes once.
 * - `runPythonCode(code)`: Takes a string of Python code, executes it, and returns { result, stdout, error }.
 * 
 * CONNECTIONS:
 * - Used by `src/components/CodePlayground.jsx` when the "Run" button is clicked.
 * - Requires the global `window.loadPyodide` which we must inject or rely on npm package.
 */

let pyodideInstance = null;
let isInitializing = false;
let initPromise = null;

export async function loadPyodideOnce() {
  if (pyodideInstance) return pyodideInstance;
  
  if (isInitializing) {
    return initPromise;
  }
  
  isInitializing = true;
  initPromise = (async () => {
    // We import from python runner, pyodide is available via the package
    const { loadPyodide } = await import('pyodide');
    pyodideInstance = await loadPyodide({
      // Provide the CDN index URL matching the npm package version
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.3/full/"
    });
    return pyodideInstance;
  })();
  
  return initPromise;
}

export async function runPythonCode(code) {
  try {
    const pyodide = await loadPyodideOnce();
    
    // We bind JS functions
    let outputLines = [];
    pyodide.globals.set('print_to_js', (str) => {
        outputLines.push(str);
    });

    let traceLog = [];
    pyodide.globals.set('append_trace_to_js', (jsonStr) => {
        try {
            traceLog.push(JSON.parse(jsonStr));
        } catch(e) {}
    });

    // Pass the user code as a global variable to avoid ugly string escaping
    pyodide.globals.set('USER_CODE_STRING', code);

    // Advanced Tracing Wrapper
    const wrapperCode = `
import sys
import io
import json

class JSConsole(io.StringIO):
    def write(self, string):
        if string != "\\n":
            print_to_js(string)

sys.stdout = JSConsole()
sys.stderr = JSConsole()

def trace_calls(frame, event, arg):
    if event in ('line', 'return'):
        locs = frame.f_locals
        
        objects = {}
        variables = {}
        
        def visit(obj):
            obj_id = str(id(obj))
            if obj_id in objects:
                return obj_id
                
            t = type(obj).__name__
            
            # Only track complex containers (lists, dicts, tuples, sets) or functions
            if t not in ('list', 'dict', 'tuple', 'set', 'function') and not hasattr(obj, '__dict__'):
                return None 
            
            # Reserve to prevent infinite loops (recursion)
            node = {"type": t, "repr": repr(obj)[:100], "refs": []}
            objects[obj_id] = node 
            
            refs = []
            if t == 'dict':
                for v in obj.values():
                    ref_id = visit(v)
                    if ref_id: refs.append(ref_id)
            elif t in ('list', 'tuple', 'set'):
                for item in obj:
                    ref_id = visit(item)
                    if ref_id: refs.append(ref_id)
            elif hasattr(obj, '__dict__'):
                for v in vars(obj).values():
                    ref_id = visit(v)
                    if ref_id: refs.append(ref_id)
                    
            node["refs"] = refs
            return obj_id

        # Scan locals
        for k, v in locs.items():
            if not k.startswith('__') and k not in ('print_to_js', 'append_trace_to_js', 'JSConsole', 'trace_calls', 'run_user_code'):
                ref = visit(v)
                variables[k] = {"value": repr(v)[:50], "ref": ref, "id": str(id(v))}
        
        step = {
            "line": frame.f_lineno,
            "event": event,
            "graph": {"variables": variables, "objects": objects}
        }
        append_trace_to_js(json.dumps(step))
    return trace_calls

def run_user_code(user_code_str):
    user_globals = {}
    sys.settrace(trace_calls)
    try:
        exec(user_code_str, user_globals, user_globals)
    except Exception as e:
        print_to_js(f"Error: {e}")
    finally:
        sys.settrace(None)

run_user_code(USER_CODE_STRING)
`;
    // We only need to run the wrapper since it internally execs USER_CODE_STRING
    await pyodide.runPythonAsync(wrapperCode);

    return {
      success: true,
      result: "Execution Complete", // We no longer return the direct exec result
      stdout: outputLines.join('\n'),
      trace: traceLog
    };

  } catch (error) {
    return {
      success: false,
      result: null,
      error: error.message || error.toString()
    };
  }
}
