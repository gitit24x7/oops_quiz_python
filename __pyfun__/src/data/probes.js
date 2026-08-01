/**
 * src/data/probes.js
 * 
 * DESCRIPTION:
 * Exploit Lab probe chains for each quest, keyed by quest ID.
 * Each probe chain is an array of escalating "What If?" investigations
 * that build on top of the main lesson's revealed concept.
 * 
 * STRUCTURE:
 * probes[questId] = [
 *   { id, question, code, deduction },
 *   ...
 *   { id, type: 'exploit', question, code, deduction, badge }
 * ]
 */

export const probes = {
  // ═══════════════════════════════════════════════
  // Ch 1.1 — dict.get() vs [] (quest id: 104)
  // ═══════════════════════════════════════════════
  104: [
    {
      id: 'p1',
      question: 'You saw that dict["missing_key"] crashes. But what if you chain .get() calls? Can you safely navigate a nested dict without any crashes?',
      code: `config = {
    'database': {
        'host': 'localhost',
        'port': 5432
    }
}

# Safe way to access nested keys?
host = config.get('database', {}).get('host', 'unknown')
timeout = config.get('database', {}).get('timeout', 30)
missing = config.get('cache', {}).get('ttl', 60)

print(f"host: {host}")
print(f"timeout: {timeout}")
print(f"missing section: {missing}")`,
      deduction: 'Chaining .get() with {} as fallback lets you safely navigate arbitrarily deep nested dicts. Each .get() returns a safe empty dict if the key is missing, allowing the next .get() to proceed. This is how production config parsers work.'
    },
    {
      id: 'p2',
      question: 'What if you use .get() but the key EXISTS with value None? Does .get() use the default or return None?',
      code: `user = {
    'name': 'Alice',
    'email': None,       # Key exists, but value is None
    'age': 0,            # Key exists, but value is falsy
    'bio': '',           # Key exists, but value is empty string
}

print(user.get('email', 'no-email'))
print(user.get('age', 99))
print(user.get('bio', 'no bio'))
print(user.get('phone', 'no phone'))`,
      deduction: '.get() only uses the default when the KEY IS MISSING. If the key exists with None, 0, or "" as the value, .get() returns that value — NOT the default. This catches many developers off guard when handling API responses with null fields.'
    },
    {
      id: 'p3',
      question: 'Dictionaries have another dangerous method: .setdefault(). It reads AND writes in one call. What does it actually do?',
      code: `inventory = {}

# setdefault: if key missing, SET it, then return the value
inventory.setdefault('potions', []).append('healing')
inventory.setdefault('potions', []).append('mana')
inventory.setdefault('weapons', []).append('sword')

print(inventory)

# Compare: what would happen with plain []?
broken = {}
broken['potions'] = broken.get('potions', []) + ['healing']
broken['potions'] = broken.get('potions', []) + ['mana']
print(f"Same result? {broken}")`,
      deduction: '.setdefault() atomically checks AND inserts in one operation. It returns the existing value if the key exists, or sets and returns the default if it doesn\'t. This is the idiomatic pattern for building "group by" operations and adjacency lists.'
    },
    {
      id: 'exploit',
      type: 'exploit',
      question: '🧠 EXPLOIT CHALLENGE: Build a word frequency counter in ONE line using .get(). Count how many times each word appears: "the cat sat on the mat the cat"',
      code: `sentence = "the cat sat on the mat the cat"

# Build the counter using ONLY .get() — no collections.Counter, no if/else
counts = {}
for word in sentence.split():
    # Your one-liner here using .get()
    pass

print(counts)
# Expected: {'the': 3, 'cat': 2, 'sat': 1, 'on': 1, 'mat': 1}`,
      deduction: 'counts[word] = counts.get(word, 0) + 1 — this one-liner is the fundamental pattern behind frequency analysis, vote counting, and histogram building. You just reimplemented the core of collections.Counter.',
      badge: 'The Frequency Analyst'
    }
  ],

  // ═══════════════════════════════════════════════
  // Ch 1.2 — List Comprehensions (quest id: 107)
  // ═══════════════════════════════════════════════
  107: [
    {
      id: 'p1',
      question: 'List comprehensions look like magic one-liners. But are they actually FASTER than a regular for loop? Let\'s measure.',
      code: `import time

# Method 1: For loop
start = time.time()
result1 = []
for i in range(1_000_000):
    result1.append(i ** 2)
loop_time = time.time() - start

# Method 2: List comprehension
start = time.time()
result2 = [i ** 2 for i in range(1_000_000)]
comp_time = time.time() - start

print(f"For loop:      {loop_time:.4f}s")
print(f"Comprehension: {comp_time:.4f}s")
print(f"Speedup:       {loop_time / comp_time:.1f}x faster")`,
      deduction: 'List comprehensions are genuinely faster — typically 20-40% in CPython. The speedup comes from avoiding repeated .append() method lookups and using an optimized C-level internal loop. This is not just syntactic sugar; it\'s a real performance advantage.'
    },
    {
      id: 'p2',
      question: 'Can you NEST comprehensions? What does a comprehension inside a comprehension produce?',
      code: `# Flatten a matrix (list of lists) into a single list
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# Nested comprehension — which loop is "outer"?
flat = [num for row in matrix for num in row]
print(f"Flattened: {flat}")

# Comprehension that CREATES a 2D grid
grid = [[col * row for col in range(1, 4)] for row in range(1, 4)]
print(f"Grid: {grid}")

# Which is which? Reading order matters!`,
      deduction: 'In a nested comprehension, loops read LEFT to RIGHT: `for row in matrix` is the outer loop, `for num in row` is the inner loop. But when comprehensions are nested inside each other (grid example), the INNER comprehension produces each row. The reading order matches how you\'d write it as nested for-loops.'
    },
    {
      id: 'p3',
      question: 'Comprehensions work for lists. But what about dicts and sets? Can you comprehend THOSE too?',
      code: `names = ['Alice', 'Bob', 'Charlie', 'Alice', 'Bob']
scores = [85, 92, 78, 90, 88]

# Dict comprehension
name_scores = {name: score for name, score in zip(names, scores)}
print(f"Dict: {name_scores}")
print(f"Notice: duplicate keys?")

# Set comprehension
unique_lengths = {len(name) for name in names}
print(f"Set: {unique_lengths}")

# Generator expression (NOT a tuple comprehension!)
gen = (x**2 for x in range(5))
print(f"Generator: {gen}")
print(f"List from gen: {list(gen)}")`,
      deduction: 'Dict comprehensions use {k: v for ...}, set comprehensions use {x for ...}, but (x for ...) creates a GENERATOR, not a tuple! There is no tuple comprehension. This is a classic interview trick question.'
    },
    {
      id: 'exploit',
      type: 'exploit',
      question: '🧠 EXPLOIT CHALLENGE: Write a one-liner that takes a sentence and returns a dict mapping each word to its reverse, but ONLY for words longer than 3 characters. Use a dict comprehension with a filter.',
      code: `sentence = "the quick brown fox jumps over the lazy dog"

# One-liner dict comprehension with condition
result = # Your code here

print(result)
# Expected: {'quick': 'kciuq', 'brown': 'nworb', 'jumps': 'spmuj', 'over': 'revo', 'lazy': 'yzal'}`,
      deduction: '{word: word[::-1] for word in sentence.split() if len(word) > 3} — Comprehensions with filters are the Pythonic replacement for map() + filter() chains. Mastering this one pattern handles 80% of data transformation tasks in production code.',
      badge: 'The Comprehension Weaver'
    }
  ],

  // ═══════════════════════════════════════════════
  // Ch 1.3 — zip() & enumerate() (quest id: 109)
  // ═══════════════════════════════════════════════
  109: [
    {
      id: 'p1',
      question: 'zip() pairs two lists. But what happens when the lists have DIFFERENT lengths? Does it crash, pad, or silently truncate?',
      code: `names = ['Alice', 'Bob', 'Charlie', 'Diana']
scores = [85, 92, 78]

paired = list(zip(names, scores))
print(f"Paired: {paired}")
print(f"Length: {len(paired)}")
print(f"Diana is missing!")

# What if you WANT to keep the extra elements?
from itertools import zip_longest
full = list(zip_longest(names, scores, fillvalue='N/A'))
print(f"Full: {full}")`,
      deduction: 'zip() SILENTLY TRUNCATES to the shortest iterable. No error, no warning — the extra elements simply vanish. This is a data-loss bug in disguise. Use itertools.zip_longest() when you need to preserve all elements.'
    },
    {
      id: 'p2',
      question: 'enumerate() gives you index + value. But can you start from a number other than 0? And can you enumerate a zip()?',
      code: `teams = ['Alpha', 'Beta', 'Gamma']
scores = [100, 85, 92]

# Start numbering from 1 (not 0)
for rank, (team, score) in enumerate(zip(teams, scores), start=1):
    print(f"#{rank}: {team} — {score} pts")

print()

# Enumerate a string
for i, char in enumerate("PYTHON"):
    print(f"  Index {i}: '{char}'")`,
      deduction: 'enumerate(iterable, start=1) is the production replacement for the C-style range(len(x)) pattern. You can enumerate ANYTHING iterable — lists, strings, zip results, generators, even file handles line by line.'
    },
    {
      id: 'p3',
      question: 'zip() creates pairs. But can you UNZIP — turn pairs back into separate lists?',
      code: `pairs = [('Alice', 85), ('Bob', 92), ('Charlie', 78)]

# Unzip using * unpacking
names, scores = zip(*pairs)

print(f"Names:  {names}")
print(f"Scores: {scores}")
print(f"Types:  {type(names)}")

# Convert to lists if needed
names_list = list(names)
print(f"As list: {names_list}")`,
      deduction: 'zip(*pairs) is the INVERSE of zip(). The * unpacks the list of tuples into separate arguments. This transpose operation is a one-liner that replaces loops in data processing, CSV parsing, and matrix operations.'
    },
    {
      id: 'exploit',
      type: 'exploit',
      question: '🧠 EXPLOIT CHALLENGE: Build a function that takes two lists and returns a dict, but if a key appears twice, it keeps the LAST value (not the first). Use zip() and dict().',
      code: `keys = ['a', 'b', 'c', 'a', 'b']
vals = [1, 2, 3, 4, 5]

# Your one-liner using zip + dict
result = # Your code here

print(result)
# Expected: {'a': 4, 'b': 5, 'c': 3}
# Because 'a' appears twice, last value (4) wins`,
      deduction: 'dict(zip(keys, vals)) — when duplicate keys exist, the LAST value wins because dict() iterates through pairs sequentially, overwriting earlier entries. This is the standard pattern for merging configuration sources (defaults → user → overrides).',
      badge: 'The Zipper Master'
    }
  ],

  // ═══════════════════════════════════════════════
  // Ch 1.4 — Mutable Default Arguments (quest id: 1)
  // ═══════════════════════════════════════════════
  1: [
    {
      id: 'p1',
      question: 'You saw two players sharing a potion bag. What if you called create_player() 100 times? How many potions would the LAST player have?',
      code: `def create_player(name, inventory=[]):
    inventory.append('potion')
    return {'name': name, 'bag': inventory}

# Summon 100 players
for i in range(100):
    player = create_player(f'Player_{i}')

print(f"Last player's bag has {len(player['bag'])} potions")
print(f"First 5: {player['bag'][:5]}")`,
      deduction: 'Default mutable objects accumulate state silently across EVERY call. This is not a "sometimes" bug — it is deterministic and scales linearly.'
    },
    {
      id: 'p2',
      question: 'Does this only happen with lists? What if the default is a dictionary instead?',
      code: `def register_user(name, metadata={}):
    metadata['name'] = name
    metadata['visits'] = metadata.get('visits', 0) + 1
    return metadata

alice = register_user('Alice')
bob = register_user('Bob')

print(f"Alice's data: {alice}")
print(f"Bob's data: {bob}")
print(f"Same object? {alice is bob}")`,
      deduction: 'ANY mutable default (list, dict, set) is shared. The type doesn\'t matter — the behavior is about mutability, not the specific container.'
    },
    {
      id: 'p3',
      question: 'What about immutable defaults? Try using a tuple or an integer. Does the bug still exist?',
      code: `def safe_function(name, count=0, label="default"):
    count += 1
    label = label + "!"
    return {'name': name, 'count': count, 'label': label}

a = safe_function('Alice')
b = safe_function('Bob')

print(f"Alice: {a}")
print(f"Bob: {b}")
print("No shared state!")`,
      deduction: 'Immutable defaults (int, str, tuple) are safe because += and + create NEW objects instead of modifying in-place. The original default is never touched.'
    },
    {
      id: 'p4',
      question: 'The standard fix is `inventory=None`. But WHY does that work? What is None doing differently?',
      code: `def create_player(name, inventory=None):
    if inventory is None:
        inventory = []  # Fresh list created HERE, inside the call
    inventory.append('potion')
    return {'name': name, 'bag': inventory}

p1 = create_player('Alice')
p2 = create_player('Bob')

print(f"Alice: {p1['bag']}")
print(f"Bob: {p2['bag']}")
print(f"Same object? {p1['bag'] is p2['bag']}")`,
      deduction: 'None is immutable and acts as a sentinel. The actual list creation happens INSIDE the function body (at call time), not in the function signature (at definition time). This is the universal production fix.'
    },
    {
      id: 'exploit',
      type: 'exploit',
      question: '🧠 EXPLOIT CHALLENGE: The "bug" persists state across calls. Can you WEAPONIZE this? Build a function that counts how many times it has been called — WITHOUT using any global variable, class, or closure.',
      code: `# Your mission: make this work using ONLY a mutable default
def call_counter(count_tracker=      ):  # Fill in the default
    # Your code here
    pass

print(call_counter())  # Should print: 1
print(call_counter())  # Should print: 2
print(call_counter())  # Should print: 3`,
      deduction: 'You just turned a "bug" into a feature. This mutable-default-as-hidden-state pattern is the principle behind simple memoization caches and is exactly how some internal Python optimizations work.',
      badge: 'The Phantom Counter'
    }
  ],

  // ═══════════════════════════════════════════════
  // Ch 4.1 — Basic Decorators (quest id: 103)
  // ═══════════════════════════════════════════════
  103: [
    {
      id: 'p1',
      question: 'A decorator replaces a function. But what IS the decorated name pointing to now? Check its __name__ attribute.',
      code: `def shout(func):
    def wrapper():
        return func().upper()
    return wrapper

@shout
def greet():
    return "hello world"

print(greet())
print(f"Function name: {greet.__name__}")
print(f"Type: {type(greet)}")`,
      deduction: 'After decoration, `greet` no longer points to the original function — it points to `wrapper`. The original identity is LOST. This breaks logging, debugging, and any code that checks function names.'
    },
    {
      id: 'p2',
      question: 'If the decorator steals the function name, can we stack MULTIPLE decorators? What order do they execute in?',
      code: `def bold(func):
    def wrapper():
        return f"<b>{func()}</b>"
    return wrapper

def italic(func):
    def wrapper():
        return f"<i>{func()}</i>"
    return wrapper

@bold
@italic
def say_hello():
    return "hello"

print(say_hello())
# Is it <b><i>hello</i></b> or <i><b>hello</b></i>?`,
      deduction: 'Decorators stack BOTTOM-UP. `@italic` wraps first, then `@bold` wraps the result. Reading top-to-bottom: bold(italic(say_hello)). The LAST decorator listed is the innermost wrapper.'
    },
    {
      id: 'p3',
      question: 'Decorators are just syntax sugar. Can you decorate a function WITHOUT using the @ symbol? What does @ actually do?',
      code: `def loud(func):
    def wrapper():
        result = func()
        return result.upper() + "!!!"
    return wrapper

# Method 1: Using @ syntax
@loud
def greet_a():
    return "hello"

# Method 2: Manual decoration (SAME thing)
def greet_b():
    return "hello"
greet_b = loud(greet_b)  # This IS what @ does

print(greet_a())
print(greet_b())
print(f"Identical? {greet_a() == greet_b()}")`,
      deduction: '`@decorator` is PURE syntax sugar for `func = decorator(func)`. There is no magic. Understanding this means you can decorate anything, anywhere — even functions defined by libraries you don\'t control.'
    },
    {
      id: 'exploit',
      type: 'exploit',
      question: '🧠 EXPLOIT CHALLENGE: Build a decorator called `@spy` that tracks how many times ANY decorated function has been called, and stores the count as an attribute ON the wrapper itself. After decorating, `greet.call_count` should return the number.',
      code: `# Build the @spy decorator
def spy(func):
    # Your code here — the wrapper needs a call_count attribute
    pass

@spy
def greet(name):
    return f"Hello, {name}!"

greet("Alice")
greet("Bob")
greet("Charlie")
print(f"greet was called {greet.call_count} times")  # Should print 3`,
      deduction: 'Functions are objects in Python — you can attach arbitrary attributes to them. This is how testing frameworks like `pytest` and monitoring tools track call counts, execution times, and error rates on decorated functions.',
      badge: 'The Function Spy'
    }
  ],

  // ═══════════════════════════════════════════════
  // Ch 5.2 — __init__ Deep Dive (quest id: 203)
  // ═══════════════════════════════════════════════
  203: [
    {
      id: 'p1',
      question: '__init__ receives `self`. But WHERE does self come from? Who creates the actual object?',
      code: `class Potion:
    def __new__(cls, name):
        print(f"__new__ called! Creating empty {cls.__name__}")
        instance = super().__new__(cls)
        print(f"  Object exists: {instance}")
        return instance

    def __init__(self, name):
        print(f"__init__ called! Filling in '{name}'")
        self.name = name

p = Potion("Healing")
print(f"\\nFinal: {p.name}")`,
      deduction: '__new__ is the TRUE constructor — it creates the empty object from nothing. __init__ is just the initializer that fills in attributes. When you write Potion(), Python calls __new__ FIRST, then passes the result to __init__ as self.'
    },
    {
      id: 'p2',
      question: 'If __init__ returns nothing (None), what happens if you accidentally write `return True` inside __init__?',
      code: `class Broken:
    def __init__(self):
        self.value = 42
        return True  # What happens?

try:
    b = Broken()
except TypeError as e:
    print(f"Error: {e}")`,
      deduction: '__init__ MUST return None. Python enforces this with a TypeError because __init__\'s job is to mutate self, not to create or return anything. This is why it\'s an initializer, not a constructor.'
    },
    {
      id: 'p3',
      question: 'Method chaining: `obj.do_a().do_b().do_c()`. How? What must each method return?',
      code: `class QueryBuilder:
    def __init__(self):
        self.query = "SELECT"
    
    def columns(self, cols):
        self.query += f" {cols}"
        return self  # THE KEY
    
    def from_table(self, table):
        self.query += f" FROM {table}"
        return self
    
    def where(self, condition):
        self.query += f" WHERE {condition}"
        return self

# One-liner chain!
sql = QueryBuilder().columns("*").from_table("users").where("age > 21").query
print(sql)`,
      deduction: 'Method chaining works by returning `self` from every method. This is how jQuery, SQLAlchemy, Pandas, and most modern APIs create fluent interfaces. Each method mutates the object AND hands it back for the next call.'
    },
    {
      id: 'exploit',
      type: 'exploit',
      question: '🧠 EXPLOIT CHALLENGE: __new__ controls object CREATION. Use this power to build a Singleton — a class that only ever creates ONE instance, and returns the same object every time you call it.',
      code: `class Singleton:
    _instance = None
    
    def __new__(cls):
        # Your code: only create if _instance is None
        pass
    
    def __init__(self):
        self.data = []

a = Singleton()
b = Singleton()
a.data.append("test")

print(f"Same object? {a is b}")       # Should be True
print(f"b sees a's data: {b.data}")    # Should be ['test']`,
      deduction: 'By overriding __new__, you control WHETHER an object is created at all. The Singleton pattern ensures only one instance exists globally — used in database connection pools, logging systems, and configuration managers.',
      badge: 'The Singleton Architect'
    }
  ],

  // ═══════════════════════════════════════════════
  // Ch 2.3 — Scope (UnboundLocalError) (quest id: 2)
  // ═══════════════════════════════════════════════
  2: [
    {
      id: 'p1',
      question: 'Python decided the variable was "local" before you assigned it. But WHEN does Python make this decision? At runtime or before?',
      code: `x = 10

def broken():
    print(f"x is {x}")  # This line LOOKS fine
    x = 20               # But THIS line changes everything

# Don't run broken() yet — just check:
import dis
print("=== Bytecode for broken() ===")
dis.dis(broken)`,
      deduction: 'Python scans the ENTIRE function body at COMPILE TIME (before any code runs). If it sees ANY assignment to `x` anywhere in the function, it marks `x` as local for the WHOLE function — even lines BEFORE the assignment. This is NOT a runtime decision.'
    },
    {
      id: 'p2',
      question: 'If `x = 20` makes the whole function treat x as local, what about `x += 1`? That\'s reading AND writing!',
      code: `counter = 0

def increment():
    counter += 1  # This is: counter = counter + 1
    return counter

try:
    increment()
except UnboundLocalError as e:
    print(f"Error: {e}")
    print("counter += 1 is actually: counter = counter + 1")
    print("The = makes it local, but then it reads 'counter' (local) which doesn't exist yet!")`,
      deduction: '`x += 1` is syntactic sugar for `x = x + 1`. The `=` on the left makes Python mark `x` as local. Then the `x` on the right tries to READ the local variable, which hasn\'t been assigned yet. This is the #1 Python gotcha in interviews.'
    },
    {
      id: 'exploit',
      type: 'exploit',
      question: '🧠 EXPLOIT CHALLENGE: You know `nonlocal` fixes closures, and `global` fixes globals. But can you use NEITHER and still modify an outer variable? Hint: think about mutating vs rebinding.',
      code: `def make_counter():
    count = [0]  # Why a list?
    
    def increment():
        # Modify count WITHOUT nonlocal or global
        # Your code here
        pass
    
    def get():
        return count[0]
    
    return increment, get

inc, get = make_counter()
inc()
inc()
inc()
print(f"Count: {get()}")  # Should print 3`,
      deduction: 'Mutating a container (count[0] += 1) is NOT the same as rebinding a name (count = ...). Only rebinding triggers the scope problem. This is why closures over lists/dicts work without nonlocal — you\'re changing the CONTENTS, not the reference itself.',
      badge: 'The Scope Hacker'
    }
  ],

  // ═══════════════════════════════════════════════
  // Ch 5.4 — Magic Methods (quest id: 204)
  // ═══════════════════════════════════════════════
  204: [
    {
      id: 'p1',
      question: 'If __len__ makes len() work, what happens if you make __len__ return a negative number or a string?',
      code: `class Weird:
    def __len__(self):
        return -5

class Weirder:
    def __len__(self):
        return "ten"

try:
    print(len(Weird()))
except ValueError as e:
    print(f"Negative len: {e}")

try:
    print(len(Weirder()))
except TypeError as e:
    print(f"String len: {e}")`,
      deduction: 'Python VALIDATES dunder return values! __len__ must return a non-negative integer. The interpreter has guardrails that enforce contracts even on your custom implementations. Duck typing has rules.'
    },
    {
      id: 'p2',
      question: 'If you implement __getitem__, does `for x in obj` work automatically? What about `in` operator?',
      code: `class MagicList:
    def __init__(self, items):
        self._items = items
    
    def __getitem__(self, index):
        return self._items[index]
    
    # No __iter__, no __contains__, no __len__!

ml = MagicList(['a', 'b', 'c'])

print("Iteration:", [x for x in ml])
print("Contains:", 'b' in ml)
print("Index:", ml[1])`,
      deduction: 'Implementing __getitem__ ALONE gives you iteration, containment, and indexing for FREE. Python\'s iterator protocol falls back to __getitem__ if __iter__ is missing. One dunder method unlocks three capabilities. This is the power of protocols.'
    },
    {
      id: 'exploit',
      type: 'exploit',
      question: '🧠 EXPLOIT CHALLENGE: Build a class where `+` adds elements, `==` compares contents, and you can use it in a `for` loop — all by implementing just THREE dunder methods.',
      code: `class Bag:
    def __init__(self, items=None):
        self._items = list(items) if items else []
    
    # Implement __add__, __eq__, __getitem__
    # Your code here

# Test it all:
a = Bag([1, 2])
b = Bag([3, 4])
c = a + b
print(f"Combined: {[x for x in c]}")  # [1, 2, 3, 4]
print(f"Equal? {a + b == Bag([1,2,3,4])}")  # True`,
      deduction: 'With just 3 dunder methods you\'ve built a custom container that works with Python\'s operators, loops, and comparisons. This is how numpy arrays, pandas Series, and pathlib.Path objects all feel "native" despite being third-party code.',
      badge: 'The Protocol Engineer'
    }
  ],

  // ═══════════════════════════════════════════════
  // Ch 1.5 — String Formatting (quest id: 5)
  // ═══════════════════════════════════════════════
  5: [
    { id: 'p1', question: 'f-strings can do more than insert values. Can they execute arbitrary EXPRESSIONS inside the braces?',
      code: `import math\nprint(f"Pi: {math.pi:.4f}")\nprint(f"2+2: {2+2}")\nprint(f"Upper: {'hello'.upper()}")\nprint(f"Ternary: {'even' if 10%2==0 else 'odd'}")\nprint(f"List: {[x**2 for x in range(5)]}")`,
      deduction: 'f-strings evaluate ANY valid Python expression inside {}, including function calls, methods, ternaries, and even comprehensions. This makes them far more powerful than .format() or %-formatting.' },
    { id: 'p2', question: 'What happens if you put an = sign after the expression? f"{x=}" — is that valid?',
      code: `name = "Alice"\nage = 30\nscore = 95.7\nprint(f"{name=}")\nprint(f"{age=}")\nprint(f"{score=:.1f}")\nprint(f"{len(name)=}")`,
      deduction: 'f"{x=}" is the debug format (Python 3.8+). It prints both the expression AND its value. This is the fastest way to debug without writing print("x =", x). It even works with expressions like len(name).' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build a one-liner table formatter using f-strings with alignment. Right-align numbers, left-align text, center headers.',
      code: `items = [("Sword", 150), ("Shield", 89), ("Potion", 25)]\nprint(f"{'Item':^15}{'Price':^10}")\nprint("-" * 25)\nfor name, price in items:\n    print(f"{name:<15}{price:>10}")`,
      deduction: 'f-string format spec: < left-align, > right-align, ^ center. The number is the field width. This replaces entire table-formatting libraries in many cases.',
      badge: 'The Format Architect' }
  ],

  // Ch 1.6 — Unpacking & Swap (quest id: 4)
  4: [
    { id: 'p1', question: 'Python swaps with a, b = b, a. But HOW? Does it use a temp variable internally?',
      code: `import dis\ndef swap():\n    a, b = 1, 2\n    a, b = b, a\n    return a, b\ndis.dis(swap)\nprint(swap())`,
      deduction: 'Python uses ROT_TWO bytecode to swap the top two stack elements. No temp variable needed — it is a true simultaneous swap at the bytecode level. This is why Python swap is both elegant AND efficient.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Use star unpacking to split a list into first, middle (any length), and last in ONE line.',
      code: `data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nfirst, *middle, last = data\nprint(f"First: {first}")\nprint(f"Middle: {middle}")\nprint(f"Last: {last}")`,
      deduction: 'Star unpacking (*middle) captures ANY number of elements. This one pattern handles CSV headers, log parsing, and function arg routing. It is the Pythonic way to destructure sequences.',
      badge: 'The Unpacker' }
  ],

  // Ch 1.7 — Truthy/Falsy (quest id: 7)
  7: [
    { id: 'p1', question: 'You know [] and 0 are falsy. But what about a custom object? When is an object truthy or falsy?',
      code: `class Bag:\n    def __init__(self, items):\n        self.items = items\n    def __bool__(self):\n        return len(self.items) > 0\n\nfull = Bag([1, 2, 3])\nempty = Bag([])\nprint(f"Full bag: {bool(full)}")\nprint(f"Empty bag: {bool(empty)}")\nif full:\n    print("Bag has items!")`,
      deduction: '__bool__ controls truthiness. If not defined, Python falls back to __len__ (truthy if non-zero). If neither exists, ALL objects are truthy. This is how empty containers evaluate as False.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Use `or` as a default-value operator. What does `x = a or b or c` actually do?',
      code: `user_input = ""\nconfig_val = None\ndefault = "fallback"\n\nresult = user_input or config_val or default\nprint(f"Result: {result}")\n\n# Watch out for 0!\nnumber = 0\nresult2 = number or 42\nprint(f"Gotcha: {result2}")`,
      deduction: '`or` returns the FIRST truthy value (not True/False). This is the short-circuit default pattern. But 0, "", and [] are falsy, so `0 or 42` gives 42, not 0! Use `if x is None` for None-specific checks.',
      badge: 'The Truth Seeker' }
  ],

  // Ch 2.1 — First-Class Functions (quest id: 105)
  105: [
    { id: 'p1', question: 'If functions are objects, can you store them in a dict and dispatch dynamically?',
      code: `def add(a, b): return a + b\ndef sub(a, b): return a - b\ndef mul(a, b): return a * b\n\nops = {'+': add, '-': sub, '*': mul}\nresult = ops['+'](10, 3)\nprint(f"10 + 3 = {result}")\nresult = ops['*'](10, 3)\nprint(f"10 * 3 = {result}")`,
      deduction: 'Dict dispatch replaces long if/elif chains. Functions stored in dicts can be looked up in O(1). This pattern powers plugin systems, command handlers, and API routers in production.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build a simple calculator that takes string input like "10 + 3" and evaluates it using a dispatch dict — no eval() allowed.',
      code: `ops = {'+': lambda a,b: a+b, '-': lambda a,b: a-b, '*': lambda a,b: a*b, '/': lambda a,b: a/b}\nexpr = "10 * 3"\na, op, b = expr.split()\nprint(f"{expr} = {ops[op](int(a), int(b))}")`,
      deduction: 'Lambdas + dict dispatch = safe expression evaluation without the security nightmares of eval(). This is how production calculators and formula engines work.',
      badge: 'The Dispatcher' }
  ],

  // Ch 2.2 — Lambda & Higher-Order (quest id: 110)
  110: [
    { id: 'p1', question: 'sorted() has a key= parameter. Can you sort complex objects by ANY attribute using lambda?',
      code: `students = [("Alice", 85), ("Bob", 92), ("Charlie", 78), ("Diana", 95)]\nby_name = sorted(students, key=lambda s: s[0])\nby_score = sorted(students, key=lambda s: s[1], reverse=True)\nprint(f"By name:  {by_name}")\nprint(f"By score: {by_score}")`,
      deduction: 'key=lambda is the universal sorting adapter. It extracts a comparison value from each element. sorted() never compares the objects directly — only their key values. This is how databases implement ORDER BY.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Use map(), filter(), and reduce() together to process a list: filter evens, square them, then sum.',
      code: `from functools import reduce\nnums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nresult = reduce(lambda a,b: a+b, map(lambda x: x**2, filter(lambda x: x%2==0, nums)))\nprint(f"Sum of squares of evens: {result}")`,
      deduction: 'map/filter/reduce is the functional programming paradigm. Python prefers comprehensions, but understanding this chain is essential for interviews and for working with Spark, pandas, and reactive programming frameworks.',
      badge: 'The Functional Weaver' }
  ],

  // Ch 2.4 — Closures (quest id: 3)
  3: [
    { id: 'p1', question: 'A closure captures variables. But does it capture the VALUE or the REFERENCE? What if the variable changes later?',
      code: `def make_funcs():\n    funcs = []\n    for i in range(5):\n        funcs.append(lambda: i)\n    return funcs\n\nfor f in make_funcs():\n    print(f(), end=" ")`,
      deduction: 'Closures capture REFERENCES, not values. All 5 lambdas share the same variable i, which equals 4 after the loop. Fix: lambda i=i: i — the default arg captures the VALUE at creation time.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build a function factory that creates multiplier functions: make_multiplier(3) returns a function that triples any input.',
      code: `def make_multiplier(n):\n    def multiply(x):\n        return x * n\n    return multiply\n\ndouble = make_multiplier(2)\ntriple = make_multiplier(3)\nprint(f"double(5) = {double(5)}")\nprint(f"triple(5) = {triple(5)}")`,
      deduction: 'This is a closure factory — the inner function "remembers" n from the outer scope. Each call to make_multiplier creates a new closure with its own n. This pattern powers partial application, middleware, and decorator factories.',
      badge: 'The Closure Crafter' }
  ],

  // Ch 2.5 — Error Handling (quest id: 11)
  11: [
    { id: 'p1', question: 'try/except catches errors. But what does `else` do in try/except/else/finally?',
      code: `def divide(a, b):\n    try:\n        result = a / b\n    except ZeroDivisionError:\n        print("Cannot divide by zero!")\n    else:\n        print(f"Success: {result}")\n    finally:\n        print("Always runs.")\n\ndivide(10, 3)\nprint("---")\ndivide(10, 0)`,
      deduction: 'else runs ONLY if no exception occurred — it separates "happy path" from error handling. finally ALWAYS runs, even after return statements. This 4-part structure (try/except/else/finally) is the full Python error handling pattern.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build a retry decorator that catches exceptions and retries a function up to N times before raising.',
      code: `import random\ndef retry(max_attempts=3):\n    def decorator(func):\n        def wrapper(*args, **kwargs):\n            for attempt in range(1, max_attempts+1):\n                try:\n                    return func(*args, **kwargs)\n                except Exception as e:\n                    print(f"Attempt {attempt} failed: {e}")\n                    if attempt == max_attempts:\n                        raise\n        return wrapper\n    return decorator\n\n@retry(max_attempts=3)\ndef flaky():\n    if random.random() < 0.7:\n        raise ConnectionError("Network down")\n    return "Success!"\n\ntry:\n    print(flaky())\nexcept ConnectionError:\n    print("All retries exhausted.")`,
      deduction: 'Retry with exponential backoff is the #1 production pattern for handling transient failures in APIs, databases, and network calls. Every major cloud SDK uses this pattern internally.',
      badge: 'The Resilience Engineer' }
  ],

  // Ch 3.1 — Generators Intro (quest id: 101)
  101: [
    { id: 'p1', question: 'A generator uses yield instead of return. But what happens to local variables between yields? Do they survive?',
      code: `def counter(start=0):\n    n = start\n    while True:\n        print(f"  (before yield, n={n})")\n        yield n\n        n += 1\n        print(f"  (after increment, n={n})")\n\nc = counter(10)\nprint(next(c))\nprint(next(c))\nprint(next(c))`,
      deduction: 'Generator local variables are FROZEN at each yield and thawed on next(). The entire execution state — locals, instruction pointer, stack — is preserved. This is cooperative multitasking in miniature.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build an infinite Fibonacci generator. It should yield forever without consuming memory.',
      code: `def fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\nfib = fibonacci()\nfirst_10 = [next(fib) for _ in range(10)]\nprint(f"First 10: {first_10}")`,
      deduction: 'Generators produce values LAZILY — one at a time, on demand. An infinite sequence uses constant memory because only the current state exists. This is how Python handles files, network streams, and database cursors.',
      badge: 'The Lazy Evaluator' }
  ],

  // Ch 3.2 — yield & Iteration Protocol (quest id: 8)
  8: [
    { id: 'p1', question: 'Generators are iterators. But can you send values INTO a generator with .send()?',
      code: `def accumulator():\n    total = 0\n    while True:\n        value = yield total\n        if value is not None:\n            total += value\n\nacc = accumulator()\nnext(acc)\nprint(acc.send(10))\nprint(acc.send(20))\nprint(acc.send(5))`,
      deduction: '.send(value) resumes the generator AND sets the yield expression to value. This turns generators into coroutines — two-way communication channels. This is the foundation of async/await in Python.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build a running average calculator using a generator with .send().',
      code: `def running_average():\n    total = 0\n    count = 0\n    avg = 0\n    while True:\n        value = yield avg\n        if value is not None:\n            total += value\n            count += 1\n            avg = total / count\n\nra = running_average()\nnext(ra)\nfor v in [10, 20, 30, 40, 50]:\n    print(f"Added {v}, avg = {ra.send(v)}")`,
      deduction: 'send()-based generators maintain running state without classes or globals. This pattern powers streaming analytics, real-time dashboards, and financial tick processing systems.',
      badge: 'The Stream Processor' }
  ],

  // Ch 3.3 — Generator Expressions (quest id: 106)
  106: [
    { id: 'p1', question: 'Generator expressions look like list comprehensions but use (). Do they consume less memory? How much less?',
      code: `import sys\nlist_comp = [x**2 for x in range(10000)]\ngen_expr = (x**2 for x in range(10000))\nprint(f"List: {sys.getsizeof(list_comp)} bytes")\nprint(f"Gen:  {sys.getsizeof(gen_expr)} bytes")\nprint(f"Ratio: {sys.getsizeof(list_comp)/sys.getsizeof(gen_expr):.0f}x more memory for list")`,
      deduction: 'Generator expressions use ~200 bytes regardless of size. Lists grow with data. For 10k items, the list uses ~100x more memory. Use generators when you only need to iterate once.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Chain generators to build a processing pipeline — read, filter, transform — all lazy.',
      code: `lines = ["INFO: user login", "ERROR: db timeout", "INFO: page view", "ERROR: null ref", "DEBUG: cache hit"]\nerrors = (l for l in lines if l.startswith("ERROR"))\nmessages = (l.split(": ")[1] for l in errors)\nprint(list(messages))`,
      deduction: 'Chained generators form a lazy pipeline — nothing executes until you consume the final result. This is how Unix pipes work, and it is the pattern behind Spark RDDs and TensorFlow data pipelines.',
      badge: 'The Pipeline Builder' }
  ],

  // Ch 3.4 — Context Managers (quest id: 13)
  13: [
    { id: 'p1', question: 'with statements call __enter__ and __exit__. But what if __exit__ returns True? Does it suppress the exception?',
      code: `class Suppress:\n    def __enter__(self):\n        print("Entering")\n        return self\n    def __exit__(self, exc_type, exc_val, tb):\n        if exc_type:\n            print(f"Caught: {exc_val}")\n            return True  # Suppress!\n\nwith Suppress():\n    print("Before error")\n    raise ValueError("boom!")\n    print("After error")\n\nprint("Continued normally!")`,
      deduction: 'If __exit__ returns True, the exception is SUPPRESSED and execution continues after the with block. This is how contextlib.suppress() works internally. Return False (or None) to let the exception propagate.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build a timer context manager that measures how long a block takes.',
      code: `import time\nclass Timer:\n    def __enter__(self):\n        self.start = time.time()\n        return self\n    def __exit__(self, *args):\n        self.elapsed = time.time() - self.start\n        print(f"Elapsed: {self.elapsed:.4f}s")\n\nwith Timer() as t:\n    total = sum(range(1_000_000))\nprint(f"Result: {total}")`,
      deduction: 'Context managers ensure cleanup happens even if exceptions occur. Timer is the simplest example, but the pattern scales to database transactions, file locks, and network connections.',
      badge: 'The Context Guardian' }
  ],

  // ═══════════════════════════════════════════════
  // PATH 4: DECORATORS (IDs 201, 202, 10)
  // ═══════════════════════════════════════════════

  // Ch 4.2 — functools.wraps (quest id: 201)
  201: [
    { id: 'p1', question: 'After decorating, the function loses its __name__. Can functools.wraps fix that?',
      code: `from functools import wraps\ndef logger(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(f"Calling {func.__name__}")\n        return func(*args, **kwargs)\n    return wrapper\n\n@logger\ndef greet(name):\n    \"\"\"Say hello.\"\"\"\n    return f"Hello, {name}!"\n\nprint(greet("Alice"))\nprint(f"Name: {greet.__name__}")\nprint(f"Doc: {greet.__doc__}")`,
      deduction: '@wraps(func) copies __name__, __doc__, __module__, and __qualname__ from the original function to the wrapper. Without it, debugging tools, help(), and serialization break. Always use @wraps in production decorators.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build a @cache decorator that memorizes function results. If called with the same args, return the cached result.',
      code: `from functools import wraps\ndef cache(func):\n    memo = {}\n    @wraps(func)\n    def wrapper(*args):\n        if args not in memo:\n            memo[args] = func(*args)\n        return memo[args]\n    return wrapper\n\n@cache\ndef fib(n):\n    if n < 2: return n\n    return fib(n-1) + fib(n-2)\n\nprint(f"fib(30) = {fib(30)}")`,
      deduction: 'Memoization with a closure-based dict is exactly how @functools.lru_cache works internally. This pattern converts O(2^n) recursive fib into O(n) — a 1-billion-x speedup for n=30.',
      badge: 'The Memoizer' }
  ],

  // Ch 4.3 — Decorator with Args (quest id: 202)
  202: [
    { id: 'p1', question: 'How do you make a decorator that accepts arguments like @repeat(3)?',
      code: `def repeat(n):\n    def decorator(func):\n        def wrapper(*args, **kwargs):\n            for _ in range(n):\n                result = func(*args, **kwargs)\n            return result\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef say(msg):\n    print(msg)\n\nsay("Hello!")`,
      deduction: 'A decorator with args is a 3-level function: factory → decorator → wrapper. @repeat(3) calls repeat(3) which returns the actual decorator. This triple-nesting is the standard pattern for configurable decorators.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build @throttle(seconds) that prevents a function from being called more than once per N seconds.',
      code: `import time\ndef throttle(seconds):\n    def decorator(func):\n        last_call = [0]\n        def wrapper(*args, **kwargs):\n            now = time.time()\n            if now - last_call[0] >= seconds:\n                last_call[0] = now\n                return func(*args, **kwargs)\n            else:\n                print(f"Throttled! Wait {seconds-(now-last_call[0]):.1f}s")\n        return wrapper\n    return decorator\n\n@throttle(1)\ndef api_call():\n    print("API called!")\n\napi_call()\napi_call()\ntime.sleep(1.1)\napi_call()`,
      deduction: 'Rate limiting via decorators is how web frameworks protect endpoints from abuse. The mutable list [0] trick avoids nonlocal while preserving state between calls.',
      badge: 'The Rate Limiter' }
  ],

  // Ch 4.4 — Class Decorators (quest id: 10)
  10: [
    { id: 'p1', question: 'Can a CLASS be used as a decorator? What method makes it callable?',
      code: `class CountCalls:\n    def __init__(self, func):\n        self.func = func\n        self.count = 0\n    def __call__(self, *args, **kwargs):\n        self.count += 1\n        print(f"Call #{self.count}")\n        return self.func(*args, **kwargs)\n\n@CountCalls\ndef hello(name):\n    return f"Hello, {name}!"\n\nprint(hello("Alice"))\nprint(hello("Bob"))\nprint(f"Total calls: {hello.count}")`,
      deduction: 'A class with __init__ and __call__ is a decorator. __init__ receives the function, __call__ is invoked each time the decorated function runs. Class decorators can maintain state more cleanly than closures.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build a @validate_types decorator that checks argument types at runtime.',
      code: `def validate_types(**expected):\n    def decorator(func):\n        def wrapper(**kwargs):\n            for name, val in kwargs.items():\n                if name in expected and not isinstance(val, expected[name]):\n                    raise TypeError(f"{name} must be {expected[name].__name__}, got {type(val).__name__}")\n            return func(**kwargs)\n        return wrapper\n    return decorator\n\n@validate_types(name=str, age=int)\ndef register(name, age):\n    return f"{name} is {age}"\n\nprint(register(name="Alice", age=30))\ntry:\n    register(name="Bob", age="thirty")\nexcept TypeError as e:\n    print(f"Caught: {e}")`,
      deduction: 'Runtime type validation decorators are the foundation of libraries like pydantic, FastAPI, and attrs. They enforce contracts without slowing down the happy path.',
      badge: 'The Type Guardian' }
  ],

  // ═══════════════════════════════════════════════
  // PATH 5: OOP FOUNDATIONS (IDs 102, 108, 205)
  // ═══════════════════════════════════════════════

  // Ch 5.1 — Classes Intro (quest id: 102)
  102: [
    { id: 'p1', question: 'What is the difference between a class attribute and an instance attribute?',
      code: `class Player:\n    species = "Human"  # Class attribute\n    def __init__(self, name):\n        self.name = name  # Instance attribute\n\na = Player("Alice")\nb = Player("Bob")\nprint(f"a.species: {a.species}")\nprint(f"b.species: {b.species}")\nPlayer.species = "Elf"\nprint(f"After change — a: {a.species}, b: {b.species}")`,
      deduction: 'Class attributes are shared by ALL instances via the class. Instance attributes (self.x) belong to one object. Changing a class attribute affects every instance that has not overridden it. This is Python inheritance at the attribute level.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build a class that tracks how many instances have been created, using a class attribute as a counter.',
      code: `class Entity:\n    count = 0\n    def __init__(self, name):\n        Entity.count += 1\n        self.name = name\n        self.id = Entity.count\n\na = Entity("Alice")\nb = Entity("Bob")\nc = Entity("Charlie")\nprint(f"Total entities: {Entity.count}")\nprint(f"c.id = {c.id}")`,
      deduction: 'Class attributes as counters is the object registry pattern. Using Entity.count (not self.count) ensures the counter is shared. This pattern tracks connections, requests, or instances in production systems.',
      badge: 'The Instance Counter' }
  ],

  // Ch 5.3 — Inheritance (quest id: 108)
  108: [
    { id: 'p1', question: 'Python supports multiple inheritance. What happens when two parents have the same method? Which one wins?',
      code: `class A:\n    def greet(self): return "Hello from A"\nclass B:\n    def greet(self): return "Hello from B"\nclass C(A, B):\n    pass\nclass D(B, A):\n    pass\n\nprint(f"C: {C().greet()}")\nprint(f"D: {D().greet()}")\nprint(f"C MRO: {[cls.__name__ for cls in C.__mro__]}")`,
      deduction: 'Python uses the C3 linearization algorithm (MRO) to determine method resolution order. The first parent listed wins. Check __mro__ to see the exact order. This is how mixins and diamond inheritance are resolved.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Use super() to build a cooperative mixin chain where each class adds its own behavior.',
      code: `class Base:\n    def process(self, data):\n        return data\nclass Logger(Base):\n    def process(self, data):\n        print(f"Log: {data}")\n        return super().process(data)\nclass Validator(Base):\n    def process(self, data):\n        if not data:\n            raise ValueError("Empty!")\n        return super().process(data)\nclass Pipeline(Logger, Validator, Base):\n    pass\n\np = Pipeline()\nprint(p.process("hello"))`,
      deduction: 'super() follows MRO, not just the parent. In Pipeline, process() chains: Logger → Validator → Base. This cooperative pattern is how Django middleware, pytest plugins, and ML pipelines compose behaviors.',
      badge: 'The MRO Navigator' }
  ],

  // Ch 5.5 — Properties (quest id: 205)
  205: [
    { id: 'p1', question: '@property makes a method look like an attribute. But can you make a read-only property?',
      code: `class Circle:\n    def __init__(self, radius):\n        self._radius = radius\n    @property\n    def radius(self):\n        return self._radius\n    @property\n    def area(self):\n        import math\n        return math.pi * self._radius ** 2\n\nc = Circle(5)\nprint(f"Radius: {c.radius}")\nprint(f"Area: {c.area:.2f}")\ntry:\n    c.area = 100\nexcept AttributeError as e:\n    print(f"Can't set: {e}")`,
      deduction: 'A @property without a setter is read-only. Attempting to set it raises AttributeError. This enforces encapsulation without Java-style getXxx() boilerplate. Computed properties (like area) are recalculated on each access.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build a property with validation — a setter that rejects invalid values.',
      code: `class Temperature:\n    def __init__(self, celsius):\n        self.celsius = celsius\n    @property\n    def celsius(self):\n        return self._celsius\n    @celsius.setter\n    def celsius(self, value):\n        if value < -273.15:\n            raise ValueError("Below absolute zero!")\n        self._celsius = value\n    @property\n    def fahrenheit(self):\n        return self._celsius * 9/5 + 32\n\nt = Temperature(100)\nprint(f"{t.celsius}°C = {t.fahrenheit}°F")\ntry:\n    t.celsius = -300\nexcept ValueError as e:\n    print(f"Rejected: {e}")`,
      deduction: 'Property setters with validation enforce invariants at the attribute level. This is the Pythonic alternative to Java/C# getter/setter methods. Used extensively in Django models, SQLAlchemy, and configuration objects.',
      badge: 'The Validator' }
  ],

  // ═══════════════════════════════════════════════
  // PATH 6: OOP ADVANCED (IDs 206,9,207,208,6,12,14,15)
  // ═══════════════════════════════════════════════

  // Ch 6.1 — Dataclasses (quest id: 206)
  206: [
    { id: 'p1', question: '@dataclass auto-generates __init__, __repr__, __eq__. But can it generate ordering (__lt__, __gt__) too?',
      code: `from dataclasses import dataclass, field\n@dataclass(order=True)\nclass Student:\n    gpa: float\n    name: str = field(compare=False)\n\nstudents = [Student(3.5, "Alice"), Student(3.9, "Bob"), Student(3.2, "Charlie")]\nprint(sorted(students))\nprint(f"Max: {max(students)}")`,
      deduction: 'order=True generates __lt__, __le__, __gt__, __ge__ using the fields in order. field(compare=False) excludes a field from comparison. This is how you make sortable data objects in one line.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build an immutable (frozen) dataclass with a computed field.',
      code: `from dataclasses import dataclass, field\n@dataclass(frozen=True)\nclass Vector:\n    x: float\n    y: float\n    magnitude: float = field(init=False)\n    def __post_init__(self):\n        object.__setattr__(self, 'magnitude', (self.x**2 + self.y**2)**0.5)\n\nv = Vector(3, 4)\nprint(f"Vector({v.x}, {v.y}), magnitude={v.magnitude}")\ntry:\n    v.x = 10\nexcept Exception as e:\n    print(f"Immutable: {e}")`,
      deduction: 'frozen=True makes instances immutable (hashable, safe as dict keys). __post_init__ runs after __init__ for computed fields. object.__setattr__ bypasses frozen protection during initialization.',
      badge: 'The Data Architect' }
  ],

  // Ch 6.2 — Metaclass Basics (quest id: 9)
  9: [
    { id: 'p1', question: 'type() creates classes at runtime. Can you build a class without the class keyword?',
      code: `def init(self, name):\n    self.name = name\ndef greet(self):\n    return f"Hello, {self.name}!"\n\nPlayer = type('Player', (), {'__init__': init, 'greet': greet})\np = Player("Alice")\nprint(p.greet())\nprint(type(p))\nprint(type(Player))`,
      deduction: 'type() is both a function (check types) and a metaclass (create classes). type(name, bases, dict) builds a class at runtime. This is what Python does internally for every class statement — the class keyword is syntax sugar for type().' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Use type() to dynamically generate a family of exception classes from a list of names.',
      code: `error_names = ['NotFound', 'Unauthorized', 'RateLimit', 'ServerDown']\nerrors = {name: type(name, (Exception,), {}) for name in error_names}\n\ntry:\n    raise errors['NotFound']("User not found")\nexcept Exception as e:\n    print(f"Caught {type(e).__name__}: {e}")`,
      deduction: 'Dynamic class creation with type() is how ORMs generate model classes from database schemas, how API clients create exception hierarchies, and how plugin systems register new types at runtime.',
      badge: 'The Class Forger' }
  ],

  // Ch 6.3 — Abstract Base Classes (quest id: 207)
  207: [
    { id: 'p1', question: 'ABC forces subclasses to implement methods. But what happens if you forget to implement one?',
      code: `from abc import ABC, abstractmethod\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n    @abstractmethod\n    def perimeter(self):\n        pass\n\nclass Circle(Shape):\n    def __init__(self, r):\n        self.r = r\n    def area(self):\n        import math\n        return math.pi * self.r ** 2\n    # Forgot perimeter!\n\ntry:\n    c = Circle(5)\nexcept TypeError as e:\n    print(f"Error: {e}")`,
      deduction: `ABC raises TypeError at INSTANTIATION time (not import time) if any abstract method is not implemented. This catches missing implementations early. It is Python's version of interfaces.` },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build a plugin system where all plugins must implement a standard interface using ABC.',
      code: `from abc import ABC, abstractmethod\nclass Plugin(ABC):\n    @abstractmethod\n    def execute(self, data): pass\n    @abstractmethod\n    def name(self): pass\n\nclass UpperPlugin(Plugin):\n    def execute(self, data): return data.upper()\n    def name(self): return "Uppercase"\n\nclass ReversePlugin(Plugin):\n    def execute(self, data): return data[::-1]\n    def name(self): return "Reverse"\n\nplugins = [UpperPlugin(), ReversePlugin()]\nfor p in plugins:\n    print(f"{p.name()}: {p.execute('hello')}")`,
      deduction: 'ABCs define plugin contracts. Any class implementing the interface can be swapped in. This is the Strategy pattern — used in payment processors, auth providers, and data exporters.',
      badge: 'The Interface Designer' }
  ],

  // Ch 6.4 — Descriptors (quest id: 208)
  208: [
    { id: 'p1', question: 'Descriptors power @property, @classmethod, and @staticmethod. How does a data descriptor work?',
      code: `class Positive:\n    def __set_name__(self, owner, name):\n        self.name = name\n    def __get__(self, obj, type=None):\n        return obj.__dict__.get(self.name, 0)\n    def __set__(self, obj, value):\n        if value < 0:\n            raise ValueError(f"{self.name} must be positive")\n        obj.__dict__[self.name] = value\n\nclass Account:\n    balance = Positive()\n\na = Account()\na.balance = 100\nprint(f"Balance: {a.balance}")\ntry:\n    a.balance = -50\nexcept ValueError as e:\n    print(f"Rejected: {e}")`,
      deduction: 'Data descriptors (__get__ + __set__) intercept attribute access on the CLASS level. They are reusable validation objects. @property IS a descriptor under the hood — you just built the mechanism it uses.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build a TypedField descriptor that enforces type checking on any attribute.',
      code: `class TypedField:\n    def __init__(self, expected_type):\n        self.expected_type = expected_type\n    def __set_name__(self, owner, name):\n        self.name = name\n    def __get__(self, obj, type=None):\n        return obj.__dict__.get(self.name)\n    def __set__(self, obj, value):\n        if not isinstance(value, self.expected_type):\n            raise TypeError(f"{self.name} must be {self.expected_type.__name__}")\n        obj.__dict__[self.name] = value\n\nclass Config:\n    host = TypedField(str)\n    port = TypedField(int)\n\nc = Config()\nc.host = "localhost"\nc.port = 8080\nprint(f"{c.host}:{c.port}")\ntry:\n    c.port = "not a number"\nexcept TypeError as e:\n    print(f"Caught: {e}")`,
      deduction: 'Descriptors are reusable across classes — define once, use everywhere. This is how Django model fields, SQLAlchemy columns, and pydantic validators work internally.',
      badge: 'The Descriptor Master' }
  ],

  // Ch 6.5 — Slots (quest id: 6)
  6: [
    { id: 'p1', question: '__slots__ restricts attributes. But does it actually save memory? How much?',
      code: `import sys\nclass Normal:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\nclass Slotted:\n    __slots__ = ('x', 'y')\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\nn = Normal(1, 2)\ns = Slotted(1, 2)\nprint(f"Normal: {sys.getsizeof(n)} + {sys.getsizeof(n.__dict__)} dict")\nprint(f"Slotted: {sys.getsizeof(s)} (no dict!)")`,
      deduction: '__slots__ eliminates the per-instance __dict__, saving 40-60% memory. For millions of small objects (game entities, data records), this is a massive optimization. The tradeoff: no dynamic attribute addition.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Can you add a slot and still allow arbitrary attributes? Combine __slots__ with __dict__.',
      code: `class Flexible:\n    __slots__ = ('x', 'y', '__dict__')\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\nf = Flexible(1, 2)\nf.z = 3  # Dynamic!\nprint(f"x={f.x}, y={f.y}, z={f.z}")\nprint(f"Slots: {Flexible.__slots__}")`,
      deduction: 'Including __dict__ in __slots__ gives you slotted attributes (fast, memory-efficient) for known fields, plus a dict for dynamic attributes. Best of both worlds — used in some ORM implementations.',
      badge: 'The Memory Optimizer' }
  ],

  // Ch 6.6 — Protocols (quest id: 12)
  12: [
    { id: 'p1', question: 'Duck typing: if it quacks like a duck... But how do you check if an object supports a protocol without trying?',
      code: `class MyList:\n    def __init__(self):\n        self.items = []\n    def __len__(self):\n        return len(self.items)\n    def __getitem__(self, i):\n        return self.items[i]\n\nfrom collections.abc import Sized, Iterable\nml = MyList()\nprint(f"Is Sized? {isinstance(ml, Sized)}")\nprint(f"Is Iterable? {isinstance(ml, Iterable)}")`,
      deduction: 'collections.abc checks for protocol compliance via __subclasshook__. If your class has __len__, it IS a Sized — no explicit inheritance needed. This is structural typing, not nominal typing.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Register a plain class as a "virtual subclass" of an ABC without inheriting.',
      code: `from collections.abc import Iterator\nclass Countdown:\n    def __init__(self, n):\n        self.n = n\n    def __iter__(self):\n        return self\n    def __next__(self):\n        if self.n <= 0:\n            raise StopIteration\n        self.n -= 1\n        return self.n + 1\n\nprint(f"Is Iterator? {isinstance(Countdown(3), Iterator)}")\nfor x in Countdown(5):\n    print(x, end=" ")`,
      deduction: 'Python checks for __iter__ and __next__ to determine Iterator membership. No registration or inheritance needed. This duck-typing-as-a-protocol system powers for loops, comprehensions, and unpacking.',
      badge: 'The Protocol Detective' }
  ],

  // Ch 6.7 — Mixins (quest id: 14)
  14: [
    { id: 'p1', question: 'Mixins add behavior to classes without being standalone. How do they compose?',
      code: `class JsonMixin:\n    def to_json(self):\n        import json\n        return json.dumps(self.__dict__)\n\nclass LogMixin:\n    def log(self, msg):\n        print(f"[{self.__class__.__name__}] {msg}")\n\nclass User(JsonMixin, LogMixin):\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\nu = User("Alice", 30)\nu.log("Created")\nprint(u.to_json())`,
      deduction: 'Mixins are small, focused classes that add ONE capability. They use multiple inheritance but avoid the diamond problem by never overriding __init__. This is how Django adds behaviors to views and models.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build a ComparisonMixin that adds all comparison operators from just __lt__ and __eq__.',
      code: `class ComparisonMixin:\n    def __le__(self, other): return self == other or self < other\n    def __gt__(self, other): return not self <= other\n    def __ge__(self, other): return not self < other\n\nclass Score(ComparisonMixin):\n    def __init__(self, val):\n        self.val = val\n    def __eq__(self, other): return self.val == other.val\n    def __lt__(self, other): return self.val < other.val\n    def __repr__(self): return f"Score({self.val})"\n\na, b = Score(85), Score(92)\nprint(f"{a} < {b}: {a < b}")\nprint(f"{a} >= {b}: {a >= b}")`,
      deduction: 'This is exactly what functools.total_ordering does! Define __eq__ and one comparison, and get all 6 for free. Mixin patterns like this reduce boilerplate across entire codebases.',
      badge: 'The Mixin Master' }
  ],

  // Ch 6.8 — Design Patterns (quest id: 15)
  15: [
    { id: 'p1', question: 'The Observer pattern: how do you build an event system where objects subscribe to and publish events?',
      code: `class EventEmitter:\n    def __init__(self):\n        self._listeners = {}\n    def on(self, event, callback):\n        self._listeners.setdefault(event, []).append(callback)\n    def emit(self, event, *args):\n        for cb in self._listeners.get(event, []):\n            cb(*args)\n\nbus = EventEmitter()\nbus.on("login", lambda user: print(f"{user} logged in"))\nbus.on("login", lambda user: print(f"Sending welcome email to {user}"))\nbus.emit("login", "Alice")`,
      deduction: 'The Observer/PubSub pattern decouples event producers from consumers. The emitter knows nothing about who is listening. This powers JavaScript event handling, Django signals, and message queues.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build a Strategy pattern — swap algorithms at runtime without changing the calling code.',
      code: `class Sorter:\n    def __init__(self, strategy=None):\n        self.strategy = strategy or sorted\n    def sort(self, data):\n        return self.strategy(data)\n\ns = Sorter()\nprint(s.sort([3, 1, 4, 1, 5]))\ns.strategy = lambda x: sorted(x, reverse=True)\nprint(s.sort([3, 1, 4, 1, 5]))`,
      deduction: 'Strategy pattern: inject the algorithm as a function/object. Changing strategy changes behavior without modifying the class. This is how payment processors, compression libraries, and auth systems support multiple backends.',
      badge: 'The Pattern Weaver' }
  ],

  // ═══════════════════════════════════════════════
  // DS TIER 1: CORE FOUR (301-305)
  // ═══════════════════════════════════════════════
  301: [
    { id: 'p1', question: 'Lists are O(1) for append but O(n) for insert at index 0. Can you prove it?',
      code: `import time\nn = 100000\nstart = time.time()\nlst = []\nfor i in range(n): lst.append(i)\nprint(f"append: {time.time()-start:.4f}s")\nstart = time.time()\nlst2 = []\nfor i in range(n): lst2.insert(0, i)\nprint(f"insert(0): {time.time()-start:.4f}s")`,
      deduction: 'append() is O(1) amortized. insert(0) is O(n) because every element must shift right. For front-insertion, use collections.deque which is O(1) on both ends.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Use list slicing to implement a rotate-left function in one line.',
      code: `def rotate_left(lst, k):\n    k = k % len(lst)\n    return lst[k:] + lst[:k]\n\nprint(rotate_left([1,2,3,4,5], 2))`,
      deduction: 'Slice + concatenate is the Pythonic rotation pattern. Understanding slice semantics unlocks windowing, pagination, and circular buffer operations.',
      badge: 'The List Surgeon' }
  ],

  302: [
    { id: 'p1', question: 'Tuples are immutable. But what if a tuple CONTAINS a mutable object like a list?',
      code: `t = (1, 2, [3, 4])\nprint(f"Before: {t}")\nt[2].append(5)\nprint(f"After: {t}")\ntry:\n    t[0] = 99\nexcept TypeError as e:\n    print(f"Error: {e}")`,
      deduction: 'Tuples are shallowly immutable. You cannot reassign elements, but if an element IS mutable (like a list), you CAN mutate its contents. The tuple holds a reference, not a copy.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Use named tuples for lightweight data objects without the overhead of a full class.',
      code: `from collections import namedtuple\nPoint = namedtuple('Point', ['x', 'y'])\np = Point(3, 4)\nprint(f"x={p.x}, y={p.y}")\nprint(f"As tuple: {tuple(p)}")\nprint(f"Unpack: {p[0]}, {p[1]}")`,
      deduction: 'namedtuple gives you immutable, memory-efficient data objects with named access. They are the predecessor to dataclasses and are still preferred when immutability and tuple compatibility matter.',
      badge: 'The Tuple Architect' }
  ],

  303: [
    { id: 'p1', question: 'Dict insertion order is preserved since Python 3.7. But what about comprehension order?',
      code: `# Order is preserved!\nd = {}\nd['c'] = 3\nd['a'] = 1\nd['b'] = 2\nprint(f"Insertion order: {list(d.keys())}")\n\n# Comprehension order\ncomp = {k: v for k, v in zip('cab', [3, 1, 2])}\nprint(f"Comprehension: {list(comp.keys())}")`,
      deduction: 'Since Python 3.7, dict preserves insertion order as a language guarantee (not implementation detail). Dict comprehensions also preserve source order. OrderedDict is now only needed for move_to_end() and equality behavior.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build a frequency counter using dict.get() and compare with Counter.',
      code: `from collections import Counter\ntext = "abracadabra"\n\n# Manual counting\nmanual = {}\nfor ch in text:\n    manual[ch] = manual.get(ch, 0) + 1\n\n# Counter\nauto = Counter(text)\nprint(f"Manual: {manual}")\nprint(f"Counter: {dict(auto)}")\nprint(f"Top 2: {auto.most_common(2)}")`,
      deduction: 'Counter is the production-grade frequency counter. It supports most_common(), arithmetic operations, and initialization from any iterable. dict.get() is the DIY version — understanding both matters.',
      badge: 'The Dict Master' }
  ],

  304: [
    { id: 'p1', question: 'Sets only store unique elements. But what can you PUT in a set? Can you store a list?',
      code: `s = {1, 2, 3, 'hello', (1, 2)}\nprint(f"Set: {s}")\ntry:\n    s.add([4, 5])\nexcept TypeError as e:\n    print(f"Can't add list: {e}")\ntry:\n    s.add({6: 7})\nexcept TypeError as e:\n    print(f"Can't add dict: {e}")`,
      deduction: 'Sets require HASHABLE elements. Lists and dicts are NOT hashable because they are mutable. Tuples, strings, ints, frozensets are hashable. This is the same restriction as dict keys.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Use set operations to find common elements, differences, and symmetric differences between two sets.',
      code: `a = {1, 2, 3, 4, 5}\nb = {4, 5, 6, 7, 8}\nprint(f"Union: {a | b}")\nprint(f"Intersection: {a & b}")\nprint(f"Difference: {a - b}")\nprint(f"Symmetric diff: {a ^ b}")`,
      deduction: 'Set operations are O(min(len(a), len(b))) — faster than list-based alternatives. Union, intersection, difference map directly to SQL JOIN types and Venn diagram operations.',
      badge: 'The Set Theorist' }
  ],

  305: [
    { id: 'p1', question: 'Strings are immutable sequences. Every operation creates a NEW string. What is the performance impact?',
      code: `import time\nn = 50000\nstart = time.time()\nresult = ""\nfor i in range(n): result += str(i)\nconcat_time = time.time() - start\n\nstart = time.time()\nparts = []\nfor i in range(n): parts.append(str(i))\nresult2 = "".join(parts)\njoin_time = time.time() - start\n\nprint(f"Concat: {concat_time:.4f}s")\nprint(f"Join:   {join_time:.4f}s")`,
      deduction: 'String concatenation in a loop is O(n^2) because each += creates a new string. join() is O(n) because it pre-calculates the final size. Always use join() for building strings from many pieces.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Use str.translate() for ultra-fast character replacement — faster than replace() chains.',
      code: `import string\ntable = str.maketrans('aeiou', '12345')\nresult = "hello world".translate(table)\nprint(f"Translated: {result}")\n\n# Remove all punctuation\nremove_punct = str.maketrans('', '', string.punctuation)\nclean = "Hello, World! How's it going?".translate(remove_punct)\nprint(f"Clean: {clean}")`,
      deduction: 'translate() uses a lookup table for O(n) single-pass character mapping. It is 3-5x faster than chained replace() calls and handles deletion elegantly with the 3rd argument to maketrans().',
      badge: 'The String Surgeon' }
  ],

  // ═══════════════════════════════════════════════
  // DS TIER 2: COLLECTIONS ARMORY (306-310)
  // ═══════════════════════════════════════════════
  306: [
    { id: 'p1', question: 'defaultdict auto-creates missing keys. But what happens if you access a key with defaultdict(int) vs defaultdict(list)?',
      code: `from collections import defaultdict\ncounts = defaultdict(int)\ncounts['a'] += 1\ncounts['b'] += 1\ncounts['a'] += 1\nprint(f"Counts: {dict(counts)}")\n\ngrouped = defaultdict(list)\nfor name, dept in [('Alice','Eng'),('Bob','Sales'),('Charlie','Eng')]:\n    grouped[dept].append(name)\nprint(f"Grouped: {dict(grouped)}")`,
      deduction: 'defaultdict(int) creates 0 for missing int keys. defaultdict(list) creates [] for missing list keys. The factory function runs each time a missing key is accessed. This eliminates all "check-then-create" boilerplate.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build an adjacency list graph using defaultdict in one pass.',
      code: `from collections import defaultdict\nedges = [('A','B'), ('A','C'), ('B','D'), ('C','D'), ('D','A')]\ngraph = defaultdict(list)\nfor u, v in edges:\n    graph[u].append(v)\nfor node, neighbors in graph.items():\n    print(f"  {node} -> {neighbors}")`,
      deduction: 'defaultdict(list) is the standard graph building pattern. No KeyError checks, no setdefault calls. This is how NetworkX, graph algorithms, and dependency resolvers build adjacency lists.',
      badge: 'The Graph Builder' }
  ],

  307: [
    { id: 'p1', question: 'Counter can do ARITHMETIC. What happens when you add or subtract two Counters?',
      code: `from collections import Counter\na = Counter("aabbc")\nb = Counter("bbcdd")\nprint(f"a + b: {a + b}")\nprint(f"a - b: {a - b}")\nprint(f"a & b: {a & b}")\nprint(f"a | b: {a | b}")`,
      deduction: 'Counter supports +, -, &, |. Addition merges counts, subtraction removes (dropping zero/negative), & gives minimums, | gives maximums. This is multiset arithmetic — used in text analysis, inventory systems, and probabilistic data.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Use Counter to check if two strings are anagrams in one line.',
      code: `from collections import Counter\ndef is_anagram(a, b):\n    return Counter(a.lower().replace(' ','')) == Counter(b.lower().replace(' ',''))\n\nprint(is_anagram("listen", "silent"))\nprint(is_anagram("hello", "world"))`,
      deduction: 'Counter equality checks if two sequences have identical element frequencies. This O(n) anagram check is the standard interview solution — no sorting needed.',
      badge: 'The Counter Wizard' }
  ],

  308: [
    { id: 'p1', question: 'namedtuple creates tuple subclasses with named fields. How does _replace() work on immutable tuples?',
      code: `from collections import namedtuple\nConfig = namedtuple('Config', ['host', 'port', 'debug'])\nc1 = Config('localhost', 8080, False)\nc2 = c1._replace(debug=True, port=9090)\nprint(f"Original: {c1}")\nprint(f"Modified: {c2}")\nprint(f"Same? {c1 is c2}")`,
      deduction: '_replace() creates a NEW namedtuple with some fields changed — the original is untouched. This is functional-style immutable update. It is how configuration overrides and state transitions work in functional programming.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Convert a namedtuple to dict and back. What method does that?',
      code: `from collections import namedtuple\nUser = namedtuple('User', ['name', 'age', 'role'])\nu = User('Alice', 30, 'admin')\nd = u._asdict()\nprint(f"As dict: {d}")\nu2 = User(**d)\nprint(f"Roundtrip: {u2}")`,
      deduction: '_asdict() converts to OrderedDict, and **unpacking reconstructs. This roundtrip is how you serialize namedtuples to JSON and back — essential for API responses.',
      badge: 'The Named Tuple Master' }
  ],

  309: [
    { id: 'p1', question: 'deque is O(1) on both ends. But it also has a maxlen feature — what does it do?',
      code: `from collections import deque\nhistory = deque(maxlen=3)\nfor cmd in ['ls', 'cd', 'git', 'python', 'exit']:\n    history.append(cmd)\n    print(f"  History: {list(history)}")`,
      deduction: 'A deque with maxlen auto-evicts the oldest elements when full. This is a bounded buffer — used for command history, sliding windows, rate limiters, and circular logs. No manual size checking needed.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Implement a sliding window maximum using deque.',
      code: `from collections import deque\ndef sliding_max(arr, k):\n    dq = deque()\n    result = []\n    for i, val in enumerate(arr):\n        while dq and arr[dq[-1]] <= val:\n            dq.pop()\n        dq.append(i)\n        if dq[0] <= i - k:\n            dq.popleft()\n        if i >= k - 1:\n            result.append(arr[dq[0]])\n    return result\n\nprint(sliding_max([1,3,-1,-3,5,3,6,7], 3))`,
      deduction: 'The monotonic deque gives O(n) sliding window max instead of O(nk). This is a top-tier interview pattern used in stock price analysis, real-time monitoring, and signal processing.',
      badge: 'The Deque Master' }
  ],

  310: [
    { id: 'p1', question: 'ChainMap chains multiple dicts. But which dict gets priority? What about writes?',
      code: `from collections import ChainMap\ndefaults = {'color': 'red', 'size': 'medium'}\nuser = {'color': 'blue'}\nconfig = ChainMap(user, defaults)\nprint(f"color: {config['color']}")\nprint(f"size: {config['size']}")\nconfig['size'] = 'large'\nprint(f"user dict: {user}")\nprint(f"defaults: {defaults}")`,
      deduction: 'ChainMap searches dicts first-to-last. The first dict with the key wins. Writes go to the FIRST dict only. This is how Python resolves variable scopes (locals → enclosing → globals → builtins) and how config layering works.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Use ChainMap to implement a scope stack — push/pop scopes like a programming language.',
      code: `from collections import ChainMap\nscopes = ChainMap({'x': 1})\nscopes = scopes.new_child({'y': 2, 'x': 10})\nprint(f"Inner x: {scopes['x']}")\nscopes = scopes.parents\nprint(f"Outer x: {scopes['x']}")`,
      deduction: 'new_child() pushes a scope, .parents pops it. This is exactly how Python itself manages local/global scopes and how template engines handle block nesting.',
      badge: 'The Scope Stacker' }
  ],

  // ═══════════════════════════════════════════════
  // DS TIER 3: INTERVIEW CRUSHERS (311-317)
  // ═══════════════════════════════════════════════
  311: [
    { id: 'p1', question: 'Python lists can be used as stacks. But is append/pop truly O(1)?',
      code: `stack = []\nstack.append('a')\nstack.append('b')\nstack.append('c')\nprint(f"Stack: {stack}")\nprint(f"Pop: {stack.pop()}")\nprint(f"Peek: {stack[-1]}")\nprint(f"After: {stack}")`,
      deduction: 'list.append() and list.pop() are both O(1) amortized. Python lists use dynamic arrays with over-allocation. A Python list IS a stack — no separate Stack class needed.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Use a stack to validate balanced parentheses — the classic interview problem.',
      code: `def is_balanced(s):\n    stack = []\n    pairs = {')': '(', ']': '[', '}': '{'}\n    for ch in s:\n        if ch in '([{':\n            stack.append(ch)\n        elif ch in pairs:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return len(stack) == 0\n\nprint(is_balanced("({[]})"))  # True\nprint(is_balanced("([)]"))    # False`,
      deduction: 'The balanced parentheses problem is the canonical stack application. The O(n) solution uses a stack to match openers with closers. This pattern extends to HTML tag validation, expression parsing, and compiler design.',
      badge: 'The Stack Master' }
  ],

  312: [
    { id: 'p1', question: 'deque can be a queue. But what about a priority queue? How does heapq work?',
      code: `from collections import deque\nq = deque()\nq.append('first')\nq.append('second')\nq.append('third')\nprint(f"FIFO: {q.popleft()}")\n\nimport heapq\npq = []\nheapq.heappush(pq, (3, 'low'))\nheapq.heappush(pq, (1, 'high'))\nheapq.heappush(pq, (2, 'med'))\nprint(f"Priority: {heapq.heappop(pq)}")`,
      deduction: 'deque gives FIFO O(1) queue. heapq gives priority queue with O(log n) push/pop. These are the two queue types you need for 90% of interview problems and production systems.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Implement BFS using deque to find shortest path in a grid.',
      code: `from collections import deque\ndef bfs_shortest(grid, start, end):\n    queue = deque([(start, 0)])\n    visited = {start}\n    while queue:\n        (r, c), dist = queue.popleft()\n        if (r, c) == end:\n            return dist\n        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:\n            nr, nc = r+dr, c+dc\n            if 0<=nr<len(grid) and 0<=nc<len(grid[0]) and (nr,nc) not in visited and grid[nr][nc]==0:\n                visited.add((nr, nc))\n                queue.append(((nr, nc), dist+1))\n    return -1\n\ngrid = [[0,0,1],[0,0,0],[1,0,0]]\nprint(f"Shortest: {bfs_shortest(grid, (0,0), (2,2))}")`,
      deduction: 'BFS with deque guarantees shortest path in unweighted graphs. This is the #1 interview algorithm for maze/grid problems. deque.popleft() is O(1) vs list.pop(0) which is O(n).',
      badge: 'The BFS Navigator' }
  ],

  313: [
    { id: 'p1', question: 'heapq only provides a min-heap. How do you make a max-heap?',
      code: `import heapq\nnums = [3, 1, 4, 1, 5, 9, 2, 6]\nmax_heap = [-x for x in nums]\nheapq.heapify(max_heap)\nprint(f"Max: {-heapq.heappop(max_heap)}")\nprint(f"Next: {-heapq.heappop(max_heap)}")`,
      deduction: 'Negate values to simulate a max-heap. heapq only supports min-heap natively. This trick works for numbers; for objects, negate the sort key. This is how you get top-K largest elements efficiently.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Find the K largest elements from a stream using a min-heap of size K.',
      code: `import heapq\ndef top_k(stream, k):\n    heap = []\n    for val in stream:\n        if len(heap) < k:\n            heapq.heappush(heap, val)\n        elif val > heap[0]:\n            heapq.heapreplace(heap, val)\n    return sorted(heap, reverse=True)\n\nprint(top_k([3,1,4,1,5,9,2,6,5,3,5], 3))`,
      deduction: 'A min-heap of size K gives O(n log k) top-K — better than O(n log n) sorting. heapreplace() is an atomic pop+push. This is the standard approach for trending topics, leaderboards, and log analysis.',
      badge: 'The Heap Master' }
  ],

  314: [
    { id: 'p1', question: 'Python dicts ARE hash tables. What happens with a hash collision?',
      code: `class BadHash:\n    def __init__(self, val):\n        self.val = val\n    def __hash__(self):\n        return 1  # Every object has the same hash!\n    def __eq__(self, other):\n        return self.val == other.val\n\nd = {}\nfor i in range(5):\n    d[BadHash(i)] = f"val_{i}"\nprint(f"All stored: {len(d)} items")\nprint(f"Lookup: {d[BadHash(3)]}")`,
      deduction: 'Hash collisions do not break dicts — Python uses open addressing to resolve them. But collisions degrade lookup from O(1) to O(n). A good __hash__ distributes values evenly to maintain O(1) average case.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Use a dict as a hash set to find the first duplicate in O(n) time.',
      code: `def first_duplicate(arr):\n    seen = set()\n    for x in arr:\n        if x in seen:\n            return x\n        seen.add(x)\n    return None\n\nprint(first_duplicate([2, 1, 5, 3, 2, 4]))`,
      deduction: 'Set/dict lookup is O(1) average. This two-pass pattern (seen set + linear scan) solves duplicate detection, cycle detection, and two-sum problems. It trades O(n) space for O(n) time.',
      badge: 'The Hash Table Hacker' }
  ],

  315: [
    { id: 'p1', question: 'Python has no built-in linked list. But you can build one with classes. Why would you?',
      code: `class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n    def __repr__(self):\n        vals = []\n        curr = self\n        while curr:\n            vals.append(str(curr.val))\n            curr = curr.next\n        return ' -> '.join(vals)\n\nhead = Node(1, Node(2, Node(3, Node(4))))\nprint(head)`,
      deduction: 'Linked lists shine for O(1) insertion/deletion at known positions (no shifting). Python uses them rarely because list is good enough, but they appear constantly in interviews and in implementing LRU caches, undo systems, and memory allocators.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Reverse a linked list in-place — the most common interview linked list question.',
      code: `class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n    def __repr__(self):\n        v, c = [], self\n        while c: v.append(str(c.val)); c = c.next\n        return ' -> '.join(v)\n\ndef reverse(head):\n    prev, curr = None, head\n    while curr:\n        curr.next, prev, curr = prev, curr, curr.next\n    return prev\n\nprint(reverse(Node(1, Node(2, Node(3, Node(4))))))`,
      deduction: 'Three-pointer reversal (prev, curr, next) is the fundamental linked list operation. Python simultaneous assignment makes it elegant. This pattern extends to reversing sublists, detecting palindromes, and merging sorted lists.',
      badge: 'The Linked List Surgeon' }
  ],

  316: [
    { id: 'p1', question: 'A Binary Search Tree can degenerate into a linked list. When does that happen?',
      code: `class BST:\n    def __init__(self, val):\n        self.val = val\n        self.left = self.right = None\n    def insert(self, val):\n        if val < self.val:\n            if self.left: self.left.insert(val)\n            else: self.left = BST(val)\n        else:\n            if self.right: self.right.insert(val)\n            else: self.right = BST(val)\n    def height(self):\n        l = self.left.height() if self.left else 0\n        r = self.right.height() if self.right else 0\n        return 1 + max(l, r)\n\ngood = BST(4)\nfor v in [2, 6, 1, 3, 5, 7]: good.insert(v)\nprint(f"Balanced height: {good.height()}")\n\nbad = BST(1)\nfor v in [2, 3, 4, 5, 6, 7]: bad.insert(v)\nprint(f"Degenerate height: {bad.height()}")`,
      deduction: 'Inserting sorted data into a BST creates a linked list with O(n) operations instead of O(log n). Self-balancing trees (AVL, Red-Black) prevent this. In practice, use dict for most key-value lookups.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build an in-order traversal iterator using a generator — lazy BST scanning.',
      code: `class BST:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef inorder(node):\n    if node:\n        yield from inorder(node.left)\n        yield node.val\n        yield from inorder(node.right)\n\ntree = BST(4, BST(2, BST(1), BST(3)), BST(6, BST(5), BST(7)))\nprint(list(inorder(tree)))`,
      deduction: 'yield from delegates to sub-generators recursively. This creates a lazy in-order iterator that produces values one at a time. This is how database cursors and file system walkers implement lazy tree traversal.',
      badge: 'The Tree Walker' }
  ],

  317: [
    { id: 'p1', question: 'Graphs have two representations: adjacency list and adjacency matrix. When do you use which?',
      code: `from collections import defaultdict\n# Adjacency list — good for sparse graphs\nadj_list = defaultdict(list)\nfor u, v in [('A','B'),('A','C'),('B','D'),('C','D')]:\n    adj_list[u].append(v)\n    adj_list[v].append(u)\nprint(f"List: {dict(adj_list)}")\n\n# Adjacency matrix — good for dense graphs\nnodes = ['A','B','C','D']\nidx = {n:i for i,n in enumerate(nodes)}\nmatrix = [[0]*4 for _ in range(4)]\nfor u, v in [('A','B'),('A','C'),('B','D'),('C','D')]:\n    matrix[idx[u]][idx[v]] = 1\n    matrix[idx[v]][idx[u]] = 1\nfor row in matrix:\n    print(f"  {row}")`,
      deduction: 'Adjacency list: O(V+E) space, good for sparse graphs. Matrix: O(V^2) space, good for dense graphs and O(1) edge lookups. Most interview problems use adjacency lists because real-world graphs are sparse.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Implement DFS to detect if a graph has a cycle.',
      code: `from collections import defaultdict\ndef has_cycle(graph):\n    visited = set()\n    rec_stack = set()\n    def dfs(node):\n        visited.add(node)\n        rec_stack.add(node)\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                if dfs(neighbor): return True\n            elif neighbor in rec_stack:\n                return True\n        rec_stack.discard(node)\n        return False\n    return any(dfs(n) for n in graph if n not in visited)\n\ng = defaultdict(list)\nfor u,v in [('A','B'),('B','C'),('C','A')]:\n    g[u].append(v)\nprint(f"Has cycle: {has_cycle(g)}")`,
      deduction: 'Cycle detection with DFS + recursion stack is the standard O(V+E) algorithm. The recursion stack tracks the current path — if we revisit a node in the current path, there is a cycle. Used in dependency resolution and deadlock detection.',
      badge: 'The Graph Detective' }
  ],

  // ═══════════════════════════════════════════════
  // DS TIER 4: PRODUCTION PATTERNS (318-320)
  // ═══════════════════════════════════════════════
  318: [
    { id: 'p1', question: 'functools.lru_cache is a built-in memoization decorator. How does it work?',
      code: `from functools import lru_cache\n@lru_cache(maxsize=128)\ndef fib(n):\n    if n < 2: return n\n    return fib(n-1) + fib(n-2)\n\nprint(f"fib(50) = {fib(50)}")\nprint(f"Cache info: {fib.cache_info()}")`,
      deduction: 'lru_cache uses a dict mapping args to results. maxsize limits memory; LRU eviction drops least-recently-used entries. cache_info() shows hits, misses, and current size. This turns O(2^n) fib into O(n) with one decorator.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Build your own LRU cache from scratch using OrderedDict.',
      code: `from collections import OrderedDict\nclass LRUCache:\n    def __init__(self, capacity):\n        self.cache = OrderedDict()\n        self.capacity = capacity\n    def get(self, key):\n        if key in self.cache:\n            self.cache.move_to_end(key)\n            return self.cache[key]\n        return -1\n    def put(self, key, value):\n        if key in self.cache:\n            self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.capacity:\n            self.cache.popitem(last=False)\n\nc = LRUCache(2)\nc.put('a', 1)\nc.put('b', 2)\nprint(c.get('a'))\nc.put('c', 3)\nprint(c.get('b'))`,
      deduction: 'OrderedDict.move_to_end() + popitem(last=False) gives O(1) LRU operations. This is the exact pattern used in Redis, Memcached, and CPU cache simulation. Top interview question at FAANG.',
      badge: 'The Cache Architect' }
  ],

  319: [
    { id: 'p1', question: 'A Trie (prefix tree) stores strings character by character. Why is it better than a hash set for prefix searches?',
      code: `class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n    def insert(self, word):\n        node = self.root\n        for ch in word:\n            if ch not in node.children:\n                node.children[ch] = TrieNode()\n            node = node.children[ch]\n        node.is_end = True\n    def starts_with(self, prefix):\n        node = self.root\n        for ch in prefix:\n            if ch not in node.children: return False\n            node = node.children[ch]\n        return True\n\nt = Trie()\nfor w in ['apple','app','apex','bat']:\n    t.insert(w)\nprint(f"starts with 'ap': {t.starts_with('ap')}")\nprint(f"starts with 'ba': {t.starts_with('ba')}")\nprint(f"starts with 'ca': {t.starts_with('ca')}")`,
      deduction: 'Tries give O(m) prefix lookup (m = prefix length), independent of how many words are stored. Hash sets need O(n) to find all words with a prefix. Tries power autocomplete, spell check, and IP routing.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Add a search method and a method to collect all words with a given prefix.',
      code: `class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n    def insert(self, word):\n        node = self.root\n        for ch in word:\n            node = node.children.setdefault(ch, TrieNode())\n        node.is_end = True\n    def autocomplete(self, prefix):\n        node = self.root\n        for ch in prefix:\n            if ch not in node.children: return []\n            node = node.children[ch]\n        results = []\n        def dfs(n, path):\n            if n.is_end: results.append(prefix + path)\n            for ch, child in n.children.items():\n                dfs(child, path + ch)\n        dfs(node, '')\n        return results\n\nt = Trie()\nfor w in ['python','pytorch','pydantic','pandas','pip']:\n    t.insert(w)\nprint(f"'py': {t.autocomplete('py')}")\nprint(f"'pa': {t.autocomplete('pa')}")`,
      deduction: 'DFS from a prefix node collects all completions. setdefault() simplifies insertion. This is the exact algorithm behind IDE autocomplete, search suggestions, and command-line tab completion.',
      badge: 'The Trie Navigator' }
  ],

  320: [
    { id: 'p1', question: 'How do you choose the right data structure? What are the tradeoffs?',
      code: `# Quick reference:\nprint("=== Time Complexities ===")\nprint("List:    append O(1), index O(1), search O(n), insert O(n)")\nprint("Dict:    set O(1), get O(1), delete O(1), search O(1)")\nprint("Set:     add O(1), remove O(1), in O(1)")\nprint("Deque:   append O(1), popleft O(1), index O(n)")\nprint("Heap:    push O(log n), pop O(log n), peek O(1)")\nprint("\\n=== Space ===")\nprint("List < Tuple < Set < Dict (overhead)")`,
      deduction: 'The right DS depends on: (1) what operations you need most, (2) whether you need ordering, (3) whether you need uniqueness, (4) memory constraints. This mental framework is what separates junior from senior developers.' },
    { id: 'exploit', type: 'exploit', question: '🧠 EXPLOIT: Given a real-world problem, pick the optimal data structure and justify your choice.',
      code: `# Problem: Track the most recent N commands (history)\nfrom collections import deque\nhistory = deque(maxlen=5)\nfor cmd in ['ls', 'cd', 'git status', 'python', 'exit', 'vim', 'make']:\n    history.append(cmd)\nprint(f"History: {list(history)}")\n\n# Problem: Count word frequencies\nfrom collections import Counter\nwords = "the cat sat on the mat the cat".split()\nfreqs = Counter(words)\nprint(f"Freqs: {freqs.most_common(3)}")\n\n# Problem: Find unique elements preserving order\nseen = dict.fromkeys("abracadabra")\nprint(f"Unique ordered: {list(seen)}")`,
      deduction: 'Choosing the right DS is the #1 skill. deque(maxlen) for bounded history, Counter for frequencies, dict.fromkeys for ordered unique. Each choice eliminates complexity and bugs compared to rolling your own.',
      badge: 'The DS Architect' }
  ],
};
