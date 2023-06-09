import { useCallback, useState } from 'react'

import clsx from 'clsx'

import KingJoinModal from './KingJoinModal'
import Image from '../../components/base/Image'
import { UserLevel } from '../../components/user/UserLevel'

import QuestionIcon from '../../components/icons/QuestionIcon'
import { PlusIcon } from '../../components/icons/PlusIcon'
import { Button } from '../../components/base/Button'

import KingIcon from '../../assets/img/king_icon.png'

import type { IKingPlayer } from '../../types/King'

interface KingArenaPlayerProps {
  player: IKingPlayer | null
  left?: boolean
}

const KingArenaPlayer = ({ player, left }: KingArenaPlayerProps) => {
  const [isOpenJoinGame, setIsOpenJoinGame] = useState(false)

  const handleOpenModal = useCallback(() => {
    setIsOpenJoinGame(!isOpenJoinGame)
  }, [isOpenJoinGame])

  const avatarClasses = clsx('ls:top-[-55px] flex items-center justify-center p-4 rounded-lg', {
    'ls:absolute gradient-background--yellow gradient-border--yellow': left,
    'ls:absolute right-0 gradient-background--blue': !left
  })
  const playerInfoClasses = clsx('', {
    'ls:pl-36 ls:pt-2 space-y-1': left,
    'flex flex-col ls:items-end ls:pr-36 ls:pt-2 ls:space-y-1': !left
  })
  const headingClasses = clsx('font-semibold text-xl', {
    'gradient-king-yellow-text': left && player,
    'text-gray-primary': !left || !player
  })

  return (
    <div className='relative ls:block flex xs:flex-row flex-col items-center ls:gap-0 gap-5'>
      <div className={avatarClasses}>
        {player && <Image className='w-20 h-[74px] rounded' image={player.avatar} />}
        {!player && (
          <span className='w-20 h-[74px] rounded flex items-center justify-center text-blue-gray-third'>
            <QuestionIcon className='w-[19px] h-[38px]' />
          </span>
        )}
        {left && player && (
          <img src={KingIcon} className='left-0 xs:left-[-28px] absolute top-[-45px]' />
        )}
      </div>
      <div className={playerInfoClasses}>
        <div
          className={clsx('flex gap-3 pb-1 ls:pb-0', {
            'flex-row': !left,
            'flex-row-reverse': left
          })}
        >
          <div
            className={clsx('', {
              'opacity-0': left && player
            })}
          >
            <Button onClick={handleOpenModal} color='GreenPrimary'>
              <span className='px-2.5 h-8 flex items-center justify-center'>
                {player && !left ? <PlusIcon /> : 'Join game'}
              </span>
            </Button>
          </div>
          <p className={headingClasses}>{left && player ? 'Current King' : 'Challenger'}</p>
        </div>
        <div className='flex items-center'>
          <span className='font-bold text-base'>{player ? player.name : 'Not joined...'}</span>
          {player && (
            <div className='pl-2'>
              <UserLevel level={player.level} />
            </div>
          )}
        </div>
      </div>
      {isOpenJoinGame && (
        <KingJoinModal handleFunction={handleOpenModal} onClose={handleOpenModal} />
      )}
    </div>
  )
}

export default KingArenaPlayer
