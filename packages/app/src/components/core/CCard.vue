<template>
    <q-card v-if="props.clickable"
            v-ripple
            :dark="isDarkMode"
            :class="mainClasses"
            @click="handleCardClick">
        <span class="q-focus-helper"/>
        <slot />
    </q-card>
    <q-card v-else
            :dark="isDarkMode"
            
            :class="mainClasses"
            @click="handleCardClick">
        
        <slot />
    </q-card>
</template>

<script setup lang="ts">
    
    import { useSystemStore } from '@/stores/system'
    import { computed } from 'vue'

    const props = defineProps<{
        clickable?: boolean
    }>()
    const emits = defineEmits<{
        // eslint-disable-next-line no-unused-vars
        (event:'click'):void
    }>()
    const systemStore = useSystemStore()
    const isDarkMode = computed(() => systemStore.themeMode === 'dark')

    const mainClasses = computed(() => {
        return {
            'q-hoverable cursor-pointer': props.clickable
        }
    })

    // Event handlers
    function handleCardClick() {
        emits('click')
    }
</script>
