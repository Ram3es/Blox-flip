import { useEffect, useMemo, useState } from 'react'

import KingGameInventoriesHeader from './KingGameInventoriesHeader'
import KingGameInventoriesList from './KingGameInventoriesList'

import DashedBigSpacerIcon from '../../assets/img/separator_big_icon.png'

import { IKingGame } from '../../types/King'
import { IItemCard } from '../../types/ItemCard'

import { users } from '../../mocks/liveFeedUsers'
import { cards } from '../../mocks/cards'

export interface TabInterface {
  variant: string
}
const kingTabs: TabInterface[] = [{ variant: 'Kings items' }, { variant: 'Kings vault' }]

interface KingGameInventoriesProps {
  game?: IKingGame
}

const KingGameInventories = ({ game }: KingGameInventoriesProps) => {
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
    <div className='rounded-sm min-h-[460px] p-4 bg-gradient-yellow--king space-y-2'>
      <div className='flex items-center justify-between'>
        <KingGameInventoriesHeader
          isKing
          options={kingTabs}
          selectedOption={kingItemsTab}
          setSelectedOption={setKingItemsTab}
          user={users[0]}
        />
        <KingGameInventoriesHeader user={users[0]} />
      </div>
      <div className='flex items-center gap-2'>
        <KingGameInventoriesList itemList={kingItems} />
        <img className='hidden ls:block' src={DashedBigSpacerIcon} alt='dashed spacer' />
        <KingGameInventoriesList itemList={opponentItems} />
      </div>
    </div>
  )
}

export default KingGameInventories
