import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Button } from '../../components/base/Button'
import { WithdrawList } from './WithdrawList'
import { WithdrawForm } from './WithdrawForm'

import { ArrowGrayIcon } from '../../components/ArrowGrayIcon/ArrowGrayIcon'
import { DiamondIcon } from '../../components/DiamondIcon/DiamondIcon'
import MoneyIcon from '../../assets/img/deposit2_small.png'

export const Withdraw = () => {
  const navigate = useNavigate()

  const numberSchema = Yup.object().shape({
    amountNumber: Yup.number()
      .moreThan(99, 'Allowed to withdraw a minimum of 100 coins')
      .lessThan(100001, 'Allowed to withdraw a maximum of 100000 coins')
      .required('Enter the amount in order to withdraw it')
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
      <WithdrawList />
      <WithdrawForm methodName='Input robox amount' schema={numberSchema} />
      <WithdrawForm methodName='Input roblox amount' />
    </div>
  )
}
