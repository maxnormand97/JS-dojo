/**
 * ADVANCED TYPESCRIPT EXERCISES
 * Focus Areas:
 * 1. Advanced TS Interfaces (extension/merging)
 * 2. Function Overloading
 * 3. Generics with Constraints
 * 4. Discriminated Unions
 * 5. The `this` Context (arrow vs regular functions)
 */

// ============================================================================
// EXERCISE 1: ADVANCED TS INTERFACES (EXTENSION & MERGING)
// ============================================================================

/**
 * Task: Extend and merge interfaces to create a complex type hierarchy.
 * Implement a system where properties accumulate across interfaces.
 */

interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Trackable extends BaseEntity {
  // TODO: Define tracking properties here (e.g., viewCount, lastViewedBy)
}

interface Timestamped {
  // TODO: Define timestamp-related properties
}

/**
 * CHALLENGE: Use interface merging to create a combined 'Document' interface
 * that extends both Trackable and Timestamped while adding document-specific properties.
 * Hint: TypeScript allows you to declare the same interface multiple times.
 */
interface Document {
  // TODO: Implement merged interface with extension of both parent interfaces
  // TODO: Add document-specific properties (title, content, author, tags)
}

// EXERCISE 1 USAGE:
function createDocument(data: Document): void {
  // TODO: Implement logic to create and validate a document
  // Should access properties from BaseEntity, Trackable, Timestamped, and Document-specific props
}

// ============================================================================
// EXERCISE 2: FUNCTION OVERLOADING
// ============================================================================

/**
 * Task: Implement function overloads for a data transform function that can:
 * - Accept a single value and return a transformed value
 * - Accept an array and return an array of transformed values
 * - Accept a configuration object with different signatures
 */

type TransformConfig = {
  operation: 'uppercase' | 'lowercase' | 'reverse';
  trim?: boolean;
  maxLength?: number;
};

/**
 * CHALLENGE: Create function overloads for transformData that handles:
 * 1. (value: string, config: TransformConfig) => string
 * 2. (value: string[], config: TransformConfig) => string[]
 * 3. (value: string, operation: 'uppercase' | 'lowercase' | 'reverse') => string
 */

// TODO: Define function overload signatures here
// TODO: Implement the main function body that handles all cases

function transformData(
  value: string | string[] | undefined,
  configOrOp?: TransformConfig | 'uppercase' | 'lowercase' | 'reverse'
): string | string[] | undefined {
  // TODO: Implement logic to handle different input types
  // TODO: Apply transformation based on config/operation
  // TODO: Return transformed value(s) in correct type
}

// ============================================================================
// EXERCISE 3: GENERICS WITH CONSTRAINTS
// ============================================================================

/**
 * Task: Use generics with constraints to create flexible, type-safe utilities.
 * Constraints should ensure type safety while allowing reusability.
 */

// Define constraints for generic types
interface HasId {
  id: string | number;
}

interface HasTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

/**
 * CHALLENGE 1: Create a generic Repository class that:
 * - Works only with entities that have an 'id' property
 * - Supports CRUD operations with proper typing
 * - Uses method chaining (returns `this`)
 */

class Repository<T extends HasId> {
  private items: Map<string | number, T> = new Map();

  // TODO: Implement add(item: T): this
  // TODO: Implement get(id: string | number): T | undefined
  // TODO: Implement update(id: string | number, updates: Partial<T>): this
  // TODO: Implement delete(id: string | number): boolean
  // TODO: Implement getAll(): T[]
}

/**
 * CHALLENGE 2: Create a generic function that merges objects with constraints:
 * - Accept two objects that extend a base type
 * - Preserve individual types while merging
 * - Handle type conflicts appropriately
 */

// TODO: Define a generic merge function that combines two objects
// TODO: Ensure it only works with objects extending a specific constraint
// TODO: Return a properly typed merged object

// ============================================================================
// EXERCISE 4: DISCRIMINATED UNIONS
// ============================================================================

/**
 * Task: Use discriminated unions to create type-safe, self-describing data structures.
 * The discriminator property determines the shape of the object.
 */

