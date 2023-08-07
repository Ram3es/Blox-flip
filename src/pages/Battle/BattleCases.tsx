import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import BattleLayout from '../../components/containers/BattleGameLayout'
import BattleMode from '../../components/common/battle/BattleMode'
import GameHeader from '../../components/common/battle/GameHeader'
import GameRoundsInfo from '../../components/common/battle/GameRoundsInfo'
import { useBattleCase } from '../../store/BattleCaseStore'
import { useSocketCtx } from '../../store/SocketStore'
import { IRootBattle, IRootBattleResult, IRootJoinBattle } from '../../types/CaseBattles'

const BattleCases = () => {
  const { id } = useParams()
  const { games } = useBattleCase()
  const { socket } = useSocketCtx()
  const { state } = useLocation()

  const [gameState, setGameState] = useState<IRootBattle | null>(null)
  const [currentRound, setCurrentRound] = useState<IRootBattleResult | null>(null)
  const [historyRounds, setHistoryRounds] = useState<IRootBattleResult[]>([])

  useEffect(() => {
    if (state) {
      setGameState(state)
    }
    if (id && !state) {
      const currentGame = games.find((game) => game.id === id)
      if (currentGame) {
        setGameState(currentGame)
      }
    }
  }, [id, games])

  useEffect(() => {
    if (id && gameState) {
      socket.on('battle_result', (data: IRootBattleResult) => {
        if (data.id === gameState.id) {
          if (data.round === 1) {
            setGameState((prev) => prev && { ...prev, state: 'playing' })
          }

          setCurrentRound(data)
          setHistoryRounds((prev) => [...prev, data])
        }
      })
    }

    socket.on('join_battle', (data: IRootJoinBattle) => {
      if (gameState && gameState.id === data.id) {
        setGameState((prev) => prev && { ...prev, players: [...prev.players, data.user] })
      }
    })

    socket.on('battle_over', (data: IRootBattle) => {
      if (gameState && gameState.id === data.id) {
        setGameState(data)
      }
    })

    return () => {
      socket.off('battle_result')
      socket.off('join_battle')
    }
  }, [socket, id, gameState])

  return (
    <div className="max-w-1190 w-full mx-auto text-sm">
      {gameState && (
        <BattleLayout amountGamePlates={gameState.max}>
          <GameHeader game={gameState} currentRound={currentRound} />
          <GameRoundsInfo game={gameState} currentRound={currentRound} />
          <BattleMode game={gameState} currentRound={currentRound} historyRounds={historyRounds} />
        </BattleLayout>
      )}
    </div>
  )
}

export default BattleCases
