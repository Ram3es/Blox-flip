import { IItemCard } from '../../types/ItemCard'
import { IMAGES } from '../../constants/images'

interface ItemsListProps {
  items: IItemCard[]
}

const ItemsList = ({ items }: ItemsListProps) => {
  return (
    <div className='py-2 flex items-center max-w-[280px] scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
      {items.map((item) => (
        <div key={item.id} className='shrink-0'>
          <img
            src={IMAGES[item.image]}
            alt={item.name}
            loading='lazy'
            decoding='async'
            className='object-contain w-[57px] h-[43px]'
          />
        </div>
      ))}
    </div>
  )
}

export default ItemsList
