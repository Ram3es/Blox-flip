import { useEffect, useMemo, useRef, useState } from 'react'
import { useKing } from '../../store/KingStore'

import KingGamePlayer from './KingGamePlayer'

import ClocksIcon from '../../components/icons/ClocksIcon'
import SwordsIcon from '../../assets/img/swords_king.svg'
import DashedSpacerIcon from '../../assets/img/dashed_spacer.png'
import ExplosionIcon from '../../assets/img/explosion_icon.png'

const KingGameArena = () => {
  const { fight, setFight } = useKing()

  const [timer, setTimer] = useState<number>(20)
  console.log(fight, 'fight')

  const roundDuration = 5

  const getFightDuration = (roundDuration: number, fightRounds: number): number => {
    return roundDuration * fightRounds
  }

  const swordIconRef = useRef<HTMLImageElement>(null)
  const explosiveKingEffect = useRef<HTMLImageElement>(null)
  const explosiveOpponentEffect = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (fight) {
      setTimer(getFightDuration(roundDuration, fight.length))

      const fightDurationMilliseconds = getFightDuration(roundDuration, fight.length) * 1000 + 10000

      console.log('fightDurationMilliseconds', fightDurationMilliseconds)

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

    if (timer % 5 === 0 && timer % 10 !== 0) {
      for (let index = 0; index < opponentRounds.length; index++) {
        if (explosiveOpponentEffect.current) {
          explosiveOpponentEffect.current.style.visibility = 'visible'
        }
        setTimeout(() => {
          if (explosiveOpponentEffect.current) {
            explosiveOpponentEffect.current.style.visibility = 'hidden'
          }
        }, 2000)
      }
    } else if (timer % 10 === 0) {
      for (let index = 0; index < kingRounds.length; index++) {
        if (explosiveKingEffect.current) {
          explosiveKingEffect.current.style.visibility = 'visible'
          setTimeout(() => {
            if (explosiveKingEffect.current) {
              explosiveKingEffect.current.style.visibility = 'hidden'
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
    <div className='gradient-background--yellow__secondary rounded-xl flex flex-col ls:flex-row ls:justify-between xxs:items-center ls:items-stretch h-full ls:h-44 w-full gap-4 xs:gap-0 p-16 ls:p-0'>
      <KingGamePlayer isKing  />

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

      <KingGamePlayer isKing={false}  />
    </div>
  )
}

export default KingGameArena
