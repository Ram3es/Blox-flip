import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

enum VariantEnum {
  Standard = 'Standard',
  Gradient = 'Gradient',
  Outlined = 'Outlined'
}

enum ColorEnum {
  GreenPrimary = 'GreenPrimary',
  BlueSecondary = 'BlueSecondary',
  BlueAccent = 'BlueAccent'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: keyof typeof ColorEnum
  variant?: keyof typeof VariantEnum
  children?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color, variant = VariantEnum.Standard, children, ...buttonProps }, ref) => {
    const colorClasses = clsx('', {
      'bg-green-primary': color === ColorEnum.GreenPrimary,
      'bg-blue-secondary': color === ColorEnum.BlueSecondary,
      'bg-blue-accent': color === ColorEnum.BlueAccent
    })

    const variantClasses = clsx('font-bold flex items-center rounded', {
      'gradient-green hover:bg-gradient-to-r hover:to-green-500 hover:from-green-500 shadow-green-20': variant === VariantEnum.Gradient
    })

    return (
      <button ref={ref} className={clsx(colorClasses, variantClasses)} {...buttonProps}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'MainButton'
