import CoinFlipGame from './CoinFlipGame'
import CoinFlipHeader from './CoinFlipHeader'
import CoinFlipList from './CoinFlipList'

const CoinFlip = () => {
  return (
    <div>
      <CoinFlipHeader />
      <CoinFlipList />
      <CoinFlipGame withBot={false} />
    </div>
  )
}

export default CoinFlip
