# Advanced TypeScript & React Learning Path

A comprehensive set of **foundational and advanced exercises** for frontend and full-stack development. Master the core concepts before diving into advanced patterns. This learning path covers TypeScript, JavaScript, and React with practical mini-projects.

## 📚 What's Included

### Part 0: Warm-Up Exercises (Foundational - 30 Exercises)
**Location**: [`04-warmup-exercises/`](./04-warmup-exercises/)

Three modules with 10 exercises each covering essential concepts:

1. **TypeScript Warm-Up (10 exercises)** - Basic types, unions, interfaces, generics
2. **JavaScript Warm-Up (10 exercises)** - Closures, async/await, destructuring, classes
3. **React Warm-Up (10 exercises)** - JSX, components, hooks, forms

Start here if you're new or want to refresh fundamentals.

**Duration**: 13-20 hours  
**Difficulty**: Beginner → Intermediate  
**Format**: Boilerplate with TODO comments

[👉 Start the Warm-Up Exercises](./04-warmup-exercises/README.md)

---

### Part 1: Advanced TypeScript Exercises (5 Exercises)
**Location**: [`05-ts-exercises/`](./05-ts-exercises/)

Five focused exercises covering the most important advanced TypeScript concepts:

1. **Advanced TS Interfaces** - Extension and merging patterns
2. **Function Overloading** - Multiple signatures for flexible APIs
3. **Generics with Constraints** - Type-safe reusable code
4. **Discriminated Unions** - Self-describing type-safe data
5. **The `this` Context** - Arrow functions vs regular methods

**Duration**: 6-10 hours  
**Difficulty**: Intermediate → Advanced  
**Format**: Boilerplate code with TODO comments

[👉 Start the Exercises](./05-ts-exercises/README.md)

---

### Part 2: Task Management Engine (React Mini-Project)
**Location**: [`06-task-management/`](./06-task-management/)

A full-stack React + TypeScript mini-project combining all advanced concepts with React Hooks:

**Focuses on**:
- Building a task state management system
- Complex type hierarchies and generic repositories
- React Hooks: `useState`, `useEffect`, `useCallback`, `useRef`
- Discriminated union patterns for task states and actions
- Custom hooks for feature extraction

**Duration**: 8-15 hours  
**Difficulty**: Intermediate → Advanced  
**Format**: Comprehensive boilerplate with implementation guides

[👉 Start the Mini-Project](./06-task-management/README.md)

---

## 🎯 Learning Objectives

### TypeScript Mastery
✅ Advanced interface composition and merging  
✅ Function overloading and signatures  
✅ Generic constraints and type parameters  
✅ Discriminated unions for type safety  
✅ The `this` context and binding strategies  

### React Hooks Proficiency
✅ State management with `useState`  
✅ Side effects and subscriptions with `useEffect`  
✅ Performance optimization with `useCallback`  
✅ Persistent references with `useRef`  
✅ Custom hooks for feature extraction  

### Real-World Patterns
✅ Reducer pattern for complex state  
✅ Generic APIs and type-safe repositories  
✅ Error handling with discriminated unions  
✅ Resource management and cleanup  
✅ Performance and memory leak prevention  

---

## 📋 Recommended Learning Path

### Week 0: Foundation (Warm-ups) ⭐ START HERE
- **Day 1-2**: TypeScript Warm-ups 1-5 (Types, Unions, Interfaces, Enums)
- **Day 3-4**: TypeScript Warm-ups 6-10 (Advanced typing, Generics)
- **Day 5-6**: JavaScript Warm-ups 1-5 (Closures, Promises, Destructuring)
- **Day 7**: JavaScript Warm-ups 6-10 (Objects, Strings, Classes)
- **Day 8-9**: React Warm-ups 1-5 (JSX, Components, useState, useEffect)
- **Day 10**: React Warm-ups 6-10 (Rendering, Forms, Composition)

