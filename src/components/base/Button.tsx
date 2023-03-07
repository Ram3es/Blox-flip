import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

enum VariantEnum {
  Standard = 'Standard',
  Gradient = 'Gradient',
  Outlined = 'Outlined',
  Highlight = 'Highlight'
}

enum ColorEnum {
  GreenPrimary = 'GreenPrimary',
  BlueSecondary = 'BlueSecondary',
  BlueAccent = 'BlueAccent',
  BlueHighlight = 'BlueHighlight'
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
      'bg-blue-accent': color === ColorEnum.BlueAccent,
      'bg-blue-highlight': color === ColorEnum.BlueHighlight
    })

    const variantClasses = clsx('font-bold flex items-center rounded', {
      'gradient-green hover:bg-gradient-to-r hover:to-green-500 hover:from-green-500 shadow-green-20': variant === VariantEnum.Gradient,
      'text-green-primary border bg-green-primary/15 hover:bg-green-primary/30 border-green-primary ': variant === VariantEnum.Outlined,
      'text-gray-primary font-semibold rounded bg-blue-highlight border border-blue-highlight hover:text-white': variant === VariantEnum.Highlight
    })

    return (
      <button ref={ref} className={clsx(colorClasses, variantClasses)} {...buttonProps}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'MainButton'
