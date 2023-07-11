import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useSocketCtx } from '../../store/SocketStore'

import { Switch } from '@headlessui/react'
import { toast } from 'react-toastify'

import ModalWrapper from '../../components/containers/ModalWrapper'
import GameLobbyHeader from '../../components/containers/GameLobby/GameLobbyHeader'
import GameLobbyItemsList from '../../components/containers/GameLobby/GameLobbyItemsList'
import GameLobbyFooter from '../../components/containers/GameLobby/GameLobbyFooter'
import { Button } from '../../components/base/Button'

import KingGameIcon from '../../assets/img/king_main_icon.svg'

import { getCostByFieldName } from '../../helpers/numbers'

import type { IItemCard } from '../../types/ItemCard'

interface KingJoinModalProps {
  onClose: Dispatch<SetStateAction<boolean>>
  handleFunction: () => void
}

export type HandleSelectItem = (id: string) => void

const KingJoinModal = ({ onClose, handleFunction }: KingJoinModalProps) => {
  const { socket } = useSocketCtx()

  const [safeMode, setSafeMode] = useState(false)
  const [skins, setSkins] = useState<IItemCard[]>([])

  const selectedSkins = skins.filter((skin) => skin.isSelected)

  const updateArrayBySelectedSkin = (skins: IItemCard[], skinId: string, isSelected: boolean) => {
    return skins.map((skin) => (skin.id === skinId ? { ...skin, isSelected } : skin))
  }

  const isItemSelected = (skins: IItemCard[], skinId: string) => {
    return skins.some((skin) => skin.id === skinId && skin.isSelected)
  }

  const findSkinByItemId = (skinId: string) => skins.find((skin) => skin.id === skinId)

  const handleSelectSkin = useCallback(
    (skinId: string) => {
      const skin = findSkinByItemId(skinId)

      if (!skin) return

      const isSelected = isItemSelected(skins, skin.id)

      setSkins((prev) => updateArrayBySelectedSkin(prev, skinId, !isSelected))
    },
    [skins]
  )

  const handleResetSelectedSkins = useCallback(() => {
    setSkins(skins.map((skin) => ({ ...skin, isSelected: false })))
  }, [])

  const getCostInSelectedSkins = (): number => {
    return getCostByFieldName(selectedSkins, 'price')
  }

  const costInventorySkins = getCostByFieldName(skins, 'price')

  const getSelectedSkinsIds = (selectedSkins: IItemCard[]) => {
    return selectedSkins.map((skin) => skin.id)
  }

  const handleJoinKing = useCallback(() => {
    socket.emit(
      'challenger_join',
      {
        items: getSelectedSkinsIds(skins),
        type: safeMode ? 1 : 0
      },
      (response: { error: boolean, message: string }) => {
        if (response.error) {
          toast.error(response.message)
        }
        if (!response.error) {
          handleFunction()
        }
      }
    )

    // handleFunction() // delete after setup server
  }, [safeMode])

  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses='relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-5xl w-full m-auto space-y-5 max-h-[555px] overflow-hidden'
    >
      <GameLobbyHeader
        skinsPrice={costInventorySkins}
        skinsQuantity={skins.length}
        handleResetSelectedSkins={handleResetSelectedSkins}
      >
        <div className='flex items-center gap-2'>
          <img src={KingGameIcon} alt='king' />
          <span className='text-22 font-bold hidden xxs:block capitalize'>champion deposit</span>
        </div>
      </GameLobbyHeader>
      <GameLobbyItemsList items={skins} handleSelectItem={handleSelectSkin} />
      <GameLobbyFooter
        inventoryItemsLength={skins.length}
        selectedItemsCost={getCostInSelectedSkins()}
        selectedItemsLength={selectedSkins.length}
        min={500}
        max={1000}
      >
        <div className='flex gap-2 items-center w-36'>
          <span>Safe mode</span>
          <Switch
            checked={safeMode}
            onChange={setSafeMode}
            className={`${
              safeMode ? 'bg-green-primary' : 'bg-gray-primary'
            } relative inline-flex h-9 w-14 items-center rounded-full`}
          >
            <span
              className={`${
                safeMode ? 'translate-x-7' : 'translate-x-1'
              } inline-block h-6 w-6 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
        <Button color='GreenPrimary' onClick={handleJoinKing}>
          <span className='h-9 py-2 px-5'>Deposit</span>
        </Button>
      </GameLobbyFooter>
    </ModalWrapper>
  )
}

export default KingJoinModal
