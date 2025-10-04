
import { defineBoot } from '@quasar/app-vite/wrappers'
import { createI18n } from 'vue-i18n'
import messages from '../i18n'

export default defineBoot(async ({ app }) => {
    const i18n = createI18n({
        locale: navigator.language.toLocaleLowerCase() || 'en-au',
        fallbackLocale: 'en-au',
        globalInjection: true,
        messages
    })

    // Set i18n instance on app
    app.use(i18n)
    app.provide('i18nGlobal', i18n)
})