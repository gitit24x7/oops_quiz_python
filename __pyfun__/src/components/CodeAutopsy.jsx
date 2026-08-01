/**
 * src/components/CodeAutopsy.jsx
 * 
 * CODE AUTOPSY — Forensic code analysis mode.
 * Users step through buggy code line-by-line, reading annotations,
 * then identify the "cause of death" (which line is responsible).
 * After identifying correctly, the full verdict and fix are revealed.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CodeAutopsy({ autopsy }) {
  const [hoveredLine, setHoveredLine] = useState(null);
  const [revealedLines, setRevealedLines] = useState(new Set());
  const [selectedCause, setSelectedCause] = useState(null);
  const [verdictRevealed, setVerdictRevealed] = useState(false);
  const [showFix, setShowFix] = useState(false);

  if (!autopsy) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">🔬</div>
        <p className="text-slate-400 text-lg font-medium">Code Autopsy Coming Soon</p>
        <p className="text-slate-600 text-sm mt-2">The forensic report for this chapter is still being compiled.</p>
      </div>
    );
  }

  const codeLines = autopsy.code.filter(line => line.text !== undefined);
  const totalAnnotatable = codeLines.filter(l => l.annotation).length;
  const isCorrect = selectedCause === autopsy.causeOfDeath;

  const handleLineClick = (index) => {
    // Toggle annotation visibility
    const newRevealed = new Set(revealedLines);
    if (newRevealed.has(index)) {
      newRevealed.delete(index);
    } else {
      newRevealed.add(index);
    }
    setRevealedLines(newRevealed);
  };

  const handleSuspectLine = (index) => {
    setSelectedCause(index);
    if (index === autopsy.causeOfDeath) {
      setTimeout(() => setVerdictRevealed(true), 800);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-red-950/40 to-slate-900 px-6 py-4 border-b border-red-900/30">
        <h3 className="text-lg font-bold text-red-400 flex items-center gap-2">
          <span className="text-2xl">🔬</span> Code Autopsy
          {verdictRevealed && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs bg-emerald-900/50 text-emerald-400 px-2 py-1 rounded ml-2"
            >
              ✅ CASE SOLVED
            </motion.span>
          )}
        </h3>
        <p className="text-slate-500 text-xs mt-1">Examine each line. Find the cause of death. Propose the fix.</p>
      </div>

      {/* Scenario */}
      <div className="px-6 py-4 border-b border-slate-800">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">📋</span>
          <div>
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-1">{autopsy.title}</span>
            <p className="text-slate-300 text-sm leading-relaxed">{autopsy.scenario}</p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="px-6 py-3 bg-slate-800/50 border-b border-slate-800">
        <p className="text-slate-500 text-xs">
          <span className="text-amber-400">👆 Click</span> any line to reveal its annotation. 
          <span className="text-red-400 ml-2">🎯 Mark Suspect</span> to identify the guilty line.
          <span className="text-slate-600 ml-2">({revealedLines.size}/{totalAnnotatable} examined)</span>
        </p>
      </div>

      {/* Code Body */}
      <div className="bg-slate-950 font-mono text-sm">
        {codeLines.map((line, index) => {
          const isRevealed = revealedLines.has(index);
          const isHovered = hoveredLine === index;
          const isSuspect = selectedCause === index;
          const isGuilty = isSuspect && isCorrect;
          const isInnocent = isSuspect && !isCorrect;
          const hasAnnotation = line.annotation;

          return (
            <div key={index}>
              {/* Code line */}
              <div
                onMouseEnter={() => setHoveredLine(index)}
                onMouseLeave={() => setHoveredLine(null)}
                onClick={() => hasAnnotation && handleLineClick(index)}
                className={`flex items-stretch transition-colors duration-150 ${
                  isGuilty
                    ? 'bg-red-950/50 border-l-4 border-red-500'
                    : isInnocent
                      ? 'bg-amber-950/30 border-l-4 border-amber-500'
                      : isHovered && hasAnnotation
                        ? 'bg-slate-800/50 border-l-4 border-slate-600'
                        : 'border-l-4 border-transparent'
                } ${hasAnnotation ? 'cursor-pointer' : ''}`}
              >
                {/* Line number */}
                <div className="w-12 flex-shrink-0 text-right pr-3 py-1.5 text-slate-600 select-none text-xs leading-6">
                  {index + 1}
                </div>

                {/* Code content */}
                <div className="flex-grow py-1.5 pr-4">
                  <pre className={`whitespace-pre-wrap leading-6 ${
                    line.text === '' ? 'min-h-[24px]' : ''
                  } ${
                    line.suspicious ? 'text-red-300' : 'text-green-300'
                  }`}>{line.text || ' '}</pre>
                </div>

                {/* Suspect button */}
                {hasAnnotation && isRevealed && !verdictRevealed && (
                  <div className="flex items-center pr-3 flex-shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSuspectLine(index); }}
                      className={`text-xs px-2 py-1 rounded cursor-pointer transition-all ${
                        isSuspect
                          ? isCorrect
                            ? 'bg-red-600 text-white'
                            : 'bg-amber-600 text-white'
                          : 'bg-slate-700 hover:bg-red-900/50 text-slate-400 hover:text-red-400'
                      }`}
                    >
                      🎯 {isSuspect ? (isCorrect ? 'GUILTY!' : 'Not quite...') : 'Mark Suspect'}
                    </button>
                  </div>
                )}
              </div>

              {/* Annotation reveal */}
              <AnimatePresence>
                {isRevealed && hasAnnotation && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={`ml-12 mr-4 my-1 px-4 py-2.5 rounded text-xs leading-relaxed border-l-2 ${
                      line.suspicious
                        ? 'bg-red-950/30 text-red-200 border-red-600'
                        : 'bg-slate-800/50 text-slate-400 border-slate-600'
                    }`}>
                      {line.suspicious && <span className="text-red-400 font-bold mr-1">⚠️</span>}
                      {line.annotation}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Verdict */}
      <AnimatePresence>
        {verdictRevealed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            {/* Verdict Card */}
            <div className="bg-gradient-to-b from-red-950/40 to-slate-900 border-t-2 border-red-600 p-6">
              <div className="flex items-start gap-3 mb-4">
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', bounce: 0.6 }}
                  className="text-3xl"
                >💀</motion.span>
                <div>
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-2">FORENSIC VERDICT</span>
                  <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{autopsy.verdict}</div>
                </div>
              </div>

              {/* Fix Toggle */}
              <button
                onClick={() => setShowFix(!showFix)}
                className="w-full mt-4 bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-700/50 text-emerald-400 font-bold py-3 px-4 rounded text-sm uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{showFix ? '▼' : '▶'}</span>
                {showFix ? 'Hide Fix' : '🩹 Reveal the Fix'}
              </button>

              <AnimatePresence>
                {showFix && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 bg-slate-950 rounded-lg border border-emerald-800/50 overflow-hidden">
                      <div className="px-4 py-2 bg-emerald-950/30 border-b border-emerald-800/30">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">🩹 The Fix</span>
                      </div>
                      <pre className="p-4 text-green-300 font-mono text-sm whitespace-pre-wrap leading-relaxed">{autopsy.fix}</pre>
                      <div className="px-4 py-3 bg-slate-900 border-t border-slate-800">
                        <p className="text-slate-400 text-xs leading-relaxed">{autopsy.fixExplanation}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Cross-chapter connections */}
              {autopsy.connections && (
                <div className="mt-6 pt-4 border-t border-slate-800">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">🔗 This Pattern Also Appears In:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {autopsy.connections.map((conn, i) => (
                      <div key={i} className="bg-slate-800/50 rounded px-3 py-2 border border-slate-700/50">
                        <span className="text-xs font-bold text-google-blue block">{conn.chapter}: {conn.name}</span>
                        <span className="text-xs text-slate-500">{conn.link}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
