/**
 * TYPESCRIPT KATAS - INTERVIEW PREPARATION
 * 
 * A collection of coding challenges organized by difficulty level.
 * These exercises focus on core TypeScript concepts, algorithms, and problem-solving.
 * 
 * Difficulty levels: EASY → MEDIUM → HARD
 */

// ============================================================================
// EASY KATAS
// ============================================================================

/**
 * KATA 1: String Reversal
 * Reverse a string without using built-in reverse method
 * 
 * Example: "hello" → "olleh"
 */

function reverseWord(word: string): string {
  // we could shift each element of the string 
  return word.split('').reverse().join('')
}

// console.log(reverseWord("hello"))

/**
 * KATA 2: Find the Max
 * Return the largest number in an array
 * 
 * Example: [3, 1, 4, 1, 5, 9] → 9
 */

function findMaxNumber(numbers: number[]): number {
  // maxValueTracker
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) max = numbers[i];
  }
  return max
}
const numbers = [3, 1, 4, 1, 5, 9]
console.log(findMaxNumber(numbers))

/**
 * KATA 3: Count Occurrences
 * Count how many times a character appears in a string
 * 
 * Example: ("hello", "l") → 2
 */

function countLetter(word: string, str: string): number {
  // break down the string into an array loop through it and increment a counter
  let counter = 0
  word.split('').forEach(char => {
    if(char == str) {
      counter++
    }  
  });

  return counter
}

console.log(countLetter("hello", "l")) // should = 2

/**
 * KATA 4: Sum Array
 * Return the sum of all numbers in an array
 * 
 * Example: [1, 2, 3, 4, 5] → 15
 */

function sumArray(numbers: number[]): number {
  // could we use reduce for this?
  return numbers.reduce((acc, current) => acc + current, 0)
}

console.log(sumArray([1, 2, 3, 4, 5])) // 15

/**
 * KATA 5: Filter Even Numbers
 * Return only the even numbers from an array
 * 
 * Example: [1, 2, 3, 4, 5, 6] → [2, 4, 6]
 */

function filterEventNumbers(numbers: number[]): number[] {
  // we need to have a conditional that captures the even numbers only I think filter will do this
  return numbers.filter(num => num % 2 === 0);
}

console.log(filterEventNumbers([1, 2, 3, 4, 5, 6]))

/**
 * KATA 6: Capitalize String
 * Capitalize the first letter of each word
 * 
 * Example: "hello world" → "Hello World"
 */

function capitalize(str: string): string {
  // we want to convert the string into an array but we want to split by the word
  // then we want to update the fist element of each array the to upper case.
  return str.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")
}

capitalize("hello world")

/**
 * KATA 7: Duplicate Array Elements
 * Double each element in an array
 * 
 * Example: [1, 2, 3] → [2, 4, 6]
 */
function doubleArray(numbers: number[]): number[] {
  return numbers.map(number => number * 2);
}

console.log(doubleArray([1, 2, 3]))

/**
 * KATA 8: Type Custom Type
 * Create a type for a Person with name (string), age (number), email (string)
 * Then create a function that validates if an object matches this type
 * 
 * Bonus: Make age optional
 */
type Person = {
  name: String,
  age?: Number,
  email: String
};

function isPerson(obj: unknown): obj is Person {
  if (typeof obj !== "object" || obj === null) return false
  const {name, email, age} = obj as {name?: unknown, email?: unknown, age?: unknown }
  return (
    typeof name === "string" &&
    typeof email === "string" &&
    (age === undefined || typeof age === "number")
  )
}

// ============================================================================
// MEDIUM KATAS
// ============================================================================

/**
 * KATA 9: Fibonacci Sequence
 * Return an array of the first n Fibonacci numbers
 * 
 * Example (n=5): [0, 1, 1, 2, 3]
 */

//  a series of numbers where each number is the sum of the two preceding ones

