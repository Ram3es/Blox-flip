import { FC, useRef, useState } from 'react'

import { OpeningLineIcon } from '../../../components/icons/OpeningLineIcon'
import { ICaseItem } from '../../../types/cases'
import { CasesLineItem } from './CasesLineItem'

interface CasesLineProps {
  items?: ICaseItem[]
  transitionDuration: number
}

export const CasesLine: FC<CasesLineProps> = ({ items = [], transitionDuration }) => {
  const [rouletteItems, setRouletteItems] = useState<ICaseItem[]>(items)
  const [isReplay, setIsReplay] = useState<boolean>(false)
  const [isSpin, setIsSpin] = useState<boolean>(false)
  const [isSpinEnd, setIsSpinEnd] = useState<boolean>(false)
  console.log(rouletteItems, 'rouletteItems <<<<')
  const itemsRef = useRef<HTMLDivElement>(null)

  const transitionEndHandler = () => {
    setIsSpin(false)
    setIsSpinEnd(true)
  }

  const randomItems = () => {
    const randomItems: ICaseItem[] = []
    for (let i = 0; i < 100; i++) {
      const object = {
        itemName: `Random item, index${i}`,
        rarity: '100',
        image: '',
        id: i
      }
      randomItems.push(object)
    }
    return randomItems
  }

  const prepare = () => {
    if (itemsRef.current) {
      itemsRef.current.style.transition = 'none'
      itemsRef.current.style.left = '0px'
    }
    console.log(isSpin)
    setRouletteItems(randomItems())
  }

  const spin = () => {
    if (itemsRef.current) {
      itemsRef.current.style.transition = `left ${transitionDuration}s ease-out`
    }

    setTimeout(() => {
      if (itemsRef.current) {
        itemsRef.current.style.left = `-${556}rem`
      }
    }, 1000)
  }

  const load = () => {
    const winner = { itemName: 'Winner item', rarity: '100', image: '', id: 88 }

    setRouletteItems(() => {
      const newItems = [...rouletteItems]
      newItems[87] = winner
      return newItems
    })
  }

  const play = () => {
    if (isReplay) {
      prepare()
      console.log('reply')
    }

    load()
    spin()

    setIsSpin(true)
    setIsReplay(true)
  }

  return (
    <div className='relative z-10 bg-dark/30 overflow-hidden mb-2.5 rounded'>
      <button disabled={isSpin} onClick={play}>
        Start game
      </button>
      <div className='flex py-3'>
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
          {rouletteItems?.map((item) => (
            <CasesLineItem key={item.itemName} itemName={item.itemName} />
          ))}
        </div>
      </div>
    </div>
  )
}
