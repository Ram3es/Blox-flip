import { FC, useEffect, useRef, FormEvent, ChangeEvent } from 'react'

import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import { Button } from '../../components/base/Button'
import { DiamondIcon } from '../../components/DiamondIcon/DiamondIcon'

import SeparatorGrayIcon from '../../assets/img/separator_gray_h.svg'
import InputWithLabel from '../../components/base/InputWithLabel'

import { formatNumber } from '../../helpers/numbersFormatter'
import { WithdrawInputState } from '../../types/form'

interface WithdrawFormProps {
  methodName: string
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  values: WithdrawInputState
}

export const WithdrawForm: FC<WithdrawFormProps> = ({
  methodName = 'Input amount',
  onSubmit,
  onChange,
  values
}) => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleKeyPress = (event: KeyboardEvent) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault()
    }
  }

  useEffect(() => {
    const form = formRef.current

    if (form) {
      form.addEventListener('keypress', handleKeyPress)
    }

    return () => {
      if (form) {
        form.removeEventListener('keypress', handleKeyPress)
      }
    }
  }, [formRef])

  return (
    <>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        onKeyDown={(event) => event.key === 'Enter' && onSubmit(event)}
      >
        <div className='relative'>
          <InputWithLabel
            autoComplete='off'
            labelClasses='flex flex-col w-full mb-8 items-center'
            titleClasses='gradient-blue-secondary text-gray-primary text-sm px-4 py-3 leading-4 rounded-t-xl inline-block'
            inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
            inputClasses='grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none pl-8'
            type='text'
            id='amount'
            name='amount'
            label={methodName}
            value={
              values.amountNumber === 0 ? values.amountString : formatNumber(values.amountNumber)
            }
            onChange={onChange}
            placeholder='00.00'
          />
          <div className='w-6 h-6 text-center leading-6 shrink-0 bg-green-primary/20 rounded mr-2 text-green-primary absolute top-14 left-4'>
            <DiamondIcon className='-inset-full absolute m-auto' />
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='text-gray-primary mb-2 font-bold uppercase'>YOU ARE WITHdrawing</div>
          <div className='text-17 flex items-center mx-auto mb-7'>
            <QuantityCoins
              quantity={values.amountNumber}
              textSize='text-base'
              iconBgHeight='6'
              iconBgWidth='6'
              iconHeight='12'
              iconWidth='14'
            />
          </div>
          <div className='bg-gradient-to-r from-blue-highlight/0 via-blue-highlight to-blue-highlight/0 w-80 h-px mx-auto shrink-0 mb-7'></div>
          <Button
            type='submit'
            className='pointer-events-auto flex justify-center items-center leading-9 text-gray-primary text-base font-bold rounded px-2.5 py-1 bg-blue-highlight hover:bg-blue-accent w-64 shrink-0'
          >
            <span className='min-w-fit shrink-0 mr-1.5'>
              <DiamondIcon width='20' height='17' />
            </span>
            Withdraw
          </Button>
        </div>
      </form>
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
    </>
  )
}
