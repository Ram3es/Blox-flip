import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as d3Shape from 'd3-shape'
import * as d3Selection from 'd3-selection'
import JackpotArrow from '../../components/icons/JackpotArrow'
import strippedBg from '../../assets/img/stripped-circle-bg.png'
import JackpotWheelInfo from './JackpotWheelInfo'
import CircularProgressBar from '../../components/common/CIrcularProgressBar'
import GreenVector from '../../components/icons/GreenVector'
import { getAngleTilt, getColorByIndex } from '../../helpers/jackpotHelpers'
import { IRootJackpotNew } from '../../types/Jackpot'
import { JACKPOT_ROLLING_TIME_SECONDS } from '../../constants/jackpot'
import { useJackpot } from '../../store/JackpotStore'
import { useSocketCtx } from '../../store/SocketStore'

interface IJackpotWheelProps {
  jackPot: number
  joinedUsers: IRootJackpotNew[]
}

const JackpotWheel: FC<IJackpotWheelProps> = ({ jackPot, joinedUsers }) => {
  const [data, setData] = useState<Array<d3Shape.PieArcDatum<number | {
    valueOf: () => number
  }>>>([])

  const { socket } = useSocketCtx()
  const { timer, winner, setTimer } = useJackpot()

  const refSvg = useRef<SVGSVGElement>(null)
  const refInterval = useRef<ReturnType<typeof setInterval>>()

  const convertToProgress = (time: number): number => (60 - time) * 1.67

  const generatePieData = useMemo(() => {
    return joinedUsers.map((player) => {
      return { num: Math.ceil((player.wager / jackPot) * 100), image: player.user.avatar }
    })
  }, [joinedUsers.length, jackPot])

  const start = useCallback(
    (ticket: number): void => {
      let winDegrees = 0
      if (data.length) {
        winDegrees = getAngleTilt(data[ticket])
      }
      if (refSvg?.current?.style) {
        refSvg.current.style.transform = 'rotate(0deg)'
        refSvg.current.style.transitionDuration = `${0}s`
      }
      setTimeout(() => {
        if (refSvg?.current?.style) {
          refSvg.current.style.transform = `rotate(${-360 * 4 - winDegrees}deg)`
          refSvg.current.style.transitionTimingFunction = 'ease-out'
          refSvg.current.style.transitionDuration = `${JACKPOT_ROLLING_TIME_SECONDS}s`
        }
      }, 10)
    },
    [data]
  )

  useEffect(() => {
    refInterval.current && clearInterval(refInterval.current)
    if (winner) {
      start(joinedUsers.findIndex((item) => (item.user.id).toString() === winner?.winner.id))
      setTimeout(() => socket.emit('load_jackpot', { id: 1 }), 8000)
      return
    }
    if (timer) {
      refInterval.current = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
    }
  }, [timer, data, winner])

  useEffect(() => {
    if (refSvg.current) {
      const width = 224
      const radius = 174
      const pie = d3Shape.pie().sortValues(() => 0)
      const pieData = pie(generatePieData.map((val) => val.num))

      setData(pieData)

      const arc = d3Shape.arc().innerRadius(radius).outerRadius(width)

      const whiteArc = d3Shape.arc().innerRadius(198).outerRadius(width)

      const svg = d3Selection.select(refSvg.current)

      svg.selectAll('.arc').remove()

      const g = svg.selectAll('.arc').data(pieData).enter().append('g').attr('class', 'arc')

      g.append('path')
        .attr('d', arc as unknown as string)
        .attr('fill', (d, i) => getColorByIndex(i).arcColor)
        .attr('transform', `translate(${width}, ${width})`)

      g.append('path')
        .attr('d', whiteArc as unknown as string)
        .attr('fill', 'rgba(255, 255, 255, 0.08)')
        .attr('transform', `translate(${width}, ${width})`)

      g.append('g')
        .attr('transform', (d: any) => `translate(${arc.centroid(d)[0] + width}, ${arc.centroid(d)[1] + width} )`)
        .append('circle')
        .attr('r', 20)
        .attr('stroke-width', 3)
        .attr('stroke', (d, i) => getColorByIndex(i).stroke)

      g.append('svg:image')
        .attr(
          'transform',
          (d: any) =>
            `translate(${arc.centroid(d)[0] + width}, ${arc.centroid(d)[1] + width} ) rotate(${getAngleTilt(d)} 0 0)`
        )
        .attr('xlink:href', (d, i) => generatePieData[i].image)
        .attr('width', 40)
        .attr('height', 40)
        .attr('x', (-1 * 40) / 2)
        .attr('y', (-1 * 40) / 2)
        .attr('clip-path', 'circle(50%)')
    }
  }, [generatePieData])

  return (
    <div>
      <div
        style={{ boxShadow: '0px 0px 250px rgba(117, 83, 255, 0.32)' }}
        className="rounded-full p-2 bg-[#1F2438] border-[2px] border-[#191F34] relative "
      >
        <div className="w-[480px] h-[480px] bg-[#0E1327] rounded-full relative flex items-center justify-center bg-gradient-radial-60 from-green-primary/5 to-dark/0">
          <div
            style={{ background: `url(${strippedBg})` }}
            className="bg-cover w-[290px] h-[280px] flex items-center justify-center"
          >
            <JackpotWheelInfo jackPot={jackPot} />
          </div>
          <svg ref={refSvg} width={448} height={448} className="absolute m-auto inset-0" />
          <CircularProgressBar
            progress={convertToProgress(timer ?? 0)}
            wrapClasses="w-[328px] h-[328px] absolute inset m-auto"
          />
        </div>
        <JackpotArrow iconClasses="absolute top-0 left-[calc(50%-43px)]" />
        <GreenVector iconClasses="text-green-primary absolute top-2.5 left-[calc(50%-17px)]" />
      </div>
    </div>
  )
}

export default JackpotWheel
