import { useCallback, useEffect, useState } from 'react'
import { IIWheelBet, ILoadWheelRes, IWinTicket, possibleBets } from '../../types/Wheel'
import WheelBetPeacker from './WheelBetPeacker'
import WheelCircle from './WheelCircle'
import WheelGamesHistory from './WheelGamesHistory'
import WheelBetActions from './WheelBetActions'
import { useSocketCtx } from '../../store/SocketStore'
import { WheelBetRecord, wheelBetsMock } from '../../mocks/wheelBets'
import { getTimerValue } from '../../helpers/wheelHelpers'

const RALL_TIME = 1500
let interval: any

const Wheel = () => {
  const [historyGames, setHistory] = useState<possibleBets[]>([])
  const [wheelBets, setWhellBets] = useState<WheelBetRecord>(wheelBetsMock)
  const [timer, setTimer] = useState<number>()
  const [wonTicket, setWonTicket] = useState<IWinTicket>()
  const [betAmount, setBetAmount] = useState(200)
  const [isStart, setIsStart] = useState(false)
  const { socket } = useSocketCtx()

  const peackBet = useCallback((color: possibleBets) => {
    socket.emit('wager_wheel', { color, wager: betAmount }, (res: any) => {
      alert(JSON.stringify(res, null, 2))
    })
    console.log('bet: ', color)
  }, [betAmount])

  useEffect(() => {
    socket.emit('wheel:connect')

    socket.on('load_wheel', ({ data }: { data: ILoadWheelRes }) => {
      setTimer(getTimerValue(data.roll))
    })
    socket.on('wheel_history', ({ data }: { data: possibleBets[] }) => {
      setHistory(data)
    })
    socket.on('wheel_end', ({ data }: { data: { num: number, color: possibleBets } }) => {
      setWonTicket(data)
    })
    socket.on('add_wheel_bets', ({ data }: { data: WheelBetRecord }) => {
      setWhellBets(data)
    })
    socket.on('add_wheel', ({ data }: { data: IIWheelBet }) => {
      const { color } = data
      setWhellBets(prev => {
        if (prev) {
          return { ...prev, [color]: [...prev[color], data] }
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
      interval = setInterval(() => setTimer(prev => prev && prev - 1), 1000)
    }
    if (timer === 0) {
      setIsStart(boolean => !boolean)
      setTimeout(() => {
        setIsStart(boolean => !boolean)
        setHistory(prev => [...prev.slice(1), wonTicket?.color as possibleBets])
      }, RALL_TIME)
    }
    return () => clearInterval(interval)
  }
  , [timer])

  return (
    <div className='flex flex-col gap-9'>
      <div className='flex flex-col md:flex-row 2xl:gap-x-6 justify-between flex-wrap'>

          <WheelGamesHistory
            historyGames={historyGames}
          />
          <WheelCircle rallTime={RALL_TIME} ticket={wonTicket} count={timer} isStart={isStart} />

          <div className='w-full xl:w-auto h-full'>
            <WheelBetActions betAmount={betAmount} setBetAmount={setBetAmount} />
          </div>
      </div>
      <WheelBetPeacker onPeack={peackBet} bets={wheelBets} />
    </div>
  )
}

export default Wheel
