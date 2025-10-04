/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RacingSummariesList from '@/components/ui/RacingSummariesList.vue'
import { Quasar } from 'quasar'
import { createTestingPinia } from '@pinia/testing'

describe('RacingSummariesList.vue', () => {
    const racingSummaries = [
        { raceId: '1', meetingName: 'Meeting 1', raceNumber: 1, advertisedStart: { seconds: new Date()
            .getTime() / 1000 } },
        { raceId: '2', meetingName: 'Meeting 2', raceNumber: 2, advertisedStart: { seconds: new Date()
            .getTime() / 1000 } },
    ]

    it('renders a list of races', () => {
        const wrapper = mount(RacingSummariesList, {
            props: {
                // @ts-ignore
                racingSummaries,
                isLoading: false,
            },
            global: {
                plugins: [Quasar, createTestingPinia({ createSpy: vi.fn })],
                stubs: {
                    RacingSummaryListCard: {
                        template: '<li data-test="race-card"></li>',
                    },
                },
            },
        })

        const races = wrapper.findAll('[data-test="race-card"]')
        expect(races.length)
            .toBe(2)
    })

    it('shows loading indicator when isLoading is true', () => {
        const wrapper = mount(RacingSummariesList, {
            props: {
                racingSummaries: [],
                isLoading: true,
            },
            global: {
                plugins: [Quasar, createTestingPinia({ createSpy: vi.fn })],
                stubs: {
                    QInnerLoading: true,
                },
            },
        })

        expect(wrapper.find('q-inner-loading-stub')
            .exists())
            .toBe(true)
    })

    it('emits race-finish event', async () => {
        const wrapper = mount(RacingSummariesList, {
            props: {
                // @ts-ignore
                racingSummaries,
                isLoading: false,
            },
            global: {
                plugins: [Quasar, createTestingPinia({ createSpy: vi.fn })],
                stubs: {
                    RacingSummaryListCard: {
                        template: '<li data-test="race-card"></li>',
                    },
                },
            },
        })

        const raceCard = wrapper.find('[data-test="race-card"]')
        await raceCard.trigger('race-finish')

        expect(wrapper.emitted('race-finish'))
            .toBeTruthy()
        
        // @ts-ignore
        expect(wrapper.emitted('race-finish')[0][0])
            .toEqual(racingSummaries[0])
    })
})
