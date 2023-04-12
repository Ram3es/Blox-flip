import ClocksIcon from '../../components/icons/ClocksIcon'
import SwordsIcon from '../../assets/img/swords_king.svg'
import DashedSpacerIcon from '../../assets/img/dashed_spacer.png'
import KingGamePlayer from './KingGamePlayer'

const KingGameArena = () => {
  return (
    <div className='gap-4 xs:gap-0 p-16 ls:p-0 flex flex-col xxs:items-center ls:items-stretch rounded h-full ls:bg-transparent bg-gradient-yellow--king w-full ls:h-44 ls:flex-row ls:justify-between border--king-yellow'>
      <KingGamePlayer isKing />
      <img className='hidden ls:block' src={DashedSpacerIcon} alt='dashed spacer' />
      <div className='relative flex items-center justify-center gap-2'>
        <ClocksIcon />
        <div className='text-white font bold text-xl w-11'>{30}s</div>
        <div className='ls:absolute bottom-[144px] border--king-battle-icon bg-gradient-dark-blue--king flex items-center justify-center '>
          <img src={SwordsIcon} className='ls:rotate-[316deg] scale-150' />
        </div>
      </div>
      <img className='hidden ls:block' src={DashedSpacerIcon} alt='dashed spacer' />
      <KingGamePlayer />
    </div>
  )
}

export default KingGameArena
