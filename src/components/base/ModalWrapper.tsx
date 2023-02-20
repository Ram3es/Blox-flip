import React, { FC } from 'react'
import CloseIcon from '../../assets/img/close.svg'
import Button from './Button'

interface IModalWrapper {
  children: JSX.Element | JSX.Element[] | undefined
  closeModal: Function

}

const ModalWrapper: FC<IModalWrapper> = ({ children, closeModal }) => {
  return (
        <div className="fixed inset-0 z-[50] h-screen w-screen flex flex-col justify-center items-center bg-blue-darken/75">
          <div className="max-h-full w-full overflow-auto p-4">
            <div className="pt-5 pb-9 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-xl w-full m-auto">
              <Button
                text=''
                buttonClasses='rounded w-7 h-7 leading-7 absolute top-4 right-6 text-center bg-blue-accent cursor-pointer'
                submitFunction={() => closeModal()}>
                 <img src={ CloseIcon } alt="close" width="10" height="10" loading="lazy" decoding="async" className="inline" />
              </Button>
              {children}
            </div>
        </div>
    </div>
  )
}

export default ModalWrapper
