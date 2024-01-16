import React, { ChangeEvent, useContext, useState } from 'react'
import InputWithLabel from '../base/InputWithLabel'
import Submit from './Submit'
import { cookieLogin } from '../../services/auth/auth'
import { Context } from '../../store/Store'
import { encodeBase64 } from '../../helpers/decodeToken'
import { getToast } from '../../helpers/toast'
import axios from 'axios'

const RobloSignIn = ({ submitFunction, onClose }: { submitFunction?: Function, onClose: Function }) => {
  const { dispatch } = useContext(Context)
  const [robloSecurity, setInputValue] = useState('')

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onSubmit = async () => {
    if (!robloSecurity) return getToast('Empty field isn`t allowed', 'error')
    try {
      // const { data } = await robloxSecurityLogin(`cookie=.ROBLOSECURITY%3D${encodeURI(inputValue)}`)
      const { data } = await cookieLogin({ robloSecurity })
      if (!data.UserID) {
        return getToast('Something went wrong', 'error')
      }
      const hash = encodeBase64(JSON.stringify(data))
      dispatch({ type: 'CONNECT', payload: hash })
      localStorage.setItem('token', hash)
      onClose()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return getToast(error.message, 'error')
      }
      console.log(error)
    }
  }
  return (
    <>
      <div className='min-h-[278px]'>
        <InputWithLabel
          type='text'
          label='.Roblosecurity'
          value={robloSecurity}
          placeholder="..."
          onChange={onChange}
        />
        <Submit submitFunction={onSubmit} />
      </div>
    </>

  )
}
export default RobloSignIn
