import WheelBetsCard from '../../components/common/Cards/WheelBetsCard'
import { WheelBetRwcord } from '../../mocks/wheelBets'
import { possibleBets } from '../../types/Wheel'

interface IBetPeacker {
  onPeack: (color: possibleBets) => void
  bets: WheelBetRwcord
}

const WheelBetPeacker = ({ onPeack, bets }: IBetPeacker) => {
  return (
    <div className="grid grid-cols-1 xxs:grid-cols-2 xl:grid-cols-4 gap-4">
      {Object.keys(bets).map((color) => (
        <WheelBetsCard key={`bet-card-${color}`} color={color as possibleBets} bets={bets[color as possibleBets]} />
      ))}
    </div>
  )
}

export default WheelBetPeacker
