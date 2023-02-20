import React, { useState } from 'react'
import Button from '../base/Button'
import InputWithLabel from '../base/InputWithLabel'
import ModalWrapper from '../base/ModalWrapper'
import { DiamondIcon } from '../DiamondIcon/DiamondIcon'
import GiftWithDiamond from '../icons/GiftWithDiamond'

const RobuxModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: Function }) => {
  const [inputsValue, setInputValue] = useState({ promo: '', affiliate: '' })

  const onChange = (name: string, value: string) => {
    setInputValue(prev => ({ ...prev, [name]: value }))
  }

  return (isOpen
    ? <ModalWrapper closeModal={ onClose }>
            <div className="flex border-b border-blue-highlight mb-6 pb-6 pr-8">
                <div className="w-7 mr-2 shrink-0 text-green-primary">
                    <GiftWithDiamond />
                </div>
                <h3 className="text-2xl font-extrabold">WANT FREE ROBUX?</h3>
            </div>
            <InputWithLabel
              type='text'
              name='promo'
              label='Promo Code'
              value={inputsValue.promo}
              placeholder="..."
              changeFunction={onChange} >
                 <Button
                    text='Claim'
                    buttonClasses="flex items-center gap-2 leading-9 text-xs font-bold rounded shadow-green-20 px-2.5 gradient-green"
                    submitFunction={() => {}}
                    >
                     <DiamondIcon />
                </Button>
            </InputWithLabel>
            <InputWithLabel
              type='text'
              name='affiliate'
              label='Affiliate code'
              value={inputsValue.affiliate}
              placeholder="..."
              changeFunction={onChange} >
                 <Button
                    text='Claim'
                    buttonClasses="flex items-center gap-2 leading-9 text-xs font-bold rounded shadow-green-20 px-2.5 gradient-green"
                    submitFunction={() => {}}
                    >
                     <DiamondIcon />
                </Button>
            </InputWithLabel>
        </ModalWrapper>
    : null)
}

export default RobuxModal
