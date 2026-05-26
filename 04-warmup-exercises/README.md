# Warm-Up Exercises: TypeScript, JavaScript, and React

A comprehensive set of **foundational exercises** covering essential concepts for frontend and full-stack development. Start here before tackling advanced topics.

## 📚 Structure

```
04-warmup-exercises/
├── ts-warmup.ts         # TypeScript fundamentals (10 exercises)
├── js-warmup.js         # JavaScript core concepts (10 exercises)
├── react-warmup.tsx     # React basics (10 exercises)
└── README.md           # This file
```

---

## 🎯 Prerequisites & Time Estimates

| Module | Prerequisites | Duration | Difficulty |
|--------|---------------|----------|-----------|
| **TypeScript** | Basic JavaScript | 4-6 hours | Beginner - Intermediate |
| **JavaScript** | None (JS foundation) | 5-8 hours | Beginner - Intermediate |
| **React** | TypeScript + JavaScript | 4-6 hours | Intermediate |

---

## 📖 TypeScript Warm-Up (10 Exercises)

**Location**: `ts-warmup.ts`

### What You'll Learn
- Type annotations and basic types
- Union and intersection types
- When to use `type` vs `interface`
- Enums and literal types
- Array and object typing
- Optional and readonly properties
- Type assertions and type guards
- Basic generics
- Handling different data shapes

### Exercises Breakdown

#### 1. Basic Types & Annotations
**Concepts**: `string`, `number`, `boolean`, arrays, objects, functions
```typescript
// TODO: Annotate variables with correct TypeScript types
// userName: string, userAge: number, isActive: boolean, etc.
```
**Why it matters**: Proper typing is the foundation - IDE autocomplete, compiler checks

#### 2. Union & Intersection Types
**Concepts**: `|` for union, `&` for intersection, type narrowing
```typescript
type A = { a: string };
type B = { b: number };
type Union = A | B;           // Either A or B
type Intersection = A & B;    // Both A and B
```
**Why it matters**: Express complex relationships between types

#### 3. Type vs Interface
**Concepts**: When to use each, extension patterns, merging
```typescript
interface Animal { name: string }          // Good for objects
type Status = 'active' | 'inactive';       // Good for unions
```
**Why it matters**: Better code organization and understanding TypeScript philosophy

#### 4. Enums & Literal Types
**Concepts**: Fixed sets of values, type-safe constants
```typescript
enum Status { Active, Inactive, Banned }
type Role = 'admin' | 'user' | 'guest';
```
**Why it matters**: Prevents typos and invalid values at compile time

#### 5. Array & Object Typing
**Concepts**: Arrays, tuples, Record, complex shapes
```typescript
type User = { id: number; name: string };
const users: User[] = [/* ... */];
const scores: Record<string, number> = { alice: 100 };
```
**Why it matters**: Type inference for large data structures

#### 6. Optional & Readonly Properties
**Concepts**: `?` for optional, `readonly` modifier, utility types
```typescript
type Config = {
  host: string;           // Required
  timeout?: number;       // Optional
  readonly version: string; // Can't change
};
```
**Why it matters**: Prevent bugs from missing or accidentally modified data

#### 7. Type Assertions & Type Guards
**Concepts**: Narrowing types, `typeof`, `instanceof`, type predicates
```typescript
if (typeof value === 'string') { /* use as string */ }
const str = unknownValue as string; // Assertion
```
**Why it matters**: Handle dynamic values safely at runtime

#### 8. Basic Generics
**Concepts**: Type parameters, reusable types
```typescript
type Container<T> = { value: T };
function wrap<T>(value: T): Container<T> { /* ... */ }
```
**Why it matters**: Write once, use with any type

#### 9. Conditional Types & Rendering
**Concepts**: State shapes with discriminators
```typescript
type Result<T> = 
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
```
**Why it matters**: Model real-world async states

#### 10. Practical Application
**Challenge**: Build a realistic UserRepository with all concepts combined

---

## 🎯 JavaScript Warm-Up (10 Exercises)

**Location**: `js-warmup.js`

