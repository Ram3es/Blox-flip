import React, { ChangeEvent, useState, useContext } from 'react'
import { Context } from '../../store/Store'
import InputWithLabel from '../base/InputWithLabel'
import Submit from './Submit'

interface IState {
  userName: string
  password: string
}

const user = {
  id: 'aass2b44b123ghg346',
  name: 'John Johnson',
  avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/563.jpg',
  level: 11,
  progress: {
    current: 50,
    required: 165
  }
}

const SignInForm = ({ onClose }: { onClose: Function }) => {
  const [inputValue, setInputValue] = useState<IState>({ userName: '', password: '' })
  const { dispatch } = useContext(Context)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInputValue((prev) => ({ ...prev, [name]: value }))
  }
  const onSubmit = () => {
    dispatch({ type: 'LOGIN', payload: { ...user, name: inputValue.userName || 'John Johnson' } })
    onClose()
  }
  return (
    <>
      <InputWithLabel
        type='text'
        name='userName'
        label='Username'
        placeholder='...'
        value={inputValue.userName}
        onChange={onChange}
      />
      <InputWithLabel
        type='text'
        name='password'
        label='Password'
        placeholder='...'
        value={inputValue.password}
        onChange={onChange}
      />
      <Submit submitFunction={onSubmit} />
    </>
  )
}

export default SignInForm
