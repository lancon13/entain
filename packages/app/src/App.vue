<template>
    <component :is="layoutComponent">
        <router-view />
    </component>
</template>

<script setup>
    import { computed } from 'vue'
    import { useRoute } from 'vue-router'
    import DefaultLayout from '@/layouts/DefaultLayout.vue'
    
    const route = useRoute()
    const layouts = {
        DefaultLayout,
    }

    // Compute which layout to use based on the current route's meta
    const layoutComponent = computed(() => {
        const layoutName = route.meta.layoutName || 'DefaultLayout'
        return layouts[layoutName]
    })
</script>