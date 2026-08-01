/**
 * src/components/TopicGrid.jsx
 *
 * DESCRIPTION:
 * The landing page for Python Quest — "The Great Archive" index. Displays
 * every learning path as a tome in an asymmetric shelf layout rather than a
 * uniform icon-card grid, so the page reads as a browsed collection instead
 * of a template. Roman numerals mark reading order (the paths do build on
 * each other); the elemental Google-hue glow per topic replaces a flat
 * top-bar accent.
 *
 * CONNECTIONS:
 * - Imported by `src/App.jsx`
 * - Reads from `src/data/theory.js`
 */

import React from 'react';
import { motion } from 'framer-motion';
import { topicList } from '../data/theory';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

// Pulls the solid "from-<hue>" stop out of a topic's gradient string for
// use as plain text color — the numeral is a wayfinding mark, not a banner,
// so it gets a solid elemental color rather than gradient-clipped text.
function solidAccentClass(gradient) {
  const match = gradient.match(/from-(\S+)/);
  return match ? `text-${match[1]}` : 'text-white';
}

// A gentle bento rhythm — every 5th tome (0-indexed: 0, 5, ...) reads as a
// chapter-opener and spans two columns on large screens. Deterministic, not
// randomized, so the same topic always anchors the same way.
function spanClass(index) {
  return index % 5 === 0 ? 'md:col-span-2' : 'md:col-span-1';
}

export default function TopicGrid({ onSelectTopic }) {
  return (
    <div className="archive-bg min-h-screen px-6 py-14 md:py-20">
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto mb-16 md:mb-20 relative z-10"
      >
        <span className="text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">The Great Archive</span>
        <h1 className="font-serif text-5xl md:text-6xl font-semibold tracking-[-0.03em] mt-3 mb-5">
          <span className="text-google-blue">P</span>
          <span className="text-google-red">y</span>
          <span className="text-google-yellow">f</span>
          <span className="text-google-green">u</span>
          <span className="text-google-red">n</span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          Read the theory, prove it in the lab. Python from first principles, one anomaly at a time.
        </p>
      </motion.header>

      {/* TOME SHELF */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
        {topicList.map((topic, index) => (
          <motion.button
            key={topic.id}
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.4), ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onSelectTopic(topic.id)}
            className={`group relative text-left rounded-2xl overflow-hidden cursor-pointer bg-ink-900/80 border border-white/[0.06] hover:border-white/[0.14] transition-colors duration-300 ${spanClass(index)}`}
          >
            {/* Elemental glow, bottom-right — replaces the flat top accent bar */}
            <div
              className={`pointer-events-none absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-br ${topic.color} opacity-[0.14] blur-2xl group-hover:opacity-25 transition-opacity duration-500`}
            />

            <div className="relative p-7 flex flex-col h-full">
              <div className="flex items-start justify-between gap-4 mb-5">
                <span className={`font-serif text-4xl font-semibold tracking-tight ${solidAccentClass(topic.color)}`}>
                  {ROMAN[index] || index + 1}
                </span>
                <span className="text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  {topic.icon}
                </span>
              </div>

              <h3 className="font-serif text-xl font-semibold text-white mb-2 leading-snug">
                {topic.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                {topic.subtitle}
              </p>

              <div className="mt-auto flex items-center gap-4 text-xs text-slate-500 font-medium">
                <span>{topic.connectedQuestIds.length} quests</span>
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span>{topic.sections.length} sections</span>
                <span className="ml-auto text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300">
                  →
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="text-center mt-20 text-slate-600 text-sm relative z-10">
        <p className="font-serif italic">"What I cannot create, I do not understand." — Richard Feynman</p>
      </footer>
    </div>
  );
}
