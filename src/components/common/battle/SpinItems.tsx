import { FC, useEffect, useRef, useState } from 'react'
import { getRandomCards, getRandomId } from '../../../helpers/casesHelpers'
import BattleGameItem from '../Cards/BattleGameItem'
import { IRootBattle, IRootBattleResultHistory } from '../../../types/CaseBattles'
import { IRootCasePotentialItem } from '../../../types/Cases'
import { CASE_BATTLE_SPINNER_TIME_SECONDS } from '../../../constants/battle-cases'

interface ISpinGameProps {
  game: IRootBattle
  playerIndex: number
  currentRound: IRootBattleResultHistory | null
  isSpin: boolean
  isVisibleEffects: boolean
}

const SpinItems: FC<ISpinGameProps> = ({
  game,
  currentRound,
  playerIndex,
  isSpin,
  isVisibleEffects
}) => {
  const [rouletteItems, setRouletteItems] = useState<IRootCasePotentialItem[]>([])
  const [winItem, setWinItem] = useState<IRootCasePotentialItem | null>(null)
  const [isRespin, setRespin] = useState(false)

  const itemsRef = useRef<HTMLDivElement>(null)

  const spin = (time: number) => {
    if (itemsRef.current) {
      itemsRef.current.style.transition = `bottom ${time}s cubic-bezier(0.12, 0.8, 0.38, 1)`
      itemsRef.current.style.bottom = `-${7.5 * 86}rem`
    } else {
      console.log('Spin Error')
    }
  }

  const reset = () => {
    if (itemsRef.current) {
      itemsRef.current.style.transition = 'none'
      itemsRef.current.style.bottom = '0px'
    } else {
      console.log('Reset Error')
    }
    setWinItem(null)
  }

  const load = () => {
    if (currentRound) {
      const item = currentRound.drops[playerIndex]

      const modifyItem = {
        name: item.skin_name,
        image: item.skin_image,
        price: item.cost,
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
    reset()

    if (isRespin) {
      setTimeout(() => {
        load()
        spin(CASE_BATTLE_SPINNER_TIME_SECONDS)
      }, 100)
    } else {
      setTimeout(() => {
        load()
        spin(CASE_BATTLE_SPINNER_TIME_SECONDS)
      }, 10)
      setRespin(true)
    }
  }

  useEffect(() => {
    if (currentRound) {
      const currentCase = game.caselist[Number(currentRound.id) - 1]

      if (currentCase) {
        setRouletteItems(getRandomCards<IRootCasePotentialItem>(100, currentCase.items))
      } else {
        console.log('nor CURRENT CASE', currentCase)
      }

      play()
    } else {
      console.log('currentRound Error', currentRound)
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
            item={item}
            isWinItem={!isSpin && item.id === winItem?.id}
            isVisibleEffects={isVisibleEffects}
          />
        ))}
      </div>
    </div>
  )
}

export default SpinItems
