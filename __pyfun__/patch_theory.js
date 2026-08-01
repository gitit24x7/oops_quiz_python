const fs = require('fs');

const file = 'C:\\Users\\Lenovo\\OneDrive\\Desktop\\Python\\__pyfun__\\src\\data\\theory.js';
let content = fs.readFileSync(file, 'utf8');

const dataCollectionsSections = [
  {
    heading: "Why do we even need 'containers'?",
    visuallyExplained: {
      hook: "You are running a small library. You try to assign every single book to its own variable: `book1`, `book2`, `book3`. When you hit 10,000 books, your code becomes an unmaintainable nightmare.",
      baseCase: "book1 = 'Harry Potter'\nbook2 = 'Lord of the Rings'\nbook3 = 'Dune'",
      ahaMoment: "Data structures are just different types of furniture. A single variable is a single sticky note. A data structure is a massive filing cabinet, a bookshelf, or a bag. You pick the furniture based on the job.",
      incrementalBuild: [
        { step: 1, title: "Simplest implementation", code: "books = ['Harry Potter', 'Lord of the Rings', 'Dune']", desc: "We use a List to store infinite items under a single variable name." },
        { step: 2, title: "A common 'gotcha'", code: "books[99] # IndexError!", desc: "You must know how many items are in the list. Trying to access an index that doesn't exist crashes the program." },
        { step: 3, title: "The 'Pythonic' way", code: "print(len(books)) # Fast capacity check", desc: "Always use `len()` to check capacity. Python internally tracks the length, so this is blazing fast (O(1))." }
      ],
      visualDescription: "Animation shows 10,000 floating sticky notes violently blowing around a room forming a chaotic tornado. Suddenly, a sleek, glowing 'Container' box slams onto the floor and vacuums all the notes inside, organizing them neatly into slots.",
      summary: "In a nutshell, variables hold a single value, but containers (data structures) group infinite values under one scalable reference."
    }
  },
  {
    heading: "Lists — The Ordered Shelf",
    visuallyExplained: {
      hook: "You need to store a history of user actions in order. You try using custom named variables, but you have no way to dynamically insert new actions or keep them in sequence.",
      baseCase: "action_1 = 'login'\naction_2 = 'click'\naction_3 = 'logout'",
      ahaMoment: "A list is a physical row of numbered school lockers. Every item has perfectly assigned locker numbers starting at 0. You can instantly open locker #5, but if you want to insert a new locker between #2 and #3, every single locker from #3 onward must physically shift down the hallway.",
      incrementalBuild: [
        { step: 1, title: "Simplest implementation", code: "inventory = ['sword', 'shield']\ninventory.append('potion')", desc: "Appending to the end is blazing fast because no lockers have to shift." },
        { step: 2, title: "A common 'gotcha'", code: "inventory.insert(0, 'helmet')", desc: "Inserting at the very beginning is dangerously slow. Every single item in the entire list must be physically moved down one slot in memory (O(N) operation)." },
        { step: 3, title: "The 'Pythonic' way", code: "print(inventory[0]) # instant O(1) access", desc: "If you need fast retrieval by position, lists excel. They calculate the exact memory address instantly." }
      ],
      visualDescription: "We see a row of metallic lockers. A mechanical arm drops a new item at the far end easily. But when it tries to force an item into the front locker, alarms sound, and all other lockers groan as they slide down a massive track to make room.",
      summary: "In a nutshell, Lists are ordered, mutable sequences optimized for appending to the end and random access by index, but terrible for inserting at the front."
    }
  },
  {
    heading: "Dictionaries — The Filing Cabinet",
    visuallyExplained: {
      hook: "You have a list of user properties: age, name, role. You rely on indexes (user[0] is age), which makes your code completely unreadable and fragile if the order ever changes.",
      baseCase: "player = ['Alice', 100, 'Mage']\n\nif player[2] == 'Mage':\n    execute_magic()",
      ahaMoment: "A Dictionary is a corporate filing cabinet with tabbed manila folders. You don't count 'give me the 4th folder'. You just read the label 'email' and grab it instantly using a Hash Function.",
      incrementalBuild: [
        { step: 1, title: "Simplest implementation", code: "player = {'name': 'Alice', 'role': 'Mage'}", desc: "We assign explicit string labels (keys) to every data point (values)." },
        { step: 2, title: "A common 'gotcha'", code: "player = {[1, 2]: 'score'} # CRASH!", desc: "Dict keys MUST be immutable (hashable) like strings or tuples. You cannot use a mutable list as a key because its hash would constantly change." },
        { step: 3, title: "The 'Pythonic' way", code: "print(player.get('mana', 0))", desc: "Always read keys safely using `.get()` which returns a default value instead of crashing with a KeyError." }
      ],
      visualDescription: "Animation shows a messy stack of unlabelled papers. A laser scans them, instantly generating perfectly typed label tabs (Hash Keys). A robotic hand now shoots out, instantly grabbing the exact folder requested without searching through the stack.",
      summary: "In a nutshell, Dictionaries are hash tables providing instant O(1) lookups using immutable labels instead of brittle numeric indexes."
    }
  },
  {
    heading: "Sets — The Bag of Unique Marbles",
    visuallyExplained: {
      hook: "You need to find out if a user exists in a massive database of 10 million blocked IPs. Scanning an entire list takes minutes and grinds your server to a halt.",
      baseCase: "blocked_ips = ['1.1.1.1', '2.2.2.2'] # massive list\n\nif new_ip in blocked_ips: # O(N) scan\n    block_user()",
      ahaMoment: "A Set is an exclusive VIP guest list controlled by an elite bouncer. There are no duplicates allowed. Best of all, the bouncer doesn't read the whole list—they have a magic lookup table that confirms attendance instantly.",
      incrementalBuild: [
        { step: 1, title: "Simplest implementation", code: "tags = {'python', 'coding', 'python'}\n# Result: {'python', 'coding'}", desc: "Sets automatically and silently destroy all duplicate items upon creation." },
        { step: 2, title: "A common 'gotcha'", code: "empty = {} # This creates a Dict, not a Set!", desc: "Curly braces default to dictionaries. To create an empty set, you MUST use the explicit `set()` constructor." },
        { step: 3, title: "The 'Pythonic' way", code: "if new_ip in set(blocked_ips): # O(1) Check", desc: "Convert massive lists to sets before doing membership checks (`in`). This turns an O(N) scan into an O(1) instant hash lookup." }
      ],
      visualDescription: "A conveyor belt drops thousands of identical red marbles into a bag. Inside the bag, a magical force field instantly disintegrates the duplicates, leaving only one single red marble. A scanner checks the bag and instantly confirms 'red' is inside.",
      summary: "In a nutshell, Sets are unordered collections of unique elements optimized heavily for blazing fast membership checking and deduplication."
    }
  },
  {
    heading: "Tuples — The Sealed Envelope",
    visuallyExplained: {
      hook: "You generated a fixed configuration or a database row. Another developer accidentally appends data to it down the line, silently corrupting your entire data pipeline.",
      baseCase: "coordinates = [10, 20]\n# later in code\ncoordinates[0] = 99 # Corrupted!",
      ahaMoment: "A Tuple is a wax-sealed envelope. You can easily read the documents through the clear window, but the second you try to open the envelope to modify the documents, the wax shatters, and Python throws a massive alarm.",
      incrementalBuild: [
        { step: 1, title: "Simplest implementation", code: "rgb_color = (255, 128, 0)", desc: "Created using parentheses. This sequence is now permanently frozen." },
        { step: 2, title: "A common 'gotcha'", code: "single = (42) # This is an integer!\nsingle = (42,) # This is a tuple!", desc: "A single-item tuple REQUIRES a trailing comma. Otherwise, Python just thinks you're using math grouping parentheses." },
        { step: 3, title: "The 'Pythonic' way", code: "locations = {(10, 20): 'spawn'}", desc: "Because tuples are completely immutable, their hash never changes. This means you can use tuples as Dictionary Keys, enabling multidimensional dict mapping." }
      ],
      visualDescription: "Items are placed into a glowing box. A heavy steel lid slams down, locking tight with a loud clank. A programmer robot tries to pry it open with a crowbar, but the crowbar snaps in half as a red 'TypeError' light flashes.",
      summary: "In a nutshell, Tuples are immutable lists. They guarantee data integrity, run slightly faster, and can be used as dictionary keys."
    }
  }
];

