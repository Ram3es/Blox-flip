import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { RobuxTransactionForm } from '../../../components/base/RobuxTransactionForm'
import { localeStringToNumber } from '../../../helpers/numbers'
import { defaultAmountSchema } from '../../../helpers/yupSchema'
import { IAmountState } from '../../../types/Form'

export const DepositRobux = () => {
  const [values, setValues] = useState<IAmountState>({ amountString: '', amountNumber: 0 })

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
    <>
      <RobuxTransactionForm
        methodName='Input robox amount'
        onSubmit={handleFormSubmit}
        onChange={handleAmountChange}
        values={values}
        variant='Deposit'
      />
    </>
  )
}