import ItemCard from '../../components/common/Cards/ItemCard'

import { IItemCard } from '../../types/ItemCard'

interface CoinFlipGameItemsProps {
  items: IItemCard[]
}

const CoinFlipGameItems = ({ items }: CoinFlipGameItemsProps) => {
  return (
    <div className='pb-48 xs:pb-60 w-full max-h-full min-h-[276px] pl-1 xxxs:pl-4 pr-4 flex flex-wrap overflow-y-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
      {items.map((item) => (
        <ItemCard variant='FourByFour' key={item.id} {...item} />
      ))}
    </div>
  )
}

export default CoinFlipGameItems
