import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import CardBg from '../../assets/img/case_bg.svg'
import CardInnerBg from '../../assets/img/case_bg2.svg'
import CardRadial from '../../assets/img/case_radial.svg'

interface IGameCardProps {
  titleBtn: string
  path: string
  isLeftCorner: boolean
}

const GameCard: FC<IGameCardProps> = ({ titleBtn, isLeftCorner, path }) => {
  const { t } = useTranslation()
  return (
    <div className='px-3 mb-6 xs:mb-10 sm:mb-18 w-full xxs:w-1/2 xs:w-1/3 lg:w-1/6'>
      <div className='relative overflow-hidden h-full'>
        <img
          src={CardBg}
          alt='bg'
          width='241'
          height='228'
          loading='lazy'
          decoding='async'
          className={
            isLeftCorner
              ? 'relative z-20 object-cover w-full'
              : 'relative z-20 object-cover w-full flip--h'
          }
        />
        <div className='absolute inset-4 z-[35] flex flex-col items-center'>
          <div className='mt-5 grow'>Case</div>
          <NavLink
            to={path}
            className='px-2 py-2 max-w-36 w-[60%] text-center rounded-full leading-4 bg-black/15'
          >
            {t(`common.games.${titleBtn}`)}
          </NavLink>
        </div>
        <div className='absolute inset-0 z-0 top-16 overflow-hidden'>
          <img
            src={CardInnerBg}
            alt='bg_inner'
            width='241'
            height='760'
            loading='lazy'
            decoding='async'
            className='absolute left-0 bottom-0 w-full'
          />
        </div>
        <div className='absolute inset-0 z-30 top-16 overflow-hidden'>
          <img
            src={CardRadial}
            alt='radial'
            width='241'
            height='228'
            loading='lazy'
            decoding='async'
            className='absolute left-0 bottom-0 w-full'
          />
        </div>
      </div>
    </div>
  )
}

export default GameCard
