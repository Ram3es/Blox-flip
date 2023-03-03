
import React, { useCallback, useEffect, useState } from 'react'
import ButtonsToggle from '../../components/base/ButtonToggle'
import DiamondIcon from '../../components/icons/DiamondIcon'
import ItemsIcon from '../../components/icons/ItemsIcon'
import UserProgress from '../../components/user/UserProgress'
import { Button } from '../../components/base/Button'
import ItemCard from '../../components/base/ItemCard'
import { QuantityCoinsWithChildren } from '../../components/common/QuantityCoins/QuantityWithChildren'

const user = {
  name: 'John Johnson',
  avatar: '',
  level: 11,
  progress: {
    current: 50,
    required: 165
  }
}

const actions = [
  { name: 'wagered' },
  { name: 'withdrawn' },
  { name: 'deposited' },
  { name: 'profit' }

]

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

interface ICard {
  id: string
  name: string
  price: number
  image: string
  sold: boolean
  active: boolean
  isSelected: boolean
}

const cardsSorting = ['All', 'Active Items', 'Sold']

const Profile = () => {
  const [currentCardsVariant, setCurrentCardsVariant] = useState(cardsSorting[0])
  const [selectedCard, setSelectedCard] = useState<ICard[]>([])
  const [sorted, setSorted] = useState<ICard[]>([])

  const totalPriceSelected = selectedCard.reduce((acc, item) => acc + item.price, 0)

  const filtered = useCallback(() => {
    switch (currentCardsVariant) {
      case 'Active Items': setSorted(cards.filter(card => card.active))
        break
      case 'Sold': setSorted(cards.filter(card => card.sold))
        break
      default: setSorted(cards)
    }
  }, [currentCardsVariant])

  const handleSelectCard = (id: string) => {
    const card = sorted.find(item => item.id === id) as ICard

    if (!selectedCard.some(item => item.id === card.id)) {
      setSelectedCard(state => ([...state, card]))
      setSorted(state => [...state.map(elem => {
        if (elem.id === id) {
          return { ...elem, isSelected: true }
        }
        return elem
      })])
    } else {
      setSelectedCard(state => ([...state.filter(el => el.id !== card.id)]))
      setSorted(state => [...state.map(elem => {
        if (elem.id === id) {
          return { ...elem, isSelected: false }
        }
        return elem
      })])
    }
  }

  useEffect(() => {
    setSelectedCard([])
    filtered()
  }, [currentCardsVariant])

  return (
    <div className='h-fit'>
    <div className='profile--box border border-blue-highlight rounded-lg mb-12 mt-18 md:mt-12 relative '>
      <div className="flex flex-col justify-center items-center mx-auto relative z-20 -mt-9 w-3/4 xs:w-3/5 md:w-1/3">
        <UserProgress user={user} />
      </div>
      <div className="flex flex-wrap pt-6 pb-2 px-2 border-t border-blue-highlight">
        {actions.map(action => (
          <div key={action.name} className="px-2 w-full xxs:w-1/2 md:w-auto grow shrink-0 mb-4 flex flex-col group text-gray-primary hover:text-green-secondary">
            <div className="text-sm font-extrabold  mb-1.5 uppercase">{action.name}</div>
            <div className="gradient-blue-secondary flex items-center justify-center py-8 px-5 rounded-lg grow cursor-pointer border border-transparent group-hover:bg-green-primary/15 group-hover:border-green-primary">
              <QuantityCoinsWithChildren
                quantity={-1500.233534853}
                quantityClasses='flex items-center text-lg font-bold'>
                  <span className="w-8 h-8 shrink-0 text-center leading-8 bg-green-primary/20 rounded text-green-secondary relative mr-3">
                    <DiamondIcon className='w-[19px] h-[18px] -inset-full absolute m-auto' />
                  </span>
              </QuantityCoinsWithChildren>
              {/* <a href="#"className="flex items-center uppercase leading-7 text-xs font-bold gradient-green rounded shadow-green-35 px-1.5">
                <span className="w-4 shrink-0 mr-1.5">
                  <img src="img/diamond_white.svg" alt="" width="16" height="12" loading="lazy" decoding="async" />
                </span>
                claim
             </a> */}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="flex flex-wrap justify-between border-b border-blue-accent-secondary mb-6 pb-4 items-center">
      <div className="flex flex-wrap items-center">
        <div className="text-gray-primary mr-2.5 font-bold text-base flex items-center">
          <div className="w-4 mr-2 5 shrink-0">
            <ItemsIcon />
          </div>
          My Items
          <p className='ml-2'>-</p>
          <p className="text-green-secondary font-normal text-sm min-w-[100px] leading-6 mx-2.5 ">{selectedCard.length } SELECTED</p>
          </div>
          <div className="flex items-center rounded mr-2.5">
            <QuantityCoinsWithChildren
                quantity={totalPriceSelected}
                quantityClasses='flex items-center text-sm font-bold'>
                  <span className="w-6 h-6 text-center leading-6 bg-green-primary/20 rounded relative mr-1.5 text-green-secondary">
                    <DiamondIcon className='-inset-full absolute m-auto' />
                  </span>
            </QuantityCoinsWithChildren>
          </div>
          <Button
            onClick={() => {}}
            className='flex items-center justify-center text-sm font-bold rounded border border-green-primary bg-green-primary hover:bg-green-500 py-1.5 px-7'
             >Sell items</Button>
          <Button
            onClick={() => {}}
            className='flex items-center justify-center py-1.5 px-4 ml-3 text-gray-primary text-13 font-semibold rounded bg-blue-highlight border border-blue-highlight hover:text-white '
             >Withdraw</Button>
          </div>
          <div className='mt-2 xs:mt-0'>
            <ButtonsToggle options={cardsSorting} currentSelect={currentCardsVariant} peackFunction={setCurrentCardsVariant} />
          </div>
    </div>
    <div className="flex flex-wrap -mx-1 mb-8 md:mb-12 text-sm">
      {sorted.map(card => (
        <ItemCard
          key={card.id}
          onSelect={handleSelectCard}
          {...card}
           />
      )) }
    </div>
    </div>
  )
}

export default Profile
