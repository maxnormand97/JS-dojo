/**
 * JAVASCRIPT WARM-UP EXERCISES
 * Core JavaScript concepts for frontend/full-stack interviews.
 */

// ============================================================================
// EXERCISE 1: CLOSURES & SCOPE
// ============================================================================

// TODO: Return a closure that multiplies by captured value.
function createMultiplier(multiplier) {
}

// TODO: Build counter with private state.
function createCounter() {
}

// TODO: Explain var vs let vs const with examples.

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
