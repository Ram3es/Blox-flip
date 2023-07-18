import React, { ChangeEvent, useContext, useState } from 'react'
import InputWithLabel from '../base/InputWithLabel'
import Submit from './Submit'
import { robloxSecurityLogin } from '../../services/auth/auth'
import { Context } from '../../store/Store'
import { encodeBase64 } from '../../helpers/decodeToken'

const RobloSignIn = ({ submitFunction, onClose }: { submitFunction?: Function, onClose: Function }) => {
  const { dispatch } = useContext(Context)
  const [inputValue, setInputValue] = useState('')

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onSubmit = async () => {
    if (!inputValue) return
    try {
      const { data } = await robloxSecurityLogin(`cookie=.ROBLOSECURITY%3D${encodeURI(inputValue)}`)
      if (!data.UserID) {
        alert('wrong data')
        return
      }
      const hash = encodeBase64(JSON.stringify(data))
      dispatch({ type: 'CONNECT', payload: hash })
      localStorage.setItem('token', hash)
      onClose()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className='min-h-[278px]'>
        <InputWithLabel
          type='text'
          label='.Roblosecurity'
          value={inputValue}
          placeholder="..."
          onChange={onChange}
        />
        <Submit submitFunction={onSubmit} />
      </div>

    </>

  )
}
export default RobloSignIn
