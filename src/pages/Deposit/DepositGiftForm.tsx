import { FC, FormEvent, ChangeEvent } from 'react'

import { Button } from '../../components/base/Button'
import InputWithLabel from '../../components/base/InputWithLabel'
import { DiamondIcon } from '../../components/DiamondIcon/DiamondIcon'

interface DepositGiftFormProps {
  labelName: string
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value: string
}

export const DepositGiftForm: FC<DepositGiftFormProps> = ({
  labelName,
  onSubmit,
  onChange,
  value
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className='relative'>
        <InputWithLabel
          autoComplete='off'
          labelClasses='flex flex-col w-full mb-8 items-center'
          titleClasses='gradient-blue-secondary text-gray-primary text-sm px-10 py-3 leading-4 rounded-t-xl inline-block'
          inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
          inputClasses='grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none'
          type='text'
          label={labelName}
          value={value}
          onChange={onChange}
          placeholder='XXXX-XXXX-XXXX-XXXX-XXXX'
        />
      </div>
      <div className='flex flex-col items-center'>
        <Button type='submit' variant='Gradient' color='GreenPrimary'>
          <div className='flex items-center justify-center px-24 py-3 text-15'>
            <span className='min-w-fit shrink-0 mr-1.5'>
              <DiamondIcon width='20' height='17' />
            </span>
            Redeem
          </div>
        </Button>
      </div>
    </form>
  )
}
