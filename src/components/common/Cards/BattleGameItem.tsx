import { useEffect, useState } from 'react'
import { IRootCasePotentialItem } from '../../../types/Cases'
import { CASE_BATTLE_SPINNER_TIME_MILLISECONDS } from '../../../constants/battle-cases'

interface BattleGameItemProps {
  itsWinning?: boolean
  image: string
  winningCard: IRootCasePotentialItem | null
}

const BattleGameItem = ({ itsWinning, image, winningCard }: BattleGameItemProps) => {
  const [winningClass, setWinningClass] = useState<string | null>(null)

  useEffect(() => {
    if (itsWinning) {
      setTimeout(() => {
        setWinningClass(() => 'h-[160px] shrink-0 pt-3  [&>img]:grayscale-0 [&>img]:opacity-100')
      }, CASE_BATTLE_SPINNER_TIME_MILLISECONDS + 1000)
    }
  }, [itsWinning])

  useEffect(() => {
    setWinningClass(null)
  }, [winningCard])

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