function fibonacci(n: number): number[] {
  // based on the n value we need to count up to that value and return an array of numbers
  // we can use the index value of the number in a for loop perhaps for this
  let numArr : number[] = []
  for (let index = 0; index < n; index++) {
    // on the first iteration we need to go 0 + 1 and add that to the array
    if (index === 0) {
      numArr.push(0)
    }

    if (index === 1) {
      numArr.push(1)
    }

    if (index > 1 ) {
      // we need to push the sum of the previous two elements
      // how do we capture the previous two elements??
      // next=numArr[i−1]+numArr[i−2]
      numArr.push(numArr[index-1] + numArr[index-2])
    }
    console.log(numArr, "NUMBERS ARRAY")
    console.log(index, 'index')
    console.log(n, 'number key')
    // we break the loop when the last two elements of the array = the n number key
    // we must keep pushing to the array based on the index
  }
  return numArr
}

console.log(fibonacci(5))

/**
 * KATA 10: Palindrome Check
 * Determine if a string is a palindrome (ignoring spaces and case)
 * 
 * Example: "racecar" → true, "hello" → false, "A man a plan a canal Panama" → true
 */

function isPalindrome(str: string): boolean {
  // we need to ignore spaces and case..
  const normalisedStr = str.toLowerCase().replace(/\s+/g, '')
  let strArry = normalisedStr.split('');
  // we know we will be splitting the string into an array
  // next we need to know if the array is reversed and made back into a string
  // if it === the str arg we passed in
  // we could use map to create a new array? 
  const reversed = strArry.reverse().join('')
  if (reversed === normalisedStr) {
    return true
  } else {
    return false
  }
}

/**
 * KATA 11: Array Intersection
 * Return elements that appear in both arrays
 * 
 * Example: ([1, 2, 3, 4], [3, 4, 5, 6]) → [3, 4]
 */

// TODO: remember the filter method its amazing.
function intersection(arr1: number[], arr2: number[]): number[] {
  return arr1.filter(num => arr2.includes(num))
}

/**
 * KATA 12: Group By Property
 * Group array of objects by a specific property
 * 
 * Example: ([{name: "Alice", age: 25}, {name: "Bob", age: 25}], "age") 
 * → { 25: [{name: "Alice", age: 25}, {name: "Bob", age: 25}] }
 */
function groupBy<T extends Record<string, any>, K extends keyof T>(
  items: T[],
  key: K
): Record<string | number, T[]> {
  const result: Record<string | number, T[]> = {}
  for (const item of items) {
    const groupValue = item[key];
    const groupKey = String(groupValue)
    if (!result[groupKey]) {
      // if there is no array for that key yet we create one
      result[groupKey] = []
    }
    result[groupKey].push(item)
  }
  return result
}

let testItems = [{name: "Alice", age: 25}, {name: "Bob", age: 25}]
console.log(groupBy(testItems, 'name'))

/**
 * KATA 13: Flatten Array
 * Convert a nested array into a single-level array
 * 
 * Example: [1, [2, 3], [4, [5, 6]]] → [1, 2, 3, 4, 5, 6]
 */
// TODO: practice legacy broswer version as well here..

function flattenArray(arr: any[]): any[] {
  return arr.flat(Infinity)
}

console.log(flattenArray([1, [2, 3], [4, [5, 6]]]))

/**
 * KATA 14: Unique Elements
 * Return only unique elements from an array
 * 
 * Example: [1, 2, 2, 3, 3, 3, 4] → [1, 2, 3, 4]
 */

// NOTE: remember the magic of Set declaring a new one will automatically remove duplicates from an array
function returnUniqueValues<T>(arr: T[]): T[] {
  return [... new Set(arr)];
}

console.log(returnUniqueValues([1, 2, 2, 3, 3, 3, 4]))

/**
 * KATA 15: Sort By Key
 * Sort an array of objects by a specific key and direction
 * 
 * Example: ([{id: 2, name: "Bob"}, {id: 1, name: "Alice"}], "id", "asc")
 * → [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]
 */
function kata15_sortByKey<T extends Record<string, any>>(
  items: T[],
  key: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] {
  // TODO: Implement
  return [];
}

/**
 * KATA 16: Debounce Function
 * Create a debounce utility that delays function execution
 * The function should only execute after n milliseconds of inactivity
 * 
 * Example: debounced function called 3x quickly, then waits 300ms → executes once
 */
function kata16_debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  // TODO: Implement
  return () => {};
}

