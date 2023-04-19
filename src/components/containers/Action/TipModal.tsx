import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react'

import type { IUser } from '../../../types/User'

import ModalWrapper from '../ModalWrapper'
import { Button } from '../../base/Button'
import InputWithInlineLabel from '../../common/InputWithInlineLabel'

import TipIcon from '../../../assets/img/tip_icon.svg'
import ActionModalHeader from './ActionModalHeader'

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
        <img src={TipIcon} alt='thor' />
        <span className='text-blue-golf font-black text-3xl uppercase'>tip user</span>
      </ActionModalHeader>
      <div className='py-4 space-y-8'>
        <InputWithInlineLabel
          type='number'
          placeholder='...'
          value={inputValue !== 0 ? inputValue : ''}
          onChange={handleChangeInput}
          label='Tip amount'
          withIcon
        />
        <InputWithInlineLabel
          type='number'
          placeholder='...'
          value={inputValueVerify !== 0 ? inputValueVerify : ''}
          onChange={handleChangeInputVerify}
          label='Verify amount'
          withIcon
        />
        <div className='flex items-start justify-center gap-4'>
          <Button color='BlueAccentPrimary'>
            <span className='py-3 px-10 text-15 font-bold text-gray-primary'>Cancel</span>
          </Button>
          <Button color='GreenPrimary'>
            <span className='py-3 px-10 text-15 font-bold text-white'>Send tip</span>
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
