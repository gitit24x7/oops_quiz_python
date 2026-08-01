/**
 * src/components/LandingPage.jsx
 *
 * DESCRIPTION:
 * Persuade-mode entry point for Pyfun. Liquid-glass nav + footer, a
 * sunset/desk-lamp hero scene faded into the dark surface on one side, an
 * interactive proof of the core mechanic, a feature index built from
 * faithful recreations of the app's real UI (not stock icons), the anomaly
 * index, and the elemental color legend.
 *
 * The hero background is the real photo at `public/hero.jpg` (the sunset
 * desk-study scene). `.hero-scene` in src/index.css is the gradient sitting
 * underneath it — a same-mood fallback for the instant before the photo
 * decodes, and for any edge the cover-crop doesn't reach.
 *
 * CONNECTIONS:
 * - Rendered by src/App.jsx as the 'landing' view, the app's true entry point.
 * - `onEnter` hands off to the topic index (view: 'topics').
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import PythonLogo from './PythonLogo';

const EASE = [0.16, 1, 0.3, 1];
const HERO_IMAGE = "url('/hero.jpg')";

const ANOMALIES = [
  { n: 1, name: 'The Shared Potion Bag', hint: 'a mutable default argument, reused across every call' },
  { n: 2, name: 'The Unbound Sigil', hint: 'a local assignment that shadows the whole function' },
  { n: 3, name: 'The Late-Binding Closure', hint: 'three closures, one shared variable, one surprise' },
  { n: 4, name: 'is vs ==', hint: 'two equal numbers that are not the same object' },
  { n: 5, name: 'Nested List Mutation', hint: 'a "copy" that still points at the original' },
  { n: 6, name: 'Mutable Inside Immutable', hint: 'a tuple that still lets you break its contents' },
  { n: 7, name: 'Phantom String Identity', hint: 'why some strings are the same object and some aren’t' },
  { n: 8, name: 'Exhausted Iterator', hint: 'sum it twice, get zero the second time' },
  { n: 9, name: 'MRO Conflict', hint: 'two parents, one method: which one wins?' },
  { n: 10, name: 'Lost Function Identity', hint: 'a decorator that erases the name it wrapped' },
  { n: 11, name: 'Scope Leak via :=', hint: 'the walrus operator escapes the box you thought it was in' },
  { n: 12, name: 'Chained Assignment Trap', hint: 'two names, one list, zero independence' },
  { n: 13, name: 'Bare except: Catastrophe', hint: 'the catch-all that also catches Ctrl+C' },
  { n: 14, name: 'Thread-Unsafe Counter', hint: 'counting to 100,000 and landing somewhere else' },
  { n: 15, name: 'Module Deadlock', hint: 'two files, each waiting on the other to finish' },
];

const ELEMENTS = [
  { hue: '#4285F4', name: 'Blue', meaning: 'structure: scope, flow, data' },
  { hue: '#ea4335', name: 'Red', meaning: 'danger: the reversal, the crash' },
  { hue: '#fbbc05', name: 'Gold', meaning: 'mastery: the trial, the proof' },
  { hue: '#34a853', name: 'Green', meaning: 'growth: foundations, structures' },
];

/* ── Feature preview mocks — faithful small recreations of real app UI,
   using the actual colors/type/copy those screens use, not stock icons. ── */

function MockPredictReveal() {
  return (
    <div className="rounded-lg bg-black/30 border border-white/10 p-4">
      <div className="text-[10px] font-mono text-ink-500 mb-2">grimoire.get('lightning')</div>
      <div className="flex gap-2 mb-2">
        <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-ink-300 border border-white/10">Crash!</span>
        <span className="text-[10px] font-mono px-2 py-1 rounded bg-google-yellow/15 text-google-yellow border border-google-yellow/30">None</span>
      </div>
      <div className="text-[10px] font-mono text-google-green">▸ No spell found</div>
    </div>
  );
}

function MockSeverity() {
  return (
    <div className="flex gap-2">
      <div className="flex-1 rounded-lg bg-black/20 border border-white/10 px-3 py-4 text-center">
        <span className="text-[10px] text-ink-500 uppercase tracking-wide">mild</span>
      </div>
      <div className="flex-1 rounded-lg bg-black/20 border border-google-blue/25 px-3 py-4 text-center">
        <span className="text-[10px] text-google-blue uppercase tracking-wide">major</span>
      </div>
      <div className="flex-1 rounded-lg bg-black/40 border border-google-red/50 shadow-[0_0_20px_rgba(234,67,53,0.25)] px-3 py-4 text-center">
        <span className="text-[10px] text-google-red uppercase tracking-wide font-bold">mindblow</span>
      </div>
    </div>
  );
}

