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
  Size16 = 'Size16',
  Size17 = 'Size17',
  Size22 = 'Size22'
}

interface CoinsTypographyProps {
  quantity?: number | null
  fontColor?: keyof typeof ColorEnum
  fontSize?: keyof typeof TextSizeEnum
}

const CoinsTypography: FC<CoinsTypographyProps> = ({
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
    'text-13': fontSize === TextSizeEnum.Size13,
    'text-sm': fontSize === TextSizeEnum.Size14,
    'text-base': fontSize === TextSizeEnum.Size16,
    'text-17': fontSize === TextSizeEnum.Size17,
    'text-22': fontSize === TextSizeEnum.Size22
  })

  const renderQuantity = () => {
    if (typeof quantity !== 'number') {
      return <>...</>
    }

    if (!Number.isInteger(quantity)) {
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

export default CoinsTypography
