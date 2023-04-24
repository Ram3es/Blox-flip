import { InputHTMLAttributes, useEffect, useRef } from 'react'

import clsx from 'clsx'

import DiamondIcon from '../icons/DiamondIcon'

enum OutlineColorEnum {
  RedLightSecondary = 'RedLightSecondary'
}

interface InputWithInlineLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  outlineColor?: keyof typeof OutlineColorEnum
  inputClasses?: string
  labelClasses?: string
  withIcon?: boolean
}

const InputWithInlineLabel = ({
  label,
  outlineColor,
  withIcon = false,
  inputClasses,
  labelClasses,
  ...inputProps
}: InputWithInlineLabelProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const updateInputWidth = () => {
    if (inputRef.current) {
      inputRef.current.style.width =
        inputRef.current.value.length > 1
          ? (inputRef.current.value.length + 1).toString() + 'ch'
          : '20px'
    }
  }

  useEffect(() => {
    updateInputWidth()
  }, [inputProps.value])

  const containerClasses = clsx(
    'pl-4 pr-4 rounded-10 gradient-background--blue__secondary py-4 flex items-center justify-between w-full cursor-text',
    {
      'border border-red-light-secondary/30': outlineColor === OutlineColorEnum.RedLightSecondary
    }
  )

  return (
    <div className={containerClasses} onClick={() => inputRef.current?.focus()}>
      <span
        className={
          labelClasses ??
          'rounded-md px-5 py-2 font-medium text-sm gradient--background--blue__third text-gray-primary'
        }
      >
        {label}
      </span>
      <div className='flex items-center justify-end'>
        {withIcon && (
          <div className='relative w-6 h-6 text-center leading-6 shrink-0 bg-green-primary/20 rounded text-green-primary'>
            <DiamondIcon className='-inset-full absolute m-auto' />
          </div>
        )}
        <input
          ref={inputRef}
          onChange={inputProps.onChange}
          value={inputProps.value}
          className={
            inputClasses ?? 'pl-2 bg-transparent text-left outline-none placeholder:text-white'
          }
          type={inputProps.type}
          placeholder={inputProps.placeholder}
          {...inputProps}
        />
      </div>
    </div>
  )
}

export default InputWithInlineLabel
