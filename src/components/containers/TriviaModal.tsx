import React from 'react'
import ModalWrapper from './ModalWrapper'
import Bulb from '../icons/Bulb'
import FieldWithLabel from '../common/FieldWithLabel'
import { QuantityCoinsWithChildren } from '../common/QuantityCoins/QuantityWithChildren'
import { Button } from '../base/Button'

const triviaFields = [
  {
    title: 'Amount',
    content: <QuantityCoinsWithChildren quantity={1500} />
  },
  {
    title: 'Question 1',
    content: <span className='text-gray-primary'>What is 1+1?</span>
  },
  {
    title: 'Answer 1',
    content: <span className='text-green-primary'>2</span>
  },
  {
    title: '(opt) Answer 1',
    content: '...'
  },
  {
    title: '(opt) Answer 2',
    content: '...'
  }
]

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
          <div className=' flex flex-col mt-6  gap-2'>
            { triviaFields.map(field => (
              <FieldWithLabel
                key={field.title}
                title={field.title}
                labelVariant='INSIDE'
                labelClasses={ field.title === 'Answer 1' ? 'text-green-primary bg-green-primary/20 py-1.5 px-4' : undefined }
                >
                  <div className='text-gray-primary'>{field.content}</div>
                 </FieldWithLabel>
            )) }
          </div>
          <div className='flex items-center justify-center gap-5 mt-6'>
            <Button
              className='flex items-center justify-center  min-w-[110px] leading-9 text-gray-primary text-sm font-bold rounded bg-blue-accent-primary hover:text-white px-2.5 '
            >
              Auto Trivia
            </Button>
            <Button
              className='flex items-center justify-center  min-w-[110px] leading-9 text-sm font-bold rounded bg-green-primary hover:bg-green-highlight px-2.5'
            >
              Start Trivia
            </Button>
          </div>
          <div className='flex flex-col gap-3 mt-6 px-9 py-6 gradient-trivia-info rounded-2xl text-[#7682B1] text-center text-base '>
            <p>Please verity the questions and the answer, make sure there are no typos before hosting a trivia.</p>
            <p className='text-[#CE6047] indent-6'>Make sure you follow the strict rules or you’ll be permanently banned from hosting or participating in these Trivias</p>
            <p>Please verity the questions and the answer, make sure there are no typos before hosting a trivia.</p>
          </div>
        </div>
      </ModalWrapper>
        )
      : null
  )
}

export default TriviaModal
