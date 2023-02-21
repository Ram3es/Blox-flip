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

export const InputWithLabel: FC<InputProps> = ({
  label,
  variant = InputVariantEnum.BASE,
  children,
  ...inputProps
}) => {
  const labelClasses = clsx('flex flex-col w-full', {
    'mb-8': variant === InputVariantEnum.BASE
  })
  const inputClasses = clsx('relative z-10', {
    'grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none':
      variant === InputVariantEnum.BASE,
    'rounded p-3 pl-4 pr-14 bg-blue-secondary text-gray_96 w-full text-13 focus:outline focus:outline-pink-primary':
      variant === InputVariantEnum.CHAT,
    'group grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none appearance-none m-0 w-full':
      variant === InputVariantEnum.OUTLINED
  })

  return (
    <label className={labelClasses}>
      {label !== undefined && (
        <div className='w-fit gradient-blue-secondary text-gray-primary text-sm px-4 py-2 leading-4 rounded-t-xl inline-block'>
          {label}
        </div>
      )}
      <div
        className={
          variant === InputVariantEnum.BASE
            ? 'bg-dark/25 rounded-xl rounded-tl-none overflow-hidden'
            : ''
        }
      >
        <div
          className={
            variant === InputVariantEnum.BASE ? 'gradient-blue-secondary flex py-2.5 pl-4 pr-3' : ''
          }
        >
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
      </div>
    </label>
  )
}
