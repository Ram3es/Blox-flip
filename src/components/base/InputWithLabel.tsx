import { FC, InputHTMLAttributes } from 'react'

interface IInputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  labelClasses?: string
  inputClasses?: string
  titleClasses?: string
  inputWrapperClasses?: string
  inputSecondWrapperClasses?: string
}

const InputWithLabel: FC<IInputWithLabelProps> = ({
  label,
  labelClasses,
  inputClasses,
  titleClasses,
  inputWrapperClasses,
  inputSecondWrapperClasses,
  ...inputProps
}) => {
  return (
    <label className={labelClasses ?? 'flex flex-col w-full mb-8'}>
      {label !== undefined && (
        <div
          className={
            titleClasses ??
            'w-fit gradient-blue-secondary text-gray-primary text-sm px-4 py-2 leading-4 rounded-t-xl inline-block'
          }
        >
          {label}
        </div>
      )}
      {inputProps.type === 'text' || inputProps.type === 'number' || inputProps.type === 'password'
        ? (
        <div className={inputWrapperClasses ?? 'bg-dark/25 rounded-xl rounded-tl-none overflow-hidden'}>
          <div className={inputSecondWrapperClasses ?? 'relative z-10 gradient-blue-secondary flex items-center min-h-[57px] py-2.5 pl-4 pr-3'}>
            <input
              type={inputProps.type}
              name={inputProps.name}
              value={inputProps.value}
              onChange={inputProps.onChange}
              placeholder={inputProps.placeholder}
              className={inputClasses ?? 'grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none'}
              {...inputProps}
            />
          </div>
        </div>
          )
        : (
        <input
          type={inputProps.type}
          name={inputProps.name}
          value={inputProps.value}
          onChange={inputProps.onChange}
          placeholder={inputProps.placeholder}
          className={inputClasses ?? 'h-5 w-5  rounded accent-green cursor-pointer'}
        />
          )}
    </label>
  )
}

export default InputWithLabel
