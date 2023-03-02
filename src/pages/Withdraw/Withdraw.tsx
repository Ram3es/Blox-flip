import { useNavigate } from 'react-router-dom'
import { ArrowGrayIcon } from '../../components/ArrowGrayIcon/ArrowGrayIcon'
import { Button } from '../../components/base/Button'
import { DiamondIcon } from '../../components/DiamondIcon/DiamondIcon'
import MoneyIcon from '../../assets/img/deposit2_small.png'
import SeparatorGrayIcon from '../../assets/img/separator_gray_h.svg'
import InputWithLabel from '../../components/base/InputWithLabel'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import { Formik, Field, ErrorMessage, FormikValues, useFormik } from 'formik'
import * as Yup from 'yup'

interface FormValues {
  amount: number
}

export const Withdraw = () => {
  const navigate = useNavigate()
  const handleSubmit = (values: FormikValues, { resetForm }: { resetForm: any }) => {
    const x = 100 // replace with actual value
    if (values.number <= 0 || values.number.toString().charAt(0) === '0' || values.number > x) {
      console.log('Form is poorly filled out')
    } else {
      console.log('Form submitted successfully')
      resetForm()
    }
  }
  const validationSchema = Yup.object().shape({
    number: Yup.number()
      .positive('Number must be positive')
      .integer('Number must be an integer')
      .test('startsWithZero', 'Number cannot start with zero', (value) => {
        return value !== undefined && value.toString().charAt(0) !== '0'
      })
  })
  const initialValues: FormValues = { amount: 0 }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  })

  return (
    <div className='max-w-1190 w-full mx-auto'>
      <div className='flex flex-wrap items-center justify-between mb-4'>
        <Button
          onClick={() => navigate(-1)}
          className='rounded p-2 leading-4 text-gray-primary font-semibold flex items-center bg-blue-accent-secondary hover:bg-blue-accent hover:text-white mb-4 mr-6'
        >
          <span className='mr-1.5 rotate-90 text-gray-primary hover:text-white'>
            <ArrowGrayIcon size='MEDIUM' />
          </span>
          Back
        </Button>
        <div className='flex grow items-center mb-4'>
          <div className='min-w-fit mr-3'>
            <span className='text-green-primary'>
              <DiamondIcon size='XXL' />
            </span>
          </div>
          <span className='text-2xl font-bold'>Withdraw</span>
        </div>
        <div className='flex flex-wrap xxs:flex-nowrap items-center xs:text-base mb-4'>
          <span className='mr-3 font-semibold'>You have selected</span>
          <span className='bg-blue-accent-secondary text-gray-primary font-semibold py-1 px-3 rounded flex items-center'>
            <span className='min-w-fit mr-2'>
              <img src={MoneyIcon} alt='' width='31' height='19' loading='lazy' decoding='async' />
            </span>
            Robux
          </span>
        </div>
      </div>
      <div className='border-t border-b border-t-sky-primary/40 border-b-sky-primary/40 rounded mb-9'>
        <div className='border--mask border--radial-blue bg-gradient-radial from-blue-light-secondary/20 to-blue-accent-secondary/0 rounded text-sm px-3 xxs:px-6 py-9 overflow-hidden relative'>
          <form onSubmit={formik.handleSubmit}>
            <div className='relative z-20'>
              <div>
                <InputWithLabel
                  labelClasses='flex flex-col w-full mb-8 items-center'
                  titleClasses='gradient-blue-secondary text-gray-primary text-sm px-4 py-3 leading-4 rounded-t-xl inline-block'
                  inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
                  type='number'
                  id='amount'
                  name='amount'
                  label='Input robux amount'
                  value={formik.values.amount}
                  onChange={(e: any) => {
                    let value = parseInt(e.target.value)
                    if (isNaN(value)) {
                      value = 0
                    } else if (value.toString().charAt(0) === '0') {
                      value = parseInt(value.toString().substring(1))
                    }
                    formik.setFieldValue('amount', value)
                  }}
                  onBlur={formik.handleBlur}
                  placeholder='00.00'
                />
                {formik.touched.amount && formik.errors.amount
                  ? (<div>{formik.errors.amount}</div>)
                  : null}
              </div>
              <div className='flex flex-col items-center'>
                <div className='text-gray-primary mb-2 font-bold uppercase'>
                  YOU ARE WITHdrawing
                </div>
                <div className='text-17 flex items-center mx-auto mb-7'>
                  <QuantityCoins
                    quantity={formik.values.amount ?? 0}
                    textSize='text-base'
                    iconHeight='6'
                    iconWidth='6'
                  />
                </div>
                <div className='bg-gradient-to-r from-blue-highlight/0 via-blue-highlight to-blue-highlight/0 w-80 h-px mx-auto shrink-0 mb-7'></div>
                <Button
                  type='submit'
                  className='flex justify-center items-center leading-9 text-gray-primary text-base font-bold rounded px-2.5 py-1 bg-blue-highlight hover:bg-blue-accent w-64 shrink-0'
                >
                  <span className='min-w-fit shrink-0 mr-1.5'>
                    <DiamondIcon size='XL' />
                  </span>
                  Withdraw
                </Button>
              </div>
              <img
                src={SeparatorGrayIcon}
                alt=''
                width='300'
                height=''
                loading='lazy'
                decoding='async'
                className='mx-auto my-7'
              />
              <div className='font-semibold text-center text-gray-primary mx-auto'>
                Roblox imposes a 30% fee on every transaction. We do not have any way to stop it,{' '}
                <br className='hidden xs:inline' /> and will not receive any of this fee.
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
