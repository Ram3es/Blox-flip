import React from 'react'
import InputWithLabel from '../base/InputWithLabel'
import Submit from './Submit'
import { useFormik } from 'formik'
import { signUpSchema } from './SignUpForm'
import { useAppStore } from '../../store/Store'
import { getToast } from '../../helpers/toast'
import { signIn } from '../../services/auth/auth'

const SignInFormNew = ({ onClose }: { onClose: Function }) => {
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
          const { data: { token } } = await signIn(values)
          dispatch({ type: 'CONNECT', payload: token })
          onClose()
        })
        .catch((errors) => {
          errors?.inner?.forEach((err: { message: string }) => getToast(err.message, 'error'))
        })
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
           />
        </>
  )
}

export default SignInFormNew
