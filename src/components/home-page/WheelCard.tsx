import React from 'react'
import wheelBg from '../../assets/img/wheel-rect.svg'
import wheelRadial from '../../assets/img/wheel-radial.svg'
// import arcWheel from '../../assets/img/arc-wheel.svg'
// import arcPng from '../../assets/img/arch-png.png'
import CardInnerBg from '../../assets/img/case_bg2.svg'
import { NavLink } from 'react-router-dom'

const WheelCard = () => {
  return (
        <div className='px-3 mb-6 xs:mb-10 sm:mb-18 w-full xxs:w-1/2 xs:w-1/3 lg:w-1/6'>
          <div className='relative overflow-hidden h-full'>
            <img
              src={wheelBg}
              alt='bg'
              width='241'
              height='246'
              loading='lazy'
              decoding='async'
              className= 'relative z-20 object-cover w-full '
              />
              <div className='absolute inset-4 z-[35] flex flex-col items-center'>
          <div className='mt-5 grow '>
            cases
          </div>
          <NavLink
            to={'/wheel'}
            className='px-2 py-2 max-w-36 w-[60%] text-center rounded-full leading-4 bg-black/15'
          >
            {'wheel'}
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
              className='absolute left-0 bottom-0 w-full '
            />
        </div>
        <div className='absolute inset-0 z-30 top-16 overflow-hidden'>
          <img
            src={wheelRadial}
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

export default WheelCard
