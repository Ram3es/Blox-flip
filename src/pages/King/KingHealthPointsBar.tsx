import { forwardRef, useMemo } from 'react'

import clsx from 'clsx'

import TextHealthPointsBar from '../../components/common/TextHealthPointsBar'

interface KingHealthPointsBarProps {
  isKing: boolean
  currentHP: number
  maxHP?: number
}

const KingHealthPointsBar = forwardRef<HTMLDivElement, KingHealthPointsBarProps>(
  ({ isKing, currentHP, maxHP = 4000 }, ref) => {
    const healthPointBarWidth = useMemo(() => Math.sign(currentHP) === 1 ? (currentHP / maxHP) * 100 : 0, [currentHP])

    const healthPointClasses = clsx('flex', {
      'justify-end': !isKing
    })
    const healthPointBarContainerClasses = clsx('max-w-[280px] border rounded p-0.5 bg-black', {
      'border-yellow-primary-accent': isKing,
      'border-red-primary ls:ml-auto': !isKing
    })
    const healthPointBarWrapperClasses = clsx('bg-black rounded relative flex', {
      'flex-row-reverse': !isKing
    })
    const healthPointBarClasses = clsx('h-2.5 rounded-sm text-xs', {
      'gradient--background--yellow__fourth': isKing,
      'bg-red-primary': !isKing
    })
    const healthPointBarRemainderClasses = clsx('h-2.5 rounded-sm', {
      'bg-yellow-700/70': isKing,
      'bg-red-primary/40 ml-auto': !isKing
    })

    return (
      <div className='space-y-2'>
        <div className={healthPointClasses}>
          <TextHealthPointsBar currentHealthPoints={currentHP} maxHealthPoints={maxHP} />
        </div>
        <div className={healthPointBarContainerClasses}>
          <div className={healthPointBarWrapperClasses}>
            <div className={healthPointBarClasses} style={{ width: `${healthPointBarWidth}%` }} />
            <div ref={ref} className={healthPointBarRemainderClasses} />
          </div>
        </div>
      </div>
    )
  }
)

KingHealthPointsBar.displayName = 'KingHealthPointsBar'

export default KingHealthPointsBar
