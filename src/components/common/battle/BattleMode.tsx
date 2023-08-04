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

const BattleMode: FC<IBattleModeProps> = ({
  game,
  currentRound,
  historyRounds
}: IBattleModeProps) => {
  const { socket } = useSocketCtx()

  const [isSpinEnd, setIsSpinEnd] = useState(false)

  const isWinnerRound = (playerIndex: number, roundItems: IRootBattleRoundItem[]): boolean => {
    const maxValueOfPrice = Math.max(...roundItems.map((item) => item.price), 0)

    const filterByPrice = roundItems.filter((item) => item.price === maxValueOfPrice)

    return filterByPrice.some((item) => item.slot === playerIndex + 1)
  }

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
            // user={game.players[index]}
            // amountPlayers={game.max}
            // onJoinGame={() => handleJoinGame(index)}
            // onJoinGame={() => handleCallBot(index)}
            // isPlayerGameWinners={isWinnerRound(index, currentRound?.items ?? [])} // add is game winner
            // isEndGame={game.state === RootBattleStateEnum.done}
            // wonDiamonds={24124124} // todo
          />
          <div
            className={clsx('bg-blue-accent rounded-b flex items-center relative mb-9', {
              'bg-gradient-lvl from-green-primary/30': isWinnerRound(
                index,
                currentRound?.items ?? []
              ),
              // ||  gameWinnerPlayer?.find((player) => player?.id === players[index]?.id) // add is game winner
              'bg-gradient-lvl from-red-accent/30 to-dark/0':
                (!isWinnerRound(index, currentRound?.items ?? []) && isSpinEnd) ||
                (!isWinnerRound(index, currentRound?.items ?? []) && RootBattleStateEnum.done)
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
              <RoundWinBorderBottomEffect
                // isShown={currentRoundWinners?.length > 0 || gameWinnerPlayer.length > 0}
                isShown={false}
                isAddWinClass={isWinnerRound(index, currentRound?.items ?? [])}
              />
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
            {game.state === RootBattleStateEnum.playing && (
              <SpinItems
                currentRound={currentRound}
                game={game}
                playerId={game.players[index]?.id}
                // updateRewards={updateRewards}
                // updateRound={updateRound}
                // addWinningCard={addWinningCard}
                // setShowEnd={setFinishGame}
                updateRewards={() => console.log('test')}
                updateRound={() => console.log('test')}
                addWinningCard={() => console.log('test')}
                setShowEnd={() => console.log('test')}
              />
            )}
            {/* {game.state === RootBattleStateEnum.done && isFinishedGame && (
              <PlayerStatusGame
                isPlayerGameWinner={isWinners(players[index]?.id)}
                wonDiamonds={players[index]?.wonDiamonds}
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
          <UsersDrops
            // amountGamePlates={game.max}
            // cards={game.caselist}
            game={game}
            // cards={players[index]?.dropsCards}
          />
        </div>
      ))}
    </div>
  )
}

export default BattleMode
