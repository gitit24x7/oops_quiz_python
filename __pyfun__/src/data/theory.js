/**
 * src/data/theory.js
 *
 * DESCRIPTION:
 * Deep, first-principles theory articles for every Python Quest learning path.
 * Written in the Feynman style: no jargon without explanation, analogies first,
 * build from zero, and end with "so what?"
 *
 * CONTENTS:
 * - One entry per learning path (keyed by slug)
 * - Each entry contains: TLDR, section-by-section deep dives, and connected quest IDs
 *
 * CONNECTIONS:
 * - Consumed by `src/components/TheoryArticle.jsx`
 * - Connected quest IDs map back to QUEST_PATHS in `src/App.jsx`
 */

export const theory = {

  // ═══════════════════════════════════════════════════════════════
  // PATH 1: DATA & COLLECTIONS
  // ═══════════════════════════════════════════════════════════════
  "data-collections": {
    id: "data-collections",
    icon: "📦",
    title: "Data & Collections",
    subtitle: "Lists, Dicts, Sets, Tuples — the containers that hold everything.",
    color: "from-google-blue to-blue-700",
    accentColor: "blue",
    tldr: `Every program you will ever write does exactly two things: it stores data, and it does stuff with that data. Before you can sort, search, filter, or display anything, you need a place to put it. Python gives you four fundamental containers — Lists, Tuples, Dictionaries, and Sets — and each one exists because it solves a specific problem the others can't. Understanding WHY each one exists (not just how to use it) is the difference between someone who writes Python and someone who thinks in Python.`,

    sections: [
      {
            "heading": "Why do we even need 'containers'?",
            "visuallyExplained": {
                  "hook": "You are running a small library. You try to assign every single book to its own variable: `book1`, `book2`, `book3`. When you hit 10,000 books, your code becomes an unmaintainable nightmare.",
                  "baseCase": "book1 = 'Harry Potter'\nbook2 = 'Lord of the Rings'\nbook3 = 'Dune'",
                  "ahaMoment": "Data structures are just different types of furniture. A single variable is a single sticky note. A data structure is a massive filing cabinet, a bookshelf, or a bag. You pick the furniture based on the job.",
                  "incrementalBuild": [
                        {
                              "step": 1,
                              "title": "Simplest implementation",
                              "code": "books = ['Harry Potter', 'Lord of the Rings', 'Dune']",
                              "desc": "We use a List to store infinite items under a single variable name."
                        },
                        {
                              "step": 2,
                              "title": "A common 'gotcha'",
                              "code": "books[99] # IndexError!",
                              "desc": "You must know how many items are in the list. Trying to access an index that doesn't exist crashes the program."
                        },
                        {
                              "step": 3,
                              "title": "The 'Pythonic' way",
                              "code": "print(len(books)) # Fast capacity check",
                              "desc": "Always use `len()` to check capacity. Python internally tracks the length, so this is blazing fast (O(1))."
                        }
                  ],
                  "visualDescription": "Animation shows 10,000 floating sticky notes violently blowing around a room forming a chaotic tornado. Suddenly, a sleek, glowing 'Container' box slams onto the floor and vacuums all the notes inside, organizing them neatly into slots.",
                  "summary": "In a nutshell, variables hold a single value, but containers (data structures) group infinite values under one scalable reference."
            }
      },
      {
            "heading": "Lists — The Ordered Shelf",
            "visuallyExplained": {
                  "hook": "You need to store a history of user actions in order. You try using custom named variables, but you have no way to dynamically insert new actions or keep them in sequence.",
                  "baseCase": "action_1 = 'login'\naction_2 = 'click'\naction_3 = 'logout'",
                  "ahaMoment": "A list is a physical row of numbered school lockers. Every item has perfectly assigned locker numbers starting at 0. You can instantly open locker #5, but if you want to insert a new locker between #2 and #3, every single locker from #3 onward must physically shift down the hallway.",
                  "incrementalBuild": [
                        {
                              "step": 1,
                              "title": "Simplest implementation",
                              "code": "inventory = ['sword', 'shield']\ninventory.append('potion')",
                              "desc": "Appending to the end is blazing fast because no lockers have to shift."
                        },
                        {
                              "step": 2,
                              "title": "A common 'gotcha'",
                              "code": "inventory.insert(0, 'helmet')",
                              "desc": "Inserting at the very beginning is dangerously slow. Every single item in the entire list must be physically moved down one slot in memory (O(N) operation)."
                        },
                        {
                              "step": 3,
                              "title": "The 'Pythonic' way",
                              "code": "print(inventory[0]) # instant O(1) access",
                              "desc": "If you need fast retrieval by position, lists excel. They calculate the exact memory address instantly."
                        }
                  ],
                  "visualDescription": "We see a row of metallic lockers. A mechanical arm drops a new item at the far end easily. But when it tries to force an item into the front locker, alarms sound, and all other lockers groan as they slide down a massive track to make room.",
                  "summary": "In a nutshell, Lists are ordered, mutable sequences optimized for appending to the end and random access by index, but terrible for inserting at the front."
            }
      },
      {
            "heading": "Dictionaries — The Filing Cabinet",
            "visuallyExplained": {
                  "hook": "You have a list of user properties: age, name, role. You rely on indexes (user[0] is age), which makes your code completely unreadable and fragile if the order ever changes.",
                  "baseCase": "player = ['Alice', 100, 'Mage']\n\nif player[2] == 'Mage':\n    execute_magic()",
                  "ahaMoment": "A Dictionary is a corporate filing cabinet with tabbed manila folders. You don't count 'give me the 4th folder'. You just read the label 'email' and grab it instantly using a Hash Function.",
                  "incrementalBuild": [
                        {
                              "step": 1,
                              "title": "Simplest implementation",
                              "code": "player = {'name': 'Alice', 'role': 'Mage'}",
                              "desc": "We assign explicit string labels (keys) to every data point (values)."
                        },
                        {
                              "step": 2,
                              "title": "A common 'gotcha'",
                              "code": "player = {[1, 2]: 'score'} # CRASH!",
                              "desc": "Dict keys MUST be immutable (hashable) like strings or tuples. You cannot use a mutable list as a key because its hash would constantly change."
                        },
                        {
                              "step": 3,
                              "title": "The 'Pythonic' way",
                              "code": "print(player.get('mana', 0))",
                              "desc": "Always read keys safely using `.get()` which returns a default value instead of crashing with a KeyError."
                        }
                  ],
                  "visualDescription": "Animation shows a messy stack of unlabelled papers. A laser scans them, instantly generating perfectly typed label tabs (Hash Keys). A robotic hand now shoots out, instantly grabbing the exact folder requested without searching through the stack.",
                  "summary": "In a nutshell, Dictionaries are hash tables providing instant O(1) lookups using immutable labels instead of brittle numeric indexes."
            }
      },
      {
            "heading": "Sets — The Bag of Unique Marbles",
            "visuallyExplained": {
                  "hook": "You need to find out if a user exists in a massive database of 10 million blocked IPs. Scanning an entire list takes minutes and grinds your server to a halt.",
                  "baseCase": "blocked_ips = ['1.1.1.1', '2.2.2.2'] # massive list\n\nif new_ip in blocked_ips: # O(N) scan\n    block_user()",
                  "ahaMoment": "A Set is an exclusive VIP guest list controlled by an elite bouncer. There are no duplicates allowed. Best of all, the bouncer doesn't read the whole list—they have a magic lookup table that confirms attendance instantly.",
                  "incrementalBuild": [
                        {
                              "step": 1,
                              "title": "Simplest implementation",
                              "code": "tags = {'python', 'coding', 'python'}\n# Result: {'python', 'coding'}",
                              "desc": "Sets automatically and silently destroy all duplicate items upon creation."
                        },
                        {
                              "step": 2,
                              "title": "A common 'gotcha'",
                              "code": "empty = {} # This creates a Dict, not a Set!",
                              "desc": "Curly braces default to dictionaries. To create an empty set, you MUST use the explicit `set()` constructor."
                        },
                        {
                              "step": 3,
                              "title": "The 'Pythonic' way",
                              "code": "if new_ip in set(blocked_ips): # O(1) Check",
                              "desc": "Convert massive lists to sets before doing membership checks (`in`). This turns an O(N) scan into an O(1) instant hash lookup."
                        }
                  ],
                  "visualDescription": "A conveyor belt drops thousands of identical red marbles into a bag. Inside the bag, a magical force field instantly disintegrates the duplicates, leaving only one single red marble. A scanner checks the bag and instantly confirms 'red' is inside.",
                  "summary": "In a nutshell, Sets are unordered collections of unique elements optimized heavily for blazing fast membership checking and deduplication."
            }
      },
      {
            "heading": "Tuples — The Sealed Envelope",
            "visuallyExplained": {
                  "hook": "You generated a fixed configuration or a database row. Another developer accidentally appends data to it down the line, silently corrupting your entire data pipeline.",
                  "baseCase": "coordinates = [10, 20]\n# later in code\ncoordinates[0] = 99 # Corrupted!",
                  "ahaMoment": "A Tuple is a wax-sealed envelope. You can easily read the documents through the clear window, but the second you try to open the envelope to modify the documents, the wax shatters, and Python throws a massive alarm.",
                  "incrementalBuild": [
                        {
                              "step": 1,
                              "title": "Simplest implementation",
                              "code": "rgb_color = (255, 128, 0)",
                              "desc": "Created using parentheses. This sequence is now permanently frozen."
                        },
                        {
                              "step": 2,
                              "title": "A common 'gotcha'",
                              "code": "single = (42) # This is an integer!\nsingle = (42,) # This is a tuple!",
                              "desc": "A single-item tuple REQUIRES a trailing comma. Otherwise, Python just thinks you're using math grouping parentheses."
                        },
                        {
                              "step": 3,
                              "title": "The 'Pythonic' way",
                              "code": "locations = {(10, 20): 'spawn'}",
                              "desc": "Because tuples are completely immutable, their hash never changes. This means you can use tuples as Dictionary Keys, enabling multidimensional dict mapping."
                        }
                  ],
                  "visualDescription": "Items are placed into a glowing box. A heavy steel lid slams down, locking tight with a loud clank. A programmer robot tries to pry it open with a crowbar, but the crowbar snaps in half as a red 'TypeError' light flashes.",
                  "summary": "In a nutshell, Tuples are immutable lists. They guarantee data integrity, run slightly faster, and can be used as dictionary keys."
            }
      }
],

    connectedQuestIds: [104, 107, 109, 1, 5, 4, 7]
  },

  // ═══════════════════════════════════════════════════════════════
  // PATH 2: FUNCTIONS & SCOPE
  // ═══════════════════════════════════════════════════════════════
  "functions-scope": {
    id: "functions-scope",
    icon: "⚡",
    title: "Functions & Scope",
    subtitle: "How Python organizes, isolates, and executes blocks of logic.",
    color: "from-google-yellow to-amber-600",
    accentColor: "yellow",
    tldr: `A function is not "a block of reusable code." That's the boring textbook definition. A function is actually a tiny, self-contained room with its own walls, its own local variables, and strict rules about what information can enter and leave. Understanding functions means understanding scope — the invisible walls Python builds around every block of code — and how data travels across those walls. Get this wrong and you'll spend hours debugging "why can't my function see this variable?" Get it right and you'll write code that is clean, testable, and impossible to break accidentally.`,

    sections: [
      {
            "heading": "First-Class Functions (Dict Dispatch)",
            "visuallyExplained": {
                  "hook": "You are building a calculator or command handler. You have 5 different operations, and you waste 20 lines writing a massive, brittle `if/elif` chain that you have to update every time a new command is added.",
                  "baseCase": "if op == 'add':\n    return a + b\nelif op == 'sub':\n    return a - b\n# ... grows infinitely",
                  "ahaMoment": "Functions are just portable objects! You can treat them exactly like integers or strings. You can drop them into a dictionary, look them up by a string key, and execute them on the spot. This is called 'Dict Dispatch'.",
                  "incrementalBuild": [
                        {
                              "step": 1,
                              "title": "Simplest implementation",
                              "code": "operations = {'add': sum_func, 'sub': sub_func}",
                              "desc": "We store the actual function objects (no parentheses!) directly inside a dictionary as values."
                        },
                        {
                              "step": 2,
                              "title": "A common 'gotcha'",
                              "code": "operations = {'add': sum_func()}",
                              "desc": "Adding parentheses `()` executes the function instantly while building the dictionary! You must pass the function's name purely as a reference."
                        },
                        {
                              "step": 3,
                              "title": "The 'Pythonic' way",
                              "code": "result = operations.get(op, default_func)(a, b)",
                              "desc": "You pull the function out of the dictionary and immediately call it with `(a, b)`. No `if` statements are required, and adding a new operation just means adding one key-value pair."
                        }
                  ],
                  "visualDescription": "Instead of a massive train-yard switchboard (`if/elif`), we see a sleek toolbox. Inside the toolbox are glowing, active tools (functions). A mechanical arm asks for 'add', picks up the specific 'add' tool, and immediately applies it to the data.",
                  "summary": "In a nutshell, treating functions as 'first-class objects' allows you to store them in data structures, replacing rigid conditional logic with infinitely scalable dictionary lookups."
            }
      },
      {
            "heading": "Scope & UnboundLocalError",
            "visuallyExplained": {
                  "hook": "You try to increment a simple counter variable that exists right outside your function. Python violently crashes, telling you the variable doesn't exist (`UnboundLocalError`), even though you can clearly see it right there.",
                  "baseCase": "counter = 0\n\ndef increment():\n    counter += 1  # Crash!\n\nincrement()",
                  "ahaMoment": "Python is overprotective. The exact second you use an equals sign (`=`) inside a function, Python builds an impenetrable, invisible wall around that variable. It treats it as an entirely new, local variable, completely ignoring the outside world.",
                  "incrementalBuild": [
                        {
                              "step": 1,
                              "title": "Simplest implementation (Reading)",
                              "code": "def read():\n    print(counter)",
                              "desc": "Without an `=` sign anywhere, Python lets you look through the glass wall to read the global variable perfectly fine."
                        },
                        {
                              "step": 2,
                              "title": "A common 'gotcha' (Writing)",
                              "code": "counter += 1",
                              "desc": "This translates to `counter = counter + 1`. The `=` tells Python 'this is a local variable.' Then the right side tries to read it *before* it gets a value, causing the crash."
                        },
                        {
                              "step": 3,
                              "title": "The 'Pythonic' way",
                              "code": "def increment():\n    global counter\n    counter += 1",
                              "desc": "By explicitly declaring `global counter`, you punch a deliberate hole through the enclosing wall, telling Python to explicitly use the outside version for assignments."
                        }
                  ],
                  "visualDescription": "We see a variable sitting out in an open field. A glass room (the function) drops onto the field. At first, you can read it through the glass. But the moment you write an `=` sign, the glass turns to concrete, trapping an empty void inside the room and blinding you to the outside.",
                  "summary": "In a nutshell, Python determines variable scope at compile-time: any assignment makes a variable local to that function unless explicitly overridden."
            }
      },
      {
            "heading": "Closures (Functions that remember)",
            "visuallyExplained": {
                  "hook": "You need a function that 'remembers' a configuration setting (like a tax rate or API key) over time, but you don't want to pollute your code with messy global variables or build heavy Classes just to hold one number.",
                  "baseCase": "TAX_RATE = 0.2  # Messy global\n\ndef calculate_tax(price):\n    return price * TAX_RATE",
                  "ahaMoment": "A closure is a magical backpack. When an inner function is returned and leaves its parent, it packs exactly the variables it needs from the parent's room into its backpack. Even after the parent room is demolished, the inner function carries that data forever.",
                  "incrementalBuild": [
                        {
                              "step": 1,
                              "title": "Simplest implementation",
                              "code": "def tax_factory(rate):\n    def calc(price):\n        return price * rate\n    return calc",
                              "desc": "The outer function accepts `rate`. The inner function uses it. We return the inner function itself, not its evaluated result."
                        },
                        {
                              "step": 2,
                              "title": "A common 'gotcha'",
                              "code": "calc_usa = tax_factory(0.1)\n# outer function has finished!",
                              "desc": "Beginners assume `rate` is deleted from memory when `tax_factory` finishes. But because `calc` referenced it, Python preserves it dynamically."
                        },
                        {
                              "step": 3,
                              "title": "The 'Pythonic' way",
                              "code": "print(calc_usa(100)) # 10.0",
                              "desc": "We just call the returned function! It reaches into its invisible backpack, pulls out the `rate=0.1` it memorized from birth, and completes the calculation cleanly."
                        }
                  ],
                  "visualDescription": "A large 'parent' factory creates a small worker robot (the inner function). The factory is blown up and erased from memory, but the little robot walks away unharmed, unzipping its backpack to pull out a glowing 'rate' orb it saved right before the explosion.",
                  "summary": "In a nutshell, Closures are functions paired with an environment backpack. They provide state retention without the boilerplate of building formal Object-Oriented classes."
            }
      },
      {
            "heading": "Lambda & Higher Order Functions",
            "visuallyExplained": {
                  "hook": "You need to sort a list of dictionaries by a specific key. You are forced to define an entirely separate, formally-named function far away from the sorting logic, just to return a single value.",
                  "baseCase": "def get_score(user):\n    return user['score']\n\nranked = sorted(users, key=get_score)",
                  "ahaMoment": "A Lambda is a sticky note. When you just need to pass a tiny, one-off instruction to a machine (like `sorted()`), you don't need to file a formal document. You just scribble the math on a sticky note and slap it directly onto the input slot.",
                  "incrementalBuild": [
                        {
                              "step": 1,
                              "title": "Simplest implementation",
                              "code": "lambda user: user['score']",
                              "desc": "The syntax is stripped bare: the word `lambda`, followed by arguments, a colon, and the exact expression to return. No `def`, no `return` keyword."
                        },
                        {
                              "step": 2,
                              "title": "A common 'gotcha'",
                              "code": "lambda x: if x > 0: x else 0 # Syntax Error!",
                              "desc": "Lambdas are strictly limited to exactly one *expression*. You cannot put full statements, `for` loops, or standard `if` blocks inside a lambda."
                        },
                        {
                              "step": 3,
                              "title": "The 'Pythonic' way",
                              "code": "ranked = sorted(users, key=lambda x: x['score'])",
                              "desc": "The lambda is created, used by `sorted()`, and immediately thrown into the garbage in a single, perfectly readable line of code."
                        }
                  ],
                  "visualDescription": "The programmer is about to fill out a 3-page formal 'Function Request' form, but instead rips a tiny yellow sticky note, writes `x: x['score']` on it, and sticks it directly onto the side of a massive, metallic 'Sorting' machine.",
                  "summary": "In a nutshell, lambdas are anonymous, single-expression functions designed exclusively for short, throwaway operations—often passed directly into higher-order functions like map/filter/sort."
            }
      }
],

    connectedQuestIds: [105, 110, 2, 3, 11]
  },

  // ═══════════════════════════════════════════════════════════════
  // PATH 3: GENERATORS & I/O
  // ═══════════════════════════════════════════════════════════════
  "generators-io": {
    id: "generators-io",
    icon: "🌊",
    title: "Generators & I/O",
    subtitle: "Lazy evaluation, infinite sequences, and safe resource management.",
    color: "from-google-green to-emerald-700",
    accentColor: "green",
    tldr: `Most code is eager — it computes everything immediately and stores it all in memory. But what if you need to process a billion rows from a database? You can't fit them all in RAM. Generators solve this by producing values one at a time, on demand, using almost zero memory. They're Python's implementation of "lazy evaluation," and they're the secret weapon behind efficient data pipelines, streaming, and file processing. Paired with context managers (the 'with' statement), they form the foundation of production-grade Python I/O.`,

    sections: [
      {
        heading: "The problem with being eager",
        content: `Consider a simple task: process the first 5 even numbers from a range of a million numbers.

The eager approach: generate ALL million numbers into a list, then filter. This allocates a million integers in memory just to use 5 of them.

The lazy approach: generate numbers one at a time. Check if each one is even. The moment you've found 5, stop. You never held more than one number in memory at any point.

This is the core idea behind generators: don't compute everything upfront. Compute each value only when it's asked for. This is called "lazy evaluation" and it's a fundamental programming concept used in databases, streaming systems, and every major data processing framework.`,
        codeExample: `# EAGER: builds entire list in memory (waste!)
numbers = list(range(1_000_000))  # 1 million ints in RAM
evens = [n for n in numbers if n % 2 == 0]
first_five = evens[:5]

# LAZY: generates values one at a time (efficient!)
def even_numbers():
    n = 0
    while True:  # Infinite! But that's okay.
        if n % 2 == 0:
            yield n
        n += 1

gen = even_numbers()
first_five = [next(gen) for _ in range(5)]
# Only 5 values ever existed in memory.`,
        analogy: "Eager computation is like printing an entire encyclopedia just to read one article. Lazy evaluation is like Google — it only fetches the page you're actually looking at."
      },
      {
        heading: "yield — the pause button",
        content: `A generator function looks like a normal function but uses 'yield' instead of 'return'. The difference is profound:

- 'return' kills the function. The stack frame is destroyed. It's over.
- 'yield' pauses the function. The stack frame is frozen in place. All local variables keep their values. The function is suspended mid-execution, waiting to be resumed.

When you call a generator function, it doesn't run ANY of the code inside. It returns a generator object — a frozen packet of code waiting to be iterated. Only when you call next() on it (or iterate with a for loop) does it execute until the next 'yield', hand you the value, and pause again.

This is Python's implementation of a coroutine — a function that can be suspended and resumed. It's the foundation of async programming, data streaming, and memory-efficient iteration.`,
        codeExample: `def countdown(n):
    print("Starting countdown!")
    while n > 0:
        yield n          # Pause here, hand out n
        n -= 1           # Resume here on next call
    print("Liftoff! 🚀")

# Calling the function does NOT run it:
gen = countdown(3)
print(type(gen))  # <class 'generator'>

# next() runs until the next yield:
print(next(gen))  # "Starting countdown!" then 3
print(next(gen))  # 2  (resumes right after yield)
print(next(gen))  # 1  (resumes again)
# print(next(gen))  # "Liftoff!" then StopIteration!

# For loops handle StopIteration automatically:
for val in countdown(3):
    print(val)  # 3, 2, 1, then "Liftoff!"`,
        analogy: "A generator is like a TV show on a streaming service. The entire series isn't downloaded to your device. When you press 'play' (next()), it streams one episode (yield). When you pause, the show remembers exactly where you left off. When there are no more episodes, it says 'StopIteration.'"
      },
      {
        heading: "Generator expressions — comprehensions that don't eat memory",
        content: `You already know list comprehensions: [x*2 for x in range(1000)]. This creates a list of 1000 items in memory.

Replace the square brackets with parentheses and you get a generator expression: (x*2 for x in range(1000)). This creates a generator that produces values one at a time — using essentially zero memory.

The syntax is nearly identical, but the behavior is fundamentally different. A list comprehension is eager (builds everything now). A generator expression is lazy (builds each item on demand).

Use generator expressions when you're feeding data into another function (like sum(), max(), any()) and don't need to keep the intermediate list around. This is both faster and dramatically more memory-efficient.`,
        codeExample: `# List comprehension: builds all 1 million squares in memory
total = sum([x**2 for x in range(1_000_000)])

# Generator expression: builds each square on-the-fly
total = sum(x**2 for x in range(1_000_000))
# Same result, but uses almost no memory!

# You can even drop the extra parentheses when it's
# the only argument to a function:
print(max(len(word) for word in ["hello", "world", "python"]))
# 6 (length of "python")

# Chaining generators: a lazy data pipeline
lines = (line.strip() for line in open("data.txt"))
non_empty = (line for line in lines if line)
uppercased = (line.upper() for line in non_empty)
# NOTHING has been read from the file yet!
# Only when you iterate does the pipeline activate.`,
        analogy: "A list comprehension is like a factory that makes all the widgets, boxes them up, and delivers the whole pallet. A generator expression is like a factory with a conveyor belt — it makes one widget at a time as the customer pulls from the belt."
      },
      {
        heading: "Context Managers — the safety net for I/O",
        content: `Every time your program opens a file, connects to a database, or acquires a lock, it uses a finite resource. These resources MUST be released when you're done — otherwise you get memory leaks, file locks, and connection pool exhaustion.

The naive approach is manual cleanup:
  f = open("data.txt")
  data = f.read()
  f.close()

The problem: if f.read() throws an error, f.close() never runs. The file handle leaks.

The 'with' statement (context manager) guarantees cleanup happens no matter what — even if an exception fires. It follows the "acquire → use → release" pattern, and the release is GUARANTEED.

Under the hood, a context manager is just an object with two methods: __enter__ (acquire the resource) and __exit__ (release it, even on errors). The 'with' statement calls __enter__ when you enter the block and __exit__ when you leave it, no matter how you leave (normally, via return, or via exception).`,
        codeExample: `# UNSAFE: if read() crashes, close() never runs
f = open("data.txt")
data = f.read()     # What if this throws an error?
f.close()           # ← This line might never execute!

# SAFE: 'with' guarantees close() runs no matter what
with open("data.txt") as f:
    data = f.read()
# f.close() is called automatically here,
# even if an exception was raised inside the block.

# Works with ANY resource, not just files:
import threading

lock = threading.Lock()
with lock:  # Acquires the lock
    # Critical section — only one thread at a time
    shared_data.append(item)
# Lock is released automatically

# You can build your own context managers:
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.time()
    yield  # Code inside 'with' runs here
    print(f"Elapsed: {time.time() - start:.2f}s")

with timer():
    sum(range(10_000_000))
# Prints: "Elapsed: 0.23s"`,
        analogy: "A context manager is like a try-on room at a clothing store. When you enter, you take the clothes off the rack (acquire resource). When you leave — whether you buy something, decide against it, or the fire alarm goes off — the attendant makes sure the clothes go back on the rack (release resource). No matter what happens, cleanup occurs."
      },
      {
        heading: "Putting it together — real-world data pipelines",
        content: `In production Python, generators and context managers work together to process massive amounts of data with minimal memory:

1. Open a file safely with a context manager
2. Read lines lazily with a generator
3. Transform each line through a pipeline of generators
4. Write results safely with another context manager

This pattern handles files of any size — even terabyte log files — because only one line is ever in memory at a time. It's also the core pattern behind tools like Apache Spark, pandas chunked processing, and Django's streaming HTTP responses.

The key mental shift: stop thinking about "processing a file" and start thinking about "building a pipeline that values flow through." Each generator is a stage in the pipeline, and data flows through one item at a time.`,
        codeExample: `# Real-world: process a massive log file efficiently
def parse_logs(filename):
    with open(filename) as f:
        for line in f:                      # Lazy: one line at a time
            if "ERROR" in line:
                yield line.strip()          # Only yield errors

def extract_timestamps(error_lines):
    for line in error_lines:
        yield line.split("]")[0].strip("[")  # Extract timestamp

# Build the pipeline (nothing runs yet!)
errors = parse_logs("server.log")
timestamps = extract_timestamps(errors)

# Pull values through the pipeline
for ts in timestamps:
    print(f"Error at: {ts}")
# Processes a 10GB log file using only a few KB of memory!`,
        analogy: null
      }
    ],

    connectedQuestIds: [101, 8, 106, 13]
  },

  // ═══════════════════════════════════════════════════════════════
  // PATH 4: THE ART OF WRAPPING (DECORATORS)
  // ═══════════════════════════════════════════════════════════════
  "art-of-wrapping": {
    id: "art-of-wrapping",
    icon: "🎁",
    title: "The Art of Wrapping",
    subtitle: "Decorators — functions that modify functions, the backbone of Python frameworks.",
    color: "from-google-red to-red-700",
    accentColor: "red",
    tldr: `A decorator is a function that takes another function as input, wraps it with extra behavior, and returns the wrapped version. That one sentence is the entire concept. Everything else — the @ syntax, functools.wraps, decorator arguments, class decorators — is just variations on this single idea. Decorators are not magic. They're just functions calling functions. But they're so powerful that every major Python framework (Flask, Django, FastAPI, pytest) is built on them. If you understand decorators deeply, you understand how Python frameworks work under the hood.`,

    sections: [
      {
        heading: "Functions are objects — the prerequisite insight",
        content: `Before you can understand decorators, you need to internalize one non-obvious fact: in Python, functions are objects. They're not special. They're not magical incantations. They're regular objects, just like strings, lists, and dictionaries — they just happen to be callable.

This means you can:
1. Assign a function to a variable
2. Store functions in a list or dictionary
3. Pass a function as an argument to another function
4. Return a function from another function

If any of these feel weird to you, that's normal. Most languages treat functions as special syntax, not as values. Python treats everything as an object — and this uniformity is what makes decorators possible.

The technical term for "you can pass functions around like any other value" is "first-class functions." Python has them. C does not. This is a fundamental language design choice.`,
        codeExample: `def shout(text):
    return text.upper()

def whisper(text):
    return text.lower()

# Functions are just objects with names
print(type(shout))  # <class 'function'>

# Assign to a variable (no parentheses = no call)
yell = shout
print(yell("hello"))  # "HELLO"

# Store in a data structure
modes = {"loud": shout, "quiet": whisper}
print(modes["loud"]("hello"))  # "HELLO"

# Pass as an argument
def speak(func, text):
    return func(text)
print(speak(shout, "hello"))  # "HELLO"

# Return from a function
def choose_mode(loud=True):
    return shout if loud else whisper
mode = choose_mode(loud=False)
print(mode("HELLO"))  # "hello"`,
        analogy: "In most languages, functions are like appliances bolted to the wall — you can use them in place but can't move them. In Python, functions are like portable appliances — you can pick them up, put them in a box, hand them to someone else, or send them through the mail."
      },
      {
        heading: "The decorator pattern — wrapping by hand",
        content: `Now that you know functions can be passed around, here's the decorator pattern in its raw form. No @ syntax, no magic:

1. Write a function (the "decorator") that accepts another function as its argument
2. Inside, define a new "wrapper" function that calls the original but adds behavior
3. Return the wrapper

The decorator doesn't modify the original function. It creates a NEW function (the wrapper) that calls the original internally. You then reassign the original name to point to this wrapper.

This is literally all a decorator is. The @ syntax is just shorthand for this exact reassignment.`,
        codeExample: `# STEP 1: The decorator — a function that wraps functions
def add_logging(func):
    def wrapper(*args, **kwargs):
        print(f"📞 Calling {func.__name__}...")
        result = func(*args, **kwargs)       # Call the ORIGINAL
        print(f"✅ {func.__name__} returned {result}")
        return result
    return wrapper

# STEP 2: A normal function
def add(a, b):
    return a + b

# STEP 3: Wrap it by hand (the raw decorator pattern)
add = add_logging(add)
# 'add' now points to 'wrapper', which internally calls the original 'add'

print(add(3, 5))
# 📞 Calling add...
# ✅ add returned 8
# 8

# The name 'add' has been HIJACKED.
# It now points to wrapper(), not the original.
print(add.__name__)  # "wrapper" (not "add"!)`,
        analogy: "Decorating a function is like gift-wrapping a present. The original present (function) is still inside, perfectly intact. But the wrapper adds a ribbon, a bow, and a card (extra behavior). When someone opens it (calls the function), they interact with the wrapping first, then reach the present inside."
      },
      {
        heading: "The @ syntax — syntactic sugar",
        content: `Writing 'func = decorator(func)' every time is tedious. Python provides the @ symbol as elegant shorthand.

When Python sees:
  @decorator
  def func():
      ...

It automatically executes: func = decorator(func)

That's it. That's all @ does. It's not a new concept — it's just a cleaner way to write the same reassignment.

This means every single time you see @login_required, @app.route("/"), or @pytest.fixture in a Python framework, you can mentally translate it to: "this function is being passed into another function and replaced with the result."`,
        codeExample: `def add_logging(func):
    def wrapper(*args, **kwargs):
        print(f"📞 Calling {func.__name__}...")
        result = func(*args, **kwargs)
        print(f"✅ Done!")
        return result
    return wrapper

# WITHOUT @ (the manual way)
def add(a, b):
    return a + b
add = add_logging(add)

# WITH @ (the Pythonic way — identical behavior)
@add_logging
def multiply(a, b):
    return a * b

# Both work exactly the same:
add(3, 5)       # 📞 Calling add... ✅ Done!
multiply(3, 5)  # 📞 Calling multiply... ✅ Done!`,
        analogy: "The @ symbol is like a 'gift wrap this' sticker at a store. Instead of manually wrapping each item yourself, you slap on the sticker and the store does it for you automatically. Same result, less work."
      },
      {
        heading: "functools.wraps — preserving identity",
        content: `There's a subtle problem with decorators: the wrapper replaces the original function's identity. After decoration, the function's __name__, __doc__, and __module__ all point to the wrapper, not the original. This breaks debugging, logging, and introspection.

functools.wraps solves this. It's a decorator FOR decorators (yes, really) that copies the original function's metadata onto the wrapper.

This is considered mandatory in production code. Every professional decorator uses @functools.wraps(func) on its wrapper function. It's such a standard practice that its absence is a code smell.`,
        codeExample: `import functools

def add_logging(func):
    @functools.wraps(func)  # ← Copies func's identity onto wrapper
    def wrapper(*args, **kwargs):
        print(f"📞 Calling {func.__name__}...")
        result = func(*args, **kwargs)
        return result
    return wrapper

@add_logging
def add(a, b):
    """Adds two numbers together."""
    return a + b

# WITHOUT @wraps:
# print(add.__name__)  → "wrapper"  (wrong!)
# print(add.__doc__)   → None       (wrong!)

# WITH @wraps:
print(add.__name__)  # "add"  ✅
print(add.__doc__)   # "Adds two numbers together."  ✅`,
        analogy: "Without @wraps, it's like someone wearing a disguise — when you ask their name, they respond with the disguise's name. @wraps is like a name tag stuck on the costume that shows the real person inside."
      },
      {
        heading: "Decorators with arguments — the double-wrap",
        content: `Sometimes you want a decorator that takes configuration. For example: @retry(max_attempts=3) or @cache(ttl=60). But the @ syntax expects a function that takes ONE argument (the decorated function). How do you pass extra arguments?

The answer is a three-layer nesting pattern:

Layer 1: The outer function takes the configuration arguments (max_attempts, ttl)
Layer 2: The middle function takes the decorated function (the actual decorator)
Layer 3: The inner function is the wrapper that runs at call time

This looks complex at first, but it's just three simple functions, each doing one job:
  - Outer: receives settings
  - Middle: receives the function
  - Inner: does the actual work`,
        codeExample: `import functools

# Layer 1: Receives configuration
def retry(max_attempts=3):
    # Layer 2: Receives the function (the actual decorator)
    def decorator(func):
        @functools.wraps(func)
        # Layer 3: The wrapper that runs at call time
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"Attempt {attempt} failed: {e}")
                    if attempt == max_attempts:
                        raise
        return wrapper
    return decorator

# Usage — the (3) calls the outer function,
# which RETURNS the actual decorator
@retry(max_attempts=5)
def fetch_data(url):
    import random
    if random.random() < 0.7:
        raise ConnectionError("Network timeout")
    return {"data": "success!"}

result = fetch_data("https://api.example.com")`,
        analogy: "A decorator with arguments is like a custom gift-wrapping station. First you tell them the style ('Layer 1: gold paper, red bow'). Then you hand them the present ('Layer 2: here's the function'). Then they give you back the wrapped result ('Layer 3: the wrapper')."
      },
      {
        heading: "Real-world decorators — what frameworks actually do",
        content: `Now that you understand the mechanics, here's where decorators show up in the real world:

Flask/FastAPI routing: @app.route("/users") registers a function as a URL handler. The decorator takes the URL path, stores a mapping of path → function, and the web server looks up this mapping when a request arrives.

Authentication: @login_required checks if the user is logged in before running the view function. If not, it redirects to the login page instead of calling the original function.

Caching: @lru_cache stores function results in a dictionary keyed by arguments. If the same arguments are passed again, it returns the cached result instead of recomputing.

Pytest fixtures: @pytest.fixture marks a function as a reusable test setup function. The test framework injects it into test functions that request it.

The pattern is always the same: validate something, transform something, or register something — before or after the original function runs.`,
        codeExample: `# Flask-style route decorator (simplified)
class SimpleApp:
    def __init__(self):
        self.routes = {}

    def route(self, path):
        def decorator(func):
            self.routes[path] = func  # Register!
            return func
        return decorator

app = SimpleApp()

@app.route("/hello")
def hello():
    return "Hello, World!"

@app.route("/users")
def get_users():
    return ["Alice", "Bob"]

# The decorator registered these functions:
print(app.routes)
# {'/hello': <function hello>, '/users': <function get_users>}
# When a request for "/hello" arrives, call app.routes["/hello"]()`,
        analogy: null
      }
    ],

    connectedQuestIds: [103, 201, 202, 10]
  },

  // ═══════════════════════════════════════════════════════════════
  // PATH 5: OOP FOUNDATIONS
  // ═══════════════════════════════════════════════════════════════
  "oop-foundations": {
    id: "oop-foundations",
    icon: "🏛️",
    title: "OOP Foundations",
    subtitle: "Classes, objects, inheritance — thinking in blueprints and instances.",
    color: "from-google-blue to-sky-700",
    accentColor: "purple",
    tldr: `Object-Oriented Programming is not about "organizing code into classes." It's about modeling the world as a collection of things (objects) that hold their own data and know how to do their own work. A class is just a blueprint — a template that says "any Dog will have a name, an age, and the ability to bark." An object is a specific dog built from that blueprint. The reason OOP dominates backend engineering is simple: real systems are made of things (users, orders, connections, sessions) and OOP lets you talk about those things directly in your code, rather than juggling loose variables and functions.`,

    sections: [
      {
        heading: "Why does OOP exist?",
        content: `Before OOP, programs were written as long sequences of instructions operating on loose data. A user was three separate variables: name, email, age. A function that modifies the user takes all three as arguments. Add a fourth field? You have to update every single function.

OOP solves this by bundling data and behavior together. A User object carries its own name, email, and age as attributes, and knows how to update_email() or check_age(). The data and the functions that operate on it live in the same place.

This isn't just about convenience. It's about contracts. When I pass you a User object, you know exactly what data it has and what it can do. You don't need to read my entire codebase. The class definition IS the documentation.

Python's OOP is different from Java's or C++'s. In Python, classes are themselves objects. You can create them dynamically, pass them as arguments, and modify them at runtime. Everything is an object — integers, strings, functions, even classes themselves.`,
        codeExample: `# WITHOUT OOP: loose data, fragile functions
user_name = "Alice"
user_email = "alice@mail.com"
user_age = 25

def greet_user(name, email, age):
    print(f"Hi {name}, age {age}")
# Add a field? Update EVERY function.

# WITH OOP: bundled, self-contained
class User:
    def __init__(self, name, email, age):
        self.name = name
        self.email = email
        self.age = age

    def greet(self):
        print(f"Hi {self.name}, age {self.age}")

alice = User("Alice", "alice@mail.com", 25)
alice.greet()  # Hi Alice, age 25
# Add a field? Just update the class. Done.`,
        analogy: "Without OOP, a user is like a pile of sticky notes scattered on your desk — name on one, email on another. With OOP, a user is a single business card with all the info in one place. You hand someone the card, not a pile of notes."
      },
      {
        heading: "Classes and __init__ — the blueprint and the constructor",
        content: `A class is a blueprint. An object is a specific thing built from that blueprint. The __init__ method is the construction process — the code that runs when you build a new object.

When you write alice = User("Alice", "alice@mail.com", 25), Python does three things:
1. Creates a brand new, empty object in memory
2. Calls User.__init__(that_new_object, "Alice", "alice@mail.com", 25)
3. Returns the fully-initialized object to you

The 'self' parameter in __init__ is that brand new, empty object. You're literally building it up by attaching attributes to it: self.name = name writes "Alice" onto the blank canvas.

This is why __init__ doesn't have a return statement — it doesn't create the object, it just furnishes it. The actual object creation is handled by __new__ (which you rarely need to touch).`,
        codeExample: `class Weapon:
    def __init__(self, name, damage, rarity="common"):
        self.name = name        # Attach name to this object
        self.damage = damage    # Attach damage to this object
        self.rarity = rarity    # Attach rarity (with default)

# Build two objects from the same blueprint
sword = Weapon("Iron Sword", 25)
bow = Weapon("Elven Bow", 40, rarity="legendary")

print(sword.name)    # "Iron Sword"
print(bow.damage)    # 40
print(bow.rarity)    # "legendary"

# Each object is independent — changing one doesn't affect the other
sword.damage = 30
print(sword.damage)  # 30
print(bow.damage)    # Still 40`,
        analogy: "A class is like a cookie cutter. __init__ is the process of pressing the cutter into dough and decorating the cookie. The cookie cutter (class) doesn't change — but each cookie (object) can have different sprinkles (attribute values)."
      },
      {
        heading: "self — the explicit mirror",
        content: `In most languages, objects magically know who they are. In Python, every method must explicitly receive the object as its first argument — by convention called 'self'.

When you call sword.attack(), Python secretly translates it to Weapon.attack(sword). The object before the dot becomes the first argument. That's why every instance method starts with 'self' — it's literally the object being passed in.

This design was intentional. Python's philosophy is "explicit is better than implicit." By making 'self' visible, you always know you're operating on instance data, not some global variable.

'self' is not a keyword. You could name it 'this', 'me', or 'banana'. But using anything other than 'self' is considered a sin against readability.`,
        codeExample: `class Warrior:
    def __init__(self, name, hp=100):
        self.name = name
        self.hp = hp

    def take_damage(self, amount):
        self.hp -= amount
        print(f"{self.name} takes {amount} dmg! HP: {self.hp}")

    def is_alive(self):
        return self.hp > 0

hero = Warrior("Aragorn")
hero.take_damage(30)  # Aragorn takes 30 dmg! HP: 70

# What Python ACTUALLY does:
# Warrior.take_damage(hero, 30)  ← 'hero' becomes 'self'

# Both calls are identical:
Warrior.take_damage(hero, 20)  # Aragorn takes 20 dmg! HP: 50`,
        analogy: null
      },
      {
        heading: "Class vs Instance variables — the shared DNA trap",
        content: `Variables defined directly inside a class body (not inside __init__) are class variables — shared by ALL objects. Variables attached to self inside __init__ are instance variables — unique to each object.

This distinction is crucial and one of the most common bug sources. If you put a mutable object (like a list) as a class variable, ALL instances share that same list. Appending to it from one object affects every other object.

Python's lookup chain: when you access obj.attribute, Python first checks the instance dictionary, then the class dictionary, then parent classes. If you ASSIGN to obj.attribute, it always creates/updates in the instance dictionary — even if a class variable with that name exists. This creates a "shadow" that hides the class variable for that specific object.`,
        codeExample: `class Guild:
    # CLASS variable — ONE shared copy
    member_count = 0
    roster = []  # DANGER: shared mutable!

    def __init__(self, name):
        # INSTANCE variable — unique to each object
        self.name = name
        Guild.member_count += 1
        Guild.roster.append(name)

g1 = Guild("Alice")
g2 = Guild("Bob")

print(Guild.member_count)  # 2 (shared counter — OK)
print(g1.roster)  # ['Alice', 'Bob'] — BOTH names!
print(g2.roster)  # ['Alice', 'Bob'] — same list!

# The fix: make mutable data instance-level
class BetterGuild:
    member_count = 0  # Immutable shared — safe

    def __init__(self, name):
        self.name = name
        self.inventory = []  # Per-instance list — safe!
        BetterGuild.member_count += 1`,
        analogy: "Class variables are like a DNA trait shared by all members of a species. Instance variables are like personal belongings — each individual has their own. Putting a mutable list as a class variable is like giving the entire species one shared notebook — everyone writes in the same book."
      },
      {
        heading: "Inheritance — building on foundations",
        content: `Inheritance lets you create a new class that inherits all the attributes and methods of an existing class, then add or override specific behaviors. The parent class is called the "base" or "super" class. The child class "extends" it.

The key insight: inheritance models an "is-a" relationship. A Dog IS an Animal. A Mage IS a Character. If the relationship doesn't fit "is-a," you probably want composition (has-a) instead.

When you call a method on a child object, Python checks the child class first. If it doesn't find the method there, it walks up the inheritance chain to the parent, then the grandparent, and so on. This is called the Method Resolution Order (MRO).

The super() function calls the parent's version of a method. It's essential in __init__ to ensure the parent class gets properly initialized before the child adds its own attributes.`,
        codeExample: `class Character:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

    def take_damage(self, amount):
        self.hp -= amount
        return f"{self.name}: {self.hp} HP left"

class Mage(Character):  # Inherits from Character
    def __init__(self, name, hp, mana):
        super().__init__(name, hp)  # Initialize parent first
        self.mana = mana  # Then add child-specific attrs

    def cast_spell(self, cost):
        if self.mana >= cost:
            self.mana -= cost
            return f"{self.name} casts a spell! Mana: {self.mana}"
        return "Not enough mana!"

gandalf = Mage("Gandalf", 100, 50)
print(gandalf.take_damage(20))  # Inherited method works!
print(gandalf.cast_spell(15))   # Child-only method

# Check the inheritance chain:
print(isinstance(gandalf, Mage))       # True
print(isinstance(gandalf, Character))  # True (is-a!)`,
        analogy: "Inheritance is like a family recipe book. The grandparent wrote the base recipe (Character). The parent added spices (Mage adds mana). The child can use any recipe from any ancestor, or write new ones that override the old version."
      }
    ],

    connectedQuestIds: [102, 203, 108, 204, 205]
  },

  // ═══════════════════════════════════════════════════════════════
  // PATH 6: OOP ADVANCED & MASTERY
  // ═══════════════════════════════════════════════════════════════
  "oop-advanced": {
    id: "oop-advanced",
    icon: "⚔️",
    title: "OOP Advanced & Mastery",
    subtitle: "Dunder methods, polymorphism, composition — engineering with objects.",
    color: "from-google-red to-rose-700",
    accentColor: "red",
    tldr: `Once you understand classes and inheritance, the real power of Python OOP opens up. Dunder methods (double-underscore methods like __str__, __len__, __add__) let your objects behave like built-in types — you can make them printable, sortable, addable, and iterable. Polymorphism lets different classes respond to the same method call in different ways, eliminating massive if/elif chains. And composition ("has-a" instead of "is-a") is often a better architecture choice than inheritance for complex systems. This is where OOP stops being a textbook concept and becomes an engineering tool.`,

    sections: [
      {
        heading: "Dunder methods — making your objects behave like built-ins",
        content: `When you write print(my_obj), Python calls my_obj.__str__(). When you write len(my_obj), Python calls my_obj.__len__(). When you write obj_a + obj_b, Python calls obj_a.__add__(obj_b).

These "dunder" (double underscore) methods are hooks that let you plug your custom objects into Python's existing syntax. By implementing them, your objects can behave exactly like strings, lists, or numbers — they become first-class citizens of the language.

This isn't syntactic sugar. It's a deliberate design philosophy: Python's built-in operations are not hardcoded for built-in types. They're a protocol. Any object that implements the right dunder method can participate.

The most commonly used dunders are: __str__ (human-readable string), __repr__ (developer-readable string), __len__ (length), __getitem__ (bracket access), __eq__ (equality check), __lt__ (less-than for sorting), and __iter__/__next__ (iteration).`,
        codeExample: `class Inventory:
    def __init__(self):
        self.items = []

    def add(self, item):
        self.items.append(item)

    def __len__(self):
        return len(self.items)

    def __str__(self):
        return f"Inventory({len(self)} items): {self.items}"

    def __getitem__(self, index):
        return self.items[index]

    def __contains__(self, item):
        return item in self.items

    def __add__(self, other):
        combined = Inventory()
        combined.items = self.items + other.items
        return combined

bag = Inventory()
bag.add("sword")
bag.add("shield")

print(len(bag))         # 2 — calls __len__
print(bag)              # Inventory(2 items): ['sword', 'shield']
print(bag[0])           # "sword" — calls __getitem__
print("sword" in bag)   # True — calls __contains__

bag2 = Inventory()
bag2.add("potion")
merged = bag + bag2     # calls __add__
print(merged)           # Inventory(3 items): ['sword', 'shield', 'potion']`,
        analogy: "Dunder methods are like connectors on the back of a TV. If your object has an HDMI port (__str__), it can be plugged into print(). If it has a USB port (__len__), len() can read it. Each dunder is a standard connector that integrates with Python's ecosystem."
      },
      {
        heading: "Polymorphism — same interface, different behavior",
        content: `Polymorphism means "many forms." In OOP, it means different classes can respond to the same method name in their own way.

Why does this matter? Consider a game with different enemy types: Goblin, Dragon, Ghost. Each has an attack() method, but each attacks differently. Without polymorphism, you'd write a massive if/elif chain checking the type of each enemy. With polymorphism, you just call enemy.attack() and trust each class to do the right thing.

The real power is in writing code that doesn't care about the specific type. A function that takes any "attackable" object and calls attack() on it works with Goblins, Dragons, and any new enemy type you add in the future — without modifying existing code.

This is the Open/Closed Principle: your code should be open for extension (new enemy types) but closed for modification (the attack logic doesn't change).`,
        codeExample: `class Goblin:
    def attack(self):
        return "Goblin slashes for 10 damage!"

class Dragon:
    def attack(self):
        return "Dragon breathes fire for 50 damage!"

class Ghost:
    def attack(self):
        return "Ghost haunts for 15 psychic damage!"

# Polymorphism: this function works with ANY object
# that has an attack() method — no type checking!
def battle_round(enemies):
    for enemy in enemies:
        print(enemy.attack())

horde = [Goblin(), Dragon(), Ghost(), Goblin()]
battle_round(horde)
# Goblin slashes for 10 damage!
# Dragon breathes fire for 50 damage!
# Ghost haunts for 15 psychic damage!
# Goblin slashes for 10 damage!

# Add a new enemy? Just write the class.
# battle_round() works without any changes.`,
        analogy: "Polymorphism is like a universal remote control. You press the 'power' button, and each device (TV, speakers, lights) responds in its own way. The remote doesn't know or care how each device implements 'power' — it just sends the signal."
      },
      {
        heading: "Composition over inheritance — 'has-a' beats 'is-a'",
        content: `Inheritance says "A is a B." Composition says "A has a B." Both let you reuse code, but composition is usually more flexible.

Consider: does a Car "is-a" Engine? No. A Car "has-an" Engine. If you made Car inherit from Engine, you'd inherit exhaust methods, RPM attributes, and combustion logic that make no sense on a Car.

The rule of thumb: use inheritance when there's a genuine "is-a" relationship with shared behavior (a Cat IS an Animal). Use composition when one object owns or uses another (a Car HAS an Engine, a Character HAS an Inventory).

Deep inheritance hierarchies (5+ levels deep) become extremely difficult to maintain. Composition keeps things modular — you can swap out components like Lego bricks without reshaping the architecture.`,
        codeExample: `# COMPOSITION: Character HAS-A Weapon and HAS-A Inventory
class Weapon:
    def __init__(self, name, damage):
        self.name = name
        self.damage = damage

class Armor:
    def __init__(self, name, defense):
        self.name = name
        self.defense = defense

class Character:
    def __init__(self, name):
        self.name = name
        self.weapon = None   # HAS-A weapon (composition)
        self.armor = None    # HAS-A armor (composition)

    def equip_weapon(self, weapon):
        self.weapon = weapon

    def equip_armor(self, armor):
        self.armor = armor

    def stats(self):
        atk = self.weapon.damage if self.weapon else 0
        dfn = self.armor.defense if self.armor else 0
        return f"{self.name} | ATK: {atk} | DEF: {dfn}"

hero = Character("Aragorn")
hero.equip_weapon(Weapon("Andúril", 45))
hero.equip_armor(Armor("Mithril", 80))
print(hero.stats())  # Aragorn | ATK: 45 | DEF: 80

# Swap weapons at runtime — impossible with inheritance!
hero.equip_weapon(Weapon("Dagger", 15))
print(hero.stats())  # Aragorn | ATK: 15 | DEF: 80`,
        analogy: "Inheritance is like genetic traits — you're stuck with your parent's DNA. Composition is like equipment — you can swap out your sword for a bow anytime. In complex systems, swappable components beat rigid genetic inheritance."
      },
      {
        heading: "Properties — controlled attribute access",
        content: `Sometimes you want attributes that look like simple data access but actually run code behind the scenes. The @property decorator lets you define methods that are accessed like attributes — no parentheses needed.

This is useful for validation (reject negative HP), computed values (full_name from first + last), or lazy loading (only compute when first accessed).

In Java, you'd write getX() and setX() methods for everything. In Python, you start with plain attributes and only add @property when you need control. This keeps code clean while maintaining the ability to add logic later without changing the external interface.`,
        codeExample: `class Player:
    def __init__(self, name, hp=100):
        self.name = name
        self._hp = hp  # Underscore = "private by convention"

    @property
    def hp(self):
        return self._hp

    @hp.setter
    def hp(self, value):
        if value < 0:
            self._hp = 0
            print(f"{self.name} has fallen!")
        elif value > 100:
            self._hp = 100
        else:
            self._hp = value

    @property
    def status(self):
        if self._hp > 50:
            return "Healthy"
        elif self._hp > 0:
            return "Wounded"
        return "Dead"

hero = Player("Link")
hero.hp = 150      # Clamped to 100
print(hero.hp)     # 100
hero.hp = -10      # "Link has fallen!" → clamped to 0
print(hero.status) # "Dead" (computed on access)`,
        analogy: "A @property is like a smart thermostat. From the outside, you just set the temperature (hero.hp = 50). But behind the panel, it validates, clamps, and adjusts. You interact with a simple interface that secretly runs complex logic."
      },
      {
        heading: "Abstract classes and protocols",
        content: `Sometimes you want to define a contract: "any class that extends me MUST implement these methods." Abstract Base Classes (ABCs) enforce this at instantiation time.

If you create an abstract class with abstract methods and a subclass forgets to implement one, Python will raise a TypeError when you try to create an instance — catching the bug immediately rather than letting it lurk until runtime.

Python also supports informal protocols (duck typing): if it walks like a duck and quacks like a duck, it IS a duck. You don't need to inherit from an abstract class — you just need to implement the right methods. This is the "Pythonic" approach and is used more often than formal ABCs in practice.`,
        codeExample: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass  # No implementation — subclasses MUST provide one

    @abstractmethod
    def perimeter(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

    def perimeter(self):
        return 2 * 3.14159 * self.radius

# shape = Shape()  ← TypeError! Can't instantiate abstract class

circle = Circle(5)
print(circle.area())       # 78.54
print(circle.perimeter())  # 31.42

# Duck typing — no inheritance needed!
class Square:  # Not inheriting from Shape
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side ** 2

# Works with any object that has .area()
def print_area(shape):
    print(f"Area: {shape.area()}")

print_area(circle)      # Area: 78.54
print_area(Square(4))   # Area: 16 — duck typing!`,
        analogy: "An abstract class is like a job description: 'This role requires skills X and Y.' If the candidate (subclass) doesn't have them, they can't be hired (instantiated). Duck typing is like freelance work: nobody checks your resume, they just see if you can do the job."
      }
    ],

    connectedQuestIds: [206, 9, 207, 208, 6, 12, 14, 15]
  },

  // ═══════════════════════════════════════════════════════════════
  // PATH 7: DS — THE CORE FOUR
  // ═══════════════════════════════════════════════════════════════
  "ds-core-four": {
    id: "ds-core-four",
    icon: "🗄️",
    title: "DS: The Core Four",
    subtitle: "Arrays, Linked Lists, Stacks, Queues — the pillars of computer science.",
    color: "from-google-green to-teal-700",
    accentColor: "blue",
    tldr: `Every complex data structure in computer science is built from four fundamental building blocks: Arrays (contiguous memory for instant access), Linked Lists (scattered nodes chained by pointers for instant insertion), Stacks (last-in, first-out — the undo button), and Queues (first-in, first-out — the ticket line). You don't need to memorize algorithms. You need to understand these four structures so deeply that you can instantly recognize which one a problem is asking for. Build these from scratch in Python and you'll demystify 80% of interview questions.`,

    sections: [
      {
        heading: "Arrays — contiguous memory, instant access",
        content: `An array is the simplest data structure: a fixed block of contiguous memory cells, each holding one element. In Python, the list type IS an array under the hood (a dynamic array that resizes automatically).

The key property: because elements are stored next to each other in memory, accessing any element by index is O(1). The computer calculates the exact memory address with simple arithmetic: start_address + (index × element_size).

The tradeoff: insertion and deletion in the middle is O(n) because every subsequent element must shift. This is why appending to the end (amortized O(1)) is vastly preferred over inserting at the front (O(n)).

Understanding arrays means understanding memory layout. When you ask "why is list access fast?", the answer is "because all elements are next to each other in RAM, and we can jump to any position with math."`,
        codeExample: `# Python lists ARE dynamic arrays
arr = [10, 20, 30, 40, 50]

# O(1) access — instant
print(arr[3])  # 40

# O(1) amortized append — fast
arr.append(60)

# O(n) insert at front — slow! Everything shifts
arr.insert(0, 5)  # [5, 10, 20, 30, 40, 50, 60]

# Building your own minimal array (from scratch concept)
class SimpleArray:
    def __init__(self, capacity):
        self.data = [None] * capacity
        self.length = 0

    def get(self, index):
        if 0 <= index < self.length:
            return self.data[index]
        raise IndexError("Out of bounds")

    def push(self, value):
        self.data[self.length] = value
        self.length += 1`,
        analogy: "An array is like a row of parking spots in a lot. Each spot has a number, and you can drive directly to spot #42. But if someone needs to squeeze in between spots #5 and #6, every car from #6 onward has to move over one space."
      },
      {
        heading: "Linked Lists — scattered nodes, instant insertion",
        content: `A linked list is a chain of nodes scattered across memory. Each node holds two things: a value and a pointer (reference) to the next node. The list keeps track of the head (first node), and you traverse by following pointers.

The key advantage: insertion and deletion at any known position is O(1). You just rewire the pointers — no shifting needed. This makes linked lists ideal for situations where you're constantly inserting and removing from the front or middle.

The key disadvantage: there's no random access. To reach the 50th element, you must start at the head and walk through 49 nodes. Access is O(n).

In Python, you rarely use linked lists directly (lists are more practical for most tasks). But understanding them is essential because they're the building block for stacks, queues, hash table chaining, and graph adjacency lists.`,
        codeExample: `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None  # Pointer to next node

class LinkedList:
    def __init__(self):
        self.head = None

    def prepend(self, value):
        """O(1) — insert at front"""
        new_node = Node(value)
        new_node.next = self.head
        self.head = new_node

    def display(self):
        current = self.head
        parts = []
        while current:
            parts.append(str(current.value))
            current = current.next
        print(" → ".join(parts) + " → None")

    def search(self, target):
        """O(n) — must walk the chain"""
        current = self.head
        while current:
            if current.value == target:
                return True
            current = current.next
        return False

ll = LinkedList()
ll.prepend(30)
ll.prepend(20)
ll.prepend(10)
ll.display()  # 10 → 20 → 30 → None`,
        analogy: "A linked list is like a scavenger hunt. Each clue (node) has a message (value) and directions to the next clue (pointer). You can't jump to clue #7 — you have to follow the trail from the beginning."
      },
      {
        heading: "Stacks — Last In, First Out (LIFO)",
        content: `A stack is a container where you can only add and remove from the top. The last thing you put in is the first thing you take out — like a stack of plates.

Stacks are everywhere in computing:
- The call stack tracks function calls (that's why it's called a "stack overflow")
- Undo/redo in text editors
- Browser back button (history stack)
- Parsing expressions and matching brackets

The two operations are push (add to top) and pop (remove from top), both O(1). In Python, you can use a regular list as a stack: append() pushes, pop() pops.

The key insight: whenever a problem involves "most recent first" processing, reversal, or nested structure tracking, think stack.`,
        codeExample: `# Using a Python list as a stack
stack = []

# Push: add to top
stack.append("Page A")
stack.append("Page B")
stack.append("Page C")
print(stack)  # ['Page A', 'Page B', 'Page C']

# Pop: remove from top (LIFO)
last = stack.pop()
print(last)   # "Page C" — most recent
print(stack)  # ['Page A', 'Page B']

# Classic interview problem: balanced brackets
def is_balanced(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for char in s:
        if char in '([{':
            stack.append(char)
        elif char in ')]}':
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()
    return len(stack) == 0

print(is_balanced("({[]})"))   # True
print(is_balanced("({[)]}"))   # False`,
        analogy: "A stack is like a stack of plates in a cafeteria. You can only take the plate on top (pop) and can only add a new plate on top (push). You can't reach into the middle without removing everything above it."
      },
      {
        heading: "Queues — First In, First Out (FIFO)",
        content: `A queue is the opposite of a stack: the first thing you put in is the first thing you take out — like a line at a store.

Queues model real-world waiting lines:
- Print job queues
- Message queues in distributed systems (RabbitMQ, Kafka)
- Breadth-first search (BFS) in graphs
- Task scheduling in operating systems

The two operations are enqueue (add to back) and dequeue (remove from front). Using a Python list for this is inefficient — popping from the front is O(n) because everything shifts. Use collections.deque instead, which gives O(1) for both ends.

The key insight: whenever a problem involves "process in order" or "level-by-level traversal," think queue.`,
        codeExample: `from collections import deque

# A proper queue using deque (double-ended queue)
queue = deque()

# Enqueue: add to back
queue.append("Customer A")
queue.append("Customer B")
queue.append("Customer C")

# Dequeue: remove from front (FIFO)
first = queue.popleft()  # O(1)!
print(first)   # "Customer A" — first in line
print(queue)   # deque(['Customer B', 'Customer C'])

# BFS uses a queue!
def bfs(graph, start):
    visited = set()
    queue = deque([start])
    order = []
    while queue:
        node = queue.popleft()
        if node not in visited:
            visited.add(node)
            order.append(node)
            queue.extend(graph.get(node, []))
    return order

graph = {'A': ['B', 'C'], 'B': ['D'], 'C': ['D'], 'D': []}
print(bfs(graph, 'A'))  # ['A', 'B', 'C', 'D']`,
        analogy: "A queue is like the checkout line at a grocery store. The person who arrived first gets served first. Cutting the line (inserting at the front) is not allowed. New arrivals go to the back."
      },
      {
        heading: "Choosing the right one — the decision matrix",
        content: `Each of the Core Four optimizes for a different access pattern:

Array (Python list): When you need fast random access by index and mostly append to the end. Use for: database results, sorted data, general-purpose collections.

Linked List: When you need fast insertion/deletion at known positions and don't need random access. Use for: implementing other data structures (stacks, queues, LRU caches).

Stack: When you need "most recent first" processing. Use for: undo systems, expression parsing, DFS, backtracking algorithms.

Queue: When you need "first come, first served" processing. Use for: BFS, task scheduling, message passing, buffering.

In interviews, the first question to ask yourself is: "What access pattern does this problem need?" The answer often points directly to the right data structure.`,
        codeExample: null,
        analogy: "Arrays are bookshelves (jump to any position). Linked lists are treasure hunt trails (follow the chain). Stacks are plate piles (top only). Queues are checkout lines (first in, first out). Each exists because a different real-world pattern demands it."
      }
    ],

    connectedQuestIds: [301, 302, 303, 304, 305]
  },

  // ═══════════════════════════════════════════════════════════════
  // PATH 8: DS — COLLECTIONS ARMORY
  // ═══════════════════════════════════════════════════════════════
  "ds-collections": {
    id: "ds-collections",
    icon: "🧰",
    title: "DS: Collections Armory",
    subtitle: "defaultdict, Counter, deque, OrderedDict — Python's power tools.",
    color: "from-google-yellow to-orange-600",
    accentColor: "yellow",
    tldr: `Python's collections module contains specialized container types that solve common patterns far more elegantly than basic dicts and lists. defaultdict eliminates the "check if key exists" boilerplate. Counter counts things in one line. deque gives you a double-ended queue with O(1) operations on both ends. namedtuple gives you lightweight, immutable record types. These aren't obscure library tools — they're standard weapons that experienced Python developers reach for daily, and interviewers love testing them.`,

    sections: [
      {
        heading: "defaultdict — no more 'if key not in dict'",
        content: `The most common dict pattern is grouping: "for each item, add it to a list under its category." With a normal dict, you must check if the key exists first, or use setdefault(). With defaultdict, you just specify the default factory (list, int, set) and start using it.

When you access a missing key, defaultdict automatically creates it with the default value. defaultdict(list) creates empty lists. defaultdict(int) creates zeros. defaultdict(set) creates empty sets.

This eliminates an entire class of boilerplate and KeyError bugs.`,
        codeExample: `from collections import defaultdict

# WITHOUT defaultdict — verbose and error-prone
groups = {}
words = ["apple", "banana", "avocado", "blueberry", "cherry"]
for word in words:
    letter = word[0]
    if letter not in groups:
        groups[letter] = []
    groups[letter].append(word)

# WITH defaultdict — clean and safe
groups = defaultdict(list)
for word in words:
    groups[word[0]].append(word)  # Auto-creates list if missing

print(dict(groups))
# {'a': ['apple', 'avocado'], 'b': ['banana', 'blueberry'], 'c': ['cherry']}

# defaultdict(int) — perfect for counting
counts = defaultdict(int)
for char in "mississippi":
    counts[char] += 1  # Missing key auto-starts at 0
print(dict(counts))  # {'m': 1, 'i': 4, 's': 4, 'p': 2}`,
        analogy: "A defaultdict is like a filing cabinet where new folders magically appear when you try to file something in a category that doesn't exist yet. No need to create the folder first."
      },
      {
        heading: "Counter — counting made trivial",
        content: `Counter is a specialized dict subclass designed for counting hashable objects. Pass it any iterable and it instantly creates a frequency map. It also comes with powerful methods like most_common(), subtraction, and set-like operations.

Counter turns what would be a 5-line loop into a single line. It's the go-to tool for frequency analysis, vote counting, word frequency, and histogram data.`,
        codeExample: `from collections import Counter

# Count anything iterable in one line
letter_counts = Counter("engineering")
print(letter_counts)
# Counter({'e': 3, 'n': 3, 'i': 2, 'g': 2, 'r': 1})

# Most common elements
print(letter_counts.most_common(2))  # [('e', 3), ('n', 3)]

# Count from a list
votes = ["alice", "bob", "alice", "charlie", "bob", "alice"]
results = Counter(votes)
print(results.most_common(1))  # [('alice', 3)]

# Arithmetic with Counters
inventory_a = Counter(sword=3, shield=1, potion=5)
inventory_b = Counter(sword=1, potion=2, bow=1)
print(inventory_a - inventory_b)
# Counter({'potion': 3, 'sword': 2, 'shield': 1})
print(inventory_a + inventory_b)
# Counter({'potion': 7, 'sword': 4, 'shield': 1, 'bow': 1})`,
        analogy: "Counter is like a ballot counter at an election. Dump in all the votes, and it instantly tells you who got how many — sorted by popularity."
      },
      {
        heading: "deque — the double-ended powerhouse",
        content: `A deque (pronounced "deck") is a double-ended queue that supports O(1) append and pop from both ends. Python lists are great for appending to the right, but popping from the left is O(n). deque fixes this.

deque also supports a maxlen parameter that creates a fixed-size buffer: when full, adding to one end automatically drops from the opposite end. This is perfect for "last N items" patterns (recent history, sliding windows, logs).`,
        codeExample: `from collections import deque

# O(1) on both ends
d = deque([1, 2, 3])
d.appendleft(0)    # Add to front: O(1)
d.append(4)        # Add to back: O(1)
d.popleft()        # Remove from front: O(1)
print(d)  # deque([1, 2, 3, 4])

# Fixed-size buffer: keeps last N items
recent_logs = deque(maxlen=3)
recent_logs.append("login")
recent_logs.append("page_view")
recent_logs.append("click")
recent_logs.append("scroll")  # "login" is auto-dropped!
print(recent_logs)  # deque(['page_view', 'click', 'scroll'])

# Rotation
d = deque([1, 2, 3, 4, 5])
d.rotate(2)   # Rotate right by 2
print(d)      # deque([4, 5, 1, 2, 3])
d.rotate(-1)  # Rotate left by 1
print(d)      # deque([5, 1, 2, 3, 4])`,
        analogy: "A deque is like a train that can load and unload passengers from both doors simultaneously. A regular list is like a bus with only a back door — loading from the front requires everyone to shuffle."
      },
      {
        heading: "namedtuple — lightweight data records",
        content: `A namedtuple creates a simple class with named fields, immutability, and a readable repr — all in one line. It's perfect for representing structured records (database rows, coordinates, API responses) without the boilerplate of writing a full class.

namedtuples are memory-efficient (same as regular tuples), hashable (can be dict keys), and support both attribute access (point.x) and index access (point[0]). They're the lightweight alternative when you need a simple data carrier but don't need methods.`,
        codeExample: `from collections import namedtuple

# Define a record type in one line
Point = namedtuple('Point', ['x', 'y'])
Color = namedtuple('Color', 'red green blue')

p = Point(10, 20)
print(p.x, p.y)    # 10 20 (named access)
print(p[0], p[1])  # 10 20 (index access)

# Immutable — safe!
# p.x = 99  ← AttributeError!

# Great for database-style records
Player = namedtuple('Player', 'name score level')
leaderboard = [
    Player("Alice", 9500, 42),
    Player("Bob", 8700, 38),
    Player("Charlie", 9200, 40),
]

# Sort by score descending
top = sorted(leaderboard, key=lambda p: -p.score)
for p in top:
    print(f"{p.name}: {p.score} (Lv.{p.level})")`,
        analogy: "A namedtuple is like a printed form with labeled fields (Name: ___, Age: ___). Once filled in, you can't erase it (immutable), but reading any field is instant and self-documenting."
      }
    ],

    connectedQuestIds: [306, 307, 308, 309, 310]
  },

  // ═══════════════════════════════════════════════════════════════
  // PATH 9: DS — INTERVIEW CRUSHERS
  // ═══════════════════════════════════════════════════════════════
  "ds-interview": {
    id: "ds-interview",
    icon: "💀",
    title: "DS: Interview Crushers",
    subtitle: "Trees, Heaps, Hash Tables, Graphs — the structures interviewers love.",
    color: "from-google-red to-red-900",
    accentColor: "red",
    tldr: `Tech interviews at top companies are designed around a small set of data structures: hash tables (dictionaries), trees (hierarchical data), heaps (priority queues), and graphs (networks of connections). These aren't abstract academic exercises — they model real systems (file systems are trees, social networks are graphs, task schedulers use heaps). Understanding them means you can look at any interview problem and immediately recognize the underlying structure, reducing a "hard" problem to a pattern you've seen before.`,

    sections: [
      {
        heading: "Hash Tables — the O(1) lookup engine",
        content: `A hash table (Python's dict) is arguably the most important data structure in all of software engineering. It provides average O(1) lookup, insertion, and deletion — near-instant operations regardless of size.

How it works: take a key, run it through a hash function that converts it to a number, use that number as an index into an internal array. To handle collisions (two keys hashing to the same index), Python uses open addressing with probing.

Hash tables power: database indexing, caching (Redis, Memcached), Python's own namespaces (every variable lookup is a hash table lookup), sets, counters, and frequency analysis.

In interviews, anytime a problem asks "find if X exists" or "count occurrences" or "group by Y," your first thought should be hash table.`,
        codeExample: `# Python dicts ARE hash tables
# Building one conceptually from scratch:
class SimpleHashTable:
    def __init__(self, size=100):
        self.size = size
        self.table = [[] for _ in range(size)]  # Array of buckets

    def _hash(self, key):
        return hash(key) % self.size

    def set(self, key, value):
        idx = self._hash(key)
        # Check if key already exists in bucket
        for i, (k, v) in enumerate(self.table[idx]):
            if k == key:
                self.table[idx][i] = (key, value)
                return
        self.table[idx].append((key, value))

    def get(self, key):
        idx = self._hash(key)
        for k, v in self.table[idx]:
            if k == key:
                return v
        raise KeyError(key)

ht = SimpleHashTable()
ht.set("name", "Alice")
ht.set("level", 42)
print(ht.get("name"))   # "Alice" — O(1) average!`,
        analogy: "A hash table is like a coat check at a theater. You hand over your coat (value) and get a numbered ticket (hash). To retrieve your coat, you just show the ticket — the attendant walks directly to that number. No searching through all the coats."
      },
      {
        heading: "Binary Trees — hierarchical thinking",
        content: `A binary tree is a structure where each node has at most two children (left and right). A Binary Search Tree (BST) adds an ordering rule: left children are smaller, right children are larger. This enables O(log n) search — you eliminate half the remaining options at each step.

Trees model real-world hierarchies: file systems (directories contain files), HTML DOM (elements contain children), organizational charts, and decision trees in ML.

The three classic traversals — inorder (left, root, right), preorder (root, left, right), postorder (left, right, root) — are the foundation of tree-based interview problems. Inorder on a BST gives sorted output.`,
        codeExample: `class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, value):
        if not self.root:
            self.root = TreeNode(value)
        else:
            self._insert(self.root, value)

    def _insert(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = TreeNode(value)
            else:
                self._insert(node.left, value)
        else:
            if node.right is None:
                node.right = TreeNode(value)
            else:
                self._insert(node.right, value)

    def inorder(self, node=None, first=True):
        if first:
            node = self.root
        if node:
            yield from self.inorder(node.left, False)
            yield node.value
            yield from self.inorder(node.right, False)

tree = BST()
for val in [5, 3, 7, 1, 4, 6, 8]:
    tree.insert(val)

print(list(tree.inorder()))  # [1, 3, 4, 5, 6, 7, 8] — sorted!`,
        analogy: "A BST is like a 'guess my number' game. At each guess, you're told 'higher' or 'lower,' and you eliminate half the possibilities. That's why search is O(log n) — you halve the remaining options at each step."
      },
      {
        heading: "Heaps — priority queues",
        content: `A heap is a complete binary tree where the parent is always smaller (min-heap) or larger (max-heap) than its children. The root is always the extreme value — the smallest or largest element.

Heaps power priority queues: "always give me the most important/urgent item." Insertion and extraction are both O(log n). Checking the min/max is O(1).

Real-world uses: task schedulers (process highest-priority task), Dijkstra's shortest path algorithm, finding the K largest/smallest elements, median-finding.

Python's heapq module provides a min-heap. For a max-heap, negate your values.`,
        codeExample: `import heapq

# Min-heap: smallest element always at the top
tasks = []
heapq.heappush(tasks, (3, "wash dishes"))
heapq.heappush(tasks, (1, "fix critical bug"))
heapq.heappush(tasks, (2, "reply to email"))

# Always processes most urgent first
while tasks:
    priority, task = heapq.heappop(tasks)
    print(f"[Priority {priority}] {task}")
# [Priority 1] fix critical bug
# [Priority 2] reply to email
# [Priority 3] wash dishes

# Find K largest elements efficiently
scores = [85, 92, 78, 95, 88, 91, 76, 99]
top_3 = heapq.nlargest(3, scores)
print(top_3)  # [99, 95, 92]

# nsmallest for bottom-K
bottom_2 = heapq.nsmallest(2, scores)
print(bottom_2)  # [76, 78]`,
        analogy: "A heap is like an emergency room triage system. Patients aren't served in arrival order — the most critical case always gets treated first. Adding a new patient (push) and treating the next one (pop) are both fast operations."
      },
      {
        heading: "Graphs — networks of everything",
        content: `A graph is a set of nodes (vertices) connected by edges. Unlike trees, graphs can have cycles, multiple paths between nodes, and no hierarchy. They model the real world more accurately than any other data structure.

Social networks (people connected by friendships), road maps (cities connected by roads), the internet (pages connected by links), dependency systems (packages requiring other packages) — all graphs.

The two standard representations: adjacency list (dict of neighbor lists — space-efficient for sparse graphs) and adjacency matrix (2D array — fast lookups for dense graphs).

The two fundamental traversals: BFS (breadth-first — explore level by level, uses a queue) and DFS (depth-first — explore as deep as possible, uses a stack/recursion). BFS finds shortest paths in unweighted graphs. DFS detects cycles and explores connected components.`,
        codeExample: `from collections import deque

# Adjacency list representation
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E'],
}

# BFS: level-by-level (shortest path in unweighted graphs)
def bfs(graph, start, target):
    visited = {start}
    queue = deque([(start, [start])])
    while queue:
        node, path = queue.popleft()
        if node == target:
            return path
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    return None

print(bfs(graph, 'A', 'F'))  # ['A', 'C', 'F'] — shortest!

# DFS: go deep (cycle detection, exhaustive search)
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    print(start, end=' ')
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

dfs(graph, 'A')  # A B D E F C`,
        analogy: "BFS is like a ripple on water — it expands outward evenly in all directions, level by level. DFS is like exploring a maze — you go as deep as you can down one path before backtracking."
      }
    ],

    connectedQuestIds: [311, 312, 313, 314, 315, 316, 317]
  },

  // ═══════════════════════════════════════════════════════════════
  // PATH 10: DS — PRODUCTION PATTERNS
  // ═══════════════════════════════════════════════════════════════
  "ds-production": {
    id: "ds-production",
    icon: "🏭",
    title: "DS: Production Patterns",
    subtitle: "LRU caches, tries, bloom filters — patterns from real systems.",
    color: "from-google-blue to-indigo-700",
    accentColor: "green",
    tldr: `Production systems at scale use specialized data structures that go beyond textbook fundamentals. LRU caches evict the least-recently-used item when memory is full — this is how every browser, CDN, and database cache works. Tries enable lightning-fast prefix matching for autocomplete and routing. These aren't exotic — they're the specific patterns that power the tools you use every day. Understanding them bridges the gap between "I can solve algorithm problems" and "I understand how real systems work."`,

    sections: [
      {
        heading: "LRU Cache — evicting the least-recently-used",
        content: `An LRU (Least Recently Used) cache stores a fixed number of items. When the cache is full and a new item arrives, the item that was accessed LEAST recently gets evicted. This works because of the principle of temporal locality: if you used something recently, you're likely to use it again soon.

The implementation combines a hash table (for O(1) lookups) with a doubly-linked list (for O(1) reordering). When an item is accessed, it moves to the front of the list. When eviction is needed, the item at the back (least recently used) is removed.

Python provides this out of the box with functools.lru_cache as a decorator, and collections.OrderedDict can be used to build one manually. Understanding the mechanics is essential for system design interviews.`,
        codeExample: `from functools import lru_cache
from collections import OrderedDict

# Built-in LRU cache decorator
@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(100))  # Instant! Without cache: heat death of universe

# Manual LRU Cache implementation
class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)  # Mark as recently used
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Evict LRU

cache = LRUCache(3)
cache.put("a", 1)
cache.put("b", 2)
cache.put("c", 3)
cache.get("a")        # Moves "a" to most-recent
cache.put("d", 4)     # Evicts "b" (least recently used)
print(cache.get("b")) # -1 (evicted!)`,
        analogy: "An LRU cache is like a small bookshelf by your desk. It holds your 5 most-recently read books. When you pick up a new book, the one you haven't touched in the longest time falls off the shelf to make room."
      },
      {
        heading: "Tries — prefix trees for autocomplete",
        content: `A trie (pronounced "try") is a tree where each edge represents a character and each path from root to a marked node represents a complete word. Tries enable O(k) prefix lookups where k is the length of the prefix — regardless of how many words are stored.

Tries power: search autocomplete (Google suggestions), spell checkers, IP routing tables, dictionary implementation, and T9 predictive text.

The key insight: unlike a hash table which gives you exact match lookups, a trie gives you PREFIX match lookups. "Find all words starting with 'prog'" is trivial with a trie but expensive with a hash table.`,
        codeExample: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word):
        node = self._find(word)
        return node is not None and node.is_end

    def starts_with(self, prefix):
        return self._find(prefix) is not None

    def _find(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node

    def autocomplete(self, prefix):
        node = self._find(prefix)
        if not node:
            return []
        results = []
        self._collect(node, prefix, results)
        return results

    def _collect(self, node, prefix, results):
        if node.is_end:
            results.append(prefix)
        for char, child in node.children.items():
            self._collect(child, prefix + char, results)

t = Trie()
for word in ["python", "pytorch", "pydantic", "java", "javascript"]:
    t.insert(word)

print(t.autocomplete("py"))   # ['python', 'pytorch', 'pydantic']
print(t.autocomplete("java")) # ['java', 'javascript']`,
        analogy: "A trie is like a phone tree menu system. Press 1 for Sales, then 2 for Enterprise, then 3 for Billing — each keypress narrows down the options. You share the early path with everyone, then branch off at the point of difference."
      },
      {
        heading: "Sliding windows and two pointers — array mastery",
        content: `These aren't data structures but algorithmic patterns that use arrays in clever ways. They're responsible for solving a huge category of interview problems in O(n) that would otherwise require O(n²).

Sliding window: maintain a "window" of elements (often defined by two indices) and slide it across the array. Each slide adds one element and removes one, maintaining running totals/counts without recomputing from scratch.

Two pointers: use two indices moving toward each other (or in the same direction at different speeds) to find pairs, partition data, or detect conditions.

These patterns are the most frequently tested in coding interviews after basic hash table and tree traversal problems.`,
        codeExample: `# SLIDING WINDOW: max sum of k consecutive elements
def max_sum_subarray(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]  # Slide!
        max_sum = max(max_sum, window_sum)
    return max_sum

print(max_sum_subarray([2, 1, 5, 1, 3, 2], 3))  # 9 (5+1+3)

# TWO POINTERS: find pair that sums to target (sorted array)
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        current = arr[left] + arr[right]
        if current == target:
            return (left, right)
        elif current < target:
            left += 1
        else:
            right -= 1
    return None

print(two_sum_sorted([1, 3, 5, 7, 9, 11], 12))  # (1, 4) → 3+9

# SLIDING WINDOW: longest substring without repeats
def longest_unique_substr(s):
    seen = {}
    start = 0
    max_len = 0
    for end, char in enumerate(s):
        if char in seen and seen[char] >= start:
            start = seen[char] + 1
        seen[char] = end
        max_len = max(max_len, end - start + 1)
    return max_len

print(longest_unique_substr("abcabcbb"))  # 3 ("abc")`,
        analogy: "A sliding window is like looking through a magnifying glass that you slide across a page — you see a fixed-width section at a time, and each slide reveals one new character while one old character leaves. Two pointers are like two people starting at opposite ends of a hallway, walking toward each other until they meet."
      }
    ],

    connectedQuestIds: [318, 319, 320]
  },

};

// ═══════════════════════════════════════════════════════════════
// Utility: Get all topics as an array for the grid
// ═══════════════════════════════════════════════════════════════
export const topicList = Object.values(theory);
