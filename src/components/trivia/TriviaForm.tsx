import React, { ChangeEvent, FormEvent, useState } from 'react'
import InputWithInlineLabel from '../common/InputWithInlineLabel'
import { Button } from '../base/Button'

interface IFormLabel {
  name: string
  label: string
  state: Record<string, string | number>
  isShown?: boolean
  inputClass?: string
  labelClass?: string
}

const formFields: IFormLabel[] = [
  {
    name: 'amount',
    label: 'Amount',
    isShown: true,
    state: {
      amount: 0
    }
  },
  {
    name: 'question',
    label: 'Question',
    isShown: true,
    state: {
      question: ''
    }
  },
  {
    name: 'answer',
    label: 'Answer',
    isShown: true,
    inputClass: 'text-base text-green-primary pl-2 bg-transparent text-left outline-none placeholder:text-white',
    labelClass: 'px-5 py-2 text-green-primary bg-green-primary/20 rounded-md',
    state: {
      answer: ''
    }
  },
  {
    name: 'optional',
    label: 'Answer 2',
    isShown: false,
    state: {
      optional: ''
    }
  },
  {
    name: 'optional1',
    label: 'Answer 3',
    isShown: false,
    state: {
      optional1: ''
    }
  },
  {
    name: 'optional2',
    label: 'Answer 4',
    isShown: false,
    state: {
      optional2: ''
    }
  }

]

const TriviaForm = () => {
  const [renderFields, setRenderFields] = useState(formFields)
  const [inputsValues, setInputValue] = useState<Record<string, string | number>>(renderFields.reduce((acc, item) => {
    acc = { ...acc, ...item.state }
    return acc
  }, {}))

  const fillTrivia = () => {
    const obj = {
      amount: '1200',
      question: 'What is the capital of France ?',
      answer: 'Paris',
      optional: 'London'
    }
    setRenderFields(prev => [...prev.map(item => {
      if (Object.keys(obj).includes(item.name)) {
        return { ...item, isShown: true }
      }
      return { ...item, isShown: false }
    })])
    setInputValue(prev => ({ ...prev, ...obj }))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('trivia submit')
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setInputValue(prev => ({ ...prev, [name]: value }))

    switch (name) {
      case 'answer':
        return setRenderFields(prev => [...prev.map(item => {
          if (item.name === 'optional') {
            return { ...item, isShown: value !== '' }
          }
          return item
        })])
      case 'optional':
        return setRenderFields(prev => [...prev.map(item => {
          if (item.name === 'optional1') {
            return { ...item, isShown: value !== '' }
          }
          return item
        })])
      case 'optional1':
        return setRenderFields(prev => [...prev.map(item => {
          if (item.name === 'optional2') {
            return { ...item, isShown: value !== '' }
          }
          return item
        })])
    }
  }

  return (
        <form onSubmit={onSubmit} className='flex flex-col gap-2 mt-5'>
          {renderFields.map((item) => {
            return item.name === 'amount'
              ? (
                <InputWithInlineLabel
                key={item.name}
                name={item.name}
                type='number'
                placeholder='...'
                value={inputsValues[item.name] !== 0 ? inputsValues[item.name] : ''}
                onChange={onChange}
                label={item.label}
                withIcon
                autoComplete='off'
              />
                )
              : (item?.isShown &&
              <InputWithInlineLabel
                key={item.name}
                name={item.name}
                label={item.label}
                placeholder='...'
                value={inputsValues[item.name]}
                onChange={onChange}
                autoComplete='off'
                inputClasses={item.inputClass}
                labelClasses={item.labelClass}
               />
                )
          })}
             <div className='flex items-center justify-center gap-5 mt-6'>
              <Button
                onClick={fillTrivia}
                className='flex items-center justify-center  min-w-[110px] leading-9 text-gray-primary text-sm font-bold rounded bg-blue-accent-primary hover:text-white px-2.5 '
              >
                Auto Trivia
              </Button>
              <Button
                type='submit'
                className='flex items-center justify-center  min-w-[110px] leading-9 text-sm font-bold rounded bg-green-primary hover:bg-green-highlight px-2.5'
              >
                Start Trivia
              </Button>
          </div>

        </form>
  )
}

export default TriviaForm
