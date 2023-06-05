import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { RobuxTransactionForm } from '../../../components/base/RobuxTransactionForm'
import { localeStringToNumber } from '../../../helpers/numbers'
import { defaultAmountSchema } from '../../../helpers/yupSchema'
import { IAmountState } from '../../../types/Form'
import { TSocket } from '../../../store/SocketStore'
import { useOutletContext } from 'react-router-dom'

export const DepositRobux = () => {
  const [values, setValues] = useState<IAmountState>({ amountString: '', amountNumber: 0 })
  const { socket } = useOutletContext<{ socket: TSocket }>()

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
          socket.emit('deposit_robux', { amount: values.amountNumber }, (res: any) => {
            alert(JSON.stringify(res, null, 2))
          })
          setValues({ amountString: '', amountNumber: 0 })
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    [values, socket]
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
