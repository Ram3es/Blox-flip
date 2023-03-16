import { useState } from 'react'

export const useDebounce = (dealy = 500) => {
  const [typeTimemout, setTypeTimeout] = useState<number>()

  const debounce = (args: Function) => {
    clearTimeout(typeTimemout)

    const timeout = setTimeout(() => args(), dealy)

    setTypeTimeout(timeout)
  }

  return debounce
}