// ============================================================================
// HARD KATAS
// ============================================================================

/**
 * KATA 17: Curry Function
 * Transform a function with multiple arguments into a sequence of functions
 * 
 * Example: 
 * const add = (a, b, c) => a + b + c
 * const curriedAdd = curry(add)
 * curriedAdd(1)(2)(3) → 6
 */
function kata17_curry<T extends (...args: any[]) => any>(
  func: T
): (...args: any[]) => any {
  // TODO: Implement
  return () => {};
}

/**
 * KATA 18: Memoization
 * Cache the results of a function to improve performance
 * 
 * Example: A slow fibonacci function becomes instant after first call
 */
function kata18_memoize<T extends (...args: any[]) => any>(
  func: T
): T {
  // TODO: Implement
  return func;
}

/**
 * KATA 19: Deep Clone
 * Create a deep copy of an object (handles nested objects/arrays)
 * 
 * Challenge: Handle circular references
 */
function kata19_deepClone<T>(obj: T): T {
  // TODO: Implement
  return obj;
}

/**
 * KATA 20: Async Retry
 * Retry an async function up to n times with exponential backoff
 * 
 * Example: asyncRetry(failingRequest, 3, 1000)
 * Would retry 3 times with delays of 1s, 2s, 4s
 */
async function kata20_asyncRetry<T>(
  func: () => Promise<T>,
  maxRetries: number,
  initialDelay: number
): Promise<T> {
  // TODO: Implement
  throw new Error('Not implemented');
}

/**
 * KATA 21: Type-Safe Event Emitter
 * Create a type-safe event system where events have specific payloads
 * 
 * Example:
 * const emitter = new EventEmitter<{ 'user-login': { id: number } }>()
 * emitter.on('user-login', (data) => console.log(data.id))
 * emitter.emit('user-login', { id: 1 })
 */
class kata21_EventEmitter<T extends Record<string, any>> {
  private listeners: Map<string, Set<(data: any) => void>> = new Map();

  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    // TODO: Implement
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    // TODO: Implement
  }

  off<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    // TODO: Implement
  }
}

/**
 * KATA 22: Advanced Generics - Conditional Types
 * Create a type that returns the array element type or the type itself
 * 
 * Example:
 * type Flatten<T> = T extends Array<infer U> ? U : T
 * type A = Flatten<string[]> // string
 * type B = Flatten<number> // number
 */
type kata22_Flatten<T> = T extends Array<infer U> ? U : T;

/**
 * KATA 23: State Machine
 * Implement a type-safe state machine with allowed transitions
 * 
 * Example:
 * State: idle → loading → success/error → idle
 * Only allow valid transitions
 */
type StateMachine = {
  // TODO: Implement state machine transitions
  // States: 'idle' | 'loading' | 'success' | 'error'
  // Define what states can transition to what
};

/**
 * KATA 24: Tree Traversal
 * Create a tree node class and implement depth-first and breadth-first traversal
 * 
 * Example:
 *       1
 *      / \
 *     2   3
 *    / \
 *   4   5
 * 
 * DFS: [1, 2, 4, 5, 3]
 * BFS: [1, 2, 3, 4, 5]
 */
class kata24_TreeNode<T> {
  constructor(public value: T, public left?: kata24_TreeNode<T>, public right?: kata24_TreeNode<T>) {}

  depthFirstTraverse(): T[] {
    // TODO: Implement
    return [];
  }

  breadthFirstTraverse(): T[] {
    // TODO: Implement
    return [];
  }
}

/**
 * KATA 25: Middleware Pipeline
 * Create a middleware system where functions can intercept and modify data
 * 
 * Example:
 * pipeline.use((data) => ({...data, processed: true}))
 * pipeline.use((data) => ({...data, timestamp: Date.now()}))
 * const result = pipeline.execute({})
 * // result = { processed: true, timestamp: ... }
 */
class kata25_Pipeline<T> {
  private middlewares: Array<(data: T) => T> = [];

  use(middleware: (data: T) => T): this {
    // TODO: Implement
    return this;
  }

  async execute(initialData: T): Promise<T> {
    // TODO: Implement
    return initialData;
  }
}

