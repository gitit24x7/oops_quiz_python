/**
 * src/components/MemoryEcho.jsx
 *
 * A spaced-recall checkpoint. Every 5th quest, before the new lesson opens,
 * the learner is handed an earlier quest's code again and asked to
 * re-predict — pure retrieval practice, no scoring claim (the quest data
 * has no "correct answer" field to grade against, so this doesn't pretend
 * to). Re-reveals that quest's original discovery as the refresher.
 *
 * CONNECTIONS:
 * - Rendered by App.jsx in place of the normal quest view when the learner
 *   lands on a checkpoint index (see `isCheckpointIndex` in App.jsx).
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function MemoryEcho({ quest, onContinue }) {
  const [revealed, setRevealed] = useState(false);

  if (!quest) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl w-full bg-slate-900 border-2 border-purple-500/40 rounded-xl shadow-[0_0_40px_rgba(168,85,247,0.15)] p-8 text-left text-slate-200"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">🔮</span>
        <h2 className="text-2xl font-serif font-bold text-purple-300">The Archive Remembers</h2>
      </div>
      <p className="text-slate-400 text-sm mb-6">
        Before the next Tome opens, the Arch-Mage tests whether an old anomaly still holds. This doesn't affect your progress — it's just a chance to prove it stuck.
      </p>

      <div className="bg-slate-950 border border-slate-700 rounded p-4 mb-6">
        <div className="text-xs uppercase tracking-widest text-purple-400 font-bold mb-2">{quest.name}</div>
        <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">{quest.code}</pre>
      </div>

      {!revealed ? (
        <div className="space-y-3">
          <p className="text-slate-300 font-medium mb-2">What happens when this runs, again?</p>
          {quest.predictions.map((pred, i) => (
            <button
              key={i}
              onClick={() => setRevealed(true)}
              className="w-full text-left bg-slate-800 border-2 border-slate-700 p-3 rounded hover:bg-slate-700 hover:border-purple-500/50 transition-colors cursor-pointer font-mono text-sm text-slate-200"
            >
              {pred}
            </button>
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <h3 className="font-bold text-purple-300 font-serif text-lg mb-3">{quest.discovery.title}</h3>
          {quest.discovery.texts.map((text, i) => (
            <p key={i} className="text-slate-300 text-sm leading-relaxed mb-3">{text}</p>
          ))}
          <button
            onClick={onContinue}
            className="w-full mt-2 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 text-white font-bold py-3 px-4 rounded shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-colors uppercase tracking-widest cursor-pointer"
          >
            Continue the Journey →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
