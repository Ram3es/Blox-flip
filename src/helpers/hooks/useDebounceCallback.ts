import { useEffect, useRef } from 'react'

export const useDebouncedCallback = <T extends any[]>(
  callback: (...args: T) => void,
  wait: number
) => {
  const argsRef = useRef<T>()
  const timeout = useRef<ReturnType<typeof setTimeout>>()

  const cleanup = () => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
  }

  useEffect(() => cleanup, [])

  const debouncedCallback = (...args: T) => {
    argsRef.current = args

    cleanup()

    timeout.current = setTimeout(() => {
      if (argsRef.current) {
        // eslint-disable-next-line n/no-callback-literal
        callback(...argsRef.current)
      }
    }, wait)
  }
  return debouncedCallback
}
