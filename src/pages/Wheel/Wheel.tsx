import { useEffect, useState } from 'react'
import { wheelBets } from '../../mocks/wheelBets'
import { IWheelBetHistory, IWheelGameHistory, possibleBets } from '../../types/Wheel'
import WheelBetPeacker from './WheelBetPeacker'
import WheelCircle from './WheelCircle'
import WheelGamesHistory from './WheelGamesHistory'
import WheelBetActions from './WheelBetActions'

const RALL_TIME = 1500
let interval: any

const Wheel = () => {
  const [lastTwentyGames, setLastTwentyGames] = useState<IWheelGameHistory[]>([])
  const [lastThousandBets, setLastThousandBets] = useState<IWheelBetHistory[]>([])
  const [timer, setTimer] = useState<number>(30)
  const [wonTicket, setWonTicket] = useState<number>()

  const setHistoryData = () => {
    setLastTwentyGames(() => Array.from({ length: 20 }, (_, i) => ({ ticket: Math.floor(Math.random() * 54), gameId: i })))
    setLastThousandBets(() => Array.from({ length: 100 }, (_, i) => {
      const keys = Object.keys(possibleBets)
      return { betColor: possibleBets[keys[Math.floor(Math.random() * 4)] as keyof typeof possibleBets] as possibleBets, betId: i }
    }))
  }

  const addGameToLastTwenty = (wonTicket: number) => {
    const newGameId = Math.floor(Math.random() * 10000)
    setLastTwentyGames(prevArray => {
      const newArray = [...prevArray]
      newArray.unshift({ ticket: wonTicket, gameId: newGameId })
      newArray.pop()
      return newArray
    })
  }

  const peackBet = (color: possibleBets) => {
    console.log('bet: ', color)
  }

  useEffect(() => {
    setHistoryData()
    return () => {
      clearInterval(interval)
      interval = undefined
    }
  }, [])

  useEffect(() => {
    if (timer === 0) {
      const t = Math.floor(Math.random() * 54)
      clearInterval(interval)
      console.log(interval)
      setWonTicket(t)
      setTimeout(() => {
        interval = undefined
        setTimer(30)
      }, 2000)
    } else if (!interval) {
      interval = setInterval(() => {
        setTimer((timer) => {
          return timer - 1
        })
      }, 1000)
    }
  }, [timer])

  useEffect(() => {
    if (wonTicket) {
      const timerId = setTimeout(() => {
        addGameToLastTwenty(wonTicket)
      }, RALL_TIME)
      return () => clearTimeout(timerId)
    }
  }, [wonTicket])

  return (
    <div className='w-1190 max-w-[100%] mx-auto flex flex-col gap-9'>
      <div className='flex flex-col sm:flex-row xl:items-stretch items-center gap-12 w-full'>
        <WheelGamesHistory gamesHistory={lastTwentyGames ?? []} betsHistory={lastThousandBets ?? []} />
        <WheelCircle rallTime={RALL_TIME} ticket={wonTicket} count={timer} />
          <WheelBetActions />
      </div>
      <WheelBetPeacker onPeack={peackBet} bets={wheelBets} />
    </div>
  )
}

export default Wheel
