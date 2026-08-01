/**
 * src/components/DialogScene.jsx
 * 
 * DESCRIPTION:
 * An animated visual novel style scene featuring the Archmage and Apprentices.
 * It dynamically changes the dialogue based on the current phase of the experiment,
 * allowing users to learn through active character conversations rather than reading dense text.
 * 
 * CONTENTS:
 * - A dialogue cycle engine using `useEffect`.
 * - Framer Motion animations for characters talking (bouncing briefly).
 * - Speech bubble UI.
 * 
 * CONNECTIONS:
 * - Rendered in the left sidebar of `src/App.jsx`.
 * - Receives `phase` prop ('intro', 'predicting', 'revealed') to select the script.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { estimateReadMs } from '../utils/pacing';

export default function DialogScene({ phase = 'intro', dialogues }) {
  const [lineIndex, setLineIndex] = useState(0);

  // Hooks must run on every render regardless of whether `dialogues` is
  // present, so the guards live inside each effect rather than as early
  // returns above them.
  const currentScript = dialogues ? (dialogues[phase] || dialogues.intro || []) : [];
  const currentLine = currentScript[lineIndex] || currentScript[0];

  // Reset dialogue when phase changes
  useEffect(() => {
    setLineIndex(0);
  }, [phase]);

  // Auto-advance dialogue, holding each line for a duration proportional to
  // its length instead of a flat timer (so punchlines don't linger and
  // exposition doesn't get cut off).
  useEffect(() => {
    if (currentScript.length === 0 || lineIndex >= currentScript.length - 1) return undefined;
    const timer = setTimeout(() => {
      setLineIndex((prev) => (prev < currentScript.length - 1 ? prev + 1 : prev));
    }, estimateReadMs(currentScript[lineIndex]?.text));
    return () => clearTimeout(timer);
  }, [currentScript, lineIndex]);

  if (!dialogues || !currentLine) return null;

  // Handle manual click to advance faster
  const advanceDialogue = () => {
    setLineIndex((prev) => {
      if (prev < currentScript.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  };

  return (
    <div className="flex flex-col items-center bg-black/25 rounded-xl p-4 border border-white/[0.06] mt-6 w-full relative overflow-hidden cursor-pointer" onClick={advanceDialogue}>
      
      {/* Speech Bubble Area */}
      <div className="h-32 w-full mb-4 relative flex items-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLine.text}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className={`w-full p-4 rounded-lg shadow-md border-2 relative ${
              currentLine.speaker === 'mage' 
                ? 'bg-blue-900 border-google-blue text-blue-100' 
                : 'bg-emerald-900 border-google-green text-emerald-100'
            }`}
          >
            <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${currentLine.speaker === 'mage' ? 'text-google-yellow' : 'text-google-green'}`}>
              {currentLine.name}
            </span>
            <p className="text-sm italic leading-relaxed">"{currentLine.text}"</p>
            
            {/* Pointer triangle */}
            <div className={`absolute -bottom-3 w-4 h-4 transform rotate-45 border-b-2 border-r-2 ${
                currentLine.speaker === 'mage' 
                  ? 'bg-blue-900 border-google-blue left-8' 
                  : currentLine.speaker === 'apprentice1'
                    ? 'bg-emerald-900 border-google-green right-20'
                    : 'bg-emerald-900 border-google-green right-8'
              }`} 
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Characters Area */}
      <div className="flex justify-between items-end w-full px-2 h-28 relative mt-2">
        
        {/*
          Speakers react once when the line changes to them — no idle bob.
          Ambient looping motion on a character that isn't talking reads as
          decoration, not communication; it earns nothing and never stops
          asking for attention.
        */}
        {/* Archmage (Left) */}
        <motion.div
          className="w-24 h-24 origin-bottom bg-slate-900 rounded-full border-2 border-slate-700 flex items-center justify-center overflow-hidden z-10"
          animate={{ scale: currentLine.speaker === 'mage' ? 1.08 : 1 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src="/archmage.png" alt="Archmage" className="w-full h-full object-contain" />
        </motion.div>

        {/* Apprentices (Right) */}
        <div className="flex -space-x-8">
          {/* Apprentice 1 */}
          <motion.div
            className="w-20 h-20 origin-bottom bg-slate-900 rounded-full border-2 border-slate-700 flex items-center justify-center overflow-hidden z-20"
            animate={{ scale: currentLine.speaker === 'apprentice1' ? 1.08 : 1 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
             <img src="/apprentice.png" alt="Apprentice 1" className="w-full h-full object-contain transform -scale-x-100" />
          </motion.div>

          {/* Apprentice 2 (Scaled down slightly, in back) */}
          <motion.div
            className="w-16 h-16 origin-bottom bg-slate-900 rounded-full border-2 border-slate-700 flex items-center justify-center overflow-hidden z-10 opacity-80"
            animate={{ scale: currentLine.speaker === 'apprentice2' ? 1.1 : 1 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
             {/* We flip the image so they face the mage */}
             <img src="/apprentice.png" alt="Apprentice 2" className="w-full h-full object-contain transform -scale-x-100" />
          </motion.div>
        </div>

      </div>

      <div className="mt-2 text-slate-500 text-xs text-center w-full">Click scene to advance dialogue</div>
    </div>
  );
}
