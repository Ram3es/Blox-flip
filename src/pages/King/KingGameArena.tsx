import { useEffect, useRef, useState } from 'react'
import { useKing } from '../../store/KingStore'

import KingGamePlayer from './KingGamePlayer'

import ClocksIcon from '../../components/icons/ClocksIcon'
import SwordsIcon from '../../assets/img/swords_king.svg'
import DashedSpacerIcon from '../../assets/img/dashed_spacer.png'
import ExplosionIcon from '../../assets/img/explosion_icon.png'
import KingGameHealthPointsBar from './KingGameHealthPointsBar'

const KingGameArena = () => {
  const { fight, setFight } = useKing()

  const [timer, setTimer] = useState(0)

  const [hpKing, setHPKing] = useState(4000)
  const [hpOpponent, setHPOpponent] = useState(4000)

  const roundDuration = 5

  const getFightDuration = (roundDuration: number, fightRounds: number): number => {
    return roundDuration * fightRounds
  }

  const swordIconRef = useRef<HTMLImageElement>(null)

  const explosiveKingEffect = useRef<HTMLImageElement>(null)
  const explosiveOpponentEffect = useRef<HTMLImageElement>(null)

  const healthBarKingRef = useRef<HTMLDivElement>(null)
  const healthBarOpponentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (fight) {
      setTimer(getFightDuration(roundDuration, fight.length))

      const fightDurationMilliseconds = getFightDuration(roundDuration, fight.length) * 1000

      setTimeout(() => {
        setFight(null)
      }, fightDurationMilliseconds)
    }
  }, [fight])

  useEffect(() => {
    if (!fight) return

    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(countdown)
          return 0
        }

        return prevTimer - 1
      })
    }, 1000)

    const kingRounds = fight.filter((item) => item.by === 'king')
    const opponentRounds = fight.filter((item) => item.by === 'opponent')

    console.log('timer', timer)

    if (timer % 5 === 0 && timer % 10 !== 0 && timer !== 0) {
      setHPOpponent((prev) => prev - 1000)

      for (let index = 0; index < opponentRounds.length; index++) {
        if (explosiveOpponentEffect.current && healthBarOpponentRef.current) {
          explosiveOpponentEffect.current.style.visibility = 'visible'
          healthBarOpponentRef.current.style.width = `${25}%`
        }
        setTimeout(() => {
          if (explosiveOpponentEffect.current && healthBarOpponentRef.current) {
            explosiveOpponentEffect.current.style.visibility = 'hidden'
            healthBarOpponentRef.current.style.width = '0%'
          }
        }, 2000)
      }
    }
    if (timer % 10 === 0 && timer !== getFightDuration(roundDuration, fight.length)) {
      setHPKing((prev) => prev - 1000)

      for (let index = 0; index < kingRounds.length; index++) {
        if (explosiveKingEffect.current && healthBarKingRef.current) {
          explosiveKingEffect.current.style.visibility = 'visible'
          healthBarKingRef.current.style.width = `${25}%`

          setTimeout(() => {
            if (explosiveKingEffect.current && healthBarKingRef.current) {
              explosiveKingEffect.current.style.visibility = 'hidden'
              healthBarKingRef.current.style.width = '0%'
            }
          }, 2000)
        }
      }
    }

    return () => {
      clearInterval(countdown)
    }
  }, [fight, timer])

  return (
    <div className='gradient-background--yellow__secondary'>
      <div className='rounded-xl flex flex-col ls:flex-row ls:justify-between xxs:items-center ls:items-stretch h-full ls:h-44 w-full gap-4 xs:gap-0 ls:p-0'>
        <div>
          <KingGamePlayer isKing />
        </div>

        <img
          ref={explosiveKingEffect}
          className='absolute top-36 left-6 z-100'
          style={{ visibility: 'hidden' }}
          src={ExplosionIcon}
          alt='explosion'
        />

        <img className='hidden ls:block' src={DashedSpacerIcon} alt='dashed spacer' />

        <div className='relative flex items-center justify-center gap-2'>
          <ClocksIcon />
          <div className='text-white font bold text-xl w-11'>{timer}s</div>
          <div className='h-[40px] w-[40px] ls:h-[66px] ls:w-[66px] gradient-border--yellow rounded-lg gradient-background--darkblue ls:absolute ls:bottom-[144px] p-2 flex items-center justify-center rotate-[45deg]'>
            <img ref={swordIconRef} src={SwordsIcon} className='scale-[280%] rotate-[-45deg]' />
          </div>
        </div>

        <img className='hidden ls:block' src={DashedSpacerIcon} alt='dashed spacer' />

        <img
          ref={explosiveOpponentEffect}
          className='absolute right-80 top-36 z-100'
          style={{ visibility: 'hidden' }}
          src={ExplosionIcon}
          alt='explosion'
        />

        <KingGamePlayer isKing={false} />
      </div>
      <div className='flex items-center justify-between'>
        <div className='ls:pt-8 ls:pl-8 w-full'>
          <KingGameHealthPointsBar isKing ref={healthBarKingRef} hp={hpKing} />
        </div>
        <div className='ls:pt-8 ls:pr-8 w-full'>
          <KingGameHealthPointsBar isKing={false} ref={healthBarOpponentRef} hp={hpOpponent} />
        </div>
      </div>
    </div>
  )
}

export default KingGameArena
