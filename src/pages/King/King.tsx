import KingGameArena from './KingGameArena'
import KingGameQueue from './KingGameQueue'
import KingGameInventories from './KingGameInventories'
import KingGameHistoryList from './KingGameHistoryList'

import { users } from '../../mocks/liveFeedUsers'
import { kingMock } from '../../mocks/kingMock'

const King = () => {
  return (
    <div className='ls:mt-20 flex flex-col justify-center gap-32 mx-4'>
      <KingGameArena />
      <KingGameQueue queue={users.slice(0, 10)} />
      <KingGameInventories />
      <KingGameHistoryList games={kingMock} />
    </div>
  )
}

export default King
