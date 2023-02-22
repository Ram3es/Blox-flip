import { FC } from 'react'

interface BetCellProps {
  bet: number
}

export const BetCell: FC<BetCellProps> = ({ bet }) => {
  return (
    <div className='flex items-center'>
      <span className='w-5 h-5 shrink-0 text-center leading-6 bg-green-primary/20 rounded relative mr-2'>
        <img
          src='img/diamond_green.svg'
          alt=''
          width='15'
          height='12'
          loading='lazy'
          decoding='async'
          className='-inset-full absolute m-auto'
        />
      </span>
      <span className='font-bold text-13 mr-2 whitespace-nowrap text-white'>
        {bet}
        <span className='text-white/50'>.00</span>
      </span>
    </div>
  )
}