### What You'll Learn
- Closures and scope
- Promises and async/await
- Destructuring
- Spread operator
- Array methods (map, filter, reduce)
- Object manipulation
- String methods and templates
- Error handling
- ES6 classes

### Exercises Breakdown

#### 1. Closures & Scope
**Concepts**: Variable capture, function scope, `var` vs `let` vs `const`
```javascript
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;  // Captures multiplier
  };
}
const double = createMultiplier(2);
double(5);  // Returns 10
```
**Why it matters**: Foundation for React callbacks, higher-order functions

#### 2. Promises & Async/Await
**Concepts**: Asynchronous code, `.then()/.catch()`, `async`/`await`
```javascript
// Promise
fetch(url).then(r => r.json()).catch(err => console.error(err));

// Async/await (cleaner)
async function getData() {
  try {
    const data = await fetch(url).then(r => r.json());
  } catch (err) { console.error(err); }
}
```
**Why it matters**: Essential for API calls, server communication

#### 3. Destructuring
**Concepts**: Extract values from objects/arrays
```javascript
const { name, age } = user;           // Object
const [first, second, ...rest] = arr; // Array
function display({ name, age }) { }   // Function params
```
**Why it matters**: Cleaner, more readable code (React uses this heavily)

#### 4. Spread Operator
**Concepts**: Shallow copy, combining, removing properties
```javascript
const copy = { ...original };
const merged = { ...obj1, ...obj2, extra: 'value' };
const { password, ...sanitized } = user; // Remove password
```
**Why it matters**: Critical for immutable state updates in React

#### 5. Array Methods
**Concepts**: `.map()`, `.filter()`, `.reduce()`, `.find()`, `.some()`, `.every()`
```javascript
users.map(u => u.name)                    // Transform
users.filter(u => u.age > 18)             // Select
users.reduce((sum, u) => sum + u.score) // Aggregate
```
**Why it matters**: Rendering lists, transforming data in React

#### 6. Object Manipulation
**Concepts**: `Object.keys()`, `Object.entries()`, `Object.assign()`, checking properties
```javascript
Object.keys(obj)     // Get all keys
Object.values(obj)   // Get all values
Object.entries(obj)  // Get [key, value] pairs
Object.assign({}, obj1, obj2)  // Merge objects
```
**Why it matters**: Merging data, working with dynamic objects

#### 7. Template Literals & Strings
**Concepts**: Backtick strings, `${}` interpolation, methods
```javascript
const msg = `Hello, ${name}!`;
str.includes('text')
str.toUpperCase()
str.split(',')
```
**Why it matters**: Building strings, avoiding concatenation errors

#### 8. Error Handling
**Concepts**: `try`/`catch`/`finally`, custom errors, throwing
```javascript
try {
  JSON.parse(jsonStr);
} catch (error) {
  console.error(error);
} finally {
  cleanup();
}
```
**Why it matters**: Robust applications handle errors gracefully

