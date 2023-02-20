import { ChatLottery } from '../ChatLottery/ChatLottery'
import { ChatChangeLang } from '../ChatChangeLang/ChatChangeLang'

export const ChatTools = () => {
  return (
    <div className='flex z-20 relative mb-3'>
      <ChatLottery />
      <ChatChangeLang />
    </div>
  )
}
