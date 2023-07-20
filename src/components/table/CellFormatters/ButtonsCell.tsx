import { useCallback, useMemo } from 'react'

import { useNavigate } from 'react-router-dom'

import { Button } from '../../base/Button'
import Loader from '../../base/Loader'

import DaggersIcons from '../../icons/DaggersIcons'
import PreviewIcon from '../../icons/PreviewIcon'
import SelectedIcon from '../../icons/SelectedIcon'

import { useBattleCase } from '../../../store/BattleCaseStore'
import { IRootBattle, IRootBattleStateEnum } from '../../../types/CaseBattles'

const ButtonsCell = ({ id, state }: Pick<IRootBattle, 'id' | 'state'>) => {
  const { games } = useBattleCase()

  const handleJoinBattle = useCallback(() => {
    navigate(`/battle/${id}`, { state: games.find((item) => item.id === id) })
  }, [games])

  const navigate = useNavigate()
  const activeButton = useMemo(() => {
    switch (state) {
      case IRootBattleStateEnum.open:
        return (
          <Button
            onClick={handleJoinBattle}
            className='grow rounded px-3 py-2 leading-6 flex items-center justify-center bg-green-primary hover:bg-green-500 whitespace-nowrap'
          >
            <DaggersIcons />
            <span className='ml-2'>Join Battle</span>
          </Button>
        )
      case IRootBattleStateEnum.playing:
        return (
          <Button
            onClick={() => {
              console.log('Stats')
            }}
            className='grow rounded px-4 py-2 leading-6 flex items-center justify-center bg-green-primary/30 border border-green-primary text-green-primary whitespace-nowrap'
          >
            <Loader />
            <span className='ml-2'>Running</span>
          </Button>
        )
      case IRootBattleStateEnum.done:
        return (
          <Button
            onClick={() => {
              console.log('Stats')
            }}
            className='rounded px-3 py-2 leading-6 flex items-center justify-center border border-gray-secondary-darken bg-blue-highlight whitespace-nowrap text-gray-primary'
          >
            <SelectedIcon iconClasses='text-gray-primary' />
            <span className='ml-2'>Ended</span>
          </Button>
        )
    }
  }, [status])

  return (
    <div className='flex items-center justify-end'>
      {activeButton}
      <Button
        onClick={() => navigate(`/battle/${id}`, { state: games.find((item) => item.id === id) })}
        className=' leading-10 ml-2 w-8 h-8 hidden xxs:flex xs:h-10 xs:w-10 shrink-0 rounded bg-blue-accent-secondary hover:bg-blue-accent text-gray-primary'
      >
        <PreviewIcon iconClasses='mx-auto my-auto' />
      </Button>
    </div>
  )
}

export default ButtonsCell
