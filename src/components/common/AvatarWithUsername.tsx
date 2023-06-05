import { forwardRef } from 'react'
import clsx from 'clsx'

import Image from '../base/Image'
import QuestionIcon from '../icons/QuestionIcon'

interface AvatarWithUsernameProps {
  avatar?: string
  username?: string
}

const AvatarWithUsername = forwardRef<HTMLDivElement, AvatarWithUsernameProps>(
  ({ avatar, username }, ref) => {
    return (
      <div ref={ref} className='flex items-center space-x-2'>
        <div className='w-11 h-10 border border-blue-highlight rounded radial--blue flex items-center justify-center'>
          {avatar && <Image className='w-full h-full rounded' image={avatar} />}
          {!avatar && (
            <span className='text-blue-highlight-third'>
              <QuestionIcon />
            </span>
          )}
        </div>

        <span
          className={clsx('w- font-bold text-sm hidden md:block w-20 truncate', {
            'text-blue-ocean-secondary': !username
          })}
        >
          {username ?? '...'}
        </span>
      </div>
    )
  }
)

AvatarWithUsername.displayName = 'AvatarWithUserName'

export default AvatarWithUsername
