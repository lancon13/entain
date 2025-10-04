import { useCall } from '@/composite/useCallData'
import { isOverThanOneMinute } from '@/helpers/datetime'
import { toData } from '@/helpers/transformer'
import { RaceSummary, RacingData } from '@/types/racing-data'
import { CamelCase } from '@/types/transform'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useDataStore = defineStore('data', () => {

    /* Neds API */
    const { call: refresh, data: racingData, isLoading } = useCall<[number], CamelCase<RacingData>>(async (limit:number) => {
        return toData(await (await fetch(`https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=${limit}`)).json())
    }, {
        initialData: {} as CamelCase<RacingData>
    })

    
    /* Selected Race Summary */
    const selectedLimit = ref<number>(5)
    const selectedCategoryId = ref<string | null>(null)
    const selectedRaceSummaries = computed<CamelCase<RaceSummary>[]>(() => {
        const now = new Date()
        return Object.keys(racingData.value?.raceSummaries ?? {})
            .reduce((selectedRaceSummaries, key) => {
                const raceSummary = (racingData.value?.raceSummaries ?? {})[key]
                if (
                    raceSummary &&
                    selectedCategoryId.value &&
                    raceSummary.categoryId === selectedCategoryId.value &&
                    !isOverThanOneMinute(raceSummary.advertisedStart.seconds * 1000, now)
                )
                    selectedRaceSummaries.push(raceSummary)
                return selectedRaceSummaries
            }, [] as CamelCase<RaceSummary>[])
            .slice(0, selectedLimit.value)
            .toSorted((rc1, rc2) => {
                return rc1.advertisedStart.seconds < rc2.advertisedStart.seconds ? -1 : (rc1.advertisedStart.seconds > rc2.advertisedStart.seconds ) ? 1 : 0
            })
    })

    return {
        selectedLimit,
        selectedCategoryId,
        selectedRaceSummaries,

        isLoading,
        
        refresh,
    }
}, {
    persist: {
        storage: localStorage,
        pick: ['selectedCategoryId'],
    },
})