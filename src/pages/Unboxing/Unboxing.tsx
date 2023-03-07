import React, { useState } from 'react'
import ButtonsToggle from '../../components/base/ButtonToggle'
import ItemCard from '../../components/base/ItemCard'
import UnboxingCard from '../../components/base/UnboxingCard'
import UnboxingIcon from '../../components/icons/UnboxingIcon'

const cards = [
  { id: '1', color: 'Orange', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 1200, sold: true, active: false, isSelected: false },
  { id: '2', color: 'Blue', image: 'helmet', name: 'Fiery Horns of the Netherworld', price: 1300, sold: false, active: true, isSelected: false },
  { id: '3', color: 'Pink', image: 'horns', name: 'Fiery Horns of the Netherworld', price: 1400, sold: true, active: false, isSelected: false },
  { id: '4', color: 'Pink', image: 'redCrown', name: 'Fiery Horns of the Netherworld', price: 1300, sold: false, active: true, isSelected: false },
  { id: '5', color: 'Blue', image: 'helmet', name: 'Fiery Horns of the Netherworld', price: 1500, sold: false, active: true, isSelected: false },
  { id: '6', color: 'Pink', image: 'helmet', name: 'Fiery Horns of the Netherworld', price: 1500, sold: true, active: false, isSelected: false },
  { id: '7', color: 'Red', image: 'helmet', name: 'Fiery Horns of the Netherworld', price: 1500, sold: true, active: false, isSelected: false },
  { id: '8', color: 'Red', image: 'helmet', name: 'Fiery Horns of the Netherworld', price: 1500, sold: true, active: false, isSelected: false },
  { id: '9', color: 'Orange', image: 'helmet', name: 'Fiery Horns of the Netherworld', price: 1500, sold: true, active: false, isSelected: false },
  { id: '10', color: 'Green', image: 'redCrown', name: 'Fiery Horns of the Netherworld', price: 1300, sold: false, active: true, isSelected: false }
]

const tabs = ['Hot', 'Featured', 'New', 'Creator']

const Unboxing = () => {
  const [sortingBoxes, setSortBoxes] = useState(tabs[0])
  return (
    <div className="flex flex-col min-h-full text-sm ">
      <div className="max-w-1190 w-full m-auto">
        <div className="flex flex-wrap  mb-8 md:mb-12 text-xs">
          {cards.map(card => (
            <ItemCard
              key={card.id}
              id={card.id}
              name={card.name}
              price={card.price}
              image={card.image}
              color={card.color}
              onSelect={() => {}}
              // itemClasses='px-1 w-1/2 xxs:w-1/4 xs:w-1/5 md:w-1/7 shrink-0 lg:w-1/9 mb-2'
               />
          ))}
        </div>
        <div className="flex flex-wrap justify-between items-center mb-6 border-b border-blue-accent-secondary">
          <div className="flex items-center mb-3 xs:mb-2 order-1">
            <div className="w-7 shrink-0 mr-2 text-blue-golf">
              <UnboxingIcon />
            </div>
              <h3 className="font-extrabold text-2xl mr-2">Case unboxing</h3>
            </div>
            <div className="flex flex-wrap items-center -mx-1 py-2 order-2 lg:order-3">
              <div className=' h-[34px] border border-blue-600 w-[165px]'></div>
            </div>
            <div className="flex flex-wrap items-center min-w-full order-3 lg:min-w-0 lg:order-2 text-17 font-semibold">
            <ButtonsToggle
              options={tabs}
              currentSelect={sortingBoxes}
              peackFunction={setSortBoxes}
              activeClasses=' text-green-primary li--active'
              btnClasses='mx-2.5 flex flex-col justify-center  min-h-full py-5 group text-gray-primary hover:text-white '
               />
          </div>
        </div>
        <div className="flex flex-wrap items-center -mx-1 py-2 order-2 lg:order-3"></div>
        <div className="flex flex-wrap -mx-2 mb-8 md:mb-12">
          {cards.map(card => (
            <UnboxingCard key={card.id}/>
          )
          )}
          </div>
      </div>

    </div>
  )
}

export default Unboxing
