import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import BattleLayout from '../../components/containers/BattleGameLayout'
import BattleMode from '../../components/common/battle/BattleMode'
import GameHeader from '../../components/common/battle/GameHeader'
import GameRoundsInfo from '../../components/common/battle/GameRoundsInfo'
import { useBattleCase } from '../../store/BattleCaseStore'
import { IRootBattle, IRootBattleResult } from '../../types/CaseBattles'

const BattleCases = () => {
  const { id } = useParams()
  const { games } = useBattleCase()

  const [gameState, setGameState] = useState<IRootBattle | null>(null)
  const [currentRound, setCurrentRound] = useState<IRootBattleResult | null>(null)
  const [historyRounds, setHistoryRounds] = useState<IRootBattleResult[]>([])

  const currentGame = useMemo(() => games.find((game) => game.id === id), [games])

  useEffect(() => {
    if (id && currentGame) {
      setGameState(currentGame)
      if (currentGame.state === 'playing') {
        const latestRound = currentGame.result[currentGame.result.length - 1]

        setCurrentRound({
          id: latestRound.id,
          round: Number(latestRound.id),
          results: latestRound.drops
        })

        setHistoryRounds((prevHistoryRounds) => [
          ...prevHistoryRounds,
          {
            id: latestRound.id,
            round: Number(latestRound.id),
            results: latestRound.drops
          }
        ])
      }
    }
  }, [id, currentGame])

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
