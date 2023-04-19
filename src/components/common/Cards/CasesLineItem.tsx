import { FC, useEffect, useState } from 'react'
import { IMAGES } from '../../../constants/images'

interface CaseLineItemProps {
  itsWinning: boolean
  image: string
  timeoutToShow: number
}

export const CasesLineItem: FC<CaseLineItemProps> = ({ itsWinning, image, timeoutToShow }) => {
  const [itemClasses, setItemClasses] = useState<string>(
    'gradient-border--red gradient-background--red opacity-60 w-[6.3125rem] h-[6.3125rem] shrink-0 z-10 flex items-center justify-center'
  )

  useEffect(() => {
    if (itsWinning) {
      setTimeout(() => {
        console.log('here')
        setItemClasses((prev) => prev.replace('opacity-60', 'opacity-100'))
      }, timeoutToShow)
    }
  }, [itsWinning])

  return (
    <div className={itemClasses}>
      <img
        src={IMAGES[image]}
        alt=''
        loading='lazy'
        decoding='async'
        className='object-contain w-[5.625rem] h-17'
      />
    </div>
  )
}
