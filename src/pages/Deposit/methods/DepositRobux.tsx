import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { RobuxTransactionForm } from '../../../components/base/RobuxTransactionForm'
import { localeStringToNumber } from '../../../helpers/numbers'
import { defaultAmountSchema } from '../../../helpers/yupSchema'
import { IAmountState } from '../../../types/Form'
import { TSocket } from '../../../store/SocketStore'
import { useOutletContext } from 'react-router-dom'
import { getToast } from '../../../helpers/toast'

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
          socket.emit('robux_deposit', { amount: values.amountNumber }, (res: any) => {
            getToast(res)
          })
          setValues({ amountString: '', amountNumber: 0 })
        })
        .catch((error) => {
          getToast(error.message)
          console.log(error.message)
        })
    },
    [values, socket]
  )
  return (
    <>
      <RobuxTransactionForm
        methodName="Input robox amount"
        onSubmit={handleFormSubmit}
        onChange={handleAmountChange}
        values={values}
        variant="Deposit"
      />
    </>
  )
}
