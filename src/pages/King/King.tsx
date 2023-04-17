import { useKing } from '../../store/KingStore'

import KingArena from './KingArena'
import KingQueue from './KingQueue'
import KingSkins from './KingSkins'
import KingHistoryList from './KingHistoryList'

import { Button } from '../../components/base/Button'

import { users } from '../../mocks/liveFeedUsers'
import { kingMock } from '../../mocks/kingMock'

const King = () => {
  const { setFight } = useKing()

  const handleStartGame = () => {
    setFight([
      {
        by: 'king',
        animation: 'spritesheet',
        damage: 1500
      },
      {
        by: 'opponent',
        animation: 'spritesheet',
        damage: 1000
      },
      {
        by: 'king',
        animation: 'spritesheet',
        damage: 1500
      },
      {
        by: 'opponent',
        animation: 'spritesheet',
        damage: 2999
      },
      {
        by: 'king',
        animation: 'spritesheet',
        damage: 1000
      }
      // {
      //   by: 'opponent',
      //   animation: 'spritesheet',
      //   damage: 1000
      // },
      // {
      //   by: 'king',
      //   animation: 'spritesheet',
      //   damage: 1000
      // },
      // {
      //   by: 'opponent',
      //   animation: 'spritesheet',
      //   damage: 1000
      // }
    ])
  }

  return (
    <div className='ls:mt-20 flex flex-col justify-center gap-4 mx-4'>
      <KingArena />
      <Button onClick={handleStartGame} color='GreenPrimary'>
        <span className='py-2.5 mx-auto'>Start game</span>
      </Button>
      <KingQueue queue={users.slice(0, 10)} />
      <KingSkins />
      <KingHistoryList games={kingMock} />
    </div>
  )
}

export default King
