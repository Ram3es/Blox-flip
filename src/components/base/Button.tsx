import React, { FC, ReactNode } from 'react'

interface IButtonProps {
  text: string
  submitFunction: Function
  buttonClasses?: string
  children?: ReactNode

}

const Button: FC<IButtonProps> = ({ text, submitFunction, buttonClasses, children }) => {
  return (
        <button
          className={buttonClasses ?? 'flex justify-center items-center py-2 px-4 text-gray-primary bg-blue-accent rounded cursor-pointer'}
          onClick={() => submitFunction()}
          >
            {text}
            {children}
        </button>
  )
}
export default Button
