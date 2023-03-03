import React, { useState, useContext } from 'react'
import { Context } from '../../store/Store'
import SignInModal from '../modal/SignInModal.'
import GameCard from './GameCard'
import GiftCard from './GiftCard'
import WelcomeCard from './WelcomeCard'

const games = [
  { name: 'caseBattles', path: '/case-battles' },
  { name: 'cases', path: '/cases' },
  { name: 'crash', path: '/crash' },
  { name: 'king', path: '/king' },
  { name: 'mines', path: '/mines' },
  { name: 'wheel', path: '/wheel' }
]

const GamesSection = () => {
  const [isOpenSignInModal, setIsOpenModal] = useState(false)
  /** @ts-expect-error */
  const [state] = useContext(Context)
  return (
        <div className="flex flex-wrap -mx-3">
            <WelcomeCard user={state?.user} openModal={() => setIsOpenModal(true)}/>
              {games.map(({ name, path }, idx) => (
                 <GameCard
                   key={path}
                   titleBtn={name}
                   path={path}
                   isLeftCorner={idx % 2 === 0} />
              ))}
            <GiftCard />
            <SignInModal isOpen={isOpenSignInModal} onClose={() => setIsOpenModal(false) } />
        </div>
  )
}

export default GamesSection
