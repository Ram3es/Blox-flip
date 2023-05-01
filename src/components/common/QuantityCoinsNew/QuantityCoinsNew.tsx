import { FC } from 'react'
import { formatNumber } from '../../../helpers/numbers'

interface QuantityCoinsNewProps {
  quantity?: number
}

const QuantityCoinsNew: FC<QuantityCoinsNewProps> = ({ quantity }) => {
  const renderQuantity = () => {
    if (!quantity) {
      return <>...</>
    }

    if (Number.isInteger(quantity)) {
      return (
        <>
          {formatNumber(quantity)}
          <span className='opacity-50'>.00</span>
        </>
      )
    }

    if (!Number.isInteger(quantity)) {
      return <>{formatNumber(quantity, 2)}</>
    }
  }

  return <span>{renderQuantity()}</span>
}

export default QuantityCoinsNew
