/**
 * src/data/patterns.js
 * 
 * PATTERN RECOGNITION DATA
 * Each pattern shows 2-3 code snippets from DIFFERENT chapters that share
 * a common underlying principle. The user must identify the shared pattern.
 * 
 * Structure per quest ID:
 *   title: Pattern name
 *   description: What the pattern is about
 *   snippets: Array of { chapter, code, explanation }
 *   question: "What pattern do these share?"
 *   options: Multiple choice answers
 *   correctIndex: Which option is correct
 *   reveal: Deep explanation of the shared pattern
 *   principle: The one-line principle to remember
 *   badge: Badge earned for recognizing this pattern
 */

export const patterns = {

  // ═══════════════════════════════════════════════
  // Ch 1.4 — Mutable Default Arguments
  // Cross-links: DS 1.1 (Lists), DS 1.2 (Tuples), Ch 5.2 (__init__)
  // ═══════════════════════════════════════════════
  1: {
    title: "The Mutability Web",
    description: "Three pieces of code from different chapters. One pattern connects them all.",
    snippets: [
      {
        chapter: "Ch 1.4 — Mutable Defaults",
        code: `def add_item(name, items=[]):
    items.append(name)
    return items

a = add_item('sword')
b = add_item('shield')
print(b)  # ['sword', 'shield'] ← WAT?`,
        explanation: "The default `[]` is shared across calls. Both `a` and `b` point to the same list. The mutable default accumulates state silently."
      },
      {
        chapter: "DS 1.1 — Lists Deep Dive",
        code: `original = [1, 2, 3]
alias = original        # NOT a copy!
alias.append(4)
print(original)         # [1, 2, 3, 4] ← WAT?

clone = original[:]     # THIS is a copy
clone.append(5)
print(original)         # [1, 2, 3, 4] ← safe`,
        explanation: "Assignment creates an ALIAS (same object), not a copy. Mutating the alias mutates the original. Slicing `[:]` creates a shallow copy."
      },
      {
        chapter: "Ch 5.2 — __init__ & Constructors",
        code: `class Guild:
    members = []  # Class attribute, shared!
    
    def add(self, name):
        self.members.append(name)

g1 = Guild()
g1.add('Alice')
g2 = Guild()
g2.add('Bob')
print(g1.members)  # ['Alice', 'Bob'] ← WAT?`,
        explanation: "Class-level mutable attributes are shared across ALL instances. g1.members and g2.members are the SAME list. Move it to __init__ to fix."
      }
    ],
    question: "What hidden pattern connects all three code snippets?",
    options: [
      "They all use lists incorrectly",
      "They all share a mutable object when they shouldn't — mutating one reference affects all others",
      "They all have syntax errors that Python silently ignores",
      "They all demonstrate Python's garbage collection problem"
    ],
    correctIndex: 1,
    reveal: "**The Pattern: Unintended Shared Mutability**\n\nIn all three cases, multiple names point to the SAME mutable object. When one mutates it, all see the change.\n\n- **Default args**: The `[]` is created once and shared across calls\n- **Aliases**: `y = x` makes both names point to the same object\n- **Class attributes**: Mutable values defined at class level are shared across all instances\n\n**The Fix is always the same principle**: Create a NEW mutable object where you need independence — in the function body, via slicing/copy, or in `__init__`.",
    principle: "If two names should have independent data, they must reference DIFFERENT mutable objects. Assignment and defaults create aliases, not copies.",
    badge: "The Mutability Detective"
  },

};
