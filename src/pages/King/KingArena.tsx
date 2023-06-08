import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'

import KingHealthPointsBar from './KingHealthPointsBar'
import KingArenaPlayer from './KingArenaPlayer'

// import ClocksIcon from '../../components/icons/ClocksIcon'
import SwordsIcon from '../../assets/img/swords_king.svg'
import DashedSpacerIcon from '../../assets/img/dashed_spacer.png'
import ExplosionIcon from '../../assets/img/explosion_icon.png'

import {
  HEALTH_POINTS_EFFECT_MILLISECONDS,
  ROUND_DURATION,
  ROUND_DURATION_MILLISECONDS,
  TIME_EFFECT_MILLISECONDS
} from '../../constants/king'

import {
  getAnimationByWeaponKey,
  getFightDuration,
  getPercentByDamage
} from '../../helpers/kingHelpers'

import type { IKingChampion, IKingFight } from '../../types/King'

interface KingArenaProps {
  game: IKingChampion | null
  fight: IKingFight[] | null
  setFight: Dispatch<SetStateAction<IKingFight[] | null>>
}

const KingArena = ({ game, fight, setFight }: KingArenaProps) => {
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

  const animateKingRef = useRef<HTMLDivElement>(null)
  const animateOpponentRef = useRef<HTMLDivElement>(null)

  const applyDirectionAttackEffect = (round: IKingFight) => {
    const currentAnimationName = getAnimationByWeaponKey(round.weapon).toLowerCase()

    const getOpponentRefByAttacker =
      round.attacker === 'champion' ? animateKingRef : animateOpponentRef

    const animateRefs = (ref: RefObject<HTMLDivElement>) => {
      if (attackTextRef.current && swordIconRef.current && ref.current) {
        ref.current.classList.add('visible', 'king-animation', currentAnimationName)
        attackTextRef.current.style.visibility = 'visible'
        swordIconRef.current.style.rotate = round.attacker === 'champion' ? '45deg' : '-45deg'

        setTimeout(() => {
          if (swordIconRef.current && attackTextRef.current && ref.current) {
            attackTextRef.current.style.visibility = 'hidden'
            swordIconRef.current.style.rotate = '0deg'
            ref.current.classList.remove('visible', 'king-animation', currentAnimationName)
          }
        }, TIME_EFFECT_MILLISECONDS)
      }
    }

    animateRefs(getOpponentRefByAttacker)
  }

  const applyHealthPointBarEffect = (round: IKingFight) => {
    const setHealthPointsByAttacker =
      round.attacker === 'champion' ? setHealthPointsOpponent : setHealthPointsKing

    const getMaxHealthPointsByAttacker =
      round.attacker === 'champion' ? maxHealthPointsOpponent : maxHealthPointsKing

    const getCurrentRefByAttacker =
      round.attacker === 'champion' ? healthPointsBarOpponentRef : healthPointsBarKingRef

    setTimeout(() => {
      setHealthPointsByAttacker((prevHp) => prevHp - round.attack * 1000)

      const roundPercent = getPercentByDamage(round.attack * 1000, getMaxHealthPointsByAttacker)
      if (getCurrentRefByAttacker.current) {
        getCurrentRefByAttacker.current.style.width = `${roundPercent}%`

        setTimeout(() => {
          if (getCurrentRefByAttacker.current) {
            getCurrentRefByAttacker.current.style.width = '0%'
          }
        }, TIME_EFFECT_MILLISECONDS / 2)
      }
    }, HEALTH_POINTS_EFFECT_MILLISECONDS)
  }

  const applyExplosiveEffect = (round: IKingFight) => {
    const getExplosiveEffectByAttacker =
      round.attacker === 'champion' ? explosiveOpponentEffect : explosiveKingEffect

    const applyEffect = (ref: RefObject<HTMLDivElement>) => {
      if (ref.current) {
        setTimeout(() => {
          if (ref.current) {
            ref.current.style.visibility = 'visible'
          }
        }, 1500)

        setTimeout(() => {
          if (ref.current) {
            ref.current.style.visibility = 'hidden'
          }
        }, TIME_EFFECT_MILLISECONDS)
      }
    }

    applyEffect(getExplosiveEffectByAttacker)
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
    if (game?.champion) {
      setHealthPointsKing(game.champion.value * 1000)
      setMaxHealthPointsKing(game.champion.value * 1000)
    }
    if (game?.challenger) {
      setHealthPointsOpponent(game.challenger.value * 1000)
      setMaxHealthPointsOpponent(game.challenger.value * 1000)
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
    <div className='p-4 ls:p-0 gradient-background--yellow__secondary h-full rounded-xl flex flex-col items-start ls:flex-row ls:justify-between ls:items-stretch w-full gap-4 xs:gap-0'>
      <div className='flex'>
        <div className='relative space-y-2 ls:space-y-0'>
          <KingArenaPlayer player={!game || game.end === -1 ? null : game.champion} left />
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
        <div className='relative'>
          {fight && (
            <div
              ref={animateKingRef}
              className='absolute top-[250px] xs:top-[90px] -scale-x-75 ls:-top-[70%] left-0 ls:-left-20 scale-75 ls:scale-x-75 '
            />
          )}
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

      <div className='flex flex-row-reverse ls:flex-row'>
        <div className='relative mr-2'>
          {fight && (
            <div
              ref={animateOpponentRef}
              className='ml-4 absolute -top-[420px] xs:-top-[320px] ls:-top-[70%] -right-[360px] ls:-right-20 scale-75 -scale-x-75 '
            />
          )}
        </div>
        <div className='relative space-y-2 ls:space-y-0'>
          <KingArenaPlayer player={!game ? null : game.challenger} />
          <img
            ref={explosiveOpponentEffect}
            className='absolute ls:bottom-20 ls:left-32 xs:bottom-6 xs:left-[-2rem] bottom-24 left-12 z-100'
            style={{ visibility: 'hidden' }}
            src={ExplosionIcon}
            alt='explosion'
          />
          <div className='ls:pt-8 ls:pr-8 w-full'>
            {game.challenger && (
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
    </div>
  )
}

export default KingArena
