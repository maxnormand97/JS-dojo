# FE Study Notes — Rails + JS Fullstack Interview

---

## 1. Async/await and Promises

Why this matters:
Interviewers want to see that you can handle network failures and concurrency safely, not just write syntax-correct async code.

Key points:
- `fetch` resolves for HTTP errors, so you must check `res.ok`.
- `Promise.all` is parallel and fail-fast.
- `forEach` does not await async callbacks.

```js
// fetch does NOT reject on 4xx/5xx — you must check ok
async function get(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Promise.all runs in parallel, fails fast on any rejection
const [user, posts] = await Promise.all([getUser(id), getPosts(id)]);

// await inside forEach does nothing useful — use for...of instead
for (const item of items) {
  await process(item); // correct
}
items.forEach(async (item) => await process(item)); // BROKEN — forEach ignores returned promises
```

Interview soundbite:
"I separate transport errors from application errors, and I make async control flow explicit so race conditions are easier to reason about."

---

## 2. Closures and stale state

Why this matters:
This is a common source of frontend bugs, especially in timers, event handlers, and React effects.

Key points:
- `var` is function-scoped, so loop callbacks share one variable.
- `let` is block-scoped, so each loop iteration gets its own binding.
- In React, prefer state updater functions when a callback runs later.

```js
// Classic closure bug in loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // prints 3,3,3 — i is shared
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // prints 0,1,2 — let is block-scoped
}

// Stale closure in React
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // BUG: count is stale after first render
      setCount(c => c + 1); // CORRECT: use updater function
    }, 1000);
    return () => clearInterval(id);
  }, []); // empty deps locks count at 0
}
```

Interview soundbite:
"If logic runs asynchronously, I assume stale captures are possible and use functional updates or correct dependencies."

---

## 3. useEffect dependency array

Why this matters:
`useEffect` bugs are among the most frequent React interview debugging tasks.

Key points:
- `[]` means run once on mount.
- Dependencies must include values read inside the effect.
- New object/array references can trigger accidental re-runs.
- Cleanup prevents memory leaks and duplicate subscriptions.

```js
// Runs once on mount
useEffect(() => { fetchData(); }, []);

// Runs when userId changes
useEffect(() => { fetchUser(userId); }, [userId]);

// Infinite loop — object/array literal is a new reference every render
useEffect(() => { ... }, [{ id: 1 }]); // new object each render = always runs

// Cleanup matters for subscriptions and timers
useEffect(() => {
  const sub = subscribe(id);
  return () => sub.unsubscribe(); // runs before next effect or unmount
}, [id]);
```

Interview soundbite:
"I treat effects as synchronization with external systems, not as a place for arbitrary business logic."

---

## 4. Event loop — one key mental model

Why this matters:
You need this to explain timing bugs and ordering issues in async UI code.

```js
console.log("1");
setTimeout(() => console.log("2"), 0); // macro task — queued after current stack
Promise.resolve().then(() => console.log("3")); // micro task — runs before macro
console.log("4");
// Output: 1, 4, 3, 2
```

Micro tasks (Promise callbacks, `queueMicrotask`) always drain before the next macro task
(setTimeout, setInterval, I/O callbacks).

Interview soundbite:
"Promise callbacks run before timer callbacks once the current call stack clears."

---

## 5. `this` in one page

Why this matters:
Many bugs come from passing methods as callbacks and losing context.

Key points:
- Regular methods depend on call-site (`obj.method()`).
- Arrow functions do not bind their own `this`.
- Detaching a method often requires `.bind(...)`.

Simple mental model:
- `this` is usually decided by **how a function is called**, not where it was written.
- Think in call-shapes:
  - `obj.fn()` -> `this` is `obj`
  - `fn()` -> `this` is `undefined` (in strict mode / modules)
  - `new Fn()` -> `this` is the new instance
  - `fn.call(x)` / `fn.apply(x)` -> `this` is `x`
- Arrow functions are special: they keep `this` from the surrounding scope.

Common interview trap:
You write a correct method, then pass it into `setTimeout`, event handlers, or destructuring. The call-shape changes, so `this` changes.

```js
const obj = {
  name: "robot",
  greet() { console.log(this.name); },          // this = obj when called as obj.greet()
  greetArrow: () => console.log(this.name),     // this = outer scope (undefined in module)
};

const fn = obj.greet;
fn(); // undefined — lost binding on detach

class Robot {
  constructor() { this.x = 0; }
  move() { return this.x++; }
}
const r = new Robot();
const { move } = r;
move(); // TypeError: cannot read x of undefined — same detach problem
const bound = r.move.bind(r); // fix
```

More examples:

```js
// 1) Call-site rule in plain objects
const user = {
  name: "Max",
  whoAmI() {
    return this.name;
  }
};

user.whoAmI(); // "Max"  -> called as user.whoAmI()
const loose = user.whoAmI;
loose(); // undefined (strict mode) -> called as loose()
```

```js
// 2) Callback trap: method passed to setTimeout
const counter = {
  value: 1,
  inc() {
    this.value += 1;
    console.log(this.value);
  }
};

setTimeout(counter.inc, 10); // BUG: this is not counter
setTimeout(() => counter.inc(), 10); // fix #1: wrap in arrow
setTimeout(counter.inc.bind(counter), 10); // fix #2: bind once
```

