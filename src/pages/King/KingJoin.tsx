import { useCallback, useState } from 'react'
import { useKing } from '../../store/KingStore'

import KingJoinModal from './KingJoinModal'
import { Button } from '../../components/base/Button'
import { PlusIcon } from '../../components/icons/PlusIcon'

const KingJoin = () => {
  const [isOpenJoinGame, setIsOpenJoinGame] = useState(false)

  const { queue } = useKing()

  const handleOpenModal = useCallback(() => {
    setIsOpenJoinGame(!isOpenJoinGame)
  }, [isOpenJoinGame])

  const handleJoinGame = useCallback(() => {
    setIsOpenJoinGame(false)
  }, [])

  return (
    <>
      <Button onClick={handleOpenModal} variant='Standard' color='GreenPrimary'>
        <span className='px-2.5 h-8 flex items-center justify-center'>
          {queue.length > 0 ? <PlusIcon /> : 'Join game'}
        </span>
      </Button>
      {isOpenJoinGame && (
        <KingJoinModal handleFunction={handleJoinGame} onClose={handleOpenModal} />
      )}
    </>
  )
}

export default KingJoin
