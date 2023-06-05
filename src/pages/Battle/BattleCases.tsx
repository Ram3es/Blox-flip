import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BattleLayout from '../../components/containers/BattleGameLayout'
import { IBattlesInfo, IBattleUser } from '../../mocks/battle'
import type { IItemCard, IUnboxCard } from '../../types/ItemCard'
import BattleMode from '../../components/common/battle/BattleMode'
import GameHeader from '../../components/common/battle/GameHeader'
import GameRoundsInfo from '../../components/common/battle/GameRoundsInfo'

const BattleCases = () => {
  const location = useLocation()

  const [gameState, setGameState] = useState<IBattlesInfo>(location.state)
  const [usersFinishedRound, setFinishedRound] = useState<Record<string, number>>({})

  const updateRound = (userId: string) => {
    setFinishedRound((state) => ({ ...state, [userId]: state[userId] + 1 || gameState.gameSetting.currentRound }))
  }

  const joinBattle = (idx: number, player: IBattleUser) => {
    console.log(idx, 'idx', gameState.players, 'gameState')

    setGameState((state) => ({
      ...state,
      players: [...state.players.slice(0, idx), player, ...state.players.slice(idx + 1)]
    }))
  }

  const setFinishGame = () => {
    setGameState(state => ({ ...state, gameSetting: { ...state.gameSetting, isDone: true } }))
  }

  const updateRewards = (userId: string, card: IItemCard) => {
    setGameState((state) => ({
      ...state,
      players: [
        ...state.players.map((player) => {
          if (player?.id === userId) {
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
    if (gameState.players.length === gameState.gameSetting.mode.requiredPlayers && gameState.players.every(item => item !== undefined) && !gameState.gameSetting.currentRound) {
      setGameState(state => ({
        ...state,
        status: 'running',
        gameSetting: { ...state.gameSetting, currentRound: 1 }
      }))
      return
    }
    if (gameState.gameSetting.rounds === gameState.gameSetting.currentRound) {
      setGameState(state =>
        ({ ...state, status: 'ended' })
      )
    }
  }, [gameState.players, gameState.gameSetting.currentRound])

  useEffect(() => {
    const users = Object.values(usersFinishedRound)
    if (users.length === gameState.gameSetting.mode.requiredPlayers && users.every(val => val === gameState.gameSetting.currentRound) && gameState.gameSetting.currentRound && gameState.status !== 'ended') {
      setGameState(state => ({
        ...state,
        gameSetting: { ...state.gameSetting, currentRound: state.gameSetting.currentRound + 1 }
      }))
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
          setFinishGame={setFinishGame}
          isFinishedGame={gameState.gameSetting.isDone}
        />
      </BattleLayout>
    </div>
  )
}

export default BattleCases
