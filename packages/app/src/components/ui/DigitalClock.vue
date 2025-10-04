<template>
    <div class="text-xl flex gap-4 items-center"><span class="font-semibold font-mono">{{ toDateString(timestamp, 'hh:mm:ss A') }}</span><q-separator vertical /><span class="font-semibold">{{ toDateString(timestamp, 'DD MMM YYYY') }}</span></div>
</template>

<script setup lang="ts">
    import { toDateString } from '@/helpers/formatter'
    import { useCountDown } from '@/composite/useCountDown'

    const { timestamp } = useCountDown(new Date())
</script>
