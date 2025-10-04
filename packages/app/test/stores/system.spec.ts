/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useSystemStore } from '@/stores/system'
import { useQuasar } from 'quasar'

vi.mock('quasar', () => ({
    useQuasar: vi.fn(),
}))

describe('System Store', () => {
    let setFn = vi.fn()

    beforeEach(() => {
        setActivePinia(createPinia())
        setFn = vi.fn()
    })

    it('gets the theme mode', () => {
        (useQuasar as any).mockReturnValue({ dark: { isActive: true } })
        const store = useSystemStore()
        expect(store.themeMode)
            .toBe('dark')
    })

    it('sets the theme mode', () => {
        (useQuasar as any).mockReturnValue({ dark: { set: setFn, isActive: false } })
        const store = useSystemStore()

        store.themeMode = 'dark'
        expect(setFn)
            .toHaveBeenCalledWith(true)

        store.themeMode = 'light'
        expect(setFn)
            .toHaveBeenCalledWith(false)
    })
})
