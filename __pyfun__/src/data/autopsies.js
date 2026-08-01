/**
 * src/data/autopsies.js
 * 
 * CODE AUTOPSY DATA
 * Each autopsy is a "dead" code sample the user must forensically examine.
 * The user steps through line-by-line annotations, identifies the "cause of death",
 * and discovers the fix.
 * 
 * Structure per quest ID:
 *   title: Forensic case name
 *   scenario: Setup narrative
 *   code: The buggy/surprising code (array of line objects)
 *   causeOfDeath: Index of the guilty line (0-based)
 *   verdict: Explanation after reveal
 *   fix: Corrected version of the code
 *   fixExplanation: Why the fix works
 *   connections: Related chapters that share this pattern
 */

export const autopsies = {

  // ═══════════════════════════════════════════════
  // Ch 1.4 — Mutable Default Arguments
  // ═══════════════════════════════════════════════
  1: {
    title: "Case #001: The Phantom Inventory",
    scenario: "A dungeon master reports that every new adventurer starts with items they never picked up. The guild's inventory system seems haunted — new characters mysteriously inherit potions from players who came before them.",
    code: [
      {
        text: "def create_adventurer(name, inventory=[]):",
        annotation: "Function definition. The default `inventory=[]` is evaluated ONCE when the function is defined, not each time it's called.",
        suspicious: true,
      },
      {
        text: "    inventory.append('torch')",
        annotation: "Appends 'torch' to the inventory list. But WHICH list? The same one from the default parameter — shared across ALL calls.",
        suspicious: true,
      },
      {
        text: "    return {'name': name, 'inventory': inventory}",
        annotation: "Returns a dict with the player's name and their inventory. Looks clean, but the inventory reference is shared.",
        suspicious: false,
      },
      {
        text: "",
        annotation: null,
        suspicious: false,
      },
      {
        text: "hero1 = create_adventurer('Alice')",
        annotation: "Creates Alice. The default [] is used for the first time. 'torch' is appended → inventory is now ['torch'].",
        suspicious: false,
      },
      {
        text: "hero1['inventory'].append('potion')",
        annotation: "Alice picks up a potion. inventory is now ['torch', 'potion']. But this is the SAME list object as the default.",
        suspicious: false,
      },
      {
        text: "",
        annotation: null,
        suspicious: false,
      },
      {
        text: "hero2 = create_adventurer('Bob')",
        annotation: "Creates Bob. No inventory provided, so the default is used. But the default IS the same list Alice mutated! Bob gets ['torch', 'potion', 'torch'].",
        suspicious: false,
      },
      {
        text: "print(f'Alice: {hero1[\"inventory\"]}')",
        annotation: "Prints Alice's inventory. Surprise: it now shows Bob's torch too, because they share the SAME list.",
        suspicious: false,
      },
      {
        text: "print(f'Bob:   {hero2[\"inventory\"]}')",
        annotation: "Prints Bob's inventory. Both Alice and Bob show the same items because they reference the same list object.",
        suspicious: false,
      },
    ],
    causeOfDeath: 0,
    verdict: "**Cause of Death: Shared Mutable Default**\n\nThe `inventory=[]` default is created ONCE at function definition time, not per call. Every call that uses the default shares the SAME list object. When Alice mutates it, Bob inherits her items.\n\nThis is Python's most famous gotcha. The default value is bound to the function object itself — it's an attribute: `create_adventurer.__defaults__`.",
    fix: `def create_adventurer(name, inventory=None):
    if inventory is None:
        inventory = []  # New list every call
    inventory.append('torch')
    return {'name': name, 'inventory': inventory}

hero1 = create_adventurer('Alice')
hero1['inventory'].append('potion')

hero2 = create_adventurer('Bob')
print(f'Alice: {hero1["inventory"]}')
print(f'Bob:   {hero2["inventory"]}')`,
    fixExplanation: "The sentinel pattern: use `None` as the default, then create a new list inside the function body. This ensures every call gets its own fresh list. This is the #1 most important Python idiom.",
    connections: [
      { chapter: "DS 1.1", name: "Lists Deep Dive", link: "Lists are mutable — understanding mutability is the prerequisite." },
      { chapter: "DS 1.2", name: "Tuples & Unpacking", link: "Tuples are immutable, so they're SAFE as defaults. This contrast teaches why mutability matters." },
      { chapter: "Ch 5.2", name: "__init__ & Constructors", link: "The same bug appears in class __init__ methods with mutable default parameters." },
      { chapter: "DS 2.1", name: "defaultdict", link: "defaultdict solves the 'create-if-missing' problem that mutable defaults try to solve badly." },
    ]
  },

};
