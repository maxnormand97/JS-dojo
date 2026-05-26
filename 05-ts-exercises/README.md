# Advanced TypeScript Exercises

A comprehensive set of **5 advanced TypeScript exercises** designed for senior developers refreshing their knowledge. Each exercise focuses on one core concept with practical challenges.

## 📚 Exercises Overview

### Exercise 1: Advanced TS Interfaces (Extension & Merging)
**Focus**: Building complex type hierarchies through interface composition

**Concepts to Learn**:
- Interface extension with `extends` keyword
- Interface merging by declaring the same interface multiple times
- Partial types and type intersection
- Property accumulation across inheritance

**Challenges**:
1. Create a `Trackable` interface extending `BaseEntity` with tracking properties
2. Create a `Timestamped` interface with timestamp-specific properties
3. Use **interface merging** to create a `Document` interface that:
   - Extends both `Trackable` and `Timestamped`
   - Adds document-specific properties (title, content, author, tags)
   - Properly accumulates all parent properties
4. Implement `createDocument` function that validates all properties

**Key Concepts to Understand**:
```typescript
// Interface extension
interface Animal { name: string }
interface Dog extends Animal { breed: string }

// Interface merging - declare same interface multiple times
interface Config { host: string }
interface Config { port: number }
// Result: Config has both host and port

// Combining both patterns
interface Api { baseUrl: string }
interface Api { timeout: number }
// Merged interface now has baseUrl and timeout
interface ApiClient extends Api { headers?: Record<string, string> }
```

---

### Exercise 2: Function Overloading
**Focus**: Creating flexible APIs with multiple function signatures

**Concepts to Learn**:
- Function overload signatures (type declarations)
- Implementation signature (generic signature covering all cases)
- Type narrowing and type guards in implementations
- Conditional types for complex overloads

**Challenges**:
1. Create function overloads for `transformData` that accepts:
   - Single string value
   - Array of strings
   - Configuration object instead of just operation
2. Implement the main function to handle all cases correctly
3. Ensure TypeScript infers correct return type for each overload
4. Add type narrowing logic for different input types

**Key Concepts to Understand**:
```typescript
// Simple overloads
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value + 1;
}

// With different parameter types
function fetch(id: number): Promise<User>;
function fetch(email: string): Promise<User[]>;
function fetch(id: number | string): Promise<User | User[]> {
  // Implementation
}
```

---

### Exercise 3: Generics with Constraints
**Focus**: Creating reusable, type-safe code with constrained generic parameters

**Concepts to Learn**:
- Generic type parameters `<T>`
- Constraint syntax `<T extends SomeInterface>`
- Generic classes and methods
- Method chaining patterns
- Partial types with generics

**Challenges**:
1. Create constraint interfaces: `HasId` and `HasTimestamps`
2. Implement `Repository<T extends HasId>` generic class with:
   - CRUD operations (Create, Read, Update, Delete)
   - Method chaining (return `this`)
   - Type-safe operations that only work on entities with `id`
3. Create generic `merge<T, U>` function that combines objects with constraints
4. Ensure TypeScript prevents using the repository with non-compliant types

**Key Concepts to Understand**:
```typescript
// Constraint example
interface HasId { id: string }
class Repository<T extends HasId> {
  store: T[] = [];
  add(item: T) { this.store.push(item); return this; }
}

// Works
repository.add({ id: '1', name: 'John' });

// Error - missing id
// repository.add({ name: 'John' });

// Multiple constraints
type Keyable = { [key: string]: any };
function mapValues<T extends Keyable>(obj: T): Record<keyof T, string> {
  // T must have indexable properties
}
```

---

### Exercise 4: Discriminated Unions
**Focus**: Type-safe, self-documenting data structures using discriminator properties

**Concepts to Learn**:
- Discriminated unions (tagged unions)
- The discriminator property pattern
- Type narrowing with `in` operator or `type` property
- Exhaustive type checking
- Avoiding data inconsistency

**Challenges**:
1. Create `Result<T>` discriminated union:
   - Success case: `{ type: 'success', data: T, timestamp: Date }`
   - Error case: `{ type: 'error', error: Error | string, code: string }`
2. Implement `handleResult` function with exhaustive pattern matching
3. Create complex `ApiRequest` discriminated union:
   - GET: `{ method: 'GET', url: string, headers?: Record<string, string> }`
   - POST: `{ method: 'POST', url: string, body: any, headers?: Record<string, string> }`
   - PATCH: `{ method: 'PATCH', url: string, body: Partial<any>, id: string }`
4. Implement `executeRequest` with type narrowing

**Key Concepts to Understand**:
```typescript
// Discriminated union pattern
type Status = 
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; error: Error };

function handle(status: Status) {
  // TypeScript knows which properties available based on status
  if (status.status === 'success') {
    console.log(status.data); // ✓ Only here
  } else if (status.status === 'error') {
    console.log(status.error); // ✓ Only here
  }
}

// Error if type is missing
// You MUST check all discriminator values
```

---

