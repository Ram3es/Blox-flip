import React, { ChangeEvent, useState } from 'react'
import InputWithLabel from '../base/InputWithLabel'
import Submit from './Submit'

const RobloSignIn = ({ submitFunction }: { submitFunction?: Function }) => {
  const [inputValue, setInputValue] = useState({ code: '' })

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInputValue(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = async () => {
    console.log(inputValue)
  }
  return (
    <>
      <div className='min-h-[278px]'>
        <InputWithLabel
          type='text'
          name='code'
          label='.Roblosecurity'
          value={inputValue.code}
          placeholder="..."
          onChange={onChange}
        />
        <Submit submitFunction={onSubmit} />
      </div>

    </>

  )
}
export default RobloSignIn
