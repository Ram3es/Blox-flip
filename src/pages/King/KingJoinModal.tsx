import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

import ModalWrapper from '../../components/containers/ModalWrapper'
import GameLobbyHeader from '../../components/containers/GameLobby/GameLobbyHeader'
import GameLobbyItemsList from '../../components/containers/GameLobby/GameLobbyItemsList'
import GameLobbyFooter from '../../components/containers/GameLobby/GameLobbyFooter'
import { Button } from '../../components/base/Button'

import KingGameIcon from '../../assets/img/king_main_icon.svg'

import { getCostByFieldName } from '../../helpers/numbers'
import { cards } from '../../mocks/cards'

import type { IItemCard } from '../../types/ItemCard'

interface KingJoinModalProps {
  onClose: Dispatch<SetStateAction<boolean>>
  handleFunction: () => void
}

type UpdateArrayBySelectedItem = (
  items: IItemCard[],
  id: string,
  isSelected: boolean
) => IItemCard[]
type IsItemSelected = (items: IItemCard[], id: string) => boolean
export type HandleSelectItem = (id: string) => void

const KingJoinModal = ({ onClose, handleFunction }: KingJoinModalProps) => {
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

      if (item) {
        const isSelected = isItemSelected(items, item.id)

        setItems((prev) => updateArrayBySelectedItem(prev, id, !isSelected))
      }
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
        <div className='flex items-center gap-2'>
          <img src={KingGameIcon} alt='king' />
          <span className='text-22 font-bold hidden xxs:block capitalize'>king deposit</span>
        </div>
      </GameLobbyHeader>
      <GameLobbyItemsList items={items} handleSelectItem={handleSelectItem} />
      <GameLobbyFooter
        inventoryItemsLength={items.length}
        selectedItemsCost={getCostInSelectedItems()}
        selectedItemsLength={selectedItems.length}
        betGap={2555}
      >
        <Button color='GreenPrimary' onClick={handleFunction}>
          <span className='h-9 py-2 px-5'>Deposit</span>
        </Button>
      </GameLobbyFooter>
    </ModalWrapper>
  )
}

export default KingJoinModal
