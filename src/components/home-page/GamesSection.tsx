import { useState, useContext } from 'react'
import { Context } from '../../store/Store'
import SignInModal from '../containers/SignInModal'
import GameCard from './GameCard'
import GiftCard from './GiftCard'
import WelcomeCard from './WelcomeCard'

const games = [
  { name: 'caseBattles', path: '/battles-lobby' },
  { name: 'cases', path: '/unboxing' },
  { name: 'crash', path: '/crash' },
  { name: 'mines', path: '/mines' },
  { name: 'wheel', path: '/wheel' }
]

const GamesSection = () => {
  const [isOpenSignInModal, setIsOpenModal] = useState(false)
  const { state } = useContext(Context)

  return (
    <div className="flex flex-wrap -mx-3">
      <WelcomeCard user={state?.user} openModal={() => setIsOpenModal(true)} />
      {games.map(({ name, path }, idx) => (
        <GameCard key={path} titleBtn={name} path={path} isLeftCorner={idx % 2 === 0} />
      ))}
      {/* <div className='w-full xxs:w-1/2 xs:w-1/3 lg:w-1/6 mb-18'>
        <img src={Plinko} className=' w-full h-full' />
      </div> */}
      <GiftCard />
      <SignInModal isOpen={isOpenSignInModal} onClose={() => setIsOpenModal(false)} />
    </div>
  )
}

export default GamesSection
