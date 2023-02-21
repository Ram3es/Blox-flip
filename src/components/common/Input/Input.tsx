import { FC, InputHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

enum InputVariantEnum {
  BASE = 'BASE',
  CHAT = 'CHAT',
  OUTLINED = 'OUTLINED'
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  variant?: keyof typeof InputVariantEnum
  children?: ReactNode
}

export const Input: FC<InputProps> = ({
  label,
  variant = InputVariantEnum.BASE,
  children,
  ...inputProps
}) => {
  const inputClasses = clsx('relative z-10', {
    'rounded p-3 pl-4 pr-14 bg-blue-secondary text-gray_96 w-full text-13 focus:outline focus:outline-pink-primary':
      variant === InputVariantEnum.BASE,
    'group grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none appearance-none m-0 w-full':
      variant === InputVariantEnum.OUTLINED
  })

  return (
    <div className=''>
      <input
        type={inputProps.type}
        name={inputProps.name}
        value={inputProps.value}
        onChange={inputProps.onChange}
        placeholder={inputProps.placeholder}
        className={inputClasses}
      />
      {children}
    </div>
  )
}
