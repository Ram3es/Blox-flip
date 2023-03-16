import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import * as Yup from 'yup'

import InputWithLabel from '../../components/base/InputWithLabel'
import { Button } from '../../components/base/Button'
import { DepositGiftList } from './DepositGiftList'
import { DiamondIcon } from '../../components/DiamondIcon/DiamondIcon'

export const DepositGift = () => {
  const [giftCode, setGiftCode] = useState('')

  const giftCodeSchema = Yup.string()
    .required('Code is required')
    .matches(/^[A-Za-z0-9]{4}(-[A-Za-z0-9]{4}){4}$/, {
      message: 'Code must be in the format XXXX-XXXX-XXXX-XXXX-XXXX'
    })
    .max(24, 'Code must not exceed 16 characters')

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      giftCodeSchema
        .validate(giftCode)
        .then(() => {
          console.log('Validation successful')
          setGiftCode('')
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    [giftCode]
  )

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value.toUpperCase()

      value = value.replace(/[^A-Z0-9]/g, '')
      value = value.slice(0, 20)
      value = value.replace(/(.{4})/g, '$1-')
      value = value.replace(/-$/, '')

      setGiftCode(value)
    },
    [giftCode]
  )

  return (
    <div>
      <div className='border-t border-b border-t-sky-primary/40 border-b-sky-primary/40 rounded mb-9'>
        <div className='border--mask border--radial-blue  bg-gradient-radial from-blue-light-secondary/20 to-blue-accent-secondary/0 rounded text-sm px-3 xxs:px-6 py-9 overflow-hidden relative'>
          <form onSubmit={handleFormSubmit}>
            <div className='relative'>
              <InputWithLabel
                autoComplete='off'
                labelClasses='flex flex-col w-full mb-8 items-center'
                titleClasses='gradient-blue-secondary text-gray-primary text-sm px-10 py-3 leading-4 rounded-t-xl inline-block'
                inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
                inputClasses='grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none'
                type='text'
                label='Redeem gift card'
                value={giftCode}
                onChange={handleChange}
                placeholder='XXXX-XXXX-XXXX-XXXX-XXXX'
              />
            </div>
            <div className='flex flex-col items-center'>
              <Button type='submit' variant='Gradient' color='GreenPrimary'>
                <div className='flex items-center justify-center px-24 py-3 text-15'>
                  <span className='min-w-fit shrink-0 mr-1.5'>
                    <DiamondIcon width='20' height='17' />
                  </span>
                  Redeem
                </div>
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className='border-[0.5px] border-sky-primary/40 rounded'>
        <div className='bg-gradient-radial from-blue-light-secondary/20 to-blue-accent-secondary/0 rounded text-sm py-4 overflow-hidden relative flex items-center justify-center'>
          <DepositGiftList />
        </div>
      </div>
    </div>
  )
}
