import { useEffect, useRef } from 'react'
import * as d3Shape from 'd3-shape'
import * as d3Selection from 'd3-selection'

import ClocksIcon from '../../components/icons/ClocksIcon'
import WheelRobot from '../../assets/img/WheelRobot.png'
import { getItemColorByIndex } from '../../helpers/wheelHelpers'
import RoundedArrow from '../../components/icons/RoundedArrow'
import { IWinTicket } from '../../types/Wheel'

const WheelCircle = ({ rallTime, count, ticket }: { rallTime: number, count: number, ticket?: IWinTicket }) => {
  const ref = useRef<SVGSVGElement>(null)

  const start = (ticket: number): void => {
    if (ref?.current?.style) {
      ref.current.style.transform = 'rotate(0deg)'
      ref.current.style.transitionDuration = `${0}s`
    }
    setTimeout(() => {
      if (ref?.current?.style) {
        ref.current.style.transform = `rotate(${
          -360 * 4 - 180 - 360 * (1 / 108) - 360 * (ticket / 54)
        }deg)`
        ref.current.style.transitionTimingFunction = 'ease-out'
        ref.current.style.transitionDuration = `${rallTime / 1000}s`
      }
    }, 10)
  }

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    if (ticket) start(ticket.num)
  }, [ticket])

  return (
    <>
      <div
        className='relative flex w-full min-h-[500px] xl:w-[600px] 2xl:w-auto justify-center'
      >
        <div className='transform absolute ls:relative left-1/2 top-1/2 ls:left-0 ls:top-0 -translate-x-1/2 -translate-y-1/2 ls:translate-y-0 ls:translate-x-0 xl:scale-75 scale-50 2xl:scale-100 wheel-wrapper p-3 rounded-full'>
          <svg ref={ref} width="680" height="680">
            <defs>
              <linearGradient id="MaxWinGradient">
                <stop offset="25%" stopColor="#FE4747" />
                <stop offset="95%" stopColor="#FFC700" />
              </linearGradient>
            </defs>
          </svg>
          <div className='absolute bottom-[5.5px] left-1/2 transform -translate-x-1/2 w-1 h-6 bg-white rounded-3xl'>
            <RoundedArrow classes='absolute -right-5 -top-4 transform rotate-[125deg]' />
            <RoundedArrow classes='absolute -left-5 -top-4 transform rotate-[55deg]'/>
            <RoundedArrow classes='absolute -right-5 -bottom-4 transform -rotate-[125deg]' />
            <RoundedArrow classes='absolute -left-5 -bottom-4 transform -rotate-[55deg]' />
          </div>
          <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient--blue-darken pr-4 py-3 pl-16 flex flex-col gap-1 items-center'>
            <div className='flex gap-1 items-center'>
              <ClocksIcon />
              <div className='text-white text-[22px] w-11'>{count}s</div>
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
    </>
  )
}

export default WheelCircle
