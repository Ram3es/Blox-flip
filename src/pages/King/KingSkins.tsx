import { useEffect, useMemo, useState } from 'react'
import { useKing } from '../../store/KingStore'

import KingSkinsHeader from './KingSkinsHeader'
import KingSkinsList from './KingSkinsList'

import DashedBigSpacerIcon from '../../assets/img/separator_big_icon.png'

import type { IItemCard } from '../../types/ItemCard'

export interface TabInterface {
  variant: string
}
const kingTabs: TabInterface[] = [{ variant: 'Kings items' }, { variant: 'Kings vault' }]

const KingSkins = () => {
  const { game } = useKing()

  const [kingItems, setKingItems] = useState<IItemCard[]>(game.firstPlayer.items)
  const [kingItemsTab, setKingItemsTab] = useState<TabInterface>(kingTabs[0])

  const updatedKingItems = useMemo(() => {
    if (kingItemsTab.variant === 'Kings items') {
      return game.firstPlayer.items.map((card) => ({ ...card, isSelected: false }))
    }
    if (kingItemsTab.variant === 'Kings vault') {
      return game.firstPlayer.items.filter((card) => card.price > 2000)
    }
    return []
  }, [kingItemsTab])

  useEffect(() => {
    setKingItems(updatedKingItems)
  }, [updatedKingItems])

  return (
    <div className='gradient-background--yellow__third rounded-xl p-3.5 space-y-3 min-h-[460px]'>
      <div className='flex items-start ls:items-center justify-between px-2.5 '>
        <KingSkinsHeader
          isKing
          options={kingTabs}
          selectedOption={kingItemsTab}
          setSelectedOption={setKingItemsTab}
          user={game.firstPlayer}
        />
        <KingSkinsHeader user={game.secondPlayer} />
      </div>
      <div className='border-b border-b-[#323A5B] mx-3 pt-2'></div>
      <div className='flex justify-center gap-2'>
        <KingSkinsList itemList={kingItems} />
        <img className='hidden ls:block' src={DashedBigSpacerIcon} alt='dashed spacer' />
        <KingSkinsList
          itemList={game.secondPlayer ? game.secondPlayer.items : []}
          placeContent='end'
        />
      </div>
    </div>
  )
}

export default KingSkins
