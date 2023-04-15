import ItemCard from '../../components/common/Cards/ItemCard'

import type { IItemCard } from '../../types/ItemCard'

interface KingGameInventoriesListProps {
  itemList: IItemCard[]
}

const KingGameInventoriesList = ({ itemList }: KingGameInventoriesListProps) => {
  return (
    <div className='w-full flex flex-wrap overflow-y-auto min-h-[200px] xs:h-[380px] px-1.5 scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
      {itemList.map((item) => (
        <ItemCard
          variant='KingList'
          key={item.id + String(new Date().getMilliseconds())}
          {...item}
        />
      ))}
    </div>
  )
}

export default KingGameInventoriesList
