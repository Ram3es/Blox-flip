import clsx from 'clsx'
import React from 'react'
import { IBattleUser } from '../../../mocks/battle'
import { Button } from '../../base/Button'
import DaggersIcons from '../../icons/DaggersIcons'
import DiamondIcon from '../../icons/DiamondIcon'
import { UserAvatar } from '../../user/UserAvatar'
import { UserLevel } from '../../user/UserLevel'
import { QuantityCoinsWithChildren } from '../QuantityCoins/QuantityWithChildren'

const UserBar = ({ user, onJoinGame, amountPlayers, winUserId }: { user: IBattleUser, onJoinGame: Function, amountPlayers: number, winUserId?: string }) => {
  const isLostGame = user && winUserId && user.id !== winUserId
  return (
    <div className={`${user ? 'justify-between' : 'justify-center'} flex ${amountPlayers !== 2 ? 'flex-col w-fit px-2' : 'flex-row w-full px-4'} flex-wrap items-center  z-10  py-1 rounded-t bg-blue-accent-secondary w-full`}>
    {user
      ? <>
        <div className='w-fit flex items-center justify-between '>
        <div className='w-9 h-8 shrink-0 border border-blue-highlight rounded my-1 overflow-hidden radial--blue mr-2.5'>
          <UserAvatar image={user.avatar} />
        </div>
        <span className={clsx('font-bold mr-2 text-white  truncate', {
          'max-w-[175px]': amountPlayers === 2,
          'max-w-[110px] md:max-w-[175px]': amountPlayers === 3,
          'max-w-[110px]  lg:max-w-[175px]': amountPlayers === 4
        })}>{user.name}</span>
        <div className='flex  mx-1'>
          <UserLevel level={user.level} />
        </div>
        </div>
        <div className={`${isLostGame ? 'bg-red-accent/15' : 'bg-green-primary/15'} flex items-center p-1.5 pr-4 rounded `}>
          <QuantityCoinsWithChildren
             quantityClasses='flex items-center text-sm font-bold '
             quantity={user?.wonDiamonds ?? 0} >
              <span className={`${isLostGame ? 'bg-red-accent/25' : 'bg-green-primary/20'} w-5 h-5 shrink-0 text-center leading-6 rounded relative mr-2 text-green-primary`}>
                <DiamondIcon className={`${isLostGame ? 'text-red-500' : ''} -inset-full absolute m-auto`} width='15' height='12' />
              </span>
             </QuantityCoinsWithChildren>
        </div>
      </>
      : <Button
        onClick={() => onJoinGame() }
        className=' rounded px-5 my-1 py-1 leading-6 flex items-center justify-center bg-green-primary hover:bg-green-500 whitespace-nowrap'
      >
        <DaggersIcons/>
        <span className='ml-2'>Join</span>
   </Button>
   }
   </div>
  )
}

export default UserBar
