import { ChangeEvent, FormEvent, useState, useCallback } from 'react'

import { RobuxTransactionForm } from '../../components/base/RobuxTransactionForm'
import { IAmountState } from '../../types/Form'

import { localeStringToNumber } from '../../helpers/numbers'
import { defaultAmountSchema } from '../../helpers/yupSchema'
import { useOutletContext } from 'react-router-dom'
import { TSocket } from '../../store/SocketStore'

export const Robux = () => {
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
          socket.emit('withdraw_robux', { amount: values.amountNumber }, (res: any) => {
            alert(JSON.stringify(res, null, 2))
          })
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
