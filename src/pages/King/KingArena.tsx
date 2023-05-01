import { useEffect, useRef, useState } from 'react'
import { useKing } from '../../store/KingStore'

import KingHealthPointsBar from './KingHealthPointsBar'
import KingArenaPlayer from './KingArenaPlayer'

// import ClocksIcon from '../../components/icons/ClocksIcon'
import SwordsIcon from '../../assets/img/swords_king.svg'
import DashedSpacerIcon from '../../assets/img/dashed_spacer.png'
import ExplosionIcon from '../../assets/img/explosion_icon.png'

import {
  ROUND_DURATION,
  ROUND_DURATION_MILLISECONDS,
  TIME_EFFECT_MILLISECONDS
} from '../../constants/king'

import { getFightDuration, getPercentByDamage } from '../../helpers/kingHelpers'
import { getCostByFieldName } from '../../helpers/numbers'

import type { IKingFight } from '../../types/King'

const KingArena = () => {
  const { game, fight, setFight } = useKing()

  const [healthPointsKing, setHealthPointsKing] = useState(0)
  const [healthPointsOpponent, setHealthPointsOpponent] = useState(0)

  const [maxHealthPointsKing, setMaxHealthPointsKing] = useState(0)
  const [maxHealthPointsOpponent, setMaxHealthPointsOpponent] = useState(0)

  const swordIconRef = useRef<HTMLImageElement>(null)
  const attackTextRef = useRef<HTMLSpanElement>(null)

  const explosiveKingEffect = useRef<HTMLImageElement>(null)
  const explosiveOpponentEffect = useRef<HTMLImageElement>(null)

  const healthPointsBarKingRef = useRef<HTMLDivElement>(null)
  const healthPointsBarOpponentRef = useRef<HTMLDivElement>(null)

  const applyDirectionAttackEffect = (round: IKingFight) => {
    if (round.by === 'king') {
      if (attackTextRef.current && swordIconRef.current) {
        attackTextRef.current.style.visibility = 'visible'
        swordIconRef.current.style.rotate = '45deg'
        setTimeout(() => {
          if (swordIconRef.current && attackTextRef.current) {
            attackTextRef.current.style.visibility = 'hidden'
            swordIconRef.current.style.rotate = '0deg'
          }
        }, TIME_EFFECT_MILLISECONDS)
      }
    }
    if (round.by === 'opponent') {
      if (attackTextRef.current && swordIconRef.current) {
        attackTextRef.current.style.visibility = 'visible'
        swordIconRef.current.style.rotate = '-45deg'
        setTimeout(() => {
          if (swordIconRef.current && attackTextRef.current) {
            attackTextRef.current.style.visibility = 'hidden'
            swordIconRef.current.style.rotate = '0deg'
          }
        }, TIME_EFFECT_MILLISECONDS)
      }
    }
  }

  const applyHealthPointBarEffect = (round: IKingFight) => {
    if (round.by === 'king') {
      setHealthPointsOpponent((prevHpOpponent) => prevHpOpponent - round.damage)

      const roundPercent = getPercentByDamage(round.damage, maxHealthPointsOpponent)

      if (healthPointsBarOpponentRef.current) {
        healthPointsBarOpponentRef.current.style.width = `${roundPercent}%`

        setTimeout(() => {
          if (healthPointsBarOpponentRef.current) {
            healthPointsBarOpponentRef.current.style.width = '0%'
          }
        }, 2000)
      }
    }
    if (round.by === 'opponent') {
      setHealthPointsKing((prevHpKing) => prevHpKing - round.damage)

      const roundPercent = getPercentByDamage(round.damage, maxHealthPointsKing)

      if (healthPointsBarKingRef.current) {
        healthPointsBarKingRef.current.style.width = `${roundPercent}%`

        setTimeout(() => {
          if (healthPointsBarKingRef.current) {
            healthPointsBarKingRef.current.style.width = '0%'
          }
        }, TIME_EFFECT_MILLISECONDS)
      }
    }
  }

  const applyExplosiveEffect = (round: IKingFight) => {
    if (round.by === 'king') {
      if (explosiveOpponentEffect.current) {
        explosiveOpponentEffect.current.style.visibility = 'visible'

        setTimeout(() => {
          if (explosiveOpponentEffect.current) {
            explosiveOpponentEffect.current.style.visibility = 'hidden'
          }
        }, TIME_EFFECT_MILLISECONDS)
      }
    }
    if (round.by === 'opponent') {
      if (explosiveKingEffect.current) {
        explosiveKingEffect.current.style.visibility = 'visible'

        setTimeout(() => {
          if (explosiveKingEffect.current) {
            explosiveKingEffect.current.style.visibility = 'hidden'
          }
        }, TIME_EFFECT_MILLISECONDS)
      }
    }
  }

  const startGame = (fightPath: IKingFight[]) => {
    for (let index = 0; index < fightPath.length; index++) {
      const round = fightPath[index]

      setTimeout(() => {
        applyDirectionAttackEffect(round)
        applyExplosiveEffect(round)
        applyHealthPointBarEffect(round)
      }, ROUND_DURATION_MILLISECONDS * index)
    }
  }

  useEffect(() => {
    if (game.firstPlayer) {
      const kingMaxHealthPoints = getCostByFieldName(game.firstPlayer.items, 'price')

      setHealthPointsKing(kingMaxHealthPoints)
      setMaxHealthPointsKing(kingMaxHealthPoints)
    }
    if (game.secondPlayer) {
      const opponentMaxHealthPoints = getCostByFieldName(game.secondPlayer.items, 'price')

      setHealthPointsOpponent(opponentMaxHealthPoints)
      setMaxHealthPointsOpponent(opponentMaxHealthPoints)
    }
  }, [game])

  useEffect(() => {
    if (!fight) return

    const fightDurationMilliseconds = getFightDuration(ROUND_DURATION, fight.length) * 1000

    setTimeout(() => {
      setFight(null)
    }, fightDurationMilliseconds)

    startGame(fight)
  }, [fight])

  return (
    <div className='p-4 ls:p-0 gradient-background--yellow__secondary h-full rounded-xl flex flex-col ls:flex-row ls:justify-between xxs:items-center ls:items-stretch w-full gap-4 xs:gap-0'>
      <div className='relative space-y-2 ls:space-y-0'>
        <KingArenaPlayer user={game.firstPlayer} isKing />
        <img
          ref={explosiveKingEffect}
          className='absolute ls:bottom-20 ls:right-28 xs:bottom-6 xs:left-[-2rem] bottom-24 left-12 z-100'
          style={{ visibility: 'hidden' }}
          src={ExplosionIcon}
          alt='explosion'
        />
        <div className='ls:pt-8 ls:pl-8 ls:pb-7 w-full'>
          <KingHealthPointsBar
            isKing
            ref={healthPointsBarKingRef}
            currentHP={healthPointsKing}
            maxHP={maxHealthPointsKing}
          />
        </div>
      </div>

      <img className='hidden ls:block' src={DashedSpacerIcon} alt='dashed spacer' />

      <div className='relative flex items-center justify-center gap-2 py-2 ls:py-0'>
        {/* <ClocksIcon />
        <div className='text-white font bold text-xl w-11'>{timer}s</div> */}
        {fight && (
          <span
            ref={attackTextRef}
            className='gradient-king-yellow-text font-semibold text-xl uppercase'
          >
            attack
          </span>
        )}
        <div className='h-[40px] w-[40px] ls:h-[66px] ls:w-[66px] gradient-border--yellow rounded-lg gradient-background--darkblue ls:absolute ls:bottom-[134px] p-2 flex items-center justify-center rotate-[45deg]'>
          <img ref={swordIconRef} src={SwordsIcon} className='scale-[280%] rotate-[-45deg]' />
        </div>
      </div>

      <img className='hidden ls:block' src={DashedSpacerIcon} alt='dashed spacer' />

      <div className='relative space-y-2 ls:space-y-0'>
        <KingArenaPlayer isKing={false} user={game.secondPlayer} />
        <img
          ref={explosiveOpponentEffect}
          className='absolute ls:bottom-20 ls:left-32 xs:bottom-6 xs:left-[-2rem] bottom-24 left-12 z-100'
          style={{ visibility: 'hidden' }}
          src={ExplosionIcon}
          alt='explosion'
        />
        <div className='ls:pt-8 ls:pr-8 w-full'>
          {game.secondPlayer && (
            <KingHealthPointsBar
              isKing={false}
              ref={healthPointsBarOpponentRef}
              currentHP={healthPointsOpponent}
              maxHP={maxHealthPointsOpponent}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default KingArena
