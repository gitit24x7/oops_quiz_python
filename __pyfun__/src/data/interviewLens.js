/**
 * src/data/interviewLens.js
 * 
 * INTERVIEW LENS DATA
 * Each entry provides interview-focused context for a chapter:
 *   - frequency: How often this topic appears in interviews (1-5 stars)
 *   - companies: Companies known to ask about this
 *   - questions: Common interview questions related to this chapter
 *   - gotchas: Common mistakes candidates make
 *   - oneLiners: Concise talking points for verbal answers
 *   - difficulty: Easy / Medium / Hard
 */

export const interviewLens = {

  // ═══════════════════════════════════════════════
  // PATH 1: DATA & COLLECTIONS
  // ═══════════════════════════════════════════════
  104: {
    topic: "dict.get() vs [] Access",
    frequency: 4,
    difficulty: "Easy",
    companies: ["Google", "Amazon", "Any Python role"],
    questions: [
      "What is the difference between dict[key] and dict.get(key)?",
      "How would you safely access nested dictionary values?",
      "What is setdefault() and when would you use it?"
    ],
    gotchas: [
      ".get() returns None by default, not an error — but the key EXISTS with value None also returns None",
      "Confusing .get() default with .setdefault() — get() does NOT modify the dict"
    ],
    oneLiners: [
      "dict[key] raises KeyError if missing; dict.get(key, default) returns the default instead.",
      "Use .get() for safe reads, .setdefault() for atomic read-and-init patterns."
    ],
    visuallyExplained: {
      hook: "You are parsing a massive JSON response from an external API. Some users have a 'phone' field, some don't. Your code becomes an unreadable nightmare of `if 'phone' in user:` checks just to prevent your app from crashing with a KeyError.",
      baseCase: "user = {'name': 'Alice'}\n\nif 'phone' in user:\n    phone = user['phone']\nelse:\n    phone = 'No phone provided'",
      ahaMoment: "dict.get() acts as a bouncer at a club. Instead of kicking you out and crashing the program when a key isn't on the list, the bouncer politely hands you a predefined fallback item (like a complimentary water) and lets you continue.",
      incrementalBuild: [
        {
          step: 1,
          title: "Simplest implementation",
          code: "phone = user.get('phone', 'No phone provided')",
          desc: "We look for 'phone'. Because it's missing, it instantly returns the second argument. No `if` statements required."
        },
        {
          step: 2,
          title: "A common 'gotcha'",
          code: "email = user.get('email') # What does this return?",
          desc: "If you omit the default argument, `.get()` implicitly returns `None`. Developers often forget this and end up passing `None` into strings, causing crashes downstream."
        },
        {
          step: 3,
          title: "The 'Pythonic' way",
          code: "host = config.get('database', {}).get('host', 'localhost')",
          desc: "You can safely chain `.get()` by returning an empty dictionary `{}` as the fallback for a missing nested section."
        }
      ],
      visualDescription: "Animation shows a robotic claw reaching into a dictionary for 'phone'. The dictionary is empty. Instead of the claw sparking and exploding (KeyError), a trapdoor drops a default item ('No phone') safely into the output bin.",
      summary: "In a nutshell, `dict.get()` eliminates explicit existence-checking, turning fragile dictionary lookups into perfectly safe, declarative assignments with guaranteed fallbacks."
    }
  },

  107: {
    topic: "List Comprehensions",
    frequency: 5,
    difficulty: "Easy",
    companies: ["Every Python interview"],
    questions: [
      "Convert a for-loop + append to a list comprehension.",
      "What is the difference between a list comprehension and a generator expression?",
      "Can you nest comprehensions? What is the reading order?"
    ],
    gotchas: [
      "(x for x in ...) is a generator, NOT a tuple comprehension",
      "Nested comprehension reading order: outer loop comes first (left to right)"
    ],
    oneLiners: [
      "List comps are 20-40% faster than for+append because they avoid method lookup overhead.",
      "Use [] for lists, {} for sets/dicts, () for generators. There is no tuple comprehension."
    ],
    visuallyExplained: {
      hook: "You need to extract a list of active users from a database, but your code is taking up 5 vertical lines of boilerplate for a painfully simple logic loop. You literally had to create an empty list just to fill it up.",
      baseCase: "active_users = []\nfor user in users:\n    if user.status == 'active':\n        active_users.append(user.name)",
      ahaMoment: "A List Comprehension is a factory conveyor belt. Instead of having a worker pick up a box, look at it, and place it in a cart sequentially, you feed the raw data through a one-line machine that filters and reshapes it instantly.",
      incrementalBuild: [
        {
          step: 1,
          title: "Simplest implementation",
          code: "names = [user.name for user in users]",
          desc: "The literal syntax maps perfectly to English: 'Give me the user properties forever user inside users'. We eliminated the empty list initialization completely."
        },
        {
          step: 2,
          title: "A common 'gotcha'",
          code: "flattened = [item for sublist in matrix for item in sublist]",
          desc: "When nesting comprehensions, the reading order feels backward. You must read them Left-to-Right based on how the equivalent `for` loops would be indented."
        },
        {
          step: 3,
          title: "The 'Pythonic' way",
          code: "active_names = [u.name for u in users if u.status == 'active']",
          desc: "Appending an `if` clause at the end fuses the `filter()` and `map()` paradigms into one incredibly fast, C-optimized expression."
        }
      ],
      visualDescription: "A massive, clunky 'for' loop machine with moving parts is suddenly crushed down into a single, sleek, glowing horizontal tube. Raw data enters the left, is instantly shaped by the expression, and perfectly formed list items pop out the right.",
      summary: "In a nutshell, List Comprehensions replace the clunky `create-loop-append` pattern with a single expression, providing significant execution speedups by running at the C-level."
    }
  },

  109: {
    topic: "zip() & enumerate()",
    frequency: 4,
    difficulty: "Easy",
    companies: ["Google", "Meta", "Any Python role"],
    questions: [
      "How does zip() handle lists of different lengths?",
      "How do you unzip a list of tuples?",
      "What is enumerate() and when should you use it over range(len())?"
    ],
    gotchas: [
      "zip() silently truncates to the shortest iterable — data loss bug",
      "zip(*pairs) unzips but returns tuples, not lists"
    ],
    oneLiners: [
      "zip() pairs iterables element-wise. enumerate() adds an index counter.",
      "Always prefer enumerate() over range(len(x)) — it is more Pythonic and less error-prone."
    ],
    visuallyExplained: {
      hook: "You have a list of user IDs and a list of corresponding usernames. To combine them, you start writing an ugly `i = 0` counter loop with `usernames[i]` lookups, risking out-of-bounds errors.",
      baseCase: "user_ids = [101, 102, 103]\nusernames = ['alice', 'bob', 'charlie']\n\nfor i in range(len(user_ids)):\n    print(user_ids[i], usernames[i])",
      ahaMoment: "Think of `zip()` as an actual zipper on a jacket. It takes the teeth from the left side (list A) and pairs them meticulously with the teeth on the right side (list B), locking them together synchronously.",
      incrementalBuild: [
        {
          step: 1,
          title: "Simplest implementation",
          code: "for uid, username in zip(user_ids, usernames):",
          desc: "We iterate through both lists perfectly in sync without ever worrying about indexes."
        },
        {
          step: 2,
          title: "A common 'gotcha'",
          code: "zip([1,2,3], ['a', 'b']) # Drops the '3' silently",
          desc: "If one side of the zipper is longer than the other, `zip()` silently drops the extra items without warning. This is a notorious source of data-loss bugs."
        },
        {
          step: 3,
          title: "The 'Pythonic' way",
          code: "from itertools import zip_longest\nzip_longest([1,2,3], ['a','b'], fillvalue='NaN')",
          desc: "When data loss is unacceptable, `zip_longest` acts as a safety net, generating 'dummy teeth' (the fill value) for the shorter side so nothing is dropped."
        }
      ],
      visualDescription: "Animation shows a metal zipper physically sliding up between two vertical lists. As the slider moves, it mechanically bonds item A with item B, locking them into a neat (A,B) tuple.",
      summary: "In a nutshell, `zip()` and `enumerate()` eliminate brittle index tracking (`range(len())`), transforming manual loops into resilient, aligned data streams."
    }
  },

  1: {
    topic: "Mutable Default Arguments",
    frequency: 5,
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Netflix"],
    questions: [
      "What happens when you use a mutable default argument?",
      "Why is def f(x=[]): considered a bug?",
      "What is the standard fix and why does it work?"
    ],
    gotchas: [
      "Default values are evaluated ONCE at function definition time, not per call",
      "This affects lists, dicts, sets — any mutable type",
      "The 'fix' (x=None; if x is None: x=[]) is a pattern, not a workaround"
    ],
    oneLiners: [
      "Mutable defaults are shared across calls. Use None sentinel + create inside the body.",
      "def f(items=None): if items is None: items = [] — the universal fix."
    ],
    visuallyExplained: {
      hook: "You write a function that lets a user initialize a shopping cart. The first user adds an apple. The second user adds a banana, but suddenly their brand new cart contains an apple AND a banana.",
      baseCase: "def create_cart(item, cart=[]):\n    cart.append(item)\n    return cart\n\ncart1 = create_cart('apple')\ncart2 = create_cart('banana') # ['apple', 'banana']",
      ahaMoment: "A mutable default argument is like leaving a single physical shopping cart in the function's waiting room. When Python defines the function, it builds ONE cart. Everyone who calls the function without providing their own cart gets forced to share that exact same physical cart.",
      incrementalBuild: [
        {
          step: 1,
          title: "Simplest implementation",
          code: "def create_cart(item, cart=None):",
          desc: "Instead of creating a cart in the signature, we leave a 'None' sticky note. This acts as a sentinel value."
        },
        {
          step: 2,
          title: "A common 'gotcha'",
          code: "if not cart:\n    cart = []",
          desc: "Don't use `if not cart`. If a user intentionally passes an empty list `[]`, it evaluates to False, and you will overwrite their explicitly provided empty list!"
        },
        {
          step: 3,
          title: "The 'Pythonic' way",
          code: "if cart is None:\n    cart = []",
          desc: "Always use `is None`. We check the sticky note. If it's None, we build a brand NEW cart *inside* the function, ensuring every caller gets their own."
        }
      ],
      visualDescription: "We see a factory (function definition) that builds ONE box (list) and puts it on a pedestal. Multiple customers (function calls) walk in, and instead of getting a new box, they all throw their items into the exact same box on the pedestal.",
      summary: "In a nutshell, always use `None` for defaults when the desired type is mutable (like lists or dicts), because Python evaluates default arguments exactly once, at compile time."
    }
  },

  5: {
    topic: "String Formatting",
    frequency: 3,
    difficulty: "Easy",
    companies: ["Any Python role"],
    questions: [
      "What are the different string formatting methods in Python?",
      "How do f-strings differ from .format() and %-formatting?",
      "What does the = specifier do in f-strings?"
    ],
    gotchas: [
      "f-strings evaluate expressions at runtime — they can have side effects",
      "f'{x=}' debug format is Python 3.8+ only"
    ],
    oneLiners: [
      "f-strings are fastest and most readable. Use .format() for dynamic templates.",
      "f'{expr=}' prints both the expression text and its value — instant debugging."
    ],
    visuallyExplained: {
      hook: "You're writing a logging statement that requires embedding ints, floats, and strings. You write a disastrous chain of `str(x) + '-' + str(y)` concatenations that is incredibly slow and impossible to read.",
      baseCase: "logger.info('User ' + str(uid) + ' scored ' + str(round(score, 2)) + ' at ' + status)",
      ahaMoment: "An f-string is like a cookie cutter in fresh dough. Instead of gluing separate pieces of dough together, you stamp a single seamless template that perfectly fits any variable you pour into it, even running tiny Python scripts inside the cutouts.",
      incrementalBuild: [
        {
          step: 1,
          title: "Simplest implementation",
          code: "f'User {uid} scored {score} at {status}'",
          desc: "We write a beautifully readable string. Any variables placed within `{}` are automatically cast to strings and inserted at C-level speed."
        },
        {
          step: 2,
          title: "A common 'gotcha'",
          code: "f'Total: {price * 1.2}'",
          desc: "You can run full math expressions inside the braces! But be careful: putting complex logic or function calls inside strings can make code untestable and harder to debug."
        },
        {
          step: 3,
          title: "The 'Pythonic' way",
          code: "f'User {uid=} scored {score:.2f}'",
          desc: "We use the `=` symbol (Python 3.8+) to instantly print `uid=42`, and the `:.2f` format specifier to perfectly round the float without ugly `round()` calls."
        }
      ],
      visualDescription: "A messy conveyor belt of plus signs (+) and glued-together text blocks snaps instantly into a single cohesive glowing block. Tiny curly braces `{}` open up like windows, allowing values to physically slot right into the text.",
      summary: "In a nutshell, f-strings evaluate dynamically at runtime, dramatically improving readability, execution speed (via C optimizations), and reducing boilerplate casting."
    }
  },

  4: {
    topic: "Unpacking & Swap",
    frequency: 4,
    difficulty: "Easy",
    companies: ["Google", "Meta", "LeetCode-style"],
    questions: [
      "How does Python swap two variables without a temp?",
      "What does *args and **kwargs do in function signatures?",
      "Explain star unpacking: first, *middle, last = list"
    ],
    gotchas: [
      "a, b = b, a is NOT sequential — it is simultaneous (uses stack rotation)",
      "*variable captures remaining items as a LIST, not tuple"
    ],
    oneLiners: [
      "Python swap uses tuple packing/unpacking under the hood — no temp variable needed.",
      "Star unpacking (*rest) captures zero or more elements into a list."
    ],
    visuallyExplained: {
      hook: "You need to swap two variables, or extract the first and last items from a massive sequence while dumping the middle. You waste memory and lines building temporary variables and slicing index numbers.",
      baseCase: "temp = a\na = b\nb = temp\n\nfirst = data[0]\nmiddle = data[1:-1]\nlast = data[-1]",
      ahaMoment: "Unpacking is a magic set of hands that grabs multiple items simultaneously. Instead of moving items one by one sequentially, the hands securely grab all items at once in mid-air, and then place them exactly into their new destinations in one motion.",
      incrementalBuild: [
        {
          step: 1,
          title: "Simplest implementation",
          code: "a, b = b, a",
          desc: "Python evaluates the entire right side of the tuple first, holding it securely in memory (the stack), then unpacks it into the left side. No `temp` required."
        },
        {
          step: 2,
          title: "A common 'gotcha'",
          code: "first, rest = [1, 2, 3]",
          desc: "If the number of variables on the left doesn't PERFECTLY match the sequence length on the right, you trigger a violent `ValueError: too many values to unpack`."
        },
        {
          step: 3,
          title: "The 'Pythonic' way",
          code: "first, *middle, last = [1, 2, 3, 4, 5, 6]",
          desc: "The `*` (star) operator absorbs all remaining elements into a list naturally solving the length mismatch. `first=1`, `last=6`, and `middle=[2,3,4,5]`."
        }
      ],
      visualDescription: "Animation shows two variables on pedestals. Instead of awkward swapping, the machine 'takes a snapshot' of both values, lifting them simultaneously in the air, crossing their paths, and dropping them neatly onto opposite pedestals.",
      summary: "In a nutshell, tuple unpacking and the asterisk `*` operator allow clean destructuring of iterables into human-readable variables while gracefully catching unpredictable lengths."
    }
  },

  7: {
    topic: "Truthy/Falsy Values",
    frequency: 4,
    difficulty: "Easy",
    companies: ["Google", "Amazon", "Any Python role"],
    questions: [
      "Name all falsy values in Python.",
      "How does bool() work on custom objects?",
      "What does `x or default` actually return?"
    ],
    gotchas: [
      "0, 0.0, '', [], {}, set(), None, False are ALL falsy",
      "`x or default` returns x if truthy, default otherwise — 0 or 42 gives 42, not 0!"
    ],
    oneLiners: [
      "Falsy: None, False, 0, 0.0, '', [], {}, set(). Everything else is truthy.",
      "`or` returns the first truthy value, `and` returns the first falsy — they return values, not booleans."
    ],
    visuallyExplained: {
      hook: "You are validating user data. Instead of writing clean code, you write massive, exhaustive comparison statements to ensure variables aren't empty, zero, or null.",
      baseCase: "if items != [] and name != '' and limit != 0 and data is not None:\n    process_user()",
      ahaMoment: "Python acts like an intuitive lie-detector. It inherently knows what 'empty/nothing' feels like. It treats 0, 'none', empty lists, and empty strings implicitly as `False` without needing a strict math equation to prove it.",
      incrementalBuild: [
        {
          step: 1,
          title: "Simplest implementation",
          code: "if items and name and limit and data:",
          desc: "Python implicitly casts every object to a boolean via `__bool__()` or `__len__()`. Empty containers evaluate directly to False."
        },
        {
          step: 2,
          title: "A common 'gotcha'",
          code: "timeout = user_setting or 30",
          desc: "The `or` operator returns the FIRST truthy value. If `user_setting` is literally `0` seconds, it evaluates as falsy, replacing a valid `0` setting with `30`."
        },
        {
          step: 3,
          title: "The 'Pythonic' way",
          code: "timeout = user_setting if user_setting is not None else 30",
          desc: "When `0` or `''` are logically valid states in your business logic, DO NOT rely on truthy/falsy checks. You must explicitly evaluate against `None`."
        }
      ],
      visualDescription: "A series of mathematical scales weighing `0`, `[]`, and `None`. The scales all instantly tip toward a glowing red 'FALSE' sign, naturally categorizing emptiness without any strict typing checks.",
      summary: "In a nutshell, Python's implicit truthy/falsy evaluations dramatically reduce boilerplate comparison logic, but can introduce subtle bugs when `0` is a valid input value."
    }
  },

  // ═══════════════════════════════════════════════
  // PATH 2: FUNCTIONS & SCOPE
  // ═══════════════════════════════════════════════
  105: {
    topic: "First-Class Functions",
    frequency: 4,
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Stripe"],
    questions: [
      "What does it mean that functions are first-class objects?",
      "How would you implement a dispatch table?",
      "Can you assign a function to a variable and call it?"
    ],
    gotchas: [ "Storing lambda in a dict is fine, but lambdas are anonymous — debugging is harder" ],
    oneLiners: [
      "Functions are objects: assignable, passable, storable. Dict dispatch replaces if/elif chains.",
      "Higher-order functions take or return functions — map, filter, sorted(key=) are all examples."
    ]
  },

  110: {
    topic: "Lambda & Higher-Order Functions",
    frequency: 4,
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Bloomberg"],
    questions: [
      "What is a lambda function? How does it differ from def?",
      "Explain map(), filter(), and reduce().",
      "When would you use key=lambda in sorted()?"
    ],
    gotchas: [ "Lambdas are limited to one expression — no statements, no assignments" ],
    oneLiners: [
      "Lambda is an anonymous single-expression function. Use for short callbacks.",
      "sorted(key=lambda x: ...) is the universal sorting adapter — extracts comparison values."
    ]
  },

  2: {
    topic: "Scope & UnboundLocalError",
    frequency: 5,
    difficulty: "Medium",
    companies: ["Google", "Meta", "Microsoft", "Every Python interview"],
    questions: [
      "Explain the LEGB rule in Python scoping.",
      "What causes UnboundLocalError? Give an example.",
      "What is the difference between global and nonlocal?"
    ],
    gotchas: [
      "Python decides variable scope at COMPILE time, not runtime",
      "x += 1 is x = x + 1, making x local even if it exists in outer scope"
    ],
    oneLiners: [
      "LEGB: Local → Enclosing → Global → Built-in. Assignment makes a variable local.",
      "If any assignment to x exists in a function, x is local for the ENTIRE function."
    ]
  },

  3: {
    topic: "Closures",
    frequency: 4,
    difficulty: "Medium",
    companies: ["Google", "Meta", "Amazon"],
    questions: [
      "What is a closure? How does it capture variables?",
      "Why does the loop-and-lambda gotcha produce unexpected results?",
      "What is a function factory?"
    ],
    gotchas: [
      "Closures capture REFERENCES, not values. Loop variables change after capture.",
      "Fix: use default argument lambda i=i: i to capture current value"
    ],
    oneLiners: [
      "A closure is a function that remembers its enclosing scope. It captures variable references.",
      "lambda i=i: ... captures the current value, not the reference."
    ]
  },

  11: {
    topic: "Error Handling",
    frequency: 5,
    difficulty: "Medium",
    companies: ["Every company"],
    questions: [
      "Explain try/except/else/finally.",
      "What is the difference between raising and catching an exception?",
      "How do you create custom exception classes?"
    ],
    gotchas: [
      "else runs only when NO exception occurs — not a catch-all",
      "Bare except: catches EVERYTHING including KeyboardInterrupt and SystemExit"
    ],
    oneLiners: [
      "try: risky code. except: handle error. else: happy path. finally: always runs.",
      "Never use bare except — always catch specific exceptions."
    ]
  },

  // ═══════════════════════════════════════════════
  // PATH 3: GENERATORS & I/O
  // ═══════════════════════════════════════════════
  101: {
    topic: "Generators Intro",
    frequency: 4,
    difficulty: "Medium",
    companies: ["Google", "Meta", "Bloomberg"],
    questions: [
      "What is the difference between yield and return?",
      "What are the memory benefits of generators?",
      "How do generators implement the iterator protocol?"
    ],
    gotchas: [ "Generators are one-shot — once exhausted, they cannot be restarted" ],
    oneLiners: [
      "yield pauses the function and saves state; return terminates it.",
      "Generators produce values lazily — O(1) memory regardless of sequence size."
    ]
  },

  8: {
    topic: "yield & send()",
    frequency: 3,
    difficulty: "Hard",
    companies: ["Google", "Bloomberg", "Quantitative firms"],
    questions: [
      "How does .send() work with generators?",
      "What is a coroutine?",
      "How does yield differ from yield from?"
    ],
    gotchas: [ "Must call next() once before send() to advance to the first yield", "yield from delegates to a sub-generator completely" ],
    oneLiners: [
      ".send(value) resumes the generator AND sets the yield expression's value.",
      "Generators with send() are coroutines — two-way data channels."
    ]
  },

  106: {
    topic: "Generator Expressions",
    frequency: 4,
    difficulty: "Easy",
    companies: ["Google", "Amazon", "Any Python role"],
    questions: [
      "What is the difference between [x for x in ...] and (x for x in ...)?",
      "When should you use a generator expression over a list comprehension?",
      "Can you chain generator expressions?"
    ],
    gotchas: [ "Generator expressions are LAZY — nothing happens until you iterate" ],
    oneLiners: [
      "Generators use constant memory; lists grow with data. Use generators for large/infinite sequences.",
      "sum(x**2 for x in range(n)) — no need for brackets inside function calls."
    ]
  },

  13: {
    topic: "Context Managers",
    frequency: 4,
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Any backend role"],
    questions: [
      "What does the `with` statement do?",
      "What are __enter__ and __exit__?",
      "How do you create a context manager with contextlib?"
    ],
    gotchas: [ "If __exit__ returns True, exceptions are suppressed — usually you want False" ],
    oneLiners: [
      "`with` guarantees cleanup via __enter__/__exit__, even if exceptions occur.",
      "Use @contextmanager for simple cases; class-based for complex resource management."
    ]
  },

  // ═══════════════════════════════════════════════
  // PATH 4: DECORATORS
  // ═══════════════════════════════════════════════
  103: {
    topic: "Basic Decorators",
    frequency: 5,
    difficulty: "Medium",
    companies: ["Google", "Meta", "Amazon", "Microsoft"],
    questions: [
      "What is a decorator? How does it work?",
      "What does @decorator syntax actually do?",
      "How do stacked decorators execute?"
    ],
    gotchas: [ "@decorator is sugar for func = decorator(func)", "Stacked decorators execute bottom-up" ],
    oneLiners: [
      "A decorator wraps a function, adding behavior. @deco is shorthand for f = deco(f).",
      "Multiple decorators: @a @b @c def f → a(b(c(f))). Bottom decorator wraps first."
    ]
  },

  201: {
    topic: "functools.wraps",
    frequency: 4,
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Stripe"],
    questions: [
      "Why do you need @wraps in decorators?",
      "What metadata does @wraps preserve?",
      "What is memoization? Implement it with a decorator."
    ],
    gotchas: [ "Without @wraps, decorated function loses __name__, __doc__, and __module__" ],
    oneLiners: [
      "@wraps copies the original function's identity to the wrapper. Always use it.",
      "Memoization: cache function results keyed by arguments. @lru_cache does this built-in."
    ]
  },

  202: {
    topic: "Decorator Factories",
    frequency: 3,
    difficulty: "Hard",
    companies: ["Google", "Meta"],
    questions: [
      "How do you create a decorator that takes arguments?",
      "Explain the triple-nesting pattern: factory → decorator → wrapper.",
      "How would you implement @retry(max_attempts=3)?"
    ],
    gotchas: [ "@decorator(arg) has an extra level of nesting vs @decorator" ],
    oneLiners: [
      "Decorator with args: outer function takes args, returns the actual decorator.",
      "@repeat(3) calls repeat(3) which returns a decorator — it is a factory."
    ]
  },

  10: {
    topic: "Class Decorators",
    frequency: 3,
    difficulty: "Hard",
    companies: ["Google", "Bloomberg"],
    questions: [
      "Can a class be used as a decorator? How?",
      "What is __call__ and why does it matter for decorators?",
      "When would you prefer a class decorator over a function decorator?"
    ],
    gotchas: [ "Class decorators need __call__ to be invocable" ],
    oneLiners: [
      "A class with __init__ + __call__ is a stateful decorator.",
      "Use class decorators when you need per-instance state tracking."
    ]
  },

  // ═══════════════════════════════════════════════
  // PATH 5: OOP FOUNDATIONS
  // ═══════════════════════════════════════════════
  102: {
    topic: "Classes Intro",
    frequency: 5,
    difficulty: "Easy",
    companies: ["Every OOP interview"],
    questions: [
      "What is the difference between a class and an instance?",
      "Explain class attributes vs instance attributes.",
      "What is `self` and why is it explicit in Python?"
    ],
    gotchas: [ "Mutable class attributes are shared across ALL instances" ],
    oneLiners: [
      "self is the instance. Class attributes are shared; instance attributes are per-object.",
      "Python's explicit self makes the instance reference visible — no hidden `this`."
    ]
  },

  203: {
    topic: "__init__ & __new__",
    frequency: 5,
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Microsoft"],
    questions: [
      "What is __init__? Is it a constructor?",
      "What is __new__ and how does it differ from __init__?",
      "What is method chaining and how do you implement it?"
    ],
    gotchas: [
      "__init__ is an initializer, NOT a constructor. __new__ creates the object.",
      "__init__ MUST return None — returning anything else raises TypeError"
    ],
    oneLiners: [
      "__new__ creates; __init__ initializes. Together they are Python's construction protocol.",
      "Method chaining: return self from every method."
    ]
  },

  108: {
    topic: "Inheritance & MRO",
    frequency: 5,
    difficulty: "Medium",
    companies: ["Google", "Meta", "Amazon"],
    questions: [
      "How does Python handle multiple inheritance?",
      "What is MRO (Method Resolution Order)?",
      "How does super() work in a diamond inheritance?"
    ],
    gotchas: [ "super() follows MRO, not just the parent class", "MRO uses C3 linearization algorithm" ],
    oneLiners: [
      "Python resolves methods via MRO (C3 linearization). Check with Class.__mro__.",
      "super() calls the NEXT class in MRO, not necessarily the parent."
    ]
  },

  204: {
    topic: "Magic/Dunder Methods",
    frequency: 5,
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Microsoft", "Bloomberg"],
    questions: [
      "What are dunder methods? Name the most important ones.",
      "How do you make a custom object work with len(), str(), ==?",
      "What is the iterator protocol?"
    ],
    gotchas: [ "__getitem__ alone gives you iteration, containment, AND indexing for free" ],
    oneLiners: [
      "Dunder methods let custom objects work with Python's built-in operators and functions.",
      "__repr__ is for developers (unambiguous); __str__ is for users (readable)."
    ]
  },

  205: {
    topic: "Properties & Descriptors",
    frequency: 4,
    difficulty: "Medium",
    companies: ["Google", "Amazon"],
    questions: [
      "What is @property and why would you use it?",
      "How do you create a read-only property?",
      "How do you add validation to a property setter?"
    ],
    gotchas: [ "@property without setter is read-only. Setting raises AttributeError." ],
    oneLiners: [
      "@property turns a method into a computed attribute — no parentheses needed to access.",
      "Property setters enforce validation: Pythonic encapsulation without getter/setter boilerplate."
    ]
  },

  // ═══════════════════════════════════════════════
  // PATH 6: OOP ADVANCED
  // ═══════════════════════════════════════════════
  206: {
    topic: "Dataclasses",
    frequency: 4,
    difficulty: "Medium",
    companies: ["Google", "Meta", "Any modern Python role"],
    questions: [
      "What is @dataclass and what does it auto-generate?",
      "How do you make a frozen (immutable) dataclass?",
      "When would you use a dataclass vs a regular class?"
    ],
    gotchas: [ "order=True generates comparison methods using field order" ],
    oneLiners: [
      "@dataclass auto-generates __init__, __repr__, __eq__. Use frozen=True for immutability.",
      "Dataclasses reduce boilerplate for data-holding classes. Use for DTOs, configs, and records."
    ]
  },

  9: {
    topic: "Metaclasses",
    frequency: 2,
    difficulty: "Hard",
    companies: ["Google", "Bloomberg", "Quantitative firms"],
    questions: [
      "What is a metaclass?",
      "How does type() work as a class factory?",
      "When would you use a metaclass vs a class decorator?"
    ],
    gotchas: [ "type is the metaclass of all classes — type(int) is type" ],
    oneLiners: [
      "A metaclass is the class of a class. type() creates classes at runtime.",
      "99% of the time, a class decorator or __init_subclass__ is better than a metaclass."
    ]
  },

  207: {
    topic: "Abstract Base Classes",
    frequency: 4,
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Any senior Python role"],
    questions: [
      "What is an ABC and why use it?",
      "How does @abstractmethod work?",
      "What is the difference between ABC and Protocol (typing)?"
    ],
    gotchas: [ "ABC errors appear at instantiation, not at class definition time" ],
    oneLiners: [
      "ABCs enforce interfaces — subclasses MUST implement abstract methods or TypeError on instantiation.",
      "Use ABC for nominal typing, Protocol for structural typing (duck typing with type hints)."
    ]
  },

  208: {
    topic: "Descriptors",
    frequency: 2,
    difficulty: "Hard",
    companies: ["Google", "Framework teams"],
    questions: [
      "What is a descriptor? What methods define one?",
      "How does @property relate to descriptors?",
      "What is the difference between data and non-data descriptors?"
    ],
    gotchas: [ "Data descriptors (__get__ + __set__) take priority over instance __dict__" ],
    oneLiners: [
      "Descriptors intercept attribute access via __get__/__set__/__delete__.",
      "@property IS a descriptor. Understanding descriptors = understanding Python attribute access."
    ]
  },

  6: {
    topic: "__slots__",
    frequency: 3,
    difficulty: "Medium",
    companies: ["Google", "Bloomberg", "Quantitative firms"],
    questions: [
      "What are __slots__? When should you use them?",
      "How much memory do __slots__ save?",
      "What are the tradeoffs of using __slots__?"
    ],
    gotchas: [ "__slots__ prevents __dict__ creation — no dynamic attributes", "Including '__dict__' in __slots__ gives both" ],
    oneLiners: [
      "__slots__ eliminates per-instance __dict__, saving 40-60% memory.",
      "Use __slots__ for millions of small objects. Tradeoff: no dynamic attribute addition."
    ]
  },

  12: {
    topic: "Protocols & Duck Typing",
    frequency: 3,
    difficulty: "Medium",
    companies: ["Google", "Meta"],
    questions: [
      "What is duck typing?",
      "How do you check if an object supports a protocol?",
      "What is the difference between nominal and structural typing?"
    ],
    gotchas: [ "collections.abc uses __subclasshook__ for protocol detection — no inheritance needed" ],
    oneLiners: [
      "Duck typing: if it has __len__, it IS Sized. No inheritance required.",
      "isinstance(obj, Sized) checks protocol compliance, not class hierarchy."
    ]
  },

  14: {
    topic: "Mixins",
    frequency: 3,
    difficulty: "Medium",
    companies: ["Google", "Django/Flask companies"],
    questions: [
      "What is a mixin? How does it differ from inheritance?",
      "How do mixins compose behaviors?",
      "What is functools.total_ordering?"
    ],
    gotchas: [ "Mixins should never define __init__ to avoid diamond conflicts" ],
    oneLiners: [
      "Mixins are small, focused classes that add one behavior via multiple inheritance.",
      "total_ordering: define __eq__ + one comparison, get all 6 operators automatically."
    ]
  },

  15: {
    topic: "Design Patterns",
    frequency: 4,
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Any senior role"],
    questions: [
      "Explain the Singleton, Observer, and Strategy patterns.",
      "When would you use the Factory pattern?",
      "How does Python's duck typing affect design pattern implementation?"
    ],
    gotchas: [ "Python simplifies many patterns — Singleton via module, Strategy via first-class functions" ],
    oneLiners: [
      "Strategy: inject behavior as a function. Observer: pub/sub event system.",
      "Python patterns are simpler than Java's — functions and duck typing eliminate boilerplate."
    ]
  },

  // ═══════════════════════════════════════════════
  // DS TIERS (simplified entries)
  // ═══════════════════════════════════════════════
  301: { topic: "Lists Deep Dive", frequency: 5, difficulty: "Easy", companies: ["Every interview"],
    questions: ["What is the time complexity of list operations?", "When is insert(0, x) slow?"],
    gotchas: ["insert(0, x) is O(n)"], oneLiners: ["append O(1), index O(1), insert O(n), search O(n)."] },
  302: { topic: "Tuples & Immutability", frequency: 4, difficulty: "Easy", companies: ["Every interview"],
    questions: ["Are tuples truly immutable?", "When is a tuple faster than a list?"],
    gotchas: ["Tuples containing lists are still mutable inside"], oneLiners: ["Tuples are shallowly immutable and hashable. Use as dict keys and set elements."] },
  303: { topic: "Dict Internals", frequency: 5, difficulty: "Medium", companies: ["Google", "Meta", "Amazon"],
    questions: ["How are dicts implemented?", "When is dict insertion order guaranteed?"],
    gotchas: ["Dict order is guaranteed since Python 3.7+"], oneLiners: ["Python dicts use hash tables with open addressing. O(1) average for get/set."] },
  304: { topic: "Sets & Operations", frequency: 4, difficulty: "Easy", companies: ["Every interview"],
    questions: ["What can you store in a set?", "What are set union, intersection, difference?"],
    gotchas: ["Only hashable (immutable) objects can be in sets"], oneLiners: ["Sets: O(1) membership test. Use |, &, -, ^ for set algebra."] },
  305: { topic: "String Methods", frequency: 4, difficulty: "Easy", companies: ["Every interview"],
    questions: ["Why is string concatenation in loops slow?", "What does join() do?"],
    gotchas: ["String += in loops is O(n^2) — use ''.join() for O(n)"], oneLiners: ["Strings are immutable. Build with join(), transform with translate()/replace()."] },
  306: { topic: "defaultdict", frequency: 4, difficulty: "Medium", companies: ["Google", "Amazon"],
    questions: ["What is defaultdict? How does it differ from dict?", "How do you group items with defaultdict?"],
    gotchas: ["Accessing a missing key in defaultdict creates it with the default"], oneLiners: ["defaultdict auto-creates missing keys. Use for grouping, counting, and graph building."] },
  307: { topic: "Counter", frequency: 5, difficulty: "Easy", companies: ["Every interview"],
    questions: ["How do you count element frequencies?", "What is most_common()?"],
    gotchas: ["Counter supports arithmetic: +, -, &, |"], oneLiners: ["Counter(iterable) counts frequencies. most_common(k) gives top-k in O(n log k)."] },
  308: { topic: "namedtuple", frequency: 3, difficulty: "Easy", companies: ["Google", "Stripe"],
    questions: ["What is namedtuple? When to use it vs dataclass?"],
    gotchas: ["namedtuple is immutable; dataclass is mutable by default"], oneLiners: ["namedtuple: immutable record type with named fields. Lighter than dataclass."] },
  309: { topic: "deque", frequency: 4, difficulty: "Medium", companies: ["Google", "Amazon", "Meta"],
    questions: ["What is deque? When to use it over list?", "Implement a sliding window with deque."],
    gotchas: ["deque is O(1) on both ends; list.pop(0) is O(n)"], oneLiners: ["deque: double-ended queue. O(1) append/pop on both ends. Use maxlen for bounded buffers."] },
  310: { topic: "ChainMap", frequency: 2, difficulty: "Medium", companies: ["Google", "Framework roles"],
    questions: ["What is ChainMap? How does scope resolution use it?"],
    gotchas: ["Writes only go to the first dict in the chain"], oneLiners: ["ChainMap layers dicts. First match wins. Used for config cascading and scope resolution."] },
  311: { topic: "Stack (list)", frequency: 5, difficulty: "Easy", companies: ["Every interview"],
    questions: ["Implement a stack. Solve balanced parentheses."],
    gotchas: ["Python list IS a stack — append/pop are O(1)"], oneLiners: ["LIFO: append() to push, pop() to pop, [-1] to peek. All O(1)."] },
  312: { topic: "Queue & BFS", frequency: 5, difficulty: "Medium", companies: ["Google", "Meta", "Amazon"],
    questions: ["Implement BFS. What data structure does BFS use?"],
    gotchas: ["Use deque for O(1) popleft(), not list.pop(0) which is O(n)"], oneLiners: ["BFS uses deque. It finds shortest paths in unweighted graphs."] },
  313: { topic: "heapq & Priority Queue", frequency: 5, difficulty: "Medium", companies: ["Google", "Amazon", "Bloomberg"],
    questions: ["How do you find the K largest elements?", "How do you make a max-heap?"],
    gotchas: ["heapq is min-heap only. Negate values for max-heap."], oneLiners: ["heappush/heappop are O(log n). Top-K: maintain min-heap of size K."] },
  314: { topic: "Hash Tables", frequency: 5, difficulty: "Medium", companies: ["Every FAANG interview"],
    questions: ["How do hash tables work?", "What causes collisions?", "Solve two-sum in O(n)."],
    gotchas: ["Bad __hash__ degrades O(1) to O(n)"], oneLiners: ["Python dict IS a hash table. O(1) average lookup. Collisions resolved by open addressing."] },
  315: { topic: "Linked Lists", frequency: 5, difficulty: "Medium", companies: ["Google", "Meta", "Amazon", "Microsoft"],
    questions: ["Reverse a linked list. Detect a cycle. Merge two sorted lists."],
    gotchas: ["Python has no built-in linked list — build with classes"], oneLiners: ["Three-pointer reversal: prev, curr, next. O(n) time, O(1) space."] },
  316: { topic: "Binary Search Trees", frequency: 4, difficulty: "Medium", companies: ["Google", "Amazon"],
    questions: ["What is BST property?", "In-order traversal gives sorted output."],
    gotchas: ["BST degenerates to O(n) with sorted insertions"], oneLiners: ["BST: left < root < right. In-order = sorted. Average O(log n), worst O(n)."] },
  317: { topic: "Graphs", frequency: 5, difficulty: "Hard", companies: ["Google", "Meta", "Amazon"],
    questions: ["BFS vs DFS. Detect a cycle. Find shortest path."],
    gotchas: ["DFS uses stack (recursive or explicit), BFS uses queue (deque)"], oneLiners: ["Adjacency list: defaultdict(list). BFS for shortest path, DFS for connectivity/cycles."] },
  318: { topic: "LRU Cache", frequency: 5, difficulty: "Hard", companies: ["Google", "Meta", "Amazon", "Microsoft"],
    questions: ["Design an LRU cache. What is @lru_cache?"],
    gotchas: ["OrderedDict gives O(1) LRU operations with move_to_end()"], oneLiners: ["LRU: OrderedDict + move_to_end + popitem(last=False). O(1) get and put."] },
  319: { topic: "Trie", frequency: 4, difficulty: "Hard", companies: ["Google", "Amazon"],
    questions: ["Implement a Trie. Implement autocomplete."],
    gotchas: ["Trie space can be large — only use for prefix-heavy workloads"], oneLiners: ["Trie: O(m) prefix lookup (m=prefix length). Powers autocomplete and spell check."] },
  320: { topic: "Choosing the Right DS", frequency: 5, difficulty: "Medium", companies: ["Every senior interview"],
    questions: ["Given a problem, justify your data structure choice."],
    gotchas: ["No single DS is best — tradeoffs between time, space, and insertion order"], oneLiners: ["Know the complexity of list, dict, set, deque, heap. Pick based on dominant operation."] },
};
