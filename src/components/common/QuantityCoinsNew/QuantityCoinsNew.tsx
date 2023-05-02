import { FC } from 'react'
import { formatNumber } from '../../../helpers/numbers'
import clsx from 'clsx'

enum ColorEnum {
  White = 'White',
  Green = 'Green',
  Red = 'Red'
}

enum TextSizeEnum {
  Size13 = 'Size13',
  Size14 = 'Size14',
  Size16 = 'Size16'
}

interface QuantityCoinsNewProps {
  quantity?: number | null
  fontColor?: keyof typeof ColorEnum
  fontSize?: keyof typeof TextSizeEnum
}

const QuantityCoinsNew: FC<QuantityCoinsNewProps> = ({
  quantity,
  fontColor = ColorEnum.White,
  fontSize = TextSizeEnum.Size13
}) => {
  const fontColorClasses = clsx('font-bold', {
    'text-white': fontColor === ColorEnum.White,
    'text-green-primary': fontColor === ColorEnum.Green,
    'text-red-accent': fontColor === ColorEnum.Red
  })

  const fontSizeClasses = clsx('', {
    'text-base': fontSize === TextSizeEnum.Size16
  })

  const renderQuantity = () => {
    if (typeof quantity !== 'number') {
      return <>...</>
    }

    if (!Number.isInteger(quantity) || quantity === 0) {
      return <>{formatNumber(quantity, 2)}</>
    }

    if (Number.isInteger(quantity)) {
      return (
        <>
          {formatNumber(quantity)}
          <span className='opacity-50'>.00</span>
        </>
      )
    }
  }

  return <span className={`${fontColorClasses} ${fontSizeClasses}`}>{renderQuantity()}</span>
}

export default QuantityCoinsNew
