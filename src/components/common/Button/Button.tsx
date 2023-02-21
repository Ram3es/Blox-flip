import { FC, ReactNode, ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

import { BaseSizes } from '../../../types/sizes'

enum ButtonVariantEnum {
  GRADIENT = 'GRADIENT',
  STANDARD = 'STANDARD',
  OUTLINED = 'OUTLINED'
}

enum ButtonSizeEnum {
  XL = 'XL',
  XXL = 'XXL'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: keyof typeof BaseSizes | keyof typeof ButtonSizeEnum
  variant: keyof typeof ButtonVariantEnum
  children?: ReactNode
}

export const Button: FC<ButtonProps> = ({ size, variant, children, ...buttonProps }) => {
  const buttonClasses = clsx(
    'bg-green-primary flex flex-row items-center justify-center whitespace-nowrap leading-7 text-11 font-bold rounded',
    {
      'gradient-green hover:bg-gradient-to-r hover:to-green-500 hover:from-green-500 shadow-green-15 px-1.5':
        variant === ButtonVariantEnum.GRADIENT,
      'w-7 h-7': variant === ButtonVariantEnum.STANDARD && size === BaseSizes.MEDIUM,
      'w-6 h-6':
        variant === ButtonVariantEnum.STANDARD && size === BaseSizes.SMALL,
      'gap-2 leading-9 text-xs rounded shadow-green-20 px-2.5 gradient-green':
        variant === ButtonVariantEnum.GRADIENT && size === BaseSizes.MEDIUM
    }
  )

  return (
    <button className={buttonClasses} {...buttonProps}>
      <div className='flex items-center justify-around gap-1'>{children}</div>
    </button>
  )
}
