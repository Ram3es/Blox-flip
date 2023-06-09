import { useEffect, useState } from 'react'
import { useSocketCtx } from '../../store/SocketStore'

import KingSkinsHeader from './KingSkinsHeader'
import KingSkinsList from './KingSkinsList'

import DashedBigSpacerIcon from '../../assets/img/separator_big_icon.png'

import type { IItemCard } from '../../types/ItemCard'
import { IKingChampion } from '../../types/King'

import { kingsVaultMock } from '../../mocks/kingMock'

export interface TabInterface {
  variant: string
}
const KING_TABS: TabInterface[] = [{ variant: 'Champion items' }, { variant: 'Champion vault' }]

interface KingSkinsInterface {
  game: IKingChampion | null
}

const KingSkins = ({ game }: KingSkinsInterface) => {
  const { socket } = useSocketCtx()

  const [itemsList, setItemsList] = useState<IItemCard[]>(game?.champion?.players_skins ?? [])
  const [kingItemsTab, setKingItemsTab] = useState<TabInterface>(KING_TABS[0])

  const [kingVaults, setKingVaults] = useState<IItemCard[]>([])

  useEffect(() => {
    kingItemsTab.variant === 'Champion items'
      ? setItemsList(game?.champion?.players_skins ?? [])
      : setItemsList(kingVaults ?? [])
  }, [kingItemsTab, game])

  useEffect(() => {
    socket.emit('load_items', { type: 'champion' }, (data: IItemCard[]) => {
      if (!data) {
        return
      }
      setKingVaults(data)
    })

    setKingVaults(kingsVaultMock) // delete after setup server
  }, [])

  return (
    <div className='gradient-background--yellow__third rounded-xl p-3.5 space-y-3 min-h-[460px]'>
      <div className='flex items-start ls:items-center justify-between px-2.5 '>
        <KingSkinsHeader
          isKing
          gameRound={game?.round}
          options={KING_TABS}
          selectedOption={kingItemsTab}
          setSelectedOption={setKingItemsTab}
          skins={itemsList}
        />
        <KingSkinsHeader skins={game?.challenger?.players_skins ?? []} />
      </div>
      <div className='border-b border-b-[#323A5B] mx-3 pt-2'></div>
      <div className='flex justify-center gap-2 max-h-[430px]'>
        <KingSkinsList itemList={itemsList} />
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