/**
 * CHALLENGE: Create a Result type that discriminates between Success and Error states.
 * Then create a handler function that exhaustively checks all cases.
 */

// TODO: Define Success result type (type: 'success', data: T, timestamp: Date)
// TODO: Define Error result type (type: 'error', error: Error | string, code: string)
// TODO: Create Result<T> as a discriminated union of Success and Error

type Result<T> =
  // TODO: Define union of Success and Error with discriminator property
  | { type: 'success' }
  | { type: 'error' };

/**
 * CHALLENGE: Create a handler function that processes Result types.
 * Use type guards or switch statements for exhaustive checking.
 */

function handleResult<T>(result: Result<T>): void {
  // TODO: Implement exhaustive pattern matching on result.type
  // TODO: Handle success case - access data property safely
  // TODO: Handle error case - access error and code properties
  // TODO: TypeScript should error if a case is missing
}

/**
 * CHALLENGE: Create a more complex discriminated union for API requests
 * with different payload shapes based on request type.
 */

type ApiRequest =
  // TODO: Define GET request (method: 'GET', url: string, headers?: Record<string, string>)
  // TODO: Define POST request (method: 'POST', url: string, body: any, headers?: Record<string, string>)
  // TODO: Define PATCH request (method: 'PATCH', url: string, body: Partial<any>, id: string)

function executeRequest(request: ApiRequest): void {
  // TODO: Implement request handler that narrows types based on method discriminator
  // TODO: POST and PATCH require body/id access
}

// ============================================================================
// EXERCISE 5: THE `this` CONTEXT (ARROW VS REGULAR FUNCTIONS)
// ============================================================================

/**
 * Task: Understand when and why to use arrow functions vs regular methods.
 * Arrow functions capture `this` lexically; methods can use dynamic `this`.
 */

interface EventEmitter {
  name: string;
  listeners: Array<() => void>;
  // TODO: Define emit() method
  // TODO: Define subscribe(callback: () => void): void
  // TODO: Define unsubscribe(callback: () => void): void
}

class EventBus {
  name: string = 'EventBus';

  // TODO: Use a regular method - should have dynamic `this`
  // Challenge: What happens if this method is passed as a callback?
  handleEvent = (): void => {
    // TODO: Implement - log `this.name` and create event
  };

  // TODO: Use an arrow function - captures `this` from class scope
  // Challenge: When would you prefer this binding?
  onEvent = (eventName: string): void => {
    // TODO: Implement - register handler
  };

  // TODO: Create a method that demonstrates the difference
  // between arrow and regular function bindings
  // Challenge: Show how `this` behaves when method is extracted and called separately
}

/**
 * CHALLENGE: Create a class with both arrow and regular functions.
 * Demonstrate binding differences by:
 * 1. Passing methods as callbacks to array methods
 * 2. Extracting methods and calling them separately
 * 3. Using setTimeout with different binding styles
 */

class ContextDemo {
  value: number = 42;

  // TODO: Define regularMethod() using regular function syntax
  // TODO: Implement to access this.value

  // TODO: Define arrowMethod() using arrow function syntax
  // TODO: Implement to access this.value

  // TODO: Create test methods that call regularMethod and arrowMethod
  // TODO: Pass them as callbacks: [1, 2, 3].map(this.regularMethod)
  // TODO: Pass them as callbacks: [1, 2, 3].map(this.arrowMethod)
  // TODO: Compare results - which one works correctly without .bind()?
}

/**
 * CHALLENGE: Create a debounced function handler.
 * Use the correct `this` binding to ensure context is preserved.
 */

class UIHandler {
  private debounceTimer: NodeJS.Timeout | null = null;
  clickCount: number = 0;

  // TODO: Define debouncedClick using proper `this` binding
  // TODO: Should increment clickCount and prevent rapid calls
  // TODO: Use the binding style that works best with event listeners

  // TODO: Show why arrow functions are typically better for event handlers
}

// ============================================================================
// EXPORT FOR TESTING
// ============================================================================

export {
  Document,
  transformData,
  Repository,
  Result,
  handleResult,
  ApiRequest,
  executeRequest,
  EventBus,
  ContextDemo,
  UIHandler,
};
