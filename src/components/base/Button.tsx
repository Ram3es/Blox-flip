import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

enum VariantEnum {
  GreenOutlined = 'GreenOutlined',
  GreenOutlinedSecondary = 'GreenOutlinedSecondary',
  GreenGradient = 'GreenGradient',
  Highlight = 'Highlight',
  HighlightDarken = 'HighlightDarken',
  YellowOutlined = 'YellowOutlined',
  YellowOutlinedSecondary = 'YellowOutlinedSecondary',
  BlueGolfOutlined = 'BlueGolfOutlined'
}

enum ColorEnum {
  GreenPrimary = 'GreenPrimary',
  GreenPrimaryOpacity = 'GreenPrimaryOpacity',
  BlueSecondary = 'BlueSecondary',
  BlueAccent = 'BlueAccent',
  BlueAccentPrimary = 'BlueAccentPrimary',
  BlueHighlight = 'BlueHighlight',
  BlueAccentSix = 'BlueAccentSix',
  RedLight = 'RedLight'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: keyof typeof ColorEnum
  variant?: keyof typeof VariantEnum
  children?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color, variant, children, ...buttonProps }, ref) => {
    const colorClasses = clsx('', {
      'bg-green-primary': color === ColorEnum.GreenPrimary,
      'bg-green-primary/20': color === ColorEnum.GreenPrimaryOpacity,
      'bg-blue-secondary': color === ColorEnum.BlueSecondary,
      'bg-blue-accent': color === ColorEnum.BlueAccent,
      'bg-blue-accent-primary': color === ColorEnum.BlueAccentPrimary,
      'bg-blue-highlight': color === ColorEnum.BlueHighlight,
      'bg-blue-accent-six': color === ColorEnum.BlueAccentSix,
      'bg-red-light': color === ColorEnum.RedLight
    })

    const variantClasses = clsx('flex items-center rounded', {
      'font-bold gradient-green hover:bg-gradient-to-r hover:to-green-500 hover:from-green-500 shadow-green-20':
        variant === VariantEnum.GreenGradient,
      'text-green-primary border bg-green-primary/15 hover:bg-green-primary/30 border-green-primary':
        variant === VariantEnum.GreenOutlined,
      'border border-green-primary gradient-green-secondary shadow-green-primary-20':
        variant === VariantEnum.GreenOutlinedSecondary,
      'text-gray-primary bg-blue-highlight border border-blue-highlight hover:text-white':
        variant === VariantEnum.Highlight,
      'text-gray-primary blue-highlight hover:bg-blue-accent':
        variant === VariantEnum.HighlightDarken,
      'border border-orange-primary-light gradient-yellow shadow-orange-primary-light-20':
        variant === VariantEnum.YellowOutlined,
      'border border-yellow-secondary bg-yellow-secondary bg-opacity-25':
        variant === VariantEnum.YellowOutlinedSecondary,
      'border border-blue-golf bg-blue-golf bg-opacity-25': variant === VariantEnum.BlueGolfOutlined
    })

    return (
      <button ref={ref} className={clsx(colorClasses, variantClasses)} {...buttonProps}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'MainButton'