/**
 * KATA 26: Promise.all vs Promise.race Implementation
 * Implement your own versions of Promise utilities
 */
async function kata26_promiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
  // TODO: Implement - resolve when all resolve, reject if any rejects
  return [];
}

async function kata26_promiseRace<T>(promises: Promise<T>[]): Promise<T> {
  // TODO: Implement - resolve/reject with first settled promise
  throw new Error('Not implemented');
}

/**
 * KATA 27: LRU (Least Recently Used) Cache
 * Implement a cache with a maximum size that evicts least recently used items
 * 
 * Example:
 * const cache = new LRUCache(2)
 * cache.set('a', 1); cache.set('b', 2)
 * cache.get('a') // 1, marks 'a' as recently used
 * cache.set('c', 3) // evicts 'b' as least recently used
 * cache.get('b') // undefined
 */
class kata27_LRUCache<K, V> {
  constructor(maxSize: number) {
    // TODO: Implement
  }

  get(key: K): V | undefined {
    // TODO: Implement
    return undefined;
  }

  set(key: K, value: V): void {
    // TODO: Implement
  }
}

/**
 * KATA 28: Type-Safe Redux-like Store
 * Create a mini Redux implementation with typed actions and reducers
 * 
 * Example:
 * type State = { count: number }
 * type Actions = { type: 'INCREMENT' } | { type: 'DECREMENT' }
 * 
 * const store = new Store(initialState, reducer)
 * store.subscribe((state) => console.log(state))
 * store.dispatch({ type: 'INCREMENT' })
 */
class kata28_Store<S, A extends { type: string }> {
  private state: S;
  private listeners: Set<(state: S) => void> = new Set();

  constructor(
    initialState: S,
    private reducer: (state: S, action: A) => S
  ) {
    this.state = initialState;
  }

  getState(): S {
    // TODO: Implement
    return this.state;
  }

  dispatch(action: A): void {
    // TODO: Implement
  }

  subscribe(listener: (state: S) => void): () => void {
    // TODO: Implement - return unsubscribe function
    return () => {};
  }
}

/**
 * KATA 29: Dependency Injection Container
 * Build a simple DI container that manages object creation and dependencies
 * 
 * Example:
 * container.register('db', () => new Database())
 * container.register('userService', (container) => new UserService(container.get('db')))
 * const service = container.get('userService')
 */
class kata29_DIContainer {
  private factories: Map<string, (container: this) => any> = new Map();
  private singletons: Map<string, any> = new Map();

  register(name: string, factory: (container: this) => any, singleton: boolean = false): void {
    // TODO: Implement
  }

  get<T = any>(name: string): T {
    // TODO: Implement
    return undefined as any;
  }
}

/**
 * KATA 30: Type-Safe Router
 * Create a type-safe route handler system with path parameters
 * 
 * Example:
 * router.get('/users/:id', (params: { id: string }) => { ... })
 * 
 * The type system should ensure:
 * - Route params match the path pattern
 * - Handler receives correct param types
 */
class kata30_TypeSafeRouter {
  private routes: Map<string, (params: any) => any> = new Map();

  get(path: string, handler: (params: any) => any): void {
    // TODO: Implement
  }

  dispatch(method: string, path: string): any {
    // TODO: Implement - extract params and call handler
  }
}

// ============================================================================
// EXPORT
// ============================================================================

export {
  kata1_reverseString,
  kata2_findMax,
  kata3_countOccurrences,
  kata4_sumArray,
  kata5_filterEven,
  kata6_capitalize,
  kata7_doubleArray,
  kata8_isPerson,
  kata9_fibonacci,
  kata10_isPalindrome,
  kata11_intersection,
  kata12_groupBy,
  kata13_flattenArray,
  kata14_unique,
  kata15_sortByKey,
  kata16_debounce,
  kata17_curry,
  kata18_memoize,
  kata19_deepClone,
  kata20_asyncRetry,
  kata21_EventEmitter,
  kata22_Flatten,
  kata24_TreeNode,
  kata25_Pipeline,
  kata26_promiseAll,
  kata26_promiseRace,
  kata27_LRUCache,
  kata28_Store,
  kata29_DIContainer,
  kata30_TypeSafeRouter,
};
