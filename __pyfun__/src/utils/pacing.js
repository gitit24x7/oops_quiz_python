/**
 * src/utils/pacing.js
 *
 * Shared "how long should this stay on screen" formula — used by anything
 * that auto-advances text (DialogScene's dialogue timer, TheorySwipe's
 * story-style cards) so line/card duration scales with how much there is to
 * read instead of a flat timer.
 */

const DEFAULT_MS_PER_CHAR = 50; // ~20 chars/sec, ~200wpm comfortable reading pace

export function estimateReadMs(text = '', { min = 2200, max = 8000, msPerChar = DEFAULT_MS_PER_CHAR } = {}) {
  return Math.min(max, Math.max(min, text.length * msPerChar));
}
