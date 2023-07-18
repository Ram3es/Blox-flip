import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react'

import ModalWrapper from '../ModalWrapper'
import InputWithInlineLabel from '../../common/InputWithInlineLabel'
import ActionModalHeader from './ActionModalHeader'
import TipIcon from '../../icons/TipIcon'
import { Button } from '../../base/Button'

import type { IUser } from '../../../types/User'
import DiamondIcon from '../../icons/DiamondIcon'

interface TipModalProps {
  user: IUser
  onClose: Dispatch<SetStateAction<boolean>>
  handleFunction: () => void
}

const TipModal = ({ user, onClose, handleFunction }: TipModalProps) => {
  const [inputValue, setInputValue] = useState(0)
  const [inputValueVerify, setInputValueVerify] = useState(0)

  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(event.target.value))
  }, [])

  const handleChangeInputVerify = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputValueVerify(Number(event.target.value))
  }, [])

  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses='relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-4xl w-full m-auto overflow-hidden'
    >
      <ActionModalHeader user={user}>
        <div className='text-blue-golf flex items-center gap-2'>
          <TipIcon />
          <span className='font-black xxs:text-3xl uppercase hidden sm:block'>tip user</span>
        </div>
      </ActionModalHeader>
      <div className='py-4 space-y-8'>
        <InputWithInlineLabel
          type='number'
          placeholder='...'
          value={inputValue !== 0 ? inputValue : ''}
          onChange={handleChangeInput}
          label='Tip amount'
          icon={
            <div className="relative w-6 h-6 text-center leading-6 shrink-0 bg-green-primary/20 rounded text-green-primary">
              <DiamondIcon className="-inset-full absolute m-auto" />
            </div>
          }
        />
        <InputWithInlineLabel
          type='number'
          placeholder='...'
          value={inputValueVerify !== 0 ? inputValueVerify : ''}
          onChange={handleChangeInputVerify}
          label='Verify amount'
          icon={
            <div className="relative w-6 h-6 text-center leading-6 shrink-0 bg-green-primary/20 rounded text-green-primary">
              <DiamondIcon className="-inset-full absolute m-auto" />
            </div>
          }
        />
        <div className='flex items-start justify-center gap-4'>
          <Button color='BlueAccentPrimary'>
            <span className='py-3 px-8 sm:px-10 text-15 font-bold text-gray-primary'>Cancel</span>
          </Button>
          <Button color='GreenPrimary'>
            <span className='py-3 px-8 sm:px-10 text-15 font-bold text-white'>Send tip</span>
          </Button>
        </div>
        <div className='rounded-15 gradient-background--blue__secondary py-2 px-10 text-center'>
          <p className='font-semibold text-base text-gray-secondary-light'>
            Please double check the tip amount before sending the tip.
          </p>
          <p className='font-semibold text-base text-orange-light'>
            We are NOT responsible for any miss-clicks or wrong input amounts tipped to other users.
            You and only you are responsible for making a tip.
          </p>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default TipModal
