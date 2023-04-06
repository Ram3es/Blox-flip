import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useCoinFlip } from '../../store/CoinFlipStore'

import ItemCard from './Cards/ItemCard'
import ModalWrapper from '../containers/ModalWrapper'
import CoinFlipLogoIcon from '../icons/CoinFlipLogoIcon'
import ToggleCoin from './BetActions/ToggleCoin'
import QuantityCoinsContainer from './QuantityCoins/QuantityCoinsContainer'
import { Button } from '../base/Button'
import { QuantityCoins } from './QuantityCoins/QuantityCoins'

import RefreshIcon from '../icons/RefreshIcon'

import CoinFlipHead from '../../assets/img/CoinFlipHead.png'
import CoinFlipTail from '../../assets/img/CoinFlipTail.png'

import { IItemCard } from '../../types/ItemCard'

import { getCostByFieldName } from '../../helpers/numbers'
import { cards } from '../../mocks/cards'

interface GameLobbyModalProps {
  onClose: Dispatch<SetStateAction<boolean>>
  isCreated: boolean
}

type UpdateArrayBySelectedItem = (
  items: IItemCard[],
  id: string,
  isSelected: boolean
) => IItemCard[]
type IsItemSelected = (items: IItemCard[], id: string) => boolean
type HandleSelectItem = (id: string) => void

const GameLobbyModal = ({ onClose, isCreated }: GameLobbyModalProps) => {
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
      <div className='flex justify-between items-center space-x-4 border-b border-lightblue-darken/50 pb-4 xs:pr-10 pt-5 xs:pt-3'>
        <div className='flex items-center justify-center'>
          <CoinFlipLogoIcon />
          <span className='pl-3 text-lg hidden xxs:block'>
            {isCreated ? 'Join' : 'Create'} Coinflip
          </span>
        </div>
        <div className='flex justify-between items-center md:space-x-4 space-x-2'>
          <Button variant='YellowOutlined'>
            <span className='text-13 font-medium px-4 py-2.5 flex items-center justify-center'>
              {items.length} <span className='text-orange-primary-light'>&nbsp;Items</span>
            </span>
          </Button>
          <div className='flex items-center gap-2'>
            <span className='font-medium text-13 leading-4 text-blue-ocean-secondary hidden xxs:block'>
              Inventory value
            </span>
            <QuantityCoinsContainer>
              <QuantityCoins quantity={getCostByFieldName(items, 'price')} />
            </QuantityCoinsContainer>
          </div>
          <Button onClick={handleResetSelectedItems}>
            <RefreshIcon />
          </Button>
        </div>
      </div>
      <div className='pb-60 xs:pb-40 w-full pr-3 -mr-2 flex flex-wrap overflow-y-auto min-h-[276px] max-h-full scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
        {items.map((item) => (
          <ItemCard variant='CoinFlip' key={item.id} onSelect={handleSelectItem} {...item} />
        ))}
      </div>
      <div className='absolute z-[50] bottom-0 left-0 w-full flex flex-col space-y-2 xs:space-y-0 xs:flex-row items-center justify-between py-2.5 px-6 bg-blue-highlight-secondary'>
        <div className='flex flex-col xs:flex-row items-center space-x-2'>
          <div className='flex items-center justify-between gap-2'>
            <span className='text-gray-primary text-sm font-semibold hidden xs:block'>
              Total selected
            </span>
            <div className='h-9 bg-blue-ocean-secondary/25 border-2 border-blue-ocean-secondary/50 px-3  md:px-4 rounded font-bold text-sm flex items-center justify-between'>
              {selectedItems.length}/<span className='text-white/60'>{items.length}</span>
              <span className='text-gray-primary uppercase font-semibold text-xs hidden xs:block'>
                &nbsp;skins
              </span>
            </div>
            <QuantityCoinsContainer size='SMALL'>
              <QuantityCoins textSize='text-base' quantity={getCostInSelectedItems()} />
            </QuantityCoinsContainer>
          </div>
        </div>
        <div className='h-9 flex items-center gradient-green-secondary shadow-green-primary-20 rounded px-3 md:px-4'>
          <QuantityCoins textSize='text-sm' quantity={23535.32} />
        </div>

        <div className='flex items-center justify-between space-x-4'>
          {!isCreated && (
            <ToggleCoin selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} />
          )}
          {isCreated && (
            <img
              key={selectedCoin === 0 ? 1 : 0}
              className='w-7 h-7 sm:w-11 sm:h-11'
              src={selectedCoin === 0 ? CoinFlipTail : CoinFlipHead}
              alt={selectedCoin === 0 ? 'tail' : 'head'}
            />
          )}
          <Button color='GreenPrimary'>
            <span className='h-9 py-2 px-5'>{isCreated ? 'Join' : 'Create'}</span>
          </Button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default GameLobbyModal
