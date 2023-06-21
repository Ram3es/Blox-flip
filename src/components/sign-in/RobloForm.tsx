import React, { ChangeEvent, useContext, useState } from 'react'
import InputWithLabel from '../base/InputWithLabel'
import Submit from './Submit'
import { robloxSecurityLogin } from '../../services/user.service'
import { Context } from '../../store/Store'
import { encodeBase64 } from '../../helpers/decodeToken'

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

const RobloSignIn = ({ submitFunction }: { submitFunction?: Function }) => {
  const { dispatch } = useContext(Context)
  const [inputValue, setInputValue] = useState('')

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onSubmit = async () => {
    if (!inputValue) return
    try {
      const { data } = await robloxSecurityLogin(`cookie=.ROBLOSECURITY%3D${encodeURI(inputValue)}`)
      const hash = encodeBase64(JSON.stringify(data))

      dispatch({ type: 'CONNECT', payload: hash })
      dispatch({ type: 'LOGIN', payload: { ...user, name: data.UserName } })
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
