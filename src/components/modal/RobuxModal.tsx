import { ChangeEvent, useState } from 'react'
import InputWithLabel from '../Base/InputWithLabel'
import ModalWrapper from '../Base/ModalWrapper'
import { Button } from '../Base/Button'
import { DiamondIcon } from '../DiamondIcon/DiamondIcon'
import { GiftWithDiamond } from '../Icons/GiftWithDiamond'

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
      <div className='relative'>
        <InputWithLabel
          type='text'
          name='promo'
          label='Promo Code'
          value={inputsValue.promo}
          placeholder='...'
          onChange={(event) => handleChange(event)}
        />
        <div className='absolute z-20 inset-y-[42px] right-2'>
          <Button color='GreenPrimary' variant='Gradient'>
            <div className='flex items-center gap-1 leading-9 text-xs px-2.5'>
              <DiamondIcon width='15' height='13' />
              Claim
            </div>
          </Button>
        </div>
      </div>
      <div className='relative'>
        <InputWithLabel
          type='text'
          name='affiliate'
          label='Affiliate code'
          value={inputsValue.affiliate}
          placeholder='...'
          onChange={(event) => handleChange(event)}
        />
        <div className='absolute z-20 inset-y-[42px] right-2'>
          <Button color='GreenPrimary' variant='Gradient'>
            <div className='flex items-center gap-1 leading-9 text-xs px-2.5'>
              <DiamondIcon width='15' height='13' />
              Claim
            </div>
          </Button>
        </div>
      </div>
    </ModalWrapper>)
    : null
}

export default RobuxModal
