import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { useSocketCtx } from './SocketStore'
import { getToast } from '../helpers/toast'
import { IRootBattle, IRootBattleResult, IRootJoinBattle } from '../types/CaseBattles'
import { IRootCaseItem } from '../types/Cases'

interface BattleCaseProviderProps {
  children: ReactNode
}

interface IBattleCaseContext {
  games: IRootBattle[]
  setGames: Dispatch<SetStateAction<IRootBattle[]>>
  allCases: IRootCaseItem[]
  setAllCases: Dispatch<SetStateAction<IRootCaseItem[]>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const BattleCaseContext = createContext<IBattleCaseContext>({} as IBattleCaseContext)

export const useBattleCase = () => {
  return useContext(BattleCaseContext)
}

export const BattleCaseProvider = ({ children }: BattleCaseProviderProps) => {
  const [games, setGames] = useState<IRootBattle[]>([])
  const [allCases, setAllCases] = useState<IRootCaseItem[]>([])

  const { socket } = useSocketCtx()

  useEffect(() => {
    socket.on('send_battle', (data: IRootBattle) => {
      setGames((prev) => [...prev, data])
    })

    socket.on('battle_remove', (id: string) => {
      setGames((prev) => prev.filter((game) => game.id !== id))
    })

    socket.emit('load_cases', (err: boolean | string, skins: IRootCaseItem[]) => {
      if (typeof err === 'string') {
        getToast(err)
      }
      if (!err) {
        setAllCases(skins)
      }
    })

    socket.emit('load_case_battles', (err: string | boolean, data: IRootBattle[]) => {
      if (typeof err === 'string') {
        getToast(err)
      }
      if (!err) {
        setGames(data)
      }
    })

    socket.on('battle_result', (data: IRootBattleResult) => {
      setGames((prev) =>
        prev.map((item) =>
          item.id === data.id
            ? {
                ...item,
                state: data.round === 1 ? 'playing' : item.state,
                result: [...item.result, { id: String(data.round), drops: data.results }]
              }
            : item
        )
      )
    })

    socket.on('join_battle', (data: IRootJoinBattle) => {
      setGames((prev) =>
        prev.map((item) => (item.id === data.id ? { ...item, players: [...item.players, data.user] } : item))
      )
    })

    socket.on('battle_over', (data: IRootBattle) => {
      setGames((prev) => prev.map((item) => (item.id === data.id ? data : item)))
    })

    return () => {
      socket.off('send_battle')
      socket.off('battle_remove')
      socket.off('battle_result')
      socket.off('join_battle')
      socket.off('battle_over')
    }
  }, [socket])

  return (
    <BattleCaseContext.Provider
      value={{
        games,
        setGames,
        allCases,
        setAllCases
      }}
    >
      {children}
    </BattleCaseContext.Provider>
  )
}
