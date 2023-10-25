import { FC } from 'react'

import ChatUserCard from './ChatUserCard'

import type { IChatUser } from '../../types/User'

interface UserMessageProps extends IChatUser {
  message: string
  hash: string
  isLastOnes: boolean
}

export const ChatMessage: FC<UserMessageProps> = ({ message, hash, isLastOnes, ...user }) => {
  return (
    <div className="relative">
      <ChatUserCard user={user} hashMsg={hash} dropDownPosition={isLastOnes ? 'float' : 'fixed'} />
      <div className="text-xs text-gray-secondary bg-blue-secondary/30 border border-blue-highlight rounded p-2 mb-4 break-words">
        {message}
      </div>
    </div>
  )
}
