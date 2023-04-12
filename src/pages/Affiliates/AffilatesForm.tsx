import { useEffect, useState } from 'react'
import useCopyToClipboard from '../../helpers/hooks/useCopyToClipboard'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import InputWithLabel from '../../components/base/InputWithLabel'
import { Button } from '../../components/base/Button'
import { CopyIcon } from '../../components/icons/CopyIcon'

const baseUrl = 'https://robloxsite.com/?a/'

export const AffiliatesForm = () => {
  const [referralCode, setReferralCode] = useState('182Affiliatehahawqrqw')
  const [referralLink, handleCopyReferralLinkCopy, setReferralLink] = useCopyToClipboard(
    `${baseUrl}${referralCode}`
  )

  useEffect(() => {
    setReferralLink(baseUrl + referralCode)
  }, [referralCode])

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
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit} className='flex flex-wrap -mx-2'>
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
              <Button className='w-7 shrink-0' onClick={handleCopyReferralLinkCopy} type='button'>
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
              value={props.values.referralCode}
              placeholder='...'
              onChange={props.handleChange}
            />
            <div className='absolute z-20 top-[52px] right-7'>
              <Button color='GreenPrimary' variant='Gradient' type='submit'>
                <p className='text-sm font-bold px-4 py-2.5'>Change</p>
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
