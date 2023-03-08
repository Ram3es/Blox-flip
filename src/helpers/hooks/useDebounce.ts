import { useState } from 'react'

export const useDebounce = (dealy = 500) => {
  const [typeTimemout, setTypeTimeout] = useState<NodeJS.Timeout | null>(null)

  const debounce = (args: Function) => {
    clearTimeout(typeTimemout as NodeJS.Timeout)

    const timeout = setTimeout(() => args(), dealy)

    setTypeTimeout(timeout)
  }

  return debounce
}
