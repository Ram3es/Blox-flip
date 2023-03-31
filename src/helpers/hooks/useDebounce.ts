import { useState } from 'react'

export const useDebounce = (dealy = 500) => {
  const [typeTimemout, setTypeTimeout] = useState<ReturnType<typeof setTimeout>>()

  const debounce = (args: Function) => {
    typeTimemout && clearTimeout(typeTimemout)

    const timeout = setTimeout(() => args(), dealy)

    setTypeTimeout(timeout)
  }

  return debounce
}
