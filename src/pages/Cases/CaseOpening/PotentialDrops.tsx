import { FC } from 'react'
import ItemCard from '../../../components/Common/Cards/ItemCard'

import { ICaseItem } from '../../../types/cases'

import { DoubleRombIcon } from '../../../components/Icons/DoubleRombIcon'

interface PotentialDropsProps {
  cards: ICaseItem[]
}

export const PotentialDrops: FC<PotentialDropsProps> = ({ cards }) => {
  return (
    <>
      <div className='flex justify-center items-center mb-6'>
        <div className='h-px grow mr-2.5 bg-gradient-to-r from-blue-highlight to-blue-light-secondary/0'></div>
        <div className='min-w-fit'>
          <DoubleRombIcon />
        </div>
        <span className='text-lg font-extrabold bg-clip-text text-transparent gradient-violet-text mx-2'>
          POTENTIAL DROPS
        </span>
        <div className='min-w-fit rotate-180'>
          <DoubleRombIcon />
        </div>
        <div className='h-px grow mr-2.5 bg-gradient-to-l from-blue-highlight to-blue-light-secondary/0'></div>
      </div>
      <div className='flex flex-wrap -mx-1 mb-8 md:mb-12 text-xs'>
        {cards.map((card) => (
          <ItemCard
            key={card.id}
            id={card.id}
            price={card.price}
            image={card.image}
            chance={card.chance}
            variant='CaseOpening'
            name={card.itemName}
            color={card.color}
          />
        ))}
      </div>
    </>
  )
}
