import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { RobuxTransactionForm } from '../../components/base/RobuxTransactionForm'

import { giftCardSchema } from '../../helpers/yupSchema'

export const DepositGift = () => {
  const [values, setValues] = useState<string>('')

  const handleAmountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setValues(value)
    },
    [values]
  )

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      giftCardSchema('values')
        .validate(values, { abortEarly: false })
        .then(() => {
          console.log('Validation successful')
          setValues(values)
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    [values]
  )
  return (
    <RobuxTransactionForm
      methodName='Redeem Gift Card'
      onSubmit={handleFormSubmit}
      onChange={handleAmountChange}
      values={values}
      variant='Gift'
    />
  )
}
