/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RacingSummaryListCard from '@/components/ui/RacingSummaryListCard.vue'
import { useCountDown } from '@/composite/useCountDown'
import { ref } from 'vue'
import { Quasar } from 'quasar'
import { createTestingPinia } from '@pinia/testing'

vi.mock('@/composite/useCountDown', () => ({
    useCountDown: vi.fn(),
}))

describe('RacingSummaryListCard.vue', () => {
    const racingSummary = {
        raceId: '1',
        meetingName: 'Meeting 1',
        raceNumber: 1,
        advertisedStart: { seconds: new Date()
            .getTime() / 1000 },
        venueCountry: 'AU'
    }

    it('renders race details correctly', () => {
        (useCountDown as any).mockReturnValue({
            isFinished: ref(false),
            isLessThanOneMinute: ref(false),
            isLessThenFiveMinute: ref(false),
            displayCountDown: ref('10m 0s'),
            displayDateTime: ref('2025-10-04 10:30:00'),
            isRunning: ref(true),
            diffSeconds: ref(600),
        })

        const wrapper = mount(RacingSummaryListCard, {
            props: {
                // @ts-ignore
                racingSummary,
            },
            global: {
                plugins: [
                    Quasar,
                    createTestingPinia({ createSpy: vi.fn }),
                ],
            },
        })

        expect(wrapper.text())
            .toContain('Meeting 1')
        expect(wrapper.text())
            .toContain('Race number')
        expect(wrapper.text())
            .toContain('1')
    })

    it('emits race-finish event when countdown finishes', async () => {
        (useCountDown as any).mockReturnValue({
            isFinished: ref(false),
            isLessThanOneMinute: ref(false),
            isLessThenFiveMinute: ref(false),
            displayCountDown: ref('10m 0s'),
            displayDateTime: ref('2025-10-04 10:30:00'),
            isRunning: ref(true),
            diffSeconds: ref(600),
        })

        const wrapper = mount(RacingSummaryListCard, {
            props: {
                // @ts-ignore
                racingSummary,
            },
            global: {
                plugins: [
                    Quasar,
                    createTestingPinia({ createSpy: vi.fn }),
                ],
                stubs: {
                    CountDownDiv: true
                }
            },
        })

        const countDownDiv = wrapper.find('count-down-div-stub')
        await countDownDiv.trigger('finish')

        expect(wrapper.emitted('race-finish'))
            .toBeTruthy()
    })
})
