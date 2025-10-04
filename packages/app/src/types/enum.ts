export type EnumKeys<T> = Array<keyof T>
export type EnumIndexes<T> = Array<EnumKeys<T>['length']>
export type EnumValues<T> = Array<T[keyof T]>
export type EnumObject<T> = { [I in keyof T]: T[I] }
