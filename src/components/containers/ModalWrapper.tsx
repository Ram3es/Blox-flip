import { FC, ReactNode, useEffect, useRef } from 'react'
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
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = (e: MouseEvent) => {
    if (!contentRef.current?.contains(e.target as Node)) {
      closeModal()
    }
  }
  useEffect(() => {
    wrapperRef.current?.addEventListener('click', handleOutsideClick)
    return () => {
      wrapperRef.current?.removeEventListener('click', handleOutsideClick)
    }
  }, [])
  return (
    <div ref={wrapperRef} className='fixed inset-0 z-[100] h-full w-full flex flex-col justify-center items-center bg-blue-darken/75'>
      <div
        ref={contentRef}
        className={
          modalClasses ??
          'py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-xl w-full m-auto'
        }
      >
        <Button
          className={
            closeBtnClasses ??
            'rounded w-7 h-7 leading-7 absolute top-4 right-6 text-center flex items-center justify-center bg-lightblue-darken cursor-pointer z-[50]'
          }
          onClick={(e) => { e.stopPropagation(); closeModal() } }
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
