import { Dispatch, SetStateAction } from 'react'

import clsx from 'clsx'

import YellowCoin from '../../../assets/img/coinflip/coinflip-white-placeholder.png'
import PurpleCoin from '../../../assets/img/coinflip/coinflip-blue-placeholder.png'

import { ICoin } from '../../../types/CoinFlip'

interface ToggleCoinProps {
  selectedCoin: ICoin
  setSelectedCoin: Dispatch<SetStateAction<ICoin>>
}

const ToggleCoin = ({ selectedCoin, setSelectedCoin }: ToggleCoinProps) => {
  const coins: ICoin[] = [0, 1]

  return (
    <div className="flex items-center space-x-2">
      <span className='ls:hidden text-gray-primary font-semibold text-sm mr-5'>Coin:</span>
      {coins.map((coin) => (
        <img
          key={coin}
          onClick={() => setSelectedCoin(coin)}
          className={clsx('w-[45px] h-[45px] cursor-pointer', {
            'mix-blend-luminosity': selectedCoin !== coin
          })}
          src={coin === 0 ? YellowCoin : PurpleCoin}
          alt="coinflip coin"
        />
      ))}
    </div>
  )
}

export default ToggleCoin
