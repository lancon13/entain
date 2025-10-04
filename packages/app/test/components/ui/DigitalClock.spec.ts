/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DigitalClock from '@/components/ui/DigitalClock.vue'
import { useCountDown } from '@/composite/useCountDown'
import { Quasar } from 'quasar'
import { createTestingPinia } from '@pinia/testing'
import { ref } from 'vue'

vi.mock('@/composite/useCountDown', () => ({
    useCountDown: vi.fn(),
}))

describe('DigitalClock.vue', () => {
    it('renders the current time', () => {
        const fixedDate = new Date('2025-10-04T10:20:30Z');
        (useCountDown as any).mockReturnValue({
            timestamp: ref(fixedDate),
        })

        const wrapper = mount(DigitalClock, {
            global: {
                plugins: [
                    Quasar,
                    createTestingPinia({ createSpy: vi.fn }),
                ],
            },
        })

        expect(wrapper.text())
            .toContain('10:20:30 AM')
        expect(wrapper.text())
            .toContain('04 Oct 2025')
    })
})