<template>
    <div>
        <div :class="['font-mono', isLessThanOneMinute || isRunning ? 'text-primary' : '']">{{ displayCountDown }}</div>
        <q-tooltip>{{ displayDateTime }}</q-tooltip>
    </div>
</template>

<script setup lang="ts">
    import { useCountDown } from '@/composite/useCountDown'
    import { watch } from 'vue'
    
    const props = defineProps<{
        timestamp: Date | string | number
    }>()

    const emits = defineEmits<{
        // eslint-disable-next-line no-unused-vars
        (event: 'finish'): void
    }>()

    const { isLessThanOneMinute, displayCountDown, displayDateTime, isFinished, isRunning } = useCountDown(props.timestamp)

    watch(isFinished, (newValue, oldValue) => {
        if (newValue && newValue !== oldValue)
            emits('finish')
    })

</script>
