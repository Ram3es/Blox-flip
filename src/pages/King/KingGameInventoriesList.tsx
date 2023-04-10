import ItemCard from '../../components/common/Cards/ItemCard'

import { IItemCard } from '../../types/ItemCard'

interface KingGameInventoriesListProps {
  itemList: IItemCard[]
}

const KingGameInventoriesList = ({ itemList }: KingGameInventoriesListProps) => {
  return (
    <div className='w-full flex flex-wrap flew-wrap overflow-y-auto h-[380px] pr-2.5 scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
      {itemList.map((item) => (
        <ItemCard variant='CoinFlipSmall' key={item.id} {...item} />
      ))}
    </div>
  )
}

export default KingGameInventoriesList
