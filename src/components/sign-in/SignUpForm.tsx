import React, { useState } from 'react'
import InputWithLabel from '../base/InputWithLabel'
import Submit from './Submit'
import { signUp } from '../../services/auth/auth'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getToast } from '../../helpers/toast'
import axios from 'axios'
import { encodeBase64 } from '../../helpers/decodeToken'
import { useAppStore } from '../../store/Store'

export const signUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid format of Email').required('Email mustn`t be empty'),
  password: Yup.string()
    .min(6, 'Password is too short - should be 6 chars minimum.'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must be matched')
})

const SignUpForm = ({ onClose }: { onClose: Function }) => {
  const [isShownToast, setShownToast] = useState<boolean>(false)

  const { dispatch } = useAppStore()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: ''
    },
    onSubmit: values => {
      void signUpSchema
        .validate(values, { abortEarly: false })
        .then(async () => {
          try {
            const { data } = await signUp(values)
            console.log(data)

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
        labelClasses = 'flex flex-col w-full mb-4'
        autoComplete='off'
      />
      <InputWithLabel
        type='text'
        name='password'
        label='Password'
        placeholder='...'
        value={formik.values.password}
        onChange={formik.handleChange}
        labelClasses = 'flex flex-col w-full mb-4'
        autoComplete='off'
      />
        <InputWithLabel
        type='text'
        name='confirm_password'
        label='Confirm Password'
        placeholder='...'
        value={formik.values.confirm_password}
        onChange={formik.handleChange}
        labelClasses = 'flex flex-col w-full mb-4'
        autoComplete='off'
      />
      <Submit
        submitFunction={formik.handleSubmit}
        titleBtn="Register"
        typeBtn='submit'
        disabled={isShownToast}
      />
  </>
  )
}

export default SignUpForm
