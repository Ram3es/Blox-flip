import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import ItemCard from '../../components/common/Cards/ItemCard'
import ModalWrapper from '../../components/containers/ModalWrapper'
import CoinFlipLogoIcon from '../../components/icons/CoinFlipLogoIcon'
import RefreshIcon from '../../components/icons/RefreshIcon'
import { Button } from '../../components/base/Button'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'

import { IItemCard } from '../../types/ItemCard'
import { cards } from '../../mocks/cards'

interface CoinFlipCreateModalProps {
  onClose: Dispatch<SetStateAction<boolean>>
}

const CoinFlipCreateModal = ({ onClose }: CoinFlipCreateModalProps) => {
  const [selectedCard, setSelectedCard] = useState<IItemCard[]>([])
  const [userItems, setUserItems] = useState<IItemCard[]>([])

  const toggleItemSelection = (
    items: IItemCard[],
    id: string,
    isSelected: boolean
  ): IItemCard[] => {
    return items.map((item) => {
      if (item.id === id) {
        return { ...item, isSelected }
      }
      return item
    })
  }

  const isCardSelected = (selectedCards: IItemCard[], id: string): boolean => {
    return selectedCards.some((card) => card.id === id)
  }

  const handleSelectCard = (id: string): void => {
    const card = userItems.find((item) => item.id === id)

    if (!card) return

    const isSelected = isCardSelected(selectedCard, card.id)

    setSelectedCard((prevSate) => {
      return isSelected ? prevSate.filter((el) => el.id !== card.id) : [...prevSate, card]
    })

    setUserItems((state) => toggleItemSelection(state, id, !isSelected))
  }

  useEffect(() => {
    setUserItems(cards)
    setSelectedCard([])
  }, [])

  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses='relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-5xl w-full m-auto space-y-5 max-h-[555px] overflow-auto scrollbar-w-5 scrollbar-thumb-blue-highlight scrollbar-track-blue-darken/10 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full'
    >
      <div className='flex justify-between items-center space-x-4 border-b border-lightblue-darken/50 pb-4 pr-10'>
        <div className='flex items-center justify-center'>
          <CoinFlipLogoIcon />
          <span className='pl-3 text-lg hidden md:block'>Create Coinflip</span>
        </div>
        <div className='flex justify-center items-center space-x-4'>
          <Button variant='YellowOutlined'>
            <span className=' text-13 font-medium px-3 py-1.5 md:px-4 md:py-2.5 flex items-center justify-center'>
              21 <span className='hidden md:block  text-orange-primary-light'>&nbsp;Items</span>
            </span>
          </Button>
          <div className='flex items-center space-x-2'>
            <span className='font-medium text-13 leading-4 text-blue-ocean-secondary'>
              Inventory value
            </span>
            <div className='flex items-center border border-green-primary gradient-green-secondary shadow-green-primary-20 rounded px-3 py-1.5 md:px-4 md:py-2.5'>
              <QuantityCoins quantity={23535.32} />
            </div>
          </div>
          <Button>
            <RefreshIcon />
          </Button>
        </div>
      </div>
      <div className='flex flex-wrap mb-8 text-sm'>
        {userItems.map((item) => (
          <ItemCard key={Number(item.id) * Math.random()} onSelect={handleSelectCard} {...item} />
        ))}
      </div>
    </ModalWrapper>
  )
}

export default CoinFlipCreateModal
