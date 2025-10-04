<template>
    <ul class="list-none m-0 p-0">
        <racing-summary-list-card v-for="racingSummary in props.racingSummaries"
                                  :key="racingSummary.raceId"
                                  :racing-summary="racingSummary"
                                  @race-finish="() => emits('race-finish', racingSummary)"
        />
        <q-inner-loading
            :showing="props.isLoading"
            label="Please wait..."
        />
    </ul>
</template>

<script setup lang="ts">
    import RacingSummaryListCard from '@/components/ui/RacingSummaryListCard.vue'
    import { RaceSummary } from '@/types/racing-data'
    import { CamelCase } from '@/types/transform'
    
    const props = defineProps<{
        racingSummaries: (CamelCase<RaceSummary>)[]
        isLoading: boolean
    }>()

    const emits = defineEmits<{
        // eslint-disable-next-line no-unused-vars
        (event: 'race-finish', racingSummary: CamelCase<RaceSummary>): void
    }>()

</script>
