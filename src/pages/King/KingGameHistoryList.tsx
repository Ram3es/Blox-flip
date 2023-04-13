import KingGameHistoryItem from './KingGameHistoryItem'

import type { IKingGame } from '../../types/King'

interface KingGameHistoryListProps {
  games: IKingGame[]
}

const KingGameHistoryList = ({ games }: KingGameHistoryListProps) => {
  return (
    <div className='gap-3 flex flex-col'>
      {games.map((game) => (
        <KingGameHistoryItem
          key={game.firstPlayer.username + String(new Date().getMilliseconds() * Math.random() * 5)}
          game={game}
        />
      ))}
    </div>
  )
}

export default KingGameHistoryList
