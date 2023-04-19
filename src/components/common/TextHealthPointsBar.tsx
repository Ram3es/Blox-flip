import { useMemo } from 'react'

import CountUp from 'react-countup'

interface TextHealthPointsBarProps {
  currentHealthPoints: number
  maxHealthPoints: number
}

const TextHealthPointsBar = ({
  currentHealthPoints,
  maxHealthPoints
}: TextHealthPointsBarProps) => {
  const numberFormatter = useMemo(() => (value: number) => value.toString(), [currentHealthPoints])

  return (
    <span className='font-bold text-sm'>
      <CountUp
        start={maxHealthPoints}
        end={currentHealthPoints}
        formattingFn={numberFormatter}
        duration={1.5}
        preserveValue
      />{' '}
      / <span className='text-white/50'>{maxHealthPoints} HP</span>
    </span>
  )
}
export default TextHealthPointsBar
