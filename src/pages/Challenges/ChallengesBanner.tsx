import React from 'react'
import WheelRobot from '../../assets/img/WheelRobot.png'
import AffiliatesLeftIcon from '../../assets/img/affiliates_l.png'
import ChallengeDarts from '../../components/icons/ChallengeDarts'
import Cowboy from '../../assets/img/welcome_r.png'

const ChallengesBanner = () => {
  return (
    <div className='flex h-[225px] text-center relative rounded-2xl  mb-12 xs:mb-9 bg-gradient-to-b from-[#A25619] to-[#825921] border border-orange-secondary '>
    <div className='w-1/3 relative'>
      <div className='z-20 w-full inset-0 right-auto absolute'>
        <img
          src={WheelRobot}
          alt='WheelRobot'
          width='140'
          loading='lazy'
          decoding='async'
          className='absolute z-10 -left-9 top-0 xs:top-4'
        />
        <img
          src={AffiliatesLeftIcon}
          alt='goldman'
          width='175'
          height='158'
          loading='lazy'
          decoding='async'
          className='absolute z-10 -left-2 xxs:left-8 xs:left-14 bottom-0'
        />
      </div>
    </div>
    <div className='w-1/2 mx-auto flex flex-col items-center py-3 gap-4'>
      <ChallengeDarts />
      <h3 className='text-3xl xs:text-5xl font-black uppercase challenges-title-gradient'>Challenges</h3>
      <p className=' xs:text-lg text-center'>Earn rewards by competing challenges and competing against other players!</p>
    </div>
    <div className='w-1/3 relative'>
      <div className='z-20 w-full inset-0 left-auto absolute '>
        <img
          src={Cowboy}
          alt='cowboy'
          width='164'
          height='192'
          loading='lazy'
          decoding='async'
          className='absolute z-10 bottom-0 -right-1 '
        />
      </div>
    </div>
  </div>
  )
}

export default ChallengesBanner
