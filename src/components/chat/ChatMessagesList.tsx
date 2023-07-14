import { useChat } from '../../store/ChatStore'
import { ChatMessage } from './ChatMessage'

export const ChatMessageList = () => {
  const { historyChat } = useChat()
  return (
    <div className='grow relative chat--gradient'>
      <div className='absolute inset-0 bottom-14 overflow-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full pr-3 -mr-2'>
        {historyChat.map(msg => (
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
