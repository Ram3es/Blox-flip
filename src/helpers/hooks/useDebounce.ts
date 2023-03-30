import { useState } from 'react'

export const useDebounce = (dealy = 500) => {
  const [typeTimemout, setTypeTimeout] = useState<NodeJS.Timeout>()

  const debounce = (args: Function) => {
    typeTimemout && clearTimeout(typeTimemout)

    const timeout = setTimeout(() => args(), dealy)

    setTypeTimeout(timeout)
  }

  return debounce
}
