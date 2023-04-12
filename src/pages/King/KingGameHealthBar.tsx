import clsx from 'clsx'

interface KingGameHealthBarProps {
  values: number[]
  position: 'left' | 'right'
  isKing?: boolean
}

const KingGameHealthBar = ({ values, position, isKing }: KingGameHealthBarProps) => {
  const maxHP = values.reduce((a, b) => a + b, 0)

  const healthPointBarWidth = (values[0] / maxHP) * 100
  const healthPointClasses = clsx('', {
    'flex justify-end': position === 'right'
  })
  const healthPointBarClasses = clsx('h-2.5 rounded-sm text-xs  flex items-center justify-center', {
    'ml-auto': position === 'right',
    'gradient--background--yellow__fourth': isKing,
    'bg-gray-primary': !isKing
  })
  const healthPointBarContainerClasses = clsx('max-w-[280px] border  rounded p-0.5 bg-black', {
    'ml-auto': position === 'right',
    'border-yellow-primary-accent': isKing,
    'border-gray-primary': !isKing
  })

  return (
    <div className='space-y-2'>
      <div className={healthPointClasses}>
        <span className='font-bold text-sm'>
          {values[0]} / <span className='text-white/50'>{maxHP} HP</span>
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

export default KingGameHealthBar
