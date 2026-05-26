# Task Management Engine - React + TypeScript Mini-Project

A comprehensive learning project combining **Advanced TypeScript** principles with **React Hooks**. This project is designed for senior developers refreshing their knowledge.

## 📚 Learning Objectives

### TypeScript Concepts
- ✅ **Advanced Interfaces** - Extension, merging, and composition
- ✅ **Function Overloading** - Multiple signatures for flexible APIs
- ✅ **Generics with Constraints** - Type-safe reusable code
- ✅ **Discriminated Unions** - Type-safe state management
- ✅ **The `this` Context** - Arrow functions vs regular methods

### React Hooks
- ✅ **useState** - Local component state management
- ✅ **useEffect** - Side effects and subscriptions
- ✅ **useCallback** - Memoized callbacks with proper dependencies
- ✅ **useRef** - Persistent references across renders

## 📁 Project Structure

```
06-task-management/
├── types.ts                    # Type definitions & discriminated unions
├── useTaskEngine.ts            # Custom hook with all business logic
├── TaskManagementApp.tsx       # Main React component
├── package.json                # Dependencies
├── tsconfig.json              # TypeScript strict configuration
└── README.md                  # This file
```

## 🎯 Implementation Roadmap

### Phase 1: Types & Interfaces (types.ts)
**Goal**: Define a type-safe foundation using advanced TypeScript patterns

#### 1.1 Task State Discriminated Union
- [ ] Define 5 task states: `idle`, `pending`, `completed`, `error`, `paused`
- [ ] Each state has unique properties (e.g., `completed` has `completedAt` and `result`)
- [ ] Create `TaskState` as a discriminated union with `status` discriminator

#### 1.2 Interface Hierarchy
- [ ] `BaseTask` - Common properties (id, title, description, createdAt)
- [ ] `TimedTask extends BaseTask` - Add priority, dueDate, estimatedDuration
- [ ] `TrackableTask extends TimedTask` - Add timing metrics and retry tracking
- [ ] **Merge Pattern**: Use interface merging to create final `Task` interface

#### 1.3 Generic Engine Configuration
- [ ] `EngineConfig<T extends Identifiable>` - Generic configuration
- [ ] Include: maxConcurrentTasks, autoRetry, retryDelay, persistenceAdapter callbacks

#### 1.4 Discriminated Actions
- [ ] `TaskAction` - Union of all possible engine actions
- [ ] Each action type: `CREATE_TASK`, `UPDATE_TASK`, `DELETE_TASK`, `COMPLETE_TASK`, etc.
- [ ] Each with unique payload structure

#### 1.5 Generic Filters & Results
- [ ] `QueryFilter<T>` - Generic filtering with typing
- [ ] `QueryResult<T>` - Paginated query results
- [ ] `Result<T>` - Success/Error discriminated union

### Phase 2: Custom Hook (useTaskEngine.ts)
**Goal**: Implement the task engine logic connecting all TS patterns

#### 2.1 State Management with useState
- [ ] Initialize EngineState (tasks, activeTaskIds, stats)
- [ ] Create state setters for tasks and engine state

#### 2.2 Refs with useRef
- [ ] `configRef` - Store engine config (no re-render on change)
- [ ] `processorsRef` - Cache task processors
- [ ] `listenersRef` - Track subscribed callbacks
- [ ] `timersRef` - Manage retry/debounce timers

#### 2.3 Memoized Callbacks with useCallback
Implement these operations with proper `this` binding:

- [ ] **createTask**
  - Generate unique ID and timestamps
  - Validate against constraints
  - Dispatch `CREATE_TASK` action
  - Return created Task

- [ ] **updateTask**
  - Apply partial updates immutably
  - Dispatch `UPDATE_TASK` action
  - Trigger callbacks if configured

- [ ] **deleteTask**
  - Remove from state
  - Handle subtasks (if recursive)
  - Dispatch `DELETE_TASK` action

- [ ] **completeTask**
  - Calculate actual duration
  - Set `status` to `'completed'`
  - Return `Result<Task>` (handle success/error)
  - Call `onTaskComplete` callback

- [ ] **pauseTask / resumeTask**
  - Toggle between `'pending'` and `'paused'` states
  - Preserve progress info in useRef

- [ ] **retryTask**
  - Check maxRetries constraint
  - Increment retry count
  - Reset error state
  - Return `Result<Task>`

- [ ] **Query Methods**
  - `getTask(id)` - Simple lookup
  - `queryTasks(filter)` - Return `QueryResult<T>` with pagination
  - `getActiveTasks()` - Filter by status
  - `getCompletedTasks()` - Filter by status
  - `getFailedTasks()` - Filter by error status

- [ ] **Batch Operations**
  - `completeBatch(ids)` - Complete multiple tasks
  - `deleteBatch(ids)` - Delete multiple tasks

- [ ] **Statistics**
  - `getStats()` - Return object with counts and averages

#### 2.4 Effects with useEffect
- [ ] **Initialization** - Set up config and processors on mount
- [ ] **Subscriptions** - Wire up onTaskComplete and onTaskError callbacks
- [ ] **Persistence** - Debounce saves to external storage
- [ ] **Auto-retry** - Schedule failed task retries with exponential backoff
- [ ] **Concurrency** - Enforce maxConcurrentTasks limit
- [ ] **Cleanup** - Clear timers on unmount

#### 2.5 Reducer Pattern
- [ ] Implement `taskEngineReducer` function
- [ ] Handle all discriminated union cases: CREATE, UPDATE, DELETE, COMPLETE, PAUSE, RESUME, RETRY
- [ ] Ensure exhaustive type checking

### Phase 3: React Component (TaskManagementApp.tsx)
**Goal**: Build the UI using the engine and demonstrating all patterns

