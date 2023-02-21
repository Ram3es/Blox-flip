import { ChangeEvent, FormEvent, useState } from 'react'

import { InputWithLabel } from '../base/InputWithLabel'
import { Button } from '../common/Button/Button'
import { DiamondIcon } from '../DiamondIcon/DiamondIcon'

export const ChatLotteryInput = () => {
  const [tipCoins, setTipCoins] = useState('')

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
        <DiamondIcon className='-inset-full absolute m-auto' />
      </span>
      <InputWithLabel
        type='text'
        placeholder='...'
        variant='OUTLINED'
        value={tipCoins}
        onChange={handleTipRain}
      />
      <Button variant='GRADIENT' size='SMALL' type='submit'>
        Tip Rain
      </Button>
    </form>
  )
}
