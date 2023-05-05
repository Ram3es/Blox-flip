import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import ButtonsToggle from '../../components/base/ButtonToggle'
import UserProgress from '../../components/user/UserProgress'
import ItemCard from '../../components/common/Cards/ItemCard'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'

import Preferences from './Preferences'
import ItemsBar from './UserItemsBar'

import { cards } from '../../mocks/cards'
import type { IItemCard } from '../../types/ItemCard'

const user = {
  name: 'John Johnson',
  avatar: '',
  level: 11,
  id: '1',
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

const cardsSorting = [{ variant: 'All' }, { variant: 'Active Items' }, { variant: 'Sold' }]

const Profile = ({ isOwnProfile }: { isOwnProfile: boolean }) => {
  const [currentCardsVariant, setCurrentCardsVariant] = useState(cardsSorting[0])
  const [selectedCard, setSelectedCard] = useState<IItemCard[]>([])
  const [sorted, setSorted] = useState<IItemCard[]>([])
  const {
    state: { userId }
  } = useLocation()

  const totalPriceSelected = selectedCard.reduce((acc, item) => acc + item.price, 0)

  const filtered = useCallback(() => {
    switch (currentCardsVariant.variant) {
      case 'Active Items':
        setSorted(cards.filter((card) => card.active))
        break
      case 'Sold':
        setSorted(cards.filter((card) => card.sold))
        break
      default:
        setSorted(cards)
    }
  }, [currentCardsVariant])

  const handleSelectCard = (id: string) => {
    if (!isOwnProfile) {
      return
    }
    const card = sorted.find((item) => item.id === id) as IItemCard

    if (!selectedCard.some((item) => item.id === card.id)) {
      setSelectedCard((state) => [...state, card])
      setSorted((state) => [
        ...state.map((elem) => {
          if (elem.id === id) {
            return { ...elem, isSelected: true }
          }
          return elem
        })
      ])
    } else {
      setSelectedCard((state) => [...state.filter((el) => el.id !== card.id)])
      setSorted((state) => [
        ...state.map((elem) => {
          if (elem.id === id) {
            return { ...elem, isSelected: false }
          }
          return elem
        })
      ])
    }
  }

  useEffect(() => {
    setSelectedCard([])
    filtered()
  }, [currentCardsVariant, userId])

  return (
    <div className='h-fit'>
      <div className='profile--box border border-blue-highlight rounded-lg mb-12 mt-18 md:mt-12 relative '>
        <div className='flex flex-col justify-center items-center mx-auto relative z-20 -mt-9 w-3/4 xs:w-3/5 md:w-1/3'>
          <UserProgress isFullInfo={isOwnProfile} user={user} />
        </div>
        {!isOwnProfile && <Preferences />}
        <div className='flex flex-wrap pt-6 pb-2 px-2 border-t border-blue-highlight'>
          {actions.map((action, idx) => (
            <div
              key={action.name}
              className={`${
                idx === actions.length - 1 ? 'is-green text-green-secondary' : 'text-gray-primary'
              } group px-2 w-full xxs:w-1/2 md:w-auto grow shrink-0 mb-4 flex flex-col`}
            >
              <div className='text-sm font-extrabold  mb-1.5 uppercase'>{action.name}</div>
              <div className='gradient-blue-secondary flex items-center justify-center py-8 px-5 rounded-lg grow  border border-transparent group-[.is-green]:bg-green-primary/15 group-[.is-green]:border-green-primary'>
                <CoinsWithDiamond
                  iconContainerSize='Large'
                  iconClasses='w-[18.5px] h-[15.5px]'
                  typographyQuantity={4200}
                  typographyFontSize={'Size18'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-wrap justify-between border-b border-blue-accent-secondary mb-6 pb-4 items-center'>
        <ItemsBar
          isOwnProfile={isOwnProfile}
          totalPriceSelected={totalPriceSelected}
          amountSelected={selectedCard.length}
        />
        <div className='mt-2 xs:mt-0'>
          <ButtonsToggle
            options={cardsSorting}
            currentSelect={currentCardsVariant}
            peakFunction={setCurrentCardsVariant}
          />
        </div>
      </div>
      <div className='flex flex-wrap -mx-1 mb-8 md:mb-12 text-sm'>
        {sorted.map((card) => (
          <ItemCard key={card.id} onSelect={handleSelectCard} {...card} />
        ))}
      </div>
    </div>
  )
}

export default Profile