function MockSwipeCards() {
  return (
    <div className="relative h-24">
      <div className="absolute inset-x-4 top-3 h-16 rounded-lg bg-black/10 border border-white/5" />
      <div className="absolute inset-x-2 top-1.5 h-16 rounded-lg bg-black/20 border border-white/10" />
      <div className="absolute inset-x-0 top-0 h-16 rounded-lg bg-gradient-to-br from-google-blue/20 to-transparent border border-white/15 p-3">
        <div className="flex gap-1 mb-2">
          {[1, 1, 1, 0.4, 0].map((v, i) => (
            <div key={i} className="h-0.5 flex-1 rounded-full bg-white/15 overflow-hidden">
              <div className="h-full bg-google-blue" style={{ width: `${v * 100}%` }} />
            </div>
          ))}
        </div>
        <div className="text-[10px] text-ink-200">The 'Aha!' Moment</div>
      </div>
    </div>
  );
}

function MockToolsList() {
  const tools = [
    { icon: '⚠️', label: 'Anomaly Report', locked: false },
    { icon: '🧪', label: 'Feynman Sandbox', locked: false },
    { icon: '🔓', label: 'Exploit Lab', locked: false },
    { icon: '🔬', label: 'Code Autopsy', locked: true },
  ];
  return (
    <div className="space-y-1.5">
      {tools.map((t) => (
        <div
          key={t.label}
          className={`flex items-center gap-2 rounded px-2.5 py-1.5 text-[10px] ${t.locked ? 'bg-black/10 text-ink-600' : 'bg-white/5 text-ink-200'}`}
        >
          <span>{t.locked ? '🔒' : t.icon}</span> {t.label}
        </div>
      ))}
    </div>
  );
}

function MockMemoryEcho() {
  return (
    <div className="rounded-lg bg-purple-500/[0.06] border border-purple-400/25 p-4">
      <div className="text-[10px] font-semibold text-purple-300 mb-1">🔮 The Archive Remembers</div>
      <div className="text-[10px] text-ink-500 leading-relaxed">A quest from three lessons back, resurfaced for recall.</div>
    </div>
  );
}

function MockBossTrial() {
  return (
    <div className="rounded-lg bg-gradient-to-r from-amber-900/40 via-black/30 to-amber-900/40 border border-amber-500/30 p-4">
      <div className="text-[10px] font-black uppercase tracking-widest text-amber-400">⚔️ Final Trial</div>
      <div className="text-[10px] text-ink-500 mt-1">Data & Collections</div>
    </div>
  );
}

function MockTerminal() {
  return (
    <div className="rounded-lg bg-black/50 border border-white/10 p-4 font-mono flex gap-6">
      <div className="flex-1">
        <div className="text-[10px] text-ink-600 mb-2">▸ editor.py — CPython in your browser</div>
        <div className="text-[10px] text-google-blue">x = [<span className="text-google-green">1</span>, <span className="text-google-green">2</span>, <span className="text-google-green">3</span>]</div>
        <div className="text-[10px] text-ink-400">y = x  <span className="text-ink-600"># alias, not copy</span></div>
        <div className="text-[10px] text-ink-400">y.append(<span className="text-google-green">4</span>)</div>
        <div className="text-[10px] text-google-blue">print(x)</div>
      </div>
      <div className="flex-1 border-l border-white/10 pl-6">
        <div className="text-[10px] text-ink-600 mb-2">▸ output</div>
        <div className="text-[10px] text-google-green">[1, 2, 3, 4]</div>
        <div className="text-[10px] text-ink-600 mt-1">↳ x and y share the same list</div>
      </div>
    </div>
  );
}

