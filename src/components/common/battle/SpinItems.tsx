import React, { useEffect, useRef, useState } from 'react'
import { getRandomCards } from '../../../helpers/casesHelpers'
import { cards } from '../../../mocks/cards'
import { IItemCard } from '../../../types/ItemCard'
import BattleGameItem from '../Cards/BattleGameItem'

const SpinItems = ({ status, updateRewards, playerId }: { status: string, updateRewards: Function, playerId: string }) => {
  const [randomItems, setRandomItems] = useState<IItemCard[]>(getRandomCards(100, cards))
  const [isWinningIdx, setWinningIdx] = useState<number>()

  const itemsRef = useRef<HTMLDivElement>(null)

  const spin = (time: number) => {
    if (itemsRef.current) {
      itemsRef.current.style.transition = `bottom ${time}s cubic-bezier(0.12, 0.8, 0.38, 1)`
    }
    setTimeout(() => {
      if (itemsRef.current) {
        itemsRef.current.style.bottom = `-${7.5 * 86}rem`
      }
    }, 1000)
  }

  const load = () => {
    setRandomItems(prev => {
      const state = [...prev]
      const randomCardIndex = Math.floor(Math.random() * cards.length)
      const randomCard = cards[randomCardIndex]
      state[87] = {
        ...randomCard,
        id: `${randomCard.id} ${new Date().getTime()}`
      }
      return state
    })
  }

  const play = () => {
    load()
    spin(4)
  }

  const handlendTransition = () => {
    setWinningIdx(87)
    updateRewards(playerId, randomItems[87])
  }

  useEffect(() => {
    if (status === 'running') {
      play()
    }
  }, [])

  return (
        <div className='min-h-[380px] absolute top-0 left-0 w-full h-full overflow-hidden'>
          <div
           ref={itemsRef}
           onTransitionEnd={handlendTransition}
           className=" z-20 absolute inset-0 flex flex-col-reverse justify-start items-center pt-1 pb-2 overflow-hidden">
            {randomItems.map((item, index) => (
                <BattleGameItem key={index} itsWinning={index === isWinningIdx} image={item.image} />
            ))}
          </div>
        </div>
  )
}

export default SpinItems
