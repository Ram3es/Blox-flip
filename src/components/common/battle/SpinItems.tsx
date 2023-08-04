import { FC, useEffect, useRef, useState } from 'react'
import { getRandomCards, getRandomId } from '../../../helpers/casesHelpers'
import BattleGameItem from '../Cards/BattleGameItem'
import { IRootBattle, IRootBattleResult } from '../../../types/CaseBattles'
import { IRootCasePotentialItem } from '../../../types/Cases'

interface ISpinGameProps {
  game: IRootBattle
  playerIndex: number
  currentRound: IRootBattleResult | null
  isSpin: boolean
  isStartGame: boolean
}

const SpinItems: FC<ISpinGameProps> = ({ game, currentRound, playerIndex, isSpin, isStartGame }) => {
  const [rouletteItems, setRouletteItems] = useState<IRootCasePotentialItem[]>([])
  const [winItem, setWinItem] = useState<IRootCasePotentialItem | null>(null)

  const [isRespin, setRespin] = useState(false)
  const refInterval = useRef<ReturnType<typeof setInterval>>()

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
    setWinItem(null)
  }

  const load = () => {
    if (currentRound) {
      const item = currentRound.results[playerIndex]

      const modifyItem = {
        name: item.skin_name,
        image: item.skin_image,
        price: item.cost,
        chance: 124,
        id: getRandomId()
      }

      setRouletteItems((prev) => {
        const state = [...prev]
        state[87] = modifyItem
        return state
      })
      setWinItem(modifyItem)
    }
  }

  const play = () => {
    if (isRespin) {
      reset()
      setTimeout(() => {
        load()
        spin(5)
      }, 10)
      return
    }
    // if (isRespin) {
    //   reset()
    //   load()
    // }
    load()
    spin(5)
    setRespin(true)
  }

  useEffect(() => {
    if (game.state === 'playing') {
      // if (isRespin) {
      //   refInterval.current = setInterval(() => play(), 5000)
      // } else {
      //   play()
      // }
      play()
    }
    if (game.state === 'done') {
      refInterval.current && clearInterval(refInterval.current)
      // setTimeout(() => setShowEnd(), 8000)
    }
  }, [game.state, isRespin])

  useEffect(() => {
    if (currentRound) {
      const currentCase = game.caselist[currentRound.round - 1]

      if (currentCase) {
        setRouletteItems(getRandomCards<IRootCasePotentialItem>(100, currentCase.items))
      }

      play()
    }
  }, [currentRound])

  return (
    <div className="min-h-[380px] absolute top-0 left-0 w-full h-full overflow-hidden">
      <div
        ref={itemsRef}
        className="z-20 absolute inset-0 flex flex-col-reverse justify-start items-center pt-1 pb-2 overflow-hidden"
      >
        {rouletteItems.map((item, index) => (
          <BattleGameItem
            key={index}
            itsWinning={!isSpin && item.id === winItem?.id}
            winningCard={winItem}
            image={item.image}
          />
        ))}
      </div>
    </div>
  )
}

export default SpinItems
