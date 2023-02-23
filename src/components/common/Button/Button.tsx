import { FC, ReactNode, ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

import { BaseSizes } from '../../../types/sizes'

enum VariantEnum {
  GRADIENT = 'GRADIENT',
  STANDARD = 'STANDARD',
  OUTLINED = 'OUTLINED'
}

enum SizeEnum {
  XL = 'XL',
  XXL = 'XXL'
}

enum ColorEnum {
  GREEN = 'GREEN',
  BLUE = 'BLUE'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: keyof typeof BaseSizes | keyof typeof SizeEnum
  variant: keyof typeof VariantEnum
  color?: keyof typeof ColorEnum
  children?: ReactNode
}

export const Button: FC<ButtonProps> = ({
  size,
  variant,
  color = ColorEnum.GREEN,
  children,
  ...buttonProps
}) => {
  const buttonClasses = clsx(
    `${
      color === ColorEnum.GREEN
        ? 'bg-green-primary'
        : color === ColorEnum.BLUE
        ? 'bg-blue-highlight'
        : ''
    } flex flex-row items-center justify-center whitespace-nowrap leading-7 text-11 font-bold rounded`,
    {
      'gradient-green hover:bg-gradient-to-r hover:to-green-500 hover:from-green-500 shadow-green-15 px-1.5':
        variant === VariantEnum.GRADIENT,
      'w-7 h-7': variant === VariantEnum.STANDARD && size === BaseSizes.MEDIUM,
      'w-6 h-6': variant === VariantEnum.STANDARD && size === BaseSizes.SMALL,
      'gap-2 leading-9 text-xs rounded shadow-green-20 px-2.5 gradient-green':
        variant === VariantEnum.GRADIENT && size === BaseSizes.MEDIUM,
      'w-9 h-9': size === SizeEnum.XL,
      'bg-blue-highlight': color === ColorEnum.GREEN
    }
  )

  return (
    <button className={clsx(buttonClasses)} {...buttonProps}>
      <div className='flex items-center justify-around gap-1'>{children}</div>
    </button>
  )
}
