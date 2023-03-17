import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { Button } from '../../../components/Base/Button'
import InputWithLabel from '../../../components/Base/InputWithLabel'
import { QuantityCoinsWithChildren } from '../../../components/Common/QuantityCoins/QuantityWithChildren'
import MethodsContainer from '../../../components/Containers/PaymentMethodContainer'
import DiamondIcon from '../../../components/Icons/DiamondIcon'

const CreditCardForm = () => {
  const [values, setValue] = useState({ cash: '', diamond: '' })
  const formRef = useRef<HTMLFormElement>(null)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (isValidInput(value) || value === '') {
      if (name === 'cash') {
        setValue(prev => ({ ...prev, [name]: value, diamond: value !== '' ? ((Number(value) * 3.255).toFixed(2)).toString() : '' }))
      } else {
        setValue(prev => ({ ...prev, [name]: value, cash: value !== '' ? ((Number(value) / 3.255).toFixed(2)).toString() : '' }))
      }
    }
  }

  const isValidInput = (elem: string): boolean => {
    const decimalNum = /^0$|^[1-9]\d*$|^\.\d+$|^0\.\d*$|^[1-9]\d*\.\d*$/
    return Boolean(decimalNum.test(elem))
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <MethodsContainer >
      <div className='w-full'>
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onKeyDown={(event) => event.key === 'Enter' && onSubmit(event)}
      >
        <div className='flex gap-4'>
            <div className='relative w-full'>
              <InputWithLabel
                name='cash'
                type='text'
                label='Input Amount'
                value={values.cash}
                onChange={onChange}
                placeholder='0.00'
                titleClasses='w-fit gradient-blue-secondary text-gray-primary text-sm px-4 py-2 leading-4 rounded-t-xl mx-auto'
                inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
                inputClasses='grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none pl-4 text-white'
                autoComplete='off'
              />
                <span className="absolute top-12 pt-0.5 left-4 bg-none border-none outline-none shadow-none  text-green-secondary font-extrabold mr-1.5">$</span>
            </div>
            <div className='relative w-full'>
              <InputWithLabel
                name='diamond'
                type='text'
                label='Input Amount'
                value={values.diamond}
                onChange={onChange}
                placeholder='0.00'
                titleClasses='w-fit gradient-blue-secondary text-gray-primary text-sm px-4 py-2 leading-4 rounded-t-xl mx-auto'
                inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
                inputClasses='grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none pl-8'
                autoComplete='off'
              />
                <div className='w-6 h-6 text-center leading-6 shrink-0 bg-green-primary/20 rounded mr-2 text-green-primary absolute top-12 pt-0.5 left-4'>
                  <DiamondIcon className='-inset-full absolute m-auto' />
                </div>
            </div>
        </div>
        <div className='flex flex-col items-center'>
        <div className='text-gray-primary mb-2 font-bold uppercase'>YOU ARE BUYING</div>
        <div className='text-17 flex items-center mx-auto mb-7'>
          <QuantityCoinsWithChildren
              quantityClasses='flex items-center text-base font-bold'
              quantity={Number(values.diamond)} >
            <span className="w-6 h-6 text-center leading-6 bg-green-primary/20 rounded relative mr-1.5 text-green-secondary">
              <DiamondIcon className='-inset-full absolute m-auto' />
            </span>
          </QuantityCoinsWithChildren>
        </div>
        <div className='bg-gradient-to-r from-blue-highlight/0 via-blue-highlight to-blue-highlight/0 w-80 h-px mx-auto shrink-0 mb-7'></div>
        <Button
          type='submit'
          className='pointer-events-auto flex justify-center items-center leading-9 text-white text-base font-bold rounded px-2.5 py-1  shadow-green-20 gradient-green hover:bg-gradient-to-r hover:to-green-500 hover:from-green-500 w-64 shrink-0'
        >
          <span className='min-w-fit shrink-0 mr-1.5'>
            <DiamondIcon width='20' height='17' />
          </span>
         Buy now
        </Button>
      </div>
    </form>
    </div>
    </MethodsContainer>
  )
}

export default CreditCardForm
