import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'

import Loader from '../../base/Loader'
import BattleDaggers from '../../icons/BattleDaggers'
import DaggersGreenGradient from '../../icons/DaggersGreenGradient'
import FriendlyBlue from '../../icons/FriendlyBlue'
import FriendlyGreen from '../../icons/FriendlyGreen'
import FriendlyOrange from '../../icons/FriendlyOrange'
import { IMAGES } from '../../../constants/images'
import { IItemCard } from '../../../types/ItemCard'
import BackdropEffects from './BackdropEffects'
import PlayerStatusGame from './PlayerStatusGame'
import UserBar from './UserBar'
import SpinItems from './SpinItems'
import UsersDrops from './UsersDrops'
import {
  DisplayedBattleModeEnum,
  IRootBattle,
  IRootBattlePlayer,
  IRootBattleResult,
  IRootBattleResultHistory,
  IRootBattleRoundItem
} from '../../../types/CaseBattles'
import { getDisplayedModeByGame } from '../../../helpers/caseBattleHelpers'
import {
  CASE_BATTLE_ROUND_TIME_MILLISECONDS,
  CASE_BATTLE_SPINNER_TIME_MILLISECONDS
} from '../../../constants/battle-cases'
import BorderBottomEffect from './BorderBottomEffect'

export interface IWiningPlayerCard {
  id: string
  card: IItemCard
}

const case2v2Icons: Record<number, ReactNode> = {
  0: <FriendlyBlue />,
  1: <BattleDaggers />,
  2: <FriendlyOrange />
}

