import { InputHTMLAttributes, ReactNode, useEffect, useRef } from 'react'

import clsx from 'clsx'

enum OutlineColorEnum {
  RedLightSecondary = 'RedLightSecondary'
}

interface InputWithInlineLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  outlineColor?: keyof typeof OutlineColorEnum
  containerClasses?: string
  inputClasses?: string
  labelClasses?: string
  icon?: ReactNode
}

const InputWithInlineLabel = ({
  label,
  outlineColor,
  icon,
  containerClasses,
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

  return (
    <div
      className={clsx(
        containerClasses ??
          'pl-4 pr-4 rounded-10 gradient-background--blue__secondary py-4 flex items-center justify-between w-full cursor-text',
        {
          'border border-red-light-secondary/30':
            outlineColor === OutlineColorEnum.RedLightSecondary
        }
      )}
      onClick={() => inputRef.current?.focus()}
    >
      <span
        className={
          labelClasses ??
          'rounded-md px-5 py-2 font-medium text-sm gradient--background--blue__third text-gray-primary'
        }
      >
        {label}
      </span>
      <div className="flex items-center justify-end">
        {icon}
        <input
          ref={inputRef}
          className={
            inputClasses ??
            'pl-2 bg-transparent text-right outline-none placeholder:text-white max-w-[400px] overflow-y-scroll'
          }
          {...inputProps}
        />
      </div>
    </div>
  )
}

export default InputWithInlineLabel
