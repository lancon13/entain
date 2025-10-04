import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    // Main
    {
        path: '/',
        name: 'MainPage',
        component: () => import('pages/MainPage.vue'),
        meta: {
            layoutName: 'DefaultLayout',
            requireAuth: false
        }
    },

    // --- Catch-all for 404 Not Found ---
    // Always leave this as last one
    {
        path: '/:catchAll(.*)*',
        // You might want a simple 404 page here or reuse one if you create it
        component: () => import('pages/Error404Page.vue'), // Assuming you'll have a basic Error404 page
        meta: {
            layoutName: 'DefaultLayout',
            requireAuth: false
        }
    },
]

export default routes
