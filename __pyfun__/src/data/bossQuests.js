/**
 * src/data/bossQuests.js
 *
 * The last quest of each of the 6 core learning paths (from App.jsx's
 * QUEST_PATHS), reframed as a "Final Trial" — no new hints in the banner,
 * always the full cinematic treatment regardless of the quest's own
 * severity tag, and a distinct visual frame. Gives each path a season-finale
 * beat instead of just quietly running out of lessons.
 */

export const BOSS_QUEST_IDS = {
  7: '📦 Data & Collections',
  11: '⚡ Functions & Scope',
  13: '🌊 Generators & I/O',
  10: '🎁 The Art of Wrapping',
  205: '🏛️ OOP Foundations',
  15: '⚔️ OOP Advanced & Mastery',
};

export function isBossQuest(questId) {
  return Object.prototype.hasOwnProperty.call(BOSS_QUEST_IDS, questId);
}

export function getBossPathName(questId) {
  return BOSS_QUEST_IDS[questId] || null;
}
