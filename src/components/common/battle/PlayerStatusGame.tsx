import DiamondIcon from '../../icons/DiamondIcon'
import CoinsContainer from '../Coins/CoinsContainer'
import IconContainer from '../Coins/IconContainer'
import CoinsTypography from '../Coins/CoinsTypography'

const PlayerStatusGame = ({
  isPlayerGameWinner,
  wonDiamonds
}: {
  isPlayerGameWinner: boolean
  wonDiamonds?: number
}) => {
  return (
    <div className='z-20 absolute inset-0 flex flex-col justify-center items-center pt-1 pb-2'>
      <span
        className={`${
          isPlayerGameWinner ? 'text-green-primary' : 'text-red-500'
        } text-base font-semibold mb-2`}
      >
        {isPlayerGameWinner ? 'Winner' : 'Lost'}
      </span>
      <CoinsContainer color={`${!isPlayerGameWinner ? 'RedPrimary' : 'GreenDarken'}`} size='Small'>
        <IconContainer
          color={`${!isPlayerGameWinner ? 'RedPrimary' : 'GreenPrimary'}`}
          size='Small'
        >
          <DiamondIcon />
        </IconContainer>
        <CoinsTypography quantity={isPlayerGameWinner ? wonDiamonds ?? 0 : 0} fontSize='Size14' />
      </CoinsContainer>
    </div>
  )
}

export default PlayerStatusGame