#### 9. ES6 Classes
**Concepts**: Constructor, methods, inheritance, static, private fields
```javascript
class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} speaks`; }
}
class Dog extends Animal {
  speak() { return `${this.name} barks`; }
}
```
**Why it matters**: Object-oriented patterns, understanding React class components

#### 10. Practical Application
**Challenges**: ShoppingCart class, async data fetching, utility functions

---

## 🎯 React Warm-Up (10 Exercises)

**Location**: `react-warmup.tsx`

### What You'll Learn
- JSX syntax and rendering
- Functional components and props
- `useState` hook
- `useEffect` hook
- Event handling
- Conditional rendering
- Lists and keys
- Controlled forms
- Component composition
- Real-world patterns

### Exercises Breakdown

#### 1. JSX Basics & Rendering
**Concepts**: JSX syntax, expressions, attributes, fragments
```jsx
const element = <h1>Hello, {name}!</h1>;
const list = (
  <>
    <p>Item 1</p>
    <p>Item 2</p>
  </>  // Fragment returns multiple elements
);
```
**Why it matters**: JSX is React's core syntax

#### 2. Functional Components & Props
**Concepts**: Components as functions, props, destructuring
```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
// Usage: <Welcome name="Alice" />
```
**Why it matters**: Props are how React passes data (one-way down)

#### 3. useState Hook
**Concepts**: Local state, state updates, multiple state
```jsx
const [count, setCount] = useState(0);
const handleClick = () => setCount(count + 1);
```
**Why it matters**: Most fundamental React hook

#### 4. useEffect Hook
**Concepts**: Side effects, cleanup, dependencies
```jsx
useEffect(() => {
  const unsubscribe = subscribe();
  return () => unsubscribe();
}, [dependency]);
```
**Why it matters**: Handle data fetching, subscriptions, timers

#### 5. Event Handling
**Concepts**: Click, change, submit, parameter passing
```jsx
<button onClick={() => handleClick(id)}>Delete</button>
<input onChange={(e) => setValue(e.target.value)} />
<form onSubmit={(e) => { e.preventDefault(); /* ... */ }}>
```
**Why it matters**: Respond to user interactions

#### 6. Conditional Rendering
**Concepts**: If/else, ternary, &&, early return
```jsx
{isLoading ? <Spinner /> : <Data />}
{user && <Profile user={user} />}
{status === 'error' && <Error />}
```
**Why it matters**: Show different UIs based on state

#### 7. Lists & Keys
**Concepts**: `.map()` rendering, key importance
```jsx
{users.map(user => (
  <div key={user.id}>{user.name}</div>
))}
```
**Why it matters**: Efficient list rendering, React performance

#### 8. Controlled Components & Forms
**Concepts**: Form inputs as state, value/onChange binding
```jsx
const [email, setEmail] = useState('');
return (
  <input 
    value={email} 
    onChange={(e) => setEmail(e.target.value)}
  />
);
```
**Why it matters**: React is the source of truth for form data

#### 9. Component Composition
**Concepts**: Parent/child components, prop drilling, composition
```jsx
<Layout header={<Header />} main={<Main />} footer={<Footer />} />
```
**Why it matters**: Build complex UIs from simple pieces

#### 10. Practical Application
**Challenges**: TodoApp, TemperatureConverter, DataTable

---

## 🧪 How to Use These Exercises

### For Each Exercise File

1. **Open the file** (`ts-warmup.ts`, etc.)
2. **Read the detailed comments** - They explain what to implement
3. **Look for TODO comments** - These mark implementation points
4. **Implement each exercise** in order
5. **Test your implementation** (compile/run)
6. **Move to next exercise** once it works

### For TypeScript Exercises

```bash
# Type check (recommended)
npx tsc --noEmit ts-warmup.ts

# Or compile and check
npx tsc ts-warmup.ts
```

**Success criteria**:
- ✅ No TypeScript errors
- ✅ Types are specific (no `any` types)
- ✅ IDE autocomplete works correctly

### For JavaScript Exercises

```bash
# Run in Node.js
node js-warmup.js

# Or test individual functions in browser console
```

**Success criteria**:
- ✅ Functions work as expected
- ✅ No runtime errors
- ✅ Outputs match expected behavior

### For React Exercises

```bash
# In a React project (Create React App, Vite, etc.)
# Copy exercise code into a component
# Test in browser

