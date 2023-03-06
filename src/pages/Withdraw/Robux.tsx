import { ChangeEvent, FormEvent, useState, useCallback } from 'react'

import { WithdrawForm } from './WithdrawForm'
import { WithdrawInputState } from '../../types/form'

import { localeStringToNumber } from '../../helpers/numbersFormatter'
import { defaultAmountSchema } from '../../helpers/yupSchema'

export const Robux = () => {
  const [values, setValues] = useState<WithdrawInputState>({ amountString: '', amountNumber: 0 })

  const handleAmountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setValues({ amountString: value, amountNumber: Number(localeStringToNumber(value, 'en-US')) })
    },
    [values]
  )

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      defaultAmountSchema('amountNumber')
        .validate(values, { abortEarly: false })
        .then(() => {
          console.log('Validation successful')
          setValues({ amountString: '', amountNumber: 0 })
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    [values]
  )
  return (
    <WithdrawForm
      methodName='Input robox amount'
      onSubmit={handleFormSubmit}
      onChange={handleAmountChange}
      values={values}
    />
  )
}
