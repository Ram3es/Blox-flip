import { UserAvatar } from '../../components/user/UserAvatar'

import KingIcon from '../../assets/img/king_icon.png'

import { ISecondUser } from '../../types/User'
import { UserLevel } from '../../components/user/UserLevel'
import KingHealthBar from '../../components/common/KingHealthBar'
import { PlusIcon } from '../../components/icons/PlusIcon'
import { Button } from '../../components/base/Button'
import clsx from 'clsx'

interface KingGameProps {
  user?: ISecondUser
  isKing?: boolean
}

const KingGamePlayer = ({ user, isKing }: KingGameProps) => {
  const avatarClasses = clsx('ls:top-[-55px] flex items-center justify-center p-4 rounded-lg', {
    'ls:absolute gradient-background--yellow gradient-border--yellow': isKing,
    'ls:absolute left-[320px] gradient-background--blue': !isKing
  })
  const playerInfoClasses = clsx('', {
    'ls:pl-36 ls:pt-2 space-y-1': isKing,
    'flex flex-col ls:items-end ls:pr-36 ls:pt-2 ls:space-y-1': !isKing
  })
  const headingClasses = clsx('font-semibold text-xl', {
    'gradient-king-yellow-text': isKing,
    'text-gray-primary': !isKing
  })
  const healthBarClasses = clsx('ls:pt-8 ', {
    'ls:pl-8': isKing,
    'ls:pr-8': !isKing
  })

  return (
    <div className='relative xs:min-w-[444px] ls:block flex xs:flex-row flex-col items-center ls:gap-0 gap-5'>
      <div className={avatarClasses}>
        <UserAvatar className='w-20 h-[74px]' />
        {isKing && <img src={KingIcon} className='left-0 xs:left-[-28px] absolute top-[-45px]' />}
      </div>
      <div className={playerInfoClasses}>
        <div className='flex flex-row gap-3 pb-1 ls:pb-0'>
          {!isKing && (
            <Button variant='Standard' color='GreenPrimary'>
              <span className='w-8 h-8 flex items-center justify-center'>
                <PlusIcon />
              </span>
            </Button>
          )}
          <p className={headingClasses}>{isKing ? 'Current King' : 'Opponent'}</p>
        </div>
        <div className='flex items-center'>
          <span className='font-bold text-base'>Artheus</span>
          <div className='pl-2'>
            <UserLevel level={33} />
          </div>
        </div>
      </div>
      <div className={healthBarClasses}>
        <KingHealthBar position={isKing ? 'left' : 'right'} value={3450} max={5450} />
      </div>
    </div>
  )
}

export default KingGamePlayer
