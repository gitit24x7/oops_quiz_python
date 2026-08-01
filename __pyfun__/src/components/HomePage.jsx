/**
 * src/components/HomePage.jsx
 *
 * DESCRIPTION:
 * A dedicated "Home" page — a slightly warmer, more personal welcome than the
 * full persuade-mode LandingPage. Surfaces what Pyfun is, who it's for, and
 * a direct CTA into the Archive.
 *
 * CONNECTIONS:
 * - Rendered by App.jsx when view === 'home'
 * - onEnter  → sets view to 'topics'
 * - onBack   → sets view back to 'landing'
 * - onAbout  → sets view to 'about'
 */

import React from 'react';
import { motion } from 'framer-motion';
import PythonLogo from './PythonLogo';

// A single easing curve used throughout for consistency
const EASE = [0.16, 1, 0.3, 1];

// ── Small stat pill ──────────────────────────────────────────────────────────
function Stat({ value, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: EASE }}
      className="flex flex-col items-center gap-1"
    >
      <span className="font-serif text-4xl font-semibold text-ink-50">{value}</span>
      <span className="text-xs text-ink-500 uppercase tracking-widest">{label}</span>
    </motion.div>
  );
}

// ── Who-it's-for card ────────────────────────────────────────────────────────
function AudienceCard({ emoji, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay, ease: EASE }}
      className="liquid-glass rounded-2xl p-6"
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="text-base font-semibold text-ink-50 mb-2">{title}</h3>
      <p className="text-sm text-ink-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function HomePage({ onEnter, onBack, onAbout }) {
  return (
    <div className="min-h-screen bg-ink-950 text-ink-200">

      {/* ── NAV ── */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="sticky top-4 z-50 px-4"
      >
        <div className="liquid-glass max-w-4xl mx-auto rounded-full px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <PythonLogo className="w-6 h-6" />
            <span className="font-serif text-lg font-semibold text-ink-50">Pyfun</span>
          </div>
          <div className="flex items-center gap-3">
            {/* "Landing" link — goes back to the splash */}
            <button
              onClick={onBack}
              className="text-xs text-ink-400 hover:text-ink-100 transition-colors cursor-pointer"
            >
              ← Back
            </button>
            {/* About link */}
            <button
              onClick={onAbout}
              className="text-xs text-ink-400 hover:text-ink-100 transition-colors cursor-pointer"
            >
              About
            </button>
            {/* Primary CTA */}
            <motion.button
              onClick={onEnter}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="rounded-full bg-google-yellow text-ink-950 text-xs font-semibold px-4 py-2 cursor-pointer"
            >
              Enter the Archive →
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-google-blue/10 border border-google-blue/25 text-google-blue text-xs font-medium mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-google-blue animate-pulse" />
          Free · No signup · Runs in your browser
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="font-serif text-5xl md:text-6xl font-semibold leading-[1.08] tracking-[-0.03em] text-ink-50 mb-6"
        >
          Welcome to{' '}
          {/* Each letter gets Google's brand colors — P-y-f-u-n */}
          <span className="text-google-blue">P</span>
          <span className="text-google-red">y</span>
          <span className="text-google-yellow">f</span>
          <span className="text-google-green">u</span>
          <span className="text-google-red">n</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="text-lg text-ink-300 leading-relaxed max-w-xl mx-auto mb-10"
        >
          Python taught the way your brain actually learns — predict, run, break,
          understand. Not another tutorial. A place where wrong answers teach you more
          than right ones.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="rounded-full bg-google-yellow text-ink-950 font-semibold px-8 py-4 text-base cursor-pointer shadow-[0_8px_40px_rgba(251,188,5,0.3)]"
          >
            Start Learning →
          </motion.button>
          <motion.button
            onClick={onAbout}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="rounded-full border border-white/15 text-ink-200 font-semibold px-8 py-4 text-base cursor-pointer hover:border-white/30 transition-colors"
          >
            How it works
          </motion.button>
        </motion.div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="border-y border-white/[0.06] py-12">
        <div className="max-w-3xl mx-auto px-6 grid grid-cols-3 gap-8">
          {/*
            Each Stat is its own small component.
            Props are passed as JSX attributes: value="53" label="quests"
          */}
          <Stat value="53+"  label="quests"    />
          <Stat value="10"   label="paths"     />
          <Stat value="0"    label="installs"  />
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: EASE }}
          className="font-serif text-3xl font-semibold text-ink-50 tracking-[-0.02em] text-center mb-12"
        >
          Who is this for?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <AudienceCard
            emoji="⚡"
            title="JS engineers switching to Python"
            desc="You already know how to code. Pyfun shows you exactly where Python will surprise you coming from JavaScript."
            delay={0}
          />
          <AudienceCard
            emoji="🧪"
            title="Python devs who want to go deeper"
            desc="You write Python daily but have never had to explain why a mutable default arg bites you. Now you will."
            delay={0.05}
          />
          <AudienceCard
            emoji="🎯"
            title="Interview preppers"
            desc="The Interview Lens tool surfaces the exact Python gotchas interviewers love. With graded answers, not hints."
            delay={0.1}
          />
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="max-w-2xl mx-auto px-6 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
          className="liquid-glass rounded-3xl p-12"
        >
          <p className="font-serif italic text-ink-400 text-lg mb-8">
            "What I cannot create, I do not understand." — Richard Feynman
          </p>
          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="rounded-full bg-google-yellow text-ink-950 font-semibold px-8 py-4 text-base cursor-pointer"
          >
            Enter the Archive
          </motion.button>
        </motion.div>
      </section>

    </div>
  );
}
