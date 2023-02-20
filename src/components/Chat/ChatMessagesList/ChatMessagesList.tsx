import { ChatMessage } from '../ChatMessage/ChatMessage'

import { user } from '../../../mocks'

export const ChatMessageList = () => {
  return (
    <div className='grow relative'>
      <div className='absolute inset-0 bottom-14 overflow-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full pr-3 -mr-2 chat--gradient'>
        <ChatMessage message='test' {...user} />
        <ChatMessage message='test' {...user} />
        <ChatMessage message='test' {...user} />
        <ChatMessage message='test' {...user} />
        <ChatMessage message='test' {...user} />
        <ChatMessage message='test' {...user} />
        <ChatMessage message='test' {...user} />
        <ChatMessage message='test' {...user} />
      </div>
    </div>
  )
}
