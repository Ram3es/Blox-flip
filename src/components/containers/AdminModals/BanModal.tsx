import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react'

import ModalWrapper from '../ModalWrapper'
import { Button } from '../../base/Button'
import ActionModalHeader from './ActionModalHeader'
import BanIcon from '../../icons/BanIcon'

import type { IChatUser } from '../../../types/User'
import { IBanUser } from '../../../types/Chat'
import InputWithInlineLabel from '../../common/InputWithInlineLabel'

interface BanModalProps {
  user: IChatUser
  onClose: Dispatch<SetStateAction<boolean>>
  handleFunction: (banUser: IBanUser) => void
}

const BanModal = ({ user, onClose, handleFunction }: BanModalProps) => {
  const [inputValues, setInputValues] = useState({ reason: '', time: '' })

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputValues(prev => ({ ...prev, [name]: value }))
  }

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
        <div className='text-red-light flex items-center gap-2'>
          <BanIcon />
          <span className='font-black text-3xl uppercase hidden sm:block'>ban user</span>
        </div>
      </ActionModalHeader>
      <form className='flex flex-col gap-4 mt-8 ' onSubmit={onSubmit}>
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
         <div className='pb-4 pt-8 space-y-8'>
        <div className='rounded-10 gradient-background--blue__secondary py-4 text-center'>
          <span className='text-gray-secondary-light font-semibold text-base'>
            This will permanently ban this user from this website.
          </span>
        </div>
        <div className='flex items-start justify-center'>
          <Button type='submit' color='RedLight'>
            <span className='py-3 px-10 text-15 font-bold text-white'>Ban permanently</span>
          </Button>
        </div>
      </div>
      </form>

    </ModalWrapper>
  )
}

export default BanModal
