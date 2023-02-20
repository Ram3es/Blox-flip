import { FC } from 'react'
import { IUser } from '../../../types/User'
import { UserCard } from '../../UserCard/UserCard'
import { UserInfoDropdown } from '../UserInfoDropdown/UserInfoDropdown'

interface UserMessageProps extends IUser {
  message: string
}

export const ChatMessage: FC<UserMessageProps> = ({ message, ...user }) => {
  return (
    <div className='relative hover:z-50'>
      <div className='flex items-center justify-between mb-2 relative'>
        <UserCard {...user} />
        <UserInfoDropdown />
      </div>
      <div className='text-xs text-gray-secondary bg-blue-secondary/30 border border-blue-highlight rounded p-2 mb-4 break-words'>
        {message.repeat(50)}
      </div>
    </div>
  )
}
