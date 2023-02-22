import React, { useState } from 'react'
import Button from '../base/Button'
import InputWithLabel from '../base/InputWithLabel'

interface IState {
  userName: string
  password: string
}

const SignInForm = ({ submitFunction }: { submitFunction: Function }) => {
  const [inputValue, setInputValue] = useState<IState>({ userName: '', password: '' })
  const [isChecked, setChecked] = useState({ policy: false })

  const onChange = (name: string, value: string) => {
    setInputValue(prev => ({ ...prev, [name]: value }))
  }
  const handleCheckBox = (name: string, isChecked: boolean) => {
    setChecked(prev => ({ ...prev, [name]: isChecked }))
  }

  return (
    <>
      <InputWithLabel
        type='text'
        name='userName'
        label='Username'
        placeholder="..."
        value={inputValue.userName}
        changeFunction={onChange}
      />
      <InputWithLabel
        type='text'
        name='password'
        label='Password'
        placeholder="..."
        value={inputValue.password}
        changeFunction={onChange}
      />
      <div className='flex justify-between items-center '>
        <div className='flex'>
          <InputWithLabel
            type='checkbox'
            value={isChecked.policy}
            name='policy'
            changeFunction={ handleCheckBox}
            labelClasses='flex flex-row-reverse items-center'
            label='By checking this box you agree to our'
            titleClasses='text-purple-terms ml-3'
          />
          <a href='https://sinoptik.ua' className='text-lightblue-secondary underline ml-1' target='_blank' rel='noreferrer'>Terms Of Service</a>
        </div>
        <Button
          text='Sign in'
          buttonClasses="flex items-center justify-center min-w-[110px] leading-9 text-sm font-bold rounded bg-green-primary hover:bg-green-highlight px-2.5"
          submitFunction={() => submitFunction(inputValue)}
        />
       </div>
    </>
  )
}

export default SignInForm
