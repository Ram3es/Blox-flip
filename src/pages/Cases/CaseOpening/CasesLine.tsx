import { FC, useRef, useState } from 'react'

import { OpeningLineIcon } from '../../../components/icons/OpeningLineIcon'
import { CasesLineItem } from './CasesLineItem'

import { itemAttributes, Roulette } from './classes'

interface CasesLineProps {
  items?: any[]
  transitionDuration: number
}

export const CasesLine: FC<CasesLineProps> = ({ items, transitionDuration }) => {
  const [rouletteItems, setRouletteItems] = useState<itemAttributes[]>(items)
  const [itemPrizeId, setItemPrizeId] = useState<number>()
  const [isReplay, setIsReplay] = useState<boolean>(false)
  const [isSpin, setIsSpin] = useState<boolean>(false)
  const [isSpinEnd, setIsSpinEnd] = useState<boolean>(false)

  const rouletteContainerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  const transitionEndHandler = () => {
    setIsSpin(false)
    setIsSpinEnd(true)
  }

  const prepare = () => {
    itemsRef.current!.style.transition = 'none'
    itemsRef.current!.style.left = '0px'
  }

  const load = () => {
    let winner = { itemName: 'Test item', rarity: '100', image: '', id: '88' }

    const roulette = new Roulette({
      winner,
      items,
      rouletteContainerRef,
      itemsRef,
      itemsCount: 100,
      transitionDuration
    })

    roulette.set_items()
    setRouletteItems(roulette.items)

    return roulette
  }

  const play = () => {
    if (isReplay) {
      prepare()
    }
    setIsSpin(true)

    const roulette = load()

    setTimeout(() => {
      setIsSpin(true)
      setItemPrizeId(roulette.spin())
      setIsReplay(true)
    }, 1000)
  }

  // overflow-x-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full

  return (
    <div
      className='relative z-10 bg-dark/30 overflow-hidden mb-2.5 rounded'
      ref={rouletteContainerRef}
    >
      <button disabled={isSpin} onClick={play}>
        Start game
      </button>
      <div className='flex py-3 overflow-x-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
        <div className='absolute left-1/2 -ml-0.5 top-0 z-20 w-0.5 xs:w-1'>
          <OpeningLineIcon />
        </div>
        <div className='absolute left-1/2 -ml-0.5 bottom-0 z-20 rotate-180 w-0.5 xs:w-1'>
          <OpeningLineIcon />
        </div>
        <div
          className='whitespace-nowrap relative left-0 flex'
          ref={itemsRef}
          onTransitionEnd={transitionEndHandler}
        >
          {rouletteItems?.map((item, index, array) => (
            <CasesLineItem key={index} itemName={item.itemName} />
          ))}
        </div>
      </div>
    </div>
  )
}
