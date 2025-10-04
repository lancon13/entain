import dayjs from 'dayjs'
import { isUUID } from './validation'

export function toCamelCase(str: string): string {
    if (typeof str !== 'string' || isUUID(str))
        return str
  
    return str.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase()
            .replace('-', '')
            .replace('_', '')
    })
}

export function toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

export function toInitial(str:string, limit = 2): string {
    return str.split(' ')
        .slice(0, limit)
        .map((word) => word[0])
        .join('')
        .toUpperCase()
}


export function toDateString(date: Date | string | number | null, format: string = 'DD MMM YYYY (ddd)'): string {
    return dayjs(date)
        .format(format)
}

export function toTimeDiff(datetime: Date | string | number, since?: Date | string | number | null): string {
    const dt = dayjs(datetime)
    const sinceDate = dayjs(since)
    return dt.from(sinceDate)
}