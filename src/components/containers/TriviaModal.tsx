import React from 'react'
import ModalWrapper from './ModalWrapper'
import Bulb from '../icons/Bulb'

const TriviaModal = ({ isOpen = true, onClose }: { isOpen: boolean, onClose: Function }) => {
  return (
    isOpen
      ? (
      <ModalWrapper
        closeModal={onClose}
        modalClasses='relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-bg-modal-blue relative max-w-4xl w-full m-auto  overflow-hidden'
        closeBtnClasses='rounded w-7 h-7 leading-7 absolute top-4 right-4 z-[2] text-center bg-blue-highlight shadow-dark-5 hover:bg-blue-accent cursor-pointer'
      >
        <div className='flex flex-col'>
          <div className=" flex flex-col xs:flex-row justify-between items-center mr-0 xxs:mr-10 mb-5">
            <div className=' shrink-0 flex justify-center xs:justify-start mb-4 xs:mb-0 items-center text-blue-golf'>
              <Bulb />
              <h3 className='text-3xl font-black ml-3 uppercase'>Trivia</h3>
            </div>
          </div>
          <div className='border-b border-blue-accent-primary w-full' />
        </div>
      </ModalWrapper>
        )
      : null
  )
}

export default TriviaModal
