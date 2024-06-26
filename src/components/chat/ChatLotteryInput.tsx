import { ChangeEvent, FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../base/Button'
import { Input } from '../base/Input'
import DiamondIcon from '../icons/DiamondIcon'
import { useSocketCtx } from '../../store/SocketStore'

export const ChatLotteryInput = () => {
  const { socket } = useSocketCtx()
  const [tipCoins, setTipCoins] = useState<string>('')
  const { t } = useTranslation()

  const handleTipRain = (event: ChangeEvent<HTMLInputElement>) => {
    setTipCoins(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('rain from coins', tipCoins)
    socket.emit('tip_rain', { amount: tipCoins }, () => {
      setTipCoins('')
    })
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
        type='number'
        placeholder='...'
        variant='OUTLINED'
        value={tipCoins}
        onChange={handleTipRain}
      />
      <Button variant='GreenGradient' color='GreenPrimary' type='submit'>
        <span className='flex items-center justify-center w-14 whitespace-nowrap leading-7 text-11'>
          {t('chat.tip')}
        </span>
      </Button>
    </form>
  )
}
