import { useCallback, useEffect, useState } from 'react'
import { IIWheelBet, ILoadWheelRes, IWheelBetHistory, IWheelGameHistory, IWinTicket, possibleBets } from '../../types/Wheel'
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
  const [lastTwentyGames, setLastTwentyGames] = useState<IWheelGameHistory[]>([])
  const [lastThousandBets, setLastThousandBets] = useState<IWheelBetHistory[]>([])
  const [wheelBets, setWhellBets] = useState<WheelBetRecord>(wheelBetsMock)
  const [timer, setTimer] = useState<number>()
  const [wonTicket, setWonTicket] = useState<IWinTicket>()
  const [betAmount, setBetAmount] = useState(200)
  const [isStart, setIsStart] = useState(false)
  const { socket } = useSocketCtx()

  const setHistoryData = (data?: possibleBets[]) => {
    // setLastTwentyGames(() =>
    //   Array.from({ length: 20 }, (_, i) => ({ ticket: Math.floor(Math.random() * 54), gameId: i }))
    // )
    setLastTwentyGames(data?.slice(-20).map((color, idx) => ({ ticket: color, gameId: idx })) as [])

    setLastThousandBets(() =>
      Array.from({ length: 100 }, (_, i) => {
        const keys = Object.keys(possibleBets)
        return {
          betColor: possibleBets[
            keys[Math.floor(Math.random() * 4)] as keyof typeof possibleBets
          ] as possibleBets,
          betId: i
        }
      })
    )
  }

  const addGameToLastTwenty = (wonTicket: possibleBets) => {
    const newGameId = Math.floor(Math.random() * 10000)
    setLastTwentyGames((prevArray) => {
      const newArray = [...prevArray]
      newArray.unshift({ ticket: wonTicket, gameId: newGameId })
      newArray.pop()
      return newArray
    })
  }

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
      setHistoryData(data)
    })
    socket.on('wheel_end', ({ data }: { data: { num: number, color: possibleBets } }) => {
      setWonTicket(data)
      console.log(data)
    })
    socket.on('add_wheel_bets', ({ data }: { data: WheelBetRecord }) => {
      console.log(data, 'data')

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
    if (timer) {
      clearInterval(interval)
      interval = setInterval(() => setTimer(prev => prev && prev - 1), 1000)
    }
    if (timer === 0) {
      setIsStart(boolean => !boolean)
      setTimeout(() => {
        setIsStart(boolean => !boolean)
      }, RALL_TIME)
    }
    return () => clearInterval(interval)
  }
  , [timer])

  // useEffect(() => {
  //   // setHistoryData()
  //   return () => {
  //     clearInterval(interval)
  //     interval = undefined
  //   }
  // }, [])

  // useEffect(() => {
  //   if (timer === 0) {
  //     // const t = Math.floor(Math.random() * 54)
  //     clearInterval(interval)
  //     console.log(interval)
  //     // setWonTicket(t)
  //     setTimeout(() => {
  //       interval = undefined
  //       setTimer(30)
  //     }, 2000)
  //   } else if (!interval) {
  //     interval = setInterval(() => {
  //       setTimer((timer) => {
  //         return timer - 1
  //       })
  //     }, 1000)
  //   }
  // }, [timer])

  // useEffect(() => {
  //   if (wonTicket) {
  //     const timerId = setTimeout(() => {
  //       addGameToLastTwenty(wonTicket.color)
  //     }, RALL_TIME)
  //     return () => clearTimeout(timerId)
  //   }
  // }, [wonTicket])

  return (
    <div className='flex flex-col gap-9'>
      <div className='flex flex-col md:flex-row 2xl:gap-x-6 justify-between flex-wrap'>

          <WheelGamesHistory
            gamesHistory={lastTwentyGames ?? []}
            betsHistory={lastThousandBets ?? []}
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
