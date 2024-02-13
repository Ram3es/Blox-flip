import ItemCard from '../../common/Cards/ItemCard'

import type { IItemCard, TRobloxCard } from '../../../types/ItemCard'
import { IJackpotCard } from '../../../types/Jackpot'

interface GameLobbyItemsListProps {
  items: TRobloxCard[] | IJackpotCard[] | IItemCard[]
  handleSelectItem: (id: number) => void
}

const GameLobbyItemsList = ({ items, handleSelectItem }: GameLobbyItemsListProps) => {
  return (
    <div className="pb-60 xs:pb-40 w-full pr-3 -mr-2 flex flex-wrap overflow-y-auto min-h-[276px] max-h-full scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
      {items.map((item) => (
        <ItemCard
          variant="CoinFlip"
          key={item.id}
          onSelect={handleSelectItem}
          image={item.pic ?? ''}
          {...item}
        />
      ))}
    </div>
  )
}

export default GameLobbyItemsList
