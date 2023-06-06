import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useCoinFlip } from '../../store/CoinFlipStore'
import { useSocketCtx } from '../../store/SocketStore'

import ModalWrapper from '../../components/containers/ModalWrapper'
import GameLobbyHeader from '../../components/containers/GameLobby/GameLobbyHeader'
import GameLobbyItemsList from '../../components/containers/GameLobby/GameLobbyItemsList'
import GameLobbyFooter from '../../components/containers/GameLobby/GameLobbyFooter'

import CoinFlipLogoIcon from '../../components/icons/CoinFlipLogoIcon'
import ToggleCoin from '../../components/common/BetActions/ToggleCoin'
import { Button } from '../../components/base/Button'

import YellowCoin from '../../assets/img/CoinFlipHead.png'
import PurpleCoin from '../../assets/img/CoinFlipTail.png'

import { IItemCard } from '../../types/ItemCard'
import { ICoin, ICoinFlip } from '../../types/CoinFlip'

import { getCostByFieldName } from '../../helpers/numbers'

const CoinFlipLobbyModal = () => {
  const {
    setIsOpenBattleGame,
    setCurrentGame,
    setIsOpenLobbyModal,
    currentGame
  } = useCoinFlip()
  const { socket } = useSocketCtx()

  const [skins, setSkins] = useState<IItemCard[]>([])
  const [selectedCoin, setSelectedCoin] = useState<ICoin>(0)

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

  const handleCreateCoinFlip = useCallback(() => {
    socket.emit(
      'coinflip_create',
      { type: 'coinflip', items: getSelectedSkinsIds(skins), coin: selectedCoin },
      (response: { error: boolean, message: string, data: ICoinFlip }) => {
        if (response.error) {
          toast.error(response.message)
        }

        if (!response.error) {
          setIsOpenBattleGame(true)
          setCurrentGame(response.data)
        }
      }
    )
    setIsOpenLobbyModal(false)
    setIsOpenBattleGame(true)
  }, [skins])

  const handleJoinCoinFlip = useCallback(() => {
    if (currentGame) {
      socket.emit(
        'coinflip_join',
        {
          type: 'coinflip',
          items: getSelectedSkinsIds(skins),
          gameId: currentGame.id,
          coin: selectedCoin
        },
        (response: { error: boolean, message: string }) => {
          if (response.error) {
            toast.error(response.message)
          }

          if (!response.error) {
            setIsOpenBattleGame(true)
          }
        }
      )
      setIsOpenLobbyModal(false)
      setIsOpenBattleGame(true)
    }
  }, [skins])

  useEffect(() => {
    socket.emit(
      'load_items',
      { type: 'coinflip' },
      (response: { error: boolean, message: string, skins: IItemCard[] }) => {
        if (response.error) {
          toast.error(response.message)
        }
        if (!response.error) {
          setSkins(response.skins)
        }
      }
    )
  }, [])

  const handleCloseModal = useCallback(() => {
    setCurrentGame(null)
    setIsOpenLobbyModal(false)
  }, [])

  return (
    <ModalWrapper
      closeModal={handleCloseModal}
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
            {currentGame ? 'Join' : 'Create'} Coinflip
          </span>
        </div>
      </GameLobbyHeader>
      <GameLobbyItemsList items={skins} handleSelectItem={handleSelectSkin} />
      <GameLobbyFooter
        inventoryItemsLength={skins.length}
        selectedItemsCost={getCostInSelectedSkins()}
        selectedItemsLength={selectedSkins.length}
        max={currentGame?.max}
        min={currentGame?.min}
      >
        <div className='flex items-center justify-between space-x-4'>
          {!currentGame && (
            <ToggleCoin selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} />
          )}
          {currentGame && (
            <img
              className='w-7 h-7 sm:w-11 sm:h-11'
              src={currentGame.creator.coin ? YellowCoin : PurpleCoin}
              alt='coinflip side'
            />
          )}
          <Button
            color='GreenPrimary'
            onClick={currentGame ? handleJoinCoinFlip : handleCreateCoinFlip}
          >
            <span className='h-9 py-2 px-5'>{currentGame ? 'Join' : 'Create'}</span>
          </Button>
        </div>
      </GameLobbyFooter>
    </ModalWrapper>
  )
}

export default CoinFlipLobbyModal
