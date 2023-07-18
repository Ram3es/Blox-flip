import { FC, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import InputWithLabel from '../base/InputWithLabel'
import { Button } from '../base/Button'

interface IAuAuthCodeModalProps {
  onClose: Function
  onSubmit: (code: string) => void
}

const AuthCodeModal: FC<IAuAuthCodeModalProps> = ({ onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleSubmit = () => {
    if (!inputValue || inputValue.length > 6 || inputValue.length < 6) return
    onSubmit(inputValue)
    onClose()
  }
  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses="relative py-6 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-2xl w-full m-auto overflow-hidden"
    >
      <div className="flex flex-col items-center">
        <div className="text-3xl font-extrabold text-lightblue-secondary uppercase shrink-0 mr-4 mb-4">
          2-Step Verification
        </div>
        <InputWithLabel
          type="text"
          label="Code"
          placeholder="Enter 6-digit Code"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          className="flex items-center justify-center min-w-[110px] leading-9 text-sm font-bold rounded bg-green-primary hover:bg-green-highlight px-2.5"
          onClick={handleSubmit}
        >
          Verify Code
        </Button>
      </div>
    </ModalWrapper>
  )
}

export default AuthCodeModal
