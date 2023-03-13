import { FC } from 'react'
import FirstCase from '../../../assets/img/case1.png'

interface CaseLineItemProps {
  itemName: string
  itsWinning: boolean
}

export const CasesLineItem: FC<CaseLineItemProps> = ({ itemName, itsWinning }) => {
  return (
    <div className={`${itsWinning ? 'opacity-100' : 'opacity-70'} p-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-28 xs:h-28 shrink-0 relative z-10`}>
      <div className='rounded border-b border-b-red-secondary/40 h-full'>
        <div className='cursor-pointer border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'>
          <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0 h-full rounded relative border-8 border-transparent'>
            <img
              src={FirstCase}
              alt=''
              width='68'
              height='52'
              loading='lazy'
              decoding='async'
              className='absolute object-contain w-full h-full'
            />
            {itemName}
          </div>
        </div>
      </div>
    </div>
  )
}
