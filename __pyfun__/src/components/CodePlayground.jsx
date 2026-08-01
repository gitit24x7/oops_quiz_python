/**
 * src/components/CodePlayground.jsx
 * 
 * DESCRIPTION:
 * The interactive code editor component for Python Quest.
 * It wraps the Monaco Editor and connects it to the Pyodide WebAssembly runner.
 * 
 * CONTENTS:
 * - Monaco Editor instance configured for Python.
 * - Run button that triggers `runPythonCode`.
 * - Output panel to display captured print statements or error tracebacks.
 * 
 * CONNECTIONS:
 * - Rendered by `src/App.jsx`.
 * - Uses `src/utils/pythonRunner.js` for execution.
 */

import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { runPythonCode, loadPyodideOnce } from '../utils/pythonRunner';

export default function CodePlayground({ initialCode, onRunCode, isLocked }) {
  const [code, setCode] = useState(initialCode || '');
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [matrixView, setMatrixView] = useState(false);
  const [bytecode, setBytecode] = useState("");
  
  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("Running Python in WebAssembly...");
    
    // Slight delay to allow UI to render the 'Running...' state
    setTimeout(async () => {
      const result = await runPythonCode(code);
      
      if (result.success) {
        setOutput(result.stdout || result.result || "Code ran successfully with no output.");
      } else {
        setOutput(`ERROR:\n${result.error}`);
      }
      setIsRunning(false);
      
      if (onRunCode) {
        onRunCode(result);
      }
    }, 50);
  };

  const handleToggleMatrix = async () => {
    if (!matrixView) {
      setBytecode("Loading The Matrix...");
      setMatrixView(true);
      const pyodide = await loadPyodideOnce();
      try {
        pyodide.globals.set('USER_CODE_STRING', code);
        const disScript = `
import dis
import io
import sys
old_stdout = sys.stdout
sys.stdout = io.StringIO()
try:
    dis.dis(USER_CODE_STRING)
    res = sys.stdout.getvalue()
finally:
    sys.stdout = old_stdout
res
`;
        const res = await pyodide.runPythonAsync(disScript);
        setBytecode(res);
      } catch (e) {
        setBytecode("Error reading matrix:\\n" + (e.message || e.toString()));
      }
    } else {
      setMatrixView(false);
    }
  };

  return (
    <div className="flex flex-col border-2 border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm mt-4 text-left">
      <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center text-sm font-semibold text-slate-700">
        <span>The Spell Weaver {isLocked ? '(LOCKED)' : ''}</span>
        <div className="flex gap-2">
          <button 
            onClick={handleToggleMatrix}
            className={`px-3 py-1 rounded shadow-sm transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold border ${matrixView ? 'bg-slate-900 border-google-green text-google-green' : 'bg-slate-200 border-slate-300 text-slate-600 hover:bg-slate-300'}`}
          >
            <span>👁️</span> {matrixView ? 'Hide Matrix' : 'Matrix View (dis)'}
          </button>
          <button 
            onClick={handleRun}
            disabled={isRunning || matrixView || isLocked}
            className="bg-google-green hover:bg-green-600 text-white px-4 py-1 rounded shadow-sm disabled:opacity-50 transition-colors cursor-pointer uppercase text-xs font-bold tracking-wider"
          >
            {isRunning ? 'Casting...' : '▶ Cast Spell'}
          </button>
        </div>
      </div>
      
      <div className="h-64 border-b border-slate-200 relative">
        {matrixView ? (
          <div className="absolute inset-0 bg-slate-900 overflow-y-auto p-4 animate-fade-in z-10">
            <div className="text-google-green opacity-50 text-[10px] mb-2 uppercase tracking-widest border-b border-green-900 pb-1">CPython Bytecode View</div>
            <pre className="text-google-green font-mono text-xs leading-relaxed">{bytecode}</pre>
          </div>
        ) : null}
        <Editor
          height="100%"
          defaultLanguage="python"
          theme="light"
          value={code}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            padding: { top: 16 }
          }}
        />
      </div>
      
      <div className="bg-slate-900 flex flex-col">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 py-2 border-b border-slate-800 flex items-center gap-2 bg-slate-950">
           <span className="w-2 h-2 rounded-full bg-google-green animate-pulse"></span>
           Terminal Output
        </div>
        <div className="text-google-green p-4 font-mono text-sm max-h-48 overflow-y-auto whitespace-pre-wrap">
           {output === null ? <span className="text-slate-600 italic">Awaiting spell execution...</span> : output}
        </div>
      </div>
    </div>
  );
}
