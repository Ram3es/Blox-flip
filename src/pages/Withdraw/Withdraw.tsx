import { ChangeEvent, FormEvent, useState, useCallback } from 'react'

import { useNavigate } from 'react-router-dom'

import { localeStringToNumber } from '../../helpers/numbersFormatter'
import { defaultAmountSchema } from '../../helpers/yupSchema'

import { WithdrawInputState } from '../../types/form'

import { Button } from '../../components/base/Button'
import { WithdrawList } from './WithdrawList'
import { WithdrawForm } from './WithdrawForm'

import { ArrowGrayIcon } from '../../components/ArrowGrayIcon/ArrowGrayIcon'
import { DiamondIcon } from '../../components/DiamondIcon/DiamondIcon'
import MoneyIcon from '../../assets/img/deposit2_small.png'

export const Withdraw = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState<WithdrawInputState>({ amountString: '', amountNumber: 0 })

  const handleAmountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setValues({ amountString: value, amountNumber: Number(localeStringToNumber(value, 'en-US')) })
    },
    [values]
  )

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      defaultAmountSchema('amountNumber')
        .validate(values, { abortEarly: false })
        .then(() => {
          console.log('Validation successful')
          setValues({ amountString: '', amountNumber: 0 })
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    [values]
  )

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
      <WithdrawList />
      <WithdrawForm
        methodName='Input robox amount'
        onSubmit={handleFormSubmit}
        onChange={handleAmountChange}
        values={values}
      />
    </div>
  )
}
