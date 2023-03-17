import { FC } from 'react'
import { IUser } from '../../../types/User'
import { UserAvatar } from '../../User/UserAvatar'
import { UserLevel } from '../../User/UserLevel'

export const UserCard: FC<Pick<IUser, 'name' | 'avatar' | 'level'>> = ({
  name = 'User',
  avatar,
  level = 0
}) => {
  return (
    <>
      <div className='w-10 h-10 border border-blue-highlight rounded overflow-hidden radial--blue mr-2.5'>
        <UserAvatar />
      </div>
      <div className='flex grow'>
        <span className='font-bold mr-2 text-white'>{name}</span>
        <UserLevel level={level} />
      </div>
    </>
  )
}
