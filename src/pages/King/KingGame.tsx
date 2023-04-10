import { UserAvatar } from '../../components/user/UserAvatar'
import { UserLevel } from '../../components/user/UserLevel'
import { PlusIcon } from '../../components/icons/PlusIcon'
import { Button } from '../../components/base/Button'
import ClocksIcon from '../../components/icons/ClocksIcon'
import KingHealthBar from '../../components/common/KingHealthBar'

import KingIcon from '../../assets/img/king_icon.png'
import SwordsIcon from '../../assets/img/swords_king.svg'
import DashedSpacerIcon from '../../assets/img/dashed_spacer.png'

const KingGame = () => {
  return (
    <div className='p-16 ls:p-0 flex flex-col xxs:items-center ls:items-stretch justify-items-center rounded bg-blue-golf/10 h-full ls:bg-transparent bg-gradient-yellow--king w-full ls:h-44 ls:flex-row ls:justify-between border--king-yellow'>
      <div className='relative min-w-[444px] ls:block flex items-center ls:gap-0 gap-5'>
        <div className='ls:absolute top-[-55px] bg-gradient-yellow--king-avatar border--king-avatar-yellow w-[122px] h-[121px] flex items-center justify-center '>
          <UserAvatar className='w-20 h-[74px]' />
          <img src={KingIcon} className='left-[-28px] absolute top-[-45px]' />
        </div>
        <div className='ls:pl-36 ls:pt-2 space-y-1'>
          <p className='font-semibold text-xl gradient-king-text'>Current King</p>
          <div className='flex items-center'>
            <span className='font-bold text-base'>Artheus</span>
            <div className='pl-2'>
              <UserLevel level={33} />
            </div>
          </div>
        </div>
        <div className='ls:pt-8 ls:pl-8'>
          <KingHealthBar position='left' value={3450} max={5450} />
        </div>
      </div>
      <img className='hidden ls:block' src={DashedSpacerIcon} alt='dashed spacer' />
      <div className='relative flex items-center justify-center gap-2'>
        <ClocksIcon />
        <div className='text-white font bold text-xl w-11'>{30}s</div>
        <div className='ls:absolute bottom-[144px] border--king-battle-icon bg-gradient-dark-blue--king flex items-center justify-center '>
          <img src={SwordsIcon} className='ls:rotate-[316deg] scale-150' />
        </div>
      </div>
      <img className='hidden ls:block' src={DashedSpacerIcon} alt='dashed spacer' />
      <div className='relative min-w-[444px] ls:block flex items-center ls:gap-0 gap-5'>
        <div className='ls:absolute left-[320px] top-[-55px] w-[122px] h-[121px] flex items-center justify-center bg-gradient-blue--king'>
          <UserAvatar className='w-20 h-[74px]' />
        </div>
        <div className='flex flex-col ls:items-end ls:pr-36 ls:pt-2 ls:space-y-1'>
          <div className='flex gap-3'>
            <div className='pb-1 ls:pb-0'>
              <Button variant='Standard' color='GreenPrimary'>
                <span className='w-8 h-8 flex items-center justify-center'>
                  <PlusIcon />
                </span>
              </Button>
            </div>
            <p className='font-semibold text-xl text-gray-primary'>Opponent</p>
          </div>
          <div className='flex items-center'>
            <span className='font-bold text-base'>Artheus</span>
            <div className='pl-2'>
              <UserLevel level={33} />
            </div>
          </div>
        </div>
        <div className='ls:pt-8 ls:pr-8'>
          <KingHealthBar position='right' value={3450} max={5450} />
        </div>
      </div>
    </div>
  )
}

export default KingGame
