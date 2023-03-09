import React, { FC } from 'react'

interface IRoundProps {
  round: number
  mode: number
  isActive: boolean
}

const players: Record<number, string> = {
  1: '1v1',
  2: '1v1v1',
  3: 'Group'
}

const RoundCell: FC<IRoundProps> = ({ round, mode, isActive }) => {
  return (
<>{isActive && <div className="absolute z-[150] -left-1 top-1/2 -mt-1 w-2 h-2 outline outline-4 rounded-full bg-green-primary outline-green-primary/25 shadow-green-primary-10 mb-2" /> }
  <div className="text-gray-primary text-10 absolute left-0 -top-1.5 bg-blue-highlight px-3 py-1 leading-4 rounded">{players[mode]}</div>
  <div className="w-14 h-14 rounded bg-blue-highlight/10 border border-dashed border-blue-highlight flex flex-col items-center justify-center">
    <span>{round}</span>
  <div className="text-10 text-gray-primary">ROUNDS</div></div>
</>
  )
}

export default RoundCell
