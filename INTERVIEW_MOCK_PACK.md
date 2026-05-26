# Interview Mock Pack (20 Sessions)

Purpose: simulate mid-level and senior TypeScript, React, and Node interview rounds with timed structure, scoring, and debrief loops.

How to use this pack:
1. Run 3 sessions per week.
2. Keep strict timing.
3. Do coding first without AI.
4. Score immediately after each session.
5. Repeat weak sessions after 7-10 days.

---

## Global Session Format (90 minutes)

1. Intro and clarification: 5 min
2. Coding challenge: 40 min
3. Deep-dive questions: 25 min
4. Architecture/tradeoff discussion: 15 min
5. Self-evaluation: 5 min

Optional extended format (120 minutes):
1. Add 20 min test-writing segment
2. Add 10 min refactor and explain segment

---

## Scoring Rubric (100 points)

1. Problem framing and clarification: 10
- Defines requirements, assumptions, edge cases.

2. Type safety and correctness: 20
- Correct modeling, safe narrowing, good signatures.

3. Code quality and readability: 15
- Naming, composability, maintainable structure.

4. Runtime behavior and edge cases: 15
- Handles nulls, invalid states, failures, race conditions.

5. Testing strategy: 10
- Clear, practical test plan and useful examples.

6. Performance and scalability reasoning: 10
- Knows what matters and what does not.

7. Communication and tradeoffs: 20
- Explains choices, alternatives, constraints.

Banding:
- 85-100: strong senior signal
- 70-84: solid mid-level, emerging senior
- 55-69: interview-risk zone
- Under 55: fundamentals need reinforcement

---

## Session Set A: TypeScript Core (1-6)

### Session 1: Discriminated unions and exhaustive handling
Coding prompt:
- Design a TaskResult union with success, retriableError, fatalError.
- Implement handleTaskResult with exhaustive checks.
Expected points:
- Uses discriminator field cleanly.
- Exhaustive handling with never fallback.
- Clear return type per branch.
Deep-dive questions:
1. Why use discriminated unions over optional error fields?
2. What bug class does exhaustive checking prevent?
3. How would you version this type safely over time?

### Session 2: Generic repository with constraints
Coding prompt:
- Build Repository<T extends { id: string; createdAt: Date }> with CRUD and query.
- Add typed filter and typed sortBy.
Expected points:
- Enforces constraints without any.
- Reasonable query API shape.
- Immutable updates.
Deep-dive questions:
1. Why constrain generics instead of runtime checks only?
2. What tradeoff exists between flexibility and strictness?
3. How would you support partial updates safely?

### Session 3: Function overloads and API ergonomics
Coding prompt:
- Implement transform overloads:
- single string -> string
- string[] -> string[]
- record map -> record map
Expected points:
- Correct overload signatures and implementation signature.
- Narrowing logic is safe.
- No ambiguous return types.
Deep-dive questions:
1. Overloads vs union parameter style?
2. When do overloads become harmful?
3. How do you preserve readability with many signatures?

### Session 4: Runtime validation + type guards
Coding prompt:
- Parse unknown API payload into typed User safely.
- Write custom type guards and validation errors.
Expected points:
- Separates validation and mapping.
- No unsafe assertion shortcuts.
- Error surface is useful.
Deep-dive questions:
1. Assertion vs guard in production code?
2. Where should validation live in layered architecture?
3. How do you keep validator drift low?

### Session 5: Utility types and type transformations
Coding prompt:
- Implement type helpers:
- Mutable<T>
- ReadonlyKeys<T, K>
- RequiredKeys<T, K>
Expected points:
- Correct mapped types and key constraints.
- Understands distributive behavior basics.
Deep-dive questions:
1. When do advanced types reduce readability?
2. How do you debug complex types quickly?
3. What is a practical upper bound of type complexity?

### Session 6: State machine modeling
Coding prompt:
- Define an interview pipeline state machine type.
- Enforce legal transitions only.
Expected points:
- Illegal transitions blocked by design.
- Good separation of state and event types.
Deep-dive questions:
1. Reducer vs explicit state machine tradeoff?
2. How does this help React reliability?
3. How do you keep machine maintainable?

---

## Session Set B: React Fundamentals to Advanced (7-12)

### Session 7: Controlled form architecture
Coding prompt:
- Build typed task form with validation and per-field errors.
- Submit handler returns discriminated success/error.
Expected points:
- Controlled inputs and clean error model.
- Avoids duplicated validation logic.
Deep-dive questions:
1. Controlled vs uncontrolled tradeoffs?
2. When to move validation server-side only?
3. How do you avoid unnecessary rerenders?

### Session 8: Effect correctness and stale closure prevention
Coding prompt:
- Implement data fetch hook with abort, retry, and cleanup.
- Demonstrate fix for stale closure bug.
Expected points:
- Proper dependencies.
- Request cancellation and race handling.
Deep-dive questions:
1. Common useEffect failure modes?
2. How to reason about dependency arrays?
3. When to extract custom hooks?

### Session 9: Reducer-driven UI state
Coding prompt:
- Build reducer for task list actions: add, update, remove, bulkComplete.
- Add undo for last action.
Expected points:
- Pure reducer, immutable updates.
- Action typing is explicit.
Deep-dive questions:
1. useState vs useReducer decision framework?
2. How to test reducers effectively?
3. How to avoid action type sprawl?

### Session 10: Performance boundaries
Coding prompt:
- Optimize a task table with expensive derived stats.
- Apply memoization and stable callbacks where useful.
Expected points:
- Knows when optimization is needed.
- Avoids premature memoization everywhere.
Deep-dive questions:
1. Why can useMemo harm readability?
2. How do you profile before optimizing?
3. What metrics matter in UI perf?

