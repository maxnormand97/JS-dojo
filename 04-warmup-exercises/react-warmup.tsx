/**
 * REACT WARM-UP EXERCISES
 * Fundamental React concepts for interview preparation.
 */

import React, { FC, ReactNode, useEffect, useState } from 'react';

// ============================================================================
// EXERCISE 1: JSX BASICS & RENDERING
// ============================================================================

// TODO: Practice JSX, interpolation, fragments, attributes, and nesting.
const jsxElement = <h1>Hello, World!</h1>;
const greeting = <p>Welcome!</p>;

// ============================================================================
// EXERCISE 2: FUNCTIONAL COMPONENTS & PROPS
// ============================================================================

function Welcome() {
  return <h1>Welcome!</h1>;
}

function Greeting(props: { name: string }) {
  return <p>Hello, {props.name}!</p>;
}

function Card({ title, content, author }: { title: string; content: string; author: string }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <small>{author}</small>
    </div>
  );
}

function Container({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

// ============================================================================
// EXERCISE 3: STATE WITH useState
// ============================================================================

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// TODO: Add object and array state exercises.

// ============================================================================
// EXERCISE 4: EFFECTS WITH useEffect
// ============================================================================

function EffectExample() {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    document.title = `Clicks: ${clicks}`;
  }, [clicks]);

  return <button onClick={() => setClicks((c) => c + 1)}>Click me</button>;
}

// TODO: Add mount-only effect, dependency-based effect, and cleanup examples.

// ============================================================================
// EXERCISE 5: EVENT HANDLING
// ============================================================================

function ClickButton() {
  const handleClick = () => {
    console.log('Clicked');
  };

  return <button onClick={handleClick}>Click me</button>;
}

// TODO: Add form submit and typed input handlers.

// ============================================================================
// EXERCISE 6: CONDITIONAL RENDERING
// ============================================================================

function LoginStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      {isLoggedIn ? 'Welcome back' : 'Please log in'}
      <button onClick={() => setIsLoggedIn((v) => !v)}>Toggle</button>
    </div>
  );
}

// ============================================================================
// EXERCISE 7: LISTS & KEYS
// ============================================================================

function UserList({ users }: { users: Array<{ id: number; name: string }> }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// ============================================================================
// EXERCISE 8: CONTROLLED FORMS
// ============================================================================

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}

// ============================================================================
// EXERCISE 9: COMPONENT COMPOSITION
// ============================================================================

interface PanelProps {
  title: string;
  children: ReactNode;
}

const Panel: FC<PanelProps> = ({ title, children }) => {
  return (
    <section>
      <h3>{title}</h3>
      {children}
    </section>
  );
};

// ============================================================================
// EXERCISE 10: PRACTICAL APPLICATION
// ============================================================================

// TODO: Build a small app that combines state, effects, events, lists, and forms.

void jsxElement;
void greeting;
void Welcome;
void Greeting;
void Card;
void Container;
void Counter;
void EffectExample;
void ClickButton;
void LoginStatus;
void UserList;
void LoginForm;
void Panel;

export {};
