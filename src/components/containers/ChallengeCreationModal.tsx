import { ChangeEvent, useCallback, useState } from 'react'

import { Button } from '../base/Button'

import ModalWrapper from './ModalWrapper'
import InputWithInlineLabel from '../common/InputWithInlineLabel'
import ChallengeIcon from '../icons/ChallengeIcon'

interface ChallengeCreationModalProps {
  onClose: () => void
  handleFunction: () => void
}

const ChallengeCreationModal = ({ onClose, handleFunction }: ChallengeCreationModalProps) => {
  const [inputWager, setInputWager] = useState(0)
  const [inputPrize, setInputPrize] = useState(0)
  const [inputMultiplier, setInputMultiplier] = useState('')

  const handleChangeInputWager = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputWager(Number(event.target.value))
  }, [])

  const handleChangeInputPrize = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputPrize(Number(event.target.value))
  }, [])

  const handleChangeInputMultiplier = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const numericValue = event.target.value.replace(/[^0-9.]/g, '')
    setInputMultiplier(numericValue + 'x')
  }, [])

  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses='relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-4xl w-full m-auto overflow-hidden'
    >
      <div className='flex items-center gap-6 border-b-[1px] border-blue-accent-primary pb-4 mb-6'>
        <div className='flex items-center gap-2'>
          <ChallengeIcon />
          <h3 className='uppercase text-gradient-gold text-3xl font-black'>challenge creation</h3>
        </div>
      </div>
      <div className='flex flex-col gap-6'>
        <InputWithInlineLabel
          type='number'
          placeholder='...'
          value={inputWager !== 0 ? inputWager : ''}
          onChange={handleChangeInputWager}
          label='Min wager'
          withIcon
        />
        <InputWithInlineLabel
          type='text'
          placeholder='...'
          value={inputMultiplier}
          onChange={handleChangeInputMultiplier}
          label='Min multiplier'
        />
        <InputWithInlineLabel
          type='number'
          placeholder='...'
          value={inputPrize !== 0 ? inputPrize : ''}
          onChange={handleChangeInputPrize}
          label='Prize'
          labelFill='Green'
          withIcon
        />
        <div className='py-4 space-y-8'>
          <div className='flex items-start justify-center gap-4'>
            <Button color='BlueAccentPrimary' onClick={onClose}>
              <span className='py-3 px-8 sm:px-10 text-15 font-bold text-gray-primary'>Cancel</span>
            </Button>
            <Button color='GreenPrimary' onClick={handleFunction}>
              <span className='py-3 px-8 sm:px-10 text-15 font-bold text-white'>
                Create challenge
              </span>
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ChallengeCreationModal
