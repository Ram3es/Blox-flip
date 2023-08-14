import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import BattleLayout from '../../components/containers/BattleGameLayout'
import BattleMode from '../../components/common/battle/BattleMode'
import GameHeader from '../../components/common/battle/GameHeader'
import GameRoundsInfo from '../../components/common/battle/GameRoundsInfo'
import { useBattleCase } from '../../store/BattleCaseStore'

const BattleCases = () => {
  const { id } = useParams()
  const { games } = useBattleCase()

  const currentGame = useMemo(() => games.find((game) => game.id === id), [games])

  return (
    <div className="max-w-1190 w-full mx-auto text-sm">
      {currentGame && (
        <BattleLayout amountGamePlates={currentGame.max}>
          <GameHeader game={currentGame} currentRound={currentGame.result[currentGame.result.length - 1]} />
          <GameRoundsInfo game={currentGame} currentRound={currentGame.result[currentGame.result.length - 1]} />
          <BattleMode game={currentGame} currentRound={currentGame.result[currentGame.result.length - 1]} historyRounds={currentGame.result} />
        </BattleLayout>
      )}
    </div>
  )
}

export default BattleCases
