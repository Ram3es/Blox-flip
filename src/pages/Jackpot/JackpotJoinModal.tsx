import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

import GameLobbyHeader from '../../components/containers/GameLobby/GameLobbyHeader'
import GameLobbyItemsList from '../../components/containers/GameLobby/GameLobbyItemsList'
import GameLobbyFooter from '../../components/containers/GameLobby/GameLobbyFooter'
import ModalWrapper from '../../components/containers/ModalWrapper'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import JackpotCoins from '../../components/icons/JackpotCoins'

import { Button } from '../../components/base/Button'

import { getCostByFieldName } from '../../helpers/numbers'

import type { IJackpotCard } from '../../types/Jackpot'

import { cards } from '../../mocks/cards'
import { useSocketCtx } from '../../store/SocketStore'
import InputWithInlineLabel from '../../components/common/InputWithInlineLabel'


interface JackpotJoinModalProps {
  onClose: Dispatch<SetStateAction<boolean>>
  handleFunction: (cards: IJackpotCard[]) => void
  userAvatar: string
}

const JackpotJoinModal = ({ onClose, handleFunction, userAvatar }: JackpotJoinModalProps) => {
  const { setTwoFactorAuthModal } = useSocketCtx()
  const [twoFactorAuthCode, setTwoFactorAuthCode] = useState('')

  const [items, setItems] = useState<IJackpotCard[]>([])
  const selectedItems = items.filter((item) => item.isSelected)

  const initialItems = useMemo(() => {
    return cards.map((card) => ({
      ...card,
      isSelected: false,
      avatar: userAvatar,
      pic: 'soon'
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
      modalClasses="relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-5xl w-full m-auto space-y-5 max-h-[555px] overflow-hidden"
    >
      <GameLobbyHeader
        skinsPrice={costInventoryItems}
        skinsQuantity={items.length}
        handleResetSelectedSkins={handleResetSelectedItems}
      >
        <div className="flex items-center gap-2">
          <span className="text-blue-golf">
            <JackpotCoins />
          </span>
          <span className="text-22 font-bold hidden xxs:block capitalize">Join Jackpot</span>
        </div>
      </GameLobbyHeader>
      <GameLobbyItemsList items={items} handleSelectItem={handleSelectItem} />
      <GameLobbyFooter
        inventoryItemsLength={items.length}
        selectedItemsCost={getCostInSelectedItems()}
        selectedItemsLength={selectedItems.length}
      >
        <div className="flex flex-col items-start xs:flex-row xs:items-center gap-3">
          <span className="text-xs uppercase text-gray-primary">Minimum value</span>
          <CoinsWithDiamond containerColor="GreenGradientSecondary" typographyQuantity={1500} />
        </div>
        <div className="w-[220px]">
          <InputWithInlineLabel
            value={twoFactorAuthCode}
            onChange={(event) => setTwoFactorAuthCode(event.target.value)}
            type="text"
            placeholder="..."
            label="2FA Code"
            containerClasses="pl-4 pr-4 rounded-10 gradient-background--blue__secondary py-1.5 flex items-center justify-between w-full cursor-text"
            labelClasses="pr-2 shrink truncate rounded-md px-3 h-[30px] flex items-center font-medium text-11 gradient--background--blue__third text-gray-primary"
            inputClasses="bg-transparent text-right outline-none placeholder:text-white max-w-[80px] overflow-y-scroll"
            icon={
              <svg
                className="cursor-pointer flex-shrink-0 mr-2 w-5 h-5 text-gray-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setTwoFactorAuthModal(true)}
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            }
          />
        </div>
        <Button color="GreenPrimary" onClick={handleBetJackpot}>
          <span className="h-9 py-2 px-5">Create</span>
        </Button>
      </GameLobbyFooter>
    </ModalWrapper>
  )
}

export default JackpotJoinModal
