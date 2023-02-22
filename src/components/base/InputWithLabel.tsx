import { FC, InputHTMLAttributes } from 'react'

interface IInputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  labelClasses?: string
}

export const InputWithLabel: FC<IInputWithLabelProps> = ({ label, labelClasses, children, ...inputLabelProps }) => {
  return (
        <label className={labelClasses ?? 'flex flex-col w-full mb-8'}>
            { label !== undefined && <div className=" w-fit gradient-blue-secondary text-gray-primary text-sm px-4 py-2 leading-4 rounded-t-xl inline-block">{label}</div> }
            <div className="bg-dark/25 rounded-xl rounded-tl-none overflow-hidden">
                <div className="relative z-10 gradient-blue-secondary flex items-center py-2.5 pl-4 pr-3">
                  <input
                    type={inputLabelProps.type}
                    name={inputLabelProps.name}
                    value={inputLabelProps.value}
                    onChange={inputLabelProps.onChange}
                    placeholder={inputLabelProps.placeholder}
                    className="grow w-0 mr-2 h-10 bg-transparent bg-none border-none outline-none shadow-none"
                />
               </div>
            </div>
        </label>
  )
}
