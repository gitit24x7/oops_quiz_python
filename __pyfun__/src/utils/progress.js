/**
 * src/utils/progress.js
 *
 * Small localStorage-backed persistence for two things:
 *  - Progressive unlock: how far the learner has actually reached, so the
 *    Ch-jump dropdown and Laboratory Tools can be gated instead of exposing
 *    the entire 64-quest scope (and every tool) on day one.
 *  - Forgetting-curve badges: when a quest was last visited, so already-seen
 *    quests can show a "fresh / fading / faded" indicator nudging review.
 *
 * All reads/writes are wrapped defensively — private browsing, storage
 * quotas, or SSR-less environments should degrade to "nothing is unlocked
 * yet" rather than throw.
 */

const KEYS = {
  furthestIndex: 'pq_furthest_index',
  lastSeen: 'pq_last_seen',
};

function safeGet(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore — progress just won't persist this session
  }
}

/** Highest quest index (0-based, position in the flattened quest list) ever reached. */
export function getFurthestIndex() {
  return safeGet(KEYS.furthestIndex, 0);
}

/** Call whenever the learner lands on `index` — extends the unlock frontier if new ground. */
export function markIndexReached(index) {
  const current = getFurthestIndex();
  if (index > current) safeSet(KEYS.furthestIndex, index);
}

/** A quest is locked once it's more than one step beyond the furthest ever reached. */
export function isIndexLocked(index) {
  return index > getFurthestIndex() + 1;
}

export function markQuestSeen(questId) {
  const seen = safeGet(KEYS.lastSeen, {});
  seen[questId] = Date.now();
  safeSet(KEYS.lastSeen, seen);
}

export function getQuestLastSeen(questId) {
  const seen = safeGet(KEYS.lastSeen, {});
  return seen[questId] || null;
}

export function getSeenQuestIds() {
  const seen = safeGet(KEYS.lastSeen, {});
  return Object.keys(seen).map(Number);
}

/** 'fresh' (<1 day), 'fading' (<5 days), 'faded' (5+ days), or null (never seen). */
export function getMemoryFreshness(questId) {
  const ts = getQuestLastSeen(questId);
  if (!ts) return null;
  const days = (Date.now() - ts) / (1000 * 60 * 60 * 24);
  if (days < 1) return 'fresh';
  if (days < 5) return 'fading';
  return 'faded';
}
