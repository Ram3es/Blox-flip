import { useState } from 'react'

export const useDebounce = (delay = 500) => {
  const [typeTimemout, setTypeTimeout] = useState<ReturnType<typeof setTimeout>>()

  const debounce = (args: Function) => {
    typeTimemout && clearTimeout(typeTimemout)

    const timeout = setTimeout(() => args(), delay)

    setTypeTimeout(timeout)
  }

  return debounce
}
