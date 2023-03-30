import React, { FC, useEffect, useRef, useState } from 'react'
import { getRandomCards } from '../../../helpers/casesHelpers'
import { cards } from '../../../mocks/cards'
import { IItemCard } from '../../../types/ItemCard'
import BattleGameItem from '../Cards/BattleGameItem'

interface ISpinGameProps {
  status: string
  updateRewards: Function
  playerId: string
  updateRound: Function
  addWinningCard: Function
  setShowEnd: Function

}

const SpinItems: FC<ISpinGameProps> = ({ status, updateRewards, playerId, updateRound, addWinningCard, setShowEnd }) => {
  const [randomItems, setRandomItems] = useState<IItemCard[]>(getRandomCards(100, cards))
  const [winningCard, setWinningCard] = useState<IItemCard>()
  const [isRespin, setRespin] = useState(false)
  const refInterval = useRef<NodeJS.Timeout>()

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

  const reset = () => {
    if (itemsRef.current) {
      itemsRef.current.style.transition = 'none'
      itemsRef.current.style.bottom = '0px'
    }
    setWinningCard(undefined)
  }

  const load = () => {
    const randomCardIndex = Math.floor(Math.random() * cards.length)
    const randomCard = cards[randomCardIndex]
    const winningCart = {
      ...randomCard,
      id: `${randomCard.id} ${new Date().getTime()}`
    }
    setRandomItems(prev => {
      const state = [...prev]
      state[87] = winningCart
      return state
    })
    setWinningCard(() => winningCart)
  }

  const play = () => {
    if (isRespin) {
      reset()
      updateRound(playerId)
      setTimeout(() => {
        load()
        spin(4)
      }, 10)

      return
    }
    load()
    spin(4)
    setRespin(true)
  }

  useEffect(() => {
    if (status === 'running') {
      if (isRespin) {
        refInterval.current = setInterval(() => play(), 8000)
      } else {
        play()
      }
      return
    }
    if (status === 'ended') {
      refInterval.current && clearInterval(refInterval.current)
      setTimeout(() => setShowEnd(true), 8000)
    }
  }, [status, isRespin])

  useEffect(() => {
    if (winningCard) {
      setTimeout(() => {
        updateRewards(playerId, winningCard)
        addWinningCard(playerId, winningCard)
      }, 5000)
    }
  }, [winningCard])

  return (
       <div className='min-h-[380px] absolute top-0 left-0 w-full h-full overflow-hidden'>
          <div
           ref={itemsRef}
           className=" z-20 absolute inset-0 flex flex-col-reverse justify-start items-center pt-1 pb-2 overflow-hidden">
            {randomItems.map((item, index) => (
              <BattleGameItem key={index} itsWinning={item.id === winningCard?.id} winningCard={winningCard} image={item.image} />
            ))}
          </div>
        </div>
  )
}

export default SpinItems
