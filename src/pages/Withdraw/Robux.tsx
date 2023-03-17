import { ChangeEvent, FormEvent, useState, useCallback } from 'react'

import { RobuxTransactionForm } from '../../components/Base/RobuxTransactionForm'
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
    <div className='border--mask border--radial-blue  bg-gradient-radial from-blue-light-secondary/20 to-blue-accent-secondary/0 rounded text-sm p-5 xs:p-9 overflow-hidden relative'>
      <RobuxTransactionForm
        methodName='Input robox amount'
        onSubmit={handleFormSubmit}
        onChange={handleAmountChange}
        values={values}
        variant='Withdraw'
      />
    </div>
  )
}
