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

type UpdateArrayBySelectedItem = (
  items: IItemCard[],
  id: string,
  isSelected: boolean
) => IItemCard[]
type IsItemSelected = (items: IItemCard[], id: string) => boolean
type HandleSelectCard = (id: string) => void

const CoinFlipCreateModal = ({ onClose }: CoinFlipCreateModalProps) => {
  const [items, setItems] = useState<IItemCard[]>([])

  const updateArrayBySelectedItem: UpdateArrayBySelectedItem = (items, id, isSelected) => {
    return items.map((item) => (item.id === id ? { ...item, isSelected } : item))
  }

  const isItemSelected: IsItemSelected = (items, id) => {
    return items.some((item) => item.id === id && item.isSelected)
  }

  const handleSelectCard: HandleSelectCard = (id) => {
    const item = items.find((item) => item.id === id)

    if (!item) return

    const isSelected = isItemSelected(items, item.id)

    setItems((prev) => updateArrayBySelectedItem(prev, id, !isSelected))
  }

  useEffect(() => {
    setItems(cards.map((card) => ({ ...card, isSelected: false })))
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
        {items.map((item) => (
          <ItemCard key={Number(item.id) * Math.random()} onSelect={handleSelectCard} {...item} />
        ))}
      </div>
    </ModalWrapper>
  )
}

export default CoinFlipCreateModal
