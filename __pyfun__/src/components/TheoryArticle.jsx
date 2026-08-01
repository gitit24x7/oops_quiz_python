/**
 * src/components/TheoryArticle.jsx
 *
 * DESCRIPTION:
 * Renders a single, scrollable Feynman-style theory article for a topic.
 * Layout: Hero → TLDR → Sections (with code examples & analogies) → Connected Quests
 *
 * CONNECTIONS:
 * - Imported by `src/App.jsx`
 * - Reads a single topic object from `src/data/theory.js`
 * - Navigates to quest playground via `onEnterQuest` callback
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Map quest IDs to their full quest data for display
function getQuestInfo(questId, questsData) {
  return questsData.find(q => q.id === questId);
}

export default function TheoryArticle({ topic, quests, onBack, onEnterQuest, onSwitchToSwipe }) {
  const [expandedSection, setExpandedSection] = useState(null);

  if (!topic) return null;

  return (
    <div className="archive-bg min-h-screen">

      {/* STICKY NAV BAR */}
      <nav className="sticky top-0 z-50 bg-ink-950/85 backdrop-blur-xl border-b border-white/[0.06] px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium cursor-pointer"
          >
            <span>←</span> All Topics
          </button>
          <span className="text-slate-500 text-sm font-medium">
            {topic.icon} {topic.title}
          </span>
          {onSwitchToSwipe && (
            <button
              onClick={onSwitchToSwipe}
              className="text-slate-400 hover:text-white text-xs underline decoration-dotted cursor-pointer"
            >
              🎬 Swipe Cards
            </button>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-6 pt-16 pb-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-7xl mb-6 block">{topic.icon}</span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white tracking-[-0.03em] mb-4">
            {topic.title}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {topic.subtitle}
          </p>

          {/* Section quick-links */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {topic.sections.map((section, i) => (
              <a
                key={i}
                href={`#section-${i}`}
                className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white px-3 py-1.5 rounded-full transition-colors"
              >
                {i + 1}. {section.heading.length > 30 ? section.heading.substring(0, 30) + '…' : section.heading}
              </a>
            ))}
          </div>
        </div>
      </motion.header>

      {/* TLDR BOX */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="px-6 mb-12"
      >
        <div className="max-w-4xl mx-auto">
          <div className={`bg-gradient-to-r ${topic.color} p-[1px] rounded-2xl`}>
            <div className="bg-slate-900 rounded-2xl p-8">
              <div className="flex items-start gap-3 mb-4">
                <span className="bg-slate-800 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest">
                  TL;DR
                </span>
              </div>
              <p className="text-slate-200 text-lg leading-relaxed font-medium">
                {topic.tldr}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ARTICLE SECTIONS */}
      <div className="px-6 pb-12">
        <div className="max-w-4xl mx-auto space-y-10">
          {topic.sections.map((section, index) => (
            <motion.article
              key={index}
              id={`section-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="scroll-mt-20"
            >
              {/* Section number + heading */}
              <div className="flex items-start gap-4 mb-6">
                <span className="shrink-0 w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-400">
                  {index + 1}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-white leading-tight tracking-[-0.02em] pt-1">
                  {section.heading}
                </h2>
              </div>

              {/* Content */}
              {/* Content */}
              {section.visuallyExplained ? (
                <div className="pl-14 space-y-8">
                  {/* The Hook */}
                  <div className="text-slate-300 text-base leading-relaxed bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-inner">
                    <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2"><span className="text-xl">🪝</span> The Hook / Problem</h4>
                    <p>{section.visuallyExplained.hook}</p>
                  </div>
              
                  {/* The Base Case */}
                  <div className="rounded-xl overflow-hidden border border-red-900/30 shadow-lg">
                    <div className="bg-slate-900 px-4 py-2 border-b border-red-900/30 flex justify-between items-center">
                       <span className="text-xs text-red-400 font-bold tracking-widest uppercase">The Base Case</span>
                    </div>
                    <pre className="bg-[#0f111a] p-5 overflow-x-auto text-sm leading-relaxed">
                      <code className="text-slate-400 font-mono whitespace-pre-wrap">
                        {section.visuallyExplained.baseCase}
                      </code>
                    </pre>
                  </div>
              
                  {/* The Aha! Moment */}
                  <div className="bg-google-blue/[0.07] border border-google-blue/20 p-5 rounded-xl">
                    <h4 className="text-google-blue font-bold mb-2 flex items-center gap-2"><span className="text-xl">💡</span> The 'Aha!' Moment</h4>
                    <p className="text-slate-300 text-sm leading-relaxed italic">
                      {section.visuallyExplained.ahaMoment}
                    </p>
                  </div>
              
                  {/* Incremental Build */}
                  <div className="mt-8 hidden sm:block">
                    <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Incremental Build</h4>
                    <div className="space-y-4">
                      {section.visuallyExplained.incrementalBuild.map((step, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
                          <div className="md:w-1/3 shrink-0">
                            <span className="bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-1 rounded uppercase">Step {step.step}</span>
                            <h5 className="text-white font-bold mt-2 text-sm">{step.title}</h5>
                            <p className="text-slate-400 text-xs mt-1 leading-relaxed">{step.desc}</p>
                          </div>
                          <div className="md:w-2/3 bg-slate-950 rounded-lg p-4 border border-slate-800 flex items-center overflow-x-auto">
                            <code className="text-sm text-google-green font-mono whitespace-pre-wrap">{step.code}</code>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
              
                  {/* Visual Description */}
                  <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl text-center">
                    <span className="text-2xl block mb-2">🎬</span>
                    <p className="text-slate-400 text-sm italic">"{section.visuallyExplained.visualDescription}"</p>
                  </div>
              
                  {/* Summary */}
                  <div className="bg-google-green/10 text-emerald-100 p-5 rounded-xl border border-google-green/20">
                    <span className="font-bold text-google-green mr-2">TL;DR:</span>
                    {section.visuallyExplained.summary}
                  </div>
                </div>
              ) : (
                <div className="pl-14">
                  {/* Main text — split into paragraphs */}
                  <div className="text-slate-300 text-base leading-relaxed space-y-4 mb-6">
                    {section.content?.split('\n\n').map((para, i) => (
                      <p key={i} className="whitespace-pre-line">{para}</p>
                    ))}
                  </div>

                  {/* Code example */}
                  {section.codeExample && (
                    <div className="my-6 rounded-xl overflow-hidden border border-slate-700 shadow-lg">
                      <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                        <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                        <span className="text-xs text-slate-500 ml-2 font-mono">python</span>
                      </div>
                      <pre className="bg-slate-900 p-5 overflow-x-auto text-sm leading-relaxed">
                        <code className="text-slate-300 font-mono whitespace-pre-wrap">
                          {section.codeExample}
                        </code>
                      </pre>
                    </div>
                  )}

                  {/* Analogy callout */}
                  {section.analogy && (
                    <div className="my-6 bg-google-yellow/[0.06] border border-google-yellow/25 p-5 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">💡</span>
                        <span className="text-xs font-bold uppercase tracking-widest text-google-yellow">Analogy</span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed italic">
                        {section.analogy}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Divider between sections */}
              {index < topic.sections.length - 1 && (
                <div className="pl-14 mt-10">
                  <div className="border-t border-slate-800"></div>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>

      {/* CONNECTED QUESTS */}
      <div className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="text-3xl">🧪</span> Now Put It to the Test
            </h3>
            <p className="text-slate-400 mb-8">
              Theory is nothing without practice. These interactive quests will challenge your understanding with real Python puzzles, traps, and "aha!" moments.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topic.connectedQuestIds.map((questId, i) => {
                const quest = getQuestInfo(questId, quests);
                if (!quest) return null;
                return (
                  <motion.button
                    key={questId}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onEnterQuest(questId)}
                    className="group text-left bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-xl p-5 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">
                          Quest {i + 1}
                        </span>
                        <h4 className="text-white font-bold group-hover:text-google-blue transition-colors">
                          {quest.name}
                        </h4>
                        <p className="text-slate-500 text-sm mt-1 line-clamp-2">
                          {quest.title}
                        </p>
                      </div>
                      <span className="text-slate-600 group-hover:text-white transition-colors text-xl shrink-0 mt-1">
                        →
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
