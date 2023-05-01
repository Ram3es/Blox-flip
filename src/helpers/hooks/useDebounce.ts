import { useState } from 'react'

export const useDebounce = (delay = 500) => {
  const [typeTimeout, setTypeTimeout] = useState<ReturnType<typeof setTimeout>>()

  const debounce = (args: Function) => {
    typeTimeout && clearTimeout(typeTimeout)

    const timeout = setTimeout(() => args(), delay)

    setTypeTimeout(timeout)
  }

  return debounce
}
