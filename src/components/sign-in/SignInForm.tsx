import React, { ChangeEvent, useState } from 'react'
import InputWithLabel from '../base/InputWithLabel'
import Submit from './Submit'

interface IState {
  userName: string
  password: string
}

const SignInForm = ({ submitFunction }: { submitFunction?: Function }) => {
  const [inputValue, setInputValue] = useState<IState>({ userName: '', password: '' })

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
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
        onChange={onChange}
      />
      <InputWithLabel
        type='text'
        name='password'
        label='Password'
        placeholder="..."
        value={inputValue.password}
        onChange={onChange}
      />
      <Submit submitFunction={onSubmit} />
    </>
  )
}

export default SignInForm
