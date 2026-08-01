/**
 * src/App.jsx
 * 
 * DESCRIPTION:
 * Main Application Component for the Python Quest MVP.
 * Renders the top-level layout using a minimal Tailwind design with Google brand colors.
 * 
 * CONTENTS:
 * - Global header with the Python Quest logo.
 * - Render of a single "Wait, WHAT?" experiment (The Shared Potion Bag) to prove the MVP.
 * - Integration of the `CodePlayground` component.
 * 
 * CONNECTIONS:
 * - Bootstrapped by `src/main.jsx`.
 * - Imports `src/components/CodePlayground.jsx`.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodePlayground from './components/CodePlayground';
import DialogScene from './components/DialogScene';
import FeynmanCanvas from './components/FeynmanCanvas';
import ExploitLab from './components/ExploitLab';
import CodeAutopsy from './components/CodeAutopsy';
import PatternRecognition from './components/PatternRecognition';
import InterviewLens from './components/InterviewLens';
import ForgeChallenge from './components/ForgeChallenge';
import Typewriter from './components/Typewriter';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import TopicGrid from './components/TopicGrid';
import TheoryArticle from './components/TheoryArticle';
import TheorySwipe from './components/TheorySwipe';
import MemoryEcho from './components/MemoryEcho';
import { quests as rawQuests } from './data/quests';
import { probes } from './data/probes';
import { autopsies } from './data/autopsies';
import { patterns } from './data/patterns';
import { interviewLens } from './data/interviewLens';
import { forge } from './data/forge';
import { theory } from './data/theory';
import { getSeverity } from './data/severity';
import { TOOL_UNLOCKS, isToolUnlocked, toolsUnlockedBetween } from './data/toolUnlocks';
import { isBossQuest, getBossPathName } from './data/bossQuests';
import { playSelectSound, playRevealSting, playChime, playUnlockChime } from './utils/sound';
import { getFurthestIndex, markIndexReached, markQuestSeen, getMemoryFreshness } from './utils/progress';

const QUEST_PATHS = [
  // ─── PATH 1: DATA & COLLECTIONS (Pure functional, no OOP) ───
  { id: 104, path: "📦 Data & Collections",      title: "Ch 1.1" },
  { id: 107, path: "📦 Data & Collections",      title: "Ch 1.2" },
  { id: 109, path: "📦 Data & Collections",      title: "Ch 1.3" },
  { id: 1,   path: "📦 Data & Collections",      title: "Ch 1.4" },
  { id: 5,   path: "📦 Data & Collections",      title: "Ch 1.5" },
  { id: 4,   path: "📦 Data & Collections",      title: "Ch 1.6" },
  { id: 7,   path: "📦 Data & Collections",      title: "Ch 1.7" },

  // ─── PATH 2: FUNCTIONS & SCOPE ───
  { id: 105, path: "⚡ Functions & Scope",        title: "Ch 2.1" },
  { id: 110, path: "⚡ Functions & Scope",        title: "Ch 2.2" },
  { id: 2,   path: "⚡ Functions & Scope",        title: "Ch 2.3" },
  { id: 3,   path: "⚡ Functions & Scope",        title: "Ch 2.4" },
  { id: 11,  path: "⚡ Functions & Scope",        title: "Ch 2.5" },

  // ─── PATH 3: GENERATORS & I/O ───
  { id: 101, path: "🌊 Generators & I/O",        title: "Ch 3.1" },
  { id: 8,   path: "🌊 Generators & I/O",        title: "Ch 3.2" },
  { id: 106, path: "🌊 Generators & I/O",        title: "Ch 3.3" },
  { id: 13,  path: "🌊 Generators & I/O",        title: "Ch 3.4" },

  // ─── PATH 4: THE ART OF WRAPPING (Decorators Deep-Dive) ───
  { id: 103, path: "🎁 The Art of Wrapping",     title: "Ch 4.1" },
  { id: 201, path: "🎁 The Art of Wrapping",     title: "Ch 4.2" },
  { id: 202, path: "🎁 The Art of Wrapping",     title: "Ch 4.3" },
  { id: 10,  path: "🎁 The Art of Wrapping",     title: "Ch 4.4" },

  // ─── PATH 5: OOP FOUNDATIONS ───
  { id: 102, path: "🏛️ OOP Foundations",          title: "Ch 5.1" },
  { id: 203, path: "🏛️ OOP Foundations",          title: "Ch 5.2" },
  { id: 108, path: "🏛️ OOP Foundations",          title: "Ch 5.3" },
  { id: 204, path: "🏛️ OOP Foundations",          title: "Ch 5.4" },
  { id: 205, path: "🏛️ OOP Foundations",          title: "Ch 5.5" },

  // ─── PATH 6: OOP ADVANCED & MASTERY (Mixing everything) ───
  { id: 206, path: "⚔️ OOP Advanced & Mastery",  title: "Ch 6.1" },
  { id: 9,   path: "⚔️ OOP Advanced & Mastery",  title: "Ch 6.2" },
  { id: 207, path: "⚔️ OOP Advanced & Mastery",  title: "Ch 6.3" },
  { id: 208, path: "⚔️ OOP Advanced & Mastery",  title: "Ch 6.4" },
  { id: 6,   path: "⚔️ OOP Advanced & Mastery",  title: "Ch 6.5" },
  { id: 12,  path: "⚔️ OOP Advanced & Mastery",  title: "Ch 6.6" },
  { id: 14,  path: "⚔️ OOP Advanced & Mastery",  title: "Ch 6.7" },
  { id: 15,  path: "⚔️ OOP Advanced & Mastery",  title: "Ch 6.8" },

  // ─── DS TIER 1: THE CORE FOUR ───
  { id: 301, path: "🗄️ DS: Core Four",             title: "DS 1.1" },
  { id: 302, path: "🗄️ DS: Core Four",             title: "DS 1.2" },
  { id: 303, path: "🗄️ DS: Core Four",             title: "DS 1.3" },
  { id: 304, path: "🗄️ DS: Core Four",             title: "DS 1.4" },
  { id: 305, path: "🗄️ DS: Core Four",             title: "DS 1.5" },

  // ─── DS TIER 2: COLLECTIONS ARMORY ───
  { id: 306, path: "🧰 DS: Collections Armory",    title: "DS 2.1" },
  { id: 307, path: "🧰 DS: Collections Armory",    title: "DS 2.2" },
  { id: 308, path: "🧰 DS: Collections Armory",    title: "DS 2.3" },
  { id: 309, path: "🧰 DS: Collections Armory",    title: "DS 2.4" },
  { id: 310, path: "🧰 DS: Collections Armory",    title: "DS 2.5" },

  // ─── DS TIER 3: INTERVIEW CRUSHERS ───
  { id: 311, path: "💀 DS: Interview Crushers",    title: "DS 3.1" },
  { id: 312, path: "💀 DS: Interview Crushers",    title: "DS 3.2" },
  { id: 313, path: "💀 DS: Interview Crushers",    title: "DS 3.3" },
  { id: 314, path: "💀 DS: Interview Crushers",    title: "DS 3.4" },
  { id: 315, path: "💀 DS: Interview Crushers",    title: "DS 3.5" },
  { id: 316, path: "💀 DS: Interview Crushers",    title: "DS 3.6" },
  { id: 317, path: "💀 DS: Interview Crushers",    title: "DS 3.7" },

  // ─── DS TIER 4: PRODUCTION PATTERNS ───
  { id: 318, path: "🏭 DS: Production Patterns",   title: "DS 4.1" },
  { id: 319, path: "🏭 DS: Production Patterns",   title: "DS 4.2" },
  { id: 320, path: "🏭 DS: Production Patterns",   title: "DS 4.3" },
];

// Accent classes per Laboratory Tool when active (preserves each tool's
// original distinct color identity now that the buttons are data-driven).
const TOOL_ACCENT_CLASSES = {
  sandbox: 'text-google-blue ring-1 ring-inset ring-google-blue/30',
  exploit: 'text-emerald-400 ring-1 ring-inset ring-emerald-400/30',
  autopsy: 'text-red-300 ring-1 ring-inset ring-red-300/30',
  pattern: 'text-purple-400 ring-1 ring-inset ring-purple-400/30',
  interview: 'text-blue-400 ring-1 ring-inset ring-blue-400/30',
  forge: 'text-orange-400 ring-1 ring-inset ring-orange-400/30',
};

// Reconstruct, re-order, and re-title quests based on the structured paths
const quests = QUEST_PATHS.map(p => {
  const q = rawQuests.find(rq => rq.id === p.id);
  return q ? { ...q, path: p.path, title: p.title } : null;
}).filter(Boolean);

function App() {
  // ─── VIEW NAVIGATION STATE ───
  const [view, setView] = useState('landing');       // 'landing' | 'home' | 'about' | 'topics' | 'article' | 'quest'
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  // Default to the swipeable card reader — the long scroll is opt-in via a
  // toggle inside TheorySwipe, not the default a first-time visitor hits.
  const [articleMode, setArticleMode] = useState('swipe'); // 'swipe' | 'full'

  // ─── QUEST STATE ───
  const [questIndex, setQuestIndex] = useState(0);
  const currentQuest = quests[questIndex];

  const [predictionMade, setPredictionMade] = useState(false);
  const [discoveryVisible, setDiscoveryVisible] = useState(false);
  const [traceLog, setTraceLog] = useState(null);
  // How many discovery paragraphs have finished typing — drives the
  // sequenced reveal (report reads first, tools/trial arrive after).
  const [revealedTextCount, setRevealedTextCount] = useState(0);

  // Cinematic States
  const [isCinematicDark, setIsCinematicDark] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Track the narrative phase: 'intro', 'predicting', 'revealed'
  const [phase, setPhase] = useState('intro');
  const [codeKey, setCodeKey] = useState(0);
  const [activeTab, setActiveTab] = useState('code'); // 'code' | 'sandbox' | 'exploit'

  // ─── PROGRESSIVE UNLOCK STATE ───
  // Furthest quest index ever reached, persisted to localStorage. Drives
  // locking future lessons in the jump dropdown and gating Laboratory Tools
  // behind milestones instead of exposing all 64 lessons / 7 tools on day one.
  const [furthestIndex, setFurthestIndex] = useState(() => getFurthestIndex());
  const [unlockToast, setUnlockToast] = useState(null);

  // ─── GENERATION EFFECT ─── optional free-text guess before multiple choice
  const [showGuessBox, setShowGuessBox] = useState(false);
  const [guessText, setGuessText] = useState('');

  // ─── SPACED-RECALL CHECKPOINT ─── dismissed for the current quest index
  const [echoAcknowledged, setEchoAcknowledged] = useState(false);

  // ─── NAVIGATION HANDLERS ───
  const handleSelectTopic = (topicId) => {
    setSelectedTopicId(topicId);
    setView('article');
    window.scrollTo(0, 0);
  };

  const handleBackToTopics = () => {
    setView('topics');
    setSelectedTopicId(null);
    window.scrollTo(0, 0);
  };

  const handleEnterQuest = (questId) => {
    // Find the quest index by ID
    const idx = quests.findIndex(q => q.id === questId);
    if (idx !== -1) {
      // Topic-based entry is always allowed, even into a "locked" quest —
      // topics are meant to be explored non-linearly. Only the in-quest jump
      // dropdown (linear navigation) enforces the progressive unlock.
      handleJumpToQuest(idx, { force: true });
      setView('quest');
      window.scrollTo(0, 0);
    }
  };

  const handleBackToArticle = () => {
    setView('article');
    setIsCinematicDark(false);
    window.scrollTo(0, 0);
  };

  const handlePrediction = () => {
    playSelectSound();
    setPredictionMade(true);
    setPhase('predicting');
  };

  // Boss quests (the last quest of each core path) always get the full
  // cinematic treatment as a season-finale beat, regardless of their own tag.
  const getEffectiveSeverity = (quest) => (isBossQuest(quest.id) ? 'mindblow' : getSeverity(quest.id));

  const handleRunCode = (result) => {
    // Only show discovery if they have run the code
    if (result.success || result.error) {
      setTraceLog(result.trace || []);
      setDiscoveryVisible(true);
      setRevealedTextCount(0);
      // NOTE: phase deliberately stays 'predicting' here — the sidebar keeps
      // holding its line while the Anomaly Report types out. It flips to
      // 'revealed' (apprentices react) only once the report is fully read,
      // via handleDiscoveryTextDone below. That keeps the two channels
      // (report text vs. sidebar chatter) from competing for attention.

      // CINEMATIC HOOK, SCALED TO SEVERITY: only the true "wait, WHAT?"
      // reversals get the full screen-shake + blackout. Routine feature
      // reveals get a quieter treatment so the big moments stay big.
      const severity = getEffectiveSeverity(currentQuest);
      playRevealSting(severity);
      if (severity === 'mindblow') {
        setIsShaking(true);
        setIsCinematicDark(true);
        setTimeout(() => setIsShaking(false), 500); // Stop shaking after 500ms
      } else if (severity === 'major') {
        setIsCinematicDark(true);
      }
      // 'mild' quests: no shake, no blackout — the report card alone carries it.
    }
  };

  // Fires once a discovery paragraph finishes typing. Once the LAST one is
  // done, we reveal the Trial/Next-tome beat and let the sidebar react.
  const handleDiscoveryTextDone = (index) => {
    setRevealedTextCount((prev) => Math.max(prev, index + 1));
    const totalTexts = currentQuest.discovery?.texts?.length || 0;
    if (index + 1 >= totalTexts) {
      setPhase('revealed');
      markQuestSeen(currentQuest.id);
    }
  };

  // Extends the unlock frontier, persists it, and surfaces a toast for any
  // Laboratory Tool that just became available at the new frontier.
  // NOTE: side effects (sound, toast, localStorage write) deliberately live
  // here in the event-handler body rather than inside a setState updater —
  // React 18 StrictMode double-invokes updater functions in dev, which would
  // double-fire the chime/toast if they lived there instead.
  const advanceFrontier = (newIndex) => {
    if (newIndex <= furthestIndex) return;
    markIndexReached(newIndex);
    const unlocked = toolsUnlockedBetween(furthestIndex, newIndex);
    setFurthestIndex(newIndex);
    if (unlocked.length > 0) {
      playUnlockChime();
      setUnlockToast(unlocked.map((t) => `${t.icon} ${t.label}`).join(' + '));
      setTimeout(() => setUnlockToast(null), 4000);
    }
  };

  const resetQuestViewState = () => {
    setPredictionMade(false);
    setDiscoveryVisible(false);
    setTraceLog(null);
    setRevealedTextCount(0);
    setPhase('intro');
    setIsCinematicDark(false);
    setActiveTab('code');
    setCodeKey(prev => prev + 1);
    setShowGuessBox(false);
    setGuessText('');
    setEchoAcknowledged(false);
  };

  const handleNextQuest = () => {
    if (questIndex < quests.length - 1) {
      playChime();
      const nextIndex = questIndex + 1;
      setQuestIndex(nextIndex);
      advanceFrontier(nextIndex);
      resetQuestViewState();
    }
  };

  const handleJumpToQuest = (idx, { force = false } = {}) => {
    if (!force && idx > furthestIndex + 1) return; // locked — no jumping ahead via the dropdown
    setQuestIndex(idx);
    advanceFrontier(idx);
    resetQuestViewState();
  };

  const totalDiscoveryTexts = currentQuest?.discovery?.texts?.length || 0;
  const allTextsRevealed = discoveryVisible && revealedTextCount >= totalDiscoveryTexts;
  const isBoss = isBossQuest(currentQuest.id);

  // ─── SPACED-RECALL CHECKPOINT ─── every 5th quest, before it opens, briefly
  // resurface an earlier quest's code + original discovery for active recall.
  const isCheckpointIndex = questIndex > 0 && (questIndex + 1) % 5 === 0;
  const memoryEchoQuest = isCheckpointIndex ? quests[Math.max(0, questIndex - 3)] : null;
  const showMemoryEcho = Boolean(
    isCheckpointIndex && !echoAcknowledged && memoryEchoQuest && memoryEchoQuest.id !== currentQuest.id
  );

  // ─── VIEW: LANDING (Persuade) ───
  if (view === 'landing') {
    return (
      <LandingPage
        onEnter={() => setView('topics')}
        onHome={() => setView('home')}
        onAbout={() => setView('about')}
      />
    );
  }

  // ─── VIEW: HOME ───
  if (view === 'home') {
    return (
      <HomePage
        onEnter={() => setView('topics')}
        onBack={() => setView('landing')}
        onAbout={() => setView('about')}
      />
    );
  }

  // ─── VIEW: ABOUT ───
  if (view === 'about') {
    return (
      <AboutPage
        onEnter={() => setView('topics')}
        onBack={() => setView('home')}
      />
    );
  }

  // ─── VIEW: TOPIC GRID (Archive index) ───
  if (view === 'topics') {
    return <TopicGrid onSelectTopic={handleSelectTopic} />;
  }

  // ─── VIEW: THEORY ARTICLE ───
  if (view === 'article' && selectedTopicId) {
    return articleMode === 'swipe' ? (
      <TheorySwipe
        topic={theory[selectedTopicId]}
        quests={quests}
        onBack={handleBackToTopics}
        onEnterQuest={handleEnterQuest}
        onSwitchToFullArticle={() => setArticleMode('full')}
      />
    ) : (
      <TheoryArticle
        topic={theory[selectedTopicId]}
        quests={quests}
        onBack={handleBackToTopics}
        onEnterQuest={handleEnterQuest}
        onSwitchToSwipe={() => setArticleMode('swipe')}
      />
    );
  }

  // ─── VIEW: QUEST PLAYGROUND ───
  // Always the dark archive backdrop — isCinematicDark deepens it further for
  // the reveal moment rather than swapping between light and dark chrome.
  return (
    <div className={`archive-bg min-h-screen p-8 text-center flex flex-col items-center transition-colors duration-1000 text-slate-300 ${isCinematicDark ? 'brightness-90' : ''
      }`}>

      {/* HOME ICON — always visible, returns to landing page */}
      <div className="fixed top-4 left-4 z-50">
        <motion.button
          onClick={() => setView('landing')}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.15 }}
          title="Back to home"
          className="w-9 h-9 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-white hover:border-white/25 transition-colors cursor-pointer shadow-lg"
        >
          {/* SVG home icon — inline so no extra import needed */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>
            <polyline points="9 21 9 12 15 12 15 21"/>
          </svg>
        </motion.button>
      </div>

      {/* BACK TO ARTICLE BUTTON */}
      {selectedTopicId && (
        <div className="w-full max-w-6xl mb-4 text-left">
          <button
            onClick={handleBackToArticle}
            className="text-slate-500 hover:text-google-blue transition-colors text-sm font-medium cursor-pointer"
          >
            ← Back to {theory[selectedTopicId]?.title || 'Article'}
          </button>
        </div>
      )}


      {/* TOOL-UNLOCK TOAST */}
      {unlockToast && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border-2 border-google-yellow text-amber-100 px-5 py-3 rounded-lg shadow-[0_0_30px_rgba(251,191,36,0.3)] font-bold text-sm uppercase tracking-wider"
        >
          🔓 New Tool Unlocked: {unlockToast}
        </motion.div>
      )}

      {/* HEADER */}
      <header className={`mb-10 text-center max-w-2xl w-full transition-colors duration-1000 relative z-10 ${isCinematicDark ? 'opacity-30' : 'opacity-100'}`}>
        <h1 className="font-serif text-4xl font-semibold mb-2 tracking-[-0.02em]">
          <span className="text-google-blue">P</span>
          <span className="text-google-red">y</span>
          <span className="text-google-yellow">f</span>
          <span className="text-google-green">u</span>
          <span className="text-google-red">n</span>
        </h1>
        <p className="text-slate-400 text-lg">Python from first principles.</p>

        {/* QUEST JUMP SELECTOR */}
        <div className="mt-4 flex justify-center">
          <select
            value={questIndex}
            onChange={(e) => handleJumpToQuest(parseInt(e.target.value))}
            className="bg-ink-900 border border-white/10 rounded-lg px-4 py-2 text-sm font-medium text-slate-200 cursor-pointer hover:border-google-blue/50 transition-colors focus:outline-none focus:ring-2 focus:ring-google-blue max-w-lg w-full"
          >
            {Object.entries(
              quests.reduce((acc, q, i) => {
                const pathName = q.path || 'Unknown Path';
                if (!acc[pathName]) acc[pathName] = [];
                acc[pathName].push({ ...q, originalIndex: i });
                return acc;
              }, {})
            ).map(([pathName, pathQuests]) => (
              <optgroup key={pathName} label={pathName}>
                {pathQuests.map((q) => {
                  // Progressive unlock: lessons beyond the frontier show locked
                  // instead of exposing the entire 64-quest scope on day one.
                  const locked = q.originalIndex > furthestIndex + 1;
                  const freshness = !locked ? getMemoryFreshness(q.id) : null;
                  const freshnessBadge = freshness === 'fading' ? ' 🌫️' : freshness === 'faded' ? ' 💨' : '';
                  return (
                    <option key={q.id} value={q.originalIndex} disabled={locked}>
                      {locked ? '🔒 ' : ''}{q.title}: {q.name}{freshnessBadge}
                    </option>
                  );
                })}
              </optgroup>
            ))}
          </select>
        </div>
      </header>

      {/* SPACED-RECALL CHECKPOINT: replaces the quest grid every 5th lesson. */}
      {showMemoryEcho ? (
        <MemoryEcho quest={memoryEchoQuest} onContinue={() => setEchoAcknowledged(true)} />
      ) : (
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start self-center">

        {/* LORE SIDEBAR */}
        <aside className="lg:col-span-1 bg-ink-900 text-slate-300 p-8 rounded-xl border border-white/[0.08] text-left flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-google-yellow mb-4 border-b border-white/10 pb-2 flex items-center justify-between tracking-[-0.01em]">
              The Great Archive
            </h2>
            <p className="text-sm leading-relaxed mb-6 font-medium text-slate-200">
              Welcome, Scholar. The universe runs on an ancient, forgotten spell-binding language known as the <code className="text-google-blue text-md bg-black/30 px-1 rounded">Py-Tongue</code>.
            </p>
            <div className="bg-black/20 p-5 rounded-lg font-mono shadow-inner border border-white/[0.06] mb-2">
              <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-3 font-bold border-b border-white/[0.06] pb-1">The Lexicon</h3>
              <ul className="text-sm space-y-3">
                <li><span className="text-google-blue">Variables</span> = Sigils</li>
                <li><span className="text-google-green">Functions</span> = Incantations</li>
                <li><span className="text-google-yellow">Dictionaries</span> = Grimoires</li>
                <li><span className="text-purple-400">Lists</span> = Scroll Chains</li>
                <li><span className="text-cyan-400">Tuples</span> = Sealed Scrolls</li>
                <li><span className="text-orange-400">Sets</span> = Rune Circles</li>
                <li><span className="text-pink-400">Closures</span> = Soul Bindings</li>
                <li><span className="text-google-red">Bugs</span> = Anomalies</li>
              </ul>
            </div>
          </div>

          {/* THE DYNAMIC DIALOGUE SCENE */}
          <DialogScene phase={phase} dialogues={currentQuest.dialogues} />

        </aside>

        {/* EXPERIMENT CARD - WITH SCREEN SHAKE */}
        <motion.main
          animate={isShaking ? { x: [-10, 15, -12, 12, -8, 8, -5, 5, 0] } : {}}
          transition={{ duration: 0.5 }}
          className={`lg:col-span-2 rounded-xl border overflow-hidden transition-colors duration-500 ${isCinematicDark ? 'bg-ink-900 border-red-900/40 shadow-2xl shadow-red-900/20' : 'bg-white border-amber-100/50 shadow-2xl shadow-amber-500/10 text-slate-800'
            }`}
        >

          {/* Quest Banner */}
          <div className={`px-6 py-4 text-left border-b-4 transition-colors duration-1000 ${isBoss
              ? 'bg-gradient-to-r from-amber-900 via-slate-950 to-amber-900 border-amber-500'
              : isCinematicDark ? 'bg-slate-950 border-red-900' : 'bg-google-blue border-slate-900'
            }`}>
            {isBoss && (
              <div className="text-amber-400 text-xs font-black uppercase tracking-[0.2em] mb-1 flex items-center gap-2">
                <span>⚔️</span> Final Trial — {getBossPathName(currentQuest.id)}
              </div>
            )}
            <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${isBoss ? 'bg-amber-500/20 text-amber-200' : isCinematicDark ? 'bg-red-900/50 text-red-200' : 'bg-blue-900 text-blue-100'
              }`}>
              {currentQuest.title}
            </span>
            <h2 className={`font-serif text-3xl font-semibold tracking-[-0.02em] mt-2 ${isBoss ? 'text-amber-300' : isCinematicDark ? 'text-red-500' : 'text-white'}`}>{currentQuest.name}</h2>
          </div>

          <div className={`p-8 text-left transition-colors duration-1000 ${isCinematicDark ? 'bg-ink-950' : 'bg-slate-50'}`}>
            <div className="bg-slate-800 text-slate-300 p-4 rounded-lg mb-6 font-mono text-sm border border-slate-700">
              <span className="text-google-blue font-bold uppercase tracking-widest block mb-2">Arch-Mage's Logbook:</span>
              {currentQuest.logbook}
            </div>

            {/* PREDICTION SECTION */}
            {!predictionMade ? (
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-amber-900 mb-2 font-serif text-xl">The Prediction Binding</h3>
                <p className="text-amber-800 mb-4">Before weaving the spell, focus your mind. What will be the outcome when the dust settles?</p>

                {/* GENERATION EFFECT: optional free-text guess before seeing the
                    choices. Actively producing an answer (even a wrong one)
                    strengthens retention more than picking from a list —
                    this doesn't score or gate anything, it's pure practice. */}
                <button
                  onClick={() => setShowGuessBox((v) => !v)}
                  className="text-xs text-amber-700 underline decoration-dotted hover:text-amber-900 mb-3 cursor-pointer"
                >
                  🧠 {showGuessBox ? 'Hide' : 'Try predicting in your own words first'} (optional)
                </button>
                {showGuessBox && (
                  <textarea
                    value={guessText}
                    onChange={(e) => setGuessText(e.target.value)}
                    placeholder="What do you think will happen, and why?"
                    className="w-full mb-4 p-3 rounded border-2 border-amber-200 text-sm font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-google-yellow resize-none"
                    rows={2}
                  />
                )}

                <div className="space-y-3">
                  {currentQuest.predictions.map((pred, i) => (
                    <button key={i} onClick={handlePrediction} className="w-full text-left bg-white border-2 border-amber-200 p-3 rounded hover:bg-amber-100 hover:border-amber-400 transition-colors cursor-pointer font-medium text-amber-950 font-mono">
                      {pred}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <h3 className="font-bold text-slate-700 mb-3 flex items-center">
                  <span className="bg-amber-100 text-amber-800 p-1 rounded mr-2 text-xs uppercase">Step 2</span>
                  Cast the spell in the Editor below
                </h3>
                <CodePlayground key={codeKey} initialCode={currentQuest.code} onRunCode={handleRunCode} isLocked={!predictionMade} />

                {/* TABBED VIEWS BELOW THE EDITOR */}
                {discoveryVisible && (
                  <div className="mt-6 flex flex-col md:flex-row gap-6 relative items-start">
                    
                    {/* TAB CONTENT (LEFT SIDE) */}
                    <div className="flex-1 w-full order-2 md:order-1 overflow-y-auto max-h-[700px] pr-2 shrink">
                      {/* TAB CONTENT: ANOMALY REPORT */}
                      {activeTab === 'code' && (
                        <div className="bg-slate-900 border border-red-900/40 p-6 rounded-xl shadow-[0_0_30px_rgba(234,67,53,0.15)] animate-fade-in text-slate-200 overflow-hidden relative">

                          {/* THE APPRENTICE AVATAR */}
                          <motion.div
                            className="absolute right-4 top-4"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 1.2, 1], opacity: 1, rotate: [-15, 15, -10, 10, 0] }}
                            transition={{ type: "spring", bounce: 0.6, duration: 1 }}
                          >
                            <div className="bg-red-900 rounded-full border-4 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)] w-24 h-24 overflow-hidden flex items-center justify-center p-1">
                              <img src="/apprentice.png" alt="The Shocked Apprentice" className="w-full h-full object-contain filter hue-rotate-180 brightness-150" />
                            </div>
                          </motion.div>

                          <div className="pr-4 md:pr-28">
                            <h3 className="font-bold text-red-400 font-serif text-2xl mb-4 border-b border-red-900/50 pb-2 flex items-center gap-2">
                              <span>⚠️</span> {currentQuest.discovery.title}
                            </h3>
                            {/* SEQUENCED REVEAL: paragraphs type out one at a time.
                                Already-typed ones render statically; the current
                                one animates; later ones aren't mounted yet. */}
                            {currentQuest.discovery.texts.map((text, i) => {
                              if (i > revealedTextCount) return null;
                              return (
                                <p key={i} className="leading-relaxed text-lg mb-4 text-slate-300">
                                  {i === revealedTextCount ? (
                                    <Typewriter text={text} speed={25} onDone={() => handleDiscoveryTextDone(i)} />
                                  ) : (
                                    text
                                  )}
                                </p>
                              );
                            })}
                          </div>

                          {/* TRIAL + NEXT TOME: held back until the report is fully
                              read, so the payoff arrives as its own beat instead of
                              landing in the same instant as everything else. */}
                          {allTextsRevealed && (
                            <motion.div
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4 }}
                            >
                              <div className="bg-slate-900 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] border-dashed border-2 border-slate-700 p-5 mt-6 mb-6 rounded">
                                <h4 className="font-bold text-slate-400 mb-2 text-sm uppercase tracking-widest flex items-center gap-2">
                                  <span className="text-xl">⚒️</span> The Alchemist's Trial
                                </h4>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                  {currentQuest.discovery.trial}
                                </p>
                              </div>

                              {questIndex < quests.length - 1 && (
                                <button onClick={handleNextQuest} className="w-full bg-google-blue border-2 border-blue-400 text-white font-bold py-4 px-4 rounded shadow-[0_0_20px_rgba(66,133,244,0.4)] hover:bg-blue-600 transition-colors uppercase tracking-widest flex justify-center items-center cursor-pointer">
                                  Open Next Tome <span className="ml-2">→</span>
                                </button>
                              )}
                            </motion.div>
                          )}
                        </div>
                      )}

                      {/* TAB CONTENT: FEYNMAN SANDBOX */}
                      {activeTab === 'sandbox' && currentQuest.sandbox && (
                        <div className="animate-fade-in"><FeynmanCanvas sandbox={currentQuest.sandbox} /></div>
                      )}

                      {/* TAB CONTENT: EXPLOIT LAB */}
                      {activeTab === 'exploit' && (
                        <div className="animate-fade-in"><ExploitLab probes={probes[currentQuest.id] || []} /></div>
                      )}

                      {/* TAB CONTENT: CODE AUTOPSY */}
                      {activeTab === 'autopsy' && (
                        <div className="animate-fade-in"><CodeAutopsy autopsy={autopsies[currentQuest.id] || null} /></div>
                      )}

                      {/* TAB CONTENT: PATTERN RECOGNITION */}
                      {activeTab === 'pattern' && (
                        <div className="animate-fade-in"><PatternRecognition pattern={patterns[currentQuest.id] || null} /></div>
                      )}

                      {/* TAB CONTENT: INTERVIEW LENS */}
                      {activeTab === 'interview' && (
                        <div className="animate-fade-in"><InterviewLens lens={interviewLens[currentQuest.id] || null} /></div>
                      )}

                      {/* TAB CONTENT: THE FORGE */}
                      {activeTab === 'forge' && (
                        <div className="animate-fade-in"><ForgeChallenge key={`forge-${currentQuest.id}`} challenge={forge[currentQuest.id] || null} /></div>
                      )}
                    </div>

                    {/* TAB BUTTONS (RIGHT SIDE) — held back until the report is
                        fully read. Dropping all 7 tools on the learner in the
                        same instant as the reveal is the single biggest
                        overwhelm point in the old flow; this makes "read the
                        report" the first beat and "here are more tools" the
                        second. */}
                    {allTextsRevealed && (
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="flex flex-col space-y-2 w-full md:w-64 order-1 md:order-2 shrink-0 md:sticky md:top-0 overflow-y-auto max-h-[700px] md:pl-6 md:border-l border-slate-700/50"
                    >
                      <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2 px-3">Laboratory Tools</h4>
                      <button
                        onClick={() => setActiveTab('code')}
                        className={`px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer rounded-lg text-left ${activeTab === 'code'
                            ? 'bg-slate-900 text-red-400 ring-1 ring-inset ring-red-500/30'
                            : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                          }`}
                      >
                        ⚠️ Anomaly Report
                      </button>
                      {TOOL_UNLOCKS.map((tool) => {
                        const unlocked = isToolUnlocked(tool.key, furthestIndex);
                        const active = activeTab === tool.key;
                        const accent = TOOL_ACCENT_CLASSES[tool.key];
                        return (
                          <button
                            key={tool.key}
                            onClick={() => unlocked && setActiveTab(tool.key)}
                            disabled={!unlocked}
                            title={unlocked ? undefined : `Unlocks at Quest ${tool.unlocksAtIndex + 1}`}
                            className={`px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-lg text-left ${!unlocked
                                ? 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
                                : active
                                  ? `bg-slate-900 ${accent} cursor-pointer`
                                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700 cursor-pointer'
                              }`}
                          >
                            {unlocked ? tool.icon : '🔒'} {tool.label}
                          </button>
                        );
                      })}
                    </motion.div>
                    )}

                  </div>
                )}
              </div>
            )}

          </div>
        </motion.main>

      </div>
      )}

    </div>
  );
}

export default App;
