import { ChangeEvent, useState } from 'react'
import { InputWithLabel } from '../base/InputWithLabel'
import ModalWrapper from '../base/ModalWrapper'
import { Button } from '../common/Button/Button'
import { DiamondIcon } from '../DiamondIcon/DiamondIcon'
import { GiftWithDiamond } from '../icons/GiftWithDiamond'

const RobuxModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: Function }) => {
  const [inputsValue, setInputValue] = useState({ promo: '', affiliate: '' })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputsValue, [event.target.name]: event.target.value })
  }

  return isOpen
    ? (<ModalWrapper closeModal={onClose}>
      <div className='flex border-b border-blue-highlight mb-6 pb-6 pr-8'>
        <div className='w-7 mr-2 shrink-0 text-green-primary'>
          <GiftWithDiamond />
        </div>
        <h3 className='text-2xl font-extrabold'>WANT FREE ROBUX?</h3>
      </div>
      <InputWithLabel
        type='text'
        name='promo'
        label='Promo Code'
        value={inputsValue.promo}
        placeholder='...'
        onChange={(event) => handleChange(event)}
      >
        <Button size='MEDIUM' variant='GRADIENT' icon={
          <DiamondIcon />
        }>
          Claim
        </Button>
      </InputWithLabel>
      <InputWithLabel
        type='text'
        name='affiliate'
        label='Affiliate code'
        value={inputsValue.affiliate}
        placeholder='...'
        onChange={(event) => handleChange(event)}
      >
        <Button size='MEDIUM' variant='GRADIENT' icon={
          <DiamondIcon />
        }>
          Claim
        </Button>
      </InputWithLabel>
    </ModalWrapper>)
    : null
}

export default RobuxModal
