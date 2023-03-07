import { DoubleRombIcon } from '../../../components/icons/DoubleRombIcon'
import ItemCard from '../../../components/base/ItemCard'

const cards = [
  {
    id: '1',
    color: 'Orange',
    image: 'horns',
    name: 'Fiery Horns of the Netherworld',
    price: 1200,
    sold: true,
    active: false,
    isSelected: false
  },
  {
    id: '2',
    color: 'Blue',
    image: 'helmet',
    name: 'Fiery Horns of the Netherworld',
    price: 1300,
    sold: false,
    active: true,
    isSelected: false
  },
  {
    id: '3',
    color: 'Pink',
    image: 'horns',
    name: 'Fiery Horns of the Netherworld',
    price: 1400,
    sold: true,
    active: false,
    isSelected: false
  },
  {
    id: '4',
    color: 'Pink',
    image: 'redCrown',
    name: 'Fiery Horns of the Netherworld',
    price: 1300,
    sold: false,
    active: true,
    isSelected: false
  },
  {
    id: '5',
    color: 'Blue',
    image: 'helmet',
    name: 'Fiery Horns of the Netherworld',
    price: 1500,
    sold: false,
    active: true,
    isSelected: false
  },
  {
    id: '6',
    color: 'Pink',
    image: 'helmet',
    name: 'Fiery Horns of the Netherworld',
    price: 1500,
    sold: true,
    active: false,
    isSelected: false
  },
  {
    id: '7',
    color: 'Red',
    image: 'helmet',
    name: 'Fiery Horns of the Netherworld',
    price: 1500,
    sold: true,
    active: false,
    isSelected: false
  },
  {
    id: '8',
    color: 'Red',
    image: 'helmet',
    name: 'Fiery Horns of the Netherworld',
    price: 1500,
    sold: true,
    active: false,
    isSelected: false
  },
  {
    id: '9',
    color: 'Orange',
    image: 'helmet',
    name: 'Fiery Horns of the Netherworld',
    price: 1500,
    sold: true,
    active: false,
    isSelected: false
  },
  {
    id: '10',
    color: 'Green',
    image: 'redCrown',
    name: 'Fiery Horns of the Netherworld',
    price: 1300,
    sold: false,
    active: true,
    isSelected: false
  }
]

export const PotentialDrops = () => {
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
            variant='CaseOpening'
            {...card}
          />
        ))}
      </div>
    </>
  )
}
