import { FC, ReactNode } from 'react'
import CloseIcon from '../../assets/img/close.svg'
import { Button } from '../base/Button'

interface IModalWrapper {
  children: JSX.Element | JSX.Element[] | undefined | ReactNode
  closeModal: Function
  modalClasses?: string
  closeBtnClasses?: string
}

const ModalWrapper: FC<IModalWrapper> = ({
  children,
  closeModal,
  modalClasses,
  closeBtnClasses
}) => {
  return (
    <div className='fixed inset-0 z-[100] h-screen w-screen flex flex-col justify-center items-center bg-blue-darken/75'>
      <div
        className={
          modalClasses ??
          'py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-xl w-full m-auto'
        }
      >
        <Button
          className={
            closeBtnClasses ??
            'rounded w-7 h-7 leading-7 absolute top-4 right-6 text-center bg-lightblue-darken cursor-pointer'
          }
          onClick={() => closeModal()}
        >
          <img
            src={CloseIcon}
            alt='close'
            width='10'
            height='10'
            loading='lazy'
            decoding='async'
            className='inline'
          />
        </Button>
        {children}
      </div>
    </div>
  )
}

export default ModalWrapper