const getIcons = (type: DisplayedBattleModeEnum, index: number) => {
  switch (type) {
    case DisplayedBattleModeEnum['2v2']:
      return case2v2Icons[index]
    case DisplayedBattleModeEnum.shared:
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

const BattleMode: FC<IBattleModeProps> = ({ game, currentRound, historyRounds }: IBattleModeProps) => {
  const [isSpin, setIsSpin] = useState(false)
  const [isRespin, setRespin] = useState(false)
  const [isVisibleEffects, setIsVisibleEffects] = useState(false)
  const [drops, setDrops] = useState<IRootBattleResult[]>([])

  const getSumWonItemsByHistory = useCallback(
    (historyRounds: IRootBattleResult[], playerIndex: number) => {
      return historyRounds.reduce((totalCost, result) => {
        if (result.results[playerIndex]) {
          totalCost += result.results[playerIndex].cost
        }
        return totalCost
      }, 0)
    },
    [historyRounds]
  )

  const isPlayerWinnerGame = (winners: IRootBattlePlayer[], playerPlace: number) => {
    return winners.some((winner) => winner.place === playerPlace)
  }

  const getWinnerValue = (winners: IRootBattlePlayer[], playerPlace: number) => {
    const winner = winners.find((winner) => winner.place === playerPlace)
    return winner ? winner.value : 0
  }

  const getHistoryRoundsForPlayerByResult = (
    result: IRootBattleResultHistory[],
    playerIndex: number
  ): IRootBattleRoundItem[] => {
    return result.map((item) => item.drops[playerIndex])
  }

  const getMaxCostInRound = (round: IRootBattleResult) => {
    return round.results.reduce((maxCost, roundItem) => {
      return Math.max(maxCost, roundItem.cost)
    }, 0)
  }

  const getHistoryRoundsForPlayer = (
    historyRounds: IRootBattleResult[],
    playerIndex: number
  ): IRootBattleRoundItem[] => {
    return historyRounds.map((round) => round.results[playerIndex])
  }

  useEffect(() => {
    if (game.state !== 'done') {
      if (historyRounds.length > 0) {
        setIsSpin(true)
        console.log('Spin START')
        setTimeout(() => {
          setIsSpin(false)
          console.log('Spin END, Win Effect Start')
          setIsVisibleEffects(true)
          setDrops([...historyRounds])
        }, CASE_BATTLE_SPINNER_TIME_MILLISECONDS)
        setTimeout(() => {
          setIsVisibleEffects(false)
          console.log('Win Effect End')
        }, CASE_BATTLE_ROUND_TIME_MILLISECONDS)
      }
    }
  }, [historyRounds, game.state])

  return (
    <div className="flex -mx-2">
      {Array.from({ length: game.max }).map((_, index) => (
        <div
          key={index}
          className={clsx('px-1 mb-9 relative', {
            'w-1/2': game.max === 2,
            'w-1/3': game.max === 3,
            'w-1/4': game.max === 4
          })}
        >
          <UserBar
            game={game}
            playerIndex={index}
            sumWonItems={
              game.state === 'done'
                ? getHistoryRoundsForPlayerByResult(game.result, index).reduce((totalCost, result) => {
                  totalCost += result.cost
                  return totalCost
                }, 0)
                : getSumWonItemsByHistory(drops, index)
            }
            isLoser={game.state === 'done' && !isPlayerWinnerGame(game.winners, index + 1)}
          />
          <div
            className={clsx('bg-blue-accent rounded-b flex items-center relative mb-9', {
              'bg-gradient-lvl from-green-primary/30':
                (game.state === 'done' && isPlayerWinnerGame(game.winners, index + 1)) ||
                (game.state === 'playing' &&
                  isVisibleEffects &&
                  currentRound &&
                  getMaxCostInRound(currentRound) === currentRound.results[index].cost),
              'bg-gradient-lvl from-red-accent/30 to-dark/0':
                (game.state === 'done' && !isPlayerWinnerGame(game.winners, index + 1)) ||
                (game.state === 'playing' &&
                  isVisibleEffects &&
                  currentRound &&
                  getMaxCostInRound(currentRound) !== currentRound.results[index].cost)
            })}
          >
            {index !== game.max - 1 && (
              <div className="absolute left-full -ml-6 -mt-8 top-1/2 w-16 z-30">
                {getIcons(getDisplayedModeByGame(game), index)}
              </div>
            )}
            {game.state !== 'done' && (
              <div className="grow -translate-y-[2px]">
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
            )}
            <div className="w-52 mx-auto relative shrink-0 max-w-full z-10">
              <BackdropEffects
                game={game}
                playerIndex={index}
                currentRound={currentRound}
                isVisibleEffects={isVisibleEffects}
              />
              <BorderBottomEffect
                isVisible={isVisibleEffects || game.state === 'done'}
                isWinner={
                  (game.state === 'done' && isPlayerWinnerGame(game.winners, index + 1)) ||
                  (game.state === 'playing' && currentRound
                    ? getMaxCostInRound(currentRound) === currentRound.results[index].cost
                    : false)
                }
              />
            </div>
            {game.state === 'open' && (
              <div className="z-20 absolute inset-0 flex flex-col justify-center items-center pt-1 pb-2">
                {game.players[index] && (
                  <>
                    <DaggersGreenGradient />
                    <span className="text-base font-bold">Ready</span>
                  </>
                )}
                {!game.players[index] && (
                  <>
                    <Loader height="40px" width="40px" color="rgba(147, 155, 185)" />
                    <span className="text-base font-bold text-gray-primary">Waiting</span>
                  </>
                )}
              </div>
            )}
            {currentRound && game.state !== 'done' && (
              <SpinItems
                currentRound={currentRound}
                game={game}
                playerIndex={index}
                isSpin={isSpin}
                isRespin={isRespin}
                setRespin={setRespin}
                isVisibleEffects={isVisibleEffects}
              />
            )}
            {game.state === 'done' && game.winners && (
              <PlayerStatusGame
                isPlayerGameWinner={isPlayerWinnerGame(game.winners, index + 1)}
                wonDiamonds={
                  game.state === 'done' && isPlayerWinnerGame(game.winners, index + 1)
                    ? getWinnerValue(game.winners, game.players[index].place)
                    : getSumWonItemsByHistory(drops, index)
                }
              />
            )}
            {game.state !== 'done' && (
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
            )}
          </div>
          <UsersDrops
            slots={game.max}
            playerHistoryRounds={
              game.state === 'done'
                ? getHistoryRoundsForPlayerByResult(game.result, index)
                : getHistoryRoundsForPlayer(drops, index)
            }
          />
        </div>
      ))}
    </div>
  )
}

export default BattleMode
