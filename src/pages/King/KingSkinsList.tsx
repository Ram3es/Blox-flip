import clsx from 'clsx'
import ItemCard from '../../components/common/Cards/ItemCard'

import type { IItemCard } from '../../types/ItemCard'

interface KingSkinsListProps {
  itemList: IItemCard[]
  placeContent?: 'start' | 'end'
}

const KingSkinsList = ({ itemList, placeContent = 'start' }: KingSkinsListProps) => {
  const listClasses = clsx(
    'w-full flex content-start flex-wrap overflow-y-auto min-h-[200px] xs:h-[380px] px-1.5 scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full',
    {
      'place-content-end': placeContent === 'end'
    }
  )

  return (
    <div className={listClasses}>
      {itemList.map((item) => (
        <ItemCard
          variant='FourByFour'
          key={item.id + String(new Date().getMilliseconds())}
          {...item}
        />
      ))}
    </div>
  )
}

export default KingSkinsList
