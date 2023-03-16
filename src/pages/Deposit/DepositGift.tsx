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
    <div className='space-y-20'>
      <DepositGiftForm
        labelName='Redeem gift card'
        onSubmit={handleFormSubmit}
        onChange={handleChange}
        value={giftCode}
      />
      <div className='flex items-center justify-center'>
        <DepositGiftList />
      </div>
    </div>
  )
}
