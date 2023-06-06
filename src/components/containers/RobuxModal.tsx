import { ChangeEvent, useState } from 'react'
import InputWithLabel from '../base/InputWithLabel'
import ModalWrapper from './ModalWrapper'
import { Button } from '../base/Button'
import DiamondIcon from '../icons/DiamondIcon'
import { GiftWithDiamond } from '../icons/GiftWithDiamond'
import { useSocketCtx } from '../../store/SocketStore'

const RobuxModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: Function }) => {
  const [inputsValue, setInputValue] = useState({ promo: '', affiliate: '' })
  const { socket } = useSocketCtx()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputsValue, [event.target.name]: event.target.value })
  }

  const handlePromocode = () => {
    const { promo: code } = inputsValue
    if (code) {
      socket.emit('promo_use', { code }, (res: any) => {
        alert(JSON.stringify(res, null, 2))
        setInputValue(prev => ({ ...prev, promo: '' }))
      })
    }
  }

  const handleAffilate = () => {
    const { affiliate: code } = inputsValue
    if (code) {
      socket.emit('affiliate_use', { code }, (res: any) => {
        alert(JSON.stringify(res, null, 2))
        setInputValue(prev => ({ ...prev, affiliate: '' }))
      })
    }
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
          <Button
            onClick={handlePromocode}
            color='GreenPrimary'
            variant='GreenGradient'>
            <div className='flex items-center gap-1 leading-9 text-xs px-2.5'>
              <DiamondIcon className='w-[15px] h-[13px]' />
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
          <Button
            onClick={handleAffilate}
            color='GreenPrimary'
            variant='GreenGradient'>
            <div className='flex items-center gap-1 leading-9 text-xs px-2.5'>
              <DiamondIcon className='w-[15px] h-[13px]' />
              Claim
            </div>
          </Button>
        </div>
      </div>
    </ModalWrapper>)
    : null
}

export default RobuxModal
