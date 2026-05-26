/**
 * TYPESCRIPT WARM-UP EXERCISES
 * Foundational concepts for modern TypeScript development
 */

// ============================================================================
// EXERCISE 1: BASIC TYPES & ANNOTATIONS
// ============================================================================

// TODO: Annotate these variables with the correct types.
let userName: string = '';
let userAge: number = 0;
let isActive: boolean = false;
let tags: string[] = [];
let coordinates: { x: number; y: number } = { x: 0, y: 0 };
let callback: (input: string) => void = () => {};

// TODO: Add parameter and return types.
function greet(name: string, age: number, email: string): string {
  return `Hello, ${name}! You are ${age} years old and your email is ${email}.`;
}

// ============================================================================
// EXERCISE 2: UNION & INTERSECTION TYPES
// ============================================================================

type BasicUser = {
  id: number;
  name: string;
};

type Admin = {
  role: 'admin';
  permissions: string[];
};

type Moderator = {
  role: 'moderator';
  bannedUsers: string[];
};

// TODO: Create a union for BasicUser | Admin | Moderator.
type UserRole = BasicUser | Admin | Moderator;

// TODO: Create an intersection type for BasicUser plus timestamps.
type TimestampedUser = BasicUser & {
  createdAt: Date;
  updatedAt: Date;
};

// TODO: Implement narrowing with role checks and log useful output.
function displayUserInfo(user: UserRole): void {
  console.log(user);
}

// ============================================================================
// EXERCISE 3: TYPE VS INTERFACE
// ============================================================================

// TODO: Define Product as an interface.
interface Product {
  // id, name, price, inStock
}

// TODO: Define CartItem as a type.
type CartItem = unknown;

// TODO: Extend Product with a discount field.
interface DiscountedProduct extends Product {}

// TODO: Implement using your types.
function addToCart(item: CartItem): void {
  console.log(item);
}

// TODO: Return a DiscountedProduct.
function applyDiscount(product: Product, percent: number): DiscountedProduct {
  return {
    ...product,
    discount: percent,
  } as DiscountedProduct;
}

// ============================================================================
// EXERCISE 4: ENUMS & LITERAL TYPES
// ============================================================================

// TODO: Create enum UserStatus with ACTIVE, INACTIVE, BANNED, PENDING.
enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BANNED = 'BANNED',
  PENDING = 'PENDING',
}

// TODO: Create LogLevel as 'error' | 'warn' | 'info' | 'debug'.
type LogLevel = 'error' | 'warn' | 'info' | 'debug';

// TODO: Implement handling logic for each log level.
function log(message: string, level: LogLevel): void {
  console.log(level, message);
}

// TODO: Type this with id, name, status using UserStatus.
type AppUser = {
  id: number;
  name: string;
  status: UserStatus;
};

// ============================================================================
// EXERCISE 5: ARRAY & OBJECT TYPING
// ============================================================================

// TODO: Type each declaration correctly.
const fruits = ['apple', 'banana', 'orange'];
const fixedNumbers = [1, 2, 3];
const point = [10.5, 20.3];
const scores = { alice: 100, bob: 95, charlie: 88 };
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// TODO: Type array parameter and callback item shape.
function processItems(items: Array<{ id: number; value: string }>): void {
  items.forEach((item) => {
    console.log(`Item ${item.id}: ${item.value}`);
  });
}

// ============================================================================
// EXERCISE 6: OPTIONAL & READONLY PROPERTIES
// ============================================================================

// TODO: Add required, optional, and readonly fields.
type Config = {
  host: string;
  port: number;
  timeout?: number;
  readonly version: string;
};

function initializeServer(config: Config): void {
  console.log(`Server running at ${config.host}:${config.port}`);
  const timeout = config.timeout ?? 5000;
  console.log(`Timeout: ${timeout}`);
}

// TODO: Create PartialConfig and FullConfig with utility types.
type PartialConfig = Partial<Config>;
type FullConfig = Required<Config>;

// ============================================================================
// EXERCISE 7: TYPE ASSERTIONS & TYPE GUARDS
// ============================================================================

// TODO: Narrow unknown safely with typeof/object checks.
function processValue(value: unknown): void {
  console.log(value);
}

interface HasName {
  name: string;
}

// TODO: Implement proper type predicate.
function isNamed(obj: unknown): obj is HasName {
  return false;
}

const someValue: unknown = 'hello';
// TODO: Avoid assertions unless truly necessary.
const str = someValue as string;

function getValue(input: string | null): string {
  if (input !== null) {
    return input;
  }
  return '';
}

// ============================================================================
// EXERCISE 8: BASIC GENERICS
// ============================================================================

// TODO: Create generic Container<T> type.
type Container<T> = { value: T };

// TODO: Implement generic helpers.
function createBox<T>(value: T): Container<T> {
  return { value };
}

function getBoxValue<T>(box: Container<T>): T {
  return box.value;
}

function reverse<T>(array: T[]): T[] {
  return array.slice().reverse();
}

// ============================================================================
// EXERCISE 9: CONDITIONAL LOGIC WITH TYPES
// ============================================================================

// TODO: Model loading/success/error states as a discriminated union.
type DataResponse<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function handleResponse<T>(response: DataResponse<T>): void {
  switch (response.status) {
    case 'success':
      console.log('Data:', response.data);
      break;
    case 'error':
      console.error('Error:', response.error);
      break;
    case 'loading':
      console.log('Loading...');
      break;
  }
}

// ============================================================================
// EXERCISE 10: PRACTICAL APPLICATION
// ============================================================================

// TODO: Define a typed User model and UserRepository API.
interface User {
  readonly id: number;
  email: string;
  firstName: string;
  lastName: string;
  age?: number;
  role: 'admin' | 'user' | 'guest';
}

type UserRepository = {
  getUser(id: number): User | null;
  createUser(userData: Omit<User, 'id'>): User;
  deleteUser(id: number): boolean;
  getAllUsers(): User[];
};

// TODO: Keep as starter implementation, improve during practice.
const mockUserRepo: UserRepository = (() => {
  let users: User[] = [];
  let nextId = 1;

  return {
    getUser(id) {
      return users.find((u) => u.id === id) || null;
    },
    createUser(userData) {
      const user: User = { id: nextId++, ...userData };
      users.push(user);
      return user;
    },
    deleteUser(id) {
      const prevLength = users.length;
      users = users.filter((u) => u.id !== id);
      return users.length < prevLength;
    },
    getAllUsers() {
      return users;
    },
  };
})();

function getUsersByRoleAndName(users: User[], role: User['role']): string[] {
  return users
    .filter((u) => u.role === role)
    .map((u) => `${u.firstName} ${u.lastName}`);
}

void userName;
void userAge;
void isActive;
void tags;
void coordinates;
void callback;
void str;
void mockUserRepo;
void getUsersByRoleAndName;

export {};
