import { FC, ReactNode, useEffect, useState } from 'react'
import clsx from 'clsx'

import Loader from '../../base/Loader'
import BattleDaggers from '../../icons/BattleDaggers'
import DaggersGreenGradient from '../../icons/DaggersGreenGradient'
import FriendlyBlue from '../../icons/FriendlyBlue'
import FriendlyGreen from '../../icons/FriendlyGreen'
import FriendlyOrange from '../../icons/FriendlyOrange'
import { IMAGES } from '../../../constants/images'
import { IBattleUser, IModeGame } from '../../../mocks/battle'
import { IItemCard } from '../../../types/ItemCard'
import BackdropEffects from './BackdropEffects'
import PlayerStatusGame from './PlayerStatusGame'
import UserBar from './UserBar'
import RoundWinBorderBottomEffect from './RoundWinBorderBottomEffect'
import SpinItems from './SpinItems'
import UsersDrops from './UsersDrops'
import { useSocketCtx } from '../../../store/SocketStore'
import { getToast } from '../../../helpers/toast'
import { IRootBattleCaseItem, IRootBattlePlayer, IRootBattleStateEnum } from '../../../types/CaseBattles'

export interface IWiningPlayerCard {
  id: string
  card: IItemCard
}

const case2v2Icons: Record<number, ReactNode> = {
  0: <FriendlyBlue />,
  1: <BattleDaggers />,
  2: <FriendlyOrange />
}

const initTeamState = { orange: { score: 0, teamPlayers: [] }, blue: { score: 0, teamPlayers: [] } }

const getIcons = (type: string, index: number) => {
  switch (type) {
    case '2v2':
      return case2v2Icons[index]
    case 'group':
      return <FriendlyGreen />
    default:
      return <BattleDaggers />
  }
}

interface IBattleModeProps {
  status: string
  players: IRootBattlePlayer[]
  mode: IModeGame
  gameId: number
  // onJoinUser: Function
  casesBox?: IRootBattleCaseItem[]
  updateRewards: Function
  updateRound: Function
  setFinishGame: Function
  isFinishedGame: boolean
}

