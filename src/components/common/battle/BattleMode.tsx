/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import RoundWinBorderBottomEffect from './RoundWinBorderBottomEffect'
import SpinItems from './SpinItems'
import UsersDrops from './UsersDrops'
import { getToast } from '../../../helpers/toast'
import {
  DisplayedBattleModeEnum,
  IRootBattle,
  IRootBattleResult,
  IRootBattleRoundItem,
  RootBattleStateEnum
} from '../../../types/CaseBattles'
import { getDisplayedModeByGame } from '../../../helpers/caseBattleHelpers'
import {
  CASE_BATTLE_ROUND_TIME_MILLISECONDS,
  CASE_BATTLE_ROUND_WINNER_TIME_MILLISECONDS,
  CASE_BATTLE_SPINNER_TIME_MILLISECONDS,
  CASE_BATTLE_SPINNER_TIME_SECONDS
} from '../../../constants/battle-cases'

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
  const [isStartGame, setIsStartGame] = useState(false)
  const [isRespin, setRespin] = useState(false)
  const [isVisibleEffects, setIsVisibleEffects] = useState(false)

  const getSumWonItems = useCallback(
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
      // setTimeout(() => {
      //   setIsSpin(true)

      //   setTimeout(() => {
      //     setIsSpin(false)
      //   }, CASE_BATTLE_ROUND_TIME_MILLISECONDS)
      // }, CASE_BATTLE_ROUND_TIME_MILLISECONDS)
      if (historyRounds.length > 0) {
        setIsSpin(true)
        console.log('Spin START')
        setTimeout(() => {
          setIsSpin(false)
          console.log('Spin END, Win Effect Start')
          setIsVisibleEffects(true)
        }, CASE_BATTLE_SPINNER_TIME_MILLISECONDS)
        setTimeout(() => {
          setIsVisibleEffects(false)
          console.log('Win Effect End')
        }, CASE_BATTLE_ROUND_TIME_MILLISECONDS)
      }
    }

    if (game.state === 'done') {
      setTimeout(() => {
        setIsStartGame(false)
      }, CASE_BATTLE_ROUND_TIME_MILLISECONDS)
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
          <UserBar game={game} playerIndex={index} getSumWonItems={() => getSumWonItems(historyRounds, index)} />
          <div
            className={clsx('bg-blue-accent rounded-b flex items-center relative mb-9', {
              // 'bg-gradient-lvl from-green-primary/30':
              //   (game.state === 'done' && game.winners[0].place === game.players[index].place) ||
              //   (game.state === 'playing' &&
              //     !isSpin &&
              //     currentRound &&
              //     getMaxCostInRound(currentRound) === currentRound.results[index].cost),
              // 'bg-gradient-lvl from-red-accent/30 to-dark/0':
              //   (game.state === 'done' && game.winners[0].place !== game.players[index].place) ||
              //   (game.state === 'playing' &&
              //     !isSpin &&
              //     currentRound &&
              //     getMaxCostInRound(currentRound) !== currentRound.results[index].cost)
            })}
          >
            {index !== game.max - 1 && (
              <div className="absolute left-full -ml-6 -mt-8 top-1/2 w-16 z-30">
                {getIcons(getDisplayedModeByGame(game), index)}
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
                game={game}
                playerIndex={index}
                // statusGame={game.state}
                // player={game.players[index]} // todo
                // winningCard={allWinningCards[players[index]?.id]?.image} // todo
                // isEndGame={game.state === RootBattleStateEnum.done}
              />
              {/* <RoundWinBorderBottomEffect
                // isShown={currentRoundWinners?.length > 0 || gameWinnerPlayer.length > 0}
                isShown={false}
                isAddWinClass={isWinnerRound(index, currentRound?.items ?? [])}
              /> */}
            </div>
            {game.state === RootBattleStateEnum.open && (
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
            {currentRound && (
              <SpinItems
                currentRound={currentRound}
                game={game}
                playerIndex={index}
                isSpin={isSpin}
                isStartGame={isStartGame}
                isRespin={isRespin}
                setRespin={setRespin}
                isVisibleEffects={isVisibleEffects}
              />
            )}
            {/* {game.state === RootBattleStateEnum.done && game.winners && (
              <PlayerStatusGame
                isPlayerGameWinner={game.winners[0].place === game.players[index].place}
                wonDiamonds={getSumWonItems(historyRounds, index)}
              />
            )} */}
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
          <UsersDrops slots={game.max} playerHistoryRounds={getHistoryRoundsForPlayer(historyRounds, index)} />
        </div>
      ))}
    </div>
  )
}

export default BattleMode
