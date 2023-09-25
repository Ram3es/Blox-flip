import { useState, useContext } from 'react'
import { Context } from '../../store/Store'
import SignInModal from '../containers/SignInModal'
import GameCard from './GameCard'
import GiftCard from './GiftCard'
import WelcomeCard from './WelcomeCard'
import CasesBanner from '../../assets/img/banners/cases-banner.png'
import CaseBattlesBanner from '../../assets/img/banners/case-battles-banner.png'
// import WheelBanner from '../../assets/img/banners/wheel-banner.png'
import PlinkoBanner from '../../assets/img/banners/plinko-banner.png'
import JackpotBanner from '../../assets/img/banners/jackpot-banner.png'
import CFBanner from '../../assets/img/banners/coinflip-banner.png'

const games = [
  { name: 'caseBattles', path: '/battles-lobby', image: CaseBattlesBanner },
  { name: 'cases', path: '/unboxing', image: CasesBanner },
  // { name: 'wheel', path: '/wheel', image: WheelBanner },
  { name: 'plinko', path: '/plinko', image: PlinkoBanner },
  { name: 'coinflip', path: '/coinflip', image: CFBanner },
  { name: 'jackpot', path: '/jackpot', image: JackpotBanner }
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
