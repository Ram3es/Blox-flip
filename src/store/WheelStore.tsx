import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useSocketCtx } from './SocketStore'
import { IIWheelBet, ILoadWheelRes, IWinTicket, WheelBetRecord, possibleBets } from '../types/Wheel'
import { getTimerValue } from '../helpers/wheelHelpers'
import { DELAY, INIT_BETS_STATE, RALL_TIME } from '../constants/wheel'

interface WheelProviderProps {
  children: ReactNode
}

export interface IWheelContext {
  isStart: boolean
  history: possibleBets[]
  wheelBets: WheelBetRecord
  timer: number
  wonTicket: IWinTicket | null
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const WheelContext = createContext<IWheelContext>({} as IWheelContext)

export const useWheel = () => {
  return useContext(WheelContext)
}

let interval: ReturnType<typeof setInterval>

export const WheelProvider = ({ children }: WheelProviderProps) => {
  const [isStart, setIsStart] = useState(false)
  const [history, setHistory] = useState<possibleBets[]>([])
  const [wheelBets, setWheelBets] = useState<WheelBetRecord>(INIT_BETS_STATE)
  const [timer, setTimer] = useState<number>(0)
  const [wonTicket, setWonTicket] = useState<IWinTicket | null>(null)

  const { socket } = useSocketCtx()

  useEffect(() => {
    socket.emit('wheel:connect')

    socket.emit('load_wheel_wagers', (data: WheelBetRecord) => {
      setWheelBets(data)
    })

    socket.on('load_wheel', (data: ILoadWheelRes) => {
      const timerValue = getTimerValue(data.time, DELAY)
      if (timerValue >= 0) {
        setTimer(timerValue)
      }
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
      setWheelBets((prev: WheelBetRecord) => {
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

  useEffect(() => {
    clearInterval(interval)
    if (timer) {
      interval = setInterval(() => setTimer((prev) => prev && prev - 1), 1000)
    }

    if (timer === 0 && !isStart && wonTicket) {
      setIsStart(true)
      setTimeout(() => {
        setIsStart(false)
        setHistory((prev) => [...prev, wonTicket.color === 'gold' ? possibleBets.YELLOW : wonTicket?.color])
        setWonTicket(null)
      }, RALL_TIME)
    }
    return () => clearInterval(interval)
  }, [timer, isStart, wonTicket])

  return (
    <WheelContext.Provider
      value={{
        isStart,
        history,
        wheelBets,
        timer,
        wonTicket
      }}
    >
      {children}
    </WheelContext.Provider>
  )
}
