import { useEffect, useMemo, useRef, useState } from 'react'
import { useKing } from '../../store/KingStore'

import clsx from 'clsx'

import TextHealthPointsBar from '../../components/common/TextHealthPointsBar'
import { IKingFight } from '../../types/King'

interface KingGameHealthPointsBarProps {
  isKing: boolean
}

const KingGameHealthPointsBar = ({ isKing }: KingGameHealthPointsBarProps) => {
  const { fight } = useKing()

  const [currentHealthPoints, setCurrentHealthPoints] = useState(0)
  const [maximumHealthPoints, setMaximumHealthPoints] = useState(4000)

  const [timer, setTimer] = useState<number>(20)

  const healthPointBarRef = useRef<HTMLDivElement>(null)
  const healthPointBarRemainderRef = useRef<HTMLDivElement>(null)

  const getRoundsByKingVariable = (isKing: boolean, fight: IKingFight[]): number[] => {
    if (isKing) {
      return fight.filter((round) => round.by === 'king').map((round) => round.damage)
    } else {
      return fight.filter((round) => round.by === 'opponent').map((round) => round.damage)
    }
  }

  const healthPointBarWidth = useMemo(
    () => (currentHealthPoints / 4000) * 100,
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

  useEffect(() => {
    if (!fight) return

    const rounds = getRoundsByKingVariable(isKing, fight)

    setCurrentHealthPoints(4000)

    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(countdown)
          return 0
        }

        return prevTimer - 1
      })
    }, 1000)

    console.log(timer, 'timer')

    if (timer % 5 === 0) {
      setCurrentHealthPoints((prev) => prev - 1000)

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

    return () => {
      clearInterval(countdown)
    }
  }, [fight, timer])

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

  return (
    <div className='space-y-2'>
      <div className={healthPointClasses}>
        <TextHealthPointsBar
          currentHealthPoints={currentHealthPoints}
          maxHealthPoints={maximumHealthPoints}
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
