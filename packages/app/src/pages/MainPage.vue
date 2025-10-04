<template>
    <q-page padding>
        

    
        <div class="container mx-auto flex flex-col gap-4">

            <!-- Title -->
            <div class="flex items-center">
                <div>
                    <h1 class=" font-extrabold text-5xl leading-loose">Next To Go</h1>
                </div>
                <q-space />
                <div class="text-right">
                    <label>Current Date / Time</label>
                    <digital-clock />
                </div>
            </div>

            <!-- Category selections -->
            <div class="grid md:grid-cols-3 gap-4" >
                <c-card v-for="categoryOption in categoryOptions"
                        :key="categoryOption.value"
                        clickable
                        :class="['shadow-lg', 'border-2', selectedCategoryId === categoryOption.value ? `border-primary text-primary-800 ${themeMode === 'dark' ? 'bg-primary-50 ' : ''}` : `bg-surface`]"
                        @click="() => handleCategoryOptionClick(categoryOption)">
                    <q-card-section class="text-center">
                        <q-img :src="categoryOption.data.imagePath" class="w-24" />
                        <h2 class="font-bold text-base">{{ categoryOption.label }}</h2>
                    </q-card-section>
                </c-card>
            </div>

            <q-separator class="mt-4 mb-8" />

            <!-- Racing summaries list -->
            <racing-summaries-list :is-loading="isLoading"
                                   :racing-summaries="selectedRaceSummaries"
                                   class="mb-8"
                                   @race-finish="handleRaceFinish"/>
        </div>

        
    </q-page>
</template>


<script setup lang="ts">
    import CCard from '@/components/core/CCard.vue'
    import DigitalClock from '@/components/ui/DigitalClock.vue'
    import RacingSummariesList from '@/components/ui/RacingSummariesList.vue'
    import { availableCategoryOptions } from '@/constant/options'
    import { useDataStore } from '@/stores/data'
    import { useSystemStore } from '@/stores/system'
    import { Option } from '@/types/options'
    import { storeToRefs } from 'pinia'
    import { computed, onMounted } from 'vue'

    const systemStore = useSystemStore()
    const { themeMode } = storeToRefs(systemStore)
    const dataStore = useDataStore()
    const { isLoading, selectedCategoryId, selectedRaceSummaries } = storeToRefs(dataStore)

    const categoryOptions = computed<Option[]>(() => availableCategoryOptions)
    
    // Life cycle
    onMounted(() => {
        dataStore.refresh(30)
        if ( selectedCategoryId.value === null )
            selectedCategoryId.value = categoryOptions.value?.[0]?.value ?? null
    })

    // Event handlers
    function handleCategoryOptionClick(categoryOption:Option) {
        selectedCategoryId.value = categoryOption.value
    }
    function handleRaceFinish() {
        // Refresh the page after 3 sec.
        setTimeout(() => {
            dataStore.refresh(30)
        }, 3000)
        
    }

</script>
