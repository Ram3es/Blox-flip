import { useState } from 'react'
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

export const CryptoCalculator = () => {
  const [rates] = useState({
    coin: 1000,
    bitcoin: 10,
    usd: 100
  })

  const [amounts, setAmounts] = useState({
    coin: 1000,
    bitcoin: 10,
    usd: 100
  })

  const handleChange = (fieldName: string, value: number): void => {
    let newCoinAmount, newUsdAmount, newBtcAmount

    switch (fieldName) {
      case 'coin':
        newCoinAmount = value
        newUsdAmount = value * (rates.usd / rates.coin)
        newBtcAmount = value * (rates.bitcoin / rates.coin)
        break
      case 'usd':
        newCoinAmount = value * (rates.coin / rates.usd)
        newUsdAmount = value
        newBtcAmount = value * (rates.bitcoin / rates.usd)
        break
      case 'bitcoin':
        newCoinAmount = value * (rates.coin / rates.bitcoin)
        newUsdAmount = value * (rates.usd / rates.bitcoin)
        newBtcAmount = value
        break
      default:
        newCoinAmount = amounts.coin
        newUsdAmount = amounts.usd
        newBtcAmount = amounts.bitcoin
    }

    setAmounts({
      coin: Number(newCoinAmount.toFixed(2)),
      usd: Number(newUsdAmount.toFixed(2)),
      bitcoin: Number(newBtcAmount.toFixed(2))
    })
  }

  return (
    <div className='flex flex-wrap mb-5 z-20'>
      <div className='w-full xs:w-1/3 grow mb-4 relative'>
        <div className='bg-dark/25 rounded-xl mt-10'>
          <Input
            type='number'
            variant='FORM'
            placeholder='...'
            value={amounts.coin}
            onChange={(e) => handleChange('coin', Number(e.target.value))}
          />
        </div>
        <div className='w-5 h-5 text-center leading-6 shrink-0 bg-green-primary/20 rounded mr-2 text-green-primary absolute top-[58px] left-4'>
          <DiamondIcon className='-inset-full absolute m-auto' />
        </div>
      </div>
      <div className='px-2.5 w-full xs:w-1/3 md:w-auto grow shrink-0 mb-4 relative'>
        <InputWithLabel
          type='number'
          label='Calculator'
          labelClasses='flex flex-col w-full mb-4 items-center'
          titleClasses='gradient-blue-secondary text-gray-primary rounded-t-xl py-2 text-center w-52 inline-block'
          inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
          inputSecondWrapperClasses='relative z-10 gradient-blue-secondary flex items-center min-h-[57px] py-2.5 pl-8'
          inputClasses='overflow-ellipsis grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none leading-5 truncate'
          placeholder='...'
          value={amounts.usd}
          onChange={(e) => handleChange('usd', Number(e.target.value))}
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
          <Input
            type='number'
            variant='FORM'
            placeholder='...'
            value={amounts.bitcoin}
            onChange={(e) => handleChange('bitcoin', Number(e.target.value))}
          />
        </div>
        <span className='min-w-fit shrink-0 absolute left-4 top-[59px]'>
          <img
            src={BitcoinIconSmall}
            alt='bitcoin'
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