```js
// 3) call / apply / bind differences
function greet(greeting, punctuation) {
  return `${greeting} ${this.name}${punctuation}`;
}

const person = { name: "Ava" };

greet.call(person, "Hi", "!"); // call: invoke now, args listed
greet.apply(person, ["Hi", "!"]); // apply: invoke now, args as array
const greetAva = greet.bind(person, "Hi"); // bind: returns new function
greetAva("!");
```

```js
// 4) Classes: constructor bind vs arrow field
class TimerA {
  seconds = 0;

  constructor() {
    this.tick = this.tick.bind(this); // bind once
  }

  tick() {
    this.seconds += 1;
  }
}

class TimerB {
  seconds = 0;
  tick = () => {
    this.seconds += 1; // arrow keeps instance this
  };
}
```

Quick checks when debugging `this` bugs:
1. How is this function called at runtime?
2. Is it being passed as a bare callback?
3. Is it a regular function where an arrow or bind is needed?
4. Can you avoid `this` by passing explicit data instead?

Interview soundbite:
"When I pass class/object methods around, I verify binding semantics up front to avoid hidden runtime errors."

---

## 6. TypeScript discriminated unions

Why this matters:
This pattern gives compile-time safety for command handling and error states, which is great for interview domain logic tasks.

Key points:
- A `kind` field enables safe narrowing in `switch`.
- `Result<T, E>` avoids overusing exceptions for expected domain failures.

```ts
type Command =
  | { kind: "PLACE"; x: number; y: number }
  | { kind: "MOVE" }
  | { kind: "INVALID"; reason: string };

function handle(cmd: Command) {
  switch (cmd.kind) {
    case "PLACE": return place(cmd.x, cmd.y); // TS knows x and y exist here
    case "MOVE":  return move();
    case "INVALID": return log(cmd.reason);   // TS knows reason exists here
  }
}

// Result type — encodes errors without throwing
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
```

Interview soundbite:
"I prefer explicit unions for command and error flows so impossible states are harder to represent."

---

## 7. DOM events — delegation

Why this matters:
Delegation scales better and handles dynamic content without re-registering listeners.

```js
// Instead of attaching a listener to every button (expensive),
// attach once to the parent and check the target
document.getElementById("list").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-id]");
  if (!btn) return;
  handleAction(btn.dataset.id);
});
// Works for dynamically added children too
```

Interview soundbite:
"I use event delegation to reduce listener churn and support dynamic lists with one stable handler."

---

## 8. CORS and auth — what to say in system design

Why this matters:
For Rails + JS fullstack roles, interviewers often test whether you understand browser security boundaries and practical auth tradeoffs.

- CORS is enforced by the **browser**, not the server. The server opts in by sending `Access-Control-Allow-Origin`.
- Rails API: add `rack-cors` gem, allow your frontend origin explicitly, never use `*` with credentials.
- **Cookies** (Rails session): automatic on same-origin; need `SameSite`, `Secure`, and CSRF token on cross-origin.
- **JWT in Authorization header**: no CSRF risk, but you manage storage — `httpOnly` cookie is safer than `localStorage` (XSS risk).

Interview soundbite:
"I pick cookie sessions for same-origin simplicity and JWT for stateless cross-service flows, then I design around CSRF/XSS implications."

---

## 9. React controlled form — the interview pattern

Why this matters:
This covers core frontend competencies in one exercise: input control, async calls, loading UX, and resilient error handling.

```tsx
function CommandForm({ onSubmit }: { onSubmit: (cmd: string) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) { setError("Required"); return; }
    setError(null);
    setLoading(true);
    try {
      await onSubmit(value.trim());
      setValue("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={value} onChange={e => setValue(e.target.value)} disabled={loading} />
      {error && <p role="alert">{error}</p>}
      <button type="submit" disabled={loading}>{loading ? "Sending…" : "Send"}</button>
    </form>
  );
}
```

This one snippet covers: controlled input, loading state, error boundary, accessible alert,
and disabled button — everything they look for.

Interview soundbite:
"I keep form state controlled and model request lifecycle explicitly: idle, loading, success, error."

---

## 10. Rails + JS integration talking points

Why this matters:
Interviewers want clear reasoning on where rendering lives, how data flows, and how you protect boundaries between client and server.

| Topic | Key point |
|---|---|
| Rails as JSON API | `render json:`, serializers, strong params is your input validation boundary |
| Hotwire/Turbo | Server-rendered HTML over the wire, minimal JS — good for CRUD, bad for rich interactions |
| CSRF with Rails + SPA | Use `X-CSRF-Token` header from `<meta name="csrf-token">`, or switch to stateless JWT |
| Asset pipeline vs Vite | Importmap for simple JS, Vite/esbuild for React/TS — know the tradeoff exists |

---

## Priority order (given strong BE background)

How to use this list in a few hours:
- Spend 45-60 min on sections 1-3 and verbally explain each example.
- Spend 30 min implementing one controlled form with loading/error states.
- Spend 30 min practicing CORS/auth explanations out loud.
- Use the final 30 min to do a timed debug pass on a buggy snippet.

1. Async/await and Promise error handling — highest ROI, tested everywhere
2. `fetch` + loading/error state in vanilla JS or React
3. `useEffect` dependency array — one wrong answer tanks FE credibility
4. DOM event delegation — common gotcha question
5. TypeScript discriminated union — relevant given your robot work
6. CORS + JWT vs cookie auth — relevant to Rails API + React SPA

