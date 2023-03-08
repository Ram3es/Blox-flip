import { FC } from 'react'

import { OpeningLineIcon } from '../../../components/icons/OpeningLineIcon'
import { CasesLineItem } from './CasesLineItem'

interface CasesLineProps {
  items?: any[]
}

export const CasesLine: FC<CasesLineProps> = ({ items }) => {
  return (
    <div className='relative z-10 bg-dark/30 overflow-hidden mb-2.5 rounded'>
      <div className='flex overflow-x-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full py-3'>
        <div className='absolute left-1/2 -ml-0.5 top-0 z-20 w-0.5 xs:w-1'>
          <OpeningLineIcon />
        </div>
        <div className='absolute left-1/2 -ml-0.5 bottom-0 z-20 rotate-180 w-0.5 xs:w-1'>
          <OpeningLineIcon />
        </div>
        {Array.from({ length: 100 }).map((_, i) => (
          <CasesLineItem key={i} />
        ))}
      </div>
    </div>
  )
}
