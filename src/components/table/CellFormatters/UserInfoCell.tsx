import { FC } from 'react'
import { ISecondUser } from '../../../types/User'
import { UserAvatar } from '../../user/UserAvatar'
import { UserLevel } from '../../user/UserLevel'

interface UserInfoCellProps {
  user: ISecondUser
}

export const UserInfoCell: FC<UserInfoCellProps> = ({ user }) => {
  return (
    <div className='flex justify-between items-center w-60'>
      <div className='flex'>
        <div className='w-8 h-8 shrink-0 border border-blue-highlight rounded-full overflow-hidden radial--gray mr-2.5'>
          <UserAvatar image={user.avatar} />
        </div>
        <span className='font-bold grow relative py-1 mr-2 text-white'>{user.username}</span>
      </div>
      <div className='flex'>
        <UserLevel level={user.level} />
      </div>
    </div>
  )
}
