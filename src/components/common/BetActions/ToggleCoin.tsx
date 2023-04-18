import { ICoinFlipContext } from '../../../store/CoinFlipStore'

import clsx from 'clsx'

import { Coin } from '../../../types/CoinFlip'

import CoinFlipHead from '../../../assets/img/CoinFlipHead.png'
import CoinFlipTail from '../../../assets/img/CoinFlipTail.png'

type ToggleCoinProps = Pick<ICoinFlipContext, 'selectedCoin' | 'setSelectedCoin'>

const ToggleCoin = ({ selectedCoin, setSelectedCoin }: ToggleCoinProps) => {
  const coins: Coin[] = [0, 1]

  return (
    <div className='flex items-center space-x-2'>
      {coins.map((coin) => (
        <img
          key={coin}
          onClick={() => setSelectedCoin(coin)}
          className={clsx('w-7 h-7 sm:w-11 sm:h-11 cursor-pointer', {
            'grayscale-[75%]': selectedCoin !== coin
          })}
          src={coin === 0 ? CoinFlipHead : CoinFlipTail}
          alt={coin === 0 ? 'head' : 'tail'}
        />
      ))}
    </div>
  )
}

export default ToggleCoin
