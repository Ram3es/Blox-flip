import { useEffect, useState } from 'react'
import { IRootCasePotentialItem } from '../../../types/Cases'

interface BattleGameItemProps {
  item: IRootCasePotentialItem
  isWinItem: boolean
  isVisibleEffects: boolean
}

const BattleGameItem = ({ isWinItem, item, isVisibleEffects }: BattleGameItemProps) => {
  const [winningClass, setWinningClass] = useState<string | null>(null)

  useEffect(() => {
    if (isWinItem) {
      if (isVisibleEffects) {
        console.log('isVisibleEffects in isVisibleEffects', isVisibleEffects)
        setWinningClass(() => 'h-[160px] shrink-0 pt-3  [&>img]:grayscale-0 [&>img]:opacity-100')
      }
      if (!isVisibleEffects) {
        console.log('isVisibleEffects in !isVisibleEffects', isVisibleEffects)

        setWinningClass(null)
      }
    }
  }, [isVisibleEffects, isWinItem])

  return (
    <div className={winningClass ?? 'h-[120px] shrink-0 pt-3'}>
      <img
        src={item.image}
        alt={item.name}
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
