import { Dispatch, SetStateAction } from 'react'

import type { IUser } from '../../../types/User'

import ModalWrapper from '../../containers/ModalWrapper'

import { UserAvatar } from '../../user/UserAvatar'
import { UserLevel } from '../../user/UserLevel'
import { Button } from '../../base/Button'

interface TipModalProps {
  user: IUser
  onClose: Dispatch<SetStateAction<boolean>>
  handleFunction: () => void
}

const TipModal = ({ user, onClose, handleFunction }: TipModalProps) => {
  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses='relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-4xl w-full m-auto overflow-hidden'
    >
      <div className='flex items-center gap-6 border-b-[1px] border-blue-accent-primary pb-4'>
        <div className='flex items-center gap-2'>
          <img src={TimeoutIcon} alt='thor' />
          <span className='text-blue-golf font-black text-3xl uppercase'>timeout user</span>
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
        <div className='pl-4 pr-6 rounded-10 gradient-background--blue__secondary py-4 flex items-center justify-between'>
          <div className='gradient--background--blue__third px-6 py-2 rounded-md'>
            <span className='text-gray-primary font-medium text-sm'>Seconds</span>
          </div>
          <input
            className='p-2 w-full bg-transparent text-right outline-none placeholder:text-white'
            type='number'
            placeholder='...'
          />
        </div>
        <div className='flex items-start justify-center'>
          <Button color='GreenPrimary'>
            <span className='py-3 px-10 text-15 font-bold text-white'>Timeout user</span>
          </Button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default TipModal
