import { Dispatch, SetStateAction } from 'react'

import ModalWrapper from '../ModalWrapper'
import { Button } from '../../base/Button'
import ActionModalHeader from './ActionModalHeader'
import BanIcon from '../../icons/BanIcon'

import type { IUser } from '../../../types/User'

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
        <div className='text-red-light flex items-center gap-2'>
          <BanIcon />
          <span className='font-black text-3xl uppercase hidden sm:block'>ban user</span>
        </div>
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
