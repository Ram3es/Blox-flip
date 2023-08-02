import { useEffect, useState } from 'react'
import { IMAGES } from '../../../constants/images'
import { IItemCard } from '../../../types/ItemCard'

const BattleGameItem = ({
  itsWinning,
  image,
  winningCard
}: {
  itsWinning?: boolean
  image: string
  winningCard: IItemCard | undefined
}) => {
  const [winningClass, setWinningClass] = useState<string>()
  useEffect(() => {
    if (itsWinning) {
      setTimeout(() => {
        setWinningClass(() => 'h-[160px] shrink-0 pt-3  [&>img]:grayscale-0 [&>img]:opacity-100')
      }, 5000)
    }
  }, [itsWinning])

  useEffect(() => {
    setWinningClass(undefined)
  }, [winningCard])

  return (
    <div className={winningClass ?? 'h-[120px] shrink-0 pt-3'}>
      <img
        src={IMAGES[image]}
        alt=""
        width="118"
        height="90"
        loading="lazy"
        decoding="async"
        className=" grayscale opacity-40 h-full w-auto"
      />
    </div>
  )
}

export default BattleGameItem
