import { FC, useEffect, useRef, useState } from 'react'
import { getRandomCards, getRandomId } from '../../../helpers/casesHelpers'
import BattleGameItem from '../Cards/BattleGameItem'
import { useBattleCase } from '../../../store/BattleCaseStore'
import { IRootBattle, IRootBattleResult } from '../../../types/CaseBattles'
import { IRootCasePotentialItem } from '../../../types/Cases'
import { cards } from '../../../mocks/cards'

interface ISpinGameProps {
  game: IRootBattle
  currentRound: IRootBattleResult | null
  updateRewards: Function
  playerId: number | string
  updateRound: Function
  addWinningCard: Function
  setShowEnd: Function
}

const SpinItems: FC<ISpinGameProps> = ({
  game,
  currentRound,
  updateRewards,
  playerId,
  updateRound,
  addWinningCard,
  setShowEnd
}) => {
  const { allCases } = useBattleCase()

  const [rouletteItems, setRouletteItems] = useState<IRootCasePotentialItem[]>([])
  const [winningCard, setWinningCard] = useState<IRootCasePotentialItem | null>(null)

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
    setWinningCard(null)
  }

  const load = () => {
    // const randomCardIndex = Math.floor(Math.random() * cards.length)
    // const randomCard = cards[randomCardIndex]
    // const winningCart = {
    //   ...randomCard,
    //   id: `${randomCard.id} ${new Date().getTime()}`
    // }


    setRouletteItems((prev) => {
      const state = [...prev]
      // state[87] = winningCard
      return state
    })
    setWinningCard(winningCard)
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
      setTimeout(() => setShowEnd(), 8000)
    }
  }, [game.state, isRespin])

  useEffect(() => {
    if (winningCard) {
      setTimeout(() => {
        updateRewards(playerId, winningCard)
        addWinningCard(playerId, winningCard)
      }, 5000)
    }
  }, [winningCard])

  useEffect(() => {
    if (currentRound) {
      const currentCase = allCases.find(
        (item) => item.name === game.caselist[currentRound.round - 1].name
      )

      if (currentCase) {
        setRouletteItems(getRandomCards<IRootCasePotentialItem>(100, currentCase.items))
      }
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
            itsWinning={item.id === winningCard?.id}
            // winningCard={winningCard}
            winningCard={undefined}

            image={item.image}
          />
        ))}
      </div>
    </div>
  )
}

export default SpinItems
