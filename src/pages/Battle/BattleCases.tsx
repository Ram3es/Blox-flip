import { useEffect, useState } from 'react'
import { useBattleCase } from '../../store/BattleCaseStore'

import { useLocation } from 'react-router-dom'

import BattleMode from '../../components/common/battle/BattleMode'
import GameHeader from '../../components/common/battle/GameHeader'
import GameRoundsInfo from '../../components/common/battle/GameRoundsInfo'
import BattleLayout from '../../components/containers/BattleGameLayout'

import { IBattlesInfo, IBattleUser } from '../../mocks/battle'
import type { IItemCard, IUnboxCard } from '../../types/ItemCard'

const BattleCases = () => {
  const location = useLocation()

  const { games } = useBattleCase()
  const [gameState, setGameState] = useState<IBattlesInfo>(games[0])
  const [usersFinishedRound, setFinishedRound] = useState<Record<string, number>>({})

  useEffect(() => {
    if (location.pathname) {
      const currentGame = games.filter((item) => item.id === location.pathname.split('/')[2])
      setGameState(currentGame[0])
    }
  }, [location, games])

  const updateRound = (userId: string) => {
    setFinishedRound((state) => ({ ...state, [userId]: state[userId] + 1 || 1 }))
  }

  const joinBattle = (idx: number, player: IBattleUser) => {
    setGameState((state) => ({
      ...state,
      players: [...state.players.slice(0, idx), player, ...state.players.slice(idx + 1)]
    }))
  }

  const updateRewards = (userId: string, card: IItemCard) => {
    setGameState((state) => ({
      ...state,
      players: [
        ...state.players.map((player) => {
          if (player.id === userId) {
            return {
              ...player,
              dropsCards: [...player.dropsCards, card],
              wonDiamonds: player.wonDiamonds + card.price
            }
          }
          return player
        })
      ]
    }))
  }

  const getCurrentBoxPrice = (cases: IUnboxCard[]): number => {
    if (gameState.status !== 'created' && gameState.gameSetting.currentRound) {
      return cases[gameState.gameSetting.currentRound - 1].price
    }
    return 0
  }

  useEffect(() => {
    if (gameState) {
      if (
        gameState.players.every((item) => item !== undefined) &&
        !gameState.gameSetting.currentRound
      ) {
        setGameState((state) => ({
          ...state,
          status: 'running',
          gameSetting: { ...state.gameSetting, currentRound: 1 }
        }))
        return
      }
      if (gameState.gameSetting.rounds === gameState.gameSetting.currentRound) {
        setGameState((state) => ({ ...state, status: 'ended' }))
      }
    }
  }, [gameState, location])

  useEffect(() => {
    if (gameState) {
      if (
        usersFinishedRound &&
        Object.values(usersFinishedRound).every(
          (val) => val === gameState.gameSetting.currentRound
        ) &&
        gameState.gameSetting.currentRound
      ) {
        setGameState((state) => ({
          ...state,
          gameSetting: {
            ...state.gameSetting,
            currentRound: (state.gameSetting.currentRound as number) + 1
          }
        }))
      }
    }
  }, [usersFinishedRound])

  return (
    <div className='max-w-1190 w-full mx-auto text-sm'>
      <BattleLayout amountGamePlates={gameState.gameSetting.mode.requiredPlayers}>
        <GameHeader
          gameStatus={gameState.status}
          amountRounds={gameState.gameSetting.rounds}
          currentRound={gameState.gameSetting.currentRound}
          totalPrice={gameState.gameSetting.price}
          currentBoxPrice={getCurrentBoxPrice(gameState?.cases as IUnboxCard[])}
        />
        <GameRoundsInfo
          gameVariant={gameState.gameSetting.mode.variant}
          amountRounds={gameState.gameSetting.rounds}
          currentRound={gameState.gameSetting.currentRound}
        />
        <BattleMode
          status={gameState.status}
          players={gameState.players}
          casesBox={gameState.cases}
          onJoinUser={joinBattle}
          mode={gameState.gameSetting.mode}
          updateRewards={updateRewards}
          updateRound={updateRound}
        />
      </BattleLayout>
    </div>
  )
}

export default BattleCases
