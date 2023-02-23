import React, { useState } from 'react'
import InputWithLabel from '../base/InputWithLabel'
import Submit from './Submit'

interface IState {
  userName: string
  password: string
}

const SignInForm = ({ submitFunction }: { submitFunction?: Function }) => {
  const [inputValue, setInputValue] = useState<IState>({ userName: '', password: '' })

  const onChange = (name: string, value: string) => {
    setInputValue(prev => ({ ...prev, [name]: value }))
  }
  const onSubmit = () => {
    console.log(inputValue)
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
      <Submit submitFunction={onSubmit} />
    </>
  )
}

export default SignInForm