function MockPatternRecognition() {
  return (
    <div className="rounded-lg bg-black/30 border border-white/10 p-4">
      <div className="text-[10px] font-mono text-ink-500 mb-3">Spot the bug before running</div>
      <div className="space-y-1">
        {[
          { line: 'x = [1, 2, 3]', hi: '' },
          { line: 'y = x          # ← alias!', hi: 'warn' },
          { line: 'y.append(4)', hi: '' },
          { line: 'print(x)  # ??', hi: 'red' },
        ].map((l, i) => (
          <div key={i} className={`text-[9px] font-mono px-2 py-0.5 rounded ${l.hi === 'red' ? 'bg-google-red/10 text-google-red' :
            l.hi === 'warn' ? 'text-google-yellow/70' : 'text-ink-400'
            }`}>{l.line}</div>
        ))}
      </div>
      <div className="mt-3 flex gap-1.5 flex-wrap">
        {['[1, 2, 3]', '[1, 2, 3, 4]', 'Error'].map((opt, i) => (
          <span key={opt} className={`text-[9px] px-2 py-0.5 rounded-full border ${i === 1 ? 'bg-google-green/15 text-google-green border-google-green/30'
            : 'bg-white/5 text-ink-500 border-white/10'
            }`}>{opt}</span>
        ))}
      </div>
    </div>
  );
}

function MockInterviewLens() {
  return (
    <div className="rounded-lg bg-black/30 border border-white/10 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-google-green animate-pulse" />
        <div className="text-[9px] text-ink-500 uppercase tracking-wide">Interview simulation</div>
      </div>
      <div className="text-[10px] text-ink-200 mb-2 font-medium">&ldquo;What does Python&rsquo;s GIL actually prevent?&rdquo;</div>
      <div className="text-[9px] font-mono bg-white/5 rounded p-2 text-ink-400 border-l-2 border-google-blue/50 leading-relaxed">
        Prevents true parallel execution of bytecode across threads &mdash; but I/O-bound tasks still benefit from threading&hellip;
      </div>
      <div className="mt-3">
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-google-yellow/15 text-google-yellow border border-google-yellow/25">⭐ Strong answer</span>
      </div>
    </div>
  );
}

function MockForgeChallenge() {
  return (
    <div className="rounded-lg bg-gradient-to-br from-google-blue/10 to-purple-500/10 border border-google-blue/20 p-4">
      <div className="text-[10px] font-black uppercase tracking-widest text-google-blue mb-2">🔨 Forge: Build It</div>
      <div className="text-[10px] text-ink-400 mb-3">Implement a thread-safe singleton in Python.</div>
      <div className="font-mono text-[9px] text-ink-300 bg-black/30 rounded p-2.5 leading-relaxed">
        <span className="text-google-blue">class</span> <span className="text-google-yellow">Singleton</span>:<br />
        &nbsp;&nbsp;<span className="text-ink-500">_lock = threading.Lock()</span><br />
        &nbsp;&nbsp;<span className="text-google-blue">def</span> <span className="text-google-green">__new__</span>(cls):<br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-google-blue">with</span> cls._lock:<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-ink-600"># your impl here ▌</span>
      </div>
    </div>
  );
}

function MockDialogScene() {
  const lines = [
    { speaker: 'Arch-Mage', color: 'text-google-yellow', text: 'Focus your mind, Scholar.' },
    { speaker: 'Apprentice', color: 'text-google-blue', text: 'I… think it prints 1?' },
    { speaker: 'Arch-Mage', color: 'text-google-yellow', text: 'Run it. See what Python says.' },
  ];
  return (
    <div className="rounded-lg bg-black/30 border border-white/10 p-4 space-y-2">
      <div className="text-[9px] text-ink-500 uppercase tracking-wide mb-2">Narrative dialogue</div>
      {lines.map((l, i) => (
        <div key={i} className="flex gap-2 items-start">
          <span className={`text-[9px] font-bold shrink-0 ${l.color}`}>{l.speaker}</span>
          <span className="text-[9px] text-ink-400 leading-relaxed">{l.text}</span>
        </div>
      ))}
    </div>
  );
}

