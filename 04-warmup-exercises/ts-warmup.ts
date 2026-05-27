/**
 * TYPESCRIPT WARM-UP EXERCISES
 * Foundational concepts for modern TypeScript development
 */

// ============================================================================
// EXERCISE 1: BASIC TYPES & ANNOTATIONS
// ============================================================================

// ============================================================================
// EXERCISE 2: UNION & INTERSECTION TYPES
// ============================================================================

// TODO: Create a union for BasicUser | Admin | Moderator.

// TODO: Create an intersection type for BasicUser plus timestamps.

// TODO: Implement narrowing with role checks and log useful output.

// ============================================================================
// EXERCISE 3: TYPE VS INTERFACE
// ============================================================================

// TODO: Define Product as an interface.
interface Product {
  // id, name, price, inStock
}

// TODO: Define CartItem as a type.

// TODO: Extend Product with a discount field.

// TODO: Implement using your types.

// TODO: Return a DiscountedProduct.

// ============================================================================
// EXERCISE 4: ENUMS & LITERAL TYPES
// ============================================================================

// TODO: Create enum UserStatus with ACTIVE, INACTIVE, BANNED, PENDING.

// ============================================================================
// EXERCISE 5: ARRAY & OBJECT TYPING
// ============================================================================

// TODO: Type each declaration correctly.

// ============================================================================
// EXERCISE 6: OPTIONAL & READONLY PROPERTIES
// ============================================================================

// TODO: Add required, optional, and readonly fields.

// ============================================================================
// EXERCISE 7: TYPE ASSERTIONS & TYPE GUARDS
// ============================================================================

// TODO: Narrow unknown safely with typeof/object checks.

// ============================================================================
// EXERCISE 8: BASIC GENERICS
// ============================================================================

// TODO: Create generic Container<T> type.
type Container<T> = { value: T };


// ============================================================================
// EXERCISE 9: CONDITIONAL LOGIC WITH TYPES
// ============================================================================

// TODO: Model loading/success/error states as a discriminated union.

// ============================================================================
// EXERCISE 10: PRACTICAL APPLICATION
// ============================================================================

// TODO: Define a typed User model and UserRepository API.

// void userName;
// void userAge;
// void isActive;
// void tags;
// void coordinates;
// void callback;
// void str;
// void mockUserRepo;
// void getUsersByRoleAndName;

export {};
