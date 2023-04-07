import { useCallback } from 'react'
import { useCoinFlip } from '../../store/CoinFlipStore'

import GameLobbyModal from '../../components/common/GameLobbyModal'
import CoinFlipGame from './CoinFlipGame'
import CoinFlipHeader from './CoinFlipHeader'
import CoinFlipList from './CoinFlipList'

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
      <CoinFlipList />
      {isOpenCreateGame && (
        <GameLobbyModal
          isCreated={false}
          handleFunction={handleCreateGame}
          onClose={() => setIsOpenCreateGame(false)}
        />
      )}
      {isOpenJoinGame && (
        <GameLobbyModal
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
