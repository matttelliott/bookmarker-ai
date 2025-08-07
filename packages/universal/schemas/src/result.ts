/**
 * Result type matching Zod's safeParse structure
 * Following the "Parse, Don't Validate" principle
 */

export type Success<T> = { success: true; data: T };
export type Failure<E> = { success: false; error: E };
export type Result<T, E = Error> = Success<T> | Failure<E>;

// Factory functions - capitalized because they create objects
export function Success<T>(data: T): Success<T> {
  return { success: true, data };
}

export function Failure<T = never, E = Error>(error: E): Result<T, E> {
  return { success: false, error };
}

// Behavior functions - lowercase because they perform actions
export function isSuccess<T, E>(result: Result<T, E>): result is Success<T> {
  return result.success === true;
}

export function isFailure<T, E>(result: Result<T, E>): result is Failure<E> {
  return result.success === false;
}

export function dangerouslyUnwrap<T, E>(result: Result<T, E>): T {
  if (result.success) {
    return result.data;
  }
  throw new Error('Attempted to unwrap an error result');
}

export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  return result.success ? result.data : defaultValue;
}

export function map<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U
): Result<U, E> {
  if (result.success) {
    return Success(fn(result.data));
  }
  return result;
}