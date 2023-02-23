import React, { useState } from 'react'
import InputWithLabel from '../base/InputWithLabel'
import Submit from './Submit'

const RobloSignIn = ({ submitFunction }: { submitFunction?: Function }) => {
  const [inputValue, setInputValue] = useState({ code: '' })

  const onChange = (name: string, value: string) => {
    setInputValue(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = () => {
    console.log(inputValue)
  }
  return (
    <>
      <div className='min-h-[264px]'>
        <InputWithLabel
          type='text'
          name='code'
          label='.Roblosecurity'
          value={inputValue.code}
          placeholder="..."
          changeFunction={onChange}
        />
        <Submit submitFunction={onSubmit} />
      </div>

    </>

  )
}
export default RobloSignIn
