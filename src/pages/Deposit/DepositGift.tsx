import { ChangeEvent, FormEvent, useCallback, useState } from 'react'

import * as Yup from 'yup'

import { DepositGiftForm } from './DepositGiftForm'
import { DepositGiftList } from './DepositGiftList'

export const DepositGift = () => {
  const [giftCode, setGiftCode] = useState('')

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setGiftCode(value)
    },
    [giftCode]
  )

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
  return (
    <div>
      <div className='border-t border-b border-t-sky-primary/40 border-b-sky-primary/40 rounded mb-9'>
        <div className='border--mask border--radial-blue  bg-gradient-radial from-blue-light-secondary/20 to-blue-accent-secondary/0 rounded text-sm px-3 xxs:px-6 py-9 overflow-hidden relative'>
          <DepositGiftForm
            labelName='Redeem gift card'
            onSubmit={handleFormSubmit}
            onChange={handleChange}
            value={giftCode}
          />
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
