import { useCallback, useContext } from 'react'
import { useCoinFlip } from '../../store/CoinFlipStore'
import { Context } from '../../store/Store'

import CoinFlipGameModal from './CoinFlipGameModal'
import CoinFlipHeader from './CoinFlipHeader'
import CoinFlipGamesTable from './CoinFlipGamesTable'

import SignInModal from '../../components/containers/SignInModal'

const CoinFlip = () => {
  const {
    isOpenLoginModal,
    setIsOpenLoginModal,
    isOpenBattleGame
  } = useCoinFlip()

  const { state } = useContext(Context)

  const handleCloseLoginModal = useCallback(() => {
    setIsOpenLoginModal(false)
  }, [])

  return (
    <>
      <CoinFlipHeader />
      <CoinFlipGamesTable />
      {isOpenLoginModal && !state.user && (
        <SignInModal isOpen={isOpenLoginModal} onClose={handleCloseLoginModal} />
      )}
      {isOpenBattleGame && <CoinFlipGameModal />}
    </>
  )
}

export default CoinFlip
