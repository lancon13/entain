import { CamelCase, SnakeCase } from '@/types/transform'
import { toCamelCase, toSnakeCase } from './formatter'

// Function to convert data keys from camelCase
export function fromData<T extends object | object[]>(data: T): SnakeCase<T> {
    if (typeof data !== 'object' || data === null)
        return data as SnakeCase<T>

    if (Array.isArray(data))
        return data.map((item) => fromData(item)) as unknown as SnakeCase<T>

    return Object.entries(data)
        .reduce((newObject, [key, value]) => {
            ; (newObject as Record<string, unknown>)[toSnakeCase(key)] = fromData(value)
            return newObject
        }, {} as SnakeCase<T>)
}

// Function to convert data keys to camelCase
export function toData<T extends object | object[]>(data: T): CamelCase<T> {
    if (typeof data !== 'object' || data === null)
        return data as CamelCase<T>

    if (Array.isArray(data))
        return data.map((item) => toData(item)) as unknown as CamelCase<T>

    return Object.entries(data)
        .reduce((newObject, [key, value]) => {
            ; (newObject  as Record<string, unknown>)[toCamelCase(key)] = toData(value)
            return newObject
        }, {} as CamelCase<T>)
}