import React, { FC } from 'react'
import { IModeGame } from '../../../mocks/battle'
import { GameStatus } from '../../../types/enums'

interface IRoundProps {
  round: number
  mode: IModeGame
  status: string
}

const RoundCell: FC<IRoundProps> = ({ round, mode, status }) => {
  return (
<>
{ status === GameStatus.Running &&
<div className='absolute -left-1 top-1/2 -mt-1 '>
  <div className="relative w-2 h-2  rounded-full bg-green-primary mb-2" >
    <div className=" absolute animate-ping inline-flex h-full w-full rounded-full bg-green-primary-light opacity-75" />
  </div>
</div>
 }
  <div className="text-gray-primary text-10 absolute left-0 -top-1.5 bg-blue-highlight px-3 py-1 leading-4 rounded">{mode.variant}</div>
  <div className="w-14 h-14 rounded bg-blue-highlight/10 border border-dashed border-blue-highlight flex flex-col items-center justify-center">
    <span>{round}</span>
  <div className="text-10 text-gray-primary">ROUNDS</div></div>
</>
  )
}

export default RoundCell
