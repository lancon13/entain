<template>
    <q-linear-progress size="0.25rem"
                       class="rounded-b-md"
                       :color="isLessThenFiveMinute || isRunning ? 'primary' : 'white'"
                       reverse
                       :indeterminate="isRunning"
                       :value="progress"/>
</template>

<script setup lang="ts">
    import { useCountDown } from '@/composite/useCountDown'
    import { computed } from 'vue'
    
    const props = defineProps<{
        timestamp: Date | string | number
    }>()
    
    const { isRunning, isFinished, isLessThanOneMinute, isLessThenFiveMinute, diffSeconds } = useCountDown(props.timestamp)

    const progress = computed(() => {
        if (isFinished.value )
            return 0
        if (isLessThanOneMinute.value)
            return (1 / 60) * diffSeconds.value
        return 1
    })
    
</script>

