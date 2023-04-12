import { useState, useCallback } from 'react'
import { debounce } from './useDebounceCallback'

const useCopyToClipboard = (initialText: string) => {
  const [text, setText] = useState(initialText)
  const [copiedText, setCopiedText] = useState<string | undefined>(initialText)

  const handleCopyText = useCallback(
    debounce(async () => {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
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
