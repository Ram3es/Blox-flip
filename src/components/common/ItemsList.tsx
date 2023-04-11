import { IItemCard } from '../../types/ItemCard'
import { IMAGES } from '../../constants/images'

interface ItemsListProps {
  items: IItemCard[]
}

const ItemsList = ({ items }: ItemsListProps) => {
  return (
    <div className='flex items-center justify-center'>
      {items.slice(0, 4).map((item) => (
        <div key={item.id} className='w-[57px] h-[43px] rounded'>
          <img
            src={IMAGES[item.image]}
            alt={item.name}
            loading='lazy'
            decoding='async'
            className='object-contain w-full h-full'
          />
        </div>
      ))}
    </div>
  )
}

export default ItemsList
