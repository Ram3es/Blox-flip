import { IMAGES } from '../../../constants/images'
import { IItemCard } from '../../../types/ItemCard'

interface ItemsListCellProps {
  items: IItemCard[]
}

const ItemsListCell = ({ items }: ItemsListCellProps) => {
  return (
    <div className='flex max-w-[420px] overflow-hidden'>
      {items.map((item) => (
        <div key={item.id} className='p-1.5 w-[84px] h-[71px] shrink-0'>
          <div className='rounded border-b border-b-red-secondary/40 h-full'>
            <div className='cursor-pointer border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full '>
              <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0 h-full rounded relative border-8 border-transparent'>
                <img
                  src={IMAGES[item.image]}
                  alt=''
                  width='63'
                  height='50'
                  loading='lazy'
                  decoding='async'
                  className='absolute object-contain w-full h-full'
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ItemsListCell
