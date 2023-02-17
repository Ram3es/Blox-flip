import React, { useState } from 'react'
import Button from '../base/Button'
import ModalWrapper from '../base/ModalWrapper'
import GiftWithDiamond from '../icons/GiftWithDiamond'

const RobuxModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: Function }) => {
  const [inputsValue, setInputValue] = useState({ promo: '', affiliate: '' })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputValue(prev => ({ ...prev, [name]: value }))
  }
  console.log(inputsValue.promo)
  return (isOpen
    ? <ModalWrapper closeModal={ onClose }>
            <div className="flex border-b border-blue-highlight mb-6 pb-6 pr-8">
                <div className="w-7 mr-2 shrink-0 text-green-primary">
                    <GiftWithDiamond />
                </div>
                <h3 className="text-2xl font-extrabold">WANT FREE ROBUX?</h3>
            </div>
            <div className="gradient-blue-secondary text-gray-primary text-sm px-4 py-2 leading-4 rounded-t-xl inline-block">Promo code</div>
            <div className="bg-dark/25 rounded-xl rounded-tl-none overflow-hidden mb-6">
                <div className="relative z-10 gradient-blue-secondary flex items-center py-2.5 pl-4 pr-3">
                    <input
                      type="text"
                      name='promo'
                      value={inputsValue.promo}
                      onChange={onChange}
                      className="grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none"
                      placeholder="..."/>
                    <a href="#" className="flex items-center leading-9 text-xs font-bold rounded shadow-green-20 px-2.5 gradient-green">
                        <span className="w-4 shrink-0 mr-1.5">
                            <img src="img/diamond_white.svg" alt="" width="15" height="12" loading="lazy" decoding="async" className="" />
                        </span>
                         Claim
                    </a>
                </div>
            </div>
            <div className="gradient-blue-secondary text-gray-primary text-sm px-4 py-2 leading-4 rounded-t-xl inline-block">Affiliate code</div>
            <div className="bg-dark/25 rounded-xl rounded-tl-none overflow-hidden">
                <div className="relative z-10 gradient-blue-secondary flex items-center py-2.5 pl-4 pr-3">
                    <input
                      type="text"
                      name='affiliate'
                      value={inputsValue.affiliate}
                      onChange={onChange}
                      placeholder="..."
                      className="grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none" />
                      <a href="#" className="flex items-center leading-9 text-xs font-bold rounded shadow-green-20 px-2.5 gradient-green">
                        <span className="w-4 shrink-0 mr-1.5">
                            <img src="/src/assets/img/diamond_white.svg" alt="" width="15" height="12" loading="lazy" decoding="async" className="" />
                        </span>
                        Claim
                      </a>
                </div>
            </div>
            <Button text={' Confirm'} submitFunction={() => { '' }} />
        </ModalWrapper>
    : null)
}

export default RobuxModal
