import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import { useSocketCtx } from './SocketStore'
import { IIWheelBet, ILoadWheelRes, IWinTicket, possibleBets } from '../types/Wheel'
import { getTimerValue } from '../helpers/wheelHelpers'
import { WheelBetRecord } from '../mocks/wheelBets'
import { DELAY, INIT_BETS_STATE } from '../constants/wheel'

interface WheelProviderProps {
  children: ReactNode
}

export interface IWheelContext {
  history: possibleBets[]
  setHistory: Dispatch<SetStateAction<possibleBets[]>>
  wheelBets: WheelBetRecord
  timer: number
  setTimer: Dispatch<SetStateAction<number>>
  wonTicket: IWinTicket | null
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const WheelContext = createContext<IWheelContext>({} as IWheelContext)

export const useWheel = () => {
  return useContext(WheelContext)
}

export const WheelProvider = ({ children }: WheelProviderProps) => {
  const [history, setHistory] = useState<possibleBets[]>([])
  const [wheelBets, setWheelBets] = useState<WheelBetRecord>(INIT_BETS_STATE)
  const [timer, setTimer] = useState<number>(0)
  const [wonTicket, setWonTicket] = useState<IWinTicket | null>(null)

  const { socket } = useSocketCtx()

  useEffect(() => {
    socket.emit('wheel:connect')

    socket.on('load_wheel', (data: ILoadWheelRes) => {
      const timerValue = getTimerValue(data.time, DELAY)
      if (timerValue >= 0) {
        setTimer(getTimerValue(data.time, DELAY))
      }
      setWheelBets(INIT_BETS_STATE)
    })
    socket.on('wheel_history', (data: possibleBets[]) => {
      setHistory(data)
    })
    socket.on('wheel_end', ({ roll }: { roll: IWinTicket }) => {
      setWonTicket(roll.color === 'gold' ? { ...roll, color: possibleBets.YELLOW } : roll)
    })
    socket.on('add_wheel_bets', (data: WheelBetRecord) => {
      setWheelBets(data)
    })
    socket.on('add_wheel', (data: IIWheelBet) => {
      const { color } = data
      setWheelBets((prev) => {
        if (prev) {
          return {
            ...prev,
            [color === 'gold' ? possibleBets.YELLOW : color]: [
              ...prev[color === 'gold' ? possibleBets.YELLOW : color],
              color === 'gold' ? { ...data, color: possibleBets.YELLOW } : data
            ]
          }
        }
        return prev
      })
    })
    return () => {
      socket.off('load_wheel')
      socket.off('wheel_history')
      socket.off('wheel_end')
      socket.off('add_wheel_bets')
      socket.off('add_wheel')
    }
  }, [])

  return (
    <WheelContext.Provider
      value={{
        history,
        setHistory,
        wheelBets,
        timer,
        setTimer,
        wonTicket
      }}
    >
      {children}
    </WheelContext.Provider>
  )
}
