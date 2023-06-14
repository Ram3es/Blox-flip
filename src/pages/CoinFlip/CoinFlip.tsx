import { useCallback, useContext } from 'react'
import { useCoinFlip } from '../../store/CoinFlipStore'
import { Context } from '../../store/Store'

import CoinFlipLobbyModal from './CoinFlipLobbyModal'
import CoinFlipGameModal from './CoinFlipGameModal'
import CoinFlipHeader from './CoinFlipHeader'
import CoinFlipGamesTable from './CoinFlipGamesTable'

import SignInModal from '../../components/containers/SignInModal'

const CoinFlip = () => {
  const {
    isOpenLobbyModal,
    setIsOpenLobbyModal,
    isOpenLoginModal,
    setIsOpenLoginModal,
    isOpenBattleGame
  } = useCoinFlip()

  const { state } = useContext(Context)

  const handleCloseLoginModal = useCallback(() => {
    setIsOpenLoginModal(false)
    setIsOpenLobbyModal(true)
  }, [])

  return (
    <>
      <CoinFlipHeader />
      <CoinFlipGamesTable />
      {isOpenLoginModal && !state.user && (
        <SignInModal isOpen={isOpenLoginModal} onClose={handleCloseLoginModal} />
      )}
      {isOpenLobbyModal && state.user && <CoinFlipLobbyModal />}
      {isOpenBattleGame && <CoinFlipGameModal />}
    </>
  )
}

export default CoinFlip
