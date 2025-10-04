// Utility types for case conversion (keeping these for potential other uses)
export type CamelCaseKey<S extends string> = S extends `${infer First}_${infer Rest}`
    ? `${First}${Capitalize<CamelCaseKey<Rest>>}`
    : S
// export type CamelCase<T> = {
//     [K in keyof T as CamelCaseKey<Extract<K, string>>]: T[K]
// }
export type CamelCase<T> = T extends (infer E)[]
  // If it's an array, recursively call CamelCase on the element type.
  ? CamelCase<E>[]
  // If it's a non-array object, map keys and recursively call CamelCase on values.
  : T extends object
    ? {
        [K in keyof T as CamelCaseKey<Extract<K, string>>]: CamelCase<T[K]>;
      }
    // Otherwise (if it's a primitive), return the type as is.
    : T;

export type SnakeCaseKey<S extends string> = S extends `${infer First}${infer Rest}`
    ? Rest extends Uncapitalize<Rest> // Check if the rest is already lowercase
        ? `${First}${SnakeCaseKey<Rest>}`
        : `${First}_${SnakeCaseKey<Uncapitalize<Rest>>}`
    : S

// export type SnakeCase<T> = {
//     [K in keyof T as SnakeCaseKey<Extract<K, string>>]: T[K]
// }
// The updated, recursive SnakeCase type.
export type SnakeCase<T> = T extends (infer E)[]
  // If it's an array, recursively call SnakeCase on the element type.
  ? SnakeCase<E>[]
  // If it's a non-array object, map keys and recursively call SnakeCase on values.
  : T extends object
    ? {
        [K in keyof T as SnakeCaseKey<Extract<K, string>>]: SnakeCase<T[K]>;
      }
    // Otherwise (if it's a primitive), return the type as is.
    : T;