import { useState, useCallback } from 'react'
import { debounce } from './useDebounceCallback'

type CopiedValue = string | undefined
type CopyFn = () => Promise<boolean>

const useCopyToClipboard = (initialText: string) => {
  const [text, setText] = useState(initialText)
  const [copiedText, setCopiedText] = useState<CopiedValue>(initialText)

  const handleCopyText: CopyFn = useCallback(
    debounce(async () => {
      if (!navigator?.clipboard) {
        return false
      }

      try {
        await navigator.clipboard.writeText(text)
        setCopiedText(text)
        return true
      } catch (error) {
        setCopiedText(undefined)
        return false
      }
    }, 400),
    [text]
  )

  return {
    text: copiedText,
    setText,
    handleCopyText
  }
}

export default useCopyToClipboard
