import { defineBoot } from '@quasar/app-vite/wrappers'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import { App, InjectionKey } from 'vue'

export const systemProviderKey = Symbol(
    'system-provider'
) as InjectionKey<App>

export default defineBoot(async ({ app }) => {
    dayjs.extend(isSameOrAfter)
    dayjs.extend(relativeTime)
    dayjs.extend(localizedFormat)

    app.use({
        install(app) {
            app.provide(systemProviderKey, app)
        }
    })
})