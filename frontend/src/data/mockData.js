// Initial mock data and preset library for ClearPath

export const SAMPLE_CODES = {
  python_index_error: {
    id: 'python_index_error',
    name: 'IndexError: Out of Bounds',
    language: 'python',
    difficulty: 'Beginner',
    code: `# ClearPath Sample: Array bounds error
def print_scores(scores):
    print("Listing all test scores:")
    # Bug: range(len + 1) iterates one step too far
    for i in range(len(scores) + 1):
        print(f"Student {i + 1}: {scores[i]}")

grades = [88, 92, 79, 95]
print_scores(grades)
`,
    input: '',
    errorType: 'IndexError',
    errorLine: 6,
    summary: 'IndexError: list index out of range at line 6',
    explanation: {
      what: "An IndexError occurs when your code attempts to access an item at an index that doesn't exist in the list.",
      why: "In Python, lists are 0-indexed. A list with 4 elements has indices 0, 1, 2, and 3. `range(len(scores) + 1)` generates numbers up to 4, which causes `scores[4]` to fail.",
      where: "Line 5 inside the loop range declaration: `range(len(scores) + 1)`",
      how: "Change `range(len(scores) + 1)` to simply `range(len(scores))` or use idiomatic Python: `for i, score in enumerate(scores):`.",
      concept: "Array Indexing & Iteration Boundaries",
      recommendedTopicId: "topic-arrays-1"
    },
    optimization: {
      before: `for i in range(len(scores) + 1):
    print(f"Student {i + 1}: {scores[i]}")`,
      after: `for i, score in enumerate(scores, start=1):
    print(f"Student {i}: {score}")`,
      benefit: "More readable, eliminates off-by-one boundary bugs, and follows Python PEP 8 idioms."
    },
    complexity: {
      time: "O(n)",
      timeExplanation: "Linear time complexity because the loop visits each student score exactly once.",
      space: "O(1)",
      spaceExplanation: "Constant auxiliary memory; no additional lists or storage allocated."
    }
  },

  python_zero_division: {
    id: 'python_zero_division',
    name: 'ZeroDivisionError: Empty List',
    language: 'python',
    difficulty: 'Beginner',
    code: `# ClearPath Sample: Division by zero edge case
def calculate_class_average(grades):
    total = sum(grades)
    count = len(grades)
    # What happens if the list is empty?
    average = total / count
    return average

empty_test_batch = []
print("Class Average:", calculate_class_average(empty_test_batch))
`,
    input: '',
    errorType: 'ZeroDivisionError',
    errorLine: 6,
    summary: 'ZeroDivisionError: division by zero at line 6',
    explanation: {
      what: "A ZeroDivisionError occurs when an arithmetic division operation has a denominator equal to 0.",
      why: "`len(grades)` evaluates to 0 when `grades` is empty `[]`. Python cannot divide by zero.",
      where: "Line 6: `average = total / count`",
      how: "Add a defensive check: `if not grades: return 0.0` before performing the division.",
      concept: "Defensive Programming & Edge Case Validation",
      recommendedTopicId: "topic-conditions-1"
    },
    optimization: {
      before: `average = total / count`,
      after: `if not grades:
    return 0.0
return total / len(grades)`,
      benefit: "Prevents runtime crash, handles boundary inputs gracefully, and clarifies intent."
    },
    complexity: {
      time: "O(n)",
      timeExplanation: "Linear time due to sum(grades) which traverses the list.",
      space: "O(1)",
      spaceExplanation: "Only scalar numeric variables are stored."
    }
  },

  python_inefficient_fib: {
    id: 'python_inefficient_fib',
    name: 'Exponential Recursion O(2^n)',
    language: 'python',
    difficulty: 'Intermediate',
    code: `# ClearPath Sample: Inefficient Fibonacci recursion
def fibonacci(n):
    # Base cases
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    # Exponential recursive calls recalculating subproblems
    return fibonacci(n - 1) + fibonacci(n - 2)

term = 12
print(f"Fibonacci number {term} is:", fibonacci(term))
`,
    input: '',
    errorType: 'Performance / Inefficiency',
    errorLine: 9,
    summary: 'High Time Complexity: Redundant subproblem recomputation',
    explanation: {
      what: "The code runs correctly for small numbers, but its execution time doubles with each increment of n.",
      why: "Each call generates two recursive child calls. `fib(5)` calculates `fib(3)` multiple times independently without remembering prior results.",
      where: "Line 9: naive double recursion `fibonacci(n - 1) + fibonacci(n - 2)`",
      how: "Use dynamic programming (memoization or iterative bottom-up approach) to store previously computed terms.",
      concept: "Dynamic Programming & Recursion Tree Overhead",
      recommendedTopicId: "topic-dp-1"
    },
    optimization: {
      before: `def fibonacci(n):
    if n <= 1: return n
    return fibonacci(n-1) + fibonacci(n-2)`,
      after: `def fibonacci(n):
    if n <= 1: return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b`,
      benefit: "Reduces time complexity from O(2^n) to O(n) and space from O(n) stack frames to O(1)."
    },
    complexity: {
      time: "O(2^n) → Can be optimized to O(n)",
      timeExplanation: "Binary recursion tree of height n yields ~2^n total operations. For n=40, that's over 1 trillion operations!",
      space: "O(n) call stack",
      spaceExplanation: "The call stack reaches depth n before unwinding."
    }
  },

  python_syntax_error: {
    id: 'python_syntax_error',
    name: 'SyntaxError: Missing Colon',
    language: 'python',
    difficulty: 'Beginner',
    code: `# ClearPath Sample: Missing syntax tokens
def greet_student(name)
    if len(name) > 0
        print("Welcome to ClearPath, " + name)
    else
        print("Welcome, Guest!")

greet_student("Renu")
`,
    input: '',
    errorType: 'SyntaxError',
    errorLine: 2,
    summary: "SyntaxError: expected ':' at end of header",
    explanation: {
      what: "Python uses colons `:` to designate the start of indented compound statements such as def, if, else, for, while, and class.",
      why: "The parser expects a colon `:` right after `greet_student(name)` on line 2, and again on line 3 and line 5.",
      where: "Lines 2, 3, and 5 require trailing colons.",
      how: "Add `:` at the end of function definitions and condition headers.",
      concept: "Python Block Syntax and Indentation Rules",
      recommendedTopicId: "topic-fund-1"
    },
    optimization: {
      before: `def greet_student(name)\n    if len(name) > 0`,
      after: `def greet_student(name):\n    if name:`,
      benefit: "Fixes syntax compilation error and utilizes truthiness of non-empty strings."
    },
    complexity: {
      time: "O(1)",
      timeExplanation: "Constant time string check.",
      space: "O(1)",
      spaceExplanation: "No additional allocation."
    }
  },

  python_input_sample: {
    id: 'python_input_sample',
    name: 'Interactive User input() Demo',
    language: 'python',
    difficulty: 'Beginner',
    code: `# ClearPath Sample: Python user input() interaction
name = input("Enter your name: ")
topic = input("Enter your learning focus topic: ")

print("=" * 35)
print(f"Welcome to ClearPath, {name}!")
print(f"Current Target: Master {topic}")
print("=" * 35)
`,
    input: 'Renu Asmitha\nDynamic Programming',
    errorType: 'None (Clean Execution)',
    errorLine: null,
    summary: 'Interactive input() program executed with custom stdin stream.',
    explanation: {
      what: 'Demonstrates reading sequential lines via Python input().',
      why: 'Values are passed into standard input sequentially for each input() prompt.',
      where: 'Program Input (stdin) section below the code editor.',
      how: 'Type your inputs line-by-line into the Program Input box.',
      concept: 'Standard Input & Output (I/O)',
      recommendedTopicId: 'topic-intro-2'
    },
    optimization: {
      before: 'name = input("Enter your name: ")',
      after: 'name = input("Enter your name: ").strip()',
      benefit: 'Uses .strip() to eliminate accidental whitespace from user input.'
    },
    complexity: {
      time: 'O(1)',
      timeExplanation: 'Constant time execution for string I/O operations.',
      space: 'O(1)',
      spaceExplanation: 'Minimal memory allocated for user input strings.'
    }
  },
  python_clean_twosum: {
    id: 'python_clean_twosum',
    name: 'Optimal Two-Sum (Hash Map)',
    language: 'python',
    difficulty: 'Intermediate',
    code: `# ClearPath Sample: Efficient Two-Sum Algorithm
def two_sum(nums, target):
    """
    Finds two numbers that add up to target using a hash table.
    """
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

numbers = [2, 7, 11, 15]
target_val = 9
result = two_sum(numbers, target_val)
print(f"Indices for target {target_val}: {result}")
`,
    input: '',
    errorType: 'None (Clean Execution)',
    errorLine: null,
    summary: 'Optimal solution detected! No syntax or runtime errors.',
    explanation: {
      what: "Your solution runs cleanly and achieves optimal O(n) time complexity.",
      why: "By using a dictionary as a hash table, looking up previously seen complements takes average O(1) time.",
      where: "No errors found. Clean algorithm implementation.",
      how: "Great job! As a next challenge, consider how you would handle duplicates or return all unique pairs.",
      concept: "Hash Map / Dictionary Lookup Patterns",
      recommendedTopicId: "topic-hash-1"
    },
    optimization: {
      before: `# Nested loops approach: O(n^2)
for i in range(len(nums)):
    for j in range(i+1, len(nums)):
        if nums[i] + nums[j] == target: return [i, j]`,
      after: `# Current hash map approach: O(n)
seen = {}
for i, num in enumerate(nums):
    if target - num in seen: return [seen[target - num], i]
    seen[num] = i`,
      benefit: "Reduced time from quadratic O(n^2) to linear O(n). Excellent trade-off!"
    },
    complexity: {
      time: "O(n)",
      timeExplanation: "Iterates through the list of length n at most once with O(1) dictionary lookups.",
      space: "O(n)",
      spaceExplanation: "Stores at most n elements in the dictionary in the worst case."
    }
  }
};

