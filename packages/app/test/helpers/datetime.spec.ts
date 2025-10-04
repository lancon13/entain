import { describe, it, expect } from 'vitest'
import {
    getDiffSeconds,
    isLessThenFiveMinute,
    isLessThanOneMinute,
    isOverThanOneMinute,
} from '@/helpers/datetime'

describe('datetime helpers', () => {
    it('getDiffSeconds should return the difference in seconds', () => {
        const now = new Date()
        const future = new Date(now.getTime() + 10000)
        expect(getDiffSeconds(future, now))
            .toBe(10)
    })

    it('isLessThenFiveMinute should return true if the difference is less than 5 minutes', () => {
        const now = new Date()
        const future = new Date(now.getTime() + 100000)
        expect(isLessThenFiveMinute(future, now))
            .toBe(true)
    })

    it('isLessThenFiveMinute should return false if the difference is more than 5 minutes', () => {
        const now = new Date()
        const future = new Date(now.getTime() + 400000)
        expect(isLessThenFiveMinute(future, now))
            .toBe(false)
    })

    it('isLessThanOneMinute should return true if the difference is less than 1 minute', () => {
        const now = new Date()
        const future = new Date(now.getTime() + 50000)
        expect(isLessThanOneMinute(future, now))
            .toBe(true)
    })

    it('isLessThanOneMinute should return false if the difference is more than 1 minute', () => {
        const now = new Date()
        const future = new Date(now.getTime() + 70000)
        expect(isLessThanOneMinute(future, now))
            .toBe(false)
    })

    it('isOverThanOneMinute should return true if the race has been over for more than one minute', () => {
        const now = new Date()
        const past = new Date(now.getTime() - 70000)
        expect(isOverThanOneMinute(past, now))
            .toBe(true)
    })

    it('isOverThanOneMinute should return false if the race has been over for less than one minute', () => {
        const now = new Date()
        const past = new Date(now.getTime() - 50000)
        expect(isOverThanOneMinute(past, now))
            .toBe(false)
    })
})
