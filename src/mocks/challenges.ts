import wheelGame from '../assets/img/wheel-big.png'
import plinkoGame from '../assets/img/plinko-challenges-card.png'
import coinflipGame from '../assets/img/coinflip-challenge-card.png'
import jackpotGame from '../assets/img/jackpot-challenge-card.png'

export interface IChallengeCard {
  id: string
  name: string
  isClaimed?: boolean
  price: number
  image: string
}

export const challengeCard: IChallengeCard [] = [
  {
    id: '1',
    name: 'wheel',
    isClaimed: true,
    price: 1250,
    image: wheelGame
  },
  {
    id: '2',
    name: 'plinko',
    price: 1400,
    image: plinkoGame
  },
  {
    id: '3',
    name: 'wheel',
    price: 4800,
    image: wheelGame
  },
  {
    id: '4',
    name: 'coinflip',
    price: 1300,
    image: coinflipGame
  },
  {
    id: '5',
    name: 'jackpot',
    isClaimed: true,
    price: 7500,
    image: jackpotGame
  },
  {
    id: '6',
    name: 'jackpot',
    price: 7500,
    image: jackpotGame
  },
  {
    id: '7',
    name: 'plinko',
    isClaimed: true,
    price: 1500,
    image: plinkoGame
  },
  {
    id: '8',
    name: 'coinflip',
    isClaimed: true,
    price: 2200,
    image: coinflipGame
  },
  {
    id: '9',
    name: 'coinflip',
    price: 3200,
    image: coinflipGame
  },
  {
    id: '10',
    name: 'wheel',
    price: 3200,
    image: wheelGame
  }
]
