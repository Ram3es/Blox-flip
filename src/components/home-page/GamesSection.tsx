import React from 'react'
import GameCard from './GameCard'
import GiftCard from './GiftCard'
import WelcomeCard from './WelcomeCard'

const games = [
  { name: 'Case Battles' },
  { name: 'Cases' },
  { name: 'Crash' },
  { name: 'King' },
  { name: 'Mines' },
  { name: 'Wheel' }
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
              {games.map(({ name }, idx) => (
                 <GameCard key={name} titleBtn={name} isLeftCorner={idx % 2 === 0} />
              ))}
            <GiftCard />
        </div>
  )
}

export default GamesSection
