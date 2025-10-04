import {
    isLessThanOneMinute as checkIsLessThanOneMinute,
    isLessThenFiveMinute as checkIsLessThenFiveMinute,
    isOverThanOneMinute as checkIsOverThanOneMinute,
    getDiffSeconds
} from '@/helpers/datetime'
import { toDateString, toTimeDiff } from '@/helpers/formatter'
import { useTimestamp } from '@vueuse/core'
import { computed } from 'vue'

export function useCountDown(currentTimestamp: string | number | Date) {
    const ts = useTimestamp({ offset: 0, interval: 1000 })

    const diffSeconds = computed(() => {
        return getDiffSeconds(currentTimestamp, ts.value)
    })
    const isLessThenFiveMinute = computed(() => {
        return checkIsLessThenFiveMinute(currentTimestamp, ts.value)
    })
    const isLessThanOneMinute = computed(() => {
        return checkIsLessThanOneMinute(currentTimestamp, ts.value)
    })
    const isOverThanOneMinute = computed(() => {
        return checkIsOverThanOneMinute(currentTimestamp, ts.value)
    })
    const isRunning = computed(() => diffSeconds.value < 0 && diffSeconds.value >= -60 )
    const isFinished = computed(() => diffSeconds.value < -60 )
    

    const displayCountDown = computed(() => {
        if (isLessThenFiveMinute.value ) {
            const seconds = Math.floor(diffSeconds.value % 60)
            const minutes = Math.floor(diffSeconds.value / 60)
            return `${minutes
                .toString()
                .padStart(1, '0')}:${seconds.toString()
                .padStart(2, '0')}`
        } else if (isFinished.value) {
            return 'Finished'
        } else if (isRunning.value) {
            return 'Running'
        }
        
        return toTimeDiff(currentTimestamp, ts.value)
    })

    const displayDateTime = computed(() => {
        return toDateString(currentTimestamp, 'h:mm A - DD MMM YYYY')
    })
    
    return {
        timestamp: ts,
        diffSeconds,
        isLessThenFiveMinute,
        isLessThanOneMinute,
        isOverThanOneMinute,
        isRunning,
        isFinished,
        displayCountDown,
        displayDateTime
    }
}