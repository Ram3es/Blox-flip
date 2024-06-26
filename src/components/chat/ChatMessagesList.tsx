import { useEffect, useRef } from 'react'
import { useChat } from '../../store/ChatStore'
import { ChatMessage } from './ChatMessage'

export const ChatMessageList = () => {
  const { historyChat } = useChat()
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = listRef.current

    if (node) {
      node.scrollTop = node.scrollHeight
    }
  }, [historyChat])

  return (
    <div className="grow relative chat--gradient">
      <div
        ref={listRef}
        className="absolute flex flex-col first-of-type:flex-auto h-full inset-0 bottom-14 overflow-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full pr-3 -mr-2"
      >
        {historyChat.map((msg, i, arr) => (
          <ChatMessage
            isLastOnes={i === arr.length - 1 || i === arr.length - 2}
            key={msg.hash}
            message={msg.message}
            hash={msg.hash}
            {...msg.user}
          />
        ))}
      </div>
    </div>
  )
}
