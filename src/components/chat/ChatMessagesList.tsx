import { ChatMessage } from './ChatMessage'
import { chatmessagesMOCK } from '../../mocks/chat'
import { useMemo } from 'react'
import { useChat } from '../../store/ChatStore'

export const ChatMessageList = () => {
  const { historyChat } = useChat()
  const renderMsg = useMemo(() => historyChat.length ? historyChat : chatmessagesMOCK, [historyChat])

  return (
    <div className='grow relative chat--gradient'>
      <div className='absolute inset-0 bottom-14 overflow-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full pr-3 -mr-2'>
        {renderMsg.map(msg => (
           <ChatMessage
             key={msg.hash}
             message={msg.message}
             hash={msg.hash}
             {...msg.user} />
        ))}
      </div>
    </div>
  )
}
