import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { IUser } from '../../types/User'

import { UserAvatar } from '../UserAvatar/UserAvatar'
import { UserLevel } from '../UserLevel/UserLevel'
import { UserInfoDropdown } from './UserInfoDropdown'

export const ChatHeader: FC<Pick<IUser, 'name' | 'avatar' | 'level'>> = ({
  name,
  avatar,
  level
}) => {
  return (
    <div className='flex py-2 px-3 border border-blue-highlight rounded-lg radial--blue items-center justify-between mb-8 relative z-30'>
      <div className='w-10 h-10 border border-blue-highlight rounded overflow-hidden radial--blue'>
        <NavLink to='profile'>
          <UserAvatar />
        </NavLink>
      </div>
      <div className='flex'>
        <span className='font-bold mr-2 text-gray-primary'>{name ?? 'User'}</span>
        <UserLevel level={level} />
      </div>
      <UserInfoDropdown />
    </div>
  )
}
