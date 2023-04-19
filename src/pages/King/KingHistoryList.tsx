import KingHistoryItem from './KingHistoryItem'

import type { IKingGame } from '../../types/King'

interface KingHistoryListProps {
  games: IKingGame[]
}

const KingHistoryList = ({ games }: KingHistoryListProps) => {
  return (
    <div className='gap-3 flex flex-col'>
      {games.map((game) => (
        <KingHistoryItem
          key={game.firstPlayer.username + String(new Date().getMilliseconds() * Math.random() * 5)}
          game={game}
        />
      ))}
    </div>
  )
}

export default KingHistoryList
