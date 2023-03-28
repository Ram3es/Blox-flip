import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BattleMode from '../../components/common/battle/BattleMode'
import GameHeader from '../../components/common/battle/GameHeader'
import GameRoundsInfo from '../../components/common/battle/GameRoundsInfo'
import BattleLayout from '../../components/containers/BattleGameLayout'
import { IBattlesInfo, IBattleUser } from '../../mocks/battle'
import { IItemCard, IUnboxCard } from '../../types/ItemCard'

const BattleCases = () => {
  const location = useLocation()
  const [gameState, setState] = useState<IBattlesInfo>(location.state)

  const joinBattle = (idx: number, player: IBattleUser) => {
    setState(state => ({ ...state, players: [...state.players.slice(0, idx), player, ...state.players.slice(idx + 1)] }))
  }

  const updateRewards = (userId: string, card: IItemCard) => {
    console.log(card)
    setState(state => ({
      ...state,
      players: [...state.players.map(player => {
        if (player.id === userId) {
          return { ...player, dropsCards: [...player.dropsCards, card], wonDiamonds: player.wonDiamonds + card.price }
        }
        return player
      })]
    }))
  }

  useEffect(() => {
    if (gameState.players.every(item => item !== undefined)) {
      setState(state => ({
        ...state,
        status: 'running',
        gameSetting: { ...state.gameSetting, currentRound: 1 }
      }))
    }
  }, [gameState.players])

  const getCurrentBoxPrice = (cases: IUnboxCard[]): number => {
    if (gameState.status === 'running' && gameState.gameSetting.currentRound) {
      return cases[gameState.gameSetting.currentRound - 1].price
    }
    return 0
  }

  return (
        <div className="max-w-1190 w-full mx-auto text-sm">
            <BattleLayout amountGamePlates={gameState.gameSetting.mode.requiredPlayers} >
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
                />
            </BattleLayout>
        </div>
  )
}

export default BattleCases
