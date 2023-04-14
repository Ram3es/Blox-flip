import { forwardRef } from 'react'
import { UserAvatar } from '../user/UserAvatar'

interface AvatarWithUsernameProps {
  avatar: string
  username: string
}

const AvatarWithUsername = forwardRef<HTMLDivElement, AvatarWithUsernameProps>(
  ({ avatar, username }, ref) => {
    return (
      <div ref={ref} className='flex items-center space-x-2'>
        <UserAvatar
          className='w-11 h-10 border border-blue-highlight rounded radial--blue'
          image={avatar}
        />
        <span className='font-bold text-sm hidden md:block'>{username ?? '...'}</span>
      </div>
    )
  }
)

AvatarWithUsername.displayName = 'AvatarWithUserName'

export default AvatarWithUsername
