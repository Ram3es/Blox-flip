import { FC, InputHTMLAttributes } from 'react'
import clsx from 'clsx'

enum InputVariantEnum {
  BASE = 'BASE',
  OUTLINED = 'OUTLINED',
  FORM = 'FORM'
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: keyof typeof InputVariantEnum
}

export const Input: FC<InputProps> = ({ variant = InputVariantEnum.BASE, ...inputProps }) => {
  const inputClasses = clsx('relative z-10 outline-none', {
    'rounded p-3 pl-4 pr-14 bg-blue-secondary text-gray_96 w-full text-13 focus:outline focus:outline-pink-primary':
      variant === InputVariantEnum.BASE,
    'group grow w-0 mr-2 bg-transparent bg-none border-none shadow-none appearance-none m-0 w-full':
      variant === InputVariantEnum.OUTLINED,
    'rounded-xl gradient-blue-secondary min-h-[57px] w-full pl-11': variant === InputVariantEnum.FORM
  })

  return (
    <input
      type={inputProps.type}
      name={inputProps.name}
      value={inputProps.value}
      onChange={inputProps.onChange}
      placeholder={inputProps.placeholder}
      className={inputClasses}
    />
  )
}
