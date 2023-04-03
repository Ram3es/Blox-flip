import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

enum VariantEnum {
  Standard = 'Standard',
  Gradient = 'Gradient',
  Outlined = 'Outlined',
  Highlight = 'Highlight',
  HighlightDarken = 'HighlightDarken',
  YellowOutlined = 'YellowOutlined',
  GreenOutlinedSecondary = 'GreenOutlinedSecondary'
}

enum ColorEnum {
  GreenPrimary = 'GreenPrimary',
  GreenPrimaryOpacity = 'GreenPrimaryOpacity',
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
      'bg-green-primary/20': color === ColorEnum.GreenPrimaryOpacity,
      'bg-blue-secondary': color === ColorEnum.BlueSecondary,
      'bg-blue-accent': color === ColorEnum.BlueAccent,
      'bg-blue-highlight': color === ColorEnum.BlueHighlight
    })

    const variantClasses = clsx('flex items-center rounded', {
      'font-bold gradient-green hover:bg-gradient-to-r hover:to-green-500 hover:from-green-500 shadow-green-20':
        variant === VariantEnum.Gradient,
      'text-green-primary border bg-green-primary/15 hover:bg-green-primary/30 border-green-primary ':
        variant === VariantEnum.Outlined,
      'text-gray-primary bg-blue-highlight border border-blue-highlight hover:text-white':
        variant === VariantEnum.Highlight,
      'text-gray-primary blue-highlight hover:bg-blue-accent':
        variant === VariantEnum.HighlightDarken,
      'border border-orange-primary-light gradient-yellow shadow-orange-primary-light-20':
        variant === VariantEnum.YellowOutlined,
      'border border-green-primary gradient-green-secondary shadow-green-primary-20':
        variant === VariantEnum.GreenOutlinedSecondary
    })

    return (
      <button ref={ref} className={clsx(colorClasses, variantClasses)} {...buttonProps}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'MainButton'
