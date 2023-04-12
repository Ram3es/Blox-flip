import { useRef } from 'react'

import ClocksIcon from '../../components/icons/ClocksIcon'
import SwordsIcon from '../../assets/img/swords_king.svg'
import DashedSpacerIcon from '../../assets/img/dashed_spacer.png'
import KingGamePlayer from './KingGamePlayer'

const KingGameArena = () => {
  const swordIconRef = useRef<HTMLImageElement>(null)

  return (
    <div className='gradient-background--yellow__secondary rounded-xl flex flex-col ls:flex-row ls:justify-between xxs:items-center ls:items-stretch h-full ls:h-44 w-full gap-4 xs:gap-0 p-16 ls:p-0'>
      <KingGamePlayer isKing />
      <img className='hidden ls:block' src={DashedSpacerIcon} alt='dashed spacer' />
      <div className='relative flex items-center justify-center gap-2'>
        <ClocksIcon />
        <div className='text-white font bold text-xl w-11'>{30}s</div>
        <div className='h-[40px] w-[40px] ls:h-[66px] ls:w-[66px] gradient-border--yellow rounded-lg gradient-background--darkblue ls:absolute ls:bottom-[144px] p-2 flex items-center justify-center rotate-[45deg]'>
          <img ref={swordIconRef} src={SwordsIcon} className='scale-[280%] rotate-[-45deg]' />
        </div>
      </div>
      <img className='hidden ls:block' src={DashedSpacerIcon} alt='dashed spacer' />
      <KingGamePlayer />
    </div>
  )
}

export default KingGameArena
