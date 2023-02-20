import React from 'react'
import GameCard from './GameCard'
import GiftCard from './GiftCard'
import WelcomeCard from './WelcomeCard'

const games = [
  { name: 'Case Battles', path: '/case-battles' },
  { name: 'Cases', path: '/cases' },
  { name: 'Crash', path: '/crash' },
  { name: 'King', path: '/king' },
  { name: 'Mines', path: '/mines' },
  { name: 'Wheel', path: '/wheel' }
]

const user = {
  name: 'John Johnson',
  avatar: '',
  level: 11,
  progress: {
    current: 50,
    required: 165
  }
}

const GamesSection = () => {
  return (
        <div className="flex flex-wrap -mx-3">
            <WelcomeCard user={user}/>
              {games.map(({ name, path }, idx) => (
                 <GameCard
                   key={path}
                   titleBtn={name}
                   path={path}
                   isLeftCorner={idx % 2 === 0} />
              ))}
            <GiftCard />
        </div>
  )
}

export default GamesSection
