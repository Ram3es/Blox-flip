/* eslint-disable multiline-ternary */
import GameLobbyModal from '../../components/common/GameLobbyModal'
import { useCoinFlip } from '../../store/CoinFlipStore'
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

  return (
    <>
      <CoinFlipHeader />
      <CoinFlipList />
      {isOpenCreateGame ? (
        <GameLobbyModal isCreated={false} onClose={() => setIsOpenCreateGame(false)} />
      ) : null}
      {isOpenJoinGame ? (
        <GameLobbyModal isCreated={true} onClose={() => setIsOpenJoinGame(false)} />
      ) : null}
      {isOpenBattleGame ? <CoinFlipGame onClose={() => setIsOpenBattleGame(false)} /> : null}
      {isOpenWatchedGame ? <CoinFlipGame onClose={() => setIsOpenWatchedGame(false)} /> : null}
      {isOpenCallBot ? <CoinFlipGame onClose={() => setIsOpenCallBot(false)} /> : null}
    </>
  )
}

export default CoinFlip
