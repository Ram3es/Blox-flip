import KingGameHistoryItem from './KingGameHistoryItem'

import { IKingGame } from '../../types/King'

interface KingGameHistoryListProps {
  games: IKingGame[]
}

const KingGameHistoryList = ({ games }: KingGameHistoryListProps) => {
  return (
    <div className='gap-2 flex flex-col'>
      {games.map((game, index) => (
        <KingGameHistoryItem key={index * Math.random()} game={game} />
      ))}
    </div>
  )
}

export default KingGameHistoryList
