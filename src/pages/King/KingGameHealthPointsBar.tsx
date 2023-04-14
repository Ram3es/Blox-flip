import { forwardRef, useMemo } from 'react'

import clsx from 'clsx'

import TextHealthPointsBar from '../../components/common/TextHealthPointsBar'

interface KingGameHealthPointsBarProps {
  isKing: boolean
  currentHP: number
  maxHP?: number
}

const KingGameHealthPointsBar = forwardRef<HTMLDivElement, KingGameHealthPointsBarProps>(
  ({ isKing, currentHP, maxHP = 4000 }, ref) => {
    const healthPointBarWidth = useMemo(() => (currentHP / maxHP) * 100, [currentHP])

    const healthPointClasses = clsx('flex', {
      'ls:justify-end': !isKing
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

KingGameHealthPointsBar.displayName = 'KingGameHealthPointsBar'

export default KingGameHealthPointsBar
