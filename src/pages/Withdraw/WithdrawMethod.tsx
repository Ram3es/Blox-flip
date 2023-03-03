import { Button } from '../../components/base/Button'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import { DiamondIcon } from '../../components/DiamondIcon/DiamondIcon'
import SeparatorGrayIcon from '../../assets/img/separator_gray_h.svg'
import { Field, Form, Formik } from 'formik'
import InputWithLabel from '../../components/base/InputWithLabel'
import * as Yup from 'yup'

interface AmountFormValue {
  amount: number | ''
}

export const WithdrawForm = () => {
  const initialValue: AmountFormValue = { amount: '' }

  const amountSchema = Yup.object().shape({
    amount: Yup.number()
      .moreThan(99, 'Allowed to withdraw a minimum of 100 coins')
      .lessThan(100001, 'Allowed to withdraw a maximum of 100000 coins')
      .required('Enter the amount in order to withdraw it')
  })

  return (
    <div className='border-t border-b border-t-sky-primary/40 border-b-sky-primary/40 rounded mb-9'>
      <div className='border--mask border--radial-blue bg-gradient-radial from-blue-light-secondary/20 to-blue-accent-secondary/0 rounded text-sm px-3 xxs:px-6 py-9 overflow-hidden relative'>
        <div className='relative z-20'>
          <Formik
            initialValues={initialValue}
            validationSchema={amountSchema}
            onSubmit={(values, { resetForm }) => {
              console.log('submit')
              resetForm()
            }}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <div>
                  <Field
                    as={InputWithLabel}
                    labelClasses='flex flex-col w-full mb-8 items-center'
                    titleClasses='gradient-blue-secondary text-gray-primary text-sm px-4 py-3 leading-4 rounded-t-xl inline-block'
                    inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
                    inputClasses='grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none pl-8'
                    type='number'
                    id='amount'
                    name='amount'
                    label='Input robux amount'
                    value={values.amount}
                    onChange={handleChange}
                    placeholder='00.00'
                  />
                  <div className='w-6 h-6 text-center leading-6 shrink-0 bg-green-primary/20 rounded mr-2 text-green-primary absolute top-14 left-4'>
                    <DiamondIcon size='LARGE' className='-inset-full absolute m-auto' />
                  </div>
                  {errors.amount && touched.amount && <div>{errors.amount}</div>}
                </div>
                <div className='flex flex-col items-center'>
                  <div className='text-gray-primary mb-2 font-bold uppercase'>
                    YOU ARE WITHdrawing
                  </div>
                  <div className='text-17 flex items-center mx-auto mb-7'>
                    <QuantityCoins
                      quantity={typeof values.amount === 'string' ? 0 : values.amount}
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
              </Form>
            )}
          </Formik>
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
      </div>
    </div>
  )
}
