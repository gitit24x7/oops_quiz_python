/**
 * src/components/TheorySwipe.jsx
 *
 * DESCRIPTION:
 * A Stories/Reels-style reader for theory topics — one idea per screen,
 * segmented progress bar, tap zones + swipe + keyboard to navigate,
 * auto-advance paced by how much text is on screen. Same underlying
 * content as TheoryArticle (see src/utils/theoryCards.js), just chunked
 * for a reader who bounces off a long scroll before reading a word of it.
 *
 * INTERACTION MODEL (mirrors Instagram/TikTok Stories):
 * - Tap right two-thirds  → next card
 * - Tap left third        → previous card
 * - Press and hold        → pause auto-advance
 * - Swipe left/right      → next/previous
 * - Arrow keys / Space    → next/previous
 * - Reaching the end shows the connected-quests CTA screen.
 *
 * CONNECTIONS:
 * - Imported by src/App.jsx as the default theory reading view.
 * - `onSwitchToFullArticle` lets the learner drop into the classic
 *   long-form TheoryArticle scroll instead, for anyone who wants full
 *   linear depth over the card format.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { buildTheoryCards } from '../utils/theoryCards';
import { estimateReadMs } from '../utils/pacing';

const TICK_MS = 50;
const HOLD_THRESHOLD_MS = 220;
const SWIPE_THRESHOLD_PX = 60;

function cardDurationMs(card) {
  const text = [card.kicker, card.headline, card.body, card.code, card.footer].filter(Boolean).join(' ');
  return estimateReadMs(text, { min: 3200, max: 10000, msPerChar: 45 });
}

export default function TheorySwipe({ topic, quests, onBack, onEnterQuest, onSwitchToFullArticle }) {
  const cards = useMemo(() => buildTheoryCards(topic), [topic]);
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const pointerRef = useRef({ x: 0, y: 0, downAt: 0, holding: false });

  const isCtaScreen = index >= cards.length;
  const card = cards[index];
  const duration = card ? cardDurationMs(card) : 0;

  // Functional updates so rapid taps (before a render lands) each still
  // advance by one step instead of all reading the same stale `index`.
  const goTo = (nextIndex, dir) => {
    setDirection(dir);
    setIndex(Math.max(0, Math.min(cards.length, nextIndex)));
  };
  const goNext = () => {
    setDirection(1);
    setIndex((prev) => Math.min(cards.length, prev + 1));
  };
  const goPrev = () => {
    setDirection(-1);
    setIndex((prev) => Math.max(0, prev - 1));
  };

  // Reset the per-card timer whenever the card changes.
  useEffect(() => {
    setElapsed(0);
  }, [index]);

  // Tick the elapsed clock while visible and not paused.
  useEffect(() => {
    if (paused || isCtaScreen) return undefined;
    const id = setInterval(() => setElapsed((prev) => prev + TICK_MS), TICK_MS);
    return () => clearInterval(id);
  }, [paused, index, isCtaScreen]);

  // Separate effect (not the setInterval callback) advances the card once
  // elapsed crosses the duration — keeps the side effect out of a setState
  // updater, matching the fix applied to DialogScene's own timer.
  useEffect(() => {
    if (isCtaScreen) return;
    if (elapsed >= duration) goNext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsed]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
      else if (e.key === 'Escape') { onBack(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const handlePointerDown = (e) => {
    pointerRef.current = { x: e.clientX, y: e.clientY, downAt: Date.now(), holding: false };
    const holdTimer = setTimeout(() => {
      pointerRef.current.holding = true;
      setPaused(true);
    }, HOLD_THRESHOLD_MS);
    pointerRef.current.holdTimer = holdTimer;
  };

  const handlePointerUp = (e) => {
    clearTimeout(pointerRef.current.holdTimer);
    const wasHolding = pointerRef.current.holding;
    setPaused(false);
    const dx = e.clientX - pointerRef.current.x;
    const dy = e.clientY - pointerRef.current.y;

    if (Math.abs(dx) > SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? goNext() : goPrev();
      return;
    }
    if (wasHolding) return; // was a hold-to-pause, not a tap — don't also navigate
    // Tap zones: left third = back, right two-thirds = forward.
    const zoneX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const width = e.currentTarget.getBoundingClientRect().width;
    if (zoneX < width / 3) goPrev();
    else goNext();
  };

  if (!topic) return null;

  return (
    <div className="archive-bg min-h-screen flex flex-col items-center">
      {/* TOP CHROME */}
      <div className="w-full max-w-md pt-4 px-4 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <button onClick={onBack} className="text-slate-400 hover:text-white text-sm flex items-center gap-1 cursor-pointer">
            <span>←</span> Topics
          </button>
          <span className="text-slate-500 text-xs font-medium">{topic.icon} {topic.title}</span>
          <button onClick={onSwitchToFullArticle} className="text-slate-400 hover:text-white text-xs underline decoration-dotted cursor-pointer">
            📖 Full Article
          </button>
        </div>

        {/* SEGMENTED PROGRESS BAR (Stories-style) */}
        <div className="flex gap-1">
          {cards.map((c, i) => (
            <div key={i} className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full w-full rounded-full bg-gradient-to-r ${topic.color} origin-left`}
                style={{
                  // transform instead of width: avoids layout thrash on a bar
                  // that repaints every 50ms while a card is active.
                  transform: `scaleX(${i < index ? 1 : i === index && !isCtaScreen ? Math.min(1, elapsed / duration) : 0})`,
                  transition: i === index ? 'none' : 'transform 0.2s',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CARD STAGE */}
      <div
        className="relative w-full max-w-md flex-1 flex items-center justify-center px-4 py-6 select-none touch-none z-10"
        style={{ minHeight: '70vh' }}
        onPointerDown={!isCtaScreen ? handlePointerDown : undefined}
        onPointerUp={!isCtaScreen ? handlePointerUp : undefined}
        onPointerLeave={() => setPaused(false)}
      >
        {/* NOTE: deliberately not wrapped in AnimatePresence mode="wait" — with
            elapsed ticking every 50ms for the progress bar, the exit-then-enter
            coordination could get interrupted mid-cycle and leave a card stuck
            on its invisible initial animation frame. A plain key-based remount
            still gets the enter animation (framer-motion always runs
            initial→animate on mount) without that failure mode. */}
        <div className="relative">
          {!isCtaScreen ? (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: direction > 0 ? 32 : -32, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full"
            >
              {/* Ambient glow behind the glass, tinted to the topic's element */}
              <div className={`pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br ${topic.color} opacity-20 blur-2xl`} />
              <div className={`relative w-full rounded-2xl shadow-2xl shadow-black/50 bg-gradient-to-br ${topic.color} p-[1px]`}>
                <div className="liquid-glass !rounded-2xl bg-ink-950/70 p-8 h-full flex flex-col min-h-[50vh]">
                {card.sectionIndex >= 0 && (
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-2">
                    Section {card.sectionIndex + 1} / {card.sectionTotal}
                  </span>
                )}
                {card.kicker && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{card.icon}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-300">{card.kicker}</span>
                  </div>
                )}
                {card.headline && (
                  <p className="font-serif text-slate-50 text-2xl leading-snug font-medium tracking-[-0.01em] mb-4">{card.headline}</p>
                )}
                {card.code && (
                  <pre className="bg-black/40 border border-slate-800 rounded-xl p-4 overflow-x-auto text-sm mb-4">
                    <code className="text-google-green font-mono whitespace-pre-wrap">{card.code}</code>
                  </pre>
                )}
                {card.footer && (
                  <p className="text-slate-500 text-xs italic mt-auto pt-4 border-t border-slate-800/60">{card.footer}</p>
                )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cta"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-ink-900 border border-white/[0.08] rounded-2xl p-6"
            >
              <h3 className="font-serif text-xl font-semibold text-white mb-2 flex items-center gap-2">
                <span className="text-2xl">🧪</span> Now Put It to the Test
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Theory is nothing without practice. Pick a quest.
              </p>
              <div className="space-y-3">
                {topic.connectedQuestIds.map((questId, i) => {
                  const quest = quests.find((q) => q.id === questId);
                  if (!quest) return null;
                  return (
                    <button
                      key={questId}
                      onClick={() => onEnterQuest(questId)}
                      className="w-full text-left bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-xl p-4 transition-all cursor-pointer"
                    >
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">Quest {i + 1}</span>
                      <span className="text-white font-bold">{quest.name}</span>
                    </button>
                  );
                })}
              </div>
              <button onClick={() => goTo(0, -1)} className="w-full mt-4 text-slate-500 hover:text-slate-300 text-xs underline cursor-pointer">
                ↺ Watch the cards again
              </button>
            </motion.div>
          )}
        </div>

        {/* Discoverability arrows (tap zones work without these, but not everyone knows that) */}
        {!isCtaScreen && index > 0 && (
          <button
            onClick={goPrev}
            className="absolute left-1 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white text-2xl w-8 h-8 flex items-center justify-center cursor-pointer"
          >
            ‹
          </button>
        )}
        {!isCtaScreen && (
          <button
            onClick={goNext}
            className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white text-2xl w-8 h-8 flex items-center justify-center cursor-pointer"
          >
            ›
          </button>
        )}
      </div>

      {!isCtaScreen && (
        <p className="text-slate-600 text-xs pb-4">Tap to advance · hold to pause · swipe · arrow keys</p>
      )}
    </div>
  );
}
