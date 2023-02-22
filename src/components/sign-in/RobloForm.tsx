import React, { useState } from 'react'
import Button from '../base/Button'
import InputWithLabel from '../base/InputWithLabel'

const RobloSignIn = ({ submitFunction }: { submitFunction: Function }) => {
  const [value, setValue] = useState({ code: '' })
  const [isChecked, setChecked] = useState({ policy: false })

  const onChange = (name: string, value: string) => {
    setValue(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckBox = (name: string, isChecked: boolean) => {
    setChecked(prev => ({ ...prev, [name]: isChecked }))
  }
  return (
    <>
      <div className='min-h-[264px]'>
        <InputWithLabel
          type='text'
          name='code'
          label='.Roblosecurity'
          value={value.code}
          placeholder="..."
          changeFunction={onChange}
        />
        <div className='flex justify-between items-center '>
          <div className='flex'>
            <InputWithLabel
              type='checkbox'
              value={isChecked.policy}
              name='policy'
              changeFunction={handleCheckBox}
              labelClasses='flex flex-row-reverse items-center'
              label='By checking this box you agree to our'
              titleClasses='text-purple-terms ml-3'
            />
            <a href='https://sinoptik.ua' className='text-lightblue-secondary underline ml-1' target='_blank' rel='noreferrer'>Terms Of Service</a>
          </div>
          <Button
            text='Sign in'
            buttonClasses="flex items-center justify-center min-w-[110px] leading-9 text-sm font-bold rounded bg-green-primary hover:bg-green-highlight px-2.5"
            submitFunction={() => isChecked.policy && submitFunction(value)}
          />
       </div>
      </div>

    </>

  )
}
export default RobloSignIn
