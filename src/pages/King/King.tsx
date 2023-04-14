import { useKing } from '../../store/KingStore'


import KingGameArena from './KingGameArena'
import KingGameQueue from './KingGameQueue'
import KingGameInventories from './KingGameInventories'
import KingGameHistoryList from './KingGameHistoryList'

import { users } from '../../mocks/liveFeedUsers'
import { kingMock } from '../../mocks/kingMock'
import { useEffect } from 'react'

const King = () => {
  const { setFight } = useKing()

  useEffect(() => {
    handleStartGame()
  }, [

  ])

  const handleStartGame = () => {
    setFight([
      {
        by: 'king',
        animation: 'spritesheet',
        damage: 1000
      },
      {
        by: 'opponent',
        animation: 'spritesheet',
        damage: 1000
      },
      {
        by: 'king',
        animation: 'spritesheet',
        damage: 1000
      },
      {
        by: 'opponent',
        animation: 'spritesheet',
        damage: 1000
      },
      {
        by: 'king',
        animation: 'spritesheet',
        damage: 1000
      },
      {
        by: 'opponent',
        animation: 'spritesheet',
        damage: 1000
      },
      {
        by: 'king',
        animation: 'spritesheet',
        damage: 1000
      },
      {
        by: 'opponent',
        animation: 'spritesheet',
        damage: 1000
      }
    ])
  }

  return (
    <div className='ls:mt-20 flex flex-col justify-center gap-4 mx-4'>
      <KingGameArena />
      <KingGameQueue queue={users.slice(0, 10)} />
      <KingGameInventories />
      <KingGameHistoryList games={kingMock} />
    </div>
  )
}

export default King
