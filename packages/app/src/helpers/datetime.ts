import dayjs from 'dayjs'

export function getDiffSeconds(timestamp: string | number | Date, now: string | number | Date | null) {
    return dayjs(timestamp)
        .diff(now, 'seconds')
}

export function isLessThenFiveMinute(timestamp: string | number | Date, now: string | number | Date | null) {
    const diffSeconds = getDiffSeconds(timestamp, now)
    return ( diffSeconds >= 0 && diffSeconds < 300)
}

export function isLessThanOneMinute(timestamp: string | number | Date, now: string | number | Date | null) {
    const diffSeconds = getDiffSeconds(timestamp, now)
    return ( diffSeconds >= 0 && diffSeconds < 60 )
}

export function isOverThanOneMinute(timestamp: string | number | Date, now: string | number | Date | null) {
    const diffSeconds = getDiffSeconds(timestamp, now)
    return ( diffSeconds < -60 )
}
