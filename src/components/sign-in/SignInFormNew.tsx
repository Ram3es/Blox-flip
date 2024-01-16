import React, { useState } from 'react'
import InputWithLabel from '../base/InputWithLabel'
import Submit from './Submit'
import { useFormik } from 'formik'
import { signUpSchema } from './SignUpForm'
import { useAppStore } from '../../store/Store'
import axios from 'axios'
import { getToast } from '../../helpers/toast'
import { signIn } from '../../services/auth/auth'

const SignInFormNew = ({ onClose }: { onClose: Function }) => {
  const [isShownToast, setShownToast] = useState<boolean>(false)
  const { dispatch } = useAppStore()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      void signUpSchema
        .validate(values, { abortEarly: false })
        .then(async () => {
          try {
            const { data: { token } } = await signIn(values)
            dispatch({ type: 'CONNECT', payload: token })
            localStorage.setItem('token', token)
            onClose()
          } catch (error) {
            if (axios.isAxiosError(error)) {
              return getToast(error.message, 'error')
            }
            console.log(error)
          }
        })
        .catch((errors) => {
          const messages = errors.inner.map((err: { message: string }) => err.message) as string[]
          setShownToast(true)
          messages.forEach(msg => {
            getToast(msg, 'error')
          })
          setTimeout(() => setShownToast(false), 3500)
        })
      console.log(values)
    }
  })
  return (
        <>
          <InputWithLabel
            type='text'
            name='email'
            label='Email'
            placeholder='...'
            value={formik.values.email}
            onChange={formik.handleChange}
            autoComplete='off'
          />
          <InputWithLabel
            type='text'
            name='password'
            label='Password'
            placeholder='...'
            value={formik.values.password}
            onChange={formik.handleChange}
            autoComplete='off'
          />
          <Submit
            submitFunction={formik.handleSubmit}
            disabled={isShownToast}
           />
        </>
  )
}

export default SignInFormNew
