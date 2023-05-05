import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useCoinFlip } from '../../store/CoinFlipStore'

import ModalWrapper from '../../components/containers/ModalWrapper'
import GameLobbyHeader from '../../components/containers/GameLobby/GameLobbyHeader'
import GameLobbyItemsList from '../../components/containers/GameLobby/GameLobbyItemsList'
import GameLobbyFooter from '../../components/containers/GameLobby/GameLobbyFooter'

import CoinFlipLogoIcon from '../../components/icons/CoinFlipLogoIcon'
import ToggleCoin from '../../components/common/BetActions/ToggleCoin'
import { Button } from '../../components/base/Button'

import CoinFlipHead from '../../assets/img/CoinFlipHead.png'
import CoinFlipTail from '../../assets/img/CoinFlipTail.png'

import type { IItemCard } from '../../types/ItemCard'

import { getCostByFieldName } from '../../helpers/numbers'
import { cards } from '../../mocks/cards'

interface GameLobbyModalProps {
  onClose: Dispatch<SetStateAction<boolean>>
  isCreated: boolean
  handleFunction: () => void
}

type UpdateArrayBySelectedItem = (
  items: IItemCard[],
  id: string,
  isSelected: boolean
) => IItemCard[]
type IsItemSelected = (items: IItemCard[], id: string) => boolean
type HandleSelectItem = (id: string) => void

const CoinFlipLobbyModal = ({ onClose, isCreated, handleFunction }: GameLobbyModalProps) => {
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

  const costInventoryItems = getCostByFieldName(items, 'price')

  useEffect(() => {
    setItems(cards.map((card) => ({ ...card, isSelected: false })))
  }, [])

  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses='relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-5xl w-full m-auto space-y-5 max-h-[555px] overflow-hidden'
    >
      <GameLobbyHeader
        skinsPrice={costInventoryItems}
        skinsQuantity={items.length}
        handleResetSelectedSkins={handleResetSelectedItems}
      >
        <div className='flex items-center justify-center'>
          <CoinFlipLogoIcon />
          <span className='pl-3 text-lg hidden xxs:block'>
            {isCreated ? 'Join' : 'Create'} Coinflip
          </span>
        </div>
      </GameLobbyHeader>
      <GameLobbyItemsList items={items} handleSelectItem={handleSelectItem} />
      <GameLobbyFooter
        inventoryItemsLength={items.length}
        selectedItemsCost={getCostInSelectedItems()}
        selectedItemsLength={selectedItems.length}
        betGap={2555}
      >
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
          <Button color='GreenPrimary' onClick={handleFunction}>
            <span className='h-9 py-2 px-5'>{isCreated ? 'Join' : 'Create'}</span>
          </Button>
        </div>
      </GameLobbyFooter>
    </ModalWrapper>
  )
}

export default CoinFlipLobbyModal
