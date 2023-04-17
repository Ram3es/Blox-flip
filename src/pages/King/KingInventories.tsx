import { useEffect, useMemo, useState } from 'react'

import KingInventoriesHeader from './KingInventoriesHeader'
import KingInventoriesList from './KingInventoriesList'

import DashedBigSpacerIcon from '../../assets/img/separator_big_icon.png'

import type { IKingGame } from '../../types/King'
import type { IItemCard } from '../../types/ItemCard'

import { users } from '../../mocks/liveFeedUsers'
import { cards } from '../../mocks/cards'

export interface TabInterface {
  variant: string
}
const kingTabs: TabInterface[] = [{ variant: 'Kings items' }, { variant: 'Kings vault' }]

interface KingInventoriesProps {
  game?: IKingGame
}

const KingInventories = ({ game }: KingInventoriesProps) => {
  const [kingItems, setKingItems] = useState<IItemCard[]>([])
  const [opponentItems, setOpponentItems] = useState<IItemCard[]>([])
  const [kingItemsTab, setKingItemsTab] = useState<TabInterface>(kingTabs[0])

  const updatedKingItems = useMemo(() => {
    if (kingItemsTab.variant === 'Kings items') {
      return cards.map((card) => ({ ...card, isSelected: false }))
    }
    if (kingItemsTab.variant === 'Kings vault') {
      return cards.filter((card) => card.price > 1200)
    }
    return []
  }, [kingItemsTab])

  useEffect(() => {
    setKingItems(updatedKingItems)
  }, [updatedKingItems])

  useEffect(() => {
    setOpponentItems(cards.slice(0, 5).map((card) => ({ ...card, isSelected: false })))
  }, [])

  return (
    <div className='gradient-background--yellow__third rounded-xl p-3.5 space-y-3 min-h-[460px]'>
      <div className='flex items-start ls:items-center justify-between px-2.5 '>
        <KingInventoriesHeader
          isKing
          options={kingTabs}
          selectedOption={kingItemsTab}
          setSelectedOption={setKingItemsTab}
          user={users[0]}
        />
        <KingInventoriesHeader user={users[0]} />
      </div>
      <div className='border-b border-b-[#323A5B] mx-3 pt-2'></div>
      <div className='flex justify-center gap-2'>
        <KingInventoriesList itemList={kingItems} />
        <img className='hidden ls:block' src={DashedBigSpacerIcon} alt='dashed spacer' />
        <KingInventoriesList itemList={opponentItems} />
      </div>
    </div>
  )
}

export default KingInventories
