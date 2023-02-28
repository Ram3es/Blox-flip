import { FC } from 'react'

interface GameCellProps {
  game: string
}

export const GameCell: FC<GameCellProps> = ({ game }) => {
  return (
    <div className='flex justify-start ml-12'>
      <div className='text-bold inline-block'>{game}</div>
    </div>
  )
}
