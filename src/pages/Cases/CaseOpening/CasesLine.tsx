import { FC, useEffect, useRef, useState } from 'react'

import { OpeningLineIcon } from '../../../components/icons/OpeningLineIcon'
import { CasesLineItem } from './CasesLineItem'

interface CasesLineProps {
  items?: any[]
}

interface RollItem {
  image: string
}

export const CasesLine: FC<CasesLineProps> = ({ items }) => {
  const [rollItems, setRollItems] = useState<RollItem[]>([])
  const spinnerRefs = useRef<Array<HTMLDivElement | null>>([])
  const spinnerRef = useRef<HTMLDivElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  console.log(spinnerRefs)

  const randomItems = () => {
    const randomItems: RollItem[] = []
    for (let i = 0; i <= 100; i++) {
      const object = {
        image: ''
      }
      randomItems.push(object)
    }
    return randomItems
  }

  const spin = (time: number) => {
    spinnerRefs.current.forEach((spinnerRef) => {
      if (spinnerRef) {
        spinnerRef.style.transitionDuration = `duration-[${time / 1000}ms]`
        spinnerRef.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)'
        spinnerRef.style.transform = `translate-x-[${-8 * 78 - 10}rem]`
      }
    })
  }

  const startGame = () => {
    setGameStarted(true)
    setRollItems((prev) => {
      const newItems = [...prev]
      newItems[87] = { image: 'test' }
      return newItems
    })
    spin(8000)
  }

  useEffect(() => {
    setRollItems(randomItems())
  }, [])

  return (
    <div className='relative z-10 bg-dark/30 overflow-hidden mb-2.5 rounded'>
      <button onClick={() => startGame()}>Start game</button>
      <div className=' flex overflow-x-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full py-3'>
        <div className='absolute left-1/2 -ml-0.5 top-0 z-20 w-0.5 xs:w-1'>
          <OpeningLineIcon />
        </div>
        <div className='absolute left-1/2 -ml-0.5 bottom-0 z-20 rotate-180 w-0.5 xs:w-1'>
          <OpeningLineIcon />
        </div>
        {rollItems.map((item, index, array) => (
          <div key={index} ref={(element) => { spinnerRefs.current[index] = element }}>
            {index === 87
              ? (<div key={index} className='bg-slate-100'><CasesLineItem /></div>)
              : (<div key={index}><CasesLineItem /></div>)
            }
          </div>
        ))}
      </div>
    </div>
  )
}
