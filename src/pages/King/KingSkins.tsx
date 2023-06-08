import { useEffect, useMemo, useState } from 'react'

import KingSkinsHeader from './KingSkinsHeader'
import KingSkinsList from './KingSkinsList'

import DashedBigSpacerIcon from '../../assets/img/separator_big_icon.png'

import type { IItemCard } from '../../types/ItemCard'
import { IKingChampion } from '../../types/King'

export interface TabInterface {
  variant: string
}
const KING_TABS: TabInterface[] = [{ variant: 'Kings items' }, { variant: 'Kings vault' }]

interface KingSkinsInterface {
  game: IKingChampion | null
}

const KingSkins = ({ game }: KingSkinsInterface) => {
  const [kingItems, setKingItems] = useState<IItemCard[]>(game?.champion?.players_skins ?? [])
  const [kingItemsTab, setKingItemsTab] = useState<TabInterface>(KING_TABS[0])

  const updatedKingItems = useMemo(() => {
    if (kingItemsTab.variant === 'Kings items') {
      return game?.champion?.players_skins ?? [].map((card: IItemCard) => ({ ...card, isSelected: false }))
    }
    if (kingItemsTab.variant === 'Kings vault') {
      return game?.champion?.players_skins ?? [].filter((card: IItemCard) => card.price > 2000)
    }
    return []
  }, [kingItemsTab])

  useEffect(() => {
    setKingItems(updatedKingItems ?? [])
  }, [updatedKingItems])

  return (
    <div className='gradient-background--yellow__third rounded-xl p-3.5 space-y-3 min-h-[460px]'>
      <div className='flex items-start ls:items-center justify-between px-2.5 '>
        <KingSkinsHeader
          isKing
          options={KING_TABS}
          selectedOption={kingItemsTab}
          setSelectedOption={setKingItemsTab}
          player={game?.champion}
        />
        <KingSkinsHeader player={game?.challenger} />
      </div>
      <div className='border-b border-b-[#323A5B] mx-3 pt-2'></div>
      <div className='flex justify-center gap-2 max-h-[430px]'>
        <KingSkinsList itemList={kingItems} />
        <img className='hidden ls:block' src={DashedBigSpacerIcon} alt='dashed spacer' />
        <KingSkinsList
          itemList={game?.challenger ? game?.challenger.players_skins : []}
          placeContent='end'
        />
      </div>
    </div>
  )
}

export default KingSkins
