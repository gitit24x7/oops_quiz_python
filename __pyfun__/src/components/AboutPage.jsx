/**
 * src/components/AboutPage.jsx
 *
 * DESCRIPTION:
 * The "About" page — explains the philosophy behind Pyfun, the tech stack,
 * and the learning science principles it's built on.
 *
 * CONNECTIONS:
 * - Rendered by App.jsx when view === 'about'
 * - onEnter → sets view to 'topics' (enter the archive)
 * - onBack  → sets view to 'home' or 'landing'
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PythonLogo from './PythonLogo';

const EASE = [0.16, 1, 0.3, 1];

// ── Principle card ──────────────────────────────────────────────────────────
// Each learning-science principle is a small, self-contained card.
// Notice: this is a function inside a file — a "local component".
// It's not exported (no `export`) so only this file can use it.
function PrincipleCard({ number, title, desc, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay, ease: EASE }}
      className="flex gap-5 py-6 border-b border-white/[0.06] last:border-0"
    >
      {/* The colored number on the left */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-black"
        style={{ backgroundColor: `${color}22`, color }}
        // ^ style prop uses a JS object — note double curly braces:
        //   outer {} = "switch to JS mode in JSX"
        //   inner {} = the JS object literal
      >
        {number}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-ink-100 mb-1">{title}</h3>
        <p className="text-sm text-ink-400 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// ── Expandable tech stack item ───────────────────────────────────────────────
// Demonstrates useState inside a child component — each item manages its own
// open/closed state independently.
function TechItem({ name, role, detail }) {
  // useState returns [currentValue, setterFunction]
  // When open is false the detail is hidden; when true it's shown.
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06] last:border-0">
      {/* Clicking the button toggles `open` between true and false */}
      <button
        onClick={() => setOpen(prev => !prev)}
        // prev => !prev  means: "give me the previous value, then flip it"
        // This is the safest way to toggle boolean state — avoids stale closures.
        className="w-full flex items-center justify-between py-4 text-left group cursor-pointer"
      >
        <div>
          <span className="text-sm font-semibold text-ink-100">{name}</span>
          <span className="text-xs text-ink-500 ml-3">{role}</span>
        </div>
        {/* Rotate the chevron when open — pure CSS transform driven by a ternary */}
        <span className={`text-ink-600 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>

      {/* AnimatePresence lets framer-motion animate elements as they leave the DOM */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="text-xs text-ink-400 leading-relaxed pb-4 pr-4">{detail}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main exported component ──────────────────────────────────────────────────
// Props destructured from the object App passes in: { onEnter, onBack }
export default function AboutPage({ onEnter, onBack }) {
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
            <button
              onClick={onBack}
              className="text-xs text-ink-400 hover:text-ink-100 transition-colors cursor-pointer"
            >
              ← Back
            </button>
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
      <section className="max-w-2xl mx-auto px-6 pt-24 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="font-serif text-5xl font-semibold leading-[1.1] tracking-[-0.03em] text-ink-50 mb-6"
        >
          Built on a{' '}
          <span className="text-google-yellow">simple idea</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="text-lg text-ink-300 leading-relaxed"
        >
          You only truly understand something after you've confidently predicted it
          and been wrong. Pyfun is engineered around that moment.
        </motion.p>
      </section>

      {/* ── LEARNING SCIENCE ── */}
      <section className="max-w-2xl mx-auto px-6 py-12 border-t border-white/[0.06]">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="font-serif text-2xl font-semibold text-ink-50 mb-8 tracking-[-0.02em]"
        >
          The learning science behind it
        </motion.h2>

        {/*
          .map() iterates over an array and transforms each item into JSX.
          The `key` prop is required on list items — React uses it to track
          which element is which when the list updates.
        */}
        {[
          {
            number: '1',
            color: '#4285F4',
            title: 'Prediction before exposure',
            desc: 'Generating an answer before seeing it — even incorrectly — dramatically improves retention. Every quest locks the Run button until you commit.',
          },
          {
            number: '2',
            color: '#EA4335',
            title: 'Desirable difficulty',
            desc: 'The right amount of struggle is not a bug, it\'s the mechanism. Pyfun never softens a reversal. If Python surprises you, the full surprise is the lesson.',
          },
          {
            number: '3',
            color: '#FBBC05',
            title: 'Spaced retrieval',
            desc: 'Every fifth quest resurfaces an earlier anomaly before the new one opens. Forced recall — not re-reading — is what actually moves knowledge to long-term memory.',
          },
          {
            number: '4',
            color: '#34A853',
            title: 'Elaborative interrogation',
            desc: 'The Feynman Sandbox, Code Autopsy, and Interview Lens tools all ask you to produce an explanation, not just recognise one. Explaining something reveals exactly where your mental model breaks.',
          },
        ].map((p, i) => (
          <PrincipleCard key={p.number} {...p} delay={i * 0.05} />
          // {...p} is the "spread" operator — it passes every property of `p`
          // as a separate prop. Equivalent to: number={p.number} color={p.color} ...
        ))}
      </section>

      {/* ── TECH STACK ── */}
      <section className="max-w-2xl mx-auto px-6 py-12 border-t border-white/[0.06]">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="font-serif text-2xl font-semibold text-ink-50 mb-2 tracking-[-0.02em]"
        >
          How it's built
        </motion.h2>
        <p className="text-sm text-ink-500 mb-8">Click any item to expand.</p>

        <div className="liquid-glass rounded-2xl px-6">
          {[
            {
              name: 'React 18',
              role: 'UI framework',
              detail: 'The entire app is a single React tree. There is no router library — navigation is a useState string in App.jsx. This keeps the bundle tiny and the mental model simple.',
            },
            {
              name: 'Pyodide',
              role: 'Python runtime',
              detail: 'CPython compiled to WebAssembly via Emscripten. Runs entirely in your browser tab — no server, no backend, no API key. The pip-installable stdlib is fully available.',
            },
            {
              name: 'Framer Motion',
              role: 'Animations',
              detail: 'Every reveal, stagger, and parallax effect. Framer Motion keeps animations in declarative JSX rather than imperative JS, so they compose cleanly with React\'s render cycle.',
            },
            {
              name: 'Tailwind CSS',
              role: 'Styling',
              detail: 'Utility-first CSS. Every class maps directly to a CSS property — no naming abstractions. The design tokens (ink-950, google-yellow, etc.) are defined in tailwind.config.js.',
            },
            {
              name: 'Vite',
              role: 'Build tool',
              detail: 'Near-instant HMR (hot module replacement) — the browser updates in under 50ms when you save a file. The production build uses Rollup under the hood for tree-shaking.',
            },
          ].map(item => (
            <TechItem key={item.name} {...item} />
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="max-w-2xl mx-auto px-6 py-16 border-t border-white/[0.06]">
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
          className="font-serif italic text-2xl text-ink-300 leading-relaxed text-center mb-16"
        >
          "The first principle is that you must not fool yourself — and you are the
          easiest person to fool."
          <cite className="block not-italic text-sm text-ink-600 mt-4 font-sans">
            — Richard Feynman
          </cite>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
          className="liquid-glass rounded-3xl p-12 text-center"
        >
          <p className="text-ink-400 mb-8 leading-relaxed">
            Stop reading about Python. Start breaking it.
          </p>
          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="rounded-full bg-google-yellow text-ink-950 font-semibold px-8 py-4 text-base cursor-pointer shadow-[0_8px_40px_rgba(251,188,5,0.3)]"
          >
            Enter the Archive
          </motion.button>
        </motion.div>
      </section>

    </div>
  );
}
