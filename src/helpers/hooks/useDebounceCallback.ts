type EventHandler = (event: React.MouseEvent<HTMLButtonElement>) => void

export function debounce<T extends EventHandler> (func: Function, delay: number): T {
  let timerId: ReturnType<typeof setTimeout> | null
  return ((): ReturnType<T> => {
    if (!timerId) {
      timerId = setTimeout(() => {
        func()
        timerId = null
      }, delay)
    }
    return undefined as ReturnType<T>
  }) as unknown as T
}
