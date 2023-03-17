import { FC, useState } from 'react'
import { CopyIconSecond } from '../../components/icons/CopyIconSecond'
import BitcoinIconSmall from '../../assets/img/deposit_bitcoin_small.png'
import QRCodePlaceHolder from '../../assets/img/qr-kod.png'
import { CryptoCalculator } from '../../components/common/CryptoCalculator'
import { Button } from '../../components/Base/Button'
import InputWithLabel from '../../components/Base/InputWithLabel'

export const DepositCrypto: FC = () => {
  const [sendAmount, setSendAmount] = useState(100)

  return (
    <div className='border-t border-b border-t-sky-primary/40 border-b-sky-primary/40 rounded mb-9'>
      <div className='border--mask border--radial-blue  bg-gradient-radial from-blue-light-secondary/20 to-blue-accent-secondary/0 rounded text-sm px-3 xxs:px-6 py-9 overflow-hidden relative'>
        <div className='relative z-20 text-base'>
          <div className='flex flex-wrap -mx-2 mb-5'>
            <div className='relative px-2 w-full xs:w-1/2 md:w-auto grow shrink-0 mb-4'>
              <InputWithLabel
                type='text'
                name='affiliate'
                label='Bitcoin Address'
                labelClasses='flex flex-col w-full mb-4 items-center'
                titleClasses='gradient-blue-secondary text-gray-primary rounded-t-xl py-2 px-5 w-52 text-center inline-block'
                inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
                inputClasses='overflow-ellipsis grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none leading-5 py-2 mr-12 truncate'
                placeholder='...'
                readOnly
                value='0x351af6d2387a0b2cf9af41sSDFw43585d2ce2a25'
              />
              <div className='absolute z-20 top-[60px] right-4'>
                <Button className='w-7 shrink-0' type='button'>
                  <CopyIconSecond />
                </Button>
              </div>
            </div>
            <div className='relative px-2 xs:w-1/2 md:w-auto grow shrink-0 mb-4'>
              <InputWithLabel
                type='number'
                autoComplete='off'
                label='Send Amount'
                labelClasses='flex flex-col w-full mb-4 items-center'
                titleClasses='gradient-blue-secondary text-gray-primary rounded-t-xl py-2 text-center w-52 inline-block'
                inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
                inputSecondWrapperClasses='relative z-10 gradient-blue-secondary flex items-center min-h-[57px] py-2.5 pl-10 pr-3'
                inputClasses='grow bg-transparent bg-dark/25 border-none outline-none leading-5 mr-28 truncate'
                placeholder='...'
                value={sendAmount}
                onChange={(event) => setSendAmount(Number(event.target.value))}
              />
              <span className='min-w-fit shrink-0 absolute top-[59px] left-6'>
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
          <CryptoCalculator />
          <div className='flex flex-wrap xs:flex-nowrap justify-center xs:justify-start items-center'>
            <div className='min-w-fit shrink-0 w-28 mx-3 mb-6 xs:mb-0'>
              <img
                src={QRCodePlaceHolder}
                alt=''
                width='115'
                height='115'
                loading='lazy'
                decoding='async'
              />
            </div>
            <span className='text-gray-primary text-center grow lg:pr-36'>
              Send only Bitcoin to the address above, or QR code to the left. Do not send any other
              crypto currency. <br />6 confirmations are required before you are credited to your
              balance.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
