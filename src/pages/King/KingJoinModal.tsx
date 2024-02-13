import { Dispatch, SetStateAction, useCallback, useState } from 'react'
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
import InputWithInlineLabel from '../../components/common/InputWithInlineLabel'
import { IKingJoin } from '../../types/King'

interface KingJoinModalProps {
  onClose: Dispatch<SetStateAction<boolean>>
  handleFunction: () => void
}

export type HandleSelectItem = (id: string) => void

const KingJoinModal = ({ onClose, handleFunction }: KingJoinModalProps) => {
  const { socket, setTwoFactorAuthModal } = useSocketCtx()
  const [twoFactorAuthCode, setTwoFactorAuthCode] = useState('')

  const [safeMode, setSafeMode] = useState(false)
  const [skins, setSkins] = useState<IItemCard[]>([])

  const selectedSkins = skins.filter((skin) => skin.isSelected)

  const updateArrayBySelectedSkin = (skins: IItemCard[], skinId: number, isSelected: boolean) => {
    return skins.map((skin) => (skin.id === skinId ? { ...skin, isSelected } : skin))
  }

  const isItemSelected = (skins: IItemCard[], skinId: number) => {
    return skins.some((skin) => skin.id === skinId && skin.isSelected)
  }

  const findSkinByItemId = (skinId: number) => skins.find((skin) => skin.id === skinId)

  const handleSelectSkin = useCallback(
    (skinId: number) => {
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
    const sendedData: IKingJoin = {
      items: getSelectedSkinsIds(skins),
      type: safeMode ? 1 : 0
    }

    if (twoFactorAuthCode) {
      sendedData['2fa_code'] = twoFactorAuthCode
    }

    socket.emit('challenger_join', sendedData, (response: { error: boolean, message: string }) => {
      if (response.error) {
        toast.error(response.message)
      }
      if (!response.error) {
        handleFunction()
      }
    })

    // handleFunction() // delete after setup server
  }, [safeMode])

  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses="relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-7xl w-full m-auto space-y-5 max-h-[555px] overflow-hidden"
    >
      <GameLobbyHeader
        skinsPrice={costInventorySkins}
        skinsQuantity={skins.length}
        handleResetSelectedSkins={handleResetSelectedSkins}
      >
        <div className="flex items-center gap-2">
          <img src={KingGameIcon} alt="king" />
          <span className="text-22 font-bold hidden xxs:block capitalize">champion deposit</span>
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
        <div className="flex gap-2 items-center w-36">
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
        <Button color="GreenPrimary" onClick={handleJoinKing}>
          <span className="h-9 py-2 px-5">Deposit</span>
        </Button>
      </GameLobbyFooter>
    </ModalWrapper>
  )
}

export default KingJoinModal
