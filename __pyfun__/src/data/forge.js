/**
 * src/data/forge.js
 * 
 * THE FORGE — Production-level coding challenges for each chapter.
 * Each challenge includes:
 *   - mission: Real-world scenario description
 *   - starterCode: Skeleton with TODOs for the user to implement
 *   - tests: Auto-grader test code (read-only, run via Pyodide)
 *   - referenceSolution: Senior engineer's implementation
 *   - annotations: Why each design choice was made
 *   - interviewDebrief: Questions an interviewer would ask about the solution
 */

export const forge = {

  // ═══════════════════════════════════════════════
  // PATH 1: DATA & COLLECTIONS
  // ═══════════════════════════════════════════════

  // Ch 1.1 — dict.get() vs []
  104: {
    title: "The Safe Config Loader",
    difficulty: "Apprentice",
    timeEstimate: "5-8 min",
    mission: "You're building a web app config loader. It reads settings from a dictionary, but some keys might be missing. Write a function that safely retrieves config values with sensible defaults — and a batch loader that returns a complete config even when the source is incomplete.",
    starterCode: `def get_config_value(config, key, default=None):
    """Safely retrieve a config value.
    
    TODO 1: Return the value for 'key' from config dict.
    If the key doesn't exist, return the default.
    Do NOT use try/except — use the dict API.
    """
    pass


def load_app_config(raw_config):
    """Build a complete app config from a possibly-incomplete source.
    
    TODO 2: Return a dict with these keys, using defaults if missing:
      - 'host'     -> default '0.0.0.0'
      - 'port'     -> default 8080
      - 'debug'    -> default False
      - 'db_url'   -> default 'sqlite:///app.db'
      - 'workers'  -> default 4
    
    Use get_config_value() for each key.
    """
    pass


def deep_get(data, path, default=None):
    """Safely retrieve a deeply nested value using dot notation.
    
    Example: deep_get({'a': {'b': {'c': 42}}}, 'a.b.c') -> 42
             deep_get({'a': 1}, 'a.b.c') -> None
    
    TODO 3: Split the path by '.' and walk through the nested dicts.
    Return default if any key along the path is missing.
    """
    pass
`,
    tests: `# === AUTO-GRADER ===

def test_basic_get():
    config = {'host': 'localhost', 'port': 3000}
    assert get_config_value(config, 'host') == 'localhost'
    assert get_config_value(config, 'port') == 3000
    print("✅ Test 1 passed: Basic retrieval works")

def test_missing_key_default():
    config = {'host': 'localhost'}
    assert get_config_value(config, 'port', 8080) == 8080
    assert get_config_value(config, 'missing') is None
    print("✅ Test 2 passed: Missing keys return defaults")

def test_load_app_config_partial():
    raw = {'host': '192.168.1.1', 'debug': True}
    result = load_app_config(raw)
    assert result['host'] == '192.168.1.1', "Should keep provided host"
    assert result['debug'] == True, "Should keep provided debug"
    assert result['port'] == 8080, "Should default port"
    assert result['workers'] == 4, "Should default workers"
    assert result['db_url'] == 'sqlite:///app.db', "Should default db_url"
    print("✅ Test 3 passed: Partial config filled with defaults")

def test_load_app_config_empty():
    result = load_app_config({})
    assert len(result) == 5, "Should have all 5 keys"
    print("✅ Test 4 passed: Empty config gets all defaults")

def test_deep_get_success():
    data = {'database': {'primary': {'host': 'db.prod.internal', 'port': 5432}}}
    assert deep_get(data, 'database.primary.host') == 'db.prod.internal'
    assert deep_get(data, 'database.primary.port') == 5432
    print("✅ Test 5 passed: Deep get retrieves nested values")

def test_deep_get_missing():
    data = {'database': {'primary': {'host': 'localhost'}}}
    assert deep_get(data, 'database.replica.host', 'fallback') == 'fallback'
    assert deep_get(data, 'nonexistent.path') is None
    print("✅ Test 6 passed: Deep get handles missing paths safely")

test_basic_get()
test_missing_key_default()
test_load_app_config_partial()
test_load_app_config_empty()
test_deep_get_success()
test_deep_get_missing()
print("\\n🏆 ALL TESTS PASSED — Forge Complete!")
`,
    referenceSolution: `def get_config_value(config, key, default=None):
    """Safely retrieve a config value using dict.get()."""
    return config.get(key, default)


def load_app_config(raw_config):
    """Build a complete app config from a possibly-incomplete source."""
    defaults = {
        'host': '0.0.0.0',
        'port': 8080,
        'debug': False,
        'db_url': 'sqlite:///app.db',
        'workers': 4,
    }
    # Merge: defaults first, then raw_config overwrites
    return {key: get_config_value(raw_config, key, fallback)
            for key, fallback in defaults.items()}


def deep_get(data, path, default=None):
    """Walk through nested dicts using dot-separated path."""
    keys = path.split('.')
    current = data
    for key in keys:
        if not isinstance(current, dict):
            return default
        current = current.get(key)
        if current is None:
            return default
    return current
`,
    annotations: [
      "dict.get(key, default) is O(1) and never raises — the backbone of safe data access",
      "The defaults dict pattern (merge with overrides) is used in Django settings, Flask config, and every CLI tool",
      "deep_get() avoids nested try/except chains — used in production JSON/API response parsing (see glom, jmespath libraries)",
      "isinstance() check prevents AttributeError if a non-dict value is encountered mid-path"
    ],
    interviewDebrief: [
      "What is the time complexity of dict.get()? How does Python's hash table handle collisions?",
      "How would you extend deep_get() to support list indexing (e.g., 'users.0.name')?"
    ]
  },

  // Ch 1.4 — Mutable Default Arguments
  1: {
    title: "The Safe Constructor",
    difficulty: "Apprentice",
    timeEstimate: "5-10 min",
    mission: "You're building a game engine. Write a Player class where each player gets their own independent inventory. A junior dev's version has a critical shared-state bug — fix it and add proper inventory management with method chaining.",
    starterCode: `class Player:
    """A game player with name, health, and inventory."""
    
    def __init__(self, name, health=100, inventory=[]):
        # TODO 1: Fix the mutable default argument bug.
        # Each player MUST get their own inventory list.
        self.name = name
        self.health = health
        self.inventory = inventory
    
    def pick_up(self, item):
        # TODO 2: Add the item to this player's inventory.
        # Return self for method chaining.
        pass
    
    def drop(self, item):
        # TODO 3: Remove the item if it exists.
        # Raise ValueError with a clear message if item not found.
        pass
    
    def has(self, item):
        # TODO 4: Return True if the item is in inventory.
        pass
    
    def __repr__(self):
        # TODO 5: Return a dev-friendly string like:
        # Player('Alice', hp=100, items=['sword', 'shield'])
        pass
`,
    tests: `# === AUTO-GRADER ===

def test_independent_inventories():
    p1 = Player("Alice")
    p2 = Player("Bob")
    p1.pick_up("sword")
    assert "sword" in p1.inventory, "Alice should have sword"
    assert "sword" not in p2.inventory, "Bob must NOT share Alice's inventory"
    print("✅ Test 1 passed: Independent inventories")

def test_method_chaining():
    p = Player("Eve")
    result = p.pick_up("shield").pick_up("potion")
    assert len(p.inventory) == 2, "Should have 2 items after chaining"
    assert result is p, "pick_up must return self"
    print("✅ Test 2 passed: Method chaining works")

def test_drop_existing():
    p = Player("Zed")
    p.pick_up("axe")
    p.drop("axe")
    assert "axe" not in p.inventory
    print("✅ Test 3 passed: Drop removes item")

def test_drop_missing_raises():
    p = Player("Zed")
    try:
        p.drop("ghost_item")
        assert False, "Should have raised ValueError"
    except ValueError:
        pass
    print("✅ Test 4 passed: Drop raises ValueError for missing items")

def test_has_item():
    p = Player("Test")
    p.pick_up("key")
    assert p.has("key") == True
    assert p.has("door") == False
    print("✅ Test 5 passed: has() works correctly")

def test_repr():
    p = Player("Alice", health=80)
    p.pick_up("sword")
    r = repr(p)
    assert "Alice" in r and "80" in r and "sword" in r
    print("✅ Test 6 passed: __repr__ is correct")

test_independent_inventories()
test_method_chaining()
test_drop_existing()
test_drop_missing_raises()
test_has_item()
test_repr()
print("\\n🏆 ALL TESTS PASSED — Forge Complete!")
`,
    referenceSolution: `class Player:
    """A game player with name, health, and inventory."""
    
    def __init__(self, name, health=100, inventory=None):
        # None sentinel: prevents shared-reference bug.
        # None is immutable — safe as a default.
        self.name = name
        self.health = health
        self.inventory = inventory if inventory is not None else []
    
    def pick_up(self, item):
        self.inventory.append(item)
        return self  # enables p.pick_up("a").pick_up("b")
    
    def drop(self, item):
        if item not in self.inventory:
            raise ValueError(f"{self.name} doesn't have '{item}'")
        self.inventory.remove(item)
        return self
    
    def has(self, item):
        return item in self.inventory
    
    def __repr__(self):
        return f"Player('{self.name}', hp={self.health}, items={self.inventory})"
`,
    annotations: [
      "inventory=None sentinel is THE universal fix for mutable defaults — used in every Python codebase",
      "return self enables fluent APIs / method chaining (used by SQLAlchemy, Pandas, requests)",
      "ValueError (not KeyError) is semantically correct for 'item not in collection'",
      "__repr__ is for developers (unambiguous); __str__ is for users (readable)"
    ],
    interviewDebrief: [
      "Why is inventory=[] dangerous? Explain what happens in memory across multiple calls.",
      "When would you use __repr__ vs __str__? Which one does the REPL call automatically?"
    ]
  },

  // ═══════════════════════════════════════════════
  // PATH 2: FUNCTIONS & SCOPE
  // ═══════════════════════════════════════════════

  // Ch 2.3 — Scope & UnboundLocalError
  2: {
    title: "The Counter Factory",
    difficulty: "Journeyman",
    timeEstimate: "8-12 min",
    mission: "Build a counter factory — a function that returns specialized counter functions. Each counter must track its own independent count. This pattern is used in rate limiters, metrics collectors, and event trackers in production systems.",
    starterCode: `def make_counter(start=0):
    """Return a counter function that increments and returns the count.
    
    TODO 1: Create a closure that:
      - Starts at 'start'
      - Each call increments by 1 and returns the new count
      - Hint: You'll need the 'nonlocal' keyword
    """
    pass


def make_bounded_counter(start=0, max_val=10):
    """Return a counter that stops incrementing at max_val.
    
    TODO 2: Same as make_counter, but:
      - Never exceeds max_val
      - Returns the current count (capped at max_val)
    """
    pass


def make_resettable_counter(start=0):
    """Return a dict of counter operations: increment, reset, get.
    
    TODO 3: Return a dictionary with three functions:
      - 'increment': adds 1 and returns new count
      - 'reset': sets count back to start value, returns None
      - 'get': returns current count without changing it
    
    All three functions must share the same enclosed state.
    """
    pass
`,
    tests: `# === AUTO-GRADER ===

def test_basic_counter():
    counter = make_counter()
    assert counter() == 1
    assert counter() == 2
    assert counter() == 3
    print("✅ Test 1 passed: Basic counter increments")

def test_counter_custom_start():
    counter = make_counter(start=10)
    assert counter() == 11
    assert counter() == 12
    print("✅ Test 2 passed: Custom start works")

def test_independent_counters():
    c1 = make_counter()
    c2 = make_counter()
    c1(); c1(); c1()
    c2()
    assert c1() == 4
    assert c2() == 2
    print("✅ Test 3 passed: Counters are independent")

def test_bounded_counter():
    counter = make_bounded_counter(start=0, max_val=3)
    assert counter() == 1
    assert counter() == 2
    assert counter() == 3
    assert counter() == 3  # capped
    assert counter() == 3  # still capped
    print("✅ Test 4 passed: Bounded counter caps correctly")

def test_resettable_counter():
    ops = make_resettable_counter(start=5)
    assert ops['get']() == 5
    assert ops['increment']() == 6
    assert ops['increment']() == 7
    ops['reset']()
    assert ops['get']() == 5
    assert ops['increment']() == 6
    print("✅ Test 5 passed: Resettable counter works")

test_basic_counter()
test_counter_custom_start()
test_independent_counters()
test_bounded_counter()
test_resettable_counter()
print("\\n🏆 ALL TESTS PASSED — Forge Complete!")
`,
    referenceSolution: `def make_counter(start=0):
    """Closure-based counter. Each call returns an incremented value."""
    count = start
    def increment():
        nonlocal count    # reach into the enclosing scope
        count += 1
        return count
    return increment


def make_bounded_counter(start=0, max_val=10):
    """Counter that caps at max_val — useful for rate limiters."""
    count = start
    def increment():
        nonlocal count
        if count < max_val:
            count += 1
        return count
    return increment


def make_resettable_counter(start=0):
    """Returns a dict of operations sharing enclosed state."""
    count = start
    
    def increment():
        nonlocal count
        count += 1
        return count
    
    def reset():
        nonlocal count
        count = start        # start is captured from the enclosing scope
    
    def get():
        return count         # read-only access doesn't need nonlocal
    
    return {'increment': increment, 'reset': reset, 'get': get}
`,
    annotations: [
      "nonlocal is required when you ASSIGN to a variable in an enclosing (non-global) scope",
      "Read-only access (like get()) does NOT need nonlocal — Python walks the LEGB chain automatically",
      "Returning a dict of functions is the 'poor man's object' — it's how JavaScript modules work",
      "This exact pattern powers: rate limiters, metrics collectors, memoization caches"
    ],
    interviewDebrief: [
      "Explain the LEGB rule. Why does count += 1 fail without nonlocal but print(count) works fine?",
      "How is a closure different from a class with one method? When would you prefer one over the other?"
    ]
  },

  // Ch 2.4 — Closures
  3: {
    title: "The Event System",
    difficulty: "Journeyman",
    timeEstimate: "10-15 min",
    mission: "Build a lightweight event emitter (pub/sub system) using closures. This is the pattern behind every UI framework's event handling, Node.js EventEmitter, and Django signals.",
    starterCode: `def create_event_system():
    """Create an event system with subscribe, emit, and unsubscribe.
    
    TODO 1: Create an internal registry (dict mapping event names to lists of callbacks).
    
    Return a dict with three functions:
    
    - 'subscribe(event_name, callback)':
        Register a callback for an event. Return an unsubscribe function.
        
    - 'emit(event_name, *args, **kwargs)':
        Call all registered callbacks for that event with the given args.
        If no callbacks are registered, do nothing (don't error).
        
    - 'get_count(event_name)':
        Return the number of callbacks registered for that event.
    """
    pass


# Example usage (for your reference while building):
# events = create_event_system()
# unsub = events['subscribe']('click', lambda x: print(f'Clicked: {x}'))
# events['emit']('click', 'Button A')   # prints: Clicked: Button A
# unsub()                                # removes the callback
# events['emit']('click', 'Button B')   # prints nothing
`,
    tests: `# === AUTO-GRADER ===

def test_subscribe_and_emit():
    events = create_event_system()
    results = []
    events['subscribe']('click', lambda msg: results.append(msg))
    events['emit']('click', 'hello')
    assert results == ['hello']
    print("✅ Test 1 passed: Subscribe and emit works")

def test_multiple_subscribers():
    events = create_event_system()
    results = []
    events['subscribe']('save', lambda: results.append('A'))
    events['subscribe']('save', lambda: results.append('B'))
    events['emit']('save')
    assert results == ['A', 'B']
    print("✅ Test 2 passed: Multiple subscribers fire in order")

def test_unsubscribe():
    events = create_event_system()
    results = []
    unsub = events['subscribe']('tick', lambda: results.append('tick'))
    events['emit']('tick')
    unsub()
    events['emit']('tick')
    assert results == ['tick'], "Should only have one tick after unsubscribe"
    print("✅ Test 3 passed: Unsubscribe removes callback")

def test_emit_unknown_event():
    events = create_event_system()
    events['emit']('nonexistent')  # should not error
    print("✅ Test 4 passed: Emitting unknown event is safe")

def test_get_count():
    events = create_event_system()
    assert events['get_count']('click') == 0
    events['subscribe']('click', lambda: None)
    events['subscribe']('click', lambda: None)
    assert events['get_count']('click') == 2
    print("✅ Test 5 passed: get_count tracks correctly")

def test_emit_with_args_kwargs():
    events = create_event_system()
    results = []
    events['subscribe']('log', lambda msg, level='INFO': results.append(f'[{level}] {msg}'))
    events['emit']('log', 'Server started', level='DEBUG')
    assert results == ['[DEBUG] Server started']
    print("✅ Test 6 passed: emit passes args and kwargs")

test_subscribe_and_emit()
test_multiple_subscribers()
test_unsubscribe()
test_emit_unknown_event()
test_get_count()
test_emit_with_args_kwargs()
print("\\n🏆 ALL TESTS PASSED — Forge Complete!")
`,
    referenceSolution: `def create_event_system():
    """Closure-based event emitter (pub/sub pattern)."""
    listeners = {}  # {'event_name': [callback1, callback2, ...]}
    
    def subscribe(event_name, callback):
        if event_name not in listeners:
            listeners[event_name] = []
        listeners[event_name].append(callback)
        
        # Return an unsubscribe function (closure over this specific callback)
        def unsubscribe():
            listeners[event_name].remove(callback)
        return unsubscribe
    
    def emit(event_name, *args, **kwargs):
        for callback in listeners.get(event_name, []):
            callback(*args, **kwargs)
    
    def get_count(event_name):
        return len(listeners.get(event_name, []))
    
    return {
        'subscribe': subscribe,
        'emit': emit,
        'get_count': get_count,
    }
`,
    annotations: [
      "listeners dict is the enclosed state — invisible from outside, shared by all three functions",
      "subscribe() returns an unsubscribe closure — this is how React's useEffect cleanup works",
      ".get(event_name, []) prevents KeyError AND lets the for-loop gracefully do nothing",
      "*args/**kwargs passthrough lets emit() forward any signature to the callbacks"
    ],
    interviewDebrief: [
      "What is the Observer pattern? How does this closure-based version compare to a class-based one?",
      "What would break if listeners was a local variable inside each function instead of shared?"
    ]
  },

  // ═══════════════════════════════════════════════
  // PATH 3: GENERATORS & I/O
  // ═══════════════════════════════════════════════

  // Ch 3.1 — Generators
  101: {
    title: "The Paginated API Stream",
    difficulty: "Journeyman",
    timeEstimate: "10-12 min",
    mission: "Build a paginated data stream. In production, APIs return data in pages (page 1: items 0-9, page 2: items 10-19, etc.). Write generators that lazily yield items page-by-page without loading all data into memory.",
    starterCode: `def paginate(items, page_size=10):
    """Yield items in pages (lists of page_size).
    
    TODO 1: Yield successive chunks of 'items' as lists.
    The last page may be smaller than page_size.
    
    Example: list(paginate([1,2,3,4,5], page_size=2))
             -> [[1,2], [3,4], [5]]
    """
    pass


def flatten_pages(pages):
    """Yield individual items from a stream of pages.
    
    TODO 2: Given an iterable of lists (pages), yield
    each individual item one at a time.
    
    Use 'yield from' for elegance.
    """
    pass


def infinite_ids(start=1):
    """Yield an infinite stream of incrementing IDs.
    
    TODO 3: Yield start, start+1, start+2, ... forever.
    This simulates an auto-incrementing database primary key.
    """
    pass


def take(n, iterable):
    """Take the first n items from any iterable (including infinite ones).
    
    TODO 4: Yield at most n items from the iterable, then stop.
    """
    pass
`,
    tests: `# === AUTO-GRADER ===

def test_paginate_even():
    pages = list(paginate([1,2,3,4,5,6], page_size=2))
    assert pages == [[1,2], [3,4], [5,6]]
    print("✅ Test 1 passed: Even pagination works")

def test_paginate_uneven():
    pages = list(paginate([1,2,3,4,5], page_size=3))
    assert pages == [[1,2,3], [4,5]]
    print("✅ Test 2 passed: Uneven last page works")

def test_paginate_empty():
    pages = list(paginate([], page_size=5))
    assert pages == []
    print("✅ Test 3 passed: Empty input returns no pages")

def test_flatten_pages():
    pages = [[1,2], [3,4], [5]]
    flat = list(flatten_pages(pages))
    assert flat == [1,2,3,4,5]
    print("✅ Test 4 passed: Flatten pages works")

def test_roundtrip():
    original = list(range(17))
    pages = paginate(original, page_size=5)
    restored = list(flatten_pages(pages))
    assert restored == original
    print("✅ Test 5 passed: paginate -> flatten roundtrip preserves data")

def test_infinite_ids():
    gen = infinite_ids(100)
    assert next(gen) == 100
    assert next(gen) == 101
    assert next(gen) == 102
    print("✅ Test 6 passed: Infinite ID generator works")

def test_take():
    items = list(take(5, infinite_ids()))
    assert items == [1, 2, 3, 4, 5]
    print("✅ Test 7 passed: take() limits infinite generators")

def test_lazy_evaluation():
    # Prove that paginate is lazy — it should be a generator, not a list
    gen = paginate(range(1000000), page_size=10)
    first_page = next(gen)
    assert first_page == list(range(10)), "First page should be [0..9]"
    print("✅ Test 8 passed: Generators are lazy (no memory explosion)")

test_paginate_even()
test_paginate_uneven()
test_paginate_empty()
test_flatten_pages()
test_roundtrip()
test_infinite_ids()
test_take()
test_lazy_evaluation()
print("\\n🏆 ALL TESTS PASSED — Forge Complete!")
`,
    referenceSolution: `def paginate(items, page_size=10):
    """Yield items in pages (chunks)."""
    page = []
    for item in items:
        page.append(item)
        if len(page) == page_size:
            yield page
            page = []           # fresh list for next page
    if page:                    # don't forget the last partial page
        yield page


def flatten_pages(pages):
    """Yield individual items from a stream of pages."""
    for page in pages:
        yield from page         # delegates iteration to the sub-list


def infinite_ids(start=1):
    """Yield an infinite stream of incrementing IDs."""
    current = start
    while True:
        yield current
        current += 1


def take(n, iterable):
    """Take the first n items from any iterable."""
    count = 0
    for item in iterable:
        if count >= n:
            return              # return in a generator = StopIteration
        yield item
        count += 1
`,
    annotations: [
      "paginate() is a real production pattern — Django's Paginator and DRF pagination work this way",
      "'yield from' delegates to a sub-generator — it's how asyncio coroutine chaining works internally",
      "infinite_ids() demonstrates that generators are lazy — O(1) memory for infinite sequences",
      "take() uses 'return' inside a generator to cleanly stop — this is equivalent to raising StopIteration"
    ],
    interviewDebrief: [
      "What is the memory difference between returning a list of 1M items vs yielding them one by one?",
      "What does 'yield from' actually do that a simple 'for x in sub: yield x' doesn't? (Hint: .send() and .throw())"
    ]
  },

  // ═══════════════════════════════════════════════
  // PATH 4: DECORATORS
  // ═══════════════════════════════════════════════

  // Ch 4.1 — Basic Decorators
  103: {
    title: "The Timing Decorator",
    difficulty: "Journeyman",
    timeEstimate: "8-12 min",
    mission: "Build a @timer decorator that measures function execution time — the single most common custom decorator in production Python. Then build @call_counter that tracks how many times a function has been called.",
    starterCode: `import time
from functools import wraps

def timer(func):
    """Decorator that prints how long a function took to execute.
    
    TODO 1: Write a wrapper that:
      - Records the start time
      - Calls the original function
      - Records the end time
      - Prints: "⏱ {func_name} took {elapsed:.4f}s"
      - Returns the original function's result
      
    IMPORTANT: Use @wraps(func) to preserve the original
    function's __name__ and __doc__.
    """
    pass


def call_counter(func):
    """Decorator that counts how many times a function is called.
    
    TODO 2: Write a wrapper that:
      - Tracks the call count in wrapper.calls attribute
      - Increments on each call
      - Returns the original function's result
      
    Hint: Functions are objects — you can set attributes on them.
    """
    pass


def memoize(func):
    """Decorator that caches results based on arguments.
    
    TODO 3: Write a wrapper that:
      - Maintains a cache dict (args -> result)
      - On first call with new args, computes and caches the result
      - On repeat calls with same args, returns cached result
      - Has a wrapper.cache attribute exposing the cache dict
      
    Only needs to handle positional args (tuple as key).
    """
    pass
`,
    tests: `# === AUTO-GRADER ===
import time as time_mod

@timer
def slow_add(a, b):
    """Adds two numbers slowly."""
    time_mod.sleep(0.05)
    return a + b

def test_timer_returns_result():
    result = slow_add(3, 4)
    assert result == 7, "Timer must return the original result"
    print("✅ Test 1 passed: Timer returns correct result")

def test_timer_preserves_metadata():
    assert slow_add.__name__ == 'slow_add', f"Name was '{slow_add.__name__}'"
    assert 'slowly' in slow_add.__doc__
    print("✅ Test 2 passed: @wraps preserves __name__ and __doc__")

@call_counter
def greet(name):
    return f"Hello, {name}!"

def test_call_counter():
    greet.calls = 0  # reset
    greet("Alice")
    greet("Bob")
    greet("Charlie")
    assert greet.calls == 3, f"Expected 3 calls, got {greet.calls}"
    print("✅ Test 3 passed: Call counter tracks correctly")

def test_call_counter_returns():
    result = greet("Dave")
    assert result == "Hello, Dave!"
    print("✅ Test 4 passed: Call counter returns original result")

@memoize
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

def test_memoize_correctness():
    assert fib(10) == 55
    assert fib(20) == 6765
    print("✅ Test 5 passed: Memoized fibonacci is correct")

def test_memoize_caches():
    fib.cache.clear()
    fib(10)
    assert len(fib.cache) > 0, "Cache should have entries"
    cached_keys = len(fib.cache)
    fib(10)  # should hit cache, not add new entries
    assert len(fib.cache) == cached_keys, "Cache should not grow on repeated calls"
    print("✅ Test 6 passed: Memoize actually caches results")

test_timer_returns_result()
test_timer_preserves_metadata()
test_call_counter()
test_call_counter_returns()
test_memoize_correctness()
test_memoize_caches()
print("\\n🏆 ALL TESTS PASSED — Forge Complete!")
`,
    referenceSolution: `import time
from functools import wraps

def timer(func):
    """Prints execution time of the decorated function."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"⏱ {func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper


def call_counter(func):
    """Counts how many times the decorated function is called."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return func(*args, **kwargs)
    wrapper.calls = 0           # functions are objects — attach state!
    return wrapper


def memoize(func):
    """Caches results keyed by positional arguments."""
    @wraps(func)
    def wrapper(*args):
        if args not in wrapper.cache:
            wrapper.cache[args] = func(*args)
        return wrapper.cache[args]
    wrapper.cache = {}
    return wrapper
`,
    annotations: [
      "@wraps(func) copies __name__, __doc__, __module__ from the original — without it, debugging and docs break",
      "*args/**kwargs passthrough makes the wrapper transparent — it works with ANY function signature",
      "wrapper.calls = 0 exploits the fact that functions are objects — you can attach arbitrary attributes",
      "memoize uses args tuple as dict key (tuples are hashable). This is exactly what @functools.lru_cache does internally"
    ],
    interviewDebrief: [
      "What does @wraps actually do internally? What breaks without it? (Hint: __name__, help(), and pickle)",
      "Write a decorator that takes arguments: @retry(max_attempts=3). How many nested functions do you need?"
    ]
  },

  // ═══════════════════════════════════════════════
  // PATH 5: OOP FOUNDATIONS
  // ═══════════════════════════════════════════════

  // Ch 5.4 — Magic/Dunder Methods
  204: {
    title: "The Money Class",
    difficulty: "Journeyman",
    timeEstimate: "12-15 min",
    mission: "Build a Money class that behaves like a real Python numeric type. It should support arithmetic (+, -, *), comparison (<, ==), and string representation. This teaches you how Python's dunder protocol makes custom objects feel native.",
    starterCode: `class Money:
    """A currency-aware value type.
    
    Usage:
        price = Money(9.99, 'USD')
        tax = Money(0.80, 'USD')
        total = price + tax        # Money(10.79, 'USD')
        print(total)               # $10.79
        print(repr(total))         # Money(10.79, 'USD')
    """
    
    SYMBOLS = {'USD': '$', 'EUR': '€', 'GBP': '£', 'INR': '₹'}
    
    def __init__(self, amount, currency='USD'):
        # TODO 1: Store amount (rounded to 2 decimals) and currency
        pass
    
    def __repr__(self):
        # TODO 2: Return "Money(10.79, 'USD')"
        pass
    
    def __str__(self):
        # TODO 3: Return "$10.79" (using SYMBOLS dict, fallback to currency code)
        pass
    
    def __add__(self, other):
        # TODO 4: Add two Money objects. Raise TypeError if currencies differ.
        # Return a NEW Money object (don't mutate self).
        pass
    
    def __sub__(self, other):
        # TODO 5: Subtract. Same currency check.
        pass
    
    def __mul__(self, factor):
        # TODO 6: Multiply by a number (int or float). Return new Money.
        # Money(10, 'USD') * 3 -> Money(30.00, 'USD')
        pass
    
    def __eq__(self, other):
        # TODO 7: Two Money objects are equal if amount AND currency match.
        pass
    
    def __lt__(self, other):
        # TODO 8: Compare amounts. Raise TypeError if currencies differ.
        pass
    
    def __bool__(self):
        # TODO 9: Money is falsy if amount is 0.
        pass
`,
    tests: `# === AUTO-GRADER ===

def test_creation():
    m = Money(9.999, 'USD')
    assert m.amount == 10.0, "Should round to 2 decimals"
    assert m.currency == 'USD'
    print("✅ Test 1 passed: Creation and rounding works")

def test_repr_and_str():
    m = Money(42.50, 'EUR')
    assert repr(m) == "Money(42.5, 'EUR')"
    assert str(m) == '€42.50'
    print("✅ Test 2 passed: __repr__ and __str__ correct")

def test_str_unknown_currency():
    m = Money(100, 'JPY')
    assert 'JPY' in str(m) or '100' in str(m)
    print("✅ Test 3 passed: Unknown currency handled")

def test_addition():
    total = Money(10, 'USD') + Money(5.50, 'USD')
    assert total == Money(15.50, 'USD')
    print("✅ Test 4 passed: Addition works")

def test_addition_currency_mismatch():
    try:
        Money(10, 'USD') + Money(10, 'EUR')
        assert False, "Should raise TypeError"
    except TypeError:
        pass
    print("✅ Test 5 passed: Adding different currencies raises TypeError")

def test_subtraction():
    result = Money(20, 'GBP') - Money(7.50, 'GBP')
    assert result == Money(12.50, 'GBP')
    print("✅ Test 6 passed: Subtraction works")

def test_multiplication():
    result = Money(10, 'INR') * 3
    assert result == Money(30, 'INR')
    print("✅ Test 7 passed: Multiplication works")

def test_equality():
    assert Money(10, 'USD') == Money(10, 'USD')
    assert Money(10, 'USD') != Money(10, 'EUR')
    assert Money(10, 'USD') != Money(20, 'USD')
    print("✅ Test 8 passed: Equality checks both amount and currency")

def test_comparison():
    assert Money(5, 'USD') < Money(10, 'USD')
    assert not Money(10, 'USD') < Money(5, 'USD')
    print("✅ Test 9 passed: Comparison works")

def test_bool():
    assert bool(Money(10, 'USD')) == True
    assert bool(Money(0, 'USD')) == False
    print("✅ Test 10 passed: Bool / truthiness works")

test_creation()
test_repr_and_str()
test_str_unknown_currency()
test_addition()
test_addition_currency_mismatch()
test_subtraction()
test_multiplication()
test_equality()
test_comparison()
test_bool()
print("\\n🏆 ALL TESTS PASSED — Forge Complete!")
`,
    referenceSolution: `class Money:
    """A currency-aware value type with full dunder protocol."""
    
    SYMBOLS = {'USD': '$', 'EUR': '€', 'GBP': '£', 'INR': '₹'}
    
    def __init__(self, amount, currency='USD'):
        self.amount = round(float(amount), 2)
        self.currency = currency
    
    def _check_compatible(self, other):
        if not isinstance(other, Money) or self.currency != other.currency:
            raise TypeError(f"Cannot operate on {self.currency} and {other.currency}")
    
    def __repr__(self):
        return f"Money({self.amount}, '{self.currency}')"
    
    def __str__(self):
        symbol = self.SYMBOLS.get(self.currency, self.currency + ' ')
        return f"{symbol}{self.amount:.2f}"
    
    def __add__(self, other):
        self._check_compatible(other)
        return Money(self.amount + other.amount, self.currency)
    
    def __sub__(self, other):
        self._check_compatible(other)
        return Money(self.amount - other.amount, self.currency)
    
    def __mul__(self, factor):
        return Money(self.amount * factor, self.currency)
    
    def __eq__(self, other):
        if not isinstance(other, Money):
            return NotImplemented
        return self.amount == other.amount and self.currency == other.currency
    
    def __lt__(self, other):
        self._check_compatible(other)
        return self.amount < other.amount
    
    def __bool__(self):
        return self.amount != 0
`,
    annotations: [
      "_check_compatible() is DRY extraction — prevents repeating the currency-check in every method",
      "__eq__ returns NotImplemented (not False) when type is wrong — lets Python try the other operand's __eq__",
      "__mul__ doesn't check isinstance — Money * 3 makes sense, but 3 * Money would need __rmul__",
      "__bool__ enables 'if payment:' idiom — critical for Python's truthy/falsy ecosystem"
    ],
    interviewDebrief: [
      "What is the difference between returning NotImplemented and raising NotImplementedError in __eq__?",
      "If you define __eq__, what happens to __hash__? Why? (Hint: sets and dict keys)"
    ]
  },

  // ═══════════════════════════════════════════════
  // DS TIERS
  // ═══════════════════════════════════════════════

  // DS 3.3 — heapq & Priority Queue
  313: {
    title: "The Task Scheduler",
    difficulty: "Master",
    timeEstimate: "12-18 min",
    mission: "Build a priority task scheduler. Tasks arrive with priorities (lower number = higher priority). The scheduler must always process the highest-priority task first. This is how OS process schedulers and message queues (Celery, RabbitMQ) work.",
    starterCode: `import heapq

class TaskScheduler:
    """Priority-based task scheduler using a heap.
    
    Tasks are (priority, name) pairs.
    Lower priority number = processed first.
    """
    
    def __init__(self):
        # TODO 1: Initialize the internal heap and a counter
        # for breaking ties (FIFO order for same priority).
        pass
    
    def add_task(self, name, priority=5):
        # TODO 2: Push a task onto the heap.
        # Use a counter to break ties (tasks with same priority
        # should be processed in insertion order).
        # Heap entries should be: (priority, counter, name)
        pass
    
    def pop_task(self):
        # TODO 3: Pop and return the name of the highest-priority task.
        # Raise IndexError with message "No tasks" if empty.
        pass
    
    def peek(self):
        # TODO 4: Return the name of the next task WITHOUT removing it.
        # Raise IndexError with message "No tasks" if empty.
        pass
    
    def __len__(self):
        # TODO 5: Return the number of tasks in the scheduler.
        pass
    
    def __bool__(self):
        # TODO 6: Return True if there are tasks, False if empty.
        pass


def top_k_frequent(items, k):
    """Return the k most frequent items from a list.
    
    TODO 7: Use a heap to find the top-k most frequent items.
    Return them as a list, most frequent first.
    
    Example: top_k_frequent(['a','b','a','c','a','b'], 2) -> ['a', 'b']
    
    Hint: Count frequencies first, then use heapq.nlargest()
    or maintain a min-heap of size k.
    """
    pass
`,
    tests: `# === AUTO-GRADER ===

def test_add_and_pop():
    s = TaskScheduler()
    s.add_task("low", priority=10)
    s.add_task("high", priority=1)
    s.add_task("medium", priority=5)
    assert s.pop_task() == "high"
    assert s.pop_task() == "medium"
    assert s.pop_task() == "low"
    print("✅ Test 1 passed: Tasks popped in priority order")

def test_fifo_same_priority():
    s = TaskScheduler()
    s.add_task("first", priority=1)
    s.add_task("second", priority=1)
    s.add_task("third", priority=1)
    assert s.pop_task() == "first"
    assert s.pop_task() == "second"
    assert s.pop_task() == "third"
    print("✅ Test 2 passed: Same-priority tasks are FIFO")

def test_peek():
    s = TaskScheduler()
    s.add_task("urgent", priority=0)
    assert s.peek() == "urgent"
    assert len(s) == 1, "Peek should not remove the task"
    print("✅ Test 3 passed: Peek doesn't remove task")

def test_empty_pop():
    s = TaskScheduler()
    try:
        s.pop_task()
        assert False, "Should raise IndexError"
    except IndexError:
        pass
    print("✅ Test 4 passed: Empty pop raises IndexError")

def test_len_and_bool():
    s = TaskScheduler()
    assert len(s) == 0
    assert not s
    s.add_task("task")
    assert len(s) == 1
    assert s
    print("✅ Test 5 passed: __len__ and __bool__ work")

def test_top_k_frequent():
    items = ['apple', 'banana', 'apple', 'cherry', 'apple', 'banana']
    result = top_k_frequent(items, 2)
    assert result[0] == 'apple', f"Most frequent should be apple, got {result[0]}"
    assert 'banana' in result, "banana should be in top-2"
    assert len(result) == 2
    print("✅ Test 6 passed: Top-K frequent works")

def test_top_k_single():
    items = [1, 2, 2, 3, 3, 3]
    result = top_k_frequent(items, 1)
    assert result == [3]
    print("✅ Test 7 passed: Top-1 returns the most frequent")

test_add_and_pop()
test_fifo_same_priority()
test_peek()
test_empty_pop()
test_len_and_bool()
test_top_k_frequent()
test_top_k_single()
print("\\n🏆 ALL TESTS PASSED — Forge Complete!")
`,
    referenceSolution: `import heapq
from collections import Counter

class TaskScheduler:
    """Priority-based task scheduler using a min-heap."""
    
    def __init__(self):
        self._heap = []
        self._counter = 0  # tiebreaker for FIFO on same priority
    
    def add_task(self, name, priority=5):
        heapq.heappush(self._heap, (priority, self._counter, name))
        self._counter += 1
    
    def pop_task(self):
        if not self._heap:
            raise IndexError("No tasks")
        _, _, name = heapq.heappop(self._heap)
        return name
    
    def peek(self):
        if not self._heap:
            raise IndexError("No tasks")
        return self._heap[0][2]  # heap[0] is always the minimum
    
    def __len__(self):
        return len(self._heap)
    
    def __bool__(self):
        return bool(self._heap)


def top_k_frequent(items, k):
    """Return the k most frequent items, most frequent first."""
    counts = Counter(items)
    # nlargest returns [(count, item)] pairs from the heap
    return [item for item, count in counts.most_common(k)]
`,
    annotations: [
      "Counter tiebreaker (priority, counter, name) prevents TypeError when names aren't comparable",
      "heap[0] is always the minimum — O(1) peek vs O(log n) pop",
      "Counter.most_common(k) internally uses heapq.nlargest — O(n log k) for top-k",
      "Leading underscore _heap signals 'private by convention' — a Python enterprise standard"
    ],
    interviewDebrief: [
      "Why do we need the counter tiebreaker? What error occurs without it when two tasks have the same priority?",
      "What is the time complexity of heappush and heappop? How does a heap compare to sorting for top-k problems?"
    ]
  },
};
