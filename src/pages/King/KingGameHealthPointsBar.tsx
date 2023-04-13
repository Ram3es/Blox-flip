import { useEffect, useMemo, useRef, useState } from 'react'

import clsx from 'clsx'

import TextHealthPointsBar from '../../components/common/TextHealthPointsBar'

interface KingGameHealthPointsBarProps {
  values: number[]
  isKing: boolean
}

const KingGameHealthPointsBar = ({ values, isKing }: KingGameHealthPointsBarProps) => {
  const [currentHealthPoints, setCurrentHealthPoints] = useState(100)
  const [timeToStartEffect, setTimeToStartEffect] = useState<number>(20)

  console.log(timeToStartEffect, '<<<<<timeToStartEffect')

  const healthPointBarRef = useRef<HTMLDivElement>(null)
  const healthPointBarRemainderRef = useRef<HTMLDivElement>(null)

  const maxHealthPoints = useMemo(() => values.reduce((a, b) => a + b, 0), [values])
  const healthPointBarWidth = useMemo(
    () => (currentHealthPoints / maxHealthPoints) * 100,
    [currentHealthPoints]
  )

  const setBorderByKingVariable = (isKing: boolean, value: string): void => {
    if (isKing && healthPointBarRef.current) {
      healthPointBarRef.current.style.borderTopRightRadius = value
      healthPointBarRef.current.style.borderBottomRightRadius = value
    }
    if (!isKing && healthPointBarRef.current) {
      healthPointBarRef.current.style.borderTopLeftRadius = value
      healthPointBarRef.current.style.borderBottomLeftRadius = value
    }
  }

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
    setCurrentHealthPoints(maxHealthPoints)
  }, [values])

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
            setBorderByKingVariable(isKing, '0rem')
          }

          setTimeout(() => {
            if (healthPointBarRef.current && healthPointBarRemainderRef.current) {
              healthPointBarRemainderRef.current.style.width = '0%'
              setBorderByKingVariable(isKing, '0.125rem')
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
        <TextHealthPointsBar
          currentHealthPoints={currentHealthPoints}
          maxHealthPoints={maxHealthPoints}
        />
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

export default KingGameHealthPointsBar
