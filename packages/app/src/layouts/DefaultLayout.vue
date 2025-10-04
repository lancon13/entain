<template>
    <q-layout view="lHh Lpr lff">
        <!-- Page container -->
        <q-page-container>
            <q-header class=" bg-black px-4" >
                <q-toolbar>
                    <img src="~/assets/entain-logo.svg">
                    <q-space />
                    <q-toggle v-model="themeMode"
                              true-value="dark"
                              false-value="light"
                              checked-icon="mdi-moon-waxing-crescent"
                              unchecked-icon="mdi-weather-sunny">
                        <q-tooltip>
                            {{ themeMode === 'dark' ? 'Dark mode' : 'Light mode' }}
                        </q-tooltip>
                    </q-toggle>
                </q-toolbar>
            </q-header>

            <!-- Main -->
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="isLoading ? LoadingPage : Component" />
                </transition>
            </router-view>

            <q-footer class="bg-secondary">
                <div class="container mx-auto py-4 px-16 mt-8">
                    <div class="flex flex-col md:flex-row gap-16 !flex-nowrap">
                        <img src="~/assets/entain-logo.svg">
                        <div class="max-md:text-center">
                            <p>Please contact me :)</p>
                            <ul class="list-none m-0 p-0">
                                <li>
                                    <a href="mailto:lancon13@gmail.com" target="_blank" class="flex items-center gap-2 link-text text-white">
                                        <q-icon name="mdi-mail" />
                                        <div>lancon13@gmail.com</div>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/lancon13/entain" target="_blank" class="flex items-center gap-2 link-text text-white">
                                        <q-icon name="mdi-github" />
                                        <div>lancon13</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="max-md:text-center text-right">
                        <p class="text-sm py-8">&copy; {{ new Date().getFullYear() }} - All right reserved</p>
                    </div>
                </div>
            </q-footer>

        </q-page-container>

    </q-layout>
</template>

<script setup lang="ts">
    import LoadingPage from '@/pages/LoadingPage.vue'
    import { useSystemStore } from '@/stores/system'
    import { storeToRefs } from 'pinia'
    import { ref } from 'vue'

    const systemStore = useSystemStore()
    const { themeMode } = storeToRefs(systemStore)
    
    const isLoading = ref<boolean>(false)
    
</script>