function MockPathSystem() {
  const paths = [
    { icon: '📦', name: 'Data & Collections', done: 7, total: 7, color: 'bg-google-blue' },
    { icon: '⚡', name: 'Functions & Scope',  done: 3, total: 5, color: 'bg-google-yellow' },
    { icon: '🌊', name: 'Generators & I/O',   done: 0, total: 4, color: 'bg-google-green' },
  ];
  return (
    <div className="rounded-lg bg-black/30 border border-white/10 p-4 space-y-2.5">
      <div className="text-[9px] text-ink-500 uppercase tracking-wide mb-1">6 learning paths</div>
      {paths.map((p) => (
        <div key={p.name}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] text-ink-300">{p.icon} {p.name}</span>
            <span className="text-[9px] text-ink-600">{p.done}/{p.total}</span>
          </div>
          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
            <div className={`h-full rounded-full ${p.color}`} style={{ width: `${(p.done / p.total) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function MockTimeline() {
  const steps = ['Variables', 'Mutation', 'Closures', 'Classes', 'Concurrency'];
  return (
    <div className="rounded-lg bg-black/30 border border-white/10 p-4">
      <div className="text-[9px] text-ink-500 uppercase tracking-wide mb-3">Concept timeline</div>
      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10" />
        <div className="space-y-2.5">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 z-10 text-[8px] font-bold
                ${i < 3 ? 'bg-google-blue/20 border-google-blue/40 text-google-blue'
                         : i === 3 ? 'bg-google-yellow/20 border-google-yellow/40 text-google-yellow'
                         : 'bg-white/5 border-white/10 text-ink-600'}`}>
                {i < 3 ? '✓' : i + 1}
              </div>
              <span className={`text-[9px] ${i < 3 ? 'text-ink-200' : i === 3 ? 'text-google-yellow' : 'text-ink-600'}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockProgressUnlock() {
  const tools = [
    { icon: '⚠️', label: 'Anomaly Report', at: 0,  unlocked: true },
    { icon: '🧪', label: 'Feynman Sandbox', at: 1,  unlocked: true },
    { icon: '🔓', label: 'Exploit Lab',     at: 5,  unlocked: true },
    { icon: '🔬', label: 'Code Autopsy',    at: 10, unlocked: false },
    { icon: '🔍', label: 'Pattern Drill',   at: 15, unlocked: false },
  ];
  return (
    <div className="rounded-lg bg-black/30 border border-white/10 p-4">
      <div className="text-[9px] text-ink-500 uppercase tracking-wide mb-3">Progressive unlocks</div>
      <div className="space-y-1.5">
        {tools.map((t) => (
          <div key={t.label} className={`flex items-center gap-2 rounded px-2 py-1 text-[9px] ${t.unlocked ? 'bg-white/5 text-ink-200' : 'bg-black/10 text-ink-600'}`}>
            <span>{t.unlocked ? t.icon : '🔒'}</span>
            <span className="flex-1">{t.label}</span>
            {!t.unlocked && <span className="text-ink-700">quest {t.at}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

const FEATURES = [

  {
    title: 'Predict, then find out you were wrong',
    desc: 'Every quest locks the run button until you commit to an answer. The reveal only lands because you had skin in the game first.',
    Mock: MockPredictReveal,
    cols: 'md:col-span-4 sm:col-span-2',
  },
  {
    title: 'The reaction scales with the reversal',
    desc: "Gentle features stay quiet. A real 'wait, WHAT?' gets the full screen-shake. Not everything is the loudest thing on the page.",
    Mock: MockSeverity,
    cols: 'md:col-span-2 sm:col-span-1',
  },
  {
    title: 'Theory you can swipe through',
    desc: "Long articles chunked into single-idea cards. Tap, hold to pause, swipe. Same depth, paced like something you'd actually finish.",
    Mock: MockSwipeCards,
    cols: 'md:col-span-2 sm:col-span-1',
  },
  {
    title: 'Spot the pattern before the reveal',
    desc: 'Pattern recognition drills train your eye to catch aliasing, mutation, and scoping bugs before they bite in production.',
    Mock: MockPatternRecognition,
    cols: 'md:col-span-2 sm:col-span-1',
  },
  {
    title: 'The Archive remembers what you forgot',
    desc: 'Every fifth quest resurfaces an old anomaly before moving on. Pure retrieval practice, no scoring, no pressure.',
    Mock: MockMemoryEcho,
    cols: 'md:col-span-2 sm:col-span-1',
  },
  {
    title: 'Seven tools, earned one at a time',
    desc: "The Exploit Lab, Code Autopsy, and four more unlock as you go, not dumped on you in lesson one.",
    Mock: MockToolsList,
    cols: 'md:col-span-2 sm:col-span-1',
  },
  {
    title: 'Forge: build a correct implementation',
    desc: 'After understanding what breaks Python, Forge quests ask you to build a working solution from scratch — with a live runtime to prove it.',
    Mock: MockForgeChallenge,
    cols: 'md:col-span-4 sm:col-span-2',
  },
  {
    title: 'A real final trial per path',
    desc: 'The last quest in each of the six core paths is reframed as a boss fight: full weight, no new hand-holding.',
    Mock: MockBossTrial,
    cols: 'md:col-span-3 sm:col-span-1',
  },
  {
    title: 'Interview Lens: explain it, not just code it',
    desc: 'Real Python interview questions with graded answers. Know not just what to write, but how to articulate why it works.',
    Mock: MockInterviewLens,
    cols: 'md:col-span-3 sm:col-span-1',
  },
  {
    title: 'Real Python, zero setup',
    desc: 'Pyodide runs actual CPython in WebAssembly, in your tab. No signup, no backend, no "install this first."',
    Mock: MockTerminal,
    cols: 'md:col-span-6 sm:col-span-2',
  },
  {
    title: 'A living lore world',
    desc: 'Every lesson is framed as an Archive mission. Characters react to your choices in real time — the Arch-Mage gloats when you\'re wrong, and nods when you nail it.',
    Mock: MockDialogScene,
    cols: 'md:col-span-3 sm:col-span-2',
  },
  {
    title: 'Six structured paths, one map',
    desc: 'Data & Collections → Functions → Generators → Decorators → OOP → Advanced Mastery. Each path builds on the last. Progress bars track where you are.',
    Mock: MockPathSystem,
    cols: 'md:col-span-3 sm:col-span-2',
  },
  {
    title: 'A timeline of every concept',
    desc: 'See where each idea sits in the broader map before you learn it. No mystery about what comes next or why it matters.',
    Mock: MockTimeline,
    cols: 'md:col-span-2 sm:col-span-1',
  },
  {
    title: 'Tools unlock as you earn them',
    desc: 'Seven analysis tools, gated behind progress milestones. You unlock the Exploit Lab after quest 5, Code Autopsy after quest 10 — they appear exactly when they\'re relevant.',
    Mock: MockProgressUnlock,
    cols: 'md:col-span-4 sm:col-span-2',
  },
];

function GlassNav({ onEnter, onHome, onAbout }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="sticky top-4 z-50 px-4"
    >
      <nav className="liquid-glass max-w-4xl mx-auto rounded-full px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <PythonLogo className="w-6 h-6" />
          <span className="font-serif text-lg font-semibold text-ink-50">Pyfun</span>
        </div>
        {/* Nav links — each calls a setter in App via the prop chain */}
        <div className="flex items-center gap-4">
          <button
            onClick={onHome}
            className="text-xs text-ink-400 hover:text-ink-100 transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={onAbout}
            className="text-xs text-ink-400 hover:text-ink-100 transition-colors cursor-pointer"
          >
            About
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
      </nav>
    </motion.div>
  );
}

// Staggered word reveal for the headline — draws the eye through the claim
// in reading order instead of dumping the whole line in at once.
//
// Accessibility: the word-per-span markup has no real space character
// between words (only a CSS margin), so a screen reader or copy-paste would
// read/extract it as one run-on word. The h1 carries the real sentence via
// aria-label; the animated spans are aria-hidden so assistive tech skips
// the fragmented markup and reads the clean label instead.
function StaggerHeadline({ text, className }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={reduce ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.045, ease: EASE }}
          className="inline-block mr-[0.28em]"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

export default function LandingPage({ onEnter, onHome, onAbout }) {
  const heroRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  // Parallax: the photo drifts slower than the page scrolls, giving the flat
  // image real depth as the hero exits. Driven by a motion value, never
  // React state, so it costs nothing on the render tree.
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-ink-950 text-ink-200">
      <GlassNav onEnter={onEnter} onHome={onHome} onAbout={onAbout} />

      {/* HERO — sunset/desk-lamp scene, centered claim, full viewport */}
      <header ref={heroRef} className="relative overflow-hidden -mt-[68px] pt-[68px] min-h-[100dvh] flex items-center">
        {/* base gradient shows for an instant before the photo decodes, and
            fills any edge the cover-crop doesn't reach */}
        <motion.div className="absolute inset-0 hero-scene" style={{ y: photoY }} />
        <motion.div
          className="absolute inset-0 scale-110"
          style={{ backgroundImage: HERO_IMAGE, backgroundSize: 'cover', backgroundPosition: 'center', y: photoY }}
        />
        {/* tonal wash — knocks the photo's brightness down to sit inside the
            archive's dark palette instead of fighting it */}
        <div className="absolute inset-0 bg-ink-950/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/30" />

        <motion.div
          style={{ opacity: contentOpacity }}
          className="relative max-w-2xl mx-auto px-6 md:px-10 py-16 text-center"
        >
          <StaggerHeadline
            text="Fifteen ways Python breaks your JavaScript instincts."
            className="font-serif text-4xl md:text-5xl lg:text-[3.6rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-50 mb-5"
          />
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
            className="text-[0.92rem] leading-relaxed text-ink-300 mb-7 max-w-lg mx-auto"
          >
            Predict the output. Run the code. Watch your mental model break in a specific,
            checkable way. 53 quests across 10 paths, built for engineers who already know
            how to code and want to know why Python disagrees with them.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.68, ease: EASE }}
            className="flex justify-center"
          >
            <motion.button
              onClick={onEnter}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="rounded-full bg-google-yellow text-ink-950 font-semibold px-6 py-3 text-sm cursor-pointer shadow-[0_6px_32px_rgba(251,188,5,0.35)]"
            >
              Enter the Archive
            </motion.button>
          </motion.div>
        </motion.div>
      </header>

      {/* FEATURES */}
      <section className="relative max-w-6xl mx-auto px-6 md:px-12 py-24 border-t border-white/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: 'radial-gradient(60% 50% at 50% 0%, rgba(66,133,244,0.08), transparent 70%)' }}
        />
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.3, ease: EASE }}
          className="relative font-serif text-3xl md:text-4xl font-semibold text-ink-50 tracking-[-0.02em] mb-12 text-center"
        >
          What's actually in here
        </motion.h2>
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.24), ease: EASE }}
              className={`liquid-glass rounded-2xl p-6 flex flex-col gap-4 ${f.cols}`}
            >
              <f.Mock />
              <div className="mt-auto">
                <h3 className="text-sm font-semibold text-ink-50 mb-1">{f.title}</h3>
                <p className="text-xs text-ink-400 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ANOMALY INDEX */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-24 border-t border-white/10">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.3, ease: EASE }}
          className="font-serif text-3xl md:text-4xl font-semibold text-ink-50 tracking-[-0.02em] mb-3 text-center"
        >
          The fifteen anomalies
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.3, delay: 0.05, ease: EASE }}
          className="text-base text-ink-400 mb-12 max-w-lg mx-auto text-center"
        >
          The classic JavaScript-developer gotchas, in the order the Archive teaches them.
          No trick questions. Every one of these has bitten a real engineer in production.
        </motion.p>

        <ol>
          {ANOMALIES.map((a, i) => (
            <motion.li
              key={a.n}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.3), ease: EASE }}
              className="group flex items-baseline gap-6 py-4 border-b border-white/[0.06] hover:border-white/20 transition-colors duration-150"
            >
              <span className="font-serif text-lg text-ink-600 group-hover:text-google-yellow transition-colors duration-150 w-8 shrink-0 tabular-nums">
                {String(a.n).padStart(2, '0')}
              </span>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
                <span className="text-lg text-ink-100 font-medium">{a.name}</span>
                <span className="text-xs text-ink-500 sm:text-right">{a.hint}</span>
              </div>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* ELEMENTAL SYSTEM */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-24 border-t border-white/10">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.3, ease: EASE }}
          className="font-serif text-3xl md:text-4xl font-semibold text-ink-50 tracking-[-0.02em] mb-12 text-center"
        >
          Color means something here
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {ELEMENTS.map((el, i) => (
            <motion.div
              key={el.name}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.25, delay: i * 0.05, ease: EASE }}
            >
              <div className="w-8 h-8 mb-3 rounded-full" style={{ backgroundColor: el.hue, boxShadow: `0 0 24px ${el.hue}66` }} />
              <span className="block text-base text-ink-100 font-semibold mb-1">{el.name}</span>
              <span className="block text-xs text-ink-500 leading-snug">{el.meaning}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GLASS FOOTER */}
      <footer className="px-4 pb-4">
        <div className="liquid-glass max-w-6xl mx-auto rounded-3xl px-6 md:px-12 py-16 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <PythonLogo className="w-7 h-7" />
            <span className="font-serif text-lg font-semibold text-ink-50">Pyfun</span>
          </div>
          <p className="font-serif italic text-lg text-ink-400 mb-10">
            "What I cannot create, I do not understand." - Richard Feynman
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
        </div>
      </footer>
    </div>
  );
}