### Session 11: Composition and state ownership
Coding prompt:
- Refactor large component into container + presentational parts.
- Move state to the narrowest correct owner.
Expected points:
- Better boundaries and testability.
- Minimal prop drilling or justified context.
Deep-dive questions:
1. Context overuse risks?
2. Co-location vs centralization tradeoffs?
3. How do you detect over-abstracted components?

### Session 12: Error handling and UX reliability
Coding prompt:
- Add error boundary-like fallback flow for async views.
- Show retry and recovery UX.
Expected points:
- Differentiates recoverable vs fatal errors.
- Preserves user progress where possible.
Deep-dive questions:
1. UX tradeoffs under failure?
2. How to log front-end errors effectively?
3. How to avoid silent failures?

---

## Session Set C: Node and API Design (13-17)

### Session 13: REST contract and validation
Coding prompt:
- Design POST and PATCH endpoints for incidents.
- Add validation and consistent error shape.
Expected points:
- Clear status codes and payloads.
- Validation paths tested.
Deep-dive questions:
1. 400 vs 422 usage strategy?
2. Business rule errors vs malformed request errors?
3. How to keep error contract stable?

### Session 14: Idempotency and retries
Coding prompt:
- Implement idempotency key support for create endpoint.
- Ensure duplicate requests are safe.
Expected points:
- Correct semantic handling for repeated requests.
- Clear persistence strategy discussion.
Deep-dive questions:
1. Where does idempotency state live?
2. What are race condition risks?
3. How would this change with distributed services?

### Session 15: Concurrency and consistency
Coding prompt:
- Add optimistic concurrency control on update (version field).
- Return conflict response when stale update occurs.
Expected points:
- Detects stale writes.
- Explains conflict resolution strategy.
Deep-dive questions:
1. OCC vs locking tradeoffs?
2. How to expose conflicts to clients?
3. What test cases prove correctness?

### Session 16: Service boundaries and layering
Coding prompt:
- Refactor route -> service -> domain -> store.
- Keep side effects at boundaries.
Expected points:
- Strong separation of concerns.
- Clear test seams.
Deep-dive questions:
1. Why not keep all logic in route handlers?
2. How do boundaries reduce regression risk?
3. What layer owns mapping logic?

### Session 17: Observability and production readiness
Coding prompt:
- Add request ID, structured logs, and timing metrics.
- Log errors with context safely.
Expected points:
- Useful logs without leaking sensitive data.
- Correlated events across request lifecycle.
Deep-dive questions:
1. What makes logs actionable?
2. What should never be logged?
3. How to use logs in incident response?

---

## Session Set D: Full-Stack and Senior Signals (18-20)

### Session 18: End-to-end feature slice
Coding prompt:
- Build incident status transition from UI to API and back.
- Include validation, error mapping, and optimistic update.
Expected points:
- Consistent contract across layers.
- Good user feedback and rollback.
Deep-dive questions:
1. How do you model this contract once and reuse?
2. Where can this fail in production?
3. How would you monitor this path?

### Session 19: Debugging live scenario
Coding prompt:
- Given failing state sync between UI and API, diagnose and fix.
- Explain debugging sequence in real time.
Expected points:
- Systematic hypothesis-driven debugging.
- Uses logs/tests, not guesswork.
Deep-dive questions:
1. How do you isolate frontend vs backend root cause?
2. What signals do you inspect first?
3. How do you prevent recurrence?

### Session 20: Architecture defense round
Coding prompt:
- Present your project architecture in 10 min.
- Defend choices under scaling and team growth constraints.
Expected points:
- Clear rationale and tradeoffs.
- Incremental evolution plan.
Deep-dive questions:
1. What would you change first at 10x load?
2. Which abstraction would you remove today?
3. How do you balance velocity and reliability?

---

## Answer Quality Checklist (Per Question)

1. Start with assumptions and constraints.
2. State one preferred approach and one alternative.
3. Explain tradeoffs in plain language.
4. Call out edge cases and failure paths.
5. Mention test strategy briefly.
6. Close with how you would evolve the solution.

---

## Interviewer Script (Use with a friend)

1. Ask candidate to restate the problem in 60 seconds.
2. Force one requirement change at minute 20.
3. Ask for one simplification and one scalability extension.
4. Ask candidate to identify a likely bug in their own solution.
5. End with two behavioral prompts tied to the coding exercise.

Behavioral prompts:
1. Describe a production bug with similar failure mode.
2. Describe a time you traded elegance for delivery.
3. Describe a time you changed your design after feedback.

---

## Debrief Template (Fill after each session)

Session number:
Date:
Score out of 100:

Strengths:
1.
2.
3.

Weaknesses:
1.
2.
3.

Most important missed concept:

One concrete fix before next session:

Next session to repeat:

---

## Suggested Weekly Rotation

Week A:
1. Session 1
2. Session 7
3. Session 13

Week B:
1. Session 2
2. Session 8
3. Session 14

Week C:
1. Session 3
2. Session 9
3. Session 15

Week D:
1. Session 4
2. Session 10
3. Session 16

Week E:
1. Session 5
2. Session 11
3. Session 17

Week F:
1. Session 6
2. Session 12
3. Session 18

Final week:
1. Session 19
2. Session 20
3. Repeat weakest prior session

---

## Quick Readiness Targets

You are interview-ready for mid-level when:
1. You consistently score 75+ across 6 sessions.
2. No major type safety mistakes in TS rounds.
3. You can explain effect dependencies and API contracts clearly.

You are approaching senior-ready when:
1. You consistently score 85+ across 6 sessions.
2. You proactively discuss tradeoffs and failure modes.
3. You propose pragmatic, incremental architecture improvements.
