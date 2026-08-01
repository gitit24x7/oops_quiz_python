export const quests = [
  {
    id: 101,
    tier: "Foundational Magic",
    title: "Lesson 1: The Iterator's River",
    name: "Yielding the Flow",
    logbook: '"When a function uses `return`, the spell ends instantly. What happens if it uses `yield` instead? Let us summon the River of Numbers."',
    code: "def river_of_numbers():\n    yield 1\n    yield 2\n    print('The river runs dry.')\n\nstream = river_of_numbers()\nprint(next(stream))\nprint(next(stream))\nprint(next(stream))",
    predictions: ["1, 2, StopIteration", "1, 2, None", "The spell shatters (Crash)"],
    discovery: {
      title: "Core Feature: The Yield Suspension",
      texts: [
        "A normal function runs line-by-line until it hits `return` and is destroyed.",
        "But `yield` is special. It PAUSES the function, hands a value back, and keeps all its local variables perfectly frozen in memory.",
        "When you call `next()`, the function wakes up right where it left off, until it runs out of code and raises `StopIteration`."
      ],
      trial: "Remove the third `print(next(stream))` to stop before the river runs dry. Notice how the function simply stays paused forever without erroring."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'func', label: '🌊 river_of_numbers', type: 'player', color: 'blue' },
          { id: '1', label: '💧 yield 1', type: 'object', color: 'green', value: 'Paused' },
          { id: '2', label: '💧 yield 2', type: 'object', color: 'yellow', value: 'Waiting...' },
          { id: 'err', label: '❌ StopIteration', type: 'object', color: 'red', value: 'Over' },
        ],
        links: [
          { from: 'func', to: '1', label: 'next() 1' },
          { from: '1', to: '2', label: 'next() 2' },
          { from: '2', to: 'err', label: 'next() 3 (crashing)' }
        ],
        caption: "A generator yields values one by one, pausing execution in between until exhausted."
      },
      after: {
        entities: [
          { id: 'func', label: '🌊 river_of_numbers', type: 'player', color: 'blue' },
          { id: '1', label: '💧 yield 1', type: 'object', color: 'green', value: 'Delivered' },
          { id: '2', label: '💧 yield 2', type: 'object', color: 'green', value: 'Delivered' },
        ],
        links: [
          { from: 'func', to: '1', label: 'next() 1' },
          { from: '1', to: '2', label: 'next() 2' },
        ],
        caption: "By stopping early, the generator remains safely paused. No crash."
      },
      hint: "Toggle to see the generator safely paused before hitting StopIteration."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "Before we explore the true anomalies of Py-Tongue, let us master its fundamental magics. First: the Generator." },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "Using 'yield' instead of 'return'. Does it just return a list?" },
        { speaker: 'mage', name: "Arch-Mage", text: "No. It returns a paused slice of time. A stream waiting to be tapped." }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "If we ask for three drops of water but there are only two, what happens?" },
        { speaker: 'mage', name: "Arch-Mage", text: "Make your prediction." }
      ],
      revealed: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "StopIteration! The river literally crashed when it ran out!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Indeed. Generators are exhausted once consumed. A `for` loop technically just calls `next()` repeatedly and silently catches this very StopIteration error for you." }
      ]
    }
  },
  {
    id: 102,
    tier: "Foundational Magic",
    title: "Lesson 2: The Object Mirror",
    name: "The Explicit 'self'",
    logbook: '"In other languages, classes magically know who they are. In Python, you must explicitly pass the mirror `self` to look at yourself."',
    code: "class Wizard:\n    def __init__(self, name):\n        self.name = name\n\n    def cast(self):\n        return f\"{self.name} casts a spell!\"\n\ngandalf = Wizard('Gandalf')\n# Notice we DO NOT pass 'self' here:\nprint(gandalf.cast())\n\n# But what happens if we call the class blueprint directly?\nprint(Wizard.cast(gandalf))",
    predictions: ["Gandalf casts a spell! (x2)", "TypeError: missing argument", "The spell shatters (Crash)"],
    discovery: {
      title: "Core Feature: 'self' is Just an Argument",
      texts: [
        "In Python, `gandalf.cast()` is purely syntactic sugar.",
        "Under the hood, Python immediately translates it to: `Wizard.cast(gandalf)`. The object before the dot becomes the FIRST argument.",
        "That's why every instance method MUST have `self` as the first parameter. It's not a keyword; it's literally just the object being passed in."
      ],
      trial: "Try adding a parameter to `cast`: `def cast(self, spell):`. Call it via `gandalf.cast('Fireball')` and `Wizard.cast(gandalf, 'Ice')` to see how the arguments line up."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'gandalf', label: '🧙 Gandalf', type: 'player', color: 'blue' },
          { id: 'dot', label: '.cast()', type: 'scope', color: 'red', value: 'Syntactic Sugar' },
          { id: 'method', label: '📜 def cast(self):', type: 'object', color: 'yellow', value: 'Requires 1 arg' },
        ],
        links: [
          { from: 'dot', to: 'method', label: 'Auto-passes Gandalf →' },
          { from: 'gandalf', to: 'dot', label: 'Calls →' },
        ],
        caption: "gandalf.cast() magically sneaks 'gandalf' in as the first argument to cast(self)."
      },
      after: {
        entities: [
          { id: 'class', label: '🏛️ Wizard class', type: 'player', color: 'blue' },
          { id: 'method', label: '📜 def cast(self):', type: 'object', color: 'green', value: 'Requires 1 arg' },
          { id: 'gandalf', label: '🧙 Gandalf (arg)', type: 'player', color: 'yellow' },
        ],
        links: [
          { from: 'class', to: 'method', label: 'Explicitly calls →' },
          { from: 'method', to: 'gandalf', label: 'Passes self manually →' },
        ],
        caption: "Wizard.cast(gandalf) is the raw, un-sugared truth of how Python objects work."
      },
      hint: "Toggle to see the translation from syntactic sugar to explicit class function calls."
    },
    dialogues: {
      intro: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "I've always wondered... why do we have to type 'self' in every single class function?" },
        { speaker: 'mage', name: "Arch-Mage", text: "Because Python believes explicit is better than implicit. A class is just a collection of normal functions. Let us peer behind the dot operator." }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "I think Wizard.cast(gandalf) will crash. You're supposed to call methods on the object!" },
        { speaker: 'mage', name: "Arch-Mage", text: "We shall see." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "They both printed the exact same thing!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Exactly. `object.method()` is just an illusion. The interpreter converts it to `Class.method(object)`. That is why `self` must exist to catch it." }
      ]
    }
  },
  {
    id: 103,
    tier: "Foundational Magic",
    title: "Lesson 3: The Wrappings of Power",
    name: "Intro to Decorators",
    logbook: '"A decorator is simply a function that swallows another function, modifies its behavior, and spits out a new wrapper function. Let\'s build one by hand."',
    code: "def amplify(func):\n    def wrapper():\n        return func().upper() + '!!!'\n    return wrapper\n\n@amplify\ndef speak():\n    return 'hello'\n\nprint(speak())",
    predictions: ["hello", "HELLO!!!", "The spell shatters (Crash)"],
    discovery: {
      title: "Core Feature: The Decorator Wrapper",
      texts: [
        "The `@amplify` incantation is just syntactic sugar.",
        "When the Python interpreter sees `@amplify` above `speak`, it actually runs: `speak = amplify(speak)`.",
        "It passes your original function into `amplify`, which defines and returns the new `wrapper` function. Your `speak` name now points to `wrapper`!"
      ],
      trial: "Remove the `@amplify` line entirely. Below the function, type `speak = amplify(speak)` and run it. The result will be exactly the same!"
    },
    sandbox: {
      before: {
        entities: [
          { id: 'speak', label: '📌 speak', type: 'player', color: 'blue', value: 'Original name' },
          { id: 'orig', label: '🗣️ def speak():', type: 'object', color: 'red', value: '"hello"' },
        ],
        links: [
          { from: 'speak', to: 'orig', label: 'Normall points to →' },
        ],
        caption: "Without a decorator, the name 'speak' points directly to your original function."
      },
      after: {
        entities: [
          { id: 'speak', label: '📌 speak', type: 'player', color: 'blue', value: 'Hijacked name' },
          { id: 'wrapper', label: '🎁 wrapper()', type: 'object', color: 'green', value: 'Returns UPPER!!!' },
          { id: 'orig', label: '🗣️ def speak():', type: 'object', color: 'red', value: 'Hidden inside wrapper' },
        ],
        links: [
          { from: 'speak', to: 'wrapper', label: 'Now points to →' },
          { from: 'wrapper', to: 'orig', label: 'Internally calls →' },
        ],
        caption: "The decorator hijacks the name 'speak' and points it to the wrapper. The wrapper calls the original internally."
      },
      hint: "Toggle to see how a decorator hijacks the function name to replace it with a wrapper."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "The `@` symbol. A powerful wrapping technique. But what does it actually do?" },
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "It's magic. It just makes the function do extra things." },
        { speaker: 'mage', name: "Arch-Mage", text: "There is no magic, Jace. Only functions returning functions." }
      ],
      predicting: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "It's going to capitalize it and add exclamation marks!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Are you certain?" }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "HELLO!!! It worked!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Indeed. `@amplify` is literally just `speak = amplify(speak)`. You passed the function as an argument, and replaced it with a wrapper." }
      ]
    }
  },
  {
    id: 104,
    tier: "Foundational Magic",
    title: "Lesson 4: The Safe Retrieval",
    name: "dict.get() vs dict[]",
    logbook: '"In the perilous backend APIs, requesting a missing key from a dictionary using brackets will shatter your spell. How do we fetch safely?"',
    code: "grimoire = {'fire': 'deals 10 dmg', 'ice': 'deals 5 dmg'}\n\n# 1. The dangerous way (bracket notation)\ntry:\n    print(grimoire['lightning'])\nexcept KeyError:\n    print('Crash! KeyError: lightning not found')\n\n# 2. The safe way (.get notation)\nsafe_spell = grimoire.get('lightning', 'No spell found')\nprint(safe_spell)",
    predictions: ["Crash!, No spell found", "None, None", "The spell shatters (Crash)"],
    discovery: {
      title: "Core Feature: Dictionary .get()",
      texts: [
        "In production code, you can never trust that a dictionary has the key you want. Using `my_dict['key']` throws a fatal `KeyError` if it's missing.",
        "The `.get()` method is safe. If the key is missing, it silently returns `None` instead of crashing.",
        "You can even provide a default fallback value as the second argument: `my_dict.get('key', 'default_value')`."
      ],
      trial: "Change the code to `grimoire.get('fire', 'No spell found')` to see it successfully return the real value when the key exists."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'dict', label: '📖 Grimoire (Dict)', type: 'player', color: 'blue' },
          { id: 'bracket', label: "['lightning']", type: 'object', color: 'red', value: 'KeyError! ❌' },
          { id: 'get', label: ".get('lightning')", type: 'object', color: 'green', value: 'Safe fallback ✅' }
        ],
        links: [
          { from: 'bracket', to: 'dict', label: 'Direct access' },
          { from: 'get', to: 'dict', label: 'Method access' }
        ],
        caption: "Brackets crash on missing keys. .get() returns a safe default without breaking execution."
      },
      after: {
        entities: [
          { id: 'dict', label: '📖 Grimoire (Dict)', type: 'player', color: 'blue', value: 'Has "fire"' },
          { id: 'get', label: ".get('fire')", type: 'object', color: 'green', value: 'Value ✅' }
        ],
        links: [
          { from: 'get', to: 'dict', label: 'Method access' }
        ],
        caption: "If the key exists, .get() works exactly like brackets. It's the ultimate defensive tool."
      },
      hint: "Toggle to see how .get() handles success gracefully too."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "In the Great Archives of the Backend, data is often missing. Relying on brackets is a fool's errand." },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "If I ask for a 'lightning' spell that doesn't exist, shouldn't it just say 'nothing'?" }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "No, Python complains when you look for things that aren't there! KeyError!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Make your prediction." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "It crashed on the brackets, but `.get()` saved the day!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Precisely. The `.get()` method is the shield of the API engineer. Use it whenever external data is involved." }
      ]
    }
  },
  {
    id: 105,
    tier: "Foundational Magic",
    title: "Lesson 5: The Packing of Stars",
    name: "*args and **kwargs",
    logbook: '"How do you write a spell that accepts an infinite number of ingredients? By harnessing the power of the packing stars." ',
    code: "def brew_potion(*args, **kwargs):\n    print('Ingredients (args):', args)\n    print('Properties (kwargs):', kwargs)\n\n# We pass 3 random positional arguments, and 2 keyword arguments\nbrew_potion('Mushroom', 'Eye of Newt', 'Dragon Scale', heal=50, poison=True)",
    predictions: ["Ingredients (args): ('Mushroom', 'Eye of Newt', 'Dragon Scale') Properties (kwargs): {'heal': 50, 'poison': True}", "SyntaxError", "TypeError: takes 0 positional arguments but 3 were given"],
    discovery: {
      title: "Core Feature: Unpacking Operators",
      texts: [
        "The single star `*` scoops up all leftover positional arguments and packs them into a Tuple named `args`.",
        "The double star `**` scoops up all leftover keyword arguments (name=value) and packs them into a Dictionary named `kwargs`.",
        "These aren't keywords! The magic is in the stars (`*`). You could write `*ingredients` and `**properties` — `args` and `kwargs` are just standard conventions."
      ],
      trial: "Try passing a list into it using a star: `items = ['Bone', 'Ash']; brew_potion(*items)`. The star unpacks it into separate arguments!"
    },
    sandbox: {
      before: {
        entities: [
          { id: 'func', label: '🧪 brew_potion', type: 'player', color: 'blue' },
          { id: 'pos', label: 'Positions', type: 'object', color: 'yellow', value: '*args (Tuple)' },
          { id: 'kw', label: 'Keywords', type: 'object', color: 'green', value: '**kwargs (Dict)' }
        ],
        links: [
          { from: 'pos', to: 'func', label: 'Packed positionals' },
          { from: 'kw', to: 'func', label: 'Packed keywords' }
        ],
        caption: "*args packs loose values into a Tuple. **kwargs packs name=value pairs into a Dictionary."
      },
      after: {
        entities: [
          { id: 'func', label: '🧪 brew_potion', type: 'player', color: 'blue' },
          { id: 'pos', label: '(*items) Unpack', type: 'object', color: 'yellow', value: 'Splits list to args' },
        ],
        links: [
          { from: 'pos', to: 'func', label: 'Unpacked → Packed' }
        ],
        caption: "Calling a function with *items UNPACKS a list into loose arguments, which *args then packs back up!"
      },
      hint: "Toggle to see how stars can both pack and unpack data."
    },
    dialogues: {
      intro: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "Functions have fixed arguments. If I pass 5 things to a function that expects 2, it shatters." },
        { speaker: 'mage', name: "Arch-Mage", text: "Not if you use the packing stars. They gobble up the excess into neat boxes." }
      ],
      predicting: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "So it just groups them? The loose ones go to tuples, the named ones to dicts?" },
        { speaker: 'mage', name: "Arch-Mage", text: "Cast and see." }
      ],
      revealed: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "A tuple and a dict! Perfect for wrappers." },
        { speaker: 'mage', name: "Arch-Mage", text: "Every decorator and API uses this to pass arguments blindly. It is the backbone of dynamic Python." }
      ]
    }
  },
  {
    id: 106,
    tier: "Foundational Magic",
    title: "Lesson 6: The Resource Pact",
    name: "Context Managers (with open)",
    logbook: '"When you open a portal (or a file), you must close it, or memory leaks out into the void. How do we guarantee closure even if an error strikes?"',
    code: "import os\n\n# Writing a file using the 'with' context manager\nwith open('magic.txt', 'w') as scroll:\n    scroll.write('Secret spell')\n    # No .close() needed! The 'with' block handles it.\n\nprint('File closed automatically:', scroll.closed)\nos.remove('magic.txt')",
    predictions: ["File closed automatically: True", "File closed automatically: False", "The spell shatters (Crash)"],
    discovery: {
      title: "Core Feature: 'with' Context Managers",
      texts: [
        "In production, manually calling `file.close()` is dangerous. If your code crashes *before* the `.close()` line, the file handle stays locked open permanently (a memory leak).",
        "The `with` statement creates a Context Manager. It guarantees that the cleanup code (like closing a file or network socket) runs NO MATTER WHAT.",
        "Even if an exception shatters your code inside the block, the `with` block will firmly hit 'close' on its way out."
      ],
      trial: "Try raising an error inside the 'with' block: `raise Exception('Boom!')`. The script will crash, but the file handles will still be released perfectly."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'with', label: '🚪 with block', type: 'scope', color: 'blue' },
          { id: 'file', label: '📜 magic.txt', type: 'object', color: 'red', value: 'OPEN' },
        ],
        links: [
          { from: 'with', to: 'file', label: 'Acquires lock' }
        ],
        caption: "Entering the 'with' block opens the resource and acquires the lock."
      },
      after: {
        entities: [
          { id: 'with', label: '🚪 with block', type: 'scope', color: 'blue', value: 'Exited' },
          { id: 'file', label: '📜 magic.txt', type: 'object', color: 'green', value: 'CLOSED ✅' },
        ],
        links: [
          { from: 'with', to: 'file', label: 'Auto-releases' }
        ],
        caption: "Leaving the block—whether normally or by error—automatically calls .close(). No memory leaks."
      },
      hint: "Toggle to see the automatic cleanup protocol."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "Memory leaks. Abandoned file locks. These are the sins of novices who forget to `close()` their scrolls." },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "I'll just put `scroll.close()` at the end of the function!" }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "But what if the function crashes *before* it reaches your `close()` line? The lock stays open forever." },
        { speaker: 'mage', name: "Arch-Mage", text: "Exactly, Jace. Provide your answer." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "True! It closed itself!" },
        { speaker: 'mage', name: "Arch-Mage", text: "The `with` block enforces a sacred pact. Use it for files, locks, database connections, and external requests." }
      ]
    }
  },
  {
    id: 107,
    tier: "Foundational Magic",
    title: "Lesson 7: The Pythonic Loom",
    name: "List Comprehensions",
    logbook: '"Creating an empty list, looping, and appending items takes three lines and crawls slowly. The Pythonic Loom can weave it in one fast pass."',
    code: "# The slow way\nslow_list = []\nfor x in range(5):\n    if x % 2 == 0:\n        slow_list.append(x * 2)\n\n# The Pythonic way\nfast_list = [x * 2 for x in range(5) if x % 2 == 0]\n\nprint('Slow:', slow_list)\nprint('Fast:', fast_list)",
    predictions: ["Slow: [0, 4, 8] Fast: [0, 4, 8]", "Slow: [0, 4, 8] Fast: Error", "The spell shatters (Crash)"],
    discovery: {
      title: "Core Feature: List Comprehensions",
      texts: [
        "A list comprehension `[expression for item in iterable if condition]` isn't just shorter to read; it’s faster to run.",
        "Under the hood, a standard `for` loop has to look up the `.append` method on the list for every single item, which wastes CPython bytecode cycles.",
        "A list comprehension is highly optimized in C and builds the list in place without repeated `.append` lookups."
      ],
      trial: "Try making a dictionary comprehension using braces: `{x: x*2 for x in range(3)}`."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'loop', label: '🔄 For Loop', type: 'player', color: 'red' },
          { id: 'append', label: '🔍 .append() lookup', type: 'object', color: 'yellow', value: 'x5 slow calls' },
          { id: 'list', label: '📦 slow_list', type: 'object', color: 'blue' }
        ],
        links: [
          { from: 'loop', to: 'append', label: 'looks up' },
          { from: 'append', to: 'list', label: 'pushes' }
        ],
        caption: "A standard 'for' loop wastes time continually looking up the .append method."
      },
      after: {
        entities: [
          { id: 'comp', label: '⚡ Comprehension', type: 'player', color: 'green' },
          { id: 'list', label: '📦 fast_list', type: 'object', color: 'blue', value: 'Built in C' }
        ],
        links: [
          { from: 'comp', to: 'list', label: 'Direct memory injection' }
        ],
        caption: "A comprehension bypasses Python method lookups and builds the list directly in C memory."
      },
      hint: "Toggle to see the hidden performance difference."
    },
    dialogues: {
      intro: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "Why do we need a new syntax? A 'for loop' with '.append()' works perfectly fine!" },
        { speaker: 'mage', name: "Arch-Mage", text: "It 'works' the same way walking across a continent 'works'. The Loom is faster, both reading and running." }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "They probably output the exact same thing." },
        { speaker: 'mage', name: "Arch-Mage", text: "Yes, but the interpreter handles them very differently behind the veil." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "They match exactly: [0, 4, 8]." },
        { speaker: 'mage', name: "Arch-Mage", text: "In production, list, dict, and set comprehensions are the gold standard for mapping and filtering data. Embrace the bracket." }
      ]
    }
  },
  {
    id: 108,
    tier: "Foundational Magic",
    title: "Lesson 8: The Shared Lineage",
    name: "Class vs Instance Variables",
    logbook: '"In Object-Oriented game loops, distinguishing between what belongs to the individual and what belongs to the species is a matter of life and death."',
    code: "class Goblin:\n    horde_count = 0  # Class variable (Species)\n\n    def __init__(self, name):\n        self.name = name  # Instance variable (Individual)\n        Goblin.horde_count += 1\n\ng1 = Goblin('Snark')\ng2 = Goblin('Grunk')\n\nprint(f\"{g1.name}'s horde count: {g1.horde_count}\")\nprint(f\"{g2.name}'s horde count: {g2.horde_count}\")",
    predictions: ["Snark's count: 1, Grunk's count: 2", "Snark: 2, Grunk: 2", "Snark: 1, Grunk: 1"],
    discovery: {
      title: "Core Feature: Class Variables",
      texts: [
        "Variables defined directly inside the class (like `horde_count`) are Class Variables. There is only ONE copy in memory, shared by every single Goblin ever created.",
        "Variables attached to `self` (like `self.name`) are Instance Variables. Every Goblin gets its own unique physical copy of a name.",
        "When `g1` looks for `horde_count`, it doesn't have one. So Python falls back dynamically, looks at the `Goblin` class blueprint, and finds the shared `2`."
      ],
      trial: "Try mutating an instance's horde count: `g1.horde_count = 99`, then print `g2.horde_count`. It creates a rogue instance variable that masks the class one for g1 only!"
    },
    sandbox: {
      before: {
        entities: [
          { id: 'class', label: '🏛️ Goblin Class', type: 'object', color: 'blue', value: 'horde_count = 2 (Shared)' },
          { id: 'g1', label: '👾 g1 (Snark)', type: 'player', color: 'green', value: 'name="Snark"' },
          { id: 'g2', label: '👾 g2 (Grunk)', type: 'player', color: 'yellow', value: 'name="Grunk"' },
        ],
        links: [
          { from: 'g1', to: 'class', label: 'Looks up missing var' },
          { from: 'g2', to: 'class', label: 'Looks up missing var' },
        ],
        caption: "Instance variables (name) live on the object. Class variables (horde_count) live on the blueprint and are shared."
      },
      after: {
        entities: [
          { id: 'class', label: '🏛️ Goblin Class', type: 'object', color: 'blue', value: 'horde_count = 2 (Shared)' },
          { id: 'g1', label: '👾 g1 (Snark)', type: 'player', color: 'red', value: 'horde_count = 99 (Rogue!)' },
          { id: 'g2', label: '👾 g2 (Grunk)', type: 'player', color: 'yellow', value: 'name="Grunk"' },
        ],
        links: [
          { from: 'g2', to: 'class', label: 'Looks up missing var' },
        ],
        caption: "Assigning g1.horde_count = 99 creates a NEW instance variable that MASKS the class variable for g1 only."
      },
      hint: "Toggle to see the danger of assigning to a class variable through an instance (Shadowing)."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "A goblin spawns. Is its armor its own, or does it share health with the entire horde?" },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "It's inside the class, so it belongs to the object." }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "No, wait. `horde_count` is attached to `Goblin`, not `self`. It's a global counter for the class!" },
        { speaker: 'mage', name: "Arch-Mage", text: "You are beginning to see the matrix. Predict the outcome." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "They both printed 2! Snark knows that Grunk exists!" },
        { speaker: 'mage', name: "Arch-Mage", text: "A class variable acts as a hive mind. But beware: assigning `g1.horde_count = 99` will sever Snark from the hive and give him his own personal counter." }
      ]
    }
  },
  {
    id: 109,
    tier: "Foundational Magic",
    title: "Lesson 9: The Twin Iterators",
    name: "zip() and enumerate()",
    logbook: '"Iterating with `range(len(items))` is the mark of a traveler from C or Java. In Py-Tongue, we yield directly from the source."',
    code: "names = ['Alice', 'Bob']\nroles = ['Mage', 'Knight']\n\n# The Non-Pythonic way\nfor i in range(len(names)):\n    print(f\"{i}: {names[i]} the {roles[i]}\")\n\nprint(\"---\")\n\n# The Pythonic way\nfor i, (name, role) in enumerate(zip(names, roles)):\n    print(f\"{i}: {name} the {role}\")",
    predictions: ["The outputs are identical", "The outputs are different", "The spell shatters (Crash)"],
    discovery: {
      title: "Core Feature: Py-Tongue Iteration",
      texts: [
        "In Python, iterators are first-class citizens. You rarely need an index `i` just to fetch items from a list.",
        "`zip(list1, list2)` stitches two iterables together parallelly into one stream of tuples: `('Alice', 'Mage')`.",
        "`enumerate(iterable)` attaches a counter to any iterable, yielding `(index, item)` pairs without needing a separate `i += 1` variable."
      ],
      trial: "Try passing a third list to `zip(names, roles, [100, 200])` to see it stitch three streams together flawlessly."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'i', label: '🔢 index i', type: 'object', color: 'red', value: 'manual counter' },
          { id: 'names', label: '📜 names[]', type: 'player', color: 'blue' },
          { id: 'roles', label: '🛡️ roles[]', type: 'player', color: 'yellow' },
        ],
        links: [
          { from: 'i', to: 'names', label: 'Brittle lookup' },
          { from: 'i', to: 'roles', label: 'Brittle lookup' },
        ],
        caption: "range(len()) forces the CPU to manually fetch items by index, which is slow and unreadable."
      },
      after: {
        entities: [
          { id: 'zip', label: '🔗 zip()', type: 'object', color: 'green', value: 'Tuples' },
          { id: 'enum', label: '⏱️ enumerate()', type: 'object', color: 'green', value: 'auto-counter' },
        ],
        links: [
          { from: 'enum', to: 'zip', label: 'Wraps and counts' }
        ],
        caption: "zip() pairs items natively in memory, enumerate() adds a counter. Clean, fast pipelines."
      },
      hint: "Toggle to see the structural difference between index lookups and iterator pipelines."
    },
    dialogues: {
      intro: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "I need the index to track position, and I need to loop through two arrays at once. `range(len())` is the only way." },
        { speaker: 'mage', name: "Arch-Mage", text: "You speak the dialect of Java. The Py-Tongue uses pipelines." }
      ],
      predicting: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "They will output the exact same thing." },
        { speaker: 'mage', name: "Arch-Mage", text: "Correct. But one is brittle, and one is unbreakable." }
      ],
      revealed: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "Outputs are identical. But `zip` combined them without me looking up brackets!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Never use `for i in range(len(list)):`. If you need items, iterate directly. If you need indices, use `enumerate`." }
      ]
    }
  },
  {
    id: 110,
    tier: "Foundational Magic",
    title: "Lesson 10: The Nameless Incantation",
    name: "Lambda Functions",
    logbook: '"Sometimes you need an incantation that is so fleeting, so tiny, it is not worth giving a name in the Archives. That is a lambda."',
    code: "power_levels = [10, 5, 20, 15]\n\n# Sort normally sorts ascending. What if we want to sort by the inverse?\n# We could write `def inverse(x): return -x` and use `key=inverse`...\n\n# Or we use a nameless lambda function:\nordered = sorted(power_levels, key=lambda x: -x)\n\nprint(ordered)",
    predictions: ["[20, 15, 10, 5]", "[5, 10, 15, 20]", "SyntaxError"],
    discovery: {
      title: "Core Feature: Anonymous Functions",
      texts: [
        "`lambda x: -x` is the exact same thing as writing a `def` function that returns `-x`, but it has no name and resides completely inline.",
        "Lambdas are limited to exactly one expression (no `if` blocks, no `return` keywords, no loops).",
        "They are extremely powerful when passed to higher-order functions like `sorted()`, `map()`, or `filter()`, acting as quick, single-use rules."
      ],
      trial: "Use a mapping lambda: `list(map(lambda x: x*2, power_levels))` to instantly double every spell's power level."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'def', label: '📜 def inverse(x):', type: 'object', color: 'red', value: 'Stored in memory' },
          { id: 'sort', label: '🗂️ sorted()', type: 'player', color: 'blue' },
        ],
        links: [
          { from: 'sort', to: 'def', label: 'Calls by name' },
        ],
        caption: "A normal 'def' takes up namespace memory, even if you only use it once for a sorting key."
      },
      after: {
        entities: [
          { id: 'lam', label: '👻 lambda x: -x', type: 'object', color: 'green', value: 'Ephemeral' },
          { id: 'sort', label: '🗂️ sorted()', type: 'player', color: 'blue' },
        ],
        links: [
          { from: 'sort', to: 'lam', label: 'Inline call' },
        ],
        caption: "A lambda is anonymous and ephemeral. Perfect for 1-liner data transformations."
      },
      hint: "Toggle to understand why lambdas are called 'Anonymous Functions'."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "A `def` binds a spell to a name forever. But a `lambda` is a ghost. It does its job and vanishes." },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "lambda x colon minus x... it has no return keyword?" }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "If the key is negative x, the highest numbers will look like the lowest numbers. It'll sort descending!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Let us see if the ghost works." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "[20, 15, 10, 5]. It sorted backwards!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Lambdas are not magic. They are just tiny functions written on a single line. Perfect for `sorted`, `map`, and `filter`." }
      ]
    }
  },
  {
    id: 1,
    title: "Tome 1: The Foundations of Memory",
    name: "The Shared Potion Bag Anomaly",
    logbook: '"I wrote a simple incantation to give new apprentices a starting inventory. Alice gets a sword, Bob gets a shield. Let\'s cast it and see what they actually have in their bags."',
    code: "def create_player(name, inventory=[]):\n    inventory.append('potion')\n    return {'name': name, 'items': inventory}\n\np1 = create_player('Alice')\np2 = create_player('Bob')\n\nprint(\"Alice's items:\", p1['items'])\nprint(\"Bob's items:\", p2['items'])",
    predictions: [
      "['potion']",
      "['potion', 'potion']",
      "The spell shatters (Crash)"
    ],
    discovery: {
      title: "Anomaly Detected: The Missing Backpack",
      texts: [
        "Why does Bob have **two** potions?! In JavaScript, functions are factories that stamp out a brand-new array every time they run.",
        "But in the ancient `Py-Tongue`, the `def` incantation acts immediately. It builds **ONE** physical backpack (`[]`) the exact moment the spell is written into the Archives, and permanently binds it to the spell itself.",
        "Whenever an apprentice shows up without an inventory, the spell simply hands them a glowing sticky note pointing to that same, shared backpack. Alice and Bob didn't get copies; they are interacting with the exact same bolted-on artifact in memory!"
      ],
      trial: "In the spell weaver above, change the incantation signature to `def create_player(name, inventory=None):`. Then, inside the spell, check if the inventory is `None` and forge a brand new backpack (`[]`) if they didn't bring one. Cast the spell until both apprentices hold only ONE potion."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'alice', label: '👤 Alice', type: 'player', color: 'blue' },
          { id: 'bob', label: '👤 Bob', type: 'player', color: 'yellow' },
          { id: 'bag1', label: '🎒 Shared Bag', type: 'object', color: 'red', value: "['potion', 'potion']" },
        ],
        links: [
          { from: 'alice', to: 'bag1', label: 'items →' },
          { from: 'bob', to: 'bag1', label: 'items →' },
        ],
        caption: "Both Alice and Bob are pointing to the SAME bag. Adding a potion for Alice also adds it for Bob!"
      },
      after: {
        entities: [
          { id: 'alice', label: '👤 Alice', type: 'player', color: 'blue' },
          { id: 'bob', label: '👤 Bob', type: 'player', color: 'yellow' },
          { id: 'bag1', label: '🎒 Alice Bag', type: 'object', color: 'green', value: "['potion']" },
          { id: 'bag2', label: '🎒 Bob Bag', type: 'object', color: 'green', value: "['potion']" },
        ],
        links: [
          { from: 'alice', to: 'bag1', label: 'items →' },
          { from: 'bob', to: 'bag2', label: 'items →' },
        ],
        caption: "Now each player has their OWN bag. Changing one does not affect the other."
      },
      hint: "Drag the toggle to see what happens when you give each player their own backpack."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "Welcome to the Archives. Today, we are looking at the 'Shared Potion Bag' bug." },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "Look at the code! We created a player named Bob, but we didn't give him an inventory." },
        { speaker: 'mage', name: "Arch-Mage", text: "Exactly. But look at line 1. What does the default 'inventory=[]' actually do?" }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "I'm scared. If Alice got a potion... what did Bob get?" },
        { speaker: 'mage', name: "Arch-Mage", text: "Focus your mind, Scholar. You must lock in a Prediction before we cast the spell." },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "I bet the spell just shatters!" }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "By the stars! Bob has two potions?! How is this possible?" },
        { speaker: 'mage', name: "Arch-Mage", text: "In the ancient Py-Tongue, 'def' builds the backpack instantly and permanently... Alice and Bob are reaching into the exact same bag!" },
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "Oh! So we must forge a new '[]' bag strictly INSIDE the spell if they bring nothing!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Exactly. The Alchemist's Trial awaits you in the editor. Fix the spell!" }
      ]
    }
  },
  {
    id: 2,
    title: "Tome 2: The Scope Ritual Trap",
    name: "The Unbound Sigil Anomaly",
    logbook: '"We hold a massive reservoir of power. I wrote a tiny spell to simply boost that power by 5. Easy magic, right?"',
    code: "power_level = 10\n\ndef boost_power():\n    power_level += 5\n    print(\"New Power:\", power_level)\n\nboost_power()",
    predictions: [
      "New Power: 15",
      "New Power: 10",
      "The spell shatters (Crash)"
    ],
    discovery: {
      title: "Anomaly Detected: UnboundLocalError",
      texts: [
        "The spell shattered! In Py-Tongue, if you try to *assign* a value to a sigil (variable) anywhere inside a spell, Python automatically assumes that sigil is strictly local to the spell.",
        "You attempted to evaluate `power_level += 5` which means `power_level = power_level + 5`. Because you reassigned it, Python hid the global `power_level` and created an invisible local one.",
        "But the spell crashed because it tried to read the local `power_level` on the right side of the plus sign *before* giving it an actual value!"
      ],
      trial: "In the spell weaver, add the line `global power_level` at the very beginning of the `boost_power` spell to explicitly tell the magic to reach OUTSIDE the spell boundary."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'global', label: '🌍 Global Scope', type: 'scope', color: 'blue', value: 'power_level = 10' },
          { id: 'func', label: '🔮 boost_power()', type: 'scope', color: 'red', value: 'power_level = ???' },
        ],
        links: [
          { from: 'func', to: 'global', label: '❌ BLOCKED' },
        ],
        caption: "Python built a wall around boost_power. It sees `power_level +=` and assumes it is LOCAL, blocking access to the global."
      },
      after: {
        entities: [
          { id: 'global', label: '🌍 Global Scope', type: 'scope', color: 'blue', value: 'power_level = 10 → 15' },
          { id: 'func', label: '🔮 boost_power()', type: 'scope', color: 'green', value: 'global power_level' },
        ],
        links: [
          { from: 'func', to: 'global', label: '✅ global keyword' },
        ],
        caption: "The `global` keyword punches a hole through the wall, letting the function reach outside."
      },
      hint: "Toggle to see the wall appear and disappear around the function's scope."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "Ah, Tome 2. The Scope Ritual. A classic trap that shatters many young mages." },
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "But Master! The power_level is sitting right there outside the spell. It should clearly be 15." },
        { speaker: 'mage', name: "Arch-Mage", text: "Look closely at the `+=` incantation. Re-assigning a sigil does dangerous things to its bounded scope." }
      ],
      predicting: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "It's obvious! It reads the 10 from outside, adds 5, and becomes 15." },
        { speaker: 'mage', name: "Arch-Mage", text: "We shall see. Make your prediction and cast the spell." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "UnboundLocalError?! What does that mean!?" },
        { speaker: 'mage', name: "Arch-Mage", text: "Because you reassigned the sigil inside the room, Python locked the door and assumed the sigil belonged ONLY inside the room." },
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "Oh! And since the room's sigil had no value yet, trying to add 5 to nothing caused a crash!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Correct. Use the 'global' keyword to pierce the boundaries of the room." }
      ]
    }
  },
  {
    id: 3,
    title: "Tome 3: The Phantom Prophecy",
    name: "The Late-Binding Closure Anomaly",
    logbook: '"I recorded three distinct prophecies inside a looping time-ritual. Let us read the very first prophecy recorded and behold the future!"',
    code: "prophecies = []\n\nfor i in range(3):\n    def read_prophecy():\n        print(f\"Prophecy {i}\")\n    prophecies.append(read_prophecy)\n\n# Let's read the very first prophecy recorded! (Index 0)\nprophecies[0]()",
    predictions: [
      "Prophecy 0",
      "Prophecy 1",
      "Prophecy 2"
    ],
    discovery: {
      title: "Anomaly Detected: Late Binding Closure",
      texts: [
        "Prophecy 2?! Why did the very first recorded prophecy print the last number?",
        "Because Py-Tongue spells (functions) do *not* lock in the value of outside variables when they are written. They look up the value at the exact moment they are EXECUTED.",
        "By the time we finally cast `prophecies[0]()` at the bottom, the `for` loop had already finished running. The solitary sigil `i` was resting at its final value: `2`. All three prophecies are using sticky notes pointing to the exact same `i`."
      ],
      trial: "Force the spell to lock the value immediately when created. Change the signature to `def read_prophecy(val=i):` and print `val` instead of `i`. (Default arguments are evaluated at creation!)"
    },
    sandbox: {
      before: {
        entities: [
          { id: 'i', label: '🔢 Variable i', type: 'object', color: 'red', value: 'i = 2 (final)' },
          { id: 'p0', label: '📜 prophecies[0]', type: 'player', color: 'yellow' },
          { id: 'p1', label: '📜 prophecies[1]', type: 'player', color: 'yellow' },
          { id: 'p2', label: '📜 prophecies[2]', type: 'player', color: 'yellow' },
        ],
        links: [
          { from: 'p0', to: 'i', label: 'reads i →' },
          { from: 'p1', to: 'i', label: 'reads i →' },
          { from: 'p2', to: 'i', label: 'reads i →' },
        ],
        caption: "All three prophecies lazily point to the same variable `i`. By the time you run any of them, `i` is already 2."
      },
      after: {
        entities: [
          { id: 'v0', label: '🔒 val=0', type: 'object', color: 'green', value: '0' },
          { id: 'v1', label: '🔒 val=1', type: 'object', color: 'green', value: '1' },
          { id: 'v2', label: '🔒 val=2', type: 'object', color: 'green', value: '2' },
          { id: 'p0', label: '📜 prophecies[0]', type: 'player', color: 'blue' },
          { id: 'p1', label: '📜 prophecies[1]', type: 'player', color: 'blue' },
          { id: 'p2', label: '📜 prophecies[2]', type: 'player', color: 'blue' },
        ],
        links: [
          { from: 'p0', to: 'v0', label: 'locked →' },
          { from: 'p1', to: 'v1', label: 'locked →' },
          { from: 'p2', to: 'v2', label: 'locked →' },
        ],
        caption: "Default arguments freeze the value at creation time. Each prophecy now owns its own locked copy."
      },
      hint: "Toggle to see how default arguments permanently lock each value at creation."
    },
    dialogues: {
      intro: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "I recorded index 0, then 1, then 2. So reading prophecy 0 will definitely give Prophecy 0!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Careful, Elara. Are you recording the *number* inside the crystal, or merely a sticky note pointing to the number's location?" }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "I bet it prints Prophecy 0." },
        { speaker: 'mage', name: "Arch-Mage", text: "Cast the spell and witness the phantom time-shift." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "It says Prophecy 2! How did the first prophecy know about the end of the loop?!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Spells are incredibly lazy. They don't check what value `i` has until you actually CAST them. By the time you cast it, the loop was already over!" },
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "So... all three prophecies were staring at the same variable `i`, which was left sitting at 2!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Precisely. If you want to trap a variable inside a spell permanently, use a default argument. Fix it in the trial!" }
      ]
    }
  },
  {
    id: 4,
    title: "Tome 4: The Identity Paradox",
    name: "is vs == — The Twin Illusion",
    logbook: '"Two numbers look identical. They even pass the equality test. But are they truly the same object in memory?"',
    code: "a = 256\nb = 256\nprint(a is b)  # True?\n\nx = 257\ny = 257\nprint(x is y)  # True?",
    predictions: ["True, True", "True, False", "False, False"],
    discovery: {
      title: "Anomaly Detected: Integer Caching",
      texts: [
        "Python secretly pre-builds and caches all integers from -5 to 256 when it starts up.",
        "So `a = 256` and `b = 256` both point to the SAME pre-built object. `is` returns True.",
        "But 257 is outside that cache. Python builds two separate 257 objects. They are equal (`==`) but NOT identical (`is`)!"
      ],
      trial: "Try `id(a)` and `id(b)` vs `id(x)` and `id(y)` to prove they are different physical objects."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'a', label: '📌 a', type: 'player', color: 'blue' },
          { id: 'b', label: '📌 b', type: 'player', color: 'blue' },
          { id: 'cached', label: '🔢 256 (cached)', type: 'object', color: 'green', value: 'id: same' },
          { id: 'x', label: '📌 x', type: 'player', color: 'yellow' },
          { id: 'y', label: '📌 y', type: 'player', color: 'yellow' },
          { id: 'obj1', label: '🔢 257 (copy A)', type: 'object', color: 'red', value: 'id: 9001' },
          { id: 'obj2', label: '🔢 257 (copy B)', type: 'object', color: 'red', value: 'id: 9002' },
        ],
        links: [
          { from: 'a', to: 'cached', label: 'is ✅' },
          { from: 'b', to: 'cached', label: 'is ✅' },
          { from: 'x', to: 'obj1', label: 'is ❌' },
          { from: 'y', to: 'obj2', label: 'is ❌' },
        ],
        caption: "256 is cached (shared object). 257 is NOT cached (two separate objects)."
      },
      after: {
        entities: [
          { id: 'a', label: '📌 a', type: 'player', color: 'blue' },
          { id: 'b', label: '📌 b', type: 'player', color: 'blue' },
          { id: 'cached', label: '🔢 256 (cached)', type: 'object', color: 'green', value: 'id: same' },
        ],
        links: [
          { from: 'a', to: 'cached', label: '== ✅' },
          { from: 'b', to: 'cached', label: '== ✅' },
        ],
        caption: "Use `==` for value comparison. Use `is` only when you explicitly need identity checks (like `is None`)."
      },
      hint: "Toggle to see why `==` is safer than `is` for comparing values."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "Tome 4. Two numbers that look the same... but are they the SAME?" },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "256 is 256. Obviously True. And 257 is 257. Also True. Right?" },
        { speaker: 'mage', name: "Arch-Mage", text: "Cast the spell. You may be surprised by Python's secret number vault." }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "Both True. Numbers are numbers!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Make your prediction." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "True then False?! How can 257 NOT be 257?!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Python caches small integers. 256 is pre-built and shared. 257 is freshly forged each time — two objects, same value." },
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "So `is` checks identity, `==` checks equality. They are different questions!" }
      ]
    }
  },
  {
    id: 5,
    title: "Tome 5: The Shallow Copy Illusion",
    name: "Nested List Mutation",
    logbook: '"I copied a list to keep a backup. But when I changed the original, my backup changed too!"',
    code: "original = [[1, 2], [3, 4]]\nbackup = original.copy()\n\noriginal[0].append(99)\n\nprint('Original:', original)\nprint('Backup:', backup)",
    predictions: ["Backup is [[1,2],[3,4]]", "Backup is [[1,2,99],[3,4]]", "The spell shatters (Crash)"],
    discovery: {
      title: "Anomaly Detected: Shallow Copy",
      texts: [
        "`.copy()` only duplicates the outer list container. The inner lists are still the SAME objects!",
        "Both `original[0]` and `backup[0]` point to the exact same `[1, 2]` list in memory.",
        "To truly separate nested structures, you need `import copy; copy.deepcopy(original)`."
      ],
      trial: "Replace `.copy()` with `import copy` and `copy.deepcopy(original)` to prove the backup stays independent."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'orig', label: '📋 original', type: 'player', color: 'blue' },
          { id: 'back', label: '📋 backup', type: 'player', color: 'yellow' },
          { id: 'inner', label: '📦 [1, 2, 99]', type: 'object', color: 'red', value: 'SHARED inner list' },
        ],
        links: [
          { from: 'orig', to: 'inner', label: '[0] →' },
          { from: 'back', to: 'inner', label: '[0] →' },
        ],
        caption: "Shallow copy duplicated the outer box but both still point to the same inner boxes!"
      },
      after: {
        entities: [
          { id: 'orig', label: '📋 original', type: 'player', color: 'blue' },
          { id: 'back', label: '📋 backup', type: 'player', color: 'blue' },
          { id: 'inner1', label: '📦 [1, 2, 99]', type: 'object', color: 'green', value: 'original inner' },
          { id: 'inner2', label: '📦 [1, 2]', type: 'object', color: 'green', value: 'backup inner' },
        ],
        links: [
          { from: 'orig', to: 'inner1', label: '[0] →' },
          { from: 'back', to: 'inner2', label: '[0] →' },
        ],
        caption: "deepcopy() recursively clones every nested object. Fully independent!"
      },
      hint: "Toggle to see the difference between shallow copy and deep copy."
    },
    dialogues: {
      intro: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "I used .copy() to make a safe backup. That should be fine, right?" },
        { speaker: 'mage', name: "Arch-Mage", text: "Look carefully. What exactly does .copy() duplicate?" }
      ],
      predicting: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "The backup should be untouched. We copied it!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Cast the spell and verify your assumption." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "The backup changed too! But I copied it!" },
        { speaker: 'mage', name: "Arch-Mage", text: ".copy() is a shallow copy. It duplicates the outer shell, but the inner objects are still shared references." },
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "So we need deepcopy() to truly clone nested structures!" }
      ]
    }
  },
  {
    id: 6,
    title: "Tome 6: The Tuple Betrayal",
    name: "Mutable Inside Immutable",
    logbook: '"Tuples are immutable. Nothing can change them. So what happens when a tuple contains a list?"',
    code: "t = ([1, 2], 'hello')\nt[0].append(3)\nprint(t)",
    predictions: ["TypeError (can't modify tuple)", "([1, 2, 3], 'hello')", "([1, 2], 'hello')"],
    discovery: {
      title: "Anomaly Detected: Tuple Betrayal",
      texts: [
        "The tuple itself is immutable — you cannot reassign its slots. `t[0] = something_else` would crash.",
        "But the tuple only holds a REFERENCE to the list. The list itself is still mutable!",
        "You didn't change the tuple. You changed the object the tuple points to. The reference stayed the same."
      ],
      trial: "Try `t[0] = [1,2,3]` to see Python reject it. Then try `t[0].append(3)` again — it works because the list is free."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'tuple', label: '🔒 Tuple t', type: 'player', color: 'blue', value: 'immutable container' },
          { id: 'list', label: '📦 [1, 2, 3]', type: 'object', color: 'red', value: 'mutable!' },
          { id: 'str', label: '📜 "hello"', type: 'object', color: 'green', value: 'immutable' },
        ],
        links: [
          { from: 'tuple', to: 'list', label: 't[0] → (ref unchanged)' },
          { from: 'tuple', to: 'str', label: 't[1] →' },
        ],
        caption: "The tuple's reference hasn't changed — it still points to the same list. But the list ITSELF mutated!"
      },
      after: {
        entities: [
          { id: 'tuple', label: '🔒 Tuple t', type: 'player', color: 'blue', value: 'immutable container' },
          { id: 'list', label: '📦 [1, 2]', type: 'object', color: 'green', value: 'frozen by convention' },
          { id: 'str', label: '📜 "hello"', type: 'object', color: 'green', value: 'immutable' },
        ],
        links: [
          { from: 'tuple', to: 'list', label: 't[0] →' },
          { from: 'tuple', to: 'str', label: 't[1] →' },
        ],
        caption: "Lesson: Never put mutable objects inside tuples if you expect true immutability."
      },
      hint: "Toggle to see how immutability works at the reference level, not the object level."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "Tuples are sealed scrolls. Immutable. Unchangeable. Or are they?" },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "If a tuple contains a list, and I append to the list... does the tuple crash?" }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "TypeError for sure. Tuples don't change!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Cast and observe." }
      ],
      revealed: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "It WORKED?! The tuple changed!" },
        { speaker: 'mage', name: "Arch-Mage", text: "The tuple didn't change. Its reference is the same. But the object it references is mutable and free to change internally." }
      ]
    }
  },
  {
    id: 7,
    title: "Tome 7: The String Interning Trick",
    name: "Phantom String Identity",
    logbook: '"Two identical strings. One created normally, one created by joining. Are they the same object?"',
    code: "a = 'hello'\nb = 'hello'\nprint(a is b)\n\nx = 'hello world!'\ny = 'hello' + ' world!'\nprint(x is y)",
    predictions: ["True, True", "True, False", "False, False"],
    discovery: {
      title: "Anomaly Detected: String Interning",
      texts: [
        "Python automatically 'interns' (caches) simple strings that look like identifiers.",
        "'hello' is simple enough to cache, so `a` and `b` share the same object.",
        "'hello world!' contains a space and punctuation — Python doesn't intern it, so runtime concatenation creates a new object."
      ],
      trial: "Try `import sys; x = sys.intern('hello world!')` to force interning and make `is` return True."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'a', label: '📌 a', type: 'player', color: 'blue' },
          { id: 'b', label: '📌 b', type: 'player', color: 'blue' },
          { id: 'cached', label: '📝 "hello" (interned)', type: 'object', color: 'green', value: 'shared' },
          { id: 'x', label: '📌 x', type: 'player', color: 'yellow' },
          { id: 'y', label: '📌 y', type: 'player', color: 'yellow' },
          { id: 's1', label: '📝 "hello world!"', type: 'object', color: 'red', value: 'id: 5001' },
          { id: 's2', label: '📝 "hello world!"', type: 'object', color: 'red', value: 'id: 5002' },
        ],
        links: [
          { from: 'a', to: 'cached', label: 'is ✅' },
          { from: 'b', to: 'cached', label: 'is ✅' },
          { from: 'x', to: 's1', label: 'is ❌' },
          { from: 'y', to: 's2', label: 'is ❌' },
        ],
        caption: "Simple identifier-like strings are interned. Complex strings with spaces/punctuation are NOT."
      },
      after: {
        entities: [
          { id: 'a', label: '📌 a', type: 'player', color: 'blue' },
          { id: 'b', label: '📌 b', type: 'player', color: 'blue' },
          { id: 'cached', label: '📝 "hello" (interned)', type: 'object', color: 'green', value: 'shared' },
        ],
        links: [
          { from: 'a', to: 'cached', label: '== ✅' },
          { from: 'b', to: 'cached', label: '== ✅' },
        ],
        caption: "Always use `==` for string comparison. Never rely on `is` for strings."
      },
      hint: "Toggle to see how Python's string cache decides what to intern."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "Strings can be tricky. Python secretly caches some strings but not others." },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "Both are 'hello world!'. They must be identical!" }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "True and True!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Let us see what the interpreter decides." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "True then False?! They look the same!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Python only interns simple strings. Runtime-built strings get fresh memory allocations." },
        { speaker: 'mage', name: "Arch-Mage", text: "You have mastered the Archive's containers. Next, we leave the shelves behind and enter the deeper magic: how a spell remembers what it was never told to remember." }
      ]
    }
  },
  {
    id: 8,
    title: "Tome 8: The Generator Vanishing Act",
    name: "Exhausted Iterator",
    logbook: '"I built a generator and summed it twice. But the second sum was zero. The data vanished!"',
    code: "nums = (x * 2 for x in range(5))\n\nprint('First sum:', sum(nums))\nprint('Second sum:', sum(nums))",
    predictions: ["20, 20", "20, 0", "The spell shatters (Crash)"],
    discovery: {
      title: "Anomaly Detected: Exhausted Generator",
      texts: [
        "A generator is a one-shot stream. Once you iterate through it, it's empty forever.",
        "The first `sum(nums)` consumed every value. The generator is now exhausted.",
        "The second `sum(nums)` iterates over an empty stream and returns 0. The data is gone."
      ],
      trial: "Convert to a list first: `nums = list(x * 2 for x in range(5))` to make it reusable."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'gen', label: '💨 Generator nums', type: 'object', color: 'red', value: 'EXHAUSTED (empty)' },
          { id: 'sum1', label: '🧮 First sum()', type: 'player', color: 'green' },
          { id: 'sum2', label: '🧮 Second sum()', type: 'player', color: 'yellow' },
        ],
        links: [
          { from: 'sum1', to: 'gen', label: 'consumed all →' },
          { from: 'sum2', to: 'gen', label: 'nothing left ❌' },
        ],
        caption: "The generator was consumed by the first sum(). The second gets nothing."
      },
      after: {
        entities: [
          { id: 'list', label: '📋 List nums', type: 'object', color: 'green', value: '[0,2,4,6,8]' },
          { id: 'sum1', label: '🧮 First sum()', type: 'player', color: 'blue' },
          { id: 'sum2', label: '🧮 Second sum()', type: 'player', color: 'blue' },
        ],
        links: [
          { from: 'sum1', to: 'list', label: 'reads →' },
          { from: 'sum2', to: 'list', label: 'reads →' },
        ],
        caption: "Lists persist in memory. Both sums can read the same data."
      },
      hint: "Toggle to see the difference between one-shot generators and reusable lists."
    },
    dialogues: {
      intro: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "I summed my numbers twice. But the second time, everything vanished!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Generators are like rivers. Once the water flows past you, it's gone." }
      ],
      predicting: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "20 both times. The data is still there!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Is it? Cast the spell." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "20 then 0?! Where did the data go?!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Generators yield values once. After exhaustion, they are empty husks. Use a list if you need persistence." }
      ]
    }
  },
  {
    id: 9,
    title: "Tome 9: The Diamond Inheritance",
    name: "MRO Conflict",
    logbook: '"Two parent classes define the same method. My child inherits from both. Which parent wins?"',
    code: "class A:\n    def greet(self): return 'Hello from A'\n\nclass B(A):\n    def greet(self): return 'Hello from B'\n\nclass C(A):\n    def greet(self): return 'Hello from C'\n\nclass D(B, C):\n    pass\n\nprint(D().greet())\nprint(D.__mro__)",
    predictions: ["Hello from A", "Hello from B", "Hello from C"],
    discovery: {
      title: "Anomaly Detected: Method Resolution Order",
      texts: [
        "Python uses the C3 Linearization algorithm to decide the Method Resolution Order (MRO).",
        "D inherits from B first, then C. So Python checks D → B → C → A.",
        "B.greet() is found first in the MRO chain, so it wins. This is the 'Diamond Problem' solved."
      ],
      trial: "Swap the order to `class D(C, B)` and watch C.greet() win instead."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'd', label: '💎 D', type: 'player', color: 'yellow' },
          { id: 'b', label: '🔵 B', type: 'object', color: 'blue', value: 'greet() → B' },
          { id: 'c', label: '🟡 C', type: 'object', color: 'yellow', value: 'greet() → C' },
          { id: 'a', label: '⚪ A', type: 'object', color: 'green', value: 'greet() → A' },
        ],
        links: [
          { from: 'd', to: 'b', label: '1st parent →' },
          { from: 'd', to: 'c', label: '2nd parent →' },
          { from: 'b', to: 'a', label: 'inherits →' },
          { from: 'c', to: 'a', label: 'inherits →' },
        ],
        caption: "MRO: D → B → C → A. B is checked first, so B.greet() wins."
      },
      after: {
        entities: [
          { id: 'd', label: '💎 D', type: 'player', color: 'yellow' },
          { id: 'c', label: '🟡 C', type: 'object', color: 'blue', value: 'greet() → C' },
          { id: 'b', label: '🔵 B', type: 'object', color: 'yellow', value: 'greet() → B' },
          { id: 'a', label: '⚪ A', type: 'object', color: 'green', value: 'greet() → A' },
        ],
        links: [
          { from: 'd', to: 'c', label: '1st parent →' },
          { from: 'd', to: 'b', label: '2nd parent →' },
          { from: 'c', to: 'a', label: 'inherits →' },
          { from: 'b', to: 'a', label: 'inherits →' },
        ],
        caption: "Swap to D(C, B): MRO becomes D → C → B → A. Now C.greet() wins."
      },
      hint: "Toggle to see how the parent order in the class definition changes the MRO."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "The Diamond Problem. Two parents, one grandparent, same method. Who wins?" },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "A is the original. Shouldn't A always win?" }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "I bet it's from A. The grandparent is the source." },
        { speaker: 'mage', name: "Arch-Mage", text: "Cast and see." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "B won! Not A!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Python's C3 Linearization checks children before parents. B comes first in the declaration, so B wins." }
      ]
    }
  },
  {
    id: 10,
    title: "Tome 10: The Decorator Disguise",
    name: "Lost Function Identity",
    logbook: '"I decorated my function by wrapping it. But now it has forgotten its own name!"',
    code: "def my_decorator(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@my_decorator\ndef greet():\n    '''Says hello'''\n    return 'Hello!'\n\nprint(greet.__name__)\nprint(greet.__doc__)",
    predictions: ["greet, Says hello", "wrapper, None", "The spell shatters (Crash)"],
    discovery: {
      title: "Anomaly Detected: Decorator Identity Loss",
      texts: [
        "When you apply `@my_decorator`, Python replaces `greet` with `wrapper`.",
        "`greet.__name__` is now 'wrapper' and `greet.__doc__` is None because those belong to the wrapper function.",
        "Use `@functools.wraps(func)` on the wrapper to copy the original function's metadata."
      ],
      trial: "Add `import functools` and `@functools.wraps(func)` above `def wrapper` to preserve the identity."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'greet', label: '📌 greet', type: 'player', color: 'yellow' },
          { id: 'wrapper', label: '🎭 wrapper()', type: 'object', color: 'red', value: '__name__ = "wrapper"' },
          { id: 'real', label: '🔮 real greet()', type: 'object', color: 'blue', value: 'hidden inside' },
        ],
        links: [
          { from: 'greet', to: 'wrapper', label: 'points to →' },
          { from: 'wrapper', to: 'real', label: 'calls internally →' },
        ],
        caption: "The name 'greet' now points to wrapper. The real function is hidden and its metadata is lost."
      },
      after: {
        entities: [
          { id: 'greet', label: '📌 greet', type: 'player', color: 'blue' },
          { id: 'wrapper', label: '✅ wrapper (wraps greet)', type: 'object', color: 'green', value: '__name__ = "greet"' },
        ],
        links: [
          { from: 'greet', to: 'wrapper', label: '@functools.wraps ✅' },
        ],
        caption: "functools.wraps copies __name__, __doc__, and other metadata from the original function."
      },
      hint: "Toggle to see how @functools.wraps preserves function identity."
    },
    dialogues: {
      intro: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "I decorated greet() but now it says its name is 'wrapper'!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Decorators replace functions with their wrappers. The original's identity is overwritten." }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "greet and 'Says hello'. The decorator shouldn't change the name." },
        { speaker: 'mage', name: "Arch-Mage", text: "Cast the spell." }
      ],
      revealed: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "wrapper and None?! The decorator stole the identity!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Use functools.wraps to preserve the original function's soul." },
        { speaker: 'mage', name: "Arch-Mage", text: "You can wrap spells now. Next, we forge the vessels those spells live inside — the blueprints the Archive calls classes." }
      ]
    }
  },
  {
    id: 11,
    title: "Tome 11: The Walrus Trap",
    name: "Scope Leak via :=",
    logbook: '"The walrus operator `:=` is convenient. But it leaks variables into places you don\'t expect."',
    code: "result = [y := x * 2 for x in range(3)]\n\nprint('Result:', result)\nprint('y leaked:', y)",
    predictions: ["NameError (y not defined)", "y leaked: 4", "y leaked: 0"],
    discovery: {
      title: "Anomaly Detected: Walrus Scope Leak",
      texts: [
        "In a list comprehension, the loop variable `x` is scoped INSIDE the comprehension. It doesn't leak.",
        "But the walrus operator `:=` assigns `y` to the ENCLOSING scope — outside the comprehension!",
        "`y` retains the last value assigned (4) and is accessible after the comprehension ends."
      ],
      trial: "Remove the walrus operator and try to print `x` after the comprehension. You'll get a NameError — `x` is properly scoped."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'comp', label: '🔄 List Comprehension', type: 'scope', color: 'blue', value: 'x is scoped inside' },
          { id: 'outer', label: '🌍 Outer Scope', type: 'scope', color: 'red', value: 'y = 4 (leaked!)' },
        ],
        links: [
          { from: 'comp', to: 'outer', label: ':= leaks y →' },
        ],
        caption: "The walrus `:=` breaks containment. `y` escapes the list comprehension into the outer scope."
      },
      after: {
        entities: [
          { id: 'comp', label: '🔄 List Comprehension', type: 'scope', color: 'green', value: 'x stays inside' },
          { id: 'outer', label: '🌍 Outer Scope', type: 'scope', color: 'green', value: 'no leaks' },
        ],
        links: [],
        caption: "Without :=, the comprehension is a clean, contained scope. No variables leak."
      },
      hint: "Toggle to understand how := pierces scope boundaries."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "The walrus operator. Powerful, but dangerous. It leaks." },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "List comprehensions are self-contained... right?" }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "NameError. y shouldn't exist outside the comprehension." },
        { speaker: 'mage', name: "Arch-Mage", text: "Cast and see." }
      ],
      revealed: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "y leaked to 4! That breaks the scope rules!" },
        { speaker: 'mage', name: "Arch-Mage", text: ":= is designed to assign to the enclosing scope. It's a feature, not a bug. But it's dangerous if misunderstood." },
        { speaker: 'mage', name: "Arch-Mage", text: "You now know where variables live and die. Next: spells that refuse to finish — that pause mid-cast and hand you values one drop at a time." }
      ]
    }
  },
  {
    id: 12,
    title: "Tome 12: The Silent Mutation",
    name: "Chained Assignment Trap",
    logbook: '"I assigned two variables to the same empty list in one line. Surely they are independent?"',
    code: "a = b = []\na.append(1)\n\nprint('a:', a)\nprint('b:', b)",
    predictions: ["a: [1], b: []", "a: [1], b: [1]", "The spell shatters (Crash)"],
    discovery: {
      title: "Anomaly Detected: Chained Assignment",
      texts: [
        "`a = b = []` creates ONE list and assigns BOTH `a` and `b` to it.",
        "It's the same as `temp = []; a = temp; b = temp`. Both names point to the same object.",
        "To create independent lists, use `a = []` and `b = []` on separate lines."
      ],
      trial: "Change to `a, b = [], []` or separate the assignments to prove they become independent."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'a', label: '📌 a', type: 'player', color: 'blue' },
          { id: 'b', label: '📌 b', type: 'player', color: 'yellow' },
          { id: 'list', label: '📦 [1]', type: 'object', color: 'red', value: 'SHARED' },
        ],
        links: [
          { from: 'a', to: 'list', label: 'points →' },
          { from: 'b', to: 'list', label: 'points →' },
        ],
        caption: "a = b = [] created ONE list. Both names point to the exact same object."
      },
      after: {
        entities: [
          { id: 'a', label: '📌 a', type: 'player', color: 'blue' },
          { id: 'b', label: '📌 b', type: 'player', color: 'blue' },
          { id: 'list1', label: '📦 [1]', type: 'object', color: 'green', value: 'a only' },
          { id: 'list2', label: '📦 []', type: 'object', color: 'green', value: 'b only' },
        ],
        links: [
          { from: 'a', to: 'list1', label: 'own →' },
          { from: 'b', to: 'list2', label: 'own →' },
        ],
        caption: "Separate assignments create separate objects. Independent and safe."
      },
      hint: "Toggle to see the difference between chained and separate assignment."
    },
    dialogues: {
      intro: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "a = b = []. Two variables, two empty lists. Simple!" },
        { speaker: 'mage', name: "Arch-Mage", text: "How many lists did Python actually create?" }
      ],
      predicting: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "a gets [1], b stays []. They're separate." },
        { speaker: 'mage', name: "Arch-Mage", text: "Cast the spell." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "Both have [1]! It's the shared bag problem again!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Chained assignment binds both names to the SAME object. Always." }
      ]
    }
  },
  {
    id: 13,
    title: "Tome 13: The Exception Swallower",
    name: "Bare except: Catastrophe",
    logbook: '"I wrote a catch-all except block to handle errors. But now I cannot even stop the program with Ctrl+C!"',
    code: "import sys\n\ntry:\n    print('Starting...')\n    # Simulating: raise KeyboardInterrupt\n    raise KeyboardInterrupt()\nexcept:\n    print('Caught an error!')\n\nprint('Program continues')",
    predictions: ["KeyboardInterrupt crashes out", "Caught an error!", "The spell shatters (Crash)"],
    discovery: {
      title: "Anomaly Detected: Bare except:",
      texts: [
        "A bare `except:` catches EVERYTHING — including `KeyboardInterrupt`, `SystemExit`, and `GeneratorExit`.",
        "This means `Ctrl+C` can't stop your program! `sys.exit()` can't exit! You've built an inescapable trap.",
        "Always use `except Exception:` to catch regular errors while letting system signals pass through."
      ],
      trial: "Change `except:` to `except Exception:` and watch `KeyboardInterrupt` escape the catch block."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'try', label: '🛡️ try block', type: 'scope', color: 'blue', value: 'raise KeyboardInterrupt' },
          { id: 'except', label: '🕳️ bare except:', type: 'scope', color: 'red', value: 'catches EVERYTHING' },
        ],
        links: [
          { from: 'try', to: 'except', label: 'swallowed ❌' },
        ],
        caption: "Bare except: catches KeyboardInterrupt, SystemExit — everything. You can't escape!"
      },
      after: {
        entities: [
          { id: 'try', label: '🛡️ try block', type: 'scope', color: 'blue', value: 'raise KeyboardInterrupt' },
          { id: 'except', label: '✅ except Exception:', type: 'scope', color: 'green', value: 'catches bugs only' },
        ],
        links: [],
        caption: "except Exception: lets system signals (Ctrl+C, sys.exit) pass through safely."
      },
      hint: "Toggle to see the critical difference between `except:` and `except Exception:`."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "A bare except: is one of the most dangerous spells in the Py-Tongue." },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "But it catches all errors! That's good, right?" }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "KeyboardInterrupt should crash through. It's not a normal error." },
        { speaker: 'mage', name: "Arch-Mage", text: "Cast and observe." }
      ],
      revealed: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "'Caught an error'?! It swallowed KeyboardInterrupt!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Bare except catches BaseException — the root of ALL exceptions. Never use it." },
        { speaker: 'mage', name: "Arch-Mage", text: "Streams and safety are yours now. It is time to learn the Art of Wrapping — spells that reach inside other spells and quietly rewrite them." }
      ]
    }
  },
  {
    id: 14,
    title: "Tome 14: The GIL Illusion",
    name: "Thread-Unsafe Counter",
    logbook: '"I used threads to count to 100,000. But the final number is wrong. Every single time."',
    code: "import threading\n\ncounter = 0\n\ndef increment():\n    global counter\n    for _ in range(100000):\n        counter += 1\n\nt1 = threading.Thread(target=increment)\nt2 = threading.Thread(target=increment)\nt1.start(); t2.start()\nt1.join(); t2.join()\n\nprint('Expected: 200000')\nprint('Actual:', counter)",
    predictions: ["200000", "Less than 200000", "The spell shatters (Crash)"],
    discovery: {
      title: "Anomaly Detected: Race Condition",
      texts: [
        "The GIL (Global Interpreter Lock) does NOT make your code thread-safe!",
        "`counter += 1` is NOT atomic. It's actually: read counter → add 1 → write counter. Threads can interleave between these steps.",
        "Two threads can read the same value, both add 1, and both write the same result — losing one increment."
      ],
      trial: "Use `threading.Lock()` around the increment to make it atomic and get exactly 200000."
    },
    sandbox: {
      before: {
        entities: [
          { id: 't1', label: '🧵 Thread 1', type: 'player', color: 'blue' },
          { id: 't2', label: '🧵 Thread 2', type: 'player', color: 'yellow' },
          { id: 'counter', label: '🔢 counter', type: 'object', color: 'red', value: '< 200000 (lost writes!)' },
        ],
        links: [
          { from: 't1', to: 'counter', label: 'read-add-write →' },
          { from: 't2', to: 'counter', label: 'read-add-write →' },
        ],
        caption: "Both threads read the same value simultaneously. One write overwrites the other."
      },
      after: {
        entities: [
          { id: 't1', label: '🧵 Thread 1', type: 'player', color: 'blue' },
          { id: 't2', label: '🧵 Thread 2', type: 'player', color: 'blue' },
          { id: 'lock', label: '🔒 Lock', type: 'object', color: 'green', value: 'mutual exclusion' },
          { id: 'counter', label: '🔢 counter', type: 'object', color: 'green', value: '200000 ✅' },
        ],
        links: [
          { from: 't1', to: 'lock', label: 'acquire →' },
          { from: 't2', to: 'lock', label: 'waits →' },
          { from: 'lock', to: 'counter', label: 'safe access →' },
        ],
        caption: "A Lock ensures only one thread can read-add-write at a time. No data loss."
      },
      hint: "Toggle to see how a Lock prevents race conditions."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "The GIL. Many believe it makes Python thread-safe. They are wrong." },
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "Two threads, 100k each. 200k total. Simple math!" }
      ],
      predicting: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "200000. The GIL protects everything." },
        { speaker: 'mage', name: "Arch-Mage", text: "Does it? Cast the spell." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "Less than 200000?! What happened to the missing increments?!" },
        { speaker: 'mage', name: "Arch-Mage", text: "+= is not atomic. The GIL switches threads between the read and write. Use a Lock." }
      ]
    }
  },
  {
    id: 15,
    title: "Tome 15: The Circular Import",
    name: "Module Deadlock",
    logbook: '"Module A imports Module B. Module B imports Module A. Then everything breaks with ImportError."',
    code: "# Simulating circular imports in one file:\nimport sys\nimport types\n\n# Create fake module_a\nmodule_a = types.ModuleType('module_a')\nsys.modules['module_a'] = module_a\n\n# Create fake module_b\nmodule_b = types.ModuleType('module_b')\nsys.modules['module_b'] = module_b\n\n# module_a tries to use module_b.value\nexec('import module_b; result = module_b.value', module_a.__dict__)\n\nprint('This line never runs')",
    predictions: ["Prints normally", "ImportError", "AttributeError"],
    discovery: {
      title: "Anomaly Detected: Circular Import",
      texts: [
        "When Module A imports Module B, Python starts executing Module B.",
        "But Module B tries to import Module A — which hasn't finished loading yet! Module A is partially initialized.",
        "The attribute you need from the half-loaded module doesn't exist yet, causing AttributeError."
      ],
      trial: "Fix circular imports by: (1) moving imports inside functions, (2) restructuring to remove the cycle, or (3) using lazy imports."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'a', label: '📦 Module A', type: 'scope', color: 'red', value: 'imports B...' },
          { id: 'b', label: '📦 Module B', type: 'scope', color: 'red', value: 'imports A...' },
        ],
        links: [
          { from: 'a', to: 'b', label: 'import → (triggers B)' },
          { from: 'b', to: 'a', label: 'import → (A not ready!) ❌' },
        ],
        caption: "A imports B, which imports A again. But A isn't finished loading yet. Deadlock!"
      },
      after: {
        entities: [
          { id: 'a', label: '📦 Module A', type: 'scope', color: 'green', value: 'fully loaded' },
          { id: 'b', label: '📦 Module B', type: 'scope', color: 'green', value: 'lazy import inside function' },
        ],
        links: [
          { from: 'a', to: 'b', label: 'import ✅' },
        ],
        caption: "Move the import inside the function that needs it. By that point, both modules are fully loaded."
      },
      hint: "Toggle to see how lazy imports inside functions break the circular dependency."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "The Circular Import. Two modules caught in an infinite loop of dependency." },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "Module A needs B. Module B needs A. That makes sense... right?" }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "Python is smart enough to handle it." },
        { speaker: 'mage', name: "Arch-Mage", text: "Cast the spell." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "AttributeError! Module A was half-loaded!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Python loads modules top-to-bottom. If B loads A before A finishes, A is incomplete. Break the cycle with lazy imports." },
        { speaker: 'mage', name: "Arch-Mage", text: "Fifteen anomalies mastered. The language itself holds no more surprises for you — only its containers do now. To the Data Structure vaults, apprentices." }
      ]
    }
  },
  // ═══════════════════════════════════════════════════════════════
  // NEW QUESTS: DECORATOR DEEP-DIVE (201-202) + OOP (203-208)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 201,
    tier: "Decorators",
    title: "The Flexible Wrapper",
    name: "Decorators + *args/**kwargs",
    logbook: '"Our basic decorator only worked on functions with zero arguments. What happens when we try to decorate a function that takes parameters? We need to make the wrapper flexible."',
    code: "def log_call(func):\n    def wrapper(*args, **kwargs):\n        print(f'Calling {func.__name__} with args={args}, kwargs={kwargs}')\n        result = func(*args, **kwargs)\n        print(f'{func.__name__} returned {result}')\n        return result\n    return wrapper\n\n@log_call\ndef add(a, b):\n    return a + b\n\n@log_call\ndef greet(name, shout=False):\n    msg = f'Hello, {name}!'\n    return msg.upper() if shout else msg\n\nprint(add(3, 5))\nprint(greet('Alice', shout=True))",
    predictions: ["Logs both calls correctly", "TypeError: wrapper missing arguments", "The spell shatters (Crash)"],
    discovery: {
      title: "Compound Spell: Flexible Decorators",
      texts: [
        "In Ch 4.1, our wrapper took zero arguments. But real functions have parameters! If the wrapper doesn't accept them, decorating ANY function with arguments will crash.",
        "The solution: make the wrapper accept `*args` and `**kwargs`, then pass them through to the original function with `func(*args, **kwargs)`.",
        "This is the PRODUCTION pattern. Every logging decorator, authentication check, and retry mechanism in Django/Flask uses exactly this template."
      ],
      trial: "Add a timer to the decorator: import time, record `start = time.time()` before calling func, and print the elapsed time after. You've just built a profiler!"
    },
    sandbox: {
      before: {
        entities: [
          { id: 'wrapper', label: '🎁 wrapper()', type: 'object', color: 'red', value: 'No params accepted' },
          { id: 'add', label: '➕ add(a, b)', type: 'player', color: 'blue', value: 'Needs 2 args' },
        ],
        links: [
          { from: 'wrapper', to: 'add', label: 'Cannot forward args ❌' },
        ],
        caption: "A rigid wrapper with no parameters cannot decorate functions that need arguments."
      },
      after: {
        entities: [
          { id: 'wrapper', label: '🎁 wrapper(*args, **kwargs)', type: 'object', color: 'green', value: 'Accepts anything' },
          { id: 'add', label: '➕ add(a, b)', type: 'player', color: 'blue' },
          { id: 'greet', label: '👋 greet(name, shout=)', type: 'player', color: 'yellow' },
        ],
        links: [
          { from: 'wrapper', to: 'add', label: 'Forwards (3, 5) ✅' },
          { from: 'wrapper', to: 'greet', label: 'Forwards ("Alice", shout=True) ✅' },
        ],
        caption: "With *args/**kwargs, the wrapper becomes a universal adapter that works on ANY function signature."
      },
      hint: "Toggle to see how *args/**kwargs make a decorator truly general-purpose."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "You learned to wrap a function. But your wrapper was fragile—it could only wrap functions with zero arguments." },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "So if I decorate `add(a, b)`, the wrapper crashes because it doesn't know about `a` and `b`?" }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "The stars! We use *args and **kwargs in the wrapper to catch everything blindly!" },
        { speaker: 'mage', name: "Arch-Mage", text: "A worthy hypothesis. Predict the result." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "It logged both calls perfectly! Even the keyword argument `shout=True`!" },
        { speaker: 'mage', name: "Arch-Mage", text: "This is the production-grade decorator template. Memorize it: `def wrapper(*args, **kwargs): return func(*args, **kwargs)`." }
      ]
    }
  },
  {
    id: 202,
    tier: "Decorators",
    title: "The Triple Nesting",
    name: "Parameterized Decorators",
    logbook: '"What if the decorator itself needs configuration? Like specifying HOW MANY times to retry a failing network call? We need a function that RETURNS a decorator."',
    code: "def repeat(n):\n    def decorator(func):\n        def wrapper(*args, **kwargs):\n            for i in range(n):\n                result = func(*args, **kwargs)\n            return result\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef cast_spell(name):\n    print(f'{name} casts a spell!')\n    return 'done'\n\ncast_spell('Gandalf')",
    predictions: ["Gandalf casts a spell! (x3)", "Gandalf casts a spell! (x1)", "TypeError: repeat() missing function"],
    discovery: {
      title: "Compound Spell: Decorator Factories",
      texts: [
        "When you write `@repeat(3)`, Python first calls `repeat(3)`, which RETURNS the actual decorator function.",
        "So the execution is: `repeat(3)` → returns `decorator` → Python then does `cast_spell = decorator(cast_spell)` → which returns `wrapper`.",
        "Three levels of nesting: the FACTORY (`repeat`), the DECORATOR (`decorator`), and the WRAPPER (`wrapper`). This is the pattern behind `@app.route('/path')` in Flask and `@pytest.mark.parametrize` in testing."
      ],
      trial: "Modify `repeat` to accept an optional `verbose` kwarg: `def repeat(n, verbose=False):` and print the iteration number if verbose is True."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'repeat', label: '🏭 repeat(3)', type: 'player', color: 'blue', value: 'Factory' },
          { id: 'decorator', label: '🎁 decorator(func)', type: 'object', color: 'yellow', value: 'Returned by factory' },
          { id: 'wrapper', label: '🔄 wrapper(*args)', type: 'object', color: 'green', value: 'Calls func 3x' },
        ],
        links: [
          { from: 'repeat', to: 'decorator', label: 'Returns →' },
          { from: 'decorator', to: 'wrapper', label: 'Returns →' },
        ],
        caption: "Three layers: Factory → Decorator → Wrapper. The factory captures the config (n=3)."
      },
      after: {
        entities: [
          { id: 'cast', label: '📌 cast_spell', type: 'player', color: 'blue', value: 'Name hijacked' },
          { id: 'wrapper', label: '🔄 wrapper(*args)', type: 'object', color: 'green', value: 'Loops 3x' },
          { id: 'orig', label: '✨ Original cast_spell', type: 'object', color: 'red', value: 'Hidden inside' },
        ],
        links: [
          { from: 'cast', to: 'wrapper', label: 'Points to →' },
          { from: 'wrapper', to: 'orig', label: 'Calls 3x →' },
        ],
        caption: "After decoration, 'cast_spell' points to wrapper, which calls the original 3 times."
      },
      hint: "Toggle to see the final state after decoration resolves."
    },
    dialogues: {
      intro: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "Wait... `@repeat(3)` has PARENTHESES. That means `repeat` isn't the decorator—it's a function that MAKES a decorator?" },
        { speaker: 'mage', name: "Arch-Mage", text: "Exactly. A decorator factory. Three functions deep." }
      ],
      predicting: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "If n is 3, it should print the spell three times!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Let us verify." }
      ],
      revealed: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "Three prints! The factory captured `n=3` in a closure!" },
        { speaker: 'mage', name: "Arch-Mage", text: "This is exactly how Flask's `@app.route('/path')` and pytest's `@pytest.mark.parametrize` work internally. Master this, and frameworks become transparent." }
      ]
    }
  },
  {
    id: 203,
    tier: "OOP",
    title: "The Constructor",
    name: "__init__ Deep Dive",
    logbook: '"The `__init__` method is NOT a constructor—it is an initializer. Python has already created the object BEFORE __init__ runs. Let us see what really happens when you call `MyClass()`."',
    code: "class Potion:\n    def __init__(self, name, strength=10):\n        self.name = name\n        self.strength = strength\n        self.ingredients = []  # Each potion gets its OWN list\n\n    def add_ingredient(self, item):\n        self.ingredients.append(item)\n        return self\n\nheal = Potion('Healing', strength=50)\nfire = Potion('Fireball')\n\nheal.add_ingredient('Herb').add_ingredient('Water')\nfire.add_ingredient('Sulfur')\n\nprint(f'{heal.name}: {heal.ingredients}')\nprint(f'{fire.name}: {fire.ingredients}')",
    predictions: ["Healing: ['Herb', 'Water'], Fireball: ['Sulfur']", "Both share the same ingredients", "The spell shatters (Crash)"],
    discovery: {
      title: "Core Feature: Object Initialization",
      texts: [
        "`__init__` receives `self`—the ALREADY CREATED empty object—and attaches attributes to it. It's not a constructor; `__new__` is the true constructor.",
        "Notice `self.ingredients = []` creates a FRESH list for each instance. Contrast this with putting `ingredients = []` as a class variable (Ch 5.3)—that would be shared!",
        "Returning `self` from `add_ingredient` enables method chaining: `heal.add_ingredient('Herb').add_ingredient('Water')`. This pattern is used in ORMs like SQLAlchemy."
      ],
      trial: "Add a `__repr__` method: `def __repr__(self): return f'Potion({self.name}, str={self.strength})'` and print the objects directly without `.name`."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'class', label: '🏛️ Potion Class', type: 'object', color: 'blue', value: 'Blueprint' },
          { id: 'new', label: '🔨 __new__()', type: 'object', color: 'yellow', value: 'Creates empty obj' },
          { id: 'init', label: '⚙️ __init__()', type: 'object', color: 'green', value: 'Fills attributes' },
        ],
        links: [
          { from: 'class', to: 'new', label: 'Step 1: Build' },
          { from: 'new', to: 'init', label: 'Step 2: Initialize' },
        ],
        caption: "Python() calls __new__ first (creates empty object), then __init__ (fills it with data)."
      },
      after: {
        entities: [
          { id: 'heal', label: '🧪 heal', type: 'player', color: 'green', value: "['Herb', 'Water']" },
          { id: 'fire', label: '🔥 fire', type: 'player', color: 'red', value: "['Sulfur']" },
        ],
        links: [],
        caption: "Each instance has its OWN list because self.ingredients = [] runs fresh each time __init__ is called."
      },
      hint: "Toggle to see how each Potion() call triggers a fresh __init__ with a separate list."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "You've seen `self`. Now let's understand what happens the EXACT MOMENT you write `Potion('Healing')`." },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "It calls __init__ and creates the object, right?" }
      ],
      predicting: [
        { speaker: 'mage', name: "Arch-Mage", text: "Not quite. __init__ does NOT create the object. `__new__` does. __init__ only dresses it up. But the key question: do heal and fire share ingredients?" },
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "No! `self.ingredients = []` runs separately for each call!" }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "Separate lists! And method chaining works because add_ingredient returns self!" },
        { speaker: 'mage', name: "Arch-Mage", text: "This is the bread and butter of production OOP. Django models, Flask extensions, SQLAlchemy queries—all use __init__ and method chaining." }
      ]
    }
  },
  {
    id: 204,
    tier: "OOP",
    title: "The Dunder Protocols",
    name: "Magic Methods (__str__, __repr__, __len__)",
    logbook: '"Why does `print(my_list)` show something useful but `print(my_object)` shows garbage like `<__main__.Wizard at 0x7f>`? Because lists implement the magic protocol. Let us teach our objects to speak."',
    code: "class Party:\n    def __init__(self, name, members=None):\n        self.name = name\n        self.members = members or []\n\n    def __str__(self):\n        return f'Party \"{self.name}\" with {len(self.members)} members'\n\n    def __repr__(self):\n        return f'Party(name={self.name!r}, members={self.members!r})'\n\n    def __len__(self):\n        return len(self.members)\n\n    def __contains__(self, member):\n        return member in self.members\n\nraid = Party('Dragon Slayers', ['Alice', 'Bob', 'Charlie'])\n\nprint(str(raid))\nprint(repr(raid))\nprint(f'Size: {len(raid)}')\nprint(f'Is Alice in party? {\"Alice\" in raid}')",
    predictions: ["All four work perfectly", "__len__ crashes on custom objects", "The spell shatters (Crash)"],
    discovery: {
      title: "Core Feature: Dunder Protocols",
      texts: [
        "Python's built-in functions (`print`, `len`, `in`) don't check types. They check if your object has the right DUNDER METHOD.",
        "`print()` calls `__str__()`. `repr()` calls `__repr__()`. `len()` calls `__len__()`. `in` calls `__contains__()`. These are protocols.",
        "This is called 'Duck Typing'—if your object walks like a duck (has `__len__`), Python treats it as a duck (something with length). No inheritance required."
      ],
      trial: "Add `__getitem__(self, index)` returning `self.members[index]`. Now you can do `raid[0]` and even `for member in raid:` works automatically!"
    },
    sandbox: {
      before: {
        entities: [
          { id: 'print', label: '🖨️ print()', type: 'player', color: 'blue' },
          { id: 'len', label: '📏 len()', type: 'player', color: 'green' },
          { id: 'in', label: '🔍 in', type: 'player', color: 'yellow' },
          { id: 'obj', label: '⚔️ Party object', type: 'object', color: 'red', value: 'No protocols' },
        ],
        links: [
          { from: 'print', to: 'obj', label: 'Needs __str__' },
          { from: 'len', to: 'obj', label: 'Needs __len__' },
          { from: 'in', to: 'obj', label: 'Needs __contains__' },
        ],
        caption: "Without dunder methods, built-in functions cannot understand your custom objects."
      },
      after: {
        entities: [
          { id: 'print', label: '🖨️ print()', type: 'player', color: 'blue' },
          { id: 'len', label: '📏 len()', type: 'player', color: 'green' },
          { id: 'in', label: '🔍 in', type: 'player', color: 'yellow' },
          { id: 'obj', label: '⚔️ Party object', type: 'object', color: 'green', value: 'Duck Typing ✅' },
        ],
        links: [
          { from: 'print', to: 'obj', label: '__str__ ✅' },
          { from: 'len', to: 'obj', label: '__len__ ✅' },
          { from: 'in', to: 'obj', label: '__contains__ ✅' },
        ],
        caption: "With dunder methods implemented, your object acts just like a built-in type."
      },
      hint: "Toggle to see how dunder methods teach Python to understand your custom objects."
    },
    dialogues: {
      intro: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "When I print my objects, I get `<Party object at 0x7f>`. That's useless." },
        { speaker: 'mage', name: "Arch-Mage", text: "Because you haven't taught your object HOW to introduce itself. The dunder protocols are the language Python speaks." }
      ],
      predicting: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "If we define __len__, then len() should work on our Party... right? Even though it's not a list?" },
        { speaker: 'mage', name: "Arch-Mage", text: "That is the heart of Duck Typing." }
      ],
      revealed: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "It all works! len(raid) returns 3, and 'Alice' in raid returns True!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Your object now speaks Python fluently. This is how Django QuerySets are iterable, how Pandas DataFrames have length, and how SQLAlchemy models are printable." }
      ]
    }
  },
  {
    id: 205,
    tier: "OOP",
    title: "The Guarded Treasure",
    name: "@property (Getters & Setters)",
    logbook: '"In Java, you write `.getName()` and `.setName()`. In Python, we use `@property` to make methods LOOK like attributes. The user writes `obj.name` but secretly triggers validation logic."',
    code: "class Character:\n    def __init__(self, name, hp):\n        self._name = name\n        self._hp = hp\n\n    @property\n    def hp(self):\n        return self._hp\n\n    @hp.setter\n    def hp(self, value):\n        if value < 0:\n            print('HP cannot go below 0! Clamping.')\n            self._hp = 0\n        else:\n            self._hp = value\n\nhero = Character('Alice', 100)\nhero.hp = 50\nprint(f'HP: {hero.hp}')\nhero.hp = -20\nprint(f'HP after damage: {hero.hp}')",
    predictions: ["HP: 50, HP after damage: 0", "HP: 50, HP after damage: -20", "AttributeError"],
    discovery: {
      title: "Core Feature: Property Decorators",
      texts: [
        "`@property` turns a method into a 'computed attribute'. When you access `hero.hp`, Python secretly calls the `hp(self)` getter method.",
        "`@hp.setter` lets you intercept assignments. `hero.hp = -20` secretly calls the setter, which can validate, clamp, or transform the value before storing it.",
        "This is the Pythonic alternative to Java's `getHp()` / `setHp()` pattern. The external API stays clean (`hero.hp`) while the internal logic stays protected."
      ],
      trial: "Add a `@property` called `is_alive` that returns `self._hp > 0`. Now you can write `if hero.is_alive:` as if it were a simple boolean attribute."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'user', label: '👤 User Code', type: 'player', color: 'blue' },
          { id: 'attr', label: '📝 hero.hp = -20', type: 'object', color: 'red', value: 'Direct write' },
        ],
        links: [
          { from: 'user', to: 'attr', label: 'No validation!' },
        ],
        caption: "Without @property, anyone can set hp to negative values. No guardrails."
      },
      after: {
        entities: [
          { id: 'user', label: '👤 User Code', type: 'player', color: 'blue' },
          { id: 'setter', label: '🛡️ @hp.setter', type: 'object', color: 'green', value: 'Clamps to 0' },
          { id: 'attr', label: '🔒 self._hp', type: 'object', color: 'yellow', value: 'Protected' },
        ],
        links: [
          { from: 'user', to: 'setter', label: 'hero.hp = -20' },
          { from: 'setter', to: 'attr', label: 'Stores 0 ✅' },
        ],
        caption: "The setter intercepts the assignment, validates it, and stores a safe value."
      },
      hint: "Toggle to see how @property provides invisible guardrails."
    },
    dialogues: {
      intro: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "In Java, we had to write `getHp()` and `setHp()` everywhere. It was verbose." },
        { speaker: 'mage', name: "Arch-Mage", text: "Python's @property gives you the protection of getters/setters with the elegance of direct attribute access." }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "Setting hp to -20 should trigger the setter and clamp it to 0!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Let us verify." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "Clamped to 0! The user writes `hero.hp = -20` but the setter protects the data!" },
        { speaker: 'mage', name: "Arch-Mage", text: "This is how Django model fields validate data, and how game engines protect physics attributes from impossible values." },
        { speaker: 'mage', name: "Arch-Mage", text: "The Foundations are yours. What remains is Mastery — where blueprints inherit from each other, and the Archive itself starts to bend under concurrency and circular fate." }
      ]
    }
  },
  {
    id: 206,
    tier: "OOP",
    title: "The Lineage Chain",
    name: "Inheritance & super()",
    logbook: `"A Knight is a Character with extra abilities. Instead of rewriting everything, we inherit and extend. But HOW do we properly call the parent's __init__?"`,
    code: "class Character:\n    def __init__(self, name, hp):\n        self.name = name\n        self.hp = hp\n\n    def speak(self):\n        return f'{self.name} says hello!'\n\nclass Knight(Character):\n    def __init__(self, name, hp, weapon):\n        super().__init__(name, hp)  # Call parent's __init__\n        self.weapon = weapon\n\n    def speak(self):\n        base = super().speak()  # Call parent's method\n        return f'{base} *brandishes {self.weapon}*'\n\nsir = Knight('Lancelot', 100, 'Excalibur')\nprint(sir.speak())\nprint(f'{sir.name} has {sir.hp} HP and wields {sir.weapon}')",
    predictions: ["Lancelot says hello! *brandishes Excalibur*", "TypeError: __init__ missing arguments", "The spell shatters (Crash)"],
    discovery: {
      title: "Core Feature: Inheritance & super()",
      texts: [
        "`class Knight(Character)` means Knight INHERITS all of Character's methods and attributes.",
        "`super().__init__(name, hp)` calls the PARENT class's `__init__`, so we don't duplicate the name/hp setup code.",
        "`super().speak()` calls the parent's version of `speak`, letting us extend (not replace) the behavior. This is the Open/Closed Principle: open for extension, closed for modification."
      ],
      trial: "Create a `Mage(Character)` subclass with a `spells` list. Override `speak()` to also list the mage's spells."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'char', label: '🏛️ Character', type: 'object', color: 'blue', value: 'name, hp, speak()' },
          { id: 'knight', label: '⚔️ Knight', type: 'player', color: 'green', value: '+ weapon' },
        ],
        links: [
          { from: 'knight', to: 'char', label: 'Inherits from →' },
        ],
        caption: "Knight inherits name, hp, speak() from Character and adds weapon."
      },
      after: {
        entities: [
          { id: 'char', label: '🏛️ Character.__init__', type: 'object', color: 'blue', value: 'Sets name, hp' },
          { id: 'super', label: '🔗 super().__init__', type: 'object', color: 'yellow', value: 'Calls parent' },
          { id: 'knight', label: '⚔️ Knight.__init__', type: 'player', color: 'green', value: 'Sets weapon' },
        ],
        links: [
          { from: 'knight', to: 'super', label: 'Delegates →' },
          { from: 'super', to: 'char', label: 'Calls →' },
        ],
        caption: "super() delegates the shared setup to the parent, then Knight adds its own weapon."
      },
      hint: "Toggle to see the delegation chain inside __init__."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "A Knight IS a Character. Rather than copying all of Character's code, we inherit it." },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "So Knight gets name, hp, and speak() for free? And we just add the weapon?" }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "super().speak() will call the parent's speak, then we append to it!" },
        { speaker: 'mage', name: "Arch-Mage", text: "A correct theory. Let us test." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "It combined both! Parent's greeting PLUS the weapon flourish!" },
        { speaker: 'mage', name: "Arch-Mage", text: "This is how Django's class-based views, Flask-RESTful resources, and game entity systems all work. Inherit the base, extend the specific." }
      ]
    }
  },
  {
    id: 207,
    tier: "OOP",
    title: "The Blueprint Enforcer",
    name: "Abstract Base Classes",
    logbook: '"How do you force every subclass to implement certain methods? In production, if a developer forgets to implement `save()` on a new model, the app crashes at runtime. ABCs catch this at CLASS CREATION time."',
    code: "from abc import ABC, abstractmethod\n\nclass Weapon(ABC):\n    @abstractmethod\n    def attack(self):\n        pass\n\n    @abstractmethod\n    def durability(self):\n        pass\n\nclass Sword(Weapon):\n    def attack(self):\n        return 'Slash for 10 damage!'\n\n    def durability(self):\n        return 100\n\n# This works:\nblade = Sword()\nprint(blade.attack())\n\n# This crashes:\ntry:\n    broken = Weapon()\nexcept TypeError as e:\n    print(f'Cannot instantiate: {e}')",
    predictions: ["Slash works, but Weapon() crashes with TypeError", "Both work fine", "SyntaxError on @abstractmethod"],
    discovery: {
      title: "Core Feature: Abstract Base Classes",
      texts: [
        "An `ABC` with `@abstractmethod` creates a blueprint that CANNOT be instantiated directly. You can only use subclasses that implement ALL abstract methods.",
        "If `Sword` forgot to implement `durability()`, Python would throw a `TypeError` the moment you try to create a `Sword()`. This is a compile-time safety net.",
        "Django REST Framework's `Serializer`, Python's `collections.abc.Mapping`, and game engine interfaces (IRenderable, ICollidable) all use ABCs to enforce contracts."
      ],
      trial: "Create a `Bow(Weapon)` class that implements both `attack()` and `durability()`. Then try creating a `BrokenSword(Weapon)` that only implements `attack()`—watch it crash on instantiation!"
    },
    sandbox: {
      before: {
        entities: [
          { id: 'abc', label: '📋 Weapon (ABC)', type: 'object', color: 'red', value: 'Cannot instantiate' },
          { id: 'attack', label: '⚔️ attack()', type: 'object', color: 'yellow', value: '@abstractmethod' },
          { id: 'dur', label: '🛡️ durability()', type: 'object', color: 'yellow', value: '@abstractmethod' },
        ],
        links: [
          { from: 'abc', to: 'attack', label: 'Requires →' },
          { from: 'abc', to: 'dur', label: 'Requires →' },
        ],
        caption: "The ABC defines a contract: any subclass MUST implement these methods."
      },
      after: {
        entities: [
          { id: 'abc', label: '📋 Weapon (ABC)', type: 'object', color: 'red', value: 'Contract' },
          { id: 'sword', label: '⚔️ Sword', type: 'player', color: 'green', value: 'Both implemented ✅' },
          { id: 'broken', label: '❌ Broken()', type: 'object', color: 'red', value: 'TypeError!' },
        ],
        links: [
          { from: 'sword', to: 'abc', label: 'Fulfills contract ✅' },
          { from: 'broken', to: 'abc', label: 'Missing methods ❌' },
        ],
        caption: "Only subclasses implementing ALL abstract methods can be instantiated."
      },
      hint: "Toggle to see which subclasses satisfy the ABC contract."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "What if a new developer joins your team and creates a Weapon subclass but forgets to implement `attack()`? Without ABCs, it crashes at RUNTIME, maybe in production." },
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "ABCs catch it at definition time!" }
      ],
      predicting: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "Sword works because it has both methods. But calling Weapon() directly will crash." },
        { speaker: 'mage', name: "Arch-Mage", text: "Verify." }
      ],
      revealed: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "TypeError! You literally cannot create an abstract class!" },
        { speaker: 'mage', name: "Arch-Mage", text: "This is how interface contracts are enforced in production Python. It's the equivalent of Java's `interface` keyword." }
      ]
    }
  },
  {
    id: 208,
    tier: "OOP",
    title: "The Auto-Forged Blueprint",
    name: "Dataclasses (Removing Boilerplate)",
    logbook: '"Writing __init__, __repr__, __eq__ for every class is tedious and error-prone. Python 3.7 introduced `@dataclass` to auto-generate all the boilerplate. But what does it ACTUALLY generate?"',
    code: "from dataclasses import dataclass, field\n\n@dataclass\nclass Spell:\n    name: str\n    damage: int\n    element: str = 'neutral'\n    tags: list = field(default_factory=list)\n\nfireball = Spell('Fireball', 50, 'fire')\nice = Spell('Ice Shard', 30, tags=['slow', 'aoe'])\n\nprint(fireball)\nprint(ice)\nprint(f'Equal? {fireball == Spell(\"Fireball\", 50, \"fire\")}')\nprint(f'Tags separate? {fireball.tags is not ice.tags}')",
    predictions: ["Pretty print + Equal=True + Tags separate", "Garbage print + Equal=False", "The spell shatters (Crash)"],
    discovery: {
      title: "Core Feature: Dataclasses",
      texts: [
        "`@dataclass` auto-generates `__init__`, `__repr__`, and `__eq__` from your type-annotated fields. No more boilerplate!",
        "CRITICAL: Notice `tags: list = field(default_factory=list)`. We CANNOT write `tags: list = []` because that would be a MUTABLE DEFAULT (Ch 1.4's trap!). `field(default_factory=list)` creates a fresh `[]` for each instance.",
        "Dataclasses are the modern standard for DTOs (Data Transfer Objects), API response models, and configuration objects in production Python."
      ],
      trial: "Add `@dataclass(frozen=True)` to make instances immutable—any attempt to change `.name` will raise a `FrozenInstanceError`!"
    },
    sandbox: {
      before: {
        entities: [
          { id: 'manual', label: '📝 Manual Class', type: 'object', color: 'red', value: '15+ lines' },
          { id: 'init', label: '⚙️ __init__', type: 'object', color: 'yellow', value: 'Write by hand' },
          { id: 'repr', label: '📋 __repr__', type: 'object', color: 'yellow', value: 'Write by hand' },
          { id: 'eq', label: '⚖️ __eq__', type: 'object', color: 'yellow', value: 'Write by hand' },
        ],
        links: [
          { from: 'manual', to: 'init', label: 'Boilerplate' },
          { from: 'manual', to: 'repr', label: 'Boilerplate' },
          { from: 'manual', to: 'eq', label: 'Boilerplate' },
        ],
        caption: "Without @dataclass, you write 15+ lines of repetitive __init__, __repr__, __eq__ code."
      },
      after: {
        entities: [
          { id: 'dc', label: '✨ @dataclass', type: 'object', color: 'green', value: '5 lines total' },
          { id: 'init', label: '⚙️ __init__', type: 'object', color: 'green', value: 'Auto-generated' },
          { id: 'repr', label: '📋 __repr__', type: 'object', color: 'green', value: 'Auto-generated' },
          { id: 'eq', label: '⚖️ __eq__', type: 'object', color: 'green', value: 'Auto-generated' },
        ],
        links: [
          { from: 'dc', to: 'init', label: 'Generates →' },
          { from: 'dc', to: 'repr', label: 'Generates →' },
          { from: 'dc', to: 'eq', label: 'Generates →' },
        ],
        caption: "@dataclass auto-generates all the magic methods from your field annotations."
      },
      hint: "Toggle to see how much boilerplate @dataclass eliminates."
    },
    dialogues: {
      intro: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "Every time I make a new class I have to write __init__, __repr__, __eq__... it's SO repetitive." },
        { speaker: 'mage', name: "Arch-Mage", text: "Python 3.7 solved this. The @dataclass decorator auto-forges all that boilerplate from your annotations." }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "Wait—`tags: list = field(default_factory=list)`. That's the Mutable Default fix from Ch 1.4!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Exactly. The architects of dataclasses KNEW about the trap. `default_factory` creates a fresh list every time, just like `inventory=None`." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "Pretty print, equality works, and the tags are separate! All in 5 lines!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Dataclasses are the modern standard. FastAPI, Pydantic, and most API frameworks build on this pattern. Notice how it brings together decorators (Ch 4), mutable defaults (Ch 1.4), and magic methods (Ch 5.4)—everything converges." }
      ]
    }
  },
  // ═══════════════════════════════════════════════════════════════
  // DATA STRUCTURES MASTERY — TIER 1: THE CORE FOUR (301-305)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 301,
    tier: "Data Structures",
    title: "The Living Chain",
    name: "Lists Deep Dive",
    logbook: '"Lists are Python\'s Swiss Army knife. But most developers only use .append(). Slicing, sorting, and stack operations unlock their true power."',
    code: "nums = [3, 1, 4, 1, 5, 9, 2, 6]\n\n# Slicing tricks\nprint(f'Reversed:   {nums[::-1]}')\nprint(f'Every 2nd:  {nums[::2]}')\nprint(f'Last 3:     {nums[-3:]}')\n\n# sort() vs sorted()\nprint(f'sorted():   {sorted(nums)}')\nprint(f'Original:   {nums}')  # unchanged!\n\nnums.sort()\nprint(f'After .sort(): {nums}')  # mutated!\n\n# List as stack\nstack = []\nstack.append('A')\nstack.append('B')\nstack.append('C')\nprint(f'Pop: {stack.pop()}')\nprint(f'Stack: {stack}')",
    predictions: ["Slicing, sorting, and stack all work", "sorted() mutates the original", "The spell shatters (Crash)"],
    discovery: {
      title: "Core DS: List Mastery",
      texts: [
        "`sorted()` returns a NEW list; `.sort()` mutates IN PLACE and returns None. Confusing them is a top-5 Python bug.",
        "Slicing with `[::-1]` reverses, `[::2]` takes every 2nd element, `[-3:]` takes the last 3. The pattern is `[start:stop:step]`.",
        "Lists are already stacks: `.append()` is push, `.pop()` is pop. Both are O(1). No need for a separate Stack class."
      ],
      trial: "Try `nums.sort(reverse=True)` for descending order. Then try `sorted(nums, key=lambda x: -x)` for the same result using sorted()."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'list', label: '📋 [3,1,4,1,5,9,2,6]', type: 'object', color: 'blue' },
          { id: 'sorted', label: '🔄 sorted()', type: 'player', color: 'green', value: 'New list' },
          { id: 'sort', label: '⚙️ .sort()', type: 'player', color: 'red', value: 'Mutates!' },
        ],
        links: [
          { from: 'sorted', to: 'list', label: 'Copies →' },
          { from: 'sort', to: 'list', label: 'Mutates in-place ⚠️' },
        ],
        caption: "sorted() is safe (returns new), .sort() is destructive (returns None)."
      },
      after: {
        entities: [
          { id: 'stack', label: '📚 Stack', type: 'object', color: 'green' },
          { id: 'push', label: '⬆️ .append()', type: 'player', color: 'blue', value: 'O(1)' },
          { id: 'pop', label: '⬇️ .pop()', type: 'player', color: 'yellow', value: 'O(1)' },
        ],
        links: [
          { from: 'push', to: 'stack', label: 'Push →' },
          { from: 'pop', to: 'stack', label: 'Pop ←' },
        ],
        caption: "A Python list IS a stack. append() and pop() are both O(1)."
      },
      hint: "Toggle to see list-as-stack operations."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "You know lists can store things. But do you know they can reverse themselves, sort themselves, and act as stacks?" },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "Wait, sorted() and .sort() are DIFFERENT things?" }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "I think sorted() makes a copy and .sort() changes the original..." },
        { speaker: 'mage', name: "Arch-Mage", text: "Predict and verify." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "sorted() left the original untouched! And .sort() changed it permanently!" },
        { speaker: 'mage', name: "Arch-Mage", text: "This sorted-vs-sort confusion causes more production bugs than you'd think. Remember: if it returns None, it mutated." }
      ]
    }
  },
  {
    id: 302,
    tier: "Data Structures",
    title: "The Sealed Scroll",
    name: "Tuples & Unpacking",
    logbook: '"Tuples look like lists but cannot be changed. Why would you WANT an immutable list? The answer: safety, speed, and the most elegant swap in any language."',
    code: "# Tuple packing\ncoords = (10, 20, 30)\nprint(f'Coords: {coords}')\n\n# Unpacking\nx, y, z = coords\nprint(f'x={x}, y={y}, z={z}')\n\n# The legendary swap\na, b = 'hello', 'world'\na, b = b, a\nprint(f'Swapped: a={a}, b={b}')\n\n# Star unpacking\nfirst, *middle, last = [1, 2, 3, 4, 5]\nprint(f'first={first}, middle={middle}, last={last}')\n\n# Tuples as dict keys (lists can't!)\nlocations = {(0, 0): 'origin', (1, 2): 'castle'}\nprint(f'At origin: {locations[(0, 0)]}')",
    predictions: ["All operations work perfectly", "Tuples can't be dict keys", "The spell shatters (Crash)"],
    discovery: {
      title: "Core DS: Tuple Power",
      texts: [
        "Tuples are immutable, which means they're HASHABLE — so they can be dictionary keys and set members. Lists cannot.",
        "`a, b = b, a` works because Python evaluates the right side first (packing into a tuple), then unpacks into the left side.",
        "Star unpacking `first, *rest = items` captures the remaining elements into a list. This is used in function signatures, loop destructuring, and API parsing."
      ],
      trial: "Try using a list as a dict key: `d = {[1,2]: 'test'}`. Watch it crash with TypeError: unhashable type."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'tuple', label: '📜 (10, 20, 30)', type: 'object', color: 'blue', value: 'Immutable' },
          { id: 'list', label: '📋 [10, 20, 30]', type: 'object', color: 'red', value: 'Mutable' },
        ],
        links: [],
        caption: "Tuples cannot change. Lists can. This difference has profound consequences."
      },
      after: {
        entities: [
          { id: 'key', label: '🔑 {(0,0): ...}', type: 'object', color: 'green', value: 'Tuple as key ✅' },
          { id: 'fail', label: '❌ {[0,0]: ...}', type: 'object', color: 'red', value: 'List as key ❌' },
        ],
        links: [],
        caption: "Only immutable (hashable) types can be dict keys. Tuples yes, lists no."
      },
      hint: "Toggle to see why immutability enables dict keys."
    },
    dialogues: {
      intro: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "Why would I ever use a tuple? Lists can do everything tuples can, AND more." },
        { speaker: 'mage', name: "Arch-Mage", text: "Exactly because they can't be changed, they can do things lists cannot. Like serve as dictionary keys." }
      ],
      predicting: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "The swap trick... does Python really not need a temp variable?" },
        { speaker: 'mage', name: "Arch-Mage", text: "Predict and discover." }
      ],
      revealed: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "No temp variable! And star unpacking is incredible for splitting lists!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Tuples are coordinates, database rows, function return values, and dict keys. Their immutability is a feature, not a limitation." }
      ]
    }
  },
  {
    id: 303,
    tier: "Data Structures",
    title: "The Grimoire Within",
    name: "Dictionary Internals",
    logbook: '"Dicts are O(1) lookup. But HOW? What happens under the hood when you write d[key]? And what are the modern tricks like dict merging and comprehension?"',
    code: "# Dict from pairs\npairs = [('name', 'Alice'), ('hp', 100), ('class', 'Mage')]\nhero = dict(pairs)\nprint(f'Hero: {hero}')\n\n# Merging dicts (Python 3.9+)\ndefaults = {'hp': 50, 'mp': 30, 'class': 'Warrior'}\noverrides = {'hp': 100, 'class': 'Mage', 'weapon': 'staff'}\nfinal = {**defaults, **overrides}\nprint(f'Merged: {final}')\n\n# Dict comprehension\nscores = {'alice': 85, 'bob': 92, 'charlie': 78}\npassed = {k: v for k, v in scores.items() if v >= 80}\nprint(f'Passed: {passed}')\n\n# Keys must be hashable\ntry:\n    bad = {[1,2]: 'test'}\nexcept TypeError as e:\n    print(f'Error: {e}')",
    predictions: ["Merging works with last-wins, list key crashes", "Dict merge preserves first value", "The spell shatters (Crash)"],
    discovery: {
      title: "Core DS: Dict Internals",
      texts: [
        "Dicts use a HASH TABLE internally. `hash(key)` computes a slot, and the value is stored there. This is why lookup is O(1) — no scanning needed.",
        "When merging with `{**a, **b}`, later dicts OVERRIDE earlier ones. Same as `a | b` in Python 3.9+. The last write wins.",
        "Dict keys MUST be hashable (immutable). Strings, ints, tuples: yes. Lists, dicts, sets: no. This is because the hash must stay constant."
      ],
      trial: "Try `hash('hello')` and `hash(42)` to see actual hash values. Then try `hash([1,2])` and watch it crash."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'key', label: '🔑 key', type: 'player', color: 'blue' },
          { id: 'hash', label: '#️⃣ hash()', type: 'object', color: 'yellow', value: 'Computes slot' },
          { id: 'table', label: '📊 Hash Table', type: 'object', color: 'green', value: 'O(1) lookup' },
        ],
        links: [
          { from: 'key', to: 'hash', label: 'Step 1' },
          { from: 'hash', to: 'table', label: 'Step 2: Direct jump' },
        ],
        caption: "d[key] → hash(key) → direct slot access → O(1). No scanning."
      },
      after: {
        entities: [
          { id: 'defaults', label: '📋 defaults', type: 'object', color: 'blue', value: '{hp:50, mp:30}' },
          { id: 'overrides', label: '📋 overrides', type: 'object', color: 'red', value: '{hp:100}' },
          { id: 'final', label: '✅ merged', type: 'player', color: 'green', value: '{hp:100, mp:30}' },
        ],
        links: [
          { from: 'defaults', to: 'final', label: 'Base →' },
          { from: 'overrides', to: 'final', label: 'Overwrites →' },
        ],
        caption: "Dict merge: last writer wins. Overrides replace defaults."
      },
      hint: "Toggle to see dict merge behavior."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "A dict finds any value among millions in constant time. No other structure does this. Do you know how?" },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "Hash tables! The key is converted to a number that points directly to the value's location." }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "When merging two dicts, if they have the same key, which value wins?" },
        { speaker: 'mage', name: "Arch-Mage", text: "Run the spell and observe." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "The LAST dict wins! And lists really can't be keys!" },
        { speaker: 'mage', name: "Arch-Mage", text: "This merge pattern is how config systems work: defaults → user config → command-line overrides. Each layer overwrites the previous." }
      ]
    }
  },
  {
    id: 304,
    tier: "Data Structures",
    title: "The Rune Circle",
    name: "Sets & Set Theory",
    logbook: '"Sets are unordered collections of unique elements. They sound simple, but they solve an entire category of problems that lists solve badly: membership testing, deduplication, and mathematical operations."',
    code: "a = {1, 2, 3, 4, 5}\nb = {4, 5, 6, 7, 8}\n\nprint(f'Union:        {a | b}')\nprint(f'Intersection: {a & b}')\nprint(f'Difference:   {a - b}')\nprint(f'Symmetric:    {a ^ b}')\n\n# Deduplication\nnames = ['Alice', 'Bob', 'Alice', 'Charlie', 'Bob']\nunique = list(set(names))\nprint(f'Unique: {unique}')\n\n# Membership: set O(1) vs list O(n)\nimport time\nbig_list = list(range(1_000_000))\nbig_set = set(big_list)\n\nstart = time.time()\n999_999 in big_list\nlist_time = time.time() - start\n\nstart = time.time()\n999_999 in big_set\nset_time = time.time() - start\n\nprint(f'List lookup: {list_time:.6f}s')\nprint(f'Set lookup:  {set_time:.6f}s')",
    predictions: ["Set operations work, set lookup is faster", "Sets preserve insertion order", "The spell shatters (Crash)"],
    discovery: {
      title: "Core DS: Set Operations",
      texts: [
        "Set membership (`in`) is O(1) like dicts. List membership is O(n). For large collections, sets can be 1000x faster.",
        "`|` union, `&` intersection, `-` difference, `^` symmetric difference. These are the same operations from math class — and they solve real problems like 'find common users' or 'find missing items'.",
        "`set()` instantly deduplicates any iterable. But WARNING: sets are unordered, so the original order is lost."
      ],
      trial: "Try `frozenset({1,2,3})` — an immutable set that CAN be a dict key or a member of another set."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'a', label: '🔵 A = {1,2,3,4,5}', type: 'object', color: 'blue' },
          { id: 'b', label: '🔴 B = {4,5,6,7,8}', type: 'object', color: 'red' },
        ],
        links: [
          { from: 'a', to: 'b', label: 'Overlap: {4,5}' },
        ],
        caption: "Two sets with overlapping elements."
      },
      after: {
        entities: [
          { id: 'union', label: '🟢 A|B = {1..8}', type: 'player', color: 'green' },
          { id: 'inter', label: '🟡 A&B = {4,5}', type: 'player', color: 'yellow' },
          { id: 'diff', label: '🔵 A-B = {1,2,3}', type: 'player', color: 'blue' },
        ],
        links: [],
        caption: "Union combines, intersection finds common, difference finds exclusive."
      },
      hint: "Toggle to see set operation results."
    },
    dialogues: {
      intro: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "I just use lists for everything. Why do I need sets?" },
        { speaker: 'mage', name: "Arch-Mage", text: "Because checking 'is X in my collection?' with a list scans every element. With a set, it's instant." }
      ],
      predicting: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "The speed difference between list and set lookup should be massive for a million elements." },
        { speaker: 'mage', name: "Arch-Mage", text: "Let the benchmark speak." }
      ],
      revealed: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "The set lookup was practically instant! The list took forever!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Whenever you need to check 'is this in my collection?' more than once, convert to a set first. This optimization alone solves dozens of LeetCode problems." }
      ]
    }
  },
  {
    id: 305,
    tier: "Data Structures",
    title: "The Thread of Words",
    name: "Strings as Sequences",
    logbook: '"Strings are immutable sequences. Every + creates a new string. In a loop, this is catastrophically slow. The .join() method exists to save you."',
    code: "# Strings are sequences — indexing and slicing work\nword = 'PYTHON'\nprint(f'Reversed: {word[::-1]}')\nprint(f'Every 2nd: {word[::2]}')\n\n# The WRONG way to build a string\nimport time\nstart = time.time()\nresult = ''\nfor i in range(50_000):\n    result += str(i) + ','\nwrong_time = time.time() - start\n\n# The RIGHT way\nstart = time.time()\nresult = ','.join(str(i) for i in range(50_000))\nright_time = time.time() - start\n\nprint(f'+= loop:  {wrong_time:.4f}s')\nprint(f'.join():  {right_time:.4f}s')\nprint(f'Speedup:  {wrong_time/right_time:.1f}x')\n\n# f-strings vs .format()\nname, level = 'Alice', 42\nprint(f'{name} is level {level:03d}')",
    predictions: [".join() is much faster than +=", "Both methods are the same speed", "The spell shatters (Crash)"],
    discovery: {
      title: "Core DS: String Performance",
      texts: [
        "Strings are IMMUTABLE. Every `+=` creates a completely new string object and copies all the old data. In a loop of 50,000 iterations, that's 50,000 copies — O(n²).",
        "`.join()` allocates the final string ONCE and fills it in one pass — O(n). This is 10-100x faster for large strings.",
        "f-strings (`f'{name}'`) are the fastest string formatting method. They're compiled, not interpreted like `.format()` or `%`."
      ],
      trial: "Try `f'{3.14159:.2f}'` for 2 decimal places, or `f'{42:08b}'` for binary representation with leading zeros."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'loop', label: '🔄 += in loop', type: 'object', color: 'red', value: 'O(n²)' },
          { id: 's1', label: 'Copy 1', type: 'object', color: 'red', value: '"0,"' },
          { id: 's2', label: 'Copy 2', type: 'object', color: 'red', value: '"0,1,"' },
          { id: 's3', label: 'Copy 3', type: 'object', color: 'red', value: '"0,1,2,"' },
        ],
        links: [
          { from: 'loop', to: 's1', label: 'New string' },
          { from: 'loop', to: 's2', label: 'New string' },
          { from: 'loop', to: 's3', label: 'New string' },
        ],
        caption: "Each += creates a brand new string, copying everything. 50,000 copies!"
      },
      after: {
        entities: [
          { id: 'join', label: '⚡ .join()', type: 'player', color: 'green', value: 'O(n)' },
          { id: 'final', label: '📜 Final string', type: 'object', color: 'green', value: 'One allocation' },
        ],
        links: [
          { from: 'join', to: 'final', label: 'Single pass →' },
        ],
        caption: ".join() computes total size first, allocates once, fills in one pass."
      },
      hint: "Toggle to see why .join() is dramatically faster."
    },
    dialogues: {
      intro: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "I always build strings with += in a loop. Is that bad?" },
        { speaker: 'mage', name: "Arch-Mage", text: "In a loop of 10 items? Fine. In a loop of 10,000? You'll feel the pain." }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: ".join() should be faster because it avoids creating intermediate strings..." },
        { speaker: 'mage', name: "Arch-Mage", text: "Measure it." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "The speedup is massive! I'll never use += in a loop again." },
        { speaker: 'mage', name: "Arch-Mage", text: "This is the first performance optimization every Python developer should learn. .join() for strings, list comprehensions for lists." }
      ]
    }
  },
  // ═══════════════════════════════════════════════════════════════
  // DATA STRUCTURES MASTERY — TIER 2: COLLECTIONS ARMORY (306-310)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 306,
    tier: "Data Structures",
    title: "The Auto-Filling Grimoire",
    name: "defaultdict",
    logbook: '"Every time you build a dict of lists, you write `if key not in d: d[key] = []`. defaultdict eliminates this boilerplate by auto-creating missing keys."',
    code: "from collections import defaultdict\n\n# Group words by first letter\nwords = ['apple', 'banana', 'avocado', 'cherry', 'blueberry', 'apricot']\n\n# Old way (verbose)\nmanual = {}\nfor w in words:\n    letter = w[0]\n    if letter not in manual:\n        manual[letter] = []\n    manual[letter].append(w)\n\n# New way (defaultdict)\nauto = defaultdict(list)\nfor w in words:\n    auto[w[0]].append(w)\n\nprint(f'Manual: {dict(manual)}')\nprint(f'Auto:   {dict(auto)}')\nprint(f'Same? {dict(manual) == dict(auto)}')\n\n# defaultdict with int (counting)\ncounts = defaultdict(int)\nfor w in words:\n    counts[w[0]] += 1\nprint(f'Counts: {dict(counts)}')",
    predictions: ["Both produce the same result", "defaultdict crashes on missing keys", "The spell shatters (Crash)"],
    discovery: {
      title: "Collections: defaultdict",
      texts: [
        "`defaultdict(list)` auto-creates an empty list when you access a missing key. No more `if key not in d` checks.",
        "`defaultdict(int)` auto-creates 0 for missing keys — perfect for counting. `defaultdict(set)` creates empty sets.",
        "The argument to defaultdict is a FACTORY FUNCTION (callable), not a value. `list`, `int`, `set` are all valid factories."
      ],
      trial: "Build an adjacency list for a graph: `graph = defaultdict(list)` then `graph['A'].append('B')` and `graph['B'].append('A')`."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'old', label: '📝 Manual dict', type: 'object', color: 'red', value: '4 lines per group' },
          { id: 'check', label: '❓ if key not in d:', type: 'object', color: 'yellow', value: 'Boilerplate' },
        ],
        links: [
          { from: 'old', to: 'check', label: 'Required check' },
        ],
        caption: "Without defaultdict, you need an if-check before every append."
      },
      after: {
        entities: [
          { id: 'dd', label: '✨ defaultdict(list)', type: 'player', color: 'green', value: '1 line' },
        ],
        links: [],
        caption: "defaultdict auto-creates the list. Just append directly."
      },
      hint: "Toggle to see the boilerplate elimination."
    },
    dialogues: {
      intro: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "I keep writing 'if key not in dict' everywhere. There must be a better way." },
        { speaker: 'mage', name: "Arch-Mage", text: "There is. defaultdict does the check FOR you, automatically." }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "So accessing a missing key doesn't crash — it creates a default value and returns it?" },
        { speaker: 'mage', name: "Arch-Mage", text: "Precisely." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "Both methods produce identical results! But defaultdict is half the code!" },
        { speaker: 'mage', name: "Arch-Mage", text: "defaultdict(list) for grouping, defaultdict(int) for counting, defaultdict(set) for unique membership. These three patterns solve 80% of dict-building tasks." }
      ]
    }
  },
  {
    id: 307,
    tier: "Data Structures",
    title: "The Frequency Crystal",
    name: "Counter",
    logbook: '"Counting occurrences is the most common operation in data processing. Counter does it in ONE line and adds mathematical operations on top."',
    code: "from collections import Counter\n\n# Count anything iterable\ntext = 'abracadabra'\nletters = Counter(text)\nprint(f'Letters: {letters}')\nprint(f'Most common: {letters.most_common(3)}')\n\n# Counter arithmetic\nteam_a = Counter({'warrior': 3, 'mage': 2, 'healer': 1})\nteam_b = Counter({'warrior': 1, 'mage': 4, 'archer': 2})\n\nprint(f'Combined:  {team_a + team_b}')\nprint(f'Remaining: {team_a - team_b}')\nprint(f'Common:    {team_a & team_b}')\n\n# Count words in a sentence\nwords = 'the cat sat on the mat the cat'.split()\nword_freq = Counter(words)\nprint(f'Words: {word_freq}')",
    predictions: ["All operations work, most_common returns sorted pairs", "Counter only works with strings", "The spell shatters (Crash)"],
    discovery: {
      title: "Collections: Counter",
      texts: [
        "`Counter` takes any iterable and counts occurrences. `.most_common(n)` returns the top-n as sorted (element, count) pairs.",
        "Counter supports ARITHMETIC: `+` merges counts, `-` subtracts (dropping zeros), `&` finds minimums (intersection), `|` finds maximums (union).",
        "Under the hood, Counter is just a dict subclass. So all dict methods work: `.get()`, `.items()`, iteration, etc."
      ],
      trial: "Try `Counter('mississippi').most_common()` — it sorts ALL elements by frequency. This is the one-liner behind word cloud generators."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'text', label: '📝 abracadabra', type: 'object', color: 'blue' },
          { id: 'counter', label: '🔢 Counter()', type: 'player', color: 'green' },
        ],
        links: [
          { from: 'text', to: 'counter', label: 'Count →' },
        ],
        caption: "Counter scans the iterable and counts every element."
      },
      after: {
        entities: [
          { id: 'a', label: '⚔️ Team A', type: 'object', color: 'blue', value: 'w:3 m:2 h:1' },
          { id: 'b', label: '⚔️ Team B', type: 'object', color: 'red', value: 'w:1 m:4 a:2' },
          { id: 'add', label: '➕ A+B', type: 'player', color: 'green', value: 'w:4 m:6 h:1 a:2' },
        ],
        links: [
          { from: 'a', to: 'add', label: 'Merge' },
          { from: 'b', to: 'add', label: 'Merge' },
        ],
        caption: "Counter arithmetic: + merges, - subtracts, & finds minimums."
      },
      hint: "Toggle to see Counter arithmetic."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "How many lines of code do you need to count character frequencies?" },
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "A loop, a dict, an if-check..." }
      ],
      predicting: [
        { speaker: 'mage', name: "Arch-Mage", text: "With Counter, it's one line. But can you SUBTRACT one Counter from another?" },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "That would give us the difference in counts!" }
      ],
      revealed: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "Counter arithmetic! You can add, subtract, and intersect frequency counts!" },
        { speaker: 'mage', name: "Arch-Mage", text: "This is the backbone of inventory systems, analytics pipelines, and natural language processing. One import, infinite power." }
      ]
    }
  },
  {
    id: 308,
    tier: "Data Structures",
    title: "The Named Rune",
    name: "namedtuple",
    logbook: '"Tuples are fast but accessing by index is unreadable. Dicts are readable but slow. namedtuple gives you both: name-based access with tuple performance."',
    code: "from collections import namedtuple\n\n# Define a lightweight 'class'\nPoint = namedtuple('Point', ['x', 'y'])\nPlayer = namedtuple('Player', 'name hp mp')\n\np = Point(10, 20)\nhero = Player('Alice', 100, 50)\n\n# Access by name AND index\nprint(f'Point: x={p.x}, y={p.y}')\nprint(f'Also:  x={p[0]}, y={p[1]}')\nprint(f'Hero:  {hero.name} has {hero.hp} HP')\n\n# Immutable like regular tuples\ntry:\n    hero.hp = 200\nexcept AttributeError as e:\n    print(f'Cannot mutate: {e}')\n\n# Convert to dict\nprint(f'As dict: {hero._asdict()}')\n\n# Unpack like a tuple\nname, hp, mp = hero\nprint(f'Unpacked: {name}, {hp}, {mp}')",
    predictions: ["Named access works, mutation crashes", "namedtuple is mutable", "The spell shatters (Crash)"],
    discovery: {
      title: "Collections: namedtuple",
      texts: [
        "namedtuple creates a lightweight, immutable class with named fields. It's a tuple with labels — no more magic index numbers.",
        "It's immutable (like tuples) and supports indexing, unpacking, AND named access. Best of both worlds.",
        "Use namedtuple for simple data records (coordinates, DB rows, API responses). Use dataclasses when you need mutability or methods."
      ],
      trial: "Try `Point._make([30, 40])` to create from a list, and `p._replace(x=99)` to create a modified copy (since it's immutable, _replace returns a NEW namedtuple)."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'tuple', label: '📜 (10, 20)', type: 'object', color: 'blue', value: 'Index only' },
          { id: 'dict', label: '📋 {x:10, y:20}', type: 'object', color: 'yellow', value: 'Named, mutable' },
        ],
        links: [],
        caption: "Tuples: fast but unreadable. Dicts: readable but mutable."
      },
      after: {
        entities: [
          { id: 'nt', label: '✨ Point(x=10, y=20)', type: 'player', color: 'green', value: 'Named + Immutable + Fast' },
        ],
        links: [],
        caption: "namedtuple: readable like a dict, immutable and fast like a tuple."
      },
      hint: "Toggle to see the best-of-both-worlds."
    },
    dialogues: {
      intro: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "I have a tuple `(10, 20)` but I keep forgetting which is x and which is y." },
        { speaker: 'mage', name: "Arch-Mage", text: "namedtuple solves this. Name your fields, keep the performance." }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "If it's a tuple, it should be immutable... can we change hero.hp?" },
        { speaker: 'mage', name: "Arch-Mage", text: "Try it." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "AttributeError! It's truly immutable! And _asdict() converts it to a regular dict!" },
        { speaker: 'mage', name: "Arch-Mage", text: "namedtuple is the precursor to dataclasses. Use it for simple records where immutability is desired — API responses, config values, coordinates." }
      ]
    }
  },
  {
    id: 309,
    tier: "Data Structures",
    title: "The Double Gate",
    name: "deque (Double-Ended Queue)",
    logbook: '"Lists are great stacks but terrible queues — .pop(0) is O(n) because it shifts every element. deque is O(1) from BOTH ends."',
    code: "from collections import deque\n\n# deque: fast append/pop from both ends\ndq = deque(['B', 'C', 'D'])\ndq.appendleft('A')   # O(1)\ndq.append('E')       # O(1)\nprint(f'Deque: {list(dq)}')\n\nleft = dq.popleft()  # O(1)\nright = dq.pop()     # O(1)\nprint(f'Popped: left={left}, right={right}')\nprint(f'Remaining: {list(dq)}')\n\n# Rotating\ndq = deque([1, 2, 3, 4, 5])\ndq.rotate(2)   # Move 2 from right to left\nprint(f'Rotated right 2: {list(dq)}')\ndq.rotate(-2)  # Move 2 from left to right\nprint(f'Rotated back: {list(dq)}')\n\n# Bounded deque (sliding window!)\nrecent = deque(maxlen=3)\nfor i in range(5):\n    recent.append(i)\n    print(f'  Added {i}: {list(recent)}')",
    predictions: ["O(1) from both ends, bounded deque auto-drops old items", "deque is the same speed as list", "The spell shatters (Crash)"],
    discovery: {
      title: "Collections: deque",
      texts: [
        "list.pop(0) is O(n) — it shifts every element left. deque.popleft() is O(1). For queues, deque is the ONLY correct choice.",
        "`deque(maxlen=n)` creates a bounded buffer. When full, adding to one end automatically drops from the other. Perfect for 'last N items' caches.",
        "`.rotate(n)` shifts elements circularly. Positive rotates right, negative rotates left. Useful for round-robin scheduling and circular buffers."
      ],
      trial: "Build a BFS with deque: `queue = deque([start_node])`, `node = queue.popleft()`, `queue.append(neighbor)`. This is the standard BFS pattern."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'list', label: '📋 list.pop(0)', type: 'object', color: 'red', value: 'O(n) — shifts all' },
          { id: 'deque', label: '🚪 deque.popleft()', type: 'player', color: 'green', value: 'O(1) — direct' },
        ],
        links: [],
        caption: "list.pop(0) must shift N elements. deque.popleft() is instant."
      },
      after: {
        entities: [
          { id: 'bounded', label: '📦 deque(maxlen=3)', type: 'player', color: 'green', value: 'Auto-drops old' },
          { id: 'items', label: '📜 [2, 3, 4]', type: 'object', color: 'blue', value: 'Last 3 items only' },
        ],
        links: [
          { from: 'bounded', to: 'items', label: 'Sliding window →' },
        ],
        caption: "Bounded deque keeps only the most recent N items automatically."
      },
      hint: "Toggle to see bounded deque behavior."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "You've been using lists as queues. But list.pop(0) is secretly O(n). Every element must shift." },
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "So for BFS and task queues, I should use deque instead?" }
      ],
      predicting: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "The bounded deque with maxlen — when it's full, does adding a new element crash or drop the oldest?" },
        { speaker: 'mage', name: "Arch-Mage", text: "Observe." }
      ],
      revealed: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "It drops the oldest automatically! That's a perfect sliding window!" },
        { speaker: 'mage', name: "Arch-Mage", text: "deque(maxlen=n) is how you implement rate limiters, recent-history buffers, and moving averages with zero extra code." }
      ]
    }
  },
  {
    id: 310,
    tier: "Data Structures",
    title: "The Layered Map",
    name: "ChainMap",
    logbook: '"Python itself uses layered lookups: local scope → enclosing → global → builtin. ChainMap lets YOU build the same pattern — layered dicts where the first match wins."',
    code: "from collections import ChainMap\n\n# Config layers: defaults -> user -> env overrides\ndefaults = {'theme': 'dark', 'lang': 'en', 'debug': False}\nuser_config = {'theme': 'light', 'font_size': 14}\nenv_overrides = {'debug': True}\n\nconfig = ChainMap(env_overrides, user_config, defaults)\n\nprint(f'theme:     {config[\"theme\"]}')      # light (user)\nprint(f'lang:      {config[\"lang\"]}')       # en (default)\nprint(f'debug:     {config[\"debug\"]}')      # True (env)\nprint(f'font_size: {config[\"font_size\"]}')  # 14 (user)\n\n# New values only affect the first dict\nconfig['new_key'] = 'added'\nprint(f'\\nenv_overrides: {env_overrides}')\nprint(f'defaults unchanged: {defaults}')\n\n# Show the lookup order\nprint(f'\\nAll keys: {list(config)}')",
    predictions: ["First dict in chain wins, writes go to first dict only", "ChainMap merges all dicts into one", "The spell shatters (Crash)"],
    discovery: {
      title: "Collections: ChainMap",
      texts: [
        "ChainMap layers dicts in priority order. Lookups search left-to-right, returning the FIRST match. It does NOT merge — the original dicts stay separate.",
        "Writes and deletes only affect the FIRST dict in the chain. The underlying dicts are never modified.",
        "This is exactly how Python's scope resolution works: local vars → enclosing → global → builtins. ChainMap literally powers Python's variable lookup."
      ],
      trial: "Try `config.maps` to see the list of underlying dicts, and `config.new_child({'temp': True})` to push a new layer without modifying the existing chain."
    },
    sandbox: {
      before: {
        entities: [
          { id: 'env', label: '🔴 env_overrides', type: 'object', color: 'red', value: 'Highest priority' },
          { id: 'user', label: '🟡 user_config', type: 'object', color: 'yellow', value: 'Medium priority' },
          { id: 'def', label: '🔵 defaults', type: 'object', color: 'blue', value: 'Lowest priority' },
        ],
        links: [
          { from: 'env', to: 'user', label: 'Falls through →' },
          { from: 'user', to: 'def', label: 'Falls through →' },
        ],
        caption: "ChainMap searches left-to-right. First match wins."
      },
      after: {
        entities: [
          { id: 'theme', label: '🎨 theme=light', type: 'player', color: 'yellow', value: 'Found in user' },
          { id: 'debug', label: '🐛 debug=True', type: 'player', color: 'red', value: 'Found in env' },
          { id: 'lang', label: '🌍 lang=en', type: 'player', color: 'blue', value: 'Found in defaults' },
        ],
        links: [],
        caption: "Each key is found in the highest-priority layer that contains it."
      },
      hint: "Toggle to see which layer each key comes from."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "When Python looks up a variable, it checks local scope first, then enclosing, then global, then builtins. ChainMap is that same pattern, available to you." },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "So it's like CSS specificity? Local overrides global?" }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "If debug is in env_overrides AND defaults, the env one should win because it's first in the chain." },
        { speaker: 'mage', name: "Arch-Mage", text: "Correct theory. Verify it." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "The env override won! And writes only touched the first dict!" },
        { speaker: 'mage', name: "Arch-Mage", text: "ChainMap is how Django handles settings, how CLI tools merge config files with command-line flags, and how templating engines resolve variables." }
      ]
    }
  },
  // ═══════════════════════════════════════════════════════════════
  // DATA STRUCTURES MASTERY — TIER 3: INTERVIEW CRUSHERS (311-317)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 311,
    tier: "Data Structures",
    title: "The Last In Gate",
    name: "Stack (LIFO with list)",
    logbook: '"A stack is the simplest data structure: Last In, First Out. But it powers undo systems, call stacks, and the most famous interview problem of all — bracket matching."',
    code: "# Stack: LIFO (Last In, First Out)\nstack = []\nstack.append('A')  # push\nstack.append('B')\nstack.append('C')\nprint(f'Stack: {stack}')\nprint(f'Pop: {stack.pop()}')\nprint(f'Pop: {stack.pop()}')\nprint(f'Remaining: {stack}')\n\n# CLASSIC: Bracket Matching\ndef is_balanced(expr):\n    pairs = {')': '(', ']': '[', '}': '{'}\n    stack = []\n    for char in expr:\n        if char in '([{':\n            stack.append(char)\n        elif char in pairs:\n            if not stack or stack[-1] != pairs[char]:\n                return False\n            stack.pop()\n    return len(stack) == 0\n\nprint(f'\"(())\": {is_balanced(\"(())\")}')  \nprint(f'\"([)]\": {is_balanced(\"([)]\")}')  \nprint(f'\"{{}}\": {is_balanced(\"{{}}\")}')",
    predictions: ["LIFO works, bracket matching detects mismatches", "Bracket matching only works for parentheses", "The spell shatters (Crash)"],
    discovery: {
      title: "DS Pattern: Stack",
      texts: [
        "A stack is just a list using only .append() and .pop(). Both are O(1). The key insight: the LAST thing you added is the FIRST thing you check.",
        "Bracket matching is the quintessential stack problem. When you see '(', push. When you see ')', pop and check if it matches. If the stack is empty at the end, it's balanced.",
        "Python's own call stack IS a stack. Every function call pushes a frame, every return pops one. Recursion depth = stack height."
      ],
      trial: "Add a function to reverse a string using only a stack: push every character, then pop them all into a new string."
    },
    sandbox: {
      before: { entities: [
        { id: 's', label: '📚 Stack', type: 'object', color: 'blue' },
        { id: 'a', label: 'A', type: 'object', color: 'green', value: 'bottom' },
        { id: 'b', label: 'B', type: 'object', color: 'yellow', value: 'middle' },
        { id: 'c', label: 'C', type: 'player', color: 'red', value: 'top → pops first' },
      ], links: [], caption: "LIFO: C was added last, so it pops first." },
      after: { entities: [
        { id: 'bracket', label: '🔍 Bracket Matcher', type: 'player', color: 'green' },
        { id: 'push', label: 'Push ( [ {', type: 'object', color: 'blue', value: 'Opening' },
        { id: 'pop', label: 'Pop & Match', type: 'object', color: 'yellow', value: 'Closing' },
      ], links: [
        { from: 'push', to: 'bracket', label: 'Open: push' },
        { from: 'pop', to: 'bracket', label: 'Close: pop & check' },
      ], caption: "Push on open bracket, pop on close bracket, verify match." },
      hint: "Toggle to see bracket matching."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "The stack is the most fundamental data structure in computing. Your browser's back button? A stack." },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "And bracket matching — that's the first thing interviewers ask!" }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "([)] should fail because the brackets are interleaved, not nested." },
        { speaker: 'mage', name: "Arch-Mage", text: "Verify." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "The stack catches interleaved brackets! When we see ], the top of stack is ( not [." },
        { speaker: 'mage', name: "Arch-Mage", text: "This pattern shows up everywhere: HTML tag matching, expression parsing, undo/redo systems, and DFS traversal." }
      ]
    }
  },
  {
    id: 312,
    tier: "Data Structures",
    title: "The First In Gate",
    name: "Queue & BFS",
    logbook: '"A queue is First In, First Out — like a line at a shop. Combined with graphs, it becomes BFS: the shortest-path algorithm every developer needs."',
    code: "from collections import deque\n\n# Queue: FIFO (First In, First Out)\nqueue = deque()\nqueue.append('A')  # enqueue\nqueue.append('B')\nqueue.append('C')\nprint(f'Queue: {list(queue)}')\nprint(f'Serve: {queue.popleft()}')\nprint(f'Serve: {queue.popleft()}')\nprint(f'Remaining: {list(queue)}')\n\n# BFS: Shortest path in a graph\ngraph = {\n    'A': ['B', 'C'],\n    'B': ['D', 'E'],\n    'C': ['F'],\n    'D': [], 'E': [], 'F': []\n}\n\ndef bfs(graph, start):\n    visited = set()\n    queue = deque([start])\n    order = []\n    while queue:\n        node = queue.popleft()\n        if node not in visited:\n            visited.add(node)\n            order.append(node)\n            queue.extend(graph[node])\n    return order\n\nprint(f'BFS order: {bfs(graph, \"A\")}')",
    predictions: ["FIFO queue works, BFS visits level by level", "BFS uses a stack, not a queue", "The spell shatters (Crash)"],
    discovery: {
      title: "DS Pattern: Queue & BFS",
      texts: [
        "Use `deque` for queues — `.append()` to enqueue, `.popleft()` to dequeue. Both O(1). Never use `list.pop(0)` — it's O(n).",
        "BFS explores a graph LEVEL BY LEVEL. It finds the shortest path in unweighted graphs. The queue ensures we visit all nodes at distance 1 before distance 2, etc.",
        "BFS pattern: deque([start]) → popleft → process → append neighbors → repeat. This 5-line pattern solves path-finding, web crawling, and social network analysis."
      ],
      trial: "Modify the BFS to track the level (distance from start) of each node. Hint: process one full level at a time using len(queue)."
    },
    sandbox: {
      before: { entities: [
        { id: 'q', label: '🚶 Queue', type: 'object', color: 'blue' },
        { id: 'a', label: 'A', type: 'player', color: 'green', value: 'front → serves first' },
        { id: 'b', label: 'B', type: 'object', color: 'yellow', value: 'middle' },
        { id: 'c', label: 'C', type: 'object', color: 'red', value: 'back' },
      ], links: [], caption: "FIFO: A was added first, so it's served first." },
      after: { entities: [
        { id: 'start', label: '🅰️ A', type: 'player', color: 'green', value: 'Level 0' },
        { id: 'bc', label: '🅱️ B, C', type: 'object', color: 'yellow', value: 'Level 1' },
        { id: 'def', label: '📌 D, E, F', type: 'object', color: 'blue', value: 'Level 2' },
      ], links: [
        { from: 'start', to: 'bc', label: 'Visit all L0 →' },
        { from: 'bc', to: 'def', label: 'Then all L1 →' },
      ], caption: "BFS visits all nodes at distance 1 before distance 2." },
      hint: "Toggle to see BFS level-order traversal."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "Stack goes deep (DFS). Queue goes wide (BFS). Which finds the shortest path?" },
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "BFS — because it explores all neighbors before going deeper!" }
      ],
      predicting: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "BFS should visit A first, then B and C (level 1), then D, E, F (level 2)." },
        { speaker: 'mage', name: "Arch-Mage", text: "Let's see." }
      ],
      revealed: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "A, B, C, D, E, F — perfect level-order! The queue ensures breadth-first!" },
        { speaker: 'mage', name: "Arch-Mage", text: "BFS is the foundation of Google Maps, social network 'friends of friends', and chess engine move exploration. Master the deque-based BFS pattern." }
      ]
    }
  },
  {
    id: 313,
    tier: "Data Structures",
    title: "The Priority Crystal",
    name: "heapq (Priority Queue)",
    logbook: '"Sometimes you need the smallest (or largest) element among millions, and you need it FAST. A heap gives you O(log n) insertion and O(1) access to the minimum."',
    code: "import heapq\n\n# heapq: min-heap\nnums = [5, 3, 8, 1, 9, 2, 7]\nheapq.heapify(nums)  # O(n) — rearranges in-place\nprint(f'Heap: {nums}')\nprint(f'Smallest: {nums[0]}')  # O(1) peek\n\n# Pop smallest items\nprint(f'Pop: {heapq.heappop(nums)}')  # O(log n)\nprint(f'Pop: {heapq.heappop(nums)}')\n\n# Push new item\nheapq.heappush(nums, 0)  # O(log n)\nprint(f'After push 0: {nums}')\n\n# Top-3 largest and smallest\ndata = [15, 3, 22, 8, 41, 7, 19]\nprint(f'3 largest:  {heapq.nlargest(3, data)}')\nprint(f'3 smallest: {heapq.nsmallest(3, data)}')\n\n# Priority queue with tuples (priority, item)\ntasks = []\nheapq.heappush(tasks, (3, 'low priority'))\nheapq.heappush(tasks, (1, 'urgent'))\nheapq.heappush(tasks, (2, 'medium'))\nwhile tasks:\n    priority, task = heapq.heappop(tasks)\n    print(f'  [{priority}] {task}')",
    predictions: ["Heap maintains min at top, priority queue works with tuples", "heapq sorts the entire list", "The spell shatters (Crash)"],
    discovery: {
      title: "DS Pattern: heapq",
      texts: [
        "A heap is NOT fully sorted — it only guarantees the SMALLEST element is at index 0. This partial ordering is cheaper to maintain than full sorting.",
        "`heapify()` is O(n), `heappush/heappop` are O(log n), peeking at `[0]` is O(1). For 'always give me the smallest', heaps beat sorted lists.",
        "For a MAX-heap, negate the values: push `-x`, pop and negate back. Python only has min-heaps natively."
      ],
      trial: "Solve 'merge K sorted lists': use `heapq.merge(*lists)` — it lazily merges sorted iterables without loading everything into memory."
    },
    sandbox: {
      before: { entities: [
        { id: 'arr', label: '📋 [5,3,8,1,9,2,7]', type: 'object', color: 'blue', value: 'Unsorted' },
        { id: 'heap', label: '🏔️ heapify()', type: 'player', color: 'green', value: 'O(n)' },
      ], links: [
        { from: 'arr', to: 'heap', label: 'Rearrange →' },
      ], caption: "heapify transforms an array into a heap in O(n)." },
      after: { entities: [
        { id: 'min', label: '⬆️ [0] = smallest', type: 'player', color: 'green', value: 'O(1) peek' },
        { id: 'push', label: '📥 heappush', type: 'object', color: 'blue', value: 'O(log n)' },
        { id: 'pop', label: '📤 heappop', type: 'object', color: 'yellow', value: 'O(log n)' },
      ], links: [], caption: "Peek at min: O(1). Push/Pop: O(log n). Sorted list can't compete." },
      hint: "Toggle to see heap operations."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "You have a million tasks. You always need the highest-priority one. Sorting is O(n log n) every time. A heap gives it in O(1)." },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "That's way better! But the list doesn't look fully sorted..." }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "The smallest should always be at index 0, but the rest can be in any order." },
        { speaker: 'mage', name: "Arch-Mage", text: "Correct. Verify." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "And tuples as elements give us a priority queue! The first element of the tuple is the priority!" },
        { speaker: 'mage', name: "Arch-Mage", text: "heapq solves top-K problems, median-finding, task scheduling, and Dijkstra's algorithm. It's the most underused tool in Python." }
      ]
    }
  },
  {
    id: 314,
    tier: "Data Structures",
    title: "The Forge of Keys",
    name: "Hash Table (Build from Scratch)",
    logbook: '"You use dicts every day, but can you BUILD one? Understanding hash tables from scratch is what separates developers who use tools from those who can create them."',
    code: "class SimpleHashTable:\n    def __init__(self, size=10):\n        self.size = size\n        self.table = [[] for _ in range(size)]  # Chaining\n    \n    def _hash(self, key):\n        return hash(key) % self.size\n    \n    def set(self, key, value):\n        idx = self._hash(key)\n        # Update if key exists\n        for i, (k, v) in enumerate(self.table[idx]):\n            if k == key:\n                self.table[idx][i] = (key, value)\n                return\n        self.table[idx].append((key, value))\n    \n    def get(self, key):\n        idx = self._hash(key)\n        for k, v in self.table[idx]:\n            if k == key:\n                return v\n        raise KeyError(key)\n\nht = SimpleHashTable()\nht.set('name', 'Alice')\nht.set('hp', 100)\nht.set('class', 'Mage')\n\nprint(f'name: {ht.get(\"name\")}')\nprint(f'hp: {ht.get(\"hp\")}')\n\n# Show internal structure\nfor i, bucket in enumerate(ht.table):\n    if bucket:\n        print(f'Slot {i}: {bucket}')",
    predictions: ["Hash table stores and retrieves correctly", "Keys are stored in order", "The spell shatters (Crash)"],
    discovery: {
      title: "DS Pattern: Hash Table",
      texts: [
        "A hash table has 3 parts: (1) hash function converts key to index, (2) array of slots, (3) collision handling (chaining = list per slot).",
        "Collisions happen when two keys hash to the same slot. Chaining stores both as a list. Open addressing probes for the next empty slot.",
        "Average lookup is O(1). Worst case (all keys collide) is O(n). Good hash functions minimize collisions. Python's dict uses open addressing with probing for performance."
      ],
      trial: "Add a `delete` method and a `__contains__` method (so `'name' in ht` works). Then try adding more items than the table size to see collisions."
    },
    sandbox: {
      before: { entities: [
        { id: 'key', label: '🔑 "name"', type: 'player', color: 'blue' },
        { id: 'hash', label: '#️⃣ hash("name") % 10', type: 'object', color: 'yellow', value: '→ slot 7' },
        { id: 'slot', label: '📦 Slot 7', type: 'object', color: 'green', value: '[("name","Alice")]' },
      ], links: [
        { from: 'key', to: 'hash', label: 'Step 1' },
        { from: 'hash', to: 'slot', label: 'Step 2' },
      ], caption: "hash(key) → slot index → store in that slot's chain." },
      after: { entities: [
        { id: 'collision', label: '💥 Collision!', type: 'object', color: 'red', value: 'Two keys → same slot' },
        { id: 'chain', label: '⛓️ Slot 3', type: 'player', color: 'yellow', value: '[("a",1), ("b",2)]' },
      ], links: [
        { from: 'collision', to: 'chain', label: 'Both stored in chain' },
      ], caption: "When two keys hash to the same slot, chaining stores both." },
      hint: "Toggle to see collision handling."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "You've used dict thousands of times. But can you build one from an empty array?" },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "Hash the key, use it as an index, handle collisions... I think I can!" }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "If two keys hash to the same slot, the chain should store both." },
        { speaker: 'mage', name: "Arch-Mage", text: "Build and verify." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "It works! And I can see exactly which slots have entries!" },
        { speaker: 'mage', name: "Arch-Mage", text: "You just built the core of Python's dict, JavaScript's Object, Java's HashMap, and Redis. One data structure powers all of them." }
      ]
    }
  },
  {
    id: 315,
    tier: "Data Structures",
    title: "The Chain of Souls",
    name: "Linked List (Build from Scratch)",
    logbook: '"Arrays store elements contiguously. Linked lists store them ANYWHERE and connect them with pointers. Building one from scratch teaches you how references really work."',
    code: "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    \n    def append(self, data):\n        new = Node(data)\n        if not self.head:\n            self.head = new\n            return\n        current = self.head\n        while current.next:\n            current = current.next\n        current.next = new\n    \n    def display(self):\n        items = []\n        current = self.head\n        while current:\n            items.append(str(current.data))\n            current = current.next\n        return ' → '.join(items) + ' → None'\n    \n    def reverse(self):\n        prev, current = None, self.head\n        while current:\n            next_node = current.next\n            current.next = prev\n            prev = current\n            current = next_node\n        self.head = prev\n\nll = LinkedList()\nfor x in ['A', 'B', 'C', 'D']:\n    ll.append(x)\nprint(f'Original: {ll.display()}')\nll.reverse()\nprint(f'Reversed: {ll.display()}')",
    predictions: ["Linked list builds and reverses correctly", "Reversing a linked list requires extra memory", "The spell shatters (Crash)"],
    discovery: {
      title: "DS Pattern: Linked List",
      texts: [
        "Each node stores data + a reference to the next node. The last node points to None. Traversal follows the chain of references.",
        "Reversing a linked list is the #1 most asked interview question. The trick: use three pointers (prev, current, next) and reverse each link in-place.",
        "Linked lists shine at O(1) insertion/deletion at known positions, but have O(n) lookup (no indexing). Lists/arrays are better for random access."
      ],
      trial: "Add a `delete(data)` method that removes the first occurrence of a value. Handle the edge case where the head itself is the target."
    },
    sandbox: {
      before: { entities: [
        { id: 'a', label: '📦 A', type: 'player', color: 'green' },
        { id: 'b', label: '📦 B', type: 'object', color: 'blue' },
        { id: 'c', label: '📦 C', type: 'object', color: 'yellow' },
        { id: 'x', label: '❌ None', type: 'object', color: 'red' },
      ], links: [
        { from: 'a', to: 'b', label: '.next' },
        { from: 'b', to: 'c', label: '.next' },
        { from: 'c', to: 'x', label: '.next' },
      ], caption: "A → B → C → None. Each node points to the next." },
      after: { entities: [
        { id: 'c2', label: '📦 C', type: 'player', color: 'yellow' },
        { id: 'b2', label: '📦 B', type: 'object', color: 'blue' },
        { id: 'a2', label: '📦 A', type: 'object', color: 'green' },
        { id: 'x2', label: '❌ None', type: 'object', color: 'red' },
      ], links: [
        { from: 'c2', to: 'b2', label: '.next' },
        { from: 'b2', to: 'a2', label: '.next' },
        { from: 'a2', to: 'x2', label: '.next' },
      ], caption: "C → B → A → None. All arrows reversed in-place." },
      hint: "Toggle to see the reversal."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "Arrays are blocks of memory. Linked lists are chains of references. Each has trade-offs." },
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "Reversing a linked list — I've heard that's the most common interview question." }
      ],
      predicting: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "The reverse should work by flipping each arrow to point backwards..." },
        { speaker: 'mage', name: "Arch-Mage", text: "Three pointers. That's all you need." }
      ],
      revealed: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "prev, current, next_node — and we flip each .next pointer! No extra memory!" },
        { speaker: 'mage', name: "Arch-Mage", text: "This in-place reversal pattern is the building block for more complex problems: palindrome detection, merge sort on linked lists, and cycle detection." }
      ]
    }
  },
  {
    id: 316,
    tier: "Data Structures",
    title: "The Branching Path",
    name: "Binary Tree & BST",
    logbook: '"Trees are hierarchical. Binary Search Trees keep things SORTED: left child < parent < right child. This rule enables O(log n) search — the same speed as binary search."',
    code: "class TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\n\nclass BST:\n    def __init__(self):\n        self.root = None\n    \n    def insert(self, val):\n        if not self.root:\n            self.root = TreeNode(val)\n            return\n        self._insert(self.root, val)\n    \n    def _insert(self, node, val):\n        if val < node.val:\n            if node.left is None:\n                node.left = TreeNode(val)\n            else:\n                self._insert(node.left, val)\n        else:\n            if node.right is None:\n                node.right = TreeNode(val)\n            else:\n                self._insert(node.right, val)\n    \n    def inorder(self, node=None, first=True):\n        if first:\n            node = self.root\n        if node is None:\n            return []\n        return self.inorder(node.left, False) + [node.val] + self.inorder(node.right, False)\n\ntree = BST()\nfor val in [5, 3, 8, 1, 4, 7, 9]:\n    tree.insert(val)\n\nprint(f'Inorder (sorted!): {tree.inorder()}')",
    predictions: ["Inorder traversal produces sorted output", "BST stores elements in insertion order", "The spell shatters (Crash)"],
    discovery: {
      title: "DS Pattern: Binary Search Tree",
      texts: [
        "BST rule: left < parent < right. Inorder traversal (left → root → right) visits nodes in SORTED order. This is how databases maintain sorted indexes.",
        "Search, insert, and delete are all O(log n) for a balanced BST. But if you insert sorted data, the tree degenerates to a linked list — O(n).",
        "Three traversal orders: Inorder (sorted), Preorder (root first, useful for serialization), Postorder (leaves first, useful for deletion)."
      ],
      trial: "Add a `search(val)` method that returns True/False. At each node, go left if val < node.val, right if val > node.val."
    },
    sandbox: {
      before: { entities: [
        { id: 'root', label: '5', type: 'player', color: 'green', value: 'Root' },
        { id: 'l', label: '3', type: 'object', color: 'blue', value: 'Left' },
        { id: 'r', label: '8', type: 'object', color: 'red', value: 'Right' },
      ], links: [
        { from: 'root', to: 'l', label: 'left (smaller)' },
        { from: 'root', to: 'r', label: 'right (larger)' },
      ], caption: "BST rule: left < root < right. Always." },
      after: { entities: [
        { id: 'sorted', label: '📊 [1,3,4,5,7,8,9]', type: 'player', color: 'green', value: 'Inorder output' },
      ], links: [], caption: "Inorder traversal produces sorted output automatically!" },
      hint: "Toggle to see inorder traversal result."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "Databases sort billions of records. They don't use arrays. They use trees." },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "Because trees can insert AND search in O(log n), while sorted arrays take O(n) to insert." }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "If inorder goes left-root-right, and left < root < right... the output should be sorted!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Mathematical deduction. Verify it." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "1, 3, 4, 5, 7, 8, 9 — perfectly sorted!" },
        { speaker: 'mage', name: "Arch-Mage", text: "BSTs power database indexes, file systems, and search engines. The inorder properties makes them a natural 'always-sorted' container." }
      ]
    }
  },
  {
    id: 317,
    tier: "Data Structures",
    title: "The Web of Connections",
    name: "Graphs (Adjacency List)",
    logbook: '"Social networks, maps, web links, dependencies — they are all graphs. A graph is just nodes + edges. And in Python, a dict of lists IS a graph."',
    code: "from collections import defaultdict, deque\n\n# Build a graph (adjacency list = dict of lists)\ngraph = defaultdict(list)\nedges = [('A','B'), ('A','C'), ('B','D'), ('C','D'), ('D','E'), ('B','E')]\nfor u, v in edges:\n    graph[u].append(v)\n    graph[v].append(u)  # undirected\n\nprint('Graph:', dict(graph))\n\n# DFS (uses stack/recursion)\ndef dfs(graph, start, visited=None):\n    if visited is None:\n        visited = set()\n    visited.add(start)\n    path = [start]\n    for neighbor in graph[start]:\n        if neighbor not in visited:\n            path.extend(dfs(graph, neighbor, visited))\n    return path\n\n# BFS (uses queue) — finds shortest path\ndef bfs_path(graph, start, end):\n    queue = deque([(start, [start])])\n    visited = {start}\n    while queue:\n        node, path = queue.popleft()\n        if node == end:\n            return path\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append((neighbor, path + [neighbor]))\n    return None\n\nprint(f'DFS from A: {dfs(graph, \"A\")}')\nprint(f'Shortest A→E: {bfs_path(graph, \"A\", \"E\")}')",
    predictions: ["DFS goes deep, BFS finds shortest path", "DFS and BFS produce the same path", "The spell shatters (Crash)"],
    discovery: {
      title: "DS Pattern: Graphs",
      texts: [
        "A graph's adjacency list is just a `defaultdict(list)`. Each key is a node, each value is a list of neighbors. Simple, powerful, and the standard representation.",
        "DFS (stack/recursion) goes DEEP before backtracking. BFS (queue) goes WIDE level by level. BFS finds shortest paths in unweighted graphs.",
        "Graph problems are the most common category in technical interviews: shortest path, connected components, cycle detection, topological sort."
      ],
      trial: "Add a `has_cycle()` function. Hint: if during DFS you visit a node that's already in the current path (not just visited), there's a cycle."
    },
    sandbox: {
      before: { entities: [
        { id: 'a', label: '🅰️ A', type: 'player', color: 'green' },
        { id: 'b', label: '🅱️ B', type: 'object', color: 'blue' },
        { id: 'c', label: '©️ C', type: 'object', color: 'yellow' },
        { id: 'd', label: '📌 D', type: 'object', color: 'red' },
        { id: 'e', label: '📍 E', type: 'object', color: 'purple' },
      ], links: [
        { from: 'a', to: 'b', label: 'edge' },
        { from: 'a', to: 'c', label: 'edge' },
        { from: 'b', to: 'd', label: 'edge' },
        { from: 'c', to: 'd', label: 'edge' },
        { from: 'd', to: 'e', label: 'edge' },
      ], caption: "A graph is nodes connected by edges. Dict of lists IS a graph." },
      after: { entities: [
        { id: 'dfs', label: '🔍 DFS', type: 'player', color: 'blue', value: 'Goes deep first' },
        { id: 'bfs', label: '🌊 BFS', type: 'player', color: 'green', value: 'Goes wide first' },
      ], links: [], caption: "DFS = depth-first (stack). BFS = breadth-first (queue)." },
      hint: "Toggle to see DFS vs BFS strategies."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "Every social network, map, and dependency system is a graph. And in Python, a dict of lists IS a graph." },
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "So defaultdict(list) is all I need to represent a graph?" }
      ],
      predicting: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "DFS should go deep (A→B→D→E...) while BFS should go wide (A→B,C→D→E)." },
        { speaker: 'mage', name: "Arch-Mage", text: "And which one finds the shortest path?" }
      ],
      revealed: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "BFS found the shortest path! A→B→E is shorter than A→B→D→E!" },
        { speaker: 'mage', name: "Arch-Mage", text: "DFS with recursion, BFS with deque. Two algorithms, one graph, different guarantees. This is the core of algorithm design." }
      ]
    }
  },
  // ═══════════════════════════════════════════════════════════════
  // DATA STRUCTURES MASTERY — TIER 4: PRODUCTION PATTERNS (318-320)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 318,
    tier: "Data Structures",
    title: "The Memory Keeper",
    name: "LRU Cache (dict + deque)",
    logbook: '"An LRU Cache remembers the N most recent items and evicts the least recently used when full. It combines a dict (O(1) lookup) with a deque (O(1) eviction). This is what @lru_cache does internally."',
    code: "from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity):\n        self.cache = OrderedDict()\n        self.capacity = capacity\n    \n    def get(self, key):\n        if key not in self.cache:\n            return -1\n        self.cache.move_to_end(key)  # Mark as recently used\n        return self.cache[key]\n    \n    def put(self, key, value):\n        if key in self.cache:\n            self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.capacity:\n            self.cache.popitem(last=False)  # Evict oldest\n\ncache = LRUCache(3)\ncache.put('a', 1)\ncache.put('b', 2)\ncache.put('c', 3)\nprint(f'Get b: {cache.get(\"b\")}')  # moves b to end\ncache.put('d', 4)  # evicts 'a' (least recently used)\n\nprint(f'Get a: {cache.get(\"a\")}')  # -1, evicted!\nprint(f'Cache: {dict(cache.cache)}')",
    predictions: ["LRU evicts the oldest unused item", "LRU evicts the most recently added", "The spell shatters (Crash)"],
    discovery: {
      title: "Production: LRU Cache",
      texts: [
        "LRU = Least Recently Used. When full, evict the item that hasn't been accessed longest. Used by CPUs, browsers, and databases.",
        "OrderedDict.move_to_end() marks a key as 'recently used'. OrderedDict.popitem(last=False) evicts the oldest. Both are O(1).",
        "Python's @functools.lru_cache uses this exact pattern internally. You just built the mechanism behind it from scratch."
      ],
      trial: "Import functools and try `@functools.lru_cache(maxsize=3)` on a fibonacci function. Then check `fib.cache_info()` to see hits vs misses."
    },
    sandbox: {
      before: { entities: [
        { id: 'c', label: '📦 LRU(3)', type: 'player', color: 'green', value: 'Capacity: 3' },
        { id: 'a', label: '🅰️ a=1', type: 'object', color: 'red', value: 'Oldest (LRU)' },
        { id: 'b', label: '🅱️ b=2', type: 'object', color: 'yellow', value: 'Middle' },
        { id: 'cc', label: '©️ c=3', type: 'object', color: 'blue', value: 'Newest' },
      ], links: [], caption: "Cache is full (3/3). Next insert evicts the LRU item." },
      after: { entities: [
        { id: 'evict', label: '❌ a evicted!', type: 'object', color: 'red', value: 'LRU policy' },
        { id: 'b2', label: '🅱️ b=2', type: 'object', color: 'blue', value: 'Accessed → fresh' },
        { id: 'c2', label: '©️ c=3', type: 'object', color: 'yellow' },
        { id: 'd', label: '📌 d=4', type: 'player', color: 'green', value: 'Newest' },
      ], links: [], caption: "After get(b) + put(d): 'a' was least recently used, so it's evicted." },
      hint: "Toggle to see LRU eviction."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "Your browser caches web pages. Your CPU caches memory. They all use LRU: evict what you used least recently." },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "And I need a dict for O(1) lookup AND a way to track order. OrderedDict does both!" }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "After get('b'), 'b' moves to the end. So 'a' becomes the least recently used and gets evicted when 'd' is added." },
        { speaker: 'mage', name: "Arch-Mage", text: "Perfect reasoning. Verify." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "a is gone! The LRU policy works exactly as predicted!" },
        { speaker: 'mage', name: "Arch-Mage", text: "You just implemented the core interview question asked at Google, Amazon, and Meta. And the same algorithm powers every caching layer in computing." }
      ]
    }
  },
  {
    id: 319,
    tier: "Data Structures",
    title: "The Prefix Oracle",
    name: "Trie (Prefix Tree)",
    logbook: '"Autocomplete, spell check, and IP routing all need to find words by PREFIX. A Trie stores strings character-by-character in a tree, making prefix search O(length) regardless of how many words exist."',
    code: "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n    \n    def insert(self, word):\n        node = self.root\n        for char in word:\n            if char not in node.children:\n                node.children[char] = TrieNode()\n            node = node.children[char]\n        node.is_end = True\n    \n    def search(self, word):\n        node = self._find(word)\n        return node is not None and node.is_end\n    \n    def starts_with(self, prefix):\n        return self._find(prefix) is not None\n    \n    def _find(self, text):\n        node = self.root\n        for char in text:\n            if char not in node.children:\n                return None\n            node = node.children[char]\n        return node\n\nt = Trie()\nfor word in ['python', 'pyro', 'pyre', 'java', 'javascript']:\n    t.insert(word)\n\nprint(f'search python: {t.search(\"python\")}')\nprint(f'search py:     {t.search(\"py\")}')\nprint(f'starts py:     {t.starts_with(\"py\")}')\nprint(f'starts jav:    {t.starts_with(\"jav\")}')\nprint(f'starts go:     {t.starts_with(\"go\")}')",
    predictions: ["search finds exact words, starts_with finds prefixes", "Trie search is the same as dict lookup", "The spell shatters (Crash)"],
    discovery: {
      title: "Production: Trie",
      texts: [
        "A Trie shares prefixes. 'python', 'pyro', 'pyre' all share the 'py' prefix path. This saves massive memory compared to storing each word separately.",
        "Search is O(word_length), completely independent of how many words are stored. 1 million words? Still the same speed for a 6-letter lookup.",
        "Autocomplete = find the _find node for the prefix, then DFS/BFS from there to collect all words below it."
      ],
      trial: "Add an `autocomplete(prefix)` method that returns all words starting with that prefix. Hint: _find(prefix) gives you the starting node, then recursively collect all words below it."
    },
    sandbox: {
      before: { entities: [
        { id: 'root', label: '🏠 root', type: 'player', color: 'green' },
        { id: 'p', label: 'p', type: 'object', color: 'blue' },
        { id: 'j', label: 'j', type: 'object', color: 'yellow' },
        { id: 'py', label: 'y', type: 'object', color: 'blue' },
      ], links: [
        { from: 'root', to: 'p', label: 'p...' },
        { from: 'root', to: 'j', label: 'j...' },
        { from: 'p', to: 'py', label: 'py...' },
      ], caption: "Trie: words share prefix paths. p→y branches into python/pyro/pyre." },
      after: { entities: [
        { id: 'prefix', label: '🔍 starts_with("py")', type: 'player', color: 'green', value: 'True' },
        { id: 'exact', label: '🔍 search("py")', type: 'object', color: 'red', value: 'False (not a word)' },
      ], links: [], caption: "starts_with checks if prefix path exists. search also checks is_end flag." },
      hint: "Toggle to see search vs starts_with."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "When you type 'py' in Google, it instantly suggests 'python', 'pygame', 'pyro'. How? Not by searching millions of strings." },
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "A Trie! It stores them character by character, so prefix lookup is instant!" }
      ],
      predicting: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "search('py') should be False — it's a prefix, not a complete word. starts_with('py') should be True." },
        { speaker: 'mage', name: "Arch-Mage", text: "The is_end flag distinguishes partial paths from complete words. Verify." }
      ],
      revealed: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "Perfect! The Trie knows 'py' is a path but not a word!" },
        { speaker: 'mage', name: "Arch-Mage", text: "Tries power search engines, autocomplete, spell checkers, IP routing tables, and DNA sequence matching. When you need prefix search, a Trie is the answer." }
      ]
    }
  },
  {
    id: 320,
    tier: "Data Structures",
    title: "The Grand Taxonomy",
    name: "Choosing the Right Structure",
    logbook: '"Knowing every data structure is useless if you can\'t choose the right one. This final chapter puts them all side by side — Big-O, use cases, and tradeoffs."',
    code: "# The Grand Comparison\nstructures = [\n    ('list',          'O(1)', 'O(n)',  'O(n)', 'O(1)†',  'Stack, dynamic array'),\n    ('deque',         'O(1)', 'O(n)',  'O(n)', 'O(1)',   'Queue, BFS, sliding window'),\n    ('dict',          'O(1)', 'O(1)',  'O(1)', '—',      'Key-value, counting, caching'),\n    ('set',           'O(1)', 'O(1)',  '—',    '—',      'Membership, dedup, set ops'),\n    ('heapq',         'O(log n)','O(n)','O(log n)','O(1)','Top-K, priority queue'),\n    ('BST (balanced)','O(log n)','O(log n)','O(log n)','—','Sorted data, range queries'),\n    ('Linked List',   'O(1)†','O(n)',  'O(1)†','—',      'Insert/delete at known pos'),\n    ('Trie',          'O(k)', 'O(k)',  'O(k)', '—',      'Prefix search, autocomplete'),\n]\n\nprint(f'{\"Structure\":<18} {\"Insert\":<10} {\"Search\":<8} {\"Delete\":<10} {\"Access\":<8} Use Case')\nprint('─' * 90)\nfor name, ins, search, delete, access, use in structures:\n    print(f'{name:<18} {ins:<10} {search:<8} {delete:<10} {access:<8} {use}')\n\nprint()\nprint('† O(1) append/pop at ends; O(n) at arbitrary positions')\nprint()\n\n# Decision Tree\nprint('=== QUICK DECISION GUIDE ===')\nprint('Need key-value pairs?          → dict')\nprint('Need ordering + fast lookup?   → list (small) or BST (large)')\nprint('Need unique elements?          → set')\nprint('Need FIFO queue?               → deque')\nprint('Need top-K / min / max?        → heapq')\nprint('Need prefix search?            → Trie')\nprint('Need fast insert/delete at pos?→ Linked List')\nprint('Need O(1) eviction cache?      → OrderedDict (LRU)')",
    predictions: ["Comparison table prints correctly", "All structures have the same Big-O", "The spell shatters (Crash)"],
    discovery: {
      title: "The Meta-Skill: DS Selection",
      texts: [
        "The meta-skill is not knowing structures — it's knowing WHEN to reach for each one. The decision tree above solves 90% of structure-selection problems.",
        "Interview tip: always state your structure choice AND why. 'I'll use a set for O(1) membership checks' scores higher than just using it silently.",
        "In production, start with the simplest structure (usually list or dict). Only upgrade to specialized structures when you MEASURE a performance problem."
      ],
      trial: "Think about a real problem: 'Find the top 5 most frequent words in a 1GB text file.' Which structures would you combine? (Answer: Counter + heapq.nlargest, or Counter.most_common(5))"
    },
    sandbox: {
      before: { entities: [
        { id: 'list', label: '📋 list', type: 'object', color: 'blue', value: 'General purpose' },
        { id: 'dict', label: '📚 dict', type: 'object', color: 'green', value: 'Key-value' },
        { id: 'set', label: '⭕ set', type: 'object', color: 'yellow', value: 'Membership' },
        { id: 'heap', label: '🏔️ heapq', type: 'object', color: 'red', value: 'Top-K' },
      ], links: [], caption: "Each structure optimizes for different access patterns." },
      after: { entities: [
        { id: 'problem', label: '❓ Problem', type: 'player', color: 'green', value: 'What do you need?' },
        { id: 'choose', label: '🎯 Right DS', type: 'object', color: 'yellow', value: 'Match pattern → structure' },
      ], links: [
        { from: 'problem', to: 'choose', label: 'Decision tree →' },
      ], caption: "The meta-skill: match the problem's access pattern to the right structure." },
      hint: "Toggle to see the decision framework."
    },
    dialogues: {
      intro: [
        { speaker: 'mage', name: "Arch-Mage", text: "You've learned lists, dicts, sets, heaps, trees, graphs, tries, and caches. But the REAL test is: when someone gives you a problem, can you pick the right one?" },
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "The decision tree makes it clear! It's about matching the problem's access pattern." }
      ],
      predicting: [
        { speaker: 'apprentice2', name: "Apprentice Jace", text: "The Big-O table should show that there's no single 'best' structure — each excels at different operations." },
        { speaker: 'mage', name: "Arch-Mage", text: "Exactly. No structure wins everywhere. Tradeoffs are the heart of engineering." }
      ],
      revealed: [
        { speaker: 'apprentice1', name: "Apprentice Elara", text: "dict is O(1) for insert/search/delete — but you can't index by position. list has indexing but O(n) search. Everything is a tradeoff!" },
        { speaker: 'mage', name: "Arch-Mage", text: "You've completed the Data Structures Mastery. You can now build, analyze, and choose structures like a senior engineer. The Grand Taxonomy is yours." }
      ]
    }
  }
];
