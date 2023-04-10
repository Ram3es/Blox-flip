import KingGameArena from './KingGameArena'
import KingQueue from './KingQueue'
import KingGameInventories from './KingGameInventories'

import { users } from '../../mocks/liveFeedUsers'

const King = () => {
  return (
    <div className='ls:mt-20 flex flex-col justify-center gap-4 mx-4'>
      <KingGameArena />
      <KingQueue queue={users.slice(0, 10)} />
      <KingGameInventories />
    </div>
  )
}

export default King
