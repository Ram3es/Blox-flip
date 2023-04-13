import CountUp from 'react-countup'

interface HealthPointsBarProps {
  currentHealthPoints: number
  maxHealthPoints: number
}

const HealthPointsBar = ({ currentHealthPoints, maxHealthPoints }: HealthPointsBarProps) => {
  return (
    <span className='font-bold text-sm'>
      <CountUp start={maxHealthPoints} end={currentHealthPoints} duration={1.5} preserveValue /> /
      <span className='text-white/50'>{maxHealthPoints} HP</span>
    </span>
  )
}
export default HealthPointsBar
