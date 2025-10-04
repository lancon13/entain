import { defineStore } from 'pinia'
import { useQuasar } from 'quasar'
import { computed } from 'vue'

export const useSystemStore = defineStore('system', () => {

    const $q = useQuasar()

    const themeMode = computed({
        set(themeMode: string) {
            $q.dark.set(themeMode === 'dark')
        },
        get() {
            return $q.dark.isActive ? 'dark' : 'light'
        }
    })

    return {
        themeMode
    }

})