import { getItemColorByName } from '../../../helpers/wheelHelpers'
import { IWheelBet } from '../../../mocks/wheelBets'
import { possibleBets } from '../../../types/Wheel'
import TeamGroupIcon from '../../icons/TeamGroupIcon'

interface IWheelBetCard {
  color: possibleBets
  bets: IWheelBet[]
}

const WheelBetsCard = ({ color, bets }: IWheelBetCard) => {
  return (
    <div className='w-full flex flex-col gap-4 relative'>
      <div
        className={`${color !== possibleBets.RED ? 'bg-black bg-opacity-50' : ''} cursor-pointer relative py-4 px-3 rounded flex-nowrap flex`}
        style={{
          background: color === possibleBets.RED ? 'linear-gradient(9.63deg, rgb(120 57 57) 4.2%, rgb(129 101 0) 166.04%)' : '',
          color: color !== possibleBets.RED ? getItemColorByName(color, false) : ''
        }}
      >
        <div
          className='rounded absolute -left-[1px] -top-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] -z-10'
          style={{
            background: getItemColorByName(color, false)
          }}
        />
        <div className='flex gap-1 items-center'>
          <TeamGroupIcon fillGradientId={color === possibleBets.RED ? 'url(#paint_linear_1029_888)' : undefined}>
            {color === possibleBets.RED && <defs>
              <linearGradient id="paint_linear_1029_888" x1="16.7498" y1="16.3381" x2="20.5985" y2="3.45047" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FE4747"/>
                <stop offset="1" stopColor="#FFC700"/>
              </linearGradient>
            </defs>}
          </TeamGroupIcon>
          <span className='text-white font-bold text-15'>
            {bets.length}
          </span>
        </div>
        <div className={`grow text-center uppercase text-15 font-extrabold ${color === possibleBets.RED ? 'text-gradient-red' : ''}`}>
          BET color 2X
        </div>
      </div>
    </div>
  )
}

export default WheelBetsCard
