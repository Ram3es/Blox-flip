import InputWithLabel from '../base/InputWithLabel'
import Submit from './Submit'
import { signUp } from '../../services/auth/auth'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getToast } from '../../helpers/toast'
import { useAppStore } from '../../store/Store'

export const signUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid format of Email').required('Email mustn`t be empty'),
  password: Yup.string()
    .min(6, 'Password is too short - should be 6 chars minimum.'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must be matched')
})

const SignUpForm = ({ onClose }: { onClose: Function }) => {
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
          const { data: { token } } = await signUp(values)
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
      <div className='mb-8'>
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
      </div>
      <Submit
        submitFunction={formik.handleSubmit}
        titleBtn="Register"
        typeBtn='submit'
      />
  </>
  )
}

export default SignUpForm
