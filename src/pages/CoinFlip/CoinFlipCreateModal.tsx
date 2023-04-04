import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useCoinFlip } from '../../store/CoinFlipStore'

import ItemCard from '../../components/common/Cards/ItemCard'
import ModalWrapper from '../../components/containers/ModalWrapper'
import CoinFlipLogoIcon from '../../components/icons/CoinFlipLogoIcon'
import RefreshIcon from '../../components/icons/RefreshIcon'
import ToggleCoin from '../../components/common/BetActions/ToggleCoin'
import { Button } from '../../components/base/Button'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'

import { IItemCard } from '../../types/ItemCard'

import { getCostByFieldName } from '../../helpers/numbers'
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
type HandleSelectItem = (id: string) => void

const CoinFlipCreateModal = ({ onClose }: CoinFlipCreateModalProps) => {
  const { selectedCoin, setSelectedCoin } = useCoinFlip()

  const [items, setItems] = useState<IItemCard[]>([])

  const selectedItems = items.filter((item) => item.isSelected)

  const updateArrayBySelectedItem: UpdateArrayBySelectedItem = (items, id, isSelected) => {
    return items.map((item) => (item.id === id ? { ...item, isSelected } : item))
  }

  const isItemSelected: IsItemSelected = (items, id) => {
    return items.some((item) => item.id === id && item.isSelected)
  }

  const handleSelectItem: HandleSelectItem = useCallback(
    (id) => {
      const item = items.find((item) => item.id === id)

      if (!item) return

      const isSelected = isItemSelected(items, item.id)

      setItems((prev) => updateArrayBySelectedItem(prev, id, !isSelected))
    },
    [items]
  )

  const handleResetSelectedItems = useCallback(() => {
    setItems(cards.map((card) => ({ ...card, isSelected: false })))
  }, [])

  const getCostInSelectedItems = (): number => {
    return getCostByFieldName(selectedItems, 'price')
  }

  useEffect(() => {
    setItems(cards.map((card) => ({ ...card, isSelected: false })))
  }, [])

  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses='relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-5xl w-full m-auto space-y-5 max-h-[555px] overflow-hidden'
    >
      <div className='flex justify-between items-center space-x-4 border-b border-lightblue-darken/50 pb-4 pr-10'>
        <div className='flex items-center justify-center'>
          <CoinFlipLogoIcon />
          <span className='pl-3 text-lg hidden md:block'>Create Coinflip</span>
        </div>
        <div className='flex justify-center items-center space-x-4'>
          <Button variant='YellowOutlined'>
            <span className=' text-13 font-medium px-3 py-1.5 md:px-4 md:py-2.5 flex items-center justify-center'>
              {items.length}{' '}
              <span className='hidden md:block text-orange-primary-light'>&nbsp;Items</span>
            </span>
          </Button>
          <div className='flex items-center space-x-2'>
            <span className='font-medium text-13 leading-4 text-blue-ocean-secondary'>
              Inventory value
            </span>
            <div className='flex items-center border border-green-primary gradient-green-secondary shadow-green-primary-20 rounded px-3 py-1.5 md:px-4 md:py-2.5'>
              <QuantityCoins quantity={getCostByFieldName(items, 'price')} />
            </div>
          </div>
          <Button onClick={handleResetSelectedItems}>
            <RefreshIcon />
          </Button>
        </div>
      </div>
      <div className='w-full min-h-[232px] max-h-[calc(100vh_-_210px)] flex flex-wrap overflow-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full  pr-3 -mr-2 '>
        {items.map((item) => (
          <ItemCard key={item.id} onSelect={handleSelectItem} {...item} />
        ))}
      </div>
      <div className='absolute z-[50] bottom-0 left-0 w-full flex items-center justify-between py-2.5 px-6 bg-blue-highlight-secondary'>
        <div className='flex items-center space-x-2'>
          <span className='text-gray-primary text-sm font-semibold'>Total selected</span>
          <div className='h-9 bg-blue-ocean-secondary/25 border-2 border-blue-ocean-secondary/50 px-3  md:px-4 rounded font-bold text-sm flex items-center justify-between'>
            {selectedItems.length}/<span className='text-white/60'>{items.length}</span>
            <span className='text-gray-primary uppercase font-semibold text-xs'>&nbsp;skins</span>
          </div>
          <div className='h-9 flex items-center border-2 border-green-primary/40 gradient-green-secondary shadow-green-primary-20 rounded px-3 py-1.5 md:px-4 md:py-2.5'>
            <QuantityCoins textSize='text-base' quantity={getCostInSelectedItems()} />
          </div>
          <div className='h-9 flex items-center gradient-green-secondary shadow-green-primary-20 rounded px-3 md:px-4'>
            <QuantityCoins textSize='text-sm' quantity={23535.32} />
          </div>
        </div>
        <div className='flex items-center justify-between space-x-4'>
          <ToggleCoin selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} />
          <Button color='GreenPrimary'>
            <span className='h-9 py-2 px-5'>Create</span>
          </Button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default CoinFlipCreateModal
