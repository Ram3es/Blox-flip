import { UserAvatar } from '../user/UserAvatar'

interface AvatarWithUsernameProps {
  avatar: string
  username: string
}

const AvatarWithUsername = ({ avatar, username }: AvatarWithUsernameProps) => {
  return (
    <div className='flex items-center space-x-2'>
      <UserAvatar
        className='w-11 h-10 border border-blue-highlight rounded radial--blue'
        image={avatar}
      />
      <span className='font-bold text-sm hidden md:block'>{username ?? '...'}</span>
    </div>
  )
}

export default AvatarWithUsername
