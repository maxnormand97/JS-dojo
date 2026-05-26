/**
 * TASK MANAGEMENT ENGINE - TYPE DEFINITIONS
 * Demonstrates Advanced TypeScript concepts:
 * - Discriminated Unions for task states
 * - Generics with constraints
 * - Advanced interfaces
 */

// ============================================================================
// DISCRIMINATED UNION: Task Status States
// ============================================================================

/**
 * Task can be in one of several states, each with different properties.
 * The 'status' discriminator determines which properties are required/available.
 */

// TODO: Define Idle state (status: 'idle', error?: null)
// TODO: Define Pending state (status: 'pending', startedAt: Date)
// TODO: Define Completed state (status: 'completed', completedAt: Date, result: string)
// TODO: Define Error state (status: 'error', error: Error | string, failureReason: string)
// TODO: Define Paused state (status: 'paused', pausedAt: Date, resumeInfo?: any)

type TaskState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'completed' }
  | { status: 'error' }
  | { status: 'paused' };

// ============================================================================
// INTERFACE EXTENSION: Task Hierarchy
// ============================================================================

interface BaseTask {
  // TODO: Add id: string (unique identifier)
  // TODO: Add title: string
  // TODO: Add description?: string
  // TODO: Add createdAt: Date
}

interface TimedTask extends BaseTask {
  // TODO: Add priority: 'low' | 'medium' | 'high' | 'critical'
  // TODO: Add dueDate?: Date
  // TODO: Add estimatedDuration?: number (in minutes)
}

interface TrackableTask extends TimedTask {
  // TODO: Add startedAt?: Date
  // TODO: Add completedAt?: Date
  // TODO: Add actualDuration?: number
  // TODO: Add retryCount: number
  // TODO: Add maxRetries: number
}

/**
 * CHALLENGE: Merge interfaces to create the final Task type.
 * Use interface merging to extend TrackableTask.
 */
interface Task extends TrackableTask {
  // TODO: Merge all parent interfaces
  // TODO: Add status (from TaskState discriminated union)
  // TODO: Add tags: string[]
  // TODO: Add subtasks?: Task[] (recursive reference)
}

// ============================================================================
// GENERIC CONSTRAINTS: Task Engine Configuration
// ============================================================================

/**
 * Constraint interfaces for generic parameters
 */

interface Identifiable {
  id: string;
}

interface Deletable {
  softDelete: boolean;
}

interface Filterable {
  filterCriteria: Record<string, any>;
}

/**
 * CHALLENGE: Create engine configuration that works with generics
 */

type EngineConfig<T extends Identifiable> = {
  // TODO: maxConcurrentTasks: number
  // TODO: autoRetry: boolean
  // TODO: retryDelay: number
  // TODO: persistenceAdapter?: (tasks: T[]) => Promise<void>
  // TODO: onTaskChange?: (task: T) => void
};

// ============================================================================
// DISCRIMINATED UNION: Task Actions
// ============================================================================

/**
 * All possible actions in the task engine as discriminated union.
 * Each action type has its own payload structure.
 */

// TODO: Define CreateTaskAction (type: 'CREATE_TASK', payload: Omit<Task, 'id' | 'createdAt'>)
// TODO: Define UpdateTaskAction (type: 'UPDATE_TASK', payload: { id: string; updates: Partial<Task> })
// TODO: Define DeleteTaskAction (type: 'DELETE_TASK', payload: { id: string })
// TODO: Define CompleteTaskAction (type: 'COMPLETE_TASK', payload: { id: string; result: string })
// TODO: Define PauseTaskAction (type: 'PAUSE_TASK', payload: { id: string })
// TODO: Define ResumeTaskAction (type: 'RESUME_TASK', payload: { id: string })
// TODO: Define RetryTaskAction (type: 'RETRY_TASK', payload: { id: string })

type TaskAction =
  | { type: 'CREATE_TASK' }
  | { type: 'UPDATE_TASK' }
  | { type: 'DELETE_TASK' }
  | { type: 'COMPLETE_TASK' }
  | { type: 'PAUSE_TASK' }
  | { type: 'RESUME_TASK' }
  | { type: 'RETRY_TASK' };

// ============================================================================
// GENERIC FILTER & QUERY TYPES
// ============================================================================

/**
 * CHALLENGE: Create generic query types that work with different filters
 */

type QueryFilter<T extends Identifiable> = {
  // TODO: Define partial<T> for flexible filtering
  // TODO: Define sortBy: keyof T
  // TODO: Define sortOrder: 'asc' | 'desc'
  // TODO: Define limit?: number
  // TODO: Define offset?: number
};

type QueryResult<T> = {
  // TODO: Define items: T[]
  // TODO: Define total: number
  // TODO: Define hasMore: boolean
};

// ============================================================================
// FUNCTION OVERLOAD: Task Executor
// ============================================================================

/**
 * CHALLENGE: Create overloads for different execution scenarios
 */

// TODO: Overload 1: Execute single task and return Promise<Task>
// TODO: Overload 2: Execute multiple tasks and return Promise<Task[]>
// TODO: Overload 3: Execute with callback and return unsubscribe function

// TODO: Implementation that handles all overloads
// export function executeTask(taskOrTasks: Task | Task[], callback?: (task: Task) => void): ...

// ============================================================================
// CONTEXT-AWARE: Task Processor with Methods
// ============================================================================

/**
 * CHALLENGE: Create a processor that demonstrates proper `this` binding
 */

type TaskProcessor = {
  // TODO: Include task queue management
  // TODO: Include regular methods (for overriding in subclasses)
  // TODO: Include arrow functions (for callbacks and event handlers)
  // TODO: Demonstrate binding differences
};

// ============================================================================
// ENGINE STATE & RESULTS
// ============================================================================

type EngineState = {
  // TODO: tasks: Task[]
  // TODO: activeTaskIds: string[]
  // TODO: isRunning: boolean
  // TODO: error?: Error | string
  // TODO: statistics: {
  //   totalCreated: number;
  //   totalCompleted: number;
  //   totalFailed: number;
  //   averageDuration: number;
  // }
};

type TaskResult<T = any> = Result<T>;

type Result<T> =
  | {
      type: 'success';
      // TODO: data: T
      // TODO: timestamp: Date
    }
  | {
      type: 'error';
      // TODO: error: Error | string
      // TODO: code: string
    };

export type {
  Task,
  TaskState,
  TaskAction,
  EngineConfig,
  QueryFilter,
  QueryResult,
  EngineState,
  TaskResult,
  Result,
};
