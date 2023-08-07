import CoinsWithDiamond from '../CoinsWithDiamond'

interface PlayerStatusGameProps {
  isPlayerGameWinner: boolean
  wonDiamonds?: number
}

const PlayerStatusGame = ({ isPlayerGameWinner, wonDiamonds }: PlayerStatusGameProps) => {
  return (
    <div className="z-20 absolute inset-0 flex flex-col justify-center items-center pt-1 pb-2">
      <span className={`${isPlayerGameWinner ? 'text-green-primary' : 'text-red-500'} text-base font-semibold mb-2`}>
        {isPlayerGameWinner ? 'Winner' : 'Lost'}
      </span>
      <CoinsWithDiamond
        containerColor={`${!isPlayerGameWinner ? 'RedPrimary' : 'GreenDarken'}`}
        containerSize="Small"
        iconClasses="w-[13px]"
        iconContainerColor={`${!isPlayerGameWinner ? 'RedPrimary' : 'GreenPrimary'}`}
        iconContainerSize="Small"
        typographyQuantity={isPlayerGameWinner ? wonDiamonds ?? 0 : 0}
      />
    </div>
  )
}

export default PlayerStatusGame