#### 3.1 TaskItem Component
- [ ] Show different UI based on `task.status` (discriminated union)
- [ ] Status-specific content:
  - `'idle'` → "Ready to Start" button
  - `'pending'` → Progress indicator + pause button
  - `'completed'` → Checkmark + completion time
  - `'error'` → Error message + retry button
  - `'paused'` → "Paused" badge + resume button

#### 3.2 TaskForm Component
- [ ] Form fields: title, description, priority, dueDate, estimatedDuration, tags
- [ ] Implement form validation function that returns discriminated Result type
- [ ] Handle form submission with async createTask call
- [ ] Show validation errors
- [ ] Reset form on success

#### 3.3 TaskList Component
- [ ] Render tasks using queryTasks with current filter
- [ ] Group tasks by status
- [ ] Show empty state when no tasks
- [ ] Support filtering and sorting

#### 3.4 StatisticsPanel Component
- [ ] Display task statistics from getStats
- [ ] Calculate and show percentages
- [ ] Use useMemo to avoid recalculating on every render

#### 3.5 Main App Component
- [ ] Use useState for: modal visibility, filters, selected tasks, notifications
- [ ] Integrate useTaskEngine hook
- [ ] Create callbacks using useCallback with proper dependencies:
  - Task creation (open modal, submit form)
  - Task completion (with Result handling)
  - Task deletion (with confirmation)
  - Batch operations
  - Pause/resume/retry
- [ ] Render all sub-components
- [ ] Display notifications/toasts for user feedback
- [ ] Show loading/error states

#### 3.6 Custom Hooks (Stretch Goals)
- [ ] **useTaskFilters** - Manage and apply filters, memoize results
- [ ] **useTaskSelection** - Handle multi-select, batch operations
- [ ] **useTaskNotifications** - Manage notification queue with auto-dismiss
- [ ] **useLocalStoragePersistence** - Auto-save to localStorage

## 🔍 Key Patterns to Demonstrate

### 1. Advanced Interfaces
```typescript
// Interface extension and merging
interface A { a: string }
interface B extends A { b: number }
interface C extends A { c: boolean }

// Merge multiple interfaces into one
interface Combined extends B, C {
  // merged properties: a, b, c
  custom: string;
}
```

### 2. Function Overloading
```typescript
function transform(value: string, config: Config): string;
function transform(value: string[], config: Config): string[];
function transform(value: string | string[], config: Config): string | string[] {
  // Implementation
}
```

### 3. Generics with Constraints
```typescript
class Repository<T extends Identifiable> {
  // T must have 'id' property
}

type QueryFilter<T extends Identifiable> = {
  // Works with any T that has id
};
```

### 4. Discriminated Unions
```typescript
type Result<T> =
  | { type: 'success'; data: T; timestamp: Date }
  | { type: 'error'; error: string; code: string };

// Exhaustive checking
function handle<T>(result: Result<T>) {
  if (result.type === 'success') {
    console.log(result.data); // ✅ data is available
  } else {
    console.log(result.error); // ✅ error is available
  }
}
```

### 5. The `this` Context
```typescript
class Handler {
  // Arrow function - captures 'this' lexically
  handleEvent = () => {
    console.log(this); // Works when passed as callback
  };

  // Regular method - dynamic 'this'
  normalMethod() {
    console.log(this); // May lose context when passed as callback
  }
}

// When used with event listeners:
element.addEventListener('click', handler.handleEvent); // ✓ Works
element.addEventListener('click', handler.normalMethod); // ✗ Loses this
element.addEventListener('click', handler.normalMethod.bind(handler)); // ✓ Works with bind
```

## 🧪 Testing Your Implementation

### Type Checking
```bash
npm run type-check
```

This will catch all TypeScript errors in strict mode, including:
- Missing properties on interfaces
- Type mismatches in discriminated unions
- Missing cases in exhaustive checks
- Function overload mismatches

### Building
```bash
npm run build
```

## 📋 Implementation Checklist

- [ ] **types.ts** - All interfaces and type definitions complete
- [ ] **useTaskEngine.ts** - All callbacks, effects, and state management
- [ ] **TaskManagementApp.tsx** - All components rendering correctly
- [ ] **Type Safety** - No `any` types, strict mode passes
- [ ] **Exhaustive Checks** - All discriminated unions are exhaustively handled
- [ ] **Memory Leaks** - All effects properly cleaned up
- [ ] **Performance** - useCallback dependencies are correct

## 💡 Additional Challenges

### Difficulty: Hard
1. Implement undo/redo with discriminated union actions
2. Add task dependencies (some tasks can't start until others complete)
3. Create a task scheduler that respects time constraints
4. Implement optimistic updates with rollback on error
5. Add collaborative features (merge conflicts for concurrent edits)

### Difficulty: Medium
1. Add search/filtering with complex query strings
2. Implement task templates/cloning
3. Add task history and audit trail
4. Create performance monitoring (log operation timing)
5. Add keyboard shortcuts handler class

## 📚 Resources

### TypeScript Docs
- [Advanced Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [Function Overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)
- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

### React Hooks
- [Hooks API Reference](https://react.dev/reference/react)
- [useCallback Documentation](https://react.dev/reference/react/useCallback)
- [useRef Documentation](https://react.dev/reference/react/useRef)

## 🎓 Learning Path

1. Start with types.ts - Get the static types right first
2. Implement useTaskEngine - Handle all the logic and state
3. Build TaskManagementApp - Wire everything together
4. Refactor components - Optimize with custom hooks
5. Stop - Celebrate your mastery! 🎉

---

**Note**: This project intentionally leaves implementation details as TODO comments. The boilerplate and type definitions are provided to guide you, but all the interesting logic is up to you to write!
