import { useCallback, useEffect, useState } from 'react'
import { useSocketCtx } from '../../store/SocketStore'

import KingArena from './KingArena'
import KingQueue from './KingQueue'
import KingSkins from './KingSkins'
import KingHistoryList from './KingHistoryList'
import VerifyBets from '../../components/common/VerifyBets'

import { users } from '../../mocks/liveFeedUsers'
import {
  kingFightMock,
  kingGameMockNormal,
  kingGameMockOneKing,
  kingGameNullableMock,
  kingHistoryMock
} from '../../mocks/kingMock'

import { IKingChampion, IKingFight, IKingHistory } from '../../types/King'
import { Button } from '../../components/base/Button'
import KingJoinModal from './KingJoinModal'

const King = () => {
  const [kingGame, setKingGame] = useState<IKingChampion | null>(null)
  const [kingFight, setKingFight] = useState<IKingFight[] | null>(null)
  console.log(kingGame, 'KING_GAME')
  const [kingHistory, setKingHistory] = useState<IKingHistory[]>([])

  const { socket } = useSocketCtx()

  useEffect(() => {
    socket.on('champion_load', (data: IKingChampion) => {
      if (!data) {
        return
      }
      setKingGame(data)
    })

    socket.on('champion_fight', (data: IKingFight[]) => {
      if (!data) {
        return
      }
      setKingFight(data)
    })

    socket.on('champion_history', (data: IKingHistory[]) => {
      if (!data) {
        return
      }
      setKingHistory(data)
    })

    setKingGame(kingGameNullableMock) // delete after setup server

    setKingHistory(kingHistoryMock) // delete after setup server

    return () => {
      socket.off('champion_load')
      socket.off('champion_history')
    }
  }, [])

  const [isOpenJoinGame, setIsOpenJoinGame] = useState(false)

  const handleOpenModal = useCallback(() => {
    setIsOpenJoinGame(!isOpenJoinGame)
  }, [isOpenJoinGame])

  const handleJoinGame = useCallback(() => {
    setIsOpenJoinGame(false)
  }, [])

  return (
    <div className='ls:mt-20 flex flex-col justify-center gap-4 mx-4'>
      <div className='flex justify-end md:mr-36 md:mb-2'>
        <VerifyBets path='/provably-fair#king' />
      </div>
      <KingArena game={kingGame} fight={kingFight} setFight={setKingFight} />
      <Button
        disabled={kingFight !== null}
        onClick={() => setKingGame(kingGameNullableMock)}
        color='GreenPrimary'
      >
        <span className='py-2.5 mx-auto'>Set nullable game</span>
      </Button>
      <Button
        disabled={kingFight !== null}
        onClick={() => setKingGame(kingGameMockNormal)}
        color='GreenPrimary'
      >
        <span className='py-2.5 mx-auto'>Set normal game</span>
      </Button>
      <Button
        disabled={kingFight !== null}
        onClick={() => setKingGame(kingGameMockOneKing)}
        color='GreenPrimary'
      >
        <span className='py-2.5 mx-auto'>Set game with only one king</span>
      </Button>
      <Button
        disabled={kingFight !== null}
        onClick={() => setKingFight(kingFightMock)}
        color='GreenPrimary'
      >
        <span className='py-2.5 mx-auto'>Set fight</span>
      </Button>
      <KingQueue queue={users.slice(0, 10)} />
      <KingSkins game={kingGame} />
      <KingHistoryList games={kingHistory} />
      {isOpenJoinGame && (
        <KingJoinModal handleFunction={handleJoinGame} onClose={handleOpenModal} />
      )}
    </div>
  )
}

export default King
