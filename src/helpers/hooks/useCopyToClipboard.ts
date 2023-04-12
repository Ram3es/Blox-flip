import { useState, useCallback } from 'react'
import { debounce } from './useDebounceCallback'

type CopiedValue = string | undefined
type CopyFn = () => Promise<boolean>
type VoidCopyFn = () => void

const useCopyToClipboard = (initialText: string) => {
  const [text, setText] = useState(initialText)
  const [copiedText, setCopiedText] = useState<CopiedValue>(initialText)

  const copy: CopyFn = useCallback(
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

  const handleCopyText: VoidCopyFn = () => {
    copy().catch((error) => {
      console.error('Error occurred during copy:', error)
    })
  }

  return {
    text: copiedText,
    setText,
    handleCopyText
  }
}

export default useCopyToClipboard
