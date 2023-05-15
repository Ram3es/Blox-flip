import clsx from 'clsx'
import { IBattleUser } from '../../../mocks/battle'
import { Button } from '../../base/Button'
import DaggersIcons from '../../icons/DaggersIcons'
import { UserLevel } from '../../user/UserLevel'
import Image from '../../base/Image'
import CoinsWithDiamond from '../CoinsWithDiamond'

const UserBar = ({
  user,
  onJoinGame,
  amountPlayers,
  isPlayerGameWinners,
  isEndGame
}: {
  user: IBattleUser
  onJoinGame: Function
  amountPlayers: number
  isPlayerGameWinners?: boolean
  isEndGame: boolean
}) => {
  const isLostGame = isEndGame && !isPlayerGameWinners
  return (
    <div
      className={`${user ? 'justify-between' : 'justify-center'} flex ${
        amountPlayers !== 2 ? 'flex-col w-fit px-2' : 'flex-row w-full px-4'
      } flex-wrap items-center z-10 py-1 rounded-t bg-blue-accent-secondary w-full h-[80px]`}
    >
      {user && (
        <>
          <div className='w-fit flex items-center justify-between'>
            <div className='w-9 h-8 shrink-0 border border-blue-highlight rounded my-1 overflow-hidden radial--blue mr-2.5'>
              <Image image={user.avatar} />
            </div>
            <span
              className={clsx('font-bold mr-2 text-white  truncate', {
                'max-w-[175px]': amountPlayers === 2,
                'max-w-[110px] md:max-w-[175px]': amountPlayers === 3,
                'max-w-[110px] lg:max-w-[175px]': amountPlayers === 4
              })}
            >
              {user.name}
            </span>
            <div className='flex  mx-1'>
              <UserLevel level={user.level} />
            </div>
          </div>
          <CoinsWithDiamond
            containerColor={`${isLostGame ? 'RedPrimary' : 'GreenDarken'}`}
            containerSize='Small'
            iconContainerColor={`${isLostGame ? 'RedPrimary' : 'GreenPrimary'}`}
            iconContainerSize='Small'
            iconClasses='w-[13px]'
            typographyQuantity={user?.wonDiamonds ?? 1421412}
          />
        </>
      )}
      {!user && (
        <Button
          onClick={() => onJoinGame()}
          className='rounded px-5 my-1 py-1 leading-6 flex items-center justify-center bg-green-primary hover:bg-green-500 whitespace-nowrap'
        >
          <DaggersIcons />
          <span className='ml-2'>Join</span>
        </Button>
      )}
    </div>
  )
}

export default UserBar
