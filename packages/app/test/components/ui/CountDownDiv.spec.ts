/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CountDownDiv from '@/components/ui/CountDownDiv.vue'
import { useCountDown } from '@/composite/useCountDown'
import { ref } from 'vue'
import { Quasar } from 'quasar'
import { createTestingPinia } from '@pinia/testing'

vi.mock('@/composite/useCountDown', () => ({
    useCountDown: vi.fn(),
}))

describe('CountDownDiv.vue', () => {
    it('renders the countdown and emits finish event', async () => {
        const isFinished = ref(false)
        const mockReturnValue = {
            isLessThanOneMinute: ref(false),
            displayCountDown: ref('10m 0s'),
            displayDateTime: ref('2025-10-04 10:30:00'),
            isFinished,
            isRunning: ref(true),
        };
        (useCountDown as any).mockReturnValue(mockReturnValue)

        const wrapper = mount(CountDownDiv, {
            props: {
                timestamp: new Date()
                    .getTime(),
            },
            global: {
                plugins: [
                    Quasar,
                    createTestingPinia({ createSpy: vi.fn }),
                ],
            },
        })

        expect(wrapper.text())
            .toContain('10m 0s')

        // Test finish event
        isFinished.value = true
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted().finish)
            .toBeTruthy()
    })
})