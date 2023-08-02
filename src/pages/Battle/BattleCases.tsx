import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import BattleLayout from '../../components/containers/BattleGameLayout'
import BattleMode from '../../components/common/battle/BattleMode'
import GameHeader from '../../components/common/battle/GameHeader'
import GameRoundsInfo from '../../components/common/battle/GameRoundsInfo'
import { useBattleCase } from '../../store/BattleCaseStore'
import { useSocketCtx } from '../../store/SocketStore'
import { IRootBattle, IRootBattleResult } from '../../types/CaseBattles'

const BattleCases = () => {
  const { id } = useParams()
  const { games } = useBattleCase()
  const { socket } = useSocketCtx()
  const { state } = useLocation()
  // console.log(state, 'state')

  const [gameState, setGameState] = useState<IRootBattle | null>(null)
  const [historyRounds, setHistoryRounds] = useState<IRootBattleResult[]>([])
  const [currentRound, setCurrentRound] = useState<IRootBattleResult | null>(null)

  useEffect(() => {
    if (id) {
      const currentGame = games.find((game) => game.id === id)
      console.log('BATTLE CASE', currentGame)
      if (currentGame) {
        setGameState(currentGame)
      }
    }
  }, [id, games])

  useEffect(() => {
    if (id && gameState) {
      socket.on('battle_result', (data: IRootBattleResult[]) => {
        const battleRound = data.find((item) => item.id === id)
        if (battleRound) {
          setCurrentRound(battleRound)
          setHistoryRounds((prev) => [...prev, battleRound])
        }
      })
    }

    socket.on('join_battle', (id, player) => {
      console.log(id, player, 'DATA JOIN BATTLE')
    })

    return () => {
      socket.off('battle_result')
      socket.off('join_battle')
    }
  }, [socket, id, gameState])

  return (
    <div className="max-w-1190 w-full mx-auto text-sm">
      {gameState && (
        <BattleLayout amountGamePlates={gameState.players.length}>
          <GameHeader game={gameState} currentRound={currentRound} />
          <GameRoundsInfo game={gameState} currentRound={currentRound} />
          <BattleMode game={gameState} currentRound={currentRound} historyRounds={historyRounds} />
        </BattleLayout>
      )}
    </div>
  )
}

export default BattleCases
