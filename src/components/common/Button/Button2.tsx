import { FC, ReactNode, ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

import { BaseSizes } from '../../../types/sizes'

enum VariantEnum {
  STANDARD = 'STANDARD',
  GRADIENT = 'GRADIENT',
  OUTLINED = 'OUTLINED'
}

enum ColorEnum {
  GREEN = 'bg-green-primary',
  BLUE = 'bg-blue-highlight'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: string
  variant?: keyof typeof VariantEnum
  children?: ReactNode
}

export const Button2: FC<ButtonProps> = ({
  color = 'green-primary',
  variant = VariantEnum.STANDARD,
  children,
  ...buttonProps
}) => {
  // const buttonClasses = clsx(
  //   'bg-green-primary flex flex-row items-center justify-center whitespace-nowrap leading-7 text-11 font-bold rounded',
  //   {
  //     'gradient-green hover:bg-gradient-to-r hover:to-green-500 hover:from-green-500 shadow-green-15 px-1.5':
  //       variant === VariantEnum.GRADIENT,
  //     'w-7 h-7': variant === VariantEnum.STANDARD && size === BaseSizes.MEDIUM,
  //     'w-6 h-6': variant === VariantEnum.STANDARD && size === BaseSizes.SMALL,
  //     'gap-2 leading-9 text-xs rounded shadow-green-20 px-2.5 gradient-green':
  //       variant === VariantEnum.GRADIENT && size === BaseSizes.MEDIUM
  //   }
  // )

  const gradientVariant =
    'gradient-green hover:bg-gradient-to-r hover:to-green-500 hover:from-green-500 shadow-green-15'
  const outlinedVariant = ''
  const standardVariant = ''
  const variantClasses = clsx('rounded', {
    standardVariant: variant === VariantEnum.STANDARD,
    gradientVariant: variant === VariantEnum.GRADIENT,
    outlinedVariant: variant === VariantEnum.OUTLINED
  })

  const colorClasses = `bg-${color}`

  return (
    <button className={clsx(variantClasses, colorClasses)} {...buttonProps}>
      {children}
    </button>
  )
}
