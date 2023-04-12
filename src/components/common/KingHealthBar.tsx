import clsx from 'clsx'

interface KingHealthBarProps {
  value: number
  max: number
  position: 'left' | 'right'
}

const KingHealthBar = ({ value, max, position }: KingHealthBarProps) => {
  const healthPointBarWidth = (value / max) * 100
  const healthPointClasses = clsx('', {
    'flex justify-end': position === 'right'
  })
  const healthPointBarClasses = clsx(
    'h-2.5 rounded-sm text-xs bg-gradient-yellow flex items-center justify-center',
    {
      'ml-auto': position === 'right'
    }
  )
  const healthPointBarContainerClasses = clsx(
    'max-w-[280px] border border-yellow-primary-accent rounded p-0.5 bg-black',
    {
      'ml-auto': position === 'right'
    }
  )

  return (
    <div className='space-y-2'>
      <div className={healthPointClasses}>
        <span className='font-bold text-sm'>
          {value} / <span className='text-white/50'>{max} HP</span>
        </span>
      </div>
      <div className={healthPointBarContainerClasses}>
        <div className='bg-black rounded'>
          <div className={healthPointBarClasses} style={{ width: `${healthPointBarWidth}%` }} />
        </div>
      </div>
    </div>
  )
}

export default KingHealthBar
