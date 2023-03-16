import { FC } from 'react'
import { Input } from './Input/Input'

import BitcoinIconSmall from '../../assets/img/deposit_bitcoin_small.png'
import InputWithLabel from '../base/InputWithLabel'
import { DiamondIcon } from '../DiamondIcon/DiamondIcon'

const BridgeComponent = () => {
  return (
    <div className='hidden xl:block space-y-[2px]'>
      <div className='box-border h-[0.1875rem] w-2.5 bg-dark/25'>
        <div className='h-[0.1875rem] gradient-blue-secondary'></div>
      </div>
      <div className='box-border h-[0.1875rem] w-2.5 bg-dark/25'>
        <div className='h-[0.1875rem] gradient-blue-secondary'></div>
      </div>
    </div>
  )
}

export const CryptoCalculator: FC = () => {
  return (
    <div className='flex flex-wrap mb-5 z-20'>
      <div className='w-full xs:w-1/3 grow mb-4 relative'>
        <div className='bg-dark/25 rounded-xl mt-10'>
          <Input type='text' variant='FORM' value='1,500' placeholder='...' />
        </div>
        <div className='w-5 h-5 text-center leading-6 shrink-0 bg-green-primary/20 rounded mr-2 text-green-primary absolute top-[58px] left-4'>
          <DiamondIcon className='-inset-full absolute m-auto' />
        </div>
      </div>
      <div className='px-2.5 w-full xs:w-1/3 md:w-auto grow shrink-0 mb-4 relative '>
        <InputWithLabel
          type='text'
          label='Calculator'
          labelClasses='flex flex-col w-full mb-4 items-center'
          titleClasses='gradient-blue-secondary text-gray-primary rounded-t-xl py-2 text-center w-52 inline-block'
          inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
          inputClasses='overflow-ellipsis grow w-0 mr-2 bg-transparent bg-none border-none outline-none w-full shadow-none leading-5 ml-5 mr-28 truncate'
          placeholder='...'
          value='500.29'
        />
        <span className='min-w-fit shrink-0 absolute top-[44px] left-6 bg-none border-none outline-none shadow-none py-3 text-green-secondary font-extrabold mr-1.5'>
          $
        </span>
        <div className='absolute right-0 top-16'>
          <BridgeComponent />
        </div>
        <div className='absolute left-0 top-16'>
          <BridgeComponent />
        </div>
      </div>
      <div className='w-full xs:w-1/3 grow mb-4 relative'>
        <div className='bg-dark/25 rounded-xl mt-10'>
          <Input type='text' variant='FORM' value='0.1398582' placeholder='...' />
        </div>
        <span className='min-w-fit shrink-0 absolute left-4 top-[59px]'>
          <img
            src={BitcoinIconSmall}
            alt=''
            width='18'
            height='18'
            loading='lazy'
            decoding='async'
          />
        </span>
      </div>
    </div>
  )
}
