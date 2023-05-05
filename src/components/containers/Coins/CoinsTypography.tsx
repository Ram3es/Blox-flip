import { FC } from 'react'

import clsx from 'clsx'

import { formatNumber } from '../../../helpers/numbers'
import { TypographySizeEnum } from '../../../types/enums'

enum TypographyColorEnum {
  White = 'White',
  Green = 'Green',
  Red = 'Red'
}

export interface CoinsTypographyProps {
  typographyQuantity: number | null
  typographyFontColor?: keyof typeof TypographyColorEnum
  typographyFontSize?: keyof typeof TypographySizeEnum
}

const CoinsTypography: FC<CoinsTypographyProps> = ({
  typographyQuantity,
  typographyFontColor = TypographyColorEnum.White,
  typographyFontSize = TypographySizeEnum.Size14
}) => {
  const fontColorClasses = clsx('font-bold', {
    'text-white': typographyFontColor === TypographyColorEnum.White,
    'text-green-primary': typographyFontColor === TypographyColorEnum.Green,
    'text-red-accent': typographyFontColor === TypographyColorEnum.Red
  })

  const fontSizeClasses = clsx('', {
    'text-xs': typographyFontSize === TypographySizeEnum.Size13,
    'text-13': typographyFontSize === TypographySizeEnum.Size13,
    'text-sm': typographyFontSize === TypographySizeEnum.Size14,
    'text-base': typographyFontSize === TypographySizeEnum.Size16,
    'text-17': typographyFontSize === TypographySizeEnum.Size17,
    'text-lg': typographyFontSize === TypographySizeEnum.Size18,
    'text-22': typographyFontSize === TypographySizeEnum.Size22
  })

  const renderQuantity = () => {
    if (typeof typographyQuantity !== 'number') {
      return <>...</>
    }

    if (!Number.isInteger(typographyQuantity)) {
      return <>{formatNumber(typographyQuantity, 2)}</>
    }

    if (Number.isInteger(typographyQuantity)) {
      return (
        <>
          {formatNumber(typographyQuantity)}
          <span className='opacity-50'>.00</span>
        </>
      )
    }
  }

  return <span className={`${fontColorClasses} ${fontSizeClasses}`}>{renderQuantity()}</span>
}

export default CoinsTypography
