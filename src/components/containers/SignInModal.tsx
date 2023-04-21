import React, { useState, FC } from 'react'
import ButtonsToggle from '../base/ButtonToggle'
import SignInForm from '../sign-in/SignInForm'
import Mountains from '../../assets/img/bg-mountain.png'
import Logo from '../../assets/img/logo.png'
import Pilot from '../../assets/img/pilot.png'
import VideoPlayer from '../../assets/img/videoPlayerImg.png'
import RobloForm from '../sign-in/RobloForm'
import ModalWrapper from './ModalWrapper'

const toggleOptions = [{ variant: 'Credentials' }, { variant: '.Roblosecurity' }]

interface ISignInModalProps {
  onClose: Function
  isOpen: boolean
}

const SignInModal: FC<ISignInModalProps> = ({ isOpen, onClose }) => {
  const [currentLoginVariant, setCurrentVariant] = useState(toggleOptions[0])

  return (isOpen
    ? <ModalWrapper
             closeModal={() => onClose()}
             modalClasses='relative grid grid-cols-3 rounded-2xl overflow-hidden gradient-blue-primary shadow-dark-15'
             closeBtnClasses='rounded w-7 h-7 leading-7 absolute top-4 left-4 z-[2] text-center bg-blue-highlight shadow-dark-5 hover:bg-blue-accent cursor-pointer'
             >
           <div className='col-span-1 text-center relative'>
             <div className='absolute w-full h-full  flex-col items-center  p-4 z-[1] hidden sm:flex'>
               <img
                 src={Logo}
                 alt=''
                 width='126'
                 height='30'
                 loading='lazy'
                 decoding='async'
                 className='min-w-[126px]'
                />
               <img
                 src={Pilot}
                 alt='pilot'
                 loading='lazy'
                 decoding='async'
                 className='mt-10'
                />
                <h3 className="text-3xl font-extrabold text-white uppercase mt-5">Welcome to our site</h3>
                <p className='mt-auto text-blue-ocean'>By logging in you acknowledge that you are at least 18 years of age, that any items you wager are not stolen, and that you agree with our Terms of conditions and our Privacy policy</p>
             </div>
             <div className=' h-full w-full mix-blend-luminosity bg-cover' style={{ backgroundImage: `url(${Mountains})` }}>
                <div className='h-full w-full  gradient-light-gray'>
                    <div className='h-full w-full bg-blue-darken/75'/>
                </div>
            </div>
          </div>
          <div className=" flex flex-col justify-between h-full col-span-3 mt-6 sm:mt-0 sm:col-span-2  relative  w-full">
            <div>
              <div className=' p-5'>
                <div className='flex justify-between items-center border-b border-blue-highlight mb-6 pb-6'>
                  <h3 className="text-3xl font-extrabold text-lightblue-secondary uppercase shrink-0 mr-4">Sign in</h3>
                  <ButtonsToggle options={toggleOptions} currentSelect={currentLoginVariant} peakFunction={setCurrentVariant} />
                </div>
                {currentLoginVariant.variant === '.Roblosecurity'
                  ? <RobloForm />
                  : <SignInForm onClose={() => onClose()} />}
              </div>
            </div>
          <div className='flex max-w-[600px] h-full gradient-modal-video p-4'>
            <div className='text-lightblue-secondary w-[70%]'>
              <p className='mb-4'>In order for *Site* to operate correctly, we need access to your Roblox account.</p>
              <p> Press the play button to view a vide of how exactly to sign in using either credentials or .roblosecurity on our website.</p>
           </div>
           <img src={VideoPlayer} alt='mock' className='mx-auto my-auto h-[70px]'/>
          </div>
        </div>
        </ModalWrapper>
    : null
  )
}

export default SignInModal
