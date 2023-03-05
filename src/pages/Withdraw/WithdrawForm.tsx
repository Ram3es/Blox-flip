import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'

import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import { Button } from '../../components/base/Button'
import { DiamondIcon } from '../../components/DiamondIcon/DiamondIcon'

import SeparatorGrayIcon from '../../assets/img/separator_gray_h.svg'
import InputWithLabel from '../../components/base/InputWithLabel'

import { formatNumber, localeStringToNumber } from '../../helpers/numbersFormatter'
import { defaultAmountSchema } from '../../helpers/yupSchema'

interface WithdrawFormProps {
  methodName: string
  schema?: Yup.ObjectSchema<any>
}

interface ValuesInterface {
  amountString: string
  amountNumber: number
}

export const WithdrawForm: FC<WithdrawFormProps> = ({
  methodName = 'Input amount',
  schema = defaultAmountSchema('amountNumber')
}) => {
  const [values, setValues] = useState<ValuesInterface>({ amountString: '', amountNumber: 0 })
  const formRef = useRef<HTMLFormElement>(null)

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setValues({ amountString: value, amountNumber: Number(localeStringToNumber(value, 'en-US')) })
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    schema
      .validate(values, { abortEarly: false })
      .then(() => {
        console.log('Validation successful')
        setValues({ amountString: '', amountNumber: 0 })
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault()
    }
  }

  useEffect(() => {
    const form = formRef.current

    if (form) {
      form.addEventListener('keypress', handleKeyPress)
    }

    return () => {
      if (form) {
        form.removeEventListener('keypress', handleKeyPress)
      }
    }
  }, [formRef])

  return (
    <div className='border-t border-b border-t-sky-primary/40 border-b-sky-primary/40 rounded mb-9'>
      <div className='border--mask border--radial-blue bg-gradient-radial from-blue-light-secondary/20 to-blue-accent-secondary/0 rounded text-sm px-3 xxs:px-6 py-9 overflow-hidden relative'>
        <div className='relative z-20'>
          <form
            ref={formRef}
            onSubmit={handleFormSubmit}
            onKeyDown={(event) => event.key === 'Enter' && handleFormSubmit(event)}
          >
            <div>
              <InputWithLabel
                autoComplete='off'
                labelClasses='flex flex-col w-full mb-8 items-center'
                titleClasses='gradient-blue-secondary text-gray-primary text-sm px-4 py-3 leading-4 rounded-t-xl inline-block'
                inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
                inputClasses='grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none pl-8'
                type='text'
                id='amount'
                name='amount'
                label={methodName}
                value={
                  values.amountNumber === 0
                    ? values.amountString
                    : formatNumber(values.amountNumber)
                }
                onChange={handleAmountChange}
                placeholder='00.00'
              />
              <div className='w-6 h-6 text-center leading-6 shrink-0 bg-green-primary/20 rounded mr-2 text-green-primary absolute top-14 left-4'>
                <DiamondIcon size='LARGE' className='-inset-full absolute m-auto' />
              </div>
            </div>
            <div className='flex flex-col items-center'>
              <div className='text-gray-primary mb-2 font-bold uppercase'>YOU ARE WITHdrawing</div>
              <div className='text-17 flex items-center mx-auto mb-7'>
                <QuantityCoins
                  quantity={values.amountNumber}
                  textSize='text-base'
                  iconHeight='6'
                  iconWidth='6'
                />
              </div>
              <div className='bg-gradient-to-r from-blue-highlight/0 via-blue-highlight to-blue-highlight/0 w-80 h-px mx-auto shrink-0 mb-7'></div>
              <Button
                type='submit'
                className='flex justify-center items-center leading-9 text-gray-primary text-base font-bold rounded px-2.5 py-1 bg-blue-highlight hover:bg-blue-accent w-64 shrink-0'
              >
                <span className='min-w-fit shrink-0 mr-1.5'>
                  <DiamondIcon size='XL' />
                </span>
                Withdraw
              </Button>
            </div>
          </form>
          <img
            src={SeparatorGrayIcon}
            alt=''
            width='300'
            height=''
            loading='lazy'
            decoding='async'
            className='mx-auto my-7'
          />
          <div className='font-semibold text-center text-gray-primary mx-auto'>
            Roblox imposes a 30% fee on every transaction. We do not have any way to stop it,{' '}
            <br className='hidden xs:inline' /> and will not receive any of this fee.
          </div>
        </div>
      </div>
    </div>
  )
}
