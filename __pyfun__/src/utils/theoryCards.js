/**
 * src/utils/theoryCards.js
 *
 * Turns a theory topic's long-form sections into a flat deck of single-idea
 * "story" cards for TheorySwipe. This is a pure re-chunking of the EXISTING
 * theory.js content — no depth is cut, no copy is rewritten. The win is
 * purely presentational: Cognitive Load Theory (Sweller) says working
 * memory strains against a wall of text but handles one idea at a time
 * easily, and a 2000-word scroll that *looks* like a 2000-word scroll loses
 * a dopamine-calibrated reader before they read a word of it.
 *
 * Card shape (all fields optional except `kicker`/`icon`):
 *   { kicker, icon, headline, body, code, footer, sectionIndex, sectionTotal }
 */

function paragraphCards(section, sectionIndex, sectionTotal) {
  const cards = [];
  const paragraphs = (section.content || '').split('\n\n').filter(Boolean);
  paragraphs.forEach((para, i) => {
    cards.push({
      kicker: i === 0 ? section.heading : null,
      icon: '📖',
      headline: para.trim(),
      sectionIndex,
      sectionTotal,
    });
  });
  if (section.codeExample) {
    cards.push({
      kicker: 'See It In Code',
      icon: '🧪',
      code: section.codeExample,
      sectionIndex,
      sectionTotal,
    });
  }
  if (section.analogy) {
    cards.push({
      kicker: 'Think Of It Like...',
      icon: '💡',
      headline: section.analogy,
      sectionIndex,
      sectionTotal,
    });
  }
  return cards;
}

function visuallyExplainedCards(section, sectionIndex, sectionTotal) {
  const v = section.visuallyExplained;
  const cards = [];

  cards.push({
    kicker: section.heading,
    icon: '🪝',
    headline: v.hook,
    code: v.baseCase,
    sectionIndex,
    sectionTotal,
  });

  cards.push({
    kicker: "The 'Aha!' Moment",
    icon: '💡',
    headline: v.ahaMoment,
    sectionIndex,
    sectionTotal,
  });

  (v.incrementalBuild || []).forEach((step) => {
    cards.push({
      kicker: `Step ${step.step}: ${step.title}`,
      icon: '⚙️',
      headline: step.desc,
      code: step.code,
      sectionIndex,
      sectionTotal,
    });
  });

  cards.push({
    kicker: 'TL;DR',
    icon: '✅',
    headline: v.summary,
    footer: v.visualDescription,
    sectionIndex,
    sectionTotal,
  });

  return cards;
}

export function buildTheoryCards(topic) {
  if (!topic) return [];
  const sectionTotal = topic.sections.length;
  const cards = [
    {
      kicker: 'TL;DR',
      icon: '🎯',
      headline: topic.tldr,
      sectionIndex: -1,
      sectionTotal,
      isIntro: true,
    },
  ];

  topic.sections.forEach((section, sectionIndex) => {
    if (section.visuallyExplained) {
      cards.push(...visuallyExplainedCards(section, sectionIndex, sectionTotal));
    } else {
      cards.push(...paragraphCards(section, sectionIndex, sectionTotal));
    }
  });

  return cards;
}
