import { Button } from '../../components/base/Button'
import ItemCard from '../../components/common/Cards/ItemCard'

import type { IItemCard } from '../../types/ItemCard'

interface CoinFlipGameItemsProps {
  items: IItemCard[]
  isBot: boolean
}

const CoinFlipGameItems = ({ items, isBot }: CoinFlipGameItemsProps) => {
  return (
    <div className='pb-48 xs:pb-60 w-full max-h-full min-h-[276px] pl-1 xxxs:pl-4 pr-4 flex flex-wrap overflow-y-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
      {!isBot && items.map((item) => <ItemCard variant='FourByFour' key={item.id} {...item} />)}
      {isBot && (
        <div className='px-2 my-10 mx-auto space-y-2'>
          <Button color='GreenPrimary'>
            <div className='w-32 xs:w-40 h-9 flex items-center justify-center'>Call bot</div>
          </Button>
          <Button color='BlueAccentSix'>
            <div className='w-32 xs:w-40 h-9 flex items-center justify-center text-blue-ocean-secondary'>
              Cancel
            </div>
          </Button>
        </div>
      )}
    </div>
  )
}

export default CoinFlipGameItems
