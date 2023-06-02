import { useCallback } from 'react'
import { useCoinFlip } from '../../store/CoinFlipStore'

import CoinFlipLobbyModal from './CoinFlipLobbyModal'
import CoinFlipGame from './CoinFlipGame'
import CoinFlipHeader from './CoinFlipHeader'
import CoinFlipGamesTable from './CoinFlipGamesTable'

const CoinFlip = () => {
  const {
    isOpenCreateGame,
    setIsOpenCreateGame,
    isOpenJoinGame,
    setIsOpenJoinGame,
    isOpenBattleGame,
    setIsOpenBattleGame,
    isOpenWatchedGame,
    setIsOpenWatchedGame,
    isOpenCallBot,
    setIsOpenCallBot
  } = useCoinFlip()

  const handleCreateGame = useCallback(() => {
    setIsOpenCreateGame(false)
    setIsOpenBattleGame(true)
  }, [])

  const handleJoinGame = useCallback(() => {
    setIsOpenJoinGame(false)
    setIsOpenBattleGame(true)
  }, [])

  return (
    <>
      <CoinFlipHeader />
      <CoinFlipGamesTable />
      {/* {isOpenCreateGame && (
        <CoinFlipLobbyModal
          isCreated={false}
          handleFunction={handleCreateGame}
          onClose={() => setIsOpenCreateGame(false)}
        />
      )} */}
      {isOpenJoinGame && (
        <CoinFlipLobbyModal
          isCreated={true}
          handleFunction={handleJoinGame}
          onClose={() => setIsOpenJoinGame(false)}
        />
      )}
      {isOpenBattleGame && <CoinFlipGame onClose={() => setIsOpenBattleGame(false)} />}
      {isOpenWatchedGame && <CoinFlipGame onClose={() => setIsOpenWatchedGame(false)} />}
      {isOpenCallBot && <CoinFlipGame withBot={true} onClose={() => setIsOpenCallBot(false)} />}
    </>
  )
}

export default CoinFlip
