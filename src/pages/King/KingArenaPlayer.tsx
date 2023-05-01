import clsx from 'clsx'

import Image from '../../components/base/Image'
import { UserLevel } from '../../components/user/UserLevel'
import KingJoin from './KingJoin'

import QuestionMark from '../../assets/img/question_mark.svg'

import KingIcon from '../../assets/img/king_icon.png'

import type { IKingGamePlayer } from '../../types/King'

interface KingArenaPlayerProps {
  user?: IKingGamePlayer
  isKing: boolean
}

const KingArenaPlayer = ({ user, isKing }: KingArenaPlayerProps) => {
  const avatarClasses = clsx('ls:top-[-55px] flex items-center justify-center p-4 rounded-lg', {
    'ls:absolute gradient-background--yellow gradient-border--yellow': isKing,
    'ls:absolute right-0 gradient-background--blue': !isKing
  })
  const playerInfoClasses = clsx('', {
    'ls:pl-36 ls:pt-2 space-y-1': isKing,
    'flex flex-col ls:items-end ls:pr-36 ls:pt-2 ls:space-y-1': !isKing
  })
  const headingClasses = clsx('font-semibold text-xl', {
    'gradient-king-yellow-text': isKing,
    'text-gray-primary': !isKing
  })

  return (
    <div className='relative ls:block flex xs:flex-row flex-col items-center ls:gap-0 gap-5'>
      <div className={avatarClasses}>
        <Image className='w-20 h-[74px]' image={user ? '' : QuestionMark} />
        {isKing && <img src={KingIcon} className='left-0 xs:left-[-28px] absolute top-[-45px]' />}
      </div>
      <div className={playerInfoClasses}>
        <div className='flex flex-row gap-3 pb-1 ls:pb-0'>
          {!isKing && <KingJoin />}
          <p className={headingClasses}>{isKing ? 'Current King' : 'Opponent'}</p>
        </div>
        <div className='flex items-center'>
          <span className='font-bold text-base'>{user ? 'Artheus' : 'Not joined...'}</span>
          {user && (
            <div className='pl-2'>
              <UserLevel level={33} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default KingArenaPlayer
