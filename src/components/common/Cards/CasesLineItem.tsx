import { FC, useRef } from 'react'
import { IMAGES } from '../../../constants/images'

interface CaseLineItemProps {
  itsWinning: boolean
  image: string
}

export const CasesLineItem: FC<CaseLineItemProps> = ({ itsWinning, image }) => {
  const itemRef = useRef<HTMLDivElement>(null)

  if (itsWinning) {
    if (itemRef.current) {
      itemRef.current.style.opacity = '1'
    }
  }

  return (
    <div ref={itemRef} className='opacity-60 p-1.5 w-28 h-28 shrink-0 relative z-10'>
      <div className='rounded border-b border-b-red-secondary/40 h-full'>
        <div className='cursor-pointer border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'>
          <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0 h-full rounded relative border-8 border-transparent'>
            <img
              src={IMAGES[image]}
              alt=''
              width='68'
              height='52'
              loading='lazy'
              decoding='async'
              className='absolute object-contain w-full h-full'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
