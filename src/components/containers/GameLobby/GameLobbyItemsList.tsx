import ItemCard from '../../common/Cards/ItemCard'

import type { IItemCard } from '../../../types/ItemCard'

interface GameLobbyItemsListProps {
  items: IItemCard[]
  handleSelectItem: (id: string) => void
}

const GameLobbyItemsList = ({ items, handleSelectItem }: GameLobbyItemsListProps) => {
  return (
    <div className='pb-60 xs:pb-40 w-full pr-3 -mr-2 flex flex-wrap overflow-y-auto min-h-[276px] max-h-full scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
      {items.map((item) => (
        <ItemCard variant='CoinFlip' key={item.id} onSelect={handleSelectItem} {...item} />
      ))}
    </div>
  )
}

export default GameLobbyItemsList