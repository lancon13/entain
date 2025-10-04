/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAsyncState, type UseAsyncStateOptions } from '@vueuse/core'
import { isEqual } from 'es-toolkit'
import { computed, type Ref, ref, watch } from 'vue'

export type UseCall<P extends any[] = any[], R = unknown> = {
    call: (...args: P) => Promise<R>
    data: Ref<R>
    isLoading: Ref<boolean>
    isReady: Ref<boolean>
    error: Ref<Error | null>
}

export type UseData<P extends any[] = any[], R = unknown> = {
    call: (...args: P) => Promise<R>
    refresh: (skipCache?: boolean) => Promise<R>
    data: Ref<R>
    isLoading: Ref<boolean>
    isReady: Ref<boolean>
    error: Ref<Error | null>
}

export type UseCallOptions<P, R> = {
    initialParams?: P | Ref<P>
    initialData?: R | Ref<R>
    onData?: ((data: R) => unknown)
} & UseAsyncStateOptions<true, R>
export type UseDataOptions<P, R> = {
    initialParams?: P | Ref<P>
    initialData?: R | Ref<R>
    paramsChangeRefresh?: boolean
    throttle?: number
    onData?: ((data: R) => unknown)
} & UseAsyncStateOptions<true, R>


export function useCall<P extends any[] = any[], R = unknown>(
    call: (...params: P) => Promise<R>,
    options?: UseCallOptions<P, R>
): UseCall<P, R> {
    options ??= {}
    options.onData ??= ((v: R) => v as unknown)

    return useData(call, { ...options, throttle: 0 })
}

export function useData<P extends any[] = any[], R = unknown>(
    call: (...params: P) => Promise<R>,
    options?: UseDataOptions<P, R>
): UseData<P, R> {
    options ??= {}
    options.onData ??= ((v: R) => v as unknown)
    options.paramsChangeRefresh ??= true
    options.throttle ??= 5000

    let _updatingParamsState = false
    let _skippingCache = false

    const throttleCaches = new Map<string, Promise<R>>()
    const paramsState = ref<P>(options?.initialParams as P ?? [])
    async function refresh(skipCache?: boolean) {
        _skippingCache = skipCache || false
        return await exec(...paramsState.value)
    }
    async function exec(...args: P) {
        const rv = (options as Required<UseDataOptions<P, R>>).onData(await execute(1, ...args))
        _updatingParamsState = false
        return rv as R
    }

    const { execute, state, isLoading, isReady, error } = useAsyncState<R, P, true>(
        async (...args: P) => {
            const key = JSON.stringify(args)
            if (!throttleCaches.has(key) || _skippingCache || options?.throttle === 0) {
                throttleCaches.set(key, call(...args))
                setTimeout(() => {
                    throttleCaches.delete(key)
                }, options?.throttle || 1)
            }
            _skippingCache = false
            _updatingParamsState = true
            paramsState.value = args

            // Execute the function and return the result
            const result = await throttleCaches.get(key) as R
            if ( typeof result === 'object' && (result as {data?: unknown})?.data || (result as {error?: unknown})?.error )
                if ((result as { error?: unknown })?.error )
                    throw (result as { error?: unknown }).error
                else
                    return (result as {data?: unknown})?.data as R
            return result as R
        },
        options?.initialData as R,
        {
            immediate: false,
            resetOnExecute: true,
            throwError: true,
            ...(options || {})
        }
    )
    watch(paramsState, (newValue, oldValue) => {
        if (options.paramsChangeRefresh === true && !isEqual(newValue, oldValue) && !_updatingParamsState)
            exec(...paramsState.value)
    }, { deep: true })

    return {
        call: exec,
        refresh,
        data: state,
        isLoading,
        isReady,
        error: computed({
            get: () => {
                if (!error.value)
                    return null
                else if (!(error.value instanceof Error) || typeof error.value === 'object')
                    return new Error(error.value.toString())
                return error.value
            },
            set: (newError: Error | null) => {
                error.value = newError
            }
        })
    }
}