### Week 1: Advanced TypeScript (Build on warm-ups)
- **Day 1-2**: Exercise 1 & 2 (Interfaces, Overloading)
- **Day 3**: Exercise 3 (Generics with Constraints)
- **Day 4**: Exercise 4 (Discriminated Unions)
- **Day 5**: Exercise 5 (`this` Context)

### Week 2: Integration (React Mini-Project)
- **Day 1**: Types definition (types.ts)
- **Day 2-3**: Custom hook implementation (useTaskEngine.ts)
- **Day 4-5**: React components (TaskManagementApp.tsx)
- **Day 6-7**: Advanced challenges & optimization

---

## 🏃 Quick Start

### Prerequisites
- Node.js 16+
- TypeScript 5.0+
- React 18+
- Text editor (VS Code recommended)

### Installation

```bash
# Warm-up Exercises (Start here!)
cd 04-warmup-exercises
npm install
npm run validate  # Type check

# Advanced Exercises
cd 05-ts-exercises
npm install
npm run check  # Type check

# Mini-Project
cd 06-task-management
npm install
npm run type-check  # Type check
```

---

## 🔍 Warm-Up Exercise Overview

### Module 1: TypeScript Warm-Up (10 exercises)
```
1. Basic Types & Annotations
2. Union & Intersection Types
3. Type vs Interface
4. Enums & Literal Types
5. Array & Object Typing
6. Optional & Readonly Properties
7. Type Assertions & Type Guards
8. Basic Generics
9. Conditional Types & Async
10. Practical Application
```

### Module 2: JavaScript Warm-Up (10 exercises)
```
1. Closures & Scope
2. Promises & Async/Await
3. Destructuring
4. Spread Operator
5. Array Methods (map, filter, reduce)
6. Object Manipulation
7. Template Literals & Strings
8. Error Handling
9. ES6 Classes
10. Practical Application
```

### Module 3: React Warm-Up (10 exercises)
```
1. JSX Basics & Rendering
2. Functional Components & Props
3. useState Hook
4. useEffect Hook
5. Event Handling
6. Conditional Rendering
7. Lists & Keys
8. Controlled Components & Forms
9. Component Composition
10. Practical Application
```

[👉 Detailed Warm-up Guide](./04-warmup-exercises/README.md)

---

## 🔍 Advanced Exercise Overview