# Example:
// In your app.tsx
import './react-warmup.tsx'
```

**Success criteria**:
- ✅ Components render without errors
- ✅ State updates work
- ✅ Events fire correctly
- ✅ Behavior matches descriptions

---

## 🎓 Recommended Learning Path

### Week 1: JavaScript Foundation
- **Day 1-2**: JS Exercises 1-3 (Closures, Promises, Destructuring)
- **Day 3**: JS Exercises 4-5 (Spread, Array Methods)
- **Day 4**: JS Exercises 6-7 (Objects, Strings)
- **Day 5**: JS Exercises 8-10 (Error handling, Classes)

### Week 2: TypeScript & React
- **Day 1-2**: TS Exercises 1-4 (Types, Interfaces, Enums)
- **Day 3**: TS Exercises 5-7 (Arrays, Assertions)
- **Day 4**: TS Exercises 8-10 (Generics, Application)
- **Day 5-6**: React Exercises 1-5 (JSX, Components, Hooks)
- **Day 7**: React Exercises 6-10 (Rendering, Forms, Application)

### After Warm-ups → Advanced Exercises
Once you complete warm-ups, you're ready for:
- **05-ts-exercises** - Advanced TypeScript patterns
- **06-task-management** - Full React + TypeScript project

---

## 💡 Tips for Success

### TypeScript Tips
1. **Use `noImplicitAny: true`** - Forces you to be explicit about types
2. **Check IDE suggestions** - TypeScript tells you what properties are available
3. **Use `keyof`** - Reference object keys as types
4. **Avoid `as`** - Type assertions are usually a code smell
5. **Read error messages carefully** - They're very informative

### JavaScript Tips
1. **Use `const` by default** - Immutability helps prevent bugs
2. **Use arrow functions** - Cleaner syntax and correct `this` binding
3. **Avoid `var`** - Always use `let` and `const`
4. **Test in console** - Browser devtools are your friends
5. **Use template literals** - Cleaner than string concatenation

### React Tips
1. **Always include key in lists** - Never use array index as key!
2. **Verify dependency arrays** - Missing deps = hard-to-debug bugs
3. **Clean up effects** - Return cleanup function to prevent memory leaks
4. **Don't mutate state** - Always create new objects
5. **Use the rules of hooks** - Hooks must be at top level, not conditional

---

## 🔗 Progression Path

```
4. WARM-UPS (You are here)
   ↓
5. ADVANCED TS EXERCISES
   ↓
6. REACT MINI-PROJECT
   ↓
Production Ready!
```

Each level builds on previous ones. Warm-ups give you the fundamentals, advanced exercises teach patterns, mini-project puts it all together.

---

## 📚 External Resources

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Type Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

### JavaScript
- [JavaScript.info](https://javascript.info/) - Comprehensive guide
- [MDN Web Docs](https://developer.mozilla.org/)
- Async/await: https://javascript.info/async-await
- Destructuring: https://javascript.info/destructuring-assignment

### React
- [React Official Docs](https://react.dev)
- [Hooks API Reference](https://react.dev/reference/react)
- [Thinking in React](https://react.dev/learn)

---

## ✅ Implementation Checklist

### TypeScript Warm-ups
- [ ] Exercise 1: Basic types working
- [ ] Exercise 2: Union/intersection types
- [ ] Exercise 3: Type vs Interface decisions
- [ ] Exercise 4: Enums and literals
- [ ] Exercise 5: Complex typing
- [ ] Exercise 6: Optional/readonly
- [ ] Exercise 7: Guards and assertions
- [ ] Exercise 8: Generics
- [ ] Exercise 9: Conditional types
- [ ] Exercise 10: Complete application

### JavaScript Warm-ups
- [ ] Exercise 1: Closures working
- [ ] Exercise 2: Promises and async/await
- [ ] Exercise 3: Destructuring
- [ ] Exercise 4: Spread operator
- [ ] Exercise 5: Array methods
- [ ] Exercise 6: Object manipulation
- [ ] Exercise 7: String methods
- [ ] Exercise 8: Error handling
- [ ] Exercise 9: Classes
- [ ] Exercise 10: Practical app

### React Warm-ups
- [ ] Exercise 1: JSX rendering
- [ ] Exercise 2: Components and props
- [ ] Exercise 3: useState
- [ ] Exercise 4: useEffect
- [ ] Exercise 5: Events
- [ ] Exercise 6: Conditional rendering
- [ ] Exercise 7: Lists and keys
- [ ] Exercise 8: Forms
- [ ] Exercise 9: Composition
- [ ] Exercise 10: Full application

---

## 🚀 Moving Forward

After completing these warm-ups, you'll be ready for:

1. **Advanced TypeScript** (`05-ts-exercises/`) - Interfaces extending, overloading, generics with constraints, discriminated unions, context
2. **Task Management Project** (`06-task-management/`) - Full React + TypeScript integration

These exercises provide the **solid foundation** you need to master the advanced concepts.

Good luck! 📚
