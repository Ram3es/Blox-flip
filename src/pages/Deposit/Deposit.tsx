import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { RobuxTransactionForm } from '../../components/base/RobuxTransactionForm'

import { localeStringToNumber } from '../../helpers/numbersFormatter'
import { defaultAmountSchema } from '../../helpers/yupSchema'
import { WithdrawInputState } from '../../types/form'

export const Deposit = () => {
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
    <div className='space-y-10'>
      <RobuxTransactionForm
        methodName='Input robox amount'
        onSubmit={handleFormSubmit}
        onChange={handleAmountChange}
        values={values}
        variant='Deposit'
      />
      <RobuxTransactionForm
        methodName='Input robox amount'
        onSubmit={handleFormSubmit}
        onChange={handleAmountChange}
        values={values}
        variant='Withdraw'
      />
      <RobuxTransactionForm
        methodName='Redeem Gift Card'
        onSubmit={handleFormSubmit}
        onChange={handleAmountChange}
        values={values}
        variant='Gift'
      />
    </div>
  )
}
