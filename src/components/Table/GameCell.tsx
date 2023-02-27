import { FC } from 'react'

interface GameCellProps {
  game: string
}

export const GameCell: FC<GameCellProps> = ({ game }) => {
  return <p className='text-bold'>{game}</p>
}
