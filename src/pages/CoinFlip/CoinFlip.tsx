import { useCallback, useContext } from 'react'
import { useCoinFlip } from '../../store/CoinFlipStore'

import CoinFlipLobbyModal from './CoinFlipLobbyModal'
import CoinFlipGame from './CoinFlipGame'
import CoinFlipHeader from './CoinFlipHeader'
import CoinFlipGamesTable from './CoinFlipGamesTable'
import SignInModal from '../../components/containers/SignInModal'
import { Context } from '../../store/Store'

const CoinFlip = () => {
  const {
    isOpenLobbyModal,
    setIsOpenLobbyModal,
    isOpenLoginModal,
    setIsOpenLoginModal,
    isOpenBattleGame,
    setIsOpenBattleGame
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
      {isOpenBattleGame && <CoinFlipGame onClose={() => setIsOpenBattleGame(false)} />}
    </>
  )
}

export default CoinFlip
