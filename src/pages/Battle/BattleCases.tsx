import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BattleMode from '../../components/common/Battle/BattleMode'
import GameHeader from '../../components/common/Battle/GameHeader'
import GameRoundsInfo from '../../components/common/Battle/GameRoundsInfo'
import BattleLayout from '../../components/containers/BattleGameLayout'
import { IBattlesInfo, IBattleUser } from '../../mocks/battle'
import { IItemCard, IUnboxCard } from '../../types/ItemCard'

const BattleCases = () => {
  const location = useLocation()
  const [gameState, setState] = useState<IBattlesInfo>(location.state)
  const [usersFinishedRound, setFinishedRound] = useState<Record<string, number>>({})

  const updateRound = (userId: string) => {
    setFinishedRound(state => ({ ...state, [userId]: state[userId] + 1 || 1 }))
  }

  const joinBattle = (idx: number, player: IBattleUser) => {
    setState(state => ({ ...state, players: [...state.players.slice(0, idx), player, ...state.players.slice(idx + 1)] }))
  }

  const updateRewards = (userId: string, card: IItemCard) => {
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
    if (gameState.players.every(item => item !== undefined) && !gameState.gameSetting.currentRound) {
      setState(state => ({
        ...state,
        status: 'running',
        gameSetting: { ...state.gameSetting, currentRound: 1 }
      }))
      return
    }
    if (gameState.gameSetting.rounds === gameState.gameSetting.currentRound) {
      setState(state =>
        ({ ...state, status: 'ended' })
      )
    }
  }, [gameState.players, gameState.gameSetting.currentRound])

  useEffect(() => {
    if (usersFinishedRound && Object.values(usersFinishedRound).every(val => val === gameState.gameSetting.currentRound) && gameState.gameSetting.currentRound) {
      setState(state => ({
        ...state,
        gameSetting: { ...state.gameSetting, currentRound: state.gameSetting.currentRound as number + 1 }
      }))
    }
  }, [usersFinishedRound])

  const getCurrentBoxPrice = (cases: IUnboxCard[]): number => {
    if (gameState.status !== 'created' && gameState.gameSetting.currentRound) {
      return cases[(gameState.gameSetting.currentRound - 1)].price
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
                updateRound={updateRound}
                />
            </BattleLayout>
        </div>
  )
}

export default BattleCases
