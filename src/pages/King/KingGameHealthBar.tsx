import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'

interface KingGameHealthBarProps {
  values: number[]
  position: 'left' | 'right'
  isKing?: boolean
}

const KingGameHealthBar = ({ values, position, isKing }: KingGameHealthBarProps) => {
  const maxHealthPoints = useMemo(() => values.reduce((a, b) => a + b, 0), [values])

  const [currentHealthPoints, setCurrentHealthPoints] = useState(maxHealthPoints)
  const [timeToStartEffect, setTimeToStartEffect] = useState<number>(20)

  const healthPointBarRef = useRef<HTMLDivElement>(null)
  const healthPointBarRemainderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentHealthPoints(maxHealthPoints)
  }, [values])

  const healthPointBarWidth = (currentHealthPoints / maxHealthPoints) * 100

  for (let i = 0; i < values.length; i++) {
    const item = values[i]
    console.log((item / maxHealthPoints) * 100)
  }

  const healthPointClasses = clsx('', {
    'flex justify-end': position === 'right'
  })

  const healthPointBarContainerClasses = clsx('max-w-[280px] border rounded p-0.5 bg-black', {
    'ml-auto': position === 'right',
    'border-yellow-primary-accent': isKing,
    'border-gray-primary': !isKing
  })

  const healthPointBarClasses = clsx('h-2.5 rounded-sm text-xs flex items-center justify-end', {
    'ml-auto': position === 'right',
    'gradient--background--yellow__fourth': isKing,
    'bg-gray-primary': !isKing
  })

  const healthPointBarRemainderClasses = 'h-2.5 bg-yellow-700/70 rounded-sm'

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeToStartEffect((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(countdown)
          return 0
        }

        if (prevTimer % 5 === 0) {
          setCurrentHealthPoints((prev) => prev - values[0])
          healthPointBarRemainderRef.current.style.width = `${25}%`
          setTimeout(() => {
            healthPointBarRemainderRef.current.style.width = '0%'
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
        <div className='bg-black rounded relative'>
          <div className='flex items-center justify-start w-full'>
            <div
              ref={healthPointBarRef}
              className={healthPointBarClasses}
              style={{ width: `${healthPointBarWidth + 2}%` }}
            />
            <div ref={healthPointBarRemainderRef} className={healthPointBarRemainderClasses} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default KingGameHealthBar
