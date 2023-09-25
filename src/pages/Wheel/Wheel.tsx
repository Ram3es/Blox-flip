import { useCallback, useEffect, useState } from 'react'
import { possibleBets } from '../../types/Wheel'
import WheelBetPeacker from './WheelBetPeacker'
import WheelCircle from './WheelCircle'
import WheelGamesHistory from './WheelGamesHistory'
import WheelBetActions from './WheelBetActions'
import { useSocketCtx } from '../../store/SocketStore'

import { getToast } from '../../helpers/toast'
import { useWheel } from '../../store/WheelStore'
import { RALL_TIME } from '../../constants/wheel'

let interval: ReturnType<typeof setInterval>

const Wheel = () => {
  const [betAmount, setBetAmount] = useState(200)
  const [isStart, setIsStart] = useState(false)
  const { socket } = useSocketCtx()
  const { timer, setTimer, wonTicket, wheelBets, history, setHistory } = useWheel()

  const peackBet = useCallback(
    (color: possibleBets) => {
      socket.emit('wager_wheel', { color, wager: betAmount }, (response: any) => {
        getToast(response)
      })
    },
    [betAmount]
  )

  useEffect(() => {
    clearInterval(interval)
    if (timer) {
      interval = setInterval(() => setTimer((prev) => prev && prev - 1), 1000)
    }

    if (timer === 0) {
      setIsStart(true)
      setTimeout(() => {
        setIsStart(false)
        if (wonTicket) {
          setHistory((prev) => [...prev, wonTicket.color === 'gold' ? possibleBets.YELLOW : wonTicket?.color])
        }
      }, RALL_TIME)
    }
    return () => clearInterval(interval)
  }, [timer])

  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col md:flex-row 2xl:gap-x-6 justify-between flex-wrap">
        <WheelGamesHistory historyGames={history} />
        <WheelCircle rallTime={RALL_TIME} ticket={wonTicket} count={timer} isStart={isStart} />

        <div className="w-full xl:w-auto h-full">
          <WheelBetActions betAmount={betAmount} setBetAmount={setBetAmount} />
        </div>
      </div>
      <WheelBetPeacker onPeack={peackBet} bets={wheelBets} />
    </div>
  )
}

export default Wheel
