/**
 * JAVASCRIPT WARM-UP EXERCISES
 * Core JavaScript concepts for frontend/full-stack interviews.
 */

// ============================================================================
// EXERCISE 1: CLOSURES & SCOPE
// ============================================================================


// A closure is a function that 'remembers' the environment in which it was
// created, even after the enviroment has finished executing. This means that it
// can access variables from its outer scope not just its own local variables.

// Passing a function as an argument is related to Higher-order functions, closures
// are more about retaining access to variable from an outer scope.

// Because they encapsulate private state we can 'hide' varaibles inside the functions scope
// keeping them safe and not accessible from the outside. This is great for things like
// counters and caches or just data you don't want to expose locally.


function createMultiplier(multiplier) {
  // inner function to multiply whats passed in from the outer
  return function (value) {
    return value * multiplier;
  }
}

const double = createMultiplier(2)
console.log(double(5))

// we need something to increment count
function createCounter() {
  let count = 0 // private var only accessible in the scope of this function
  
  // we return a function call that updates this private variable
  return function () {
    return ++count
  }
}

const counter = createCounter()
console.log(counter()) // 1
console.log(counter()) // 2
// ect

// Advanced counter a closure can have multiple function definitions
function createAdvancedCounter() {
  let count = 0
  return {
    // we can define multiple functions to update our private variables
    increment: function() { return ++count; },
    decrement: function() { return --count; }
  }
}

const advancdCounter = createAdvancedCounter()
console.log(advancdCounter.increment)
console.log(advancdCounter.decrement)


// let is block scoped and mutable
// var is function scoped and can lead to bugs due to hoisting and wider scope
// const is block scoped but the variable binding cannot be re-assigned but if its
// an object there contents can be mutated.

// ============================================================================
// EXERCISE 2: PROMISES & ASYNC/AWAIT
// ============================================================================

// TODO: Return a promise that resolves after ms.
function delay(ms) {
}

// TODO: Use async/await with try/catch.
async function waitAndPrint() {
}

// TODO: Implement fetchUserData with proper error handling.
async function fetchUserData(userId) {
}

// TODO: Fetch many users in parallel with Promise.all.
async function fetchMultipleUsers(userIds) {
}

// ============================================================================
// EXERCISE 3: DESTRUCTURING
// ============================================================================

// TODO: Practice object, array, nested, defaults, and param destructuring.

// ============================================================================
// EXERCISE 4: SPREAD OPERATOR
// ============================================================================

// TODO: Practice immutable array/object updates.

// ============================================================================
// EXERCISE 5: ARRAY METHODS
// ============================================================================

const sampleUsers = [
  { id: 1, name: 'Alice', score: 85 },
  { id: 2, name: 'Bob', score: 92 },
  { id: 3, name: 'Charlie', score: 78 },
];

// TODO: map

// TODO: filter

// TODO: reduce

// ============================================================================
// EXERCISE 6: OBJECT MANIPULATION
// ============================================================================

// TODO: keys, values, entries, merge, existence checks.

// ============================================================================
// EXERCISE 7: TEMPLATE LITERALS & STRINGS
// ============================================================================

// TODO: interpolation, multiline strings, common string methods.

// ============================================================================
// EXERCISE 8: ERROR HANDLING
// ============================================================================

function safeParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error(error);
    return null;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

// ============================================================================
// EXERCISE 9: ES6 CLASSES
// ============================================================================

// TODO: Build classes with inheritance and shared behavior.

// ============================================================================
// EXERCISE 10: PRACTICAL APPLICATION
// ============================================================================

// TODO: Build a small practical utility combining concepts above.

void createMultiplier;
void createCounter;
void waitAndPrint;
void fetchUserData;
void fetchMultipleUsers;
void getNames;
void getHighScorers;
void totalScore;
void safeParse;
void ValidationError;
void sampleUsers;
