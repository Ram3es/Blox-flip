import React, { FC } from 'react'

interface IInputWithLabelProps {
  label?: string
  value: any
  name: string
  changeFunction: Function
  type: string
  placeholder?: string
  labelClasses?: string
  inputClasses?: string
}

const InputWithLabel: FC<IInputWithLabelProps> = ({ label, name, type, value, placeholder, changeFunction, labelClasses, inputClasses }) => {
  return (
        <label className={labelClasses ?? 'flex flex-col w-full'}>
            { label !== undefined && <div className=" w-fit gradient-blue-secondary text-gray-primary text-sm px-4 py-2 leading-4 rounded-t-xl inline-block">{label}</div> }
            <input
             type={type}
             name={name}
             value={value}
             onChange={(e) => changeFunction(e.target.name, e.target.value)}
             placeholder={placeholder}
             className={inputClasses ?? ' py-3 px-4 bg-dark/25 rounded-xl rounded-tl-none'}
                />
        </label>

  )
}

export default InputWithLabel
