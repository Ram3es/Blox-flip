import { useEffect, useMemo, useRef, useState } from 'react'

import clsx from 'clsx'

interface KingGameHealthBarProps {
  values: number[]
  isKing?: boolean
}

const KingGameHealthBar = ({ values, isKing }: KingGameHealthBarProps) => {
  const maxHealthPoints = useMemo(() => values.reduce((a, b) => a + b, 0), [values])

  const [currentHealthPoints, setCurrentHealthPoints] = useState(100)
  const [timeToStartEffect, setTimeToStartEffect] = useState<number>(20)

  const healthPointBarRef = useRef<HTMLDivElement>(null)
  const healthPointBarRemainderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentHealthPoints(maxHealthPoints)
  }, [values])

  const healthPointBarWidth = (currentHealthPoints / maxHealthPoints) * 100

  const healthPointClasses = clsx('flex', {
    'justify-end': !isKing
  })

  const healthPointBarContainerClasses = clsx('max-w-[280px] border rounded p-0.5 bg-black', {
    'border-yellow-primary-accent': isKing,
    'border-red-primary ml-auto': !isKing
  })

  const healthPointBarWrapperClasses = clsx('bg-black rounded relative flex', {
    'flex-row-reverse': !isKing
  })

  const healthPointBarClasses = clsx('h-2.5 rounded-sm text-xs', {
    'gradient--background--yellow__fourth': isKing,
    'bg-red-primary': !isKing
  })

  const healthPointBarRemainderClasses = clsx('h-2.5', {
    'bg-yellow-700/70 rounded-r-sm': isKing,
    'bg-red-primary/40 rounded-l-sm ml-auto': !isKing
  })

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeToStartEffect((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(countdown)
          return 0
        }

        if (prevTimer % 5 === 0) {
          setCurrentHealthPoints((prev) => prev - values[0])

          if (healthPointBarRef.current && healthPointBarRemainderRef.current) {
            healthPointBarRemainderRef.current.style.width = `${25}%`

            healthPointBarRef.current.style.borderTopRightRadius = '0rem'
            healthPointBarRef.current.style.borderBottomRightRadius = '0rem'
          }

          setTimeout(() => {
            if (healthPointBarRef.current && healthPointBarRemainderRef.current) {
              healthPointBarRemainderRef.current.style.width = '0%'

              healthPointBarRef.current.style.borderTopRightRadius = '0.125rem'
              healthPointBarRef.current.style.borderBottomRightRadius = '0.125rem'
            }
          }, 2000)
        }

        return prevTimer - 1
      })
    }, 1000)

    return () => {
      clearInterval(countdown)
    }
  }, [])

  return (
    <div className='space-y-2'>
      <div className={healthPointClasses}>
        <span className='font-bold text-sm'>
          {currentHealthPoints} / <span className='text-white/50'>{maxHealthPoints} HP</span>
        </span>
      </div>
      <div className={healthPointBarContainerClasses}>
        <div className={healthPointBarWrapperClasses}>
          <div
            ref={healthPointBarRef}
            className={healthPointBarClasses}
            style={{ width: `${healthPointBarWidth}%` }}
          />
          <div ref={healthPointBarRemainderRef} className={healthPointBarRemainderClasses} />
        </div>
      </div>
    </div>
  )
}

export default KingGameHealthBar
