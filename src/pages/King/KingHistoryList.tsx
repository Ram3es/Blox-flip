import KingHistoryItem from './KingHistoryItem'

import { IKingHistory } from '../../types/King'

interface KingHistoryListProps {
  games: IKingHistory[]
}

const KingHistoryList = ({ games }: KingHistoryListProps) => {
  return (
    <div className='gap-3 flex flex-col'>
      {games.map((game) => (
        <KingHistoryItem
          key={game.id}
          game={game}
        />
      ))}
    </div>
  )
}

export default KingHistoryList