### Exercise 1: Advanced TS Interfaces (Extension & Merging)
```typescript
// Extension
interface Animal { name: string }
interface Dog extends Animal { breed: string }

// Merging
interface Config { host: string }
interface Config { port: number }

// Result: Config has both properties after merging
```
[See full details](./05-ts-exercises/#exercise-1-advanced-ts-interfaces-extension--merging)

### Exercise 2: Function Overloading
```typescript
function transform(value: string, config: Config): string;
function transform(value: string[], config: Config): string[];
function transform(value: string | string[], config: Config): string | string[] {
  // Implementation handles both cases
}
```
[See full details](./05-ts-exercises/#exercise-2-function-overloading)

### Exercise 3: Generics with Constraints
```typescript
interface HasId { id: string }
class Repository<T extends HasId> {
  // T must have 'id' property
}
```
[See full details](./05-ts-exercises/#exercise-3-generics-with-constraints)

### Exercise 4: Discriminated Unions
```typescript
type Result<T> =
  | { type: 'success'; data: T; timestamp: Date }
  | { type: 'error'; error: string; code: string };

// Type narrowing guarantees type safety
if (result.type === 'success') {
  console.log(result.data); // ✓ Available here
}
```
[See full details](./05-ts-exercises/#exercise-4-discriminated-unions)

### Exercise 5: The `this` Context
```typescript
class Handler {
  // Arrow - captures 'this' lexically
  arrowMethod = () => console.log(this);

  // Regular - has dynamic 'this'
  regularMethod() { console.log(this); }
}
```
[See full details](./05-ts-exercises/#exercise-5-the-this-context-arrow-vs-regular-functions)

---

## 🎓 Mini-Project Structure

```
06-task-management/
├── types.ts                 # Type definitions
│   ├── TaskState (Discriminated Union)
│   ├── Task (Interface Hierarchy)
│   ├── TaskAction (Discriminated Union)
│   └── Generic Query Types
├── useTaskEngine.ts         # Custom Hook
│   ├── useState management
│   ├── useRef storage
│   ├── useCallback operations
│   └── useEffect side effects
├── TaskManagementApp.tsx    # React Component
│   ├── TaskItem (Status-based rendering)
│   ├── TaskForm (Validation)
│   ├── TaskList (Filtering)
│   ├── StatisticsPanel (Stats display)
│   └── Main App orchestration
└── README.md                # Implementation guide
```

---

## 🧪 Testing & Validation

### For Exercises
```bash
cd 05-ts-exercises
npm run check    # Type check only
npm run build    # Build and report errors
```

### For Mini-Project
```bash
cd 06-task-management
npm run type-check    # Type check only
npm run build         # Build and report errors
```

### Ideal Results
- ✅ No TypeScript errors in strict mode
- ✅ All discriminated unions exhaustively checked
- ✅ All function overloads working correctly
- ✅ Generic constraints enforced
- ✅ Proper type inference on return values

---

## 🎯 Success Criteria

### After Completing Exercises
- [ ] Understand interface extension and merging
- [ ] Can write function overloads correctly
- [ ] Use generic constraints in type signatures
- [ ] Exhaustively handle discriminated unions
- [ ] Know when to use arrow vs regular functions

### After Completing Mini-Project
- [ ] Implement complex React component hierarchies
- [ ] Build custom hooks with proper dependencies
- [ ] Use references (`useRef`) for persistent state
- [ ] Handle async operations with `useEffect`
- [ ] Combine TypeScript patterns with React Hooks

---

## 💡 Pro Tips

### TypeScript Tips
1. **Leverage strict mode** - It catches more errors
2. **Use type guards** - `in` operator, `instanceof`, literal checks
3. **Don't use `any`** - Challenge yourself to find the right type
4. **Read error messages carefully** - They're very informative
5. **Test at the boundaries** - Invalid inputs should fail

### React Tips
1. **Memoize correctly** - Include all external values in dependencies
2. **Clean up side effects** - Every `useEffect` needs cleanup
3. **Avoid state in refs** - Use `useState` for render-triggering changes
4. **Document dependencies** - Comment why dependencies are needed
5. **Profile with DevTools** - Ensure optimizations actually help

---

## 🚀 Going Deeper

### After Mastering Basics

**Advanced React Patterns**
- Compound components
- Render props pattern
- Hooks patterns and best practices
- Context API for state management

**Advanced TypeScript**
- Conditional types
- Mapped types
- Type predicates
- Branded types
- Advanced generics

**Performance Optimization**
- React.memo for component memoization
- useMemo for expensive computations
- useTransition for non-blocking updates
- Suspense for code splitting

---

## 📚 Additional Resources

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Advanced Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [Generics Deep Dive](https://www.typescriptlang.org/docs/handbook/2/generics.html)

### React
- [React Documentation](https://react.dev)
- [Hooks API Reference](https://react.dev/reference/react)
- [Performance Optimization](https://react.dev/reference/react/useMemo)

### Patterns
- Discriminated Unions: [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
- Function Overloading: [Overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)
- Generic Constraints: [Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#constraints)

---

## 🤝 Contributing

Have improvements or additional exercises? Feel free to enhance these materials!

---

## 📝 License

These materials are for educational purposes.

---

**Let's start learning!** Choose your starting point:

- [👉 Warm-Up Exercises (START HERE!)](./04-warmup-exercises/README.md)
- [👉 TypeScript Advanced Exercises](./05-ts-exercises/README.md)
- [👉 React Mini-Project](./06-task-management/README.md)

---

**Happy Coding!** 🎉
