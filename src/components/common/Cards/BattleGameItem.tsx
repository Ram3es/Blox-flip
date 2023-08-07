import { useEffect, useState } from 'react'
import { IRootCasePotentialItem } from '../../../types/Cases'
import { CASE_BATTLE_SPINNER_TIME_MILLISECONDS } from '../../../constants/battle-cases'

interface BattleGameItemProps {
  itsWinning?: boolean
  image: string
  winningCard: IRootCasePotentialItem | null
  // isSpinEnd: boolean
  isVisibleEffects: boolean
}

const BattleGameItem = ({ itsWinning, image, winningCard, isVisibleEffects }: BattleGameItemProps) => {
  const [winningClass, setWinningClass] = useState<string | null>(null)

  // useEffect(() => {
  //   if (itsWinning) {
  //     setTimeout(() => {
  //       setWinningClass(() => 'h-[160px] shrink-0 pt-3  [&>img]:grayscale-0 [&>img]:opacity-100')
  //       console.log('add_classes')
  //     }, CASE_BATTLE_SPINNER_TIME_MILLISECONDS)
  //   }
  // }, [itsWinning])

  // useEffect(() => {
  //   setWinningClass(null)
  // }, [winningCard])

  useEffect(() => {
    if (itsWinning) {
      if (isVisibleEffects) {
        console.log('isVisibleEffects in isVisibleEffects', isVisibleEffects)
        setWinningClass(() => 'h-[160px] shrink-0 pt-3  [&>img]:grayscale-0 [&>img]:opacity-100')
      }
      if (!isVisibleEffects) {
        console.log('isVisibleEffects in !isVisibleEffects', isVisibleEffects)

        setWinningClass(null)
      }
    }
  }, [isVisibleEffects, itsWinning])

  return (
    <div className={winningClass ?? 'h-[120px] shrink-0 pt-3'}>
      <img
        src={image}
        alt=""
        width="118"
        height="90"
        loading="lazy"
        decoding="async"
        className="grayscale opacity-40 h-full w-auto"
      />
    </div>
  )
}

export default BattleGameItem