const functionsScopeSections = [
  {
    heading: "First-Class Functions (Dict Dispatch)",
    visuallyExplained: {
      hook: "You are building a calculator or command handler. You have 5 different operations, and you waste 20 lines writing a massive, brittle `if/elif` chain that you have to update every time a new command is added.",
      baseCase: "if op == 'add':\n    return a + b\nelif op == 'sub':\n    return a - b\n# ... grows infinitely",
      ahaMoment: "Functions are just portable objects! You can treat them exactly like integers or strings. You can drop them into a dictionary, look them up by a string key, and execute them on the spot. This is called 'Dict Dispatch'.",
      incrementalBuild: [
        { step: 1, title: "Simplest implementation", code: "operations = {'add': sum_func, 'sub': sub_func}", desc: "We store the actual function objects (no parentheses!) directly inside a dictionary as values." },
        { step: 2, title: "A common 'gotcha'", code: "operations = {'add': sum_func()}", desc: "Adding parentheses `()` executes the function instantly while building the dictionary! You must pass the function's name purely as a reference." },
        { step: 3, title: "The 'Pythonic' way", code: "result = operations.get(op, default_func)(a, b)", desc: "You pull the function out of the dictionary and immediately call it with `(a, b)`. No `if` statements are required, and adding a new operation just means adding one key-value pair." }
      ],
      visualDescription: "Instead of a massive train-yard switchboard (`if/elif`), we see a sleek toolbox. Inside the toolbox are glowing, active tools (functions). A mechanical arm asks for 'add', picks up the specific 'add' tool, and immediately applies it to the data.",
      summary: "In a nutshell, treating functions as 'first-class objects' allows you to store them in data structures, replacing rigid conditional logic with infinitely scalable dictionary lookups."
    }
  },
  {
    heading: "Scope & UnboundLocalError",
    visuallyExplained: {
      hook: "You try to increment a simple counter variable that exists right outside your function. Python violently crashes, telling you the variable doesn't exist (`UnboundLocalError`), even though you can clearly see it right there.",
      baseCase: "counter = 0\n\ndef increment():\n    counter += 1  # Crash!\n\nincrement()",
      ahaMoment: "Python is overprotective. The exact second you use an equals sign (`=`) inside a function, Python builds an impenetrable, invisible wall around that variable. It treats it as an entirely new, local variable, completely ignoring the outside world.",
      incrementalBuild: [
        { step: 1, title: "Simplest implementation (Reading)", code: "def read():\n    print(counter)", desc: "Without an `=` sign anywhere, Python lets you look through the glass wall to read the global variable perfectly fine." },
        { step: 2, title: "A common 'gotcha' (Writing)", code: "counter += 1", desc: "This translates to `counter = counter + 1`. The `=` tells Python 'this is a local variable.' Then the right side tries to read it *before* it gets a value, causing the crash." },
        { step: 3, title: "The 'Pythonic' way", code: "def increment():\n    global counter\n    counter += 1", desc: "By explicitly declaring `global counter`, you punch a deliberate hole through the enclosing wall, telling Python to explicitly use the outside version for assignments." }
      ],
      visualDescription: "We see a variable sitting out in an open field. A glass room (the function) drops onto the field. At first, you can read it through the glass. But the moment you write an `=` sign, the glass turns to concrete, trapping an empty void inside the room and blinding you to the outside.",
      summary: "In a nutshell, Python determines variable scope at compile-time: any assignment makes a variable local to that function unless explicitly overridden."
    }
  },
  {
    heading: "Closures (Functions that remember)",
    visuallyExplained: {
      hook: "You need a function that 'remembers' a configuration setting (like a tax rate or API key) over time, but you don't want to pollute your code with messy global variables or build heavy Classes just to hold one number.",
      baseCase: "TAX_RATE = 0.2  # Messy global\n\ndef calculate_tax(price):\n    return price * TAX_RATE",
      ahaMoment: "A closure is a magical backpack. When an inner function is returned and leaves its parent, it packs exactly the variables it needs from the parent's room into its backpack. Even after the parent room is demolished, the inner function carries that data forever.",
      incrementalBuild: [
        { step: 1, title: "Simplest implementation", code: "def tax_factory(rate):\n    def calc(price):\n        return price * rate\n    return calc", desc: "The outer function accepts `rate`. The inner function uses it. We return the inner function itself, not its evaluated result." },
        { step: 2, title: "A common 'gotcha'", code: "calc_usa = tax_factory(0.1)\n# outer function has finished!", desc: "Beginners assume `rate` is deleted from memory when `tax_factory` finishes. But because `calc` referenced it, Python preserves it dynamically." },
        { step: 3, title: "The 'Pythonic' way", code: "print(calc_usa(100)) # 10.0", desc: "We just call the returned function! It reaches into its invisible backpack, pulls out the `rate=0.1` it memorized from birth, and completes the calculation cleanly." }
      ],
      visualDescription: "A large 'parent' factory creates a small worker robot (the inner function). The factory is blown up and erased from memory, but the little robot walks away unharmed, unzipping its backpack to pull out a glowing 'rate' orb it saved right before the explosion.",
      summary: "In a nutshell, Closures are functions paired with an environment backpack. They provide state retention without the boilerplate of building formal Object-Oriented classes."
    }
  },
  {
    heading: "Lambda & Higher Order Functions",
    visuallyExplained: {
      hook: "You need to sort a list of dictionaries by a specific key. You are forced to define an entirely separate, formally-named function far away from the sorting logic, just to return a single value.",
      baseCase: "def get_score(user):\n    return user['score']\n\nranked = sorted(users, key=get_score)",
      ahaMoment: "A Lambda is a sticky note. When you just need to pass a tiny, one-off instruction to a machine (like `sorted()`), you don't need to file a formal document. You just scribble the math on a sticky note and slap it directly onto the input slot.",
      incrementalBuild: [
        { step: 1, title: "Simplest implementation", code: "lambda user: user['score']", desc: "The syntax is stripped bare: the word `lambda`, followed by arguments, a colon, and the exact expression to return. No `def`, no `return` keyword." },
        { step: 2, title: "A common 'gotcha'", code: "lambda x: if x > 0: x else 0 # Syntax Error!", desc: "Lambdas are strictly limited to exactly one *expression*. You cannot put full statements, `for` loops, or standard `if` blocks inside a lambda." },
        { step: 3, title: "The 'Pythonic' way", code: "ranked = sorted(users, key=lambda x: x['score'])", desc: "The lambda is created, used by `sorted()`, and immediately thrown into the garbage in a single, perfectly readable line of code." }
      ],
      visualDescription: "The programmer is about to fill out a 3-page formal 'Function Request' form, but instead rips a tiny yellow sticky note, writes `x: x['score']` on it, and sticks it directly onto the side of a massive, metallic 'Sorting' machine.",
      summary: "In a nutshell, lambdas are anonymous, single-expression functions designed exclusively for short, throwaway operations—often passed directly into higher-order functions like map/filter/sort."
    }
  }
];

function replaceSections(content, chapterKey, newSectionsObject) {
  content = content.replace(new RegExp(\`("\\\${chapterKey}":\\\\s*\\\\{[\\\\s\\\\S]*?sections:\\\\s*\\\\[)([\\\\s\\\\S]*?)(\\\\]\\\\s*,\\\\s*connectedQuestIds)\`), (match, p1, p2, p3) => {
    return p1 + JSON.stringify(newSectionsObject, null, 2) + p3;
  });
  return content;
}

content = replaceSections(content, 'data-collections', dataCollectionsSections);
content = replaceSections(content, 'functions-scope', functionsScopeSections);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully patched Chapter 1 and Chapter 2 inside theory.js');
