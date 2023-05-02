import { getItemColorByName } from '../../../helpers/wheelHelpers'
import { IWheelBet } from '../../../mocks/wheelBets'
import { possibleBets } from '../../../types/Wheel'
import DiamondIcon from '../../icons/DiamondIcon'
import TeamGroupIcon from '../../icons/TeamGroupIcon'
import Image from '../../base/Image'
import CoinsContainer from '../Coins/CoinsContainer'
import CoinsTypography from '../Coins/CoinsTypography'
import IconContainer from '../Coins/IconContainer'

interface IWheelBetCard {
  color: possibleBets
  bets: IWheelBet[]
}

const cutString = (s: string): string => {
  if (s.length > 13) {
    const cuttedString = s.slice(0, 10)
    return cuttedString + '...'
  } else {
    return s
  }
}

const WheelBetsCard = ({ color, bets }: IWheelBetCard) => {
  return (
    <div className='w-full flex flex-col gap-4 relative'>
      <div
        className={`${
          color !== possibleBets.RED ? 'bg-black bg-opacity-50' : ''
        } cursor-pointer relative py-4 px-3 rounded flex-nowrap flex`}
        style={{
          background:
            color === possibleBets.RED
              ? 'linear-gradient(9.63deg, rgb(120 57 57) 4.2%, rgb(129 101 0) 166.04%)'
              : '',
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
          <TeamGroupIcon
            fillGradientId={color === possibleBets.RED ? 'url(#paint_linear_1029_888)' : undefined}
          >
            {color === possibleBets.RED && (
              <defs>
                <linearGradient
                  id='paint_linear_1029_888'
                  x1='16.7498'
                  y1='16.3381'
                  x2='20.5985'
                  y2='3.45047'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#FE4747' />
                  <stop offset='1' stopColor='#FFC700' />
                </linearGradient>
              </defs>
            )}
          </TeamGroupIcon>
          <span className='text-white font-bold text-15'>{bets.length}</span>
        </div>
        <div
          className={`grow text-center uppercase text-15 font-extrabold ${
            color === possibleBets.RED ? 'text-gradient-red' : ''
          }`}
        >
          BET {color}
          {color === possibleBets.GREY
            ? '2'
            : color === possibleBets.YELLOW
              ? '3'
              : color === possibleBets.BLUE
                ? '5'
                : '50'}
          X
        </div>
      </div>
      <div className='flex flex-col'>
        {bets.map((bet, index) => (
          <div
            key={color + 'bet' + bet.username}
            className='px-2 py-1 relative flex justify-between'
          >
            <div
              className={`rounded absolute left-0 top-0 w-full h-full -z-10 ${
                index % 2 === 0 ? 'opacity-10' : 'opacity-5'
              }`}
              style={{
                background: getItemColorByName(color, false)
              }}
            />
            <div className='flex items-center'>
              <div className='w-8 h-8 shrink-0 border border-blue-highlight rounded-full overflow-hidden radial--gray mr-2.5'>
                <Image image={bet.avatar} />
              </div>
              <span className='font-bold relative py-1 text-white text-13'>
                {cutString(bet.username)}
              </span>
            </div>
            <CoinsContainer color='Transparent'>
              <IconContainer color='GreenPrimary' size='Small'>
                <DiamondIcon />
              </IconContainer>
              <CoinsTypography quantity={bet.bet} fontSize='Size14' />
            </CoinsContainer>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WheelBetsCard
