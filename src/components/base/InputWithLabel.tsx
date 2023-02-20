import React, { FC, ReactNode } from 'react'

interface IInputWithLabelProps {
  label?: string
  value: any
  name: string
  changeFunction: Function
  type: string
  placeholder?: string
  labelClasses?: string
  children?: ReactNode
}

const InputWithLabel: FC<IInputWithLabelProps> = ({ label, name, type, value, placeholder, changeFunction, labelClasses, children }) => {
  return (
        <label className={labelClasses ?? 'flex flex-col w-full mb-8'}>
            { label !== undefined && <div className=" w-fit gradient-blue-secondary text-gray-primary text-sm px-4 py-2 leading-4 rounded-t-xl inline-block">{label}</div> }
            <div className="bg-dark/25 rounded-xl rounded-tl-none overflow-hidden">
                <div className="relative z-10 gradient-blue-secondary flex items-center py-2.5 pl-4 pr-3">
                  <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={(e) => changeFunction(e.target.name, e.target.value)}
                    placeholder={placeholder}
                    className="grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none"
                />
                  {children}
               </div>
            </div>
        </label>

  )
}

export default InputWithLabel
