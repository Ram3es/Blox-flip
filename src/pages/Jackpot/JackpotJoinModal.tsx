import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

import GameLobbyHeader from '../../components/containers/GameLobby/GameLobbyHeader'
import GameLobbyItemsList from '../../components/containers/GameLobby/GameLobbyItemsList'
import GameLobbyFooter from '../../components/containers/GameLobby/GameLobbyFooter'
import ModalWrapper from '../../components/containers/ModalWrapper'

import JackpotCoins from '../../components/icons/JackpotCoins'

import { Button } from '../../components/base/Button'

import { getCostByFieldName } from '../../helpers/numbers'

import type { IJackpotCard } from '../../types/Jackpot'

import { cards } from '../../mocks/cards'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'

interface JackpotJoinModalProps {
  onClose: Dispatch<SetStateAction<boolean>>
  handleFunction: Dispatch<SetStateAction<IJackpotCard[]>>
}

const JackpotJoinModal = ({ onClose, handleFunction }: JackpotJoinModalProps) => {
  const [items, setItems] = useState<IJackpotCard[]>([])
  const selectedItems = items.filter((item) => item.isSelected)

  const AVATAR_URL =
    'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/563.jpg'

  const initialItems = useMemo(() => {
    return cards.map((card) => ({
      ...card,
      isSelected: false,
      avatar: AVATAR_URL
    }))
  }, [])

  useEffect(() => {
    setItems(initialItems)
  }, [initialItems])

  const handleResetSelectedItems = useCallback(() => {
    setItems(initialItems)
  }, [initialItems])

  const isItemSelected = (items: IJackpotCard[], id: string) => {
    return items.some((item) => item.id === id && item.isSelected)
  }

  const updateArrayBySelectedItem = (
    items: IJackpotCard[],
    id: string,
    isSelected: boolean
  ): IJackpotCard[] => {
    return items.map((item) => (item.id === id ? { ...item, isSelected } : item))
  }

  const handleSelectItem = useCallback(
    (id: string) => {
      const item = items.find((item) => item.id === id)

      if (item) {
        const isSelected = isItemSelected(items, item.id)

        setItems((prev) => updateArrayBySelectedItem(prev, id, !isSelected))
      }
    },
    [items, isItemSelected, updateArrayBySelectedItem]
  )

  const getCostInSelectedItems = (): number => {
    return getCostByFieldName(selectedItems, 'price')
  }

  const costInventoryItems = getCostByFieldName(items, 'price')

  const handleBetJackpot = () => {
    onClose(true)
    handleFunction(selectedItems)
  }

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
          <span className='text-blue-golf'>
            <JackpotCoins />
          </span>
          <span className='text-22 font-bold hidden xxs:block capitalize'>Join Jackpot</span>
        </div>
      </GameLobbyHeader>
      <GameLobbyItemsList items={items} handleSelectItem={handleSelectItem} />
      <GameLobbyFooter
        inventoryItemsLength={items.length}
        selectedItemsCost={getCostInSelectedItems()}
        selectedItemsLength={selectedItems.length}
      >
        <div className='flex flex-col items-start xs:flex-row xs:items-center gap-3'>
          <span className='text-xs uppercase text-gray-primary'>Minimum value</span>
          <CoinsWithDiamond containerColor='GreenGradientSecondary' typographyQuantity={1500} />
        </div>
        <Button color='GreenPrimary' onClick={handleBetJackpot}>
          <span className='h-9 py-2 px-5'>Create</span>
        </Button>
      </GameLobbyFooter>
    </ModalWrapper>
  )
}

export default JackpotJoinModal
