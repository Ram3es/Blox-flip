import { ChangeEvent, FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../Base/Button'
import { Input } from '../Base/Input'
import DiamondIcon from '../Icons/DiamondIcon'

export const ChatLotteryInput = () => {
  const [tipCoins, setTipCoins] = useState('')
  const { t } = useTranslation()

  const handleTipRain = (event: ChangeEvent<HTMLInputElement>) => {
    setTipCoins(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('rain from coins')
    setTipCoins('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='relative z-10 rounded border bg-green-primary/15 border-green-primary border-dashed flex items-center justify-between p-1.5'
    >
      <span className='w-5 h-5 text-center leading-6 shrink-0 bg-green-primary/20 rounded relative mr-2 text-green-primary'>
        <DiamondIcon className='-inset-full absolute m-auto' width='15' height='12' />
      </span>
      <Input
        type='text'
        placeholder='...'
        variant='OUTLINED'
        value={tipCoins}
        onChange={handleTipRain}
      />
      <Button variant='Gradient' color='GreenPrimary' type='submit'>
        <span className='flex items-center justify-center w-14 whitespace-nowrap leading-7 text-11'>
          {t('chat.tip')}
        </span>
      </Button>
    </form>
  )
}
