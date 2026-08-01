/**
 * src/components/InterviewLens.jsx
 * 
 * INTERVIEW LENS — Overlay that adds interview context to each chapter.
 * Shows: frequency rating, common questions, gotchas, and one-liner answers.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InterviewLens({ lens }) {
  const [expandedSection, setExpandedSection] = useState('questions');

  if (!lens) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">🎯</div>
        <p className="text-slate-400 text-lg font-medium">Interview Lens Coming Soon</p>
        <p className="text-slate-600 text-sm mt-2">Interview insights for this chapter are being compiled.</p>
      </div>
    );
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const frequencyStars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);
  const difficultyColor = { Easy: 'text-emerald-400', Medium: 'text-amber-400', Hard: 'text-red-400' };

  const sections = [
    { key: 'questions', icon: '❓', title: 'Common Interview Questions', items: lens.questions, color: 'blue' },
    { key: 'gotchas', icon: '⚠️', title: 'Gotchas & Mistakes', items: lens.gotchas, color: 'amber' },
    { key: 'oneLiners', icon: '💬', title: 'One-Liner Answers', items: lens.oneLiners, color: 'emerald' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 px-6 py-4 border-b border-blue-900/30">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <span className="text-2xl">🎯</span> Interview Lens
          </h3>
          <div className="flex items-center gap-4">
            <span className={`text-xs font-bold px-2 py-1 rounded ${difficultyColor[lens.difficulty]} bg-slate-800`}>
              {lens.difficulty}
            </span>
          </div>
        </div>
        <p className="text-slate-500 text-xs mt-1">How this topic shows up in real interviews.</p>
      </div>

      {/* Meta Bar */}
      <div className="px-6 py-3 bg-slate-800/50 border-b border-slate-800 flex flex-wrap items-center gap-4">
        {/* Frequency */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Frequency:</span>
          <span className="text-amber-400 text-sm tracking-widest font-mono">{frequencyStars(lens.frequency)}</span>
        </div>
        {/* Companies */}
        {lens.companies && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Asked at:</span>
            {lens.companies.map((company, i) => (
              <span key={i} className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">{company}</span>
            ))}
          </div>
        )}
      </div>

      {/* Accordion Sections */}
      <div className="divide-y divide-slate-800">
        {sections.map(({ key, icon, title, items, color }) => (
          <div key={key}>
            <button
              onClick={() => toggleSection(key)}
              className="w-full px-6 py-3.5 flex items-center justify-between hover:bg-slate-800/50 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2 text-sm font-bold text-slate-300">
                <span className="text-lg">{icon}</span>
                {title}
                <span className="text-xs text-slate-600 ml-1">({items?.length || 0})</span>
              </span>
              <motion.span
                animate={{ rotate: expandedSection === key ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-slate-500"
              >
                ▼
              </motion.span>
            </button>

            <AnimatePresence>
              {expandedSection === key && items && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 space-y-2">
                    {items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex items-start gap-3 p-3 rounded-lg border ${
                          color === 'blue'
                            ? 'bg-blue-950/20 border-blue-800/30'
                            : color === 'amber'
                              ? 'bg-amber-950/20 border-amber-800/30'
                              : 'bg-emerald-950/20 border-emerald-800/30'
                        }`}
                      >
                        <span className={`text-xs font-bold flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                          color === 'blue'
                            ? 'bg-blue-900/50 text-blue-400'
                            : color === 'amber'
                              ? 'bg-amber-900/50 text-amber-400'
                              : 'bg-emerald-900/50 text-emerald-400'
                        }`}>
                          {i + 1}
                        </span>
                        <span className={`text-sm leading-relaxed ${
                          color === 'blue' ? 'text-blue-200'
                            : color === 'amber' ? 'text-amber-200'
                              : 'text-emerald-200'
                        }`}>
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Topic Badge */}
      <div className="px-6 py-4 bg-slate-800/30 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-xl">📌</span>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Topic</span>
            <span className="text-sm font-bold text-slate-200">{lens.topic}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