const BattleMode: FC<IBattleModeProps> = ({
  status,
  mode,
  players,
  // onJoinUser,
  gameId,
  casesBox,
  updateRewards,
  updateRound,
  setFinishGame,
  isFinishedGame
}) => {
  const { socket } = useSocketCtx()
  const [winningCard, setWinningCard] = useState<Record<string, IItemCard>>({})
  const [currentRoundWinners, setCurrentRoundWinners] = useState<Array<[number, IItemCard]>>([])
  const [teamResult, setTeamResult] = useState<Record<string, { score: number, teamPlayers: Array<[number, IItemCard]> }>>(initTeamState)
  const [gameWinnerPlayer, setGameWinnerPlayer] = useState<IBattleUser[]>([])
  const [allWinningCards, setAllWinningCards] = useState<Record<string, IItemCard>>({})
  const [isSpinEnd, setIsSpinEnd] = useState(false)

  const playersInGame = Array.from(Array(mode.requiredPlayers))

  const handleJoinUser = (place: number) => {
    socket.emit('join_battle', {
      id: gameId,
      place
    }, (err: boolean | string) => {
      if (typeof err === 'string') {
        getToast(err)
      }

      if (!err) {
        getToast('joined successful')
      }
    })
  }

  const handleCallBot = (place: number) => {
    socket.emit('bot_battle', {
      id: gameId,
      place
    }, (err: boolean | string) => {
      if (typeof err === 'string') {
        getToast(err)
      }

      if (!err) {
        getToast('joined successful')
      }
    })
  }

  const addWinningCard = (playerId: number, card: IItemCard) => {
    setWinningCard((state) => ({ ...state, [playerId]: card }))
  }

  const isWinners = (playerId: number): boolean => {
    if (currentRoundWinners?.length) {
      return currentRoundWinners.map((items) => items[0])?.includes(playerId)
    }
    if (gameWinnerPlayer?.length) {
      return gameWinnerPlayer.map((player) => player.id)?.includes(playerId)
    }
    return false
  }

  useEffect(() => {
    const userWinningCards = Object.entries(winningCard)

    if (userWinningCards.length === players.length) {
      if (mode.variant !== '2v2') {
        const wonCard = userWinningCards.reduce((acc, card) => {
          if (card[1].price > acc[1].price) {
            acc = card
          }
          return acc
        })
        const winnersPlayer = userWinningCards.filter(item => item[1].price === wonCard[1].price)

        setCurrentRoundWinners(winnersPlayer)
      }
      if (mode.variant === '2v2') {
        const formattedByTeam = players.reduce<Record<string, { score: number, teamPlayers: Array<[string, IItemCard]> }>>((acc, player) => {
          if (!acc[player.place]) {
            acc[player.place] = {
              score: 0,
              teamPlayers: []
            }
          }
          acc[player.place].score += winningCard[player.id].price
          acc[player.place].teamPlayers.push([player.id, winningCard[player.id]])

          return acc
        }, {})

        Object.keys(formattedByTeam).forEach(key => setTeamResult(prev => (
          {
            ...prev,
            [key]: {
              ...prev[key],
              teamPlayers: formattedByTeam[key].teamPlayers,
              score: prev[key].score + formattedByTeam[key].score
            }
          })))

        let bestScore = 0
        let dreamTeam: Array<[string, IItemCard]> = []
        for (const key in formattedByTeam) {
          if (formattedByTeam[key].score === bestScore) {
            dreamTeam = [...dreamTeam, ...formattedByTeam[key].teamPlayers]
          }

          if (formattedByTeam[key].score > bestScore) {
            bestScore = formattedByTeam[key].score
            dreamTeam = formattedByTeam[key].teamPlayers
          }
        }
        setCurrentRoundWinners(dreamTeam)
      }

      setAllWinningCards(winningCard)
      setIsSpinEnd(true)
      setTimeout(() => {
        setCurrentRoundWinners([])
        setAllWinningCards({})
        setWinningCard({})
        setIsSpinEnd(false)
      }, 2800)
    }
  }, [winningCard])

  const getTeamWinnersId = (): string[] => {
    let score = 0
    let teamWinners: string[] = []
    for (const key in teamResult) {
      if (teamResult[key].score > score) {
        score = teamResult[key].score
        teamWinners = teamResult[key].teamPlayers.map(item => item[0])
      }
    }
    return teamWinners
  }

  useEffect(() => {
    if (isFinishedGame) {
      if (mode.variant === '2v2') {
        setGameWinnerPlayer(players.filter(player => getTeamWinnersId().includes(player.id)))
      }

      if (mode.variant !== '2v2') {
        const { wonDiamonds } = players.reduce((acc, player) => {
          if (acc.wonDiamonds < player.wonDiamonds) {
            acc = player
          }
          return acc
        })
        const winnersGame = players.filter(player => player.wonDiamonds === wonDiamonds)

        setGameWinnerPlayer(winnersGame)
      }
    }
  }, [isFinishedGame])

  useEffect(() => {
    if (status === IRootBattleStateEnum.done && isFinishedGame) {
      setFinishGame()
    }
  }, [status, isFinishedGame])

  return (
    <div className='flex -mx-2'>
      {playersInGame.map((_, i) => (
        <div
          key={i}
          className={clsx('px-1 mb-9 relative', {
            'w-1/2': mode.requiredPlayers === 2,
            'w-1/3': mode.requiredPlayers === 3,
            'w-1/4': mode.requiredPlayers === 4
          })}
        >
          <UserBar
            user={players[i]}
            amountPlayers={mode.requiredPlayers}
            onJoinGame={() => handleJoinUser(i)}
            isPlayerGameWinners={isWinners(players[i]?.id)}
            isEndGame={isFinishedGame}
            wonDiamonds={24124124}
          />
          <div
            className={clsx('bg-blue-accent rounded-b flex items-center relative mb-9', {
              'bg-gradient-lvl from-green-primary/30':
                isWinners(players[i]?.id) ||
                gameWinnerPlayer?.find((player) => player?.id === players[i]?.id),
              'bg-gradient-lvl from-red-accent/30 to-dark/0':
                (!isWinners(players[i]?.id) && isSpinEnd) ||
                (!isWinners(players[i]?.id) && isFinishedGame)
            })}
          >
            {i !== playersInGame.length - 1 && (
              <div className='absolute left-full -ml-7 -mt-8 top-1/2 w-16 z-30 '>
                {getIcons(mode.variant, i)}
              </div>
            )}
            <div className='grow -translate-y-[2px] '>
              <img
                src={IMAGES.graySeparator}
                alt='divider'
                width='92'
                height='1'
                loading='lazy'
                decoding='async'
                className='w-full h-px'
              />
            </div>
            <div className='w-52 mx-auto relative shrink-0 max-w-full z-10'>
              <BackdropEffects
                statusGame={status}
                player={players[i]}
                winningCard={allWinningCards[players[i]?.id]?.image}
                isEndGame={isFinishedGame}
              />
              <RoundWinBorderBottomEffect
                isShown={currentRoundWinners?.length > 0 || gameWinnerPlayer.length > 0}
                isAddWinClass={isWinners(players[i]?.id)}
              />
            </div>
            {status === IRootBattleStateEnum.open && (
              <div className='z-20 absolute inset-0 flex flex-col justify-center items-center pt-1 pb-2'>
                {players[i]
                  ? <>
                     <DaggersGreenGradient />
                      <span className='text-base font-bold'>Ready</span>
                    </>
                  : <>
                      <Loader height='40px' width='40px' color='rgba(147, 155, 185)' />
                      <span className='text-base font-bold text-gray-primary'>Waiting</span>
                    </>}
              </div>
            )}
            {status !== IRootBattleStateEnum.open && !isFinishedGame && (
              <SpinItems
                status={status}
                playerId={players[i]?.id}
                updateRewards={updateRewards}
                updateRound={updateRound}
                addWinningCard={addWinningCard}
                setShowEnd={setFinishGame}
              />
            )}
            {status === IRootBattleStateEnum.done && isFinishedGame && (
              <PlayerStatusGame
                isPlayerGameWinner={isWinners(players[i]?.id)}
                wonDiamonds={players[i]?.wonDiamonds}
              />
            )}
            <div className='grow rotate-180 translate-y-[-2px]'>
              <img
                src={IMAGES.graySeparator}
                alt='divider'
                width='92'
                height='1'
                loading='lazy'
                decoding='async'
                className='w-full h-px'
              />
            </div>
          </div>
          <UsersDrops amountGamePlates={mode.requiredPlayers} cards={players[i]?.dropsCards} />
        </div>
      ))}
    </div>
  )
}

export default BattleMode
