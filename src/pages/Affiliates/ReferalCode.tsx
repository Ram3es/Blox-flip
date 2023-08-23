import React, { useState } from 'react'
import { Button } from '../../components/base/Button'
import InputWithLabel from '../../components/base/InputWithLabel'

const ReferalCode = () => {
  const [code, setCode] = useState('')
  return (
    <div className='relative px-2 w-full xs:w-2/3 sm:w-1/2  grow shrink-0 mb-4 mx-auto'>
      <InputWithLabel
        type='text'
        autoComplete='off'
        label='Use referral code'
        labelClasses='flex flex-col w-full mb-4 items-center'
        titleClasses='gradient-blue-secondary text-gray-primary rounded-t-xl py-2 px-5 inline-block'
        inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
        inputClasses='overflow-ellipsis grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none leading-5 py-4 mr-28 truncate'
        value={code}
        placeholder='...'
        onChange={(e) => setCode(e.target.value)}
    />
    <div className='absolute z-20 top-[52px] right-7'>
      <Button onClick={() => console.log(code)} color='GreenPrimary' variant='GreenGradient'>
        <p className='text-sm font-bold px-4 py-2.5'>Use Code</p>
      </Button>
    </div>
  </div>
  )
}

export default ReferalCode
