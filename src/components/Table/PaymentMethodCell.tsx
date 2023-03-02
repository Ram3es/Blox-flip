import clsx from 'clsx'
import { FC } from 'react'
import { PaymentMethod } from '../../types/enums'

interface PaymentMethodCellProps {
  paymentMethod: keyof typeof PaymentMethod
}

export const PaymentMethodCell: FC<PaymentMethodCellProps> = ({ paymentMethod }) => {
  return (
    <div
      className={clsx('flex items-center justify-start ml-16', {
        'text-yellow-primary': paymentMethod === PaymentMethod.Crypto,
        'text-lightblue-secondary': paymentMethod === PaymentMethod.Robux,
        'text-lightblue-primary-darken': paymentMethod === PaymentMethod.Limiteds
      })}
    >
      {paymentMethod}
    </div>
  )
}