### Exercise 5: The `this` Context (Arrow vs Regular Functions)
**Focus**: Understanding and controlling context binding in JavaScript/TypeScript

**Concepts to Learn**:
- Arrow functions capture `this` lexically
- Regular methods have dynamic `this`
- Binding differences when passing methods as callbacks
- When to use each binding style
- `this` in event handlers and setTimeout

**Challenges**:
1. Create `EventBus` class with:
   - Regular method for event handling
   - Arrow method for consistent binding
   - Show the difference in context
2. Create `ContextDemo` class demonstrating:
   - Regular method passed to array methods
   - Arrow method passed to array methods
3. Create `UIHandler` class with:
   - Arrow function for debounced click handler
   - Show why arrow functions work better with event listeners
4. Explain when to use each pattern

**Key Concepts to Understand**:
```typescript
class Handler {
  name = 'handler';

  // Arrow function - captures 'this' from class
  arrowMethod = () => {
    console.log(this.name); // Always works, even when extracted
  };

  // Regular method - has its own 'this'
  regularMethod() {
    console.log(this.name); // Loses 'this' when extracted
  }
}

const handler = new Handler();

// Both work when called directly
handler.arrowMethod(); // ✓ 'handler'
handler.regularMethod(); // ✓ 'handler'

// Extract and use as callback
const arrow = handler.arrowMethod;
const regular = handler.regularMethod;

arrow(); // ✓ 'handler' - arrow captures 'this'
regular(); // ✗ undefined - regular loses 'this'

// Array methods
[1, 2, 3].forEach(handler.arrowMethod); // ✓ Works
[1, 2, 3].forEach(handler.regularMethod); // ✗ Doesn't work
[1, 2, 3].forEach(handler.regularMethod.bind(handler)); // ✓ Works with bind

// Event listeners - prefer arrow functions
element.addEventListener('click', handler.arrowMethod); // ✓
element.addEventListener('click', handler.regularMethod); // ✗
```

---

## 🎯 Implementation Strategy

### For Each Exercise:

1. **Read the TODO comments carefully** - They describe what needs to be implemented
2. **Understand the type signatures first** - Don't just implement, ensure types are correct
3. **Check TypeScript in strict mode** - `npm run check` should have no errors
4. **Test with various inputs** - Make sure overloads work, constraints are enforced, etc.
5. **Verify exhaustiveness** - especially for discriminated unions and overloads

## 🧪 Testing Your Solutions

### Type Checking (Recommended)
```bash
npm run check
```
Runs `tsc --noEmit` to verify all types are correct without generating output.

### Building
```bash
npm run build
```
Compiles TypeScript to JavaScript (or reports errors).

## 📋 Implementation Checklist

### Exercise 1: Interfaces
- [ ] Define all interface extensions and property accumulation
- [ ] Use interface merging correctly
- [ ] Implement `createDocument` with full type support
- [ ] Test with complex nested properties

### Exercise 2: Function Overloading
- [ ] Define all overload signatures
- [ ] Implement main function handling all cases
- [ ] Verify return types match signatures
- [ ] Test with various input combinations

### Exercise 3: Generics with Constraints
- [ ] Create constraint interfaces
- [ ] Implement Repository class with CRUD
- [ ] Enforce constraints (TypeScript should prevent invalid types)
- [ ] Implement merge function with Generic constraints

### Exercise 4: Discriminated Unions
- [ ] Define Result<T> with success/error
- [ ] Create ApiRequest with multiple action types
- [ ] Implement exhaustive handlers (all cases covered)
- [ ] Verify TypeScript errors if case is missing

### Exercise 5: `this` Context
- [ ] Create EventBus with regular and arrow methods
- [ ] Create ContextDemo showing binding differences
- [ ] Create UIHandler with proper debouncing
- [ ] Document when to use each pattern

## 🎓 Difficulty Levels

### Beginner Modifications
- Implement fewer overload signatures
- Start with 2-3 generic constraints instead of complex ones
- Use simpler discriminated unions with 2-3 states

### Advanced Challenges
- Create recursive generic constraints
- Implement branded types with discriminated unions
- Create advanced event emitter with complex binding scenarios
- Implement template method pattern with proper `this` handling

## 💡 Tips for Success

1. **Leverage TypeScript's strict mode** - It will catch missed cases
2. **Use type narrowing** - The `in` operator and type guards are your friends
3. **Test at the edges** - Try inputs that should fail, verify TypeScript complains
4. **Don't use `any`** - Challenge yourself to get types right
5. **Document with comments** - Explain why you chose certain patterns

## 📚 Additional Resources

### TypeScript Documentation
- [Advanced Types Handbook](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [Advanced Function Types](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

### Pattern References
- Discriminated Unions: Used in Redux, Rust, Functional Programming
- Generics with Constraints: Common in C#, Java, and advanced TypeScript
- Function Overloading: Found in C#, Java, many statically-typed languages

---

**Total Implementation Time**: 6-10 hours depending on your TypeScript experience level

Good luck! 🚀
