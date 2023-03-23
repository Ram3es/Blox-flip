import { FC } from 'react'
import { RouteItem } from '../../types/Routes'

import { IUser } from '../../types/User'
import ChatUserCard from './ChatUserCard'

export const ChatHeader: FC<Pick<IUser, 'name' | 'avatar' | 'level'>> = ({
  name,
  avatar,
  level
}) => {
  const routes: RouteItem[] = [
    { path: '/profile', name: 'profile' },
    { path: '/affiliates', name: 'affiliates' },
    { path: '/leaderboard', name: 'leaderboard' },
    { path: '/trivia', name: 'trivia' },
    { path: '/megadrop', name: 'megadrop' }
  ]

  return (
    <div className='px-3 pt-2 cursor-pointer border border-blue-highlight rounded-lg radial--blue mb-8 relative z-30'>
      <ChatUserCard
        routes={routes}
        level={level}
        name={name}
        avatar={avatar}
        variant='Header'
      />
    </div>
  )
}
