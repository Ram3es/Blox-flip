import { useCallback, useContext } from 'react'

import { useCoinFlip } from '../../../store/CoinFlipStore'
import { Context } from '../../../store/Store'

import clsx from 'clsx'

import { Button } from '../../base/Button'
import LabelWithTimer from '../../common/LabelWithTimer'

import DiamondIcon from '../../icons/DiamondIcon'
import PreviewIcon from '../../icons/PreviewIcon'

import YellowCoin from '../../../assets/img/CoinFlipHead.png'
import PurpleCoin from '../../../assets/img/CoinFlipTail.png'

import { ICoinFlip } from '../../../types/CoinFlip'
import { getToast } from '../../../helpers/toast'
import { useSocketCtx } from '../../../store/SocketStore'

const CFStatusCell = ({ game }: { game: ICoinFlip }) => {
  const { setIsOpenBattleGame, setCurrentGame, setIsOpenLoginModal } = useCoinFlip()
  const { state } = useContext(Context)
  const { socket } = useSocketCtx()

  const handleJoinGame = useCallback(() => {
    if (state.user) {
      socket.emit(
        'coinflip_join',
        {
          gameId: game.id
        },
        (error: boolean | string) => {
          if (typeof error === 'string') {
            getToast(error)
          }

          if (!error) {
            setIsOpenBattleGame(true)
          }
        }
      )
    } else {
      setIsOpenLoginModal(true)
    }
  }, [state.user])

  const handleWatchGame = useCallback(() => {
    setIsOpenBattleGame(true)
    setCurrentGame(game)
  }, [game])

  const getCurrentButtonByState = () => {
    if (game.state === 1) {
      return (
        <Button variant="GreenGradient" onClick={handleJoinGame}>
          <div className="flex items-center justify-center h-10 w-[5.5rem]">
            <span className="w-4 shrink-0 relative text-white">
              <DiamondIcon className="w-[16px] h-[12px]" />
            </span>
            <span className="pl-2">Join</span>
          </div>
        </Button>
      )
    }

    if (game.state === 2) {
      return (
        <LabelWithTimer userAvatar={game.joining?.avatar ?? ''} timer={game.timer ?? 0}>
          Joining in
        </LabelWithTimer>
      )
    }

    if (game.state === 4 && (game.winner?.coin === 0 || game.winner?.coin === 1)) {
      return (
        <Button
          disabled
          variant={game.winner?.coin === 0 ? 'YellowOutlinedSecondary' : 'BlueGolfOutlined'}
        >
          <div className="flex items-center justify-center w-28 h-10">
            <img
              className="h-6 w-6"
              src={game.winner?.coin === 0 ? YellowCoin : PurpleCoin}
              alt="head"
            />
            <span
              className={clsx('text-sm font-bold pl-2', {
                'text-orange-primary': game.winner?.coin === 0,
                'text-blue-golf': game.winner?.coin === 1
              })}
            >
              Winner
            </span>
          </div>
        </Button>
      )
    }

    if (game.state === 3) {
      return null
    }
  }

  return (
    <div className="flex items-center justify-end">
      {getCurrentButtonByState()}
      {game.state !== 3 && (
        <Button
          onClick={handleWatchGame}
          className="leading-10 ml-2 flex h-10 w-10 shrink-0 rounded bg-blue-accent-secondary hover:bg-blue-accent text-gray-primary"
        >
          <PreviewIcon iconClasses="mx-auto my-auto" />
        </Button>
      )}
    </div>
  )
}

export default CFStatusCell
