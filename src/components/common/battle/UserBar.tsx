import { useSocketCtx } from '../../../store/SocketStore'

import clsx from 'clsx'

import { Button } from '../../base/Button'
import { UserLevel } from '../../user/UserLevel'
import Image from '../../base/Image'
import DaggersIcons from '../../icons/DaggersIcons'
import CoinsWithDiamond from '../CoinsWithDiamond'

import { IRootBattle } from '../../../types/CaseBattles'
import { getToast } from '../../../helpers/toast'

interface UserBarProps {
  game: IRootBattle
  playerIndex: number
  sumWonItems?: number
}

const UserBar = ({ game, playerIndex, sumWonItems }: UserBarProps) => {
  const { socket } = useSocketCtx()

  const handleJoinGame = (place: number) => {
    socket.emit(
      'join_battle',
      {
        id: game.id,
        place
      },
      (err: boolean | string) => {
        if (typeof err === 'string') {
          getToast(err)
        }

        if (!err) {
          getToast('joined successful')
        }
      }
    )
  }

  const handleCallBot = (place: number) => {
    socket.emit(
      'bot_battle',
      {
        id: game.id,
        place
      },
      (err: boolean | string) => {
        if (typeof err === 'string') {
          getToast(err)
        }
        if (!err) {
          getToast('bot called successful')
        }
      }
    )
  }

  const isLoseGame = game.state === 'done' && game.winners[0].place !== game.players[playerIndex].place

  return (
    <div
      className={`${game.players[playerIndex] ? 'justify-between' : 'justify-center'} flex ${
        game.max !== 2 ? 'flex-col w-fit px-2' : 'flex-row w-full px-4'
      } flex-wrap items-center z-10 py-1 rounded-t bg-blue-accent-secondary w-full h-[80px]`}
    >
      {game.players[playerIndex] && (
        <>
          <div className="w-fit flex items-center justify-between">
            <div className="w-9 h-8 shrink-0 border border-blue-highlight rounded my-1 overflow-hidden radial--blue mr-2.5">
              <Image image={game.players[playerIndex].avatar} />
            </div>
            <span
              className={clsx('font-bold mr-2 text-white truncate', {
                'max-w-[175px]': game.max === 2,
                'max-w-[110px] md:max-w-[175px]': game.max === 3,
                'max-w-[110px] lg:max-w-[175px]': game.max === 4
              })}
            >
              {game.players[playerIndex].name}
            </span>
            <div className="flex mx-1">
              <UserLevel level={game.players[playerIndex].level} />
            </div>
          </div>
          <CoinsWithDiamond
            containerColor={`${isLoseGame ? 'RedPrimary' : 'GreenDarken'}`}
            containerSize="Small"
            iconContainerColor={`${isLoseGame ? 'RedPrimary' : 'GreenPrimary'}`}
            iconContainerSize="Small"
            iconClasses="w-[13px]"
            typographyQuantity={sumWonItems ?? 0}
          />
        </>
      )}
      {!game.players[playerIndex] && (
        <Button
          onClick={() => handleCallBot(playerIndex + 1)}
          className="rounded px-5 my-1 py-1 leading-6 flex items-center justify-center bg-green-primary hover:bg-green-500 whitespace-nowrap"
        >
          <DaggersIcons />
          <span className="ml-2">Join</span>
        </Button>
      )}
    </div>
  )
}

export default UserBar
