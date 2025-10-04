/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CountDownProgress from '@/components/ui/CountDownProgress.vue'
import { useCountDown } from '@/composite/useCountDown'
import { ref } from 'vue'
import { Quasar } from 'quasar'
import { createTestingPinia } from '@pinia/testing'

vi.mock('@/composite/useCountDown', () => ({
    useCountDown: vi.fn(),
}))

describe('CountDownProgress.vue', () => {
    it('calculates progress correctly', async () => {
        const mockReturnValue = {
            isRunning: ref(false),
            isFinished: ref(false),
            isLessThanOneMinute: ref(false),
            isLessThenFiveMinute: ref(false),
            diffSeconds: ref(120),
        };
        (useCountDown as any).mockReturnValue(mockReturnValue)

        const wrapper = mount(CountDownProgress, {
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

        // @ts-ignore
        expect(wrapper.vm.progress)
            .toBe(1)

        mockReturnValue.isLessThanOneMinute.value = true
        mockReturnValue.diffSeconds.value = 30
        await wrapper.vm.$nextTick()
        // @ts-ignore
        expect(wrapper.vm.progress)
            .toBe(0.5)

        mockReturnValue.isFinished.value = true
        await wrapper.vm.$nextTick()
        // @ts-ignore
        expect(wrapper.vm.progress)
            .toBe(0)
    })
})