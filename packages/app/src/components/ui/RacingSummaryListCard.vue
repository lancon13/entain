<template>
    <c-card
        tag="li"
        :class="['mb-4 bg-surface shadow-lg', isFinished ? 'text-gray-500' : '']">
        <q-card-section class="flex flex-col md:flex-row md:items-center gap-4 !flex-nowrap">
            <div class="flex items-center gap-4 !flex-nowrap">
                <q-avatar size="3rem" color="primary">
                    {{ toInitial(props.racingSummary.meetingName) }}
                </q-avatar>

                <div class="md:w-64">
                    <label class="text-sm text-neutral">Meeting name</label>
                    <h3 class="font-semibold">{{ props.racingSummary.meetingName }}</h3>
                    <div>{{ props.racingSummary.venueCountry}}</div>
                </div>
            
                <q-space class="md:hidden"/>
                <q-separator class="max-md:hidden" vertical />

                <div class="text-center">
                    <label class="text-sm text-neutral">Race number</label>
                    <h3>{{ props.racingSummary.raceNumber }}</h3>
                </div>
            </div>

            <q-space />

            <div class="flex items-center gap-4 !flex-nowrap">
                <div class=" text-center">
                    <label class="text-sm text-neutral">Start time</label>
                    <time class="block font-semibold leading-relax" :datetime="toDateString(props.racingSummary.advertisedStart.seconds * 1000, 'DD MMM YYYY HH:mm')">{{ toDateString(props.racingSummary.advertisedStart.seconds * 1000, 'h:mm A - DD MMM YYYY') }}</time >
                </div>

                <q-space class="md:hidden"/>
                <q-separator class="max-md:hidden" vertical />

                <div class="md:w-48 text-center">
                    <label class="text-sm text-neutral">Count down</label>
                    <count-down-div
                        :timestamp="props.racingSummary.advertisedStart.seconds * 1000"
                        @finish="() => emits('race-finish')"
                    />
                </div>
            </div>
                
        </q-card-section>
        <q-card-section class="p-0">
            <count-down-progress :timestamp="props.racingSummary.advertisedStart.seconds * 1000" />
        </q-card-section>
            
    </c-card>
</template>

<script setup lang="ts">
    import CCard from '@/components/core/CCard.vue'
    import CountDownDiv from '@/components/ui/CountDownDiv.vue'
    import CountDownProgress from '@/components/ui/CountDownProgress.vue'
    import { useCountDown } from '@/composite/useCountDown'
    import { toDateString, toInitial } from '@/helpers/formatter'
    import { RaceSummary } from '@/types/racing-data'
    import { CamelCase } from '@/types/transform'
    
    const props = defineProps<{
        racingSummary: (CamelCase<RaceSummary>)
    }>()

    const emits = defineEmits<{
        // eslint-disable-next-line no-unused-vars
        (event: 'race-finish'): void
    }>()

    const { isFinished } = useCountDown(props.racingSummary.advertisedStart.seconds * 1000)

</script>
