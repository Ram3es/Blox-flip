import { FC } from 'react'
import { ISecondUser } from '../../types/User'
import { UserAvatar } from '../UserAvatar/UserAvatar'
import { UserLevel } from '../UserLevel/UserLevel'

interface UserInfoCellProps {
  user: ISecondUser
}

export const UserInfoCell: FC<UserInfoCellProps> = ({ user }) => {
  return (
    <>
      <div className='flex items-center justify-between text-left'>
        <div className='w-8 h-8 shrink-0 border border-blue-highlight rounded-full overflow-hidden radial--gray mr-2.5'>
          <UserAvatar image={user.avatar} />
        </div>
        <div className='flex grow items-center'>
          <span className='font-bold grow relative py-1 mr-2 text-white'>{user.username}</span>
          <UserLevel level={user.level} />
        </div>
      </div>
    </>
  )
}
