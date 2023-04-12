import DashedSpacerSmallIcon from '../../../assets/img/dashed_spacer_small.png'

import { IMAGES } from '../../../constants/images'

import type { IItemCard } from '../../../types/ItemCard'

interface ItemsListCellProps {
  items: IItemCard[]
}

const ItemsListCell = ({ items }: ItemsListCellProps) => {
  return (
    <div className='flex w-[440px] h-[70px] items-center'>
      <img className='hidden ls:block rotate-90' src={DashedSpacerSmallIcon} alt='dashed spacer' />
      <div className='py-1 overflow-x-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
        <div className='flex items-center'>
          {items.map((item) => (
            <div key={item.id} className='p-1.5 w-[70px] h-[60px] shrink-0'>
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
      </div>
      <img className='hidden ls:block rotate-90' src={DashedSpacerSmallIcon} alt='dashed spacer' />
    </div>
  )
}

export default ItemsListCell