export const INITIAL_ROADMAP_STAGES = [
  {
    id: 'stage-1',
    title: 'Stage 1: Programming Fundamentals',
    description: 'Master core syntax, types, variables, and logic branching.',
    color: 'accent-violet',
    topics: [
      {
        id: 'topic-fund-1',
        title: 'Variables & Data Types',
        status: 'completed',
        level: 'Beginner',
        duration: '45 mins',
        prereqs: 'None',
        description: 'Understand integers, floats, booleans, strings, variable assignment, and type conversion.',
        pitfalls: ['Assigning strings without quotes', 'Loss of precision when casting floats to ints', 'Variable name shadowing'],
        codeSnippet: `age = 20\nheight = 5.9\nis_student = True\nname = "Renu"\nprint(type(age), type(name))`
      },
      {
        id: 'topic-fund-2',
        title: 'Operators & Expressions',
        status: 'completed',
        level: 'Beginner',
        duration: '50 mins',
        prereqs: 'Variables & Data Types',
        description: 'Arithmetic operators, comparison operators (== vs is), logical operators (and, or, not), and operator precedence.',
        pitfalls: ['Confusing = (assignment) with == (equality)', 'Integer division // vs float division /'],
        codeSnippet: `x = 10\ny = 3\nprint("Div:", x / y)\nprint("Floor:", x // y)\nprint("Mod:", x % y)`
      },
      {
        id: 'topic-conditions-1',
        title: 'Conditional Statements',
        status: 'completed',
        level: 'Beginner',
        duration: '1 hr',
        prereqs: 'Operators & Expressions',
        description: 'if, elif, else structures, nested branching, truthy and falsy values, and ternary expressions.',
        pitfalls: ['Missing colon at end of condition', 'Incorrect indentation levels', 'Empty container evaluation'],
        codeSnippet: `score = 85\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "C"`
      }
    ]
  },
  {
    id: 'stage-2',
    title: 'Stage 2: Loops & Functions',
    description: 'Learn repetition, procedural modularity, parameters, and recursion.',
    color: 'accent-cyan',
    topics: [
      {
        id: 'topic-loops-1',
        title: 'For & While Loops',
        status: 'completed',
        level: 'Beginner',
        duration: '1.5 hrs',
        prereqs: 'Conditional Statements',
        description: 'Looping over sequences using range(), while condition iteration, break, continue, and loop-else blocks.',
        pitfalls: ['Off-by-one errors with range() stop argument', 'Infinite loops caused by forgotten counter increments'],
        codeSnippet: `for i in range(1, 6):\n    print("Step", i)\n\ncount = 3\nwhile count > 0:\n    print(count)\n    count -= 1`
      },
      {
        id: 'topic-loops-nested',
        title: 'Nested Loops & Complexity',
        status: 'in-progress',
        level: 'Intermediate',
        duration: '2 hrs',
        prereqs: 'For & While Loops',
        description: 'Understand 2D coordinate traversals, matrix grids, and how nesting loops increases time complexity from O(n) to O(n^2).',
        pitfalls: ['Variable collision between outer and inner loop iterators', 'Accidental quadratic bottlenecks on large arrays'],
        codeSnippet: `matrix = [[1, 2], [3, 4]]\nfor row in matrix:\n    for val in row:\n        print(val, end=" ")`
      },
      {
        id: 'topic-functions-1',
        title: 'Functions, Scope & Return Values',
        status: 'in-progress',
        level: 'Intermediate',
        duration: '1.5 hrs',
        prereqs: 'For & While Loops',
        description: 'Defining functions, positional & keyword arguments, default parameters, local vs global scope, and returning multiple values.',
        pitfalls: ['Mutable default arguments (def func(lst=[]))', 'Missing return statement resulting in implicit None'],
        codeSnippet: `def calculate_stats(numbers):\n    return min(numbers), max(numbers), sum(numbers)/len(numbers)\n\nlo, hi, avg = calculate_stats([4, 8, 15, 16])`
      },
      {
        id: 'topic-recursion-1',
        title: 'Recursion & Base Cases',
        status: 'recommended',
        level: 'Intermediate',
        duration: '2 hrs',
        prereqs: 'Functions, Scope & Return Values',
        description: 'Recursive call stacks, identifying base cases, stack overflow protection, and divide-and-conquer principles.',
        pitfalls: ['Omitting or improperly formulating base cases', 'Maximum recursion depth exceeded error (RecursionError)'],
        codeSnippet: `def countdown(n):\n    if n <= 0: # Base case\n        print("Blast off!")\n        return\n    print(n)\n    countdown(n - 1) # Recursive step`
      }
    ]
  },
  {
    id: 'stage-3',
    title: 'Stage 3: Data Structures',
    description: 'Fundamental containers, memory models, and data manipulation.',
    color: 'accent-blue',
    topics: [
      {
        id: 'topic-arrays-1',
        title: 'Arrays & Lists: Bounds & Slicing',
        status: 'in-progress',
        level: 'Intermediate',
        duration: '2 hrs',
        prereqs: 'Functions, Scope & Return Values',
        description: 'Zero-indexing, negative indexing, slice notation [start:stop:step], append/extend/pop operations, and list comprehensions.',
        pitfalls: ['IndexError: list index out of range', 'Modifying a list while iterating over it', 'Shallow vs deep copies'],
        codeSnippet: `items = [10, 20, 30, 40, 50]\nprint(items[1:4])  # [20, 30, 40]\nprint(items[-1])   # 50`
      },
      {
        id: 'topic-strings-1',
        title: 'Strings & Text Manipulation',
        status: 'not-started',
        level: 'Intermediate',
        duration: '1.5 hrs',
        prereqs: 'Arrays & Lists',
        description: 'String immutability, methods (split, join, strip, replace), formatting (f-strings), and ASCII/Unicode representations.',
        pitfalls: ['Attempting in-place modification (strings are immutable)', 'String concatenation in tight loops leading to O(n^2) copy overhead'],
        codeSnippet: `text = "  python code analyzer  "\ncleaned = text.strip().title()\nwords = cleaned.split(" ")`
      },
      {
        id: 'topic-hash-1',
        title: 'Hash Tables & Dictionaries',
        status: 'recommended',
        level: 'Intermediate',
        duration: '2.5 hrs',
        prereqs: 'Arrays & Lists',
        description: 'Key-value pairs, hash collision handling, average O(1) lookups, set operations, and frequency counters.',
        pitfalls: ['KeyError when accessing nonexistent keys without .get()', 'Using unhashable types (like lists) as dictionary keys'],
        codeSnippet: `freq = {}\nfor word in ["code", "debug", "code"]:\n    freq[word] = freq.get(word, 0) + 1`
      },
      {
        id: 'topic-stacks-queues',
        title: 'Stacks & Queues',
        status: 'not-started',
        level: 'Intermediate',
        duration: '2 hrs',
        prereqs: 'Arrays & Lists',
        description: 'LIFO (Last In First Out) stack mechanics, FIFO (First In First Out) queue dynamics, collections.deque, and parentheses matching problems.',
        pitfalls: ['Using Python list.pop(0) which is O(n) instead of deque.popleft() which is O(1)'],
        codeSnippet: `from collections import deque\nq = deque(["first", "second"])\nq.append("third")\nprint(q.popleft()) # "first"`
      }
    ]
  },
  {
    id: 'stage-4',
    title: 'Stage 4: Algorithms & Complexity',
    description: 'Analyzing performance, searching, sorting, and algorithm paradigms.',
    color: 'accent-emerald',
    topics: [
      {
        id: 'topic-complexity-1',
        title: 'Big-O Asymptotic Notation',
        status: 'recommended',
        level: 'Intermediate',
        duration: '2 hrs',
        prereqs: 'Nested Loops & Complexity',
        description: 'Understand O(1), O(log n), O(n), O(n log n), O(n^2), and O(2^n). Worst case vs average case, and space memory analysis.',
        pitfalls: ['Ignoring hidden constants in high-level library functions', 'Confusing time complexity with wall-clock execution time'],
        codeSnippet: `# O(1) Constant\nval = arr[0]\n# O(n) Linear\nfor x in arr: pass\n# O(n^2) Quadratic\nfor x in arr:\n    for y in arr: pass`
      },
      {
        id: 'topic-search-sort',
        title: 'Binary Search & Sorting',
        status: 'not-started',
        level: 'Advanced',
        duration: '3 hrs',
        prereqs: 'Big-O Asymptotic Notation',
        description: 'Linear search vs Binary search on sorted arrays, Quicksort, Mergesort, and two-pointer techniques.',
        pitfalls: ['Using binary search on an unsorted list', 'Integer overflow in midpoint calculation in languages like C++/Java'],
        codeSnippet: `def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: low = mid + 1\n        else: high = mid - 1\n    return -1`
      },
      {
        id: 'topic-dp-1',
        title: 'Dynamic Programming & Memoization',
        status: 'not-started',
        level: 'Advanced',
        duration: '3.5 hrs',
        prereqs: 'Recursion & Base Cases',
        description: 'Overlapping subproblems, optimal substructure, top-down memoization, and bottom-up tabulation.',
        pitfalls: ['Failing to cache recursive state', 'Confusing memoization cache keys'],
        codeSnippet: `memo = {}\ndef fib(n):\n    if n in memo: return memo[n]\n    if n <= 1: return n\n    memo[n] = fib(n - 1) + fib(n - 2)\n    return memo[n]`
      }
    ]
  },
  {
    id: 'stage-5',
    title: 'Stage 5: Object-Oriented & Design',
    description: 'Classes, encapsulation, inheritance, and clean code architecture.',
    color: 'accent-amber',
    topics: [
      {
        id: 'topic-oop-1',
        title: 'Classes & Objects',
        status: 'not-started',
        level: 'Intermediate',
        duration: '2.5 hrs',
        prereqs: 'Functions, Scope & Return Values',
        description: 'Classes, instance attributes, self parameter, constructors (__init__), and dunder representation methods (__str__, __repr__).',
        pitfalls: ['Forgetting self as the first parameter of instance methods', 'Confusing class variables with instance variables'],
        codeSnippet: `class Student:\n    def __init__(self, name, roll_no):\n        self.name = name\n        self.roll_no = roll_no\n    def introduce(self):\n        return f"Student {self.name} (#{self.roll_no})"`
      },
      {
        id: 'topic-oop-2',
        title: 'Inheritance & Polymorphism',
        status: 'not-started',
        level: 'Advanced',
        duration: '2 hrs',
        prereqs: 'Classes & Objects',
        description: 'Subclassing, super() initialization, method overriding, and duck typing.',
        pitfalls: ['Forgetting to call super().__init__()', 'Deep inheritance hierarchies causing high coupling'],
        codeSnippet: `class CodeAnalyzer:\n    def analyze(self): pass\n\nclass PythonAnalyzer(CodeAnalyzer):\n    def analyze(self): return "Analyzing AST and syntax rules"`
      }
    ]
  }
];

