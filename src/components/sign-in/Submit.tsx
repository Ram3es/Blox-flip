import { ChangeEvent, useState } from 'react'
import InputWithLabel from '../base/InputWithLabel'
import { Button } from '../base/Button'
import clsx from 'clsx'

const Submit = ({ submitFunction, titleBtn, typeBtn = 'submit', disabled }: { submitFunction: Function, disabled?: boolean, titleBtn?: string, typeBtn?: 'button' | 'submit' | 'reset' }) => {
  const [isChecked, setChecked] = useState({ policy: false })

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    setChecked((prev) => ({ ...prev, [name]: checked }))
  }
  return (
    <div className='flex justify-between items-center '>
      <div className='flex'>
        <InputWithLabel
          type='checkbox'
          checked={isChecked.policy}
          name='policy'
          onChange={handleCheckBox}
          labelClasses='flex flex-row-reverse items-center'
          label='By checking this box you agree to our'
          titleClasses='text-purple-terms ml-3'
        />
        <a
          href='https://sinoptik.ua'
          className='text-lightblue-secondary underline ml-1'
          target='_blank'
          rel='noreferrer'
        >
          Terms Of Service
        </a>
      </div>
      <Button
        className={clsx('flex items-center justify-center min-w-[110px] leading-9 text-sm font-bold rounded bg-green-primary hover:bg-green-highlight px-2.5', {
          'pointer-events-none grayscale': !isChecked.policy
        })}
        onClick={() => submitFunction()}
        type={typeBtn}
        disabled={disabled}
      >
        {titleBtn ?? 'Sign in'}
      </Button>
    </div>
  )
}

export default Submit
