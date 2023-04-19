import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react'

import type { IUser } from '../../../types/User'

import ModalWrapper from '../../containers/ModalWrapper'
import { UserAvatar } from '../../user/UserAvatar'
import { UserLevel } from '../../user/UserLevel'
import { Button } from '../../base/Button'
import InputWithInlineLabel from '../InputWithInlineLabel'

import TipIcon from '../../../assets/img/tip_icon.svg'

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
      <div className='flex items-center gap-6 border-b-[1px] border-blue-accent-primary pb-4'>
        <div className='flex items-center gap-2'>
          <img src={TipIcon} alt='thor' />
          <span className='text-blue-golf font-black text-3xl uppercase'>tip user</span>
        </div>
        <div className='flex items-center justify-between gap-2'>
          <div className='w-10 h-10 border border-blue-highlight rounded overflow-hidden radial--blue'>
            <UserAvatar />
          </div>
          <span className='font-bold text-white'>{user.name}</span>
          <UserLevel level={user.level} />
        </div>
      </div>
      <div className='py-4 space-y-8'>
        <InputWithInlineLabel
          type='number'
          placeholder='...'
          value={inputValue}
          onChange={handleChangeInput}
          label='Tip amount'
        />

        <InputWithInlineLabel
          type='number'
          placeholder='...'
          value={inputValueVerify}
          onChange={handleChangeInputVerify}
          label='Verify amount'
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