export const INITIAL_HISTORY = [
  {
    id: 'hist-1',
    timestamp: '2026-11-10 14:45',
    title: 'Score Iteration Boundary',
    language: 'python',
    status: 'Errors Found',
    statusType: 'error',
    issuesCount: 1,
    complexity: 'O(n) Time / O(1) Space',
    codeSnippet: 'for i in range(len(scores) + 1): print(scores[i])',
    notes: 'IndexError: list index out of range at line 6. Recommended topic: Arrays & Lists bounds.'
  },
  {
    id: 'hist-2',
    timestamp: '2026-11-09 18:20',
    title: 'Two Sum Target Solver',
    language: 'python',
    status: 'Optimal Clean',
    statusType: 'success',
    issuesCount: 0,
    complexity: 'O(n) Time / O(n) Space',
    codeSnippet: 'seen = {}; complement = target - num...',
    notes: 'Optimal linear lookup achieved via dictionary hash table.'
  },
  {
    id: 'hist-3',
    timestamp: '2026-11-08 11:15',
    title: 'Average Grade Calculator',
    language: 'python',
    status: 'Runtime Error',
    statusType: 'error',
    issuesCount: 1,
    complexity: 'O(n) Time / O(1) Space',
    codeSnippet: 'average = total / count # zero check missing',
    notes: 'ZeroDivisionError on empty list input. Defensive guard suggested.'
  },
  {
    id: 'hist-4',
    timestamp: '2026-11-06 16:30',
    title: 'Fibonacci Sequence Generator',
    language: 'python',
    status: 'Inefficient',
    statusType: 'warning',
    issuesCount: 1,
    complexity: 'O(2^n) Exponential',
    codeSnippet: 'return fibonacci(n - 1) + fibonacci(n - 2)',
    notes: 'Exponential tree overhead. Memoization or bottom-up loop recommended.'
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    title: 'ClearPath Core Analyzer',
    description: 'SEC Capstone project: Unified code analysis and guided learning platform.',
    language: 'Python / React',
    status: 'In Progress',
    updatedAt: 'Just now',
    tags: ['Capstone', 'EdTech', 'AST', 'AI']
  },
  {
    id: 'proj-2',
    title: 'Binary Search Tree Visualizer',
    description: 'Interactive tree traversal algorithms with step-by-step node highlights.',
    language: 'Python',
    status: 'Needs Optimization',
    updatedAt: '2 days ago',
    tags: ['Data Structures', 'Trees', 'Recursion']
  },
  {
    id: 'proj-3',
    title: 'Student Grade & Attendance Tracker',
    description: 'Automated statistical report generator for classroom grading rubrics.',
    language: 'Python',
    status: 'Completed',
    updatedAt: '1 week ago',
    tags: ['OOP', 'File I/O', 'CLI']
  }
];

export const INITIAL_TASKS = [
  { id: 'task-1', title: 'Complete Stage 2 Nested Loops & Functions', completed: false, category: 'Learning' },
  { id: 'task-2', title: 'Review Big-O Complexity for Hash Maps', completed: true, category: 'Concepts' },
  { id: 'task-3', title: 'Test ZeroDivisionError guard on student submissions', completed: true, category: 'Debugging' },
  { id: 'task-4', title: 'Refactor Fibonacci recursive function to iterative O(n)', completed: false, category: 'Optimization' }
];

export const INITIAL_STUDENT_PROFILE = {
  name: 'Renu Asmitha T',
  username: 'renu_asmitha',
  role: 'B.Tech Computer Science Engineering',
  institution: 'School of Computing & Engineering',
  capstone: 'ClearPath: AI-Powered Code Analysis & Guided Learning Platform',
  bio: 'CS undergraduate passionate about building developer tools, mastering data structures & algorithms, and making programming education accessible to every student.',
  preferredLanguage: 'Python',
  experienceLevel: 'Undergraduate Intermediate',
  streakDays: 7,
  xpPoints: 1420,
  completedTopicsCount: 4,
  totalTopicsCount: 16,
  analysesRun: 28,
  errorsDecoded: 19
};
