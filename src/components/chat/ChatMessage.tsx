import { FC } from 'react'
import { RouteItem } from '../../types/Routes'
import { IUser } from '../../types/User'
import ChatUserCard from './ChatUserCard'

interface UserMessageProps extends IUser {
  message: string
}

export const ChatMessage: FC<UserMessageProps> = ({ message, ...user }) => {
  const routes: RouteItem[] = [
    { path: '/profile', name: 'profile' },
    { path: '/message', name: 'message' }
  ]

  return (
    <div className='relative'>
      <ChatUserCard routes={routes} {...user} />
      <div className='text-xs text-gray-secondary bg-blue-secondary/30 border border-blue-highlight rounded p-2 mb-4 break-words'>
        {message.repeat(50)}
      </div>
    </div>
  )
}
