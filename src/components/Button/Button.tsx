import { FC, ReactNode } from 'react'
import { BaseSizes } from '../../types/sizes'

enum ButtonVariantEnum {
  GRADIENT = 'GRADIENT',
  STANDARD = 'STANDARD',
  OUTLINED = 'OUTLINED',
}

enum ButtonSizeEnum {
  XL = 'XL',
  XXL = 'XXL'
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof BaseSizes | keyof typeof ButtonSizeEnum
  variant?: keyof typeof ButtonVariantEnum
  icon?: ReactNode
  disabled?: boolean
  children?: ReactNode
}

export const Button: FC<ButtonProps> = ({
  size,
  variant = ButtonVariantEnum.STANDARD,
  icon,
  disabled,
  children
}) => {
  return (
    <button className='flex-row flex items-center whitespace-nowrap leading-7 text-11 font-bold gradient-green hover:bg-gradient-to-r hover:to-green-500 hover:from-green-500 rounded shadow-green-15 px-1.5'>
      {children && <span>{children}</span>}
      {icon && <span>{icon}</span>}
    </button>
  )
}
