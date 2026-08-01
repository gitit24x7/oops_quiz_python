/**
 * src/components/PatternRecognition.jsx
 * 
 * PATTERN RECOGNITION — Cross-chapter challenge mode.
 * Shows 2-3 code snippets from different chapters, asks users to identify
 * the shared underlying pattern. Builds the "connect-the-dots" meta-skill.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PatternRecognition({ pattern }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [activeSnippet, setActiveSnippet] = useState(0);
  const [snippetExplanations, setSnippetExplanations] = useState(new Set());

  if (!pattern) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">🧩</div>
        <p className="text-slate-400 text-lg font-medium">Pattern Recognition Coming Soon</p>
        <p className="text-slate-600 text-sm mt-2">Cross-chapter patterns for this chapter are still being mapped.</p>
      </div>
    );
  }

  const handleAnswer = (index) => {
    if (revealed) return;
    setSelectedOption(index);
    setTimeout(() => setRevealed(true), 600);
  };

  const toggleExplanation = (index) => {
    const newSet = new Set(snippetExplanations);
    if (newSet.has(index)) newSet.delete(index);
    else newSet.add(index);
    setSnippetExplanations(newSet);
  };

  const isCorrect = selectedOption === pattern.correctIndex;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 px-6 py-4 border-b border-purple-900/30">
        <h3 className="text-lg font-bold text-purple-400 flex items-center gap-2">
          <span className="text-2xl">🧩</span> Pattern Recognition
          {revealed && isCorrect && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs bg-emerald-900/50 text-emerald-400 px-2 py-1 rounded ml-2"
            >
              ✅ PATTERN IDENTIFIED
            </motion.span>
          )}
        </h3>
        <p className="text-slate-500 text-xs mt-1">{pattern.description}</p>
      </div>

      {/* Snippet Navigation Tabs */}
      <div className="flex border-b border-slate-800">
        {pattern.snippets.map((snippet, i) => (
          <button
            key={i}
            onClick={() => setActiveSnippet(i)}
            className={`flex-1 px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeSnippet === i
                ? 'bg-slate-800 text-purple-400 border-b-2 border-purple-400'
                : 'bg-slate-900 text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="block truncate">{snippet.chapter}</span>
          </button>
        ))}
      </div>

      {/* Active Snippet */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSnippet}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Code Block */}
            <div className="bg-slate-950 rounded-lg border border-slate-700 overflow-hidden mb-4">
              <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-700 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">{pattern.snippets[activeSnippet].chapter}</span>
                <span className="text-xs text-slate-600">Snippet {activeSnippet + 1}/{pattern.snippets.length}</span>
              </div>
              <pre className="p-4 text-green-300 font-mono text-sm whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {pattern.snippets[activeSnippet].code}
              </pre>
            </div>

            {/* Explain button */}
            <button
              onClick={() => toggleExplanation(activeSnippet)}
              className="text-xs text-slate-500 hover:text-purple-400 transition-colors cursor-pointer flex items-center gap-1 mb-2"
            >
              {snippetExplanations.has(activeSnippet) ? '▼ Hide' : '▶ Show'} analysis
            </button>

            <AnimatePresence>
              {snippetExplanations.has(activeSnippet) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-purple-950/20 border border-purple-800/30 rounded p-4 mb-4">
                    <p className="text-purple-200 text-sm leading-relaxed">
                      {pattern.snippets[activeSnippet].explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Snippet dots */}
            <div className="flex justify-center gap-2 mt-3">
              {pattern.snippets.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSnippet(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    activeSnippet === i
                      ? 'bg-purple-400 scale-125'
                      : 'bg-slate-600 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Question + Options */}
      <div className="px-6 pb-6">
        <div className="border-t border-slate-800 pt-5">
          <h4 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
            <span className="text-xl">🤔</span>
            {pattern.question}
          </h4>

          <div className="space-y-2">
            {pattern.options.map((option, i) => {
              const isSelected = selectedOption === i;
              const isCorrectOption = i === pattern.correctIndex;
              const showResult = revealed;

              return (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={revealed}
                  whileHover={!revealed ? { scale: 1.01 } : {}}
                  whileTap={!revealed ? { scale: 0.99 } : {}}
                  className={`w-full text-left p-3.5 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                    showResult
                      ? isCorrectOption
                        ? 'bg-emerald-950/50 border-emerald-600 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                        : isSelected && !isCorrectOption
                          ? 'bg-red-950/50 border-red-600 text-red-300'
                          : 'bg-slate-800/30 border-slate-700/50 text-slate-600'
                      : isSelected
                        ? 'bg-purple-950/50 border-purple-500 text-purple-300'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-purple-600 hover:text-purple-200'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs ${
                      showResult && isCorrectOption
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : showResult && isSelected && !isCorrectOption
                          ? 'border-red-500 bg-red-500 text-white'
                          : isSelected
                            ? 'border-purple-500 bg-purple-500/30'
                            : 'border-slate-600'
                    }`}>
                      {showResult && isCorrectOption ? '✓' : showResult && isSelected && !isCorrectOption ? '✗' : ''}
                    </span>
                    {option}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reveal: Full Pattern Explanation */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`border-t-2 p-6 ${
              isCorrect
                ? 'border-emerald-600 bg-gradient-to-b from-emerald-950/30 to-slate-900'
                : 'border-red-600 bg-gradient-to-b from-red-950/30 to-slate-900'
            }`}>
              {/* Result Banner */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="flex items-start gap-3 mb-5"
              >
                <span className="text-3xl">{isCorrect ? '🧠' : '🔄'}</span>
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${
                    isCorrect ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {isCorrect ? 'PATTERN IDENTIFIED!' : 'Not quite — here\'s the connection:'}
                  </span>
                  <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{pattern.reveal}</div>
                </div>
              </motion.div>

              {/* Core Principle */}
              <div className="bg-slate-950 border border-purple-800/50 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💎</span>
                  <div>
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-1">
                      Core Principle
                    </span>
                    <p className="text-purple-200 text-sm leading-relaxed italic">
                      "{pattern.principle}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Badge */}
              {pattern.badge && isCorrect && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, type: 'spring' }}
                  className="mt-4 text-center"
                >
                  <div className="inline-block bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-600/50 rounded-lg px-6 py-3 shadow-[0_0_30px_rgba(147,51,234,0.2)]">
                    <span className="text-2xl block mb-1">🏆</span>
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                      Badge Earned: "{pattern.badge}"
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
