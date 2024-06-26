import React, { useState, FC } from 'react'
import Mountains from '../../assets/img/bg-mountain.png'
import Logo from '../../assets/img/logo.png'
import Pilot from '../../assets/img/pilot.png'
import ModalWrapper from './ModalWrapper'
import clsx from 'clsx'
import SignUpForm from '../sign-in/SignUpForm'
import SignInFormNew from '../sign-in/SignInFormNew'

interface ISignInModalProps {
  onClose: Function
  isOpen: boolean
}

const SignInModal: FC<ISignInModalProps> = ({ isOpen, onClose }) => {
  const [toogleRegister, setToogleRegister] = useState<boolean>(false)

  return (isOpen
    ? <>
        <ModalWrapper
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
          <div className=" flex flex-col justify-between h-full col-span-3 mt-6 sm:mt-0 sm:col-span-2  relative">
            <div className='min-h-[580px] sm:min-h-[520px] w-auto xs:w-[600px]'>
              <div className=' p-5'>
                <div className=' border-b border-blue-highlight mb-6 pb-6 '>
                  <div className='flex justify-between sm:justify-around items-center mt-4 sm:mt-0'>
                    <h3
                      onClick={() => { setToogleRegister(bool => !bool) }}
                      className={clsx('text-3xl font-extrabold uppercase shrink-0 duration-200',
                        {
                          'text-lightblue-secondary pointer-events-none': !toogleRegister,
                          'text-white/70 cursor-pointer': toogleRegister
                        })}
                      >Log in</h3>
                    <h3
                      onClick={() => { setToogleRegister(bool => !bool) }}
                      className={clsx('text-3xl font-extrabold duration-200 uppercase shrink-0 ',
                        {
                          'text-lightblue-secondary pointer-events-none': toogleRegister,
                          'text-white/70 cursor-pointer': !toogleRegister
                        })}
                      >Sign up</h3>
                  </div>
                </div>
                {!toogleRegister
                  ? <SignInFormNew onClose={() => onClose()} />
                  : <SignUpForm onClose={() => onClose()} />}
              </div>
            </div>
        </div>
        </ModalWrapper>
      </>
    : null
  )
}

export default SignInModal
