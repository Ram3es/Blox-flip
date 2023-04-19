import { FC } from 'react'

import ChatUserCard from './ChatUserCard'

import type { IUser } from '../../types/User'

interface UserMessageProps extends IUser {
  message: string
}

export const ChatMessage: FC<UserMessageProps> = ({ message, ...user }) => {
  return (
    <div className='relative'>
      <ChatUserCard user={user} />
      <div className='text-xs text-gray-secondary bg-blue-secondary/30 border border-blue-highlight rounded p-2 mb-4 break-words'>
        {message.repeat(50)}
      </div>
    </div>
  )
}
