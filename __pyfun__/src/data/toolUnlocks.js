/**
 * src/data/toolUnlocks.js
 *
 * Milestones (0-based position in the flattened quest list) at which each
 * Laboratory Tool becomes available. Dropping all 7 tools on the learner in
 * lesson 1 was the single biggest overwhelm point in the old flow; this
 * turns them into something earned, narratively and mechanically.
 * "Anomaly Report" (the 'code' tab) isn't listed — it's always available,
 * it *is* the core loop.
 */

export const TOOL_UNLOCKS = [
  { key: 'sandbox', label: 'Feynman Sandbox', icon: '🧪', unlocksAtIndex: 0 },
  { key: 'exploit', label: 'Exploit Lab', icon: '🔓', unlocksAtIndex: 2 },
  { key: 'autopsy', label: 'Code Autopsy', icon: '🔬', unlocksAtIndex: 5 },
  { key: 'pattern', label: 'Pattern Recognition', icon: '🧩', unlocksAtIndex: 9 },
  { key: 'interview', label: 'Interview Lens', icon: '🎯', unlocksAtIndex: 14 },
  { key: 'forge', label: 'The Forge', icon: '⚒️', unlocksAtIndex: 19 },
];

export function isToolUnlocked(toolKey, furthestIndex) {
  const tool = TOOL_UNLOCKS.find((t) => t.key === toolKey);
  if (!tool) return true;
  return furthestIndex >= tool.unlocksAtIndex;
}

/** Tools that just became unlocked when the frontier moved from `prevIndex` to `nextIndex`. */
export function toolsUnlockedBetween(prevIndex, nextIndex) {
  return TOOL_UNLOCKS.filter((t) => t.unlocksAtIndex > prevIndex && t.unlocksAtIndex <= nextIndex);
}
