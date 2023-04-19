import { Dispatch, SetStateAction } from 'react'

import type { IUser } from '../../../types/User'

import ModalWrapper from '../../containers/ModalWrapper'

import BanIcon from '../../../assets/img/ban_icon.svg'
import { UserAvatar } from '../../user/UserAvatar'
import { UserLevel } from '../../user/UserLevel'
import { Button } from '../../base/Button'

interface BanUserModalProps {
  user: IUser
  onClose: Dispatch<SetStateAction<boolean>>
  handleFunction: () => void
}

const BanUserModal = ({ user, onClose, handleFunction }: BanUserModalProps) => {
  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses='relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-4xl w-full m-auto overflow-hidden'
    >
      <div className='flex items-center gap-6 border-b-[1px] border-blue-accent-primary pb-4'>
        <div className='flex items-center gap-2'>
          <img src={BanIcon} alt='thor' />
          <span className='text-red-light font-black text-3xl uppercase'>ban user</span>
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

export default BanUserModal
