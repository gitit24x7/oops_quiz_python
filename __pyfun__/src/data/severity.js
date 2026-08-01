/**
 * src/data/severity.js
 *
 * Tags each quest's reveal with a dramatic weight so the "cinematic hit"
 * (screen shake + blackout) is reserved for genuine reversals instead of
 * firing identically on every single quest.
 *
 * - mindblow: the classic JS-dev-gotcha reversals (mutable defaults, is vs ==,
 *   late-binding closures, GIL races, etc.) — full shake + blackout.
 * - major: a real "didn't expect that" feature reveal — blackout, no shake.
 * - mild: a straightforward feature tour — no blackout, no shake.
 */

const MINDBLOW_IDS = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, // The Anomaly Tomes
  101, // generator exhaustion crash
  102, // self is just an argument
]);

const MILD_IDS = new Set([
  104, 105, 107, 109, 110, // gentle Foundational Magic feature tours
  301, 302, 305, 306, 307, 308, 309, 310, // Data Structures tour lessons
]);

export function getSeverity(questId) {
  if (MINDBLOW_IDS.has(questId)) return 'mindblow';
  if (MILD_IDS.has(questId)) return 'mild';
  return 'major';
}
