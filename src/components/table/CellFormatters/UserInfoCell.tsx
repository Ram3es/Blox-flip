import { FC } from 'react'
import { TBaseUser } from '../../../types/User'
import Image from '../../base/Image'
import { UserLevel } from '../../user/UserLevel'

interface UserInfoCellProps {
  user: Omit<TBaseUser, 'id'>
  level?: boolean
}

export const UserInfoCell: FC<UserInfoCellProps> = ({ user, level = true }) => {
  return (
    <div className="flex justify-between items-center w-60">
      <div className="flex">
        <div className="w-8 h-8 shrink-0 border border-blue-highlight rounded-full overflow-hidden radial--gray mr-2.5">
          <Image image={user.avatar} />
        </div>
        <span className="font-bold grow relative py-1 mr-2 text-white">{user.name}</span>
      </div>
      {level && (
        <div className="flex">
          <UserLevel level={user.level} />
        </div>
      )}
    </div>
  )
}
