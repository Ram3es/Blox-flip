import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BattleLayout from '../../components/containers/BattleGameLayout'
import type { IItemCard } from '../../types/ItemCard'
import BattleMode from '../../components/common/battle/BattleMode'
import GameHeader from '../../components/common/battle/GameHeader'
import GameRoundsInfo from '../../components/common/battle/GameRoundsInfo'
import { useBattleCase } from '../../store/BattleCaseStore'
import { useSocketCtx } from '../../store/SocketStore'
import {
  IRootBattle,
  IRootBattleCaseItem,
  IRootBattleResult,
  IRootBattleModeEnum,
  IRootBattlePlayer,
  IRootBattleStateEnum
} from '../../types/CaseBattles'

const BattleCases = () => {
  const { id } = useParams()
  const { games } = useBattleCase()
  const { socket } = useSocketCtx()

  const [gameState, setGameState] = useState<IRootBattle | null>(null)
  const [currentRound, setCurrentRound] = useState<IRootBattleResult | null>(null)
  const [usersFinishedRound, setFinishedRound] = useState<Record<string, number>>({})

  const updateRound = (userId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
    setFinishedRound((state) => ({ ...state, [userId]: state[userId] + 1 || currentRound?.round! }))
  }

  const HandleJoinBattle = (idx: number, player: IRootBattlePlayer) => {
    // setGameState((state) => ({
    //   ...state,
    //   players: [...state.players.slice(0, idx), player, ...state.players.slice(idx + 1)]
    // }))
  }

  const setFinishGame = () => {
    // setGameState((state) => ({ ...state, gameSetting: { ...state.gameSetting, isDone: true } }))
  }

  const updateRewards = (userId: string, card: IItemCard) => {
    // setGameState((state) => ({
    //   ...state,
    //   players: [
    //     ...state.players.map((player) => {
    //       if (player?.id === userId) {
    //         return {
    //           ...player,
    //           dropsCards: [...player.dropsCards, card],
    //           wonDiamonds: player.wonDiamonds + card.price
    //         }
    //       }
    //       return player
    //     })
    //   ]
    // }))
  }

  const getCurrentBoxPrice = (cases: IRootBattleCaseItem[]): number => {
    if (gameState?.state !== 'open' && currentRound?.round) {
      return cases[currentRound?.round - 1].price
    }
    return 0
  }

  useEffect(() => {
    if (id) {
      const currentGame = games.find((game) => game.id === Number(id))
      if (currentGame) {
        setGameState(currentGame)
      }
    }
  }, [id])

  useEffect(() => {
    if (id && gameState) {
      socket.on('battle_result', (data: IRootBattleResult[]) => {
        const battleRound = data.find((item) => item.id === Number(id))
        if (battleRound) {
          setCurrentRound(battleRound)
        }
      })
    }

    return () => {
      socket.off('battle_result')
    }
  }, [socket, id, gameState])

  return (
    <div className="max-w-1190 w-full mx-auto text-sm">
      {gameState && (
        <BattleLayout amountGamePlates={gameState.players.length + 1}>
          <GameHeader
            gameStatus={gameState.state}
            amountRounds={gameState.caselist.length + 1}
            currentRound={currentRound?.round ?? 0}
            totalPrice={gameState.cost}
            currentBoxPrice={getCurrentBoxPrice(gameState?.caselist)}
          />
          <GameRoundsInfo
            gameVariant={
              gameState?.team
                ? 'Team'
                : gameState.gamemode === IRootBattleModeEnum.crazy
                  ? IRootBattleModeEnum.crazy
                  : IRootBattleModeEnum.regular
            }
            amountRounds={gameState.caselist.length + 1}
            currentRound={currentRound?.round ?? 0}
          />
          <BattleMode
            status={gameState.state}
            players={gameState.players}
            casesBox={gameState.caselist}
            mode={{
              variant: '2v2',
              requiredPlayers: gameState.max
            }}
            isFinishedGame={gameState.state === IRootBattleStateEnum.done}
            gameId={gameState.id}
            // onJoinUser={HandleJoinBattle}
            updateRewards={updateRewards}
            updateRound={updateRound}
            setFinishGame={setFinishGame}
          />
        </BattleLayout>
      )}
    </div>
  )
}

export default BattleCases
