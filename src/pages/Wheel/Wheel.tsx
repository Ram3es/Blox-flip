import { useEffect, useRef, useState } from 'react'
import * as d3Shape from 'd3-shape'
import * as d3Selection from 'd3-selection'
import ClocksIcon from '../../components/icons/ClocksIcon'
import WheelRobot from '../../assets/img/WheelRobot.png'

let prevTicket = 0
let interval: any
enum possibleBets {
  BLACK = 'black',
  BLUE = 'blue',
  YELLOW = 'yellow',
  RED = 'red'
}

interface IWheelGameHistory { ticket: number, gameId: number }
interface IWheelBetHistory { betColor: possibleBets, betId: number }

const Wheel = () => {
  const ref = useRef<SVGSVGElement>(null)
  const [lastTwentyGames, setLastTwentyGames] = useState<IWheelGameHistory[]>()
  const [lastThousandBets, setLastThousandBets] = useState<IWheelBetHistory[]>()
  const [count, setCount] = useState<number>(30)

  const setHistoryData = () => {
    setLastTwentyGames(() => Array.from({ length: 20 }, (_, i) => ({ ticket: Math.floor(Math.random() * 54), gameId: i })))
    setLastThousandBets(() => Array.from({ length: 100 }, (_, i) => {
      const keys = Object.keys(possibleBets)
      return { betColor: possibleBets[keys[Math.floor(Math.random() * 4)] as keyof typeof possibleBets] as possibleBets, betId: i }
    }))
    console.log(lastThousandBets)
  }

  const start = (ticket: number, time: number): void => {
    if (ref?.current?.style) {
      ref.current.style.transform = `rotate(${
        (1 / 108) - 360 * (prevTicket / 54)
      }deg)`
      ref.current.style.transitionTimingFunction = 'ease-out'
      ref.current.style.transitionDuration = `${0}s`
    }
    setTimeout(() => {
      if (ref?.current?.style) {
        ref.current.style.transform = `rotate(${
          -360 * 4 - 180 - 360 * (1 / 108) - 360 * (ticket / 54)
        }deg)`
        ref.current.style.transitionTimingFunction = 'ease-out'
        ref.current.style.transitionDuration = `${time / 1000}s`
      }
      setTimeout(() => {
        if (lastTwentyGames) {
          setLastTwentyGames(array => {
            if (array) {
              array.unshift({ ticket, gameId: Math.floor(Math.random() * 10000) })
              array.pop()
              return array
            } else {
              setLastTwentyGames([{ ticket, gameId: Math.floor(Math.random() * 10000) }])
            }
          })
        }
      }, time)
      prevTicket = ticket
    }, 10)
  }

  const getItemColorByIndex = (ticket: number, isForSvg: boolean): string => {
    if (ticket === 0) {
      return isForSvg ? 'url(#MaxWinGradient)' : 'linear-gradient(90deg, #FE4747 25%, #FFC700 95%)'
    } else if (ticket % 2 === 0) {
      return '#596180'
    } else if ([1, 9, 11, 19, 21, 33, 35, 43, 45, 53].includes(ticket)) {
      return '#4764D6'
    }
    return '#E1B850'
  }

  useEffect(() => {
    setHistoryData()
    if (ref.current) {
      const data = Array.from({ length: 54 }, () => 1)
      const width = 340
      const radius = width - 10

      const color = data.map((_, index) => getItemColorByIndex(index, true))

      const pie = d3Shape.pie()

      const arc = d3Shape.arc()
        .innerRadius(radius)
        .outerRadius(width)
        .padAngle(0.1)
        .padRadius(100)
        .cornerRadius(7)

      const pieData = pie(data)
      const svg = d3Selection.select(ref.current)

      svg.selectAll('path')
        .data(pieData)
        .enter()
        .append('path')
        .attr('d', arc as unknown as string)
        .attr('fill', (d, i) => color[i])
        .attr('transform', `translate(${width}, ${width})`)
    }
    return () => {
      clearInterval(interval)
      interval = undefined
    }
  }, [])

  useEffect(() => {
    if (count === 0) {
      clearInterval(interval)
      start(Math.floor(Math.random() * 54), 1500)
      setTimeout(() => {
        interval = undefined
        setCount(30)
      }, 2000)
    } else if (!interval) {
      interval = setInterval(() => {
        console.log('here', interval)
        setCount((count) => {
          return count - 1
        })
      }, 1000)
    }
  }, [count])

  return (
    <div className='max-w-1190 flex items-stretch mx-auto gap-12'>
        <div className='flex gap-4'>
          <div className='flex flex-col gap-2'>
            <div>
              Last 20
            </div>
            {lastTwentyGames?.map(game => (
              <div
                key={`lats-20-games-${game.gameId}`}
                className="w-6 h-2 rounded-full"
                style={{ background: getItemColorByIndex(game.ticket, false) }}
              />
            ))}
          </div>
          <div>
            <div>
              Last 10
            </div>
            {/* {lastTen.map(game => (
              <div key={`lats-20-games-${game.gameId}`} style={{ backgroundColor: getItemColorByIndex(game.ticket, false) }} />
            ))} */}
          </div>
        </div>
        <div
          className='relative p-3 rounded-full wheel-wrapper'
        >
          <svg ref={ref} width="680" height="680">
            <defs>
              <linearGradient id="MaxWinGradient">
                <stop offset="25%" stopColor="#FE4747" />
                <stop offset="95%" stopColor="#FFC700" />
              </linearGradient>
            </defs>
          </svg>
          <div className='absolute bottom-[5.5px] left-1/2 transform -translate-x-1/2 w-1 h-6 bg-white rounded-3xl'></div>
          <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient--blue-darken pr-4 py-3 pl-16 flex flex-col gap-1 items-center'>
            <div className='flex gap-1 items-center'>
              <ClocksIcon />
              <div className='text-white text-[22px]'>{count}s</div>
            </div>
            <div className='text-gray-primary uppercase text-15'>
              ROLLING IN
            </div>
            <img
              src={WheelRobot}
              alt='WheelRobot'
              width='140'
              loading='lazy'
              decoding='async'
              className='absolute z-10 -left-14 -top-11'
            />
          </div>
        </div>
    </div>
  )
}

export default Wheel
