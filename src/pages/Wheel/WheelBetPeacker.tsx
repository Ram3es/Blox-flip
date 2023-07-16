import WheelBetsCard from '../../components/common/Cards/WheelBetsCard'
import { getRandomId } from '../../helpers/casesHelpers'
import { WheelBetRecord } from '../../mocks/wheelBets'
import { possibleBets } from '../../types/Wheel'

interface IBetPeacker {
  onPeack: (color: possibleBets) => void
  bets?: WheelBetRecord
}

const WheelBetPeacker = ({ onPeack, bets }: IBetPeacker) => {
  return (
    <div className="grid grid-cols-1 xxs:grid-cols-2 xl:grid-cols-4 gap-4">
      {bets && Object.keys(bets).map((color) => (
        <WheelBetsCard
          key={`bet-card-${color}-${getRandomId()}`}
          color={color as possibleBets}
          bets={bets[color as possibleBets]}
          onPeack={onPeack}
        />
      ))}
    </div>
  )
}

export default WheelBetPeacker
