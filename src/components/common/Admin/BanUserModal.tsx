import { Dispatch, Fragment, SetStateAction, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'

import type { IUser } from '../../../types/User'

import BanIcon from '../../../assets/img/ban_icon.svg'

interface BanUserModalProps {
  user: IUser
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  handleFunction: () => void
}

const BanUserModal = ({ user, isOpen, setIsOpen, handleFunction }: BanUserModalProps) => {
  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={handleCloseModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-10' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
              <Dialog.Title
                as='h3'
                className='text-lg font-medium leading-6 text-gray-900'
              ></Dialog.Title>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default BanUserModal
