import { Dispatch, SetStateAction } from 'react'

import type { IUser } from '../../../types/User'

import ModalWrapper from '../ModalWrapper'

import BanIcon from '../../../assets/img/ban_icon.svg'
import { Button } from '../../base/Button'
import ActionModalHeader from './ActionModalHeader'

interface BanModalProps {
  user: IUser
  onClose: Dispatch<SetStateAction<boolean>>
  handleFunction: () => void
}

const BanModal = ({ user, onClose, handleFunction }: BanModalProps) => {
  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses='relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-4xl w-full m-auto overflow-hidden'
    >
      <ActionModalHeader user={user}>
        <img src={BanIcon} alt='thor' />
        <span className='text-red-light font-black text-3xl uppercase'>ban user</span>
      </ActionModalHeader>
      <div className='py-4 space-y-8'>
        <div className='rounded-10 gradient-background--blue__secondary py-4 text-center'>
          <span className='text-gray-secondary-light font-semibold text-base'>
            This will permanently ban this user from this website.
          </span>
        </div>
        <div className='flex items-start justify-center'>
          <Button color='RedLight'>
            <span className='py-3 px-10 text-15 font-bold text-white'>Ban permanently</span>
          </Button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default BanModal
