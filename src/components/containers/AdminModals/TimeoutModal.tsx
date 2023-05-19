import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useCallback, useState } from 'react'

import ModalWrapper from '../ModalWrapper'
import { Button } from '../../base/Button'
import ActionModalHeader from './ActionModalHeader'
import InputWithInlineLabel from '../../common/InputWithInlineLabel'
import TimeoutIcon from '../../icons/TimeoutIcon'

import type { IChatUser } from '../../../types/User'
import { IBanUser } from '../../../types/Chat'

interface TimeoutModalProps {
  user: IChatUser
  onClose: Dispatch<SetStateAction<boolean>>
  handleFunction: (timeoutUser: IBanUser) => void
}

const TimeoutModal = ({ user, onClose, handleFunction }: TimeoutModalProps) => {
  const [inputValues, setInputValue] = useState({ reason: '', time: '' })

  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInputValue(prev => ({ ...prev, [name]: value }))
  }, [])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isDisabled = Object.values(inputValues).some(v => !v)
    if (isDisabled) {
      return
    }
    const { reason, time } = inputValues
    handleFunction({
      reason,
      time,
      id: user.id
    })
    onClose(true)
  }

  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses='relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-4xl w-full m-auto overflow-hidden'
    >
      <ActionModalHeader user={user}>
        <div className='text-blue-golf flex items-center gap-2'>
          <TimeoutIcon />
          <span className='font-black text-xl xxs:text-3xl uppercase hidden sm:block'>
            timeout user
          </span>
        </div>
      </ActionModalHeader>
      <form onSubmit={onSubmit} className='py-4 space-y-6 mt-4'>
      <InputWithInlineLabel
          name='reason'
          label= 'Reason'
          placeholder='...'
          value={inputValues.reason}
          onChange={handleChangeInput}
          autoComplete='off'
        />

        <InputWithInlineLabel
          type='number'
          name='time'
          placeholder='...'
          value={Number(inputValues.time) !== 0 ? inputValues.time : ''}
          onChange={handleChangeInput}
          label='Minutes'
        />
        <div className='flex items-start justify-center'>
          <Button type='submit' color='GreenPrimary'>
            <span className='py-3 px-10 text-15 font-bold text-white'>Timeout user</span>
          </Button>
        </div>
      </form>
    </ModalWrapper>
  )
}

export default TimeoutModal
