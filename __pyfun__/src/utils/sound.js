/**
 * src/utils/sound.js
 *
 * Tiny Web-Audio-synthesized SFX layer. No audio files are downloaded or
 * bundled — every cue is a couple of oscillator tones generated on the fly,
 * so there's nothing to source, license, or fail to load.
 *
 * FEATURES.md called for "dings" and "womp-womp" sounds that were never
 * actually wired up; this closes that gap with the smallest possible
 * implementation.
 */

let sharedCtx = null;

function getCtx() {
  if (typeof window === 'undefined') return null;
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return null;
  if (!sharedCtx) sharedCtx = new Ctor();
  return sharedCtx;
}

function tone({ freq, duration = 0.15, type = 'sine', gain = 0.07, delay = 0 }) {
  const ctx = getCtx();
  if (!ctx) return;
  try {
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(g).connect(ctx.destination);
    const start = ctx.currentTime + delay;
    g.gain.setValueAtTime(gain, start);
    g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.start(start);
    osc.stop(start + duration + 0.02);
  } catch {
    // Audio unavailable (autoplay policy, unsupported browser, etc) — silent no-op.
  }
}

/** A light click when a prediction/option is selected. */
export function playSelectSound() {
  tone({ freq: 440, duration: 0.07, type: 'triangle', gain: 0.05 });
}

/** The reveal "sting", scaled to the quest's dramatic weight. */
export function playRevealSting(severity) {
  if (severity === 'mindblow') {
    tone({ freq: 196, duration: 0.28, type: 'sawtooth', gain: 0.09 });
    tone({ freq: 98, duration: 0.4, type: 'sawtooth', gain: 0.07, delay: 0.06 });
  } else if (severity === 'major') {
    tone({ freq: 330, duration: 0.2, type: 'sine', gain: 0.06 });
  } else {
    tone({ freq: 523, duration: 0.12, type: 'sine', gain: 0.045 });
  }
}

/** A rising three-note chime for "Open Next Tome". */
export function playChime() {
  tone({ freq: 523.25, duration: 0.15, type: 'sine', gain: 0.055 });
  tone({ freq: 659.25, duration: 0.18, type: 'sine', gain: 0.055, delay: 0.12 });
  tone({ freq: 783.99, duration: 0.28, type: 'sine', gain: 0.055, delay: 0.24 });
}

/** A short two-note "unlock" cue for newly-earned Laboratory Tools. */
export function playUnlockChime() {
  tone({ freq: 660, duration: 0.1, type: 'square', gain: 0.04 });
  tone({ freq: 880, duration: 0.2, type: 'square', gain: 0.04, delay: 0.09 });
}
