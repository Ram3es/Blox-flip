import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useCoinFlip } from '../../store/CoinFlipStore'
import { useSocketCtx } from '../../store/SocketStore'

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

interface GameLobbyModalProps {
  onClose: Dispatch<SetStateAction<boolean>>
  isCreated: boolean
  handleFunction: () => void
}

const CoinFlipLobbyModal = ({ onClose, isCreated, handleFunction }: GameLobbyModalProps) => {
  const { socket } = useSocketCtx()

  const { selectedCoin, setSelectedCoin } = useCoinFlip()

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

  useEffect(() => {
    socket.emit(
      'load_items',
      { type: 'coinflip' },
      (data: { err: boolean; skins: IItemCard[] }) => {
        if (!data.err) {
          setSkins(data.skins)
        }
        console.log('Error skins loaded')
      }
    )
  }, [])

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
        <div className='flex items-center justify-center'>
          <CoinFlipLogoIcon />
          <span className='pl-3 text-lg hidden xxs:block'>
            {isCreated ? 'Join' : 'Create'} Coinflip
          </span>
        </div>
      </GameLobbyHeader>
      <GameLobbyItemsList items={skins} handleSelectItem={handleSelectSkin} />
      <GameLobbyFooter
        inventoryItemsLength={skins.length}
        selectedItemsCost={getCostInSelectedSkins()}
        selectedItemsLength={selectedSkins.length}
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
