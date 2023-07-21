import { FC, ReactNode, useEffect, useState } from 'react'
import clsx from 'clsx'

import Loader from '../../base/Loader'
import BattleDaggers from '../../icons/BattleDaggers'
import DaggersGreenGradient from '../../icons/DaggersGreenGradient'
import FriendlyBlue from '../../icons/FriendlyBlue'
import FriendlyGreen from '../../icons/FriendlyGreen'
import FriendlyOrange from '../../icons/FriendlyOrange'
import { IMAGES } from '../../../constants/images'
import { IBattleUser } from '../../../mocks/battle'
import { IItemCard } from '../../../types/ItemCard'
import BackdropEffects from './BackdropEffects'
import PlayerStatusGame from './PlayerStatusGame'
import UserBar from './UserBar'
import RoundWinBorderBottomEffect from './RoundWinBorderBottomEffect'
import SpinItems from './SpinItems'
import UsersDrops from './UsersDrops'
import { useSocketCtx } from '../../../store/SocketStore'
import { getToast } from '../../../helpers/toast'
import {
  DisplayedBattleModeEnum,
  IRootBattle,
  IRootBattleResult,
  IRootBattleRoundItem,
  RootBattleStateEnum
} from '../../../types/CaseBattles'
import { getDisplayedModeByGame } from '../../../helpers/caseBattleHelpers'
import { sortData } from '../../../helpers/sortData'

export interface IWiningPlayerCard {
  id: string
  card: IItemCard
}

const case2v2Icons: Record<number, ReactNode> = {
  0: <FriendlyBlue />,
  1: <BattleDaggers />,
  2: <FriendlyOrange />
}

// const initTeamState = { orange: { score: 0, teamPlayers: [] }, blue: { score: 0, teamPlayers: [] } }

const getIcons = (type: DisplayedBattleModeEnum, index: number) => {
  switch (type) {
    case DisplayedBattleModeEnum['2v2']:
      return case2v2Icons[index]
    case DisplayedBattleModeEnum.group:
      return <FriendlyGreen />
    default:
      return <BattleDaggers />
  }
}

interface IBattleModeProps {
  game: IRootBattle
  currentRound: IRootBattleResult | null
  historyRounds: IRootBattleResult[]
}

