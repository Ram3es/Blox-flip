import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import { useSocketCtx } from './SocketStore'
import { IRootJackpotChance, IRootJackpotHistory, IRootJackpotInfo, IRootJackpotNew, IRootJackpotRoll } from '../types/Jackpot'

interface JackpotProviderProps {
  children: ReactNode
}

export interface IJackpotContext {
  timer?: number
  history?: IRootJackpotHistory
  winner: IRootJackpotRoll | null
  gameInfo?: IRootJackpotInfo
  joinedUsers: IRootJackpotNew[]
  setUserJoined: Dispatch<SetStateAction<IRootJackpotNew[]>>
  setTimer: Dispatch<SetStateAction<number | undefined>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const JackpotContext = createContext<IJackpotContext>({} as IJackpotContext)

export const useJackpot = () => {
  return useContext(JackpotContext)
}

export const JackpotProvider = ({ children }: JackpotProviderProps) => {
  const [joinedUsers, setUserJoined] = useState<IRootJackpotNew[]>([])
  const [history, setHistory] = useState<IRootJackpotHistory>()
  const [gameInfo, setGameInfo] = useState<IRootJackpotInfo>()
  const [winner, setWinner] = useState<IRootJackpotRoll | null>(null)
  const [timer, setTimer] = useState<number>()

  const { socket } = useSocketCtx()

  useEffect(() => {
    socket.on('connect', () => {
      socket.on('jackpot_all', (data: IRootJackpotNew[]) => {
        setUserJoined(data)
      })

      socket.on('jackpot_info', (data: IRootJackpotInfo) => {
        console.log('GAMEINFO', data)
        setGameInfo(data)
        if (data.timer) {
          setTimer(data.timer)
        }
      })

      socket.on('jackpot_history', (data: IRootJackpotHistory) => {
        setHistory(data)
      })
    })

    socket.on('jackpot_new', (data: IRootJackpotNew) => {
      setUserJoined((prev) => [...prev, data])
    })

    socket.on('jackpot_chance_update', (data: IRootJackpotChance[]) => {
      setUserJoined(prev => prev.map((player, idx) => ({ ...player, chance: data[idx].chance })))
    })

    socket.on('jackpot_roll', (data: IRootJackpotRoll) => {
      console.log(data, 'ROLLL DATA =>>>>>>>>>>>>>>>')
      setWinner(data)
    })

    return () => {
      socket.off('jackpot_all')
      socket.off('jackpot_new')
      socket.off('jackpot_info')
      socket.off('jackpot_roll')
      socket.off('jackpot_history')
      socket.off('jackpot_chance_update')
    }
  }, [])

  return (
    <JackpotContext.Provider
      value={{
        timer,
        winner,
        history,
        gameInfo,
        joinedUsers,
        setTimer,
        setUserJoined
      }}
    >
      {children}
    </JackpotContext.Provider>
  )
}
