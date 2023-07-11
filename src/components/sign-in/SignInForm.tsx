import React, { ChangeEvent, useState, useContext, useCallback } from 'react'
import { Context } from '../../store/Store'
import InputWithLabel from '../base/InputWithLabel'
import Submit from './Submit'
import { login, twoStepVerification } from '../../services/auth/auth'
import { decodeBase64 } from '../../helpers/decodeToken'
import AuthCodeModal from '../containers/AuthCode'

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
  const [isOpenTwoFactorModal, setIsOpenTwoFactorModal] = useState(false)
  const [robloxData, setRobloxData] = useState<ILoginData>()
  const [inputValue, setInputValue] = useState<IState>({ userName: '', password: '' })
  const { dispatch } = useContext(Context)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInputValue((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async () => {
    try {
      const { data } = await login(`username=${inputValue.userName}&password=${encodeURIComponent(inputValue.password)}`)

      if (!data.success && data.twoStepVerificationRequired && data.twoStepVerificationTicket && data.user) {
        setRobloxData(data)
        setIsOpenTwoFactorModal(true)
      }

      if (data.success) {
        const hash = decodeBase64(data.data)
        const userObject = JSON.parse(hash)

        dispatch({ type: 'CONNECT', payload: hash })
        dispatch({ type: 'LOGIN', payload: { ...user, name: userObject.name || 'John Johnson' } })
      }
    } catch (error) {
      console.log(error)
    }

    // onClose()
  }

  const loginTwoStep = useCallback(async (code: string) => {
    if (robloxData?.twoStepVerificationTicket && robloxData.user?.id) {
      try {
        const { data } = await twoStepVerification(`ticket=${robloxData.twoStepVerificationTicket}&code=${code}&userId=${robloxData.user.id}`)
        if (data.success && data.data) {
          const hash = decodeBase64(data.data)

          dispatch({ type: 'CONNECT', payload: hash })
          dispatch({ type: 'LOGIN', payload: { ...user, name: inputValue.userName || 'John Johnson' } })
        }
      } catch (error) {
        alert(error)
      }
    }
  }, [robloxData])

  const handleSubmitTwoFactorModal = (code: string) => {
    void loginTwoStep(code)
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
      { isOpenTwoFactorModal &&
          <AuthCodeModal
            onClose={() => setIsOpenTwoFactorModal(false) }
            onSubmit={(code: string) => handleSubmitTwoFactorModal(code)}
          /> }
    </>
  )
}

export default SignInForm