const BattleMode: FC<IBattleModeProps> = ({
  game,
  currentRound,
  historyRounds
}: IBattleModeProps) => {
  const { socket } = useSocketCtx()
  // const [winningCard, setWinningCard] = useState<Record<string, IItemCard>>({})
  // const [currentRoundWinners, setCurrentRoundWinners] = useState<Array<[number, IItemCard]>>([])
  // const [teamResult, setTeamResult] =
  //   useState<Record<string, { score: number; teamPlayers: Array<[number, IItemCard]> }>>(
  //     initTeamState
  //   )
  // const [gameWinnerPlayer, setGameWinnerPlayer] = useState<IBattleUser[]>([])
  // const [allWinningCards, setAllWinningCards] = useState<Record<string, IItemCard>>({})
  const [isSpinEnd, setIsSpinEnd] = useState(false)

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

  // const addWinningCard = (playerId: number, card: IItemCard) => {
  //   setWinningCard((state) => ({ ...state, [playerId]: card }))
  // }

  // const isWinners = (playerId: number): boolean => {
  //   if (currentRoundWinners?.length) {
  //     return currentRoundWinners.map((items) => items[0])?.includes(playerId)
  //   }
  //   if (gameWinnerPlayer?.length) {
  //     return gameWinnerPlayer.map((player) => player.id)?.includes(playerId)
  //   }
  //   return false
  // }

  const isWinnerRound = (playerIndex: number, roundItems: IRootBattleRoundItem[]): boolean => {
    const maxValueOfPrice = Math.max(...roundItems.map((item) => item.price), 0)

    const filterByPrice = roundItems.filter((item) => item.price === maxValueOfPrice)

    return filterByPrice.some((item) => item.slot === playerIndex + 1)
  }

  // useEffect(() => {
  //   const userWinningCards = Object.entries(winningCard)

  //   if (userWinningCards.length === game.max) {
  //     if (mode.variant !== '2v2') {
  //       const wonCard = userWinningCards.reduce((acc, card) => {
  //         if (card[1].price > acc[1].price) {
  //           acc = card
  //         }
  //         return acc
  //       })
  //       const winnersPlayer = userWinningCards.filter((item) => item[1].price === wonCard[1].price)

  //       setCurrentRoundWinners(winnersPlayer)
  //     }
  //     if (mode.variant === '2v2') {
  //       const formattedByTeam = players.reduce<
  //         Record<string, { score: number; teamPlayers: Array<[string, IItemCard]> }>
  //       >((acc, player) => {
  //         if (!acc[player.place]) {
  //           acc[player.place] = {
  //             score: 0,
  //             teamPlayers: []
  //           }
  //         }
  //         acc[player.place].score += winningCard[player.id].price
  //         acc[player.place].teamPlayers.push([player.id, winningCard[player.id]])

  //         return acc
  //       }, {})

  //       Object.keys(formattedByTeam).forEach((key) =>
  //         setTeamResult((prev) => ({
  //           ...prev,
  //           [key]: {
  //             ...prev[key],
  //             teamPlayers: formattedByTeam[key].teamPlayers,
  //             score: prev[key].score + formattedByTeam[key].score
  //           }
  //         }))
  //       )

  //       let bestScore = 0
  //       let dreamTeam: Array<[string, IItemCard]> = []
  //       for (const key in formattedByTeam) {
  //         if (formattedByTeam[key].score === bestScore) {
  //           dreamTeam = [...dreamTeam, ...formattedByTeam[key].teamPlayers]
  //         }

  //         if (formattedByTeam[key].score > bestScore) {
  //           bestScore = formattedByTeam[key].score
  //           dreamTeam = formattedByTeam[key].teamPlayers
  //         }
  //       }
  //       setCurrentRoundWinners(dreamTeam)
  //     }

  //     setAllWinningCards(winningCard)
  //     setIsSpinEnd(true)
  //     setTimeout(() => {
  //       setCurrentRoundWinners([])
  //       setAllWinningCards({})
  //       setWinningCard({})
  //       setIsSpinEnd(false)
  //     }, 2800)
  //   }
  // }, [winningCard])

  // const getTeamWinnersId = (): string[] => {
  //   let score = 0
  //   let teamWinners: string[] = []
  //   for (const key in teamResult) {
  //     if (teamResult[key].score > score) {
  //       score = teamResult[key].score
  //       teamWinners = teamResult[key].teamPlayers.map((item) => item[0])
  //     }
  //   }
  //   return teamWinners
  // }

  // useEffect(() => {
  //   if (isFinishedGame) {
  //     if (mode.variant === '2v2') {
  //       setGameWinnerPlayer(players.filter((player) => getTeamWinnersId().includes(player.id)))
  //     }

  //     if (mode.variant !== '2v2') {
  //       const { wonDiamonds } = players.reduce((acc, player) => {
  //         if (acc.wonDiamonds < player.wonDiamonds) {
  //           acc = player
  //         }
  //         return acc
  //       })
  //       const winnersGame = players.filter((player) => player.wonDiamonds === wonDiamonds)

  //       setGameWinnerPlayer(winnersGame)
  //     }
  //   }
  // }, [isFinishedGame])

  return (
    <div className="flex -mx-2">
      {Array.from({ length: game.max }).map((_, i) => (
        <div
          key={i}
          className={clsx('px-1 mb-9 relative', {
            'w-1/2': game.max === 2,
            'w-1/3': game.max === 3,
            'w-1/4': game.max === 4
          })}
        >
          <UserBar
            user={game.players[i]}
            amountPlayers={game.max}
            onJoinGame={() => handleJoinGame(i)}
            isPlayerGameWinners={isWinnerRound(i, currentRound?.items ?? [])} // add is game winner
            isEndGame={game.state === RootBattleStateEnum.done}
            wonDiamonds={24124124} // todo
          />
          <div
            className={clsx('bg-blue-accent rounded-b flex items-center relative mb-9', {
              'bg-gradient-lvl from-green-primary/30':
              isWinnerRound(i, currentRound?.items ?? []),
              // ||  gameWinnerPlayer?.find((player) => player?.id === players[i]?.id) // add is game winner
              'bg-gradient-lvl from-red-accent/30 to-dark/0':
                (!isWinnerRound(i, currentRound?.items ?? []) && isSpinEnd) ||
                (!isWinnerRound(i, currentRound?.items ?? []) && RootBattleStateEnum.done)
            })}
          >
            {i !== game.players.length - 1 && (
              <div className="absolute left-full -ml-7 -mt-8 top-1/2 w-16 z-30 ">
                {getIcons(getDisplayedModeByGame(game), i)}
              </div>
            )}
            <div className="grow -translate-y-[2px] ">
              <img
                src={IMAGES.graySeparator}
                alt="divider"
                width="92"
                height="1"
                loading="lazy"
                decoding="async"
                className="w-full h-px"
              />
            </div>
            <div className="w-52 mx-auto relative shrink-0 max-w-full z-10">
              <BackdropEffects
                statusGame={game.state}
                player={game.players[i]} // todo
                winningCard={allWinningCards[players[i]?.id]?.image}
                isEndGame={game.state === RootBattleStateEnum.done}
              />
              <RoundWinBorderBottomEffect
                isShown={currentRoundWinners?.length > 0 || gameWinnerPlayer.length > 0}
                isAddWinClass={isWinnerRound(i, currentRound?.items ?? [])}
              />
            </div>
            {game.state === RootBattleStateEnum.open && (
              <div className="z-20 absolute inset-0 flex flex-col justify-center items-center pt-1 pb-2">
                {game.players[i] && (
                  <>
                    <DaggersGreenGradient />
                    <span className="text-base font-bold">Ready</span>
                  </>
                )}
                {!game.players[i] && (
                  <>
                    <Loader height="40px" width="40px" color="rgba(147, 155, 185)" />
                    <span className="text-base font-bold text-gray-primary">Waiting</span>
                  </>
                )}
              </div>
            )}
            {game.state === RootBattleStateEnum.playing && (
              <SpinItems
                currentRound={currentRound}
                game={game}
                playerId={game.players[i]?.id}
                updateRewards={updateRewards}
                updateRound={updateRound}
                addWinningCard={addWinningCard}
                setShowEnd={setFinishGame}
              />
            )}
            {game.state === RootBattleStateEnum.done && isFinishedGame && (
              <PlayerStatusGame
                isPlayerGameWinner={isWinners(players[i]?.id)}
                wonDiamonds={players[i]?.wonDiamonds}
              />
            )}
            <div className="grow rotate-180 translate-y-[-2px]">
              <img
                src={IMAGES.graySeparator}
                alt="divider"
                width="92"
                height="1"
                loading="lazy"
                decoding="async"
                className="w-full h-px"
              />
            </div>
          </div>
          <UsersDrops amountGamePlates={game.max} cards={players[i]?.dropsCards} />
        </div>
      ))}
    </div>
  )
}

export default BattleMode
