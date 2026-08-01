/**
 * src/components/ForgeChallenge.jsx
 * 
 * THE FORGE — Production-level coding challenge component.
 * Users write real Python code from a skeleton, run automated tests
 * via Pyodide, and compare with a senior engineer's reference solution.
 * 
 * FLOW:
 * 1. Read the mission brief
 * 2. Write code in the Monaco editor (starter code provided)
 * 3. Run tests — per-test green/red feedback
 * 4. After passing (or giving up), view reference solution + annotations
 * 5. Interview debrief questions
 */

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';

const DIFFICULTY_CONFIG = {
  Apprentice: { color: 'emerald', icon: '🌱', label: 'Apprentice' },
  Journeyman: { color: 'amber', icon: '⚒️', label: 'Journeyman' },
  Master:     { color: 'red',    icon: '🔥', label: 'Master' },
};

export default function ForgeChallenge({ challenge }) {
  const [code, setCode] = useState(challenge?.starterCode || '');
  const [testResults, setTestResults] = useState([]);
  const [rawOutput, setRawOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [allPassed, setAllPassed] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [showDebrief, setShowDebrief] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);
  const editorRef = useRef(null);

  if (!challenge) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 text-center">
        <div className="text-5xl mb-4">⚒️</div>
        <p className="text-slate-400 text-lg font-medium">The Forge — Coming Soon</p>
        <p className="text-slate-600 text-sm mt-2">The coding challenge for this chapter is still being forged.</p>
      </div>
    );
  }

  const diffConfig = DIFFICULTY_CONFIG[challenge.difficulty] || DIFFICULTY_CONFIG.Apprentice;

  const handleEditorMount = useCallback((editor) => {
    editorRef.current = editor;
  }, []);

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    setRawOutput('');
    setAllPassed(false);
    setHasAttempted(true);

    try {
      // Load Pyodide if not loaded
      if (!window.pyodide) {
        const { loadPyodide } = await import('https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.mjs');
        window.pyodide = await loadPyodide();
      }

      // Reset stdout/stderr
      window.pyodide.runPython(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);

      // Concatenate user code + test code
      const fullCode = code + '\n\n' + challenge.tests;

      try {
        window.pyodide.runPython(fullCode);
      } catch (e) {
        // Execution error — will be captured below
      }

      const stdout = window.pyodide.runPython('sys.stdout.getvalue()');
      const stderr = window.pyodide.runPython('sys.stderr.getvalue()');

      const fullOutput = stdout + (stderr ? '\n' + stderr : '');
      setRawOutput(fullOutput);

      // Parse test results from stdout
      const lines = fullOutput.split('\n');
      const parsed = [];
      let allOk = true;

      for (const line of lines) {
        if (line.includes('✅')) {
          parsed.push({ passed: true, message: line.trim() });
        } else if (line.includes('❌') || line.includes('AssertionError') || line.includes('AssertionError') || line.includes('Error') && line.includes('assert')) {
          parsed.push({ passed: false, message: line.trim() });
          allOk = false;
        }
      }

      // Check for the "ALL TESTS PASSED" marker
      const forgeComplete = fullOutput.includes('🏆 ALL TESTS PASSED');

      // If we got some test results but also errors, check if it halted
      if (parsed.length > 0 && !forgeComplete) {
        // Likely a test failed or code errored mid-way
        allOk = false;
        // Add an error entry if stderr has content
        if (stderr && !parsed.some(p => !p.passed)) {
          const errorLines = stderr.trim().split('\n');
          const lastError = errorLines[errorLines.length - 1];
          parsed.push({ passed: false, message: `❌ ${lastError}` });
        }
      }

      if (parsed.length === 0 && stderr) {
        // No tests ran — likely a syntax/runtime error
        const errorLines = stderr.trim().split('\n');
        const lastError = errorLines[errorLines.length - 1];
        parsed.push({ passed: false, message: `❌ ${lastError}` });
        allOk = false;
      }

      if (parsed.length === 0 && !stderr) {
        // No output at all — likely syntax error caught by Pyodide
        const errorMatch = fullOutput.match(/Error.*$/m);
        if (errorMatch) {
          parsed.push({ passed: false, message: `❌ ${errorMatch[0]}` });
        } else if (fullOutput.trim() === '') {
          parsed.push({ passed: false, message: '❌ No output — check for syntax errors in your code' });
        }
        allOk = false;
      }

      setTestResults(parsed);
      setAllPassed(forgeComplete);

    } catch (err) {
      setRawOutput(`❌ Pyodide Error: ${err.message}`);
      setTestResults([{ passed: false, message: `❌ ${err.message}` }]);
      setAllPassed(false);
    }

    setIsRunning(false);
  };

  const handleGiveUp = () => {
    setGaveUp(true);
    setShowReference(true);
  };

  const handleReset = () => {
    setCode(challenge.starterCode);
    setTestResults([]);
    setRawOutput('');
    setAllPassed(false);
    setHasAttempted(false);
    setShowReference(false);
    setShowDebrief(false);
    setGaveUp(false);
  };

  const passedCount = testResults.filter(t => t.passed).length;
  const totalTests = testResults.length;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">

      {/* ═══ HEADER ═══ */}
      <div className="bg-gradient-to-r from-slate-900 via-orange-950/40 to-slate-900 px-6 py-4 border-b border-orange-900/30">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-orange-400 flex items-center gap-2">
            <span className="text-2xl">⚒️</span> The Forge
            {allPassed && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xs bg-emerald-900/50 text-emerald-400 px-2 py-1 rounded ml-2"
              >
                🏆 COMPLETE
              </motion.span>
            )}
          </h3>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-2 py-1 rounded bg-slate-800 text-${diffConfig.color}-400`}>
              {diffConfig.icon} {diffConfig.label}
            </span>
            <span className="text-xs text-slate-600 font-mono">
              ⏱ {challenge.timeEstimate}
            </span>
          </div>
        </div>
        <p className="text-slate-500 text-xs mt-1">Write production Python. Pass all tests. Compare with a senior engineer's solution.</p>
      </div>

      {/* ═══ MISSION BRIEF ═══ */}
      <div className="px-6 py-4 border-b border-slate-800">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">📋</span>
          <div>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block mb-1">
              Mission: {challenge.title}
            </span>
            <p className="text-slate-300 text-sm leading-relaxed">{challenge.mission}</p>
          </div>
        </div>
      </div>

      {/* ═══ EDITOR ═══ */}
      <div className="border-b border-slate-800">
        <div className="bg-slate-800/50 px-4 py-2 flex items-center justify-between border-b border-slate-700">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
            Your Solution
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1 rounded text-xs font-bold bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-slate-200 transition-colors cursor-pointer"
            >
              ↺ Reset
            </button>
            <button
              onClick={runTests}
              disabled={isRunning}
              className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isRunning
                  ? 'bg-slate-700 text-slate-400'
                  : 'bg-orange-600 hover:bg-orange-500 text-white shadow-[0_0_12px_rgba(234,88,12,0.3)]'
              }`}
            >
              {isRunning ? '⏳ Forging...' : '🔥 Run Tests'}
            </button>
          </div>
        </div>

        <div className="h-80">
          <Editor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={setCode}
            onMount={handleEditorMount}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              scrollBeyondLastLine: false,
              padding: { top: 12 },
              lineNumbers: 'on',
              renderLineHighlight: 'all',
              tabSize: 4,
              automaticLayout: true,
            }}
          />
        </div>
      </div>

      {/* ═══ TEST RESULTS ═══ */}
      <AnimatePresence>
        {testResults.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-b border-slate-800">
              {/* Progress Bar */}
              <div className="h-1.5 bg-slate-800">
                <motion.div
                  className={`h-full ${allPassed ? 'bg-emerald-500' : 'bg-orange-500'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${totalTests > 0 ? (passedCount / totalTests) * 100 : 0}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="px-6 py-3 bg-slate-800/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Test Results: {passedCount}/{totalTests}
                  </span>
                  {allPassed && (
                    <motion.span
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', bounce: 0.6 }}
                      className="text-emerald-400 font-bold text-sm"
                    >
                      🏆 All tests passed!
                    </motion.span>
                  )}
                </div>

                <div className="space-y-1.5">
                  {testResults.map((result, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={`flex items-center gap-2 p-2 rounded text-sm font-mono ${
                        result.passed
                          ? 'bg-emerald-950/30 text-emerald-300 border border-emerald-800/30'
                          : 'bg-red-950/30 text-red-300 border border-red-800/30'
                      }`}
                    >
                      <span className="text-base flex-shrink-0">
                        {result.passed ? '✅' : '❌'}
                      </span>
                      <span className="truncate">{result.message.replace(/^[✅❌]\s*/, '')}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Raw Output (collapsible) */}
              {rawOutput && (
                <details className="px-6 pb-3">
                  <summary className="text-xs text-slate-600 cursor-pointer hover:text-slate-400 transition-colors py-1">
                    ▶ View raw output
                  </summary>
                  <pre className="mt-2 bg-black/50 rounded p-3 text-xs text-slate-400 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto border border-slate-800">
                    {rawOutput}
                  </pre>
                </details>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ ACTION BUTTONS ═══ */}
      {hasAttempted && !allPassed && !gaveUp && (
        <div className="px-6 py-3 border-b border-slate-800">
          <button
            onClick={handleGiveUp}
            className="text-xs text-slate-600 hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1"
          >
            🏳️ Give up and view the reference solution
          </button>
        </div>
      )}

      {/* ═══ REFERENCE SOLUTION ═══ */}
      {(allPassed || gaveUp) && (
        <div className="border-b border-slate-800">
          <button
            onClick={() => setShowReference(!showReference)}
            className={`w-full px-6 py-3.5 flex items-center justify-between transition-colors cursor-pointer ${
              showReference
                ? 'bg-emerald-950/30 hover:bg-emerald-950/40'
                : 'bg-slate-800/30 hover:bg-slate-800/50'
            }`}
          >
            <span className="flex items-center gap-2 text-sm font-bold text-emerald-400">
              <span className="text-lg">📖</span>
              Senior Engineer's Solution
              {gaveUp && !allPassed && (
                <span className="text-xs text-amber-400 font-normal ml-2">(revealed early)</span>
              )}
            </span>
            <motion.span
              animate={{ rotate: showReference ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-slate-500"
            >
              ▼
            </motion.span>
          </button>

          <AnimatePresence>
            {showReference && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {/* Reference Code */}
                <div className="bg-slate-950 border-t border-emerald-800/30">
                  <div className="px-4 py-2 bg-emerald-950/20 border-b border-emerald-800/20">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Reference Implementation</span>
                  </div>
                  <div className="h-64">
                    <Editor
                      height="100%"
                      defaultLanguage="python"
                      theme="vs-dark"
                      value={challenge.referenceSolution}
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 13,
                        scrollBeyondLastLine: false,
                        padding: { top: 12 },
                        lineNumbers: 'on',
                        renderLineHighlight: 'none',
                        tabSize: 4,
                        automaticLayout: true,
                      }}
                    />
                  </div>
                </div>

                {/* Annotations */}
                <div className="px-6 py-4 bg-slate-900">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                    🎓 Why This Approach (Senior-Level Reasoning)
                  </span>
                  <div className="space-y-2">
                    {challenge.annotations.map((note, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
                      >
                        <span className="text-xs font-bold flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center bg-emerald-900/50 text-emerald-400">
                          {i + 1}
                        </span>
                        <span className="text-sm text-slate-300 leading-relaxed">{note}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ═══ INTERVIEW DEBRIEF ═══ */}
      {(allPassed || gaveUp) && (
        <div>
          <button
            onClick={() => setShowDebrief(!showDebrief)}
            className="w-full px-6 py-3.5 flex items-center justify-between hover:bg-slate-800/30 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2 text-sm font-bold text-blue-400">
              <span className="text-lg">🎯</span>
              Interview Debrief
              <span className="text-xs text-slate-600 ml-1">({challenge.interviewDebrief.length} questions)</span>
            </span>
            <motion.span
              animate={{ rotate: showDebrief ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-slate-500"
            >
              ▼
            </motion.span>
          </button>

          <AnimatePresence>
            {showDebrief && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 space-y-3">
                  <p className="text-xs text-slate-500 italic">
                    An interviewer might follow up with these questions about your solution:
                  </p>
                  {challenge.interviewDebrief.map((question, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="flex items-start gap-3 p-4 rounded-lg bg-blue-950/20 border border-blue-800/30"
                    >
                      <span className="text-xs font-bold flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center bg-blue-900/50 text-blue-400">
                        Q{i + 1}
                      </span>
                      <span className="text-sm text-blue-200 leading-relaxed font-medium">
                        {question}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ═══ ALL PASSED CELEBRATION ═══ */}
      <AnimatePresence>
        {allPassed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', bounce: 0.4 }}
            className="px-6 py-6 text-center border-t border-emerald-800/30 bg-gradient-to-b from-emerald-950/30 to-slate-900"
          >
            <div className="text-5xl mb-3">🏆</div>
            <p className="text-emerald-400 font-bold text-lg">Forge Complete</p>
            <p className="text-slate-500 text-sm mt-1">
              Production-grade code. Review the reference solution and interview debrief above.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
