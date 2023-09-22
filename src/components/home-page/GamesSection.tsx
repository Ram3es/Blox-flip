import { useState, useContext } from 'react'
import { Context } from '../../store/Store'
import SignInModal from '../containers/SignInModal'
import GameCard from './GameCard'
import GiftCard from './GiftCard'
import WelcomeCard from './WelcomeCard'
import Cases from '../../assets/img/main/Cases banner2.png'
import BattlesBaner from '../../assets/img/main/Case battles banner1.png'
// import Wheel from '../../assets/img/main/Wheel banner6.png'
import Plinko from '../../assets/img/main/Plinko banner5.png'
import Coinflip from '../../assets/img/main/CF banner3.png'
import Jackpot from '../../assets/img/main/jackpot banner4.png'

const games = [
  { name: 'caseBattles', path: '/battles-lobby', image: BattlesBaner },
  { name: 'cases', path: '/unboxing', image: Cases },
  // { name: 'wheel', path: '/wheel', image: Wheel },
  { name: 'plinko', path: '/plinko', image: Plinko },
  { name: 'coinflip', path: '/coinflip', image: Coinflip },
  { name: 'jackpot', path: '/jackpot', image: Jackpot }
]

const GamesSection = () => {
  const [isOpenSignInModal, setIsOpenModal] = useState(false)
  const { state } = useContext(Context)

  return (
    <div className="flex flex-wrap -mx-3">
      <WelcomeCard user={state?.user} openModal={() => setIsOpenModal(true)} />
      {games.map(({ name, path, image }, idx) => (
        <GameCard key={path} titleBtn={name} path={path} img={image} isLeftCorner={idx % 2 === 0} />
      ))}
      <GiftCard />
      <SignInModal isOpen={isOpenSignInModal} onClose={() => setIsOpenModal(false)} />
    </div>
  )
}

export default GamesSection
