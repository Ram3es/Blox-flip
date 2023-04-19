import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react'

import ModalWrapper from '../ModalWrapper'
import { Button } from '../../base/Button'
import ActionModalHeader from './ActionModalHeader'
import InputWithInlineLabel from '../../common/InputWithInlineLabel'
import TimeoutIcon from '../../icons/TimeoutIcon'

import type { IUser } from '../../../types/User'

interface TimeoutModalProps {
  user: IUser
  onClose: Dispatch<SetStateAction<boolean>>
  handleFunction: () => void
}

const TimeoutModal = ({ user, onClose, handleFunction }: TimeoutModalProps) => {
  const [inputValue, setInputValue] = useState(0)

  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(event.target.value))
  }, [])

  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses='relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-4xl w-full m-auto overflow-hidden'
    >
      <ActionModalHeader user={user}>
        <div className='text-blue-golf flex items-center gap-2'>
          <TimeoutIcon />
          <span className='font-black text-3xl uppercase'>timeout user</span>
        </div>
      </ActionModalHeader>
      <div className='py-4 space-y-8'>
        <InputWithInlineLabel
          type='number'
          placeholder='...'
          value={inputValue !== 0 ? inputValue : ''}
          onChange={handleChangeInput}
          label='Tip amount'
        />
        <div className='flex items-start justify-center'>
          <Button color='GreenPrimary'>
            <span className='py-3 px-10 text-15 font-bold text-white'>Timeout user</span>
          </Button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default TimeoutModal
