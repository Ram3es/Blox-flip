import { FC, PropsWithChildren } from 'react'

import { UserAvatar } from '../../user/UserAvatar'
import { UserLevel } from '../../user/UserLevel'

import type { IUser } from '../../../types/User'

interface ActionModalHeaderProps {
  user: IUser
}

const ActionModalHeader: FC<PropsWithChildren<ActionModalHeaderProps>> = ({ user, children }) => {
  return (
    <div className='flex items-center gap-6 border-b-[1px] border-blue-accent-primary pb-4'>
      <div className='flex items-center gap-2'>{children}</div>
      <div className='flex items-center justify-between gap-2'>
        <div className='w-10 h-10 border border-blue-highlight rounded overflow-hidden radial--blue'>
          <UserAvatar />
        </div>
        <span className='font-bold text-white'>{user.name}</span>
        <UserLevel level={user.level} />
      </div>
    </div>
  )
}

export default ActionModalHeader