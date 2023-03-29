import { useEffect, useRef } from 'react'

export const useDebouncedCallback = <A extends any[]>(
  callback: (...args: A) => void,
  wait: number
) => {
  const argsRef = useRef<A>()
  const timeout = useRef<ReturnType<typeof setTimeout>>()

  const cleanup = () => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
  }

  useEffect(() => cleanup, [])

  return function debouncedCallback(...args: A) {
    argsRef.current = args

    cleanup()

    timeout.current = setTimeout(() => {
      if (argsRef.current) {
        // eslint-disable-next-line n/no-callback-literal
        callback(...argsRef.current)
      }
    }, wait)
  }
}
