import { useEffect, useState } from 'react'
import { useCopyToClipboard } from '../../helpers/hooks/useCopyToClipboard'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import InputWithLabel from '../../components/base/InputWithLabel'
import { Button } from '../../components/base/Button'
import { CopyIcon } from '../../components/icons/CopyIcon'
import { useSocketCtx } from '../../store/SocketStore'
import { getToast } from '../../helpers/toast'

const baseUrl = import.meta.env.VITE_BASE_REFFERAL_URL as string || 'https://robloxsite.com/?a/'

export const AffiliatesForm = ({ referalCode }: { referalCode?: string }) => {
  // !!!Need to change useState to useFormik, and give up referralCode code state, to use only props
  const [referralCode, setReferralCode] = useState<string>('')
  const {
    handleCopyText: handleCopyReferralLink,
    setText: setReferralLink,
    renderText: referralLink
  } = useCopyToClipboard()

  const { socket } = useSocketCtx()

  const changeCode = (code: string) => {
    console.log(code)
    socket.emit('change_aff', { code }, (err: string | boolean) => {
      if (typeof err === 'string') {
        return getToast(err)
      }
      setReferralLink(baseUrl + code)
    })
  }

  useEffect(() => {
    if (referalCode) {
      setReferralLink(baseUrl + referalCode)
      setReferralCode(referalCode)
    }
  }, [referalCode])

  const referralCodeSchema = Yup.object().shape({
    referralCode: Yup.string()
      .notOneOf([referralCode])
      .matches(/^[a-zA-Z0-9]*$/, {
        message: 'Only letters and digits are allowed'
      })
      .min(5, 'Referral code length must be at least 5')
      .max(50, 'Referral code length code must be no more than 50')
      .transform((value) => {
        return value.replace(/[^a-zA-Z0-9]/g, '')
      })
      .required('Required')
  })

  return (
    <Formik
      initialValues={{ referralCode }}
      validationSchema={referralCodeSchema}
      onSubmit={(values) => {
        setReferralCode(values.referralCode)
        changeCode(values.referralCode)
      }}
      enableReinitialize

    >
      {({ handleSubmit, handleChange, values }) => (
        <Form onSubmit={handleSubmit} className='flex flex-wrap -mx-2'>
          <div className='relative px-2 w-full xs:w-1/2 md:w-auto grow shrink-0 mb-4'>
            <InputWithLabel
              type='text'
              name='affiliate'
              label='Your referral link'
              labelClasses='flex flex-col w-full mb-4 items-center'
              titleClasses='gradient-blue-secondary text-gray-primary rounded-t-xl py-2 px-5 inline-block'
              inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
              inputClasses='overflow-ellipsis grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none leading-5 py-4 mr-12 truncate'
              value={referralLink}
              placeholder='...'
              readOnly
            />
            <div className='absolute z-20 top-[60px] right-7'>
              <Button className='w-7 shrink-0' onClick={handleCopyReferralLink} type='button'>
                <CopyIcon />
              </Button>
            </div>
          </div>
          <div className='relative px-2 w-full xs:w-1/2 md:w-auto grow shrink-0 mb-4'>
            <InputWithLabel
              type='text'
              id='referralCode'
              name='referralCode'
              autoComplete='off'
              label='Your referral code'
              labelClasses='flex flex-col w-full mb-4 items-center'
              titleClasses='gradient-blue-secondary text-gray-primary rounded-t-xl py-2 px-5 inline-block'
              inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
              inputClasses='overflow-ellipsis grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none leading-5 py-4 mr-28 truncate'
              value={values.referralCode}
              placeholder='...'
              onChange={handleChange}
            />
            <div className='absolute z-20 top-[52px] right-7'>
              <Button color='GreenPrimary' variant='GreenGradient' type='submit'>
                <p className='text-sm font-bold px-4 py-2.5'>Change</p>
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
