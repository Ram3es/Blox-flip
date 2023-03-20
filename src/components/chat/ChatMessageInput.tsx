import { ChangeEvent, FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../base/Button'
import { Input } from '../base/Input'

const MailIcon = ({ className }: { className: string }) => {
  return (
    <svg
      width='19'
      height='10'
      viewBox='0 0 19 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path d='M6.00916 0.616455L12.1282 5.04441L18.2473 0.616455H6.00916Z' fill='white' />
      <path
        d='M12.4614 6.20739C12.3619 6.27934 12.245 6.31538 12.128 6.31538C12.011 6.31538 11.8941 6.27938 11.7946 6.20739L5.25596 1.47577V2.06236H2.62806C2.31397 2.06236 2.05933 2.317 2.05933 2.63109C2.05933 2.94519 2.31397 3.19983 2.62806 3.19983H5.25596V6.79572H2.62806C2.31397 6.79572 2.05933 7.05036 2.05933 7.36446C2.05933 7.67855 2.31397 7.93319 2.62806 7.93319H5.25596V8.81027C5.25596 9.12436 5.5106 9.37901 5.82469 9.37901H18.4313C18.7454 9.37901 19 9.12436 19 8.81027V1.47581L12.4614 6.20739Z'
        fill='white'
      />
      <path
        d='M3.76537 4.42902H0.568737C0.254644 4.42902 0 4.68366 0 4.99775C0 5.31185 0.254644 5.56649 0.568737 5.56649H3.76537C4.07946 5.56649 4.33411 5.31185 4.33411 4.99775C4.33411 4.68366 4.07946 4.42902 3.76537 4.42902Z'
        fill='white'
      />
    </svg>
  )
}

export const ChatMessageInput = () => {
  const [message, setMessage] = useState('')
  const { t } = useTranslation()

  const handleMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submit message')
    setMessage('')
  }

  return (
    <div className='absolute inset-0 top-auto z-50 p-4 bg-blue-primary'>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder={`${t('chat.placeholder')}`}
          value={message}
          onChange={handleMessage}
          type='text'
          variant='BASE'
        />
        <div className='absolute right-7 z-20 top-2/4 -mt-3.5'>
          <Button color='GreenPrimary'>
            <p className='flex justify-center items-center w-7 h-7'>
              <MailIcon className='mr-0.5' />
            </p>
          </Button>
        </div>
      </form>
    </div>
  )
}
