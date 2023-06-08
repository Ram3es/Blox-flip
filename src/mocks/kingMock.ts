import { IKingChampion, IKingFight, IKingHistory, IKingPlayer } from '../types/King'
import { cards } from './cards'

const playerMock: IKingPlayer = {
  id: '232rqwsrqe',
  name: 'Arbuz',
  avatar:
    'https://avatars.cloudflare.steamstatic.com/063dc7e51bde42a6b4580e976a70efa19fb12e73_full.jpg',
  level: 5,
  value: 80.24,
  players_skins: cards.slice(0, 5)
}

const playerSecondMock: IKingPlayer = {
  id: '23211rq242wsrqe',
  name: 'Baklajan',
  avatar: 'https://steamavatar.io/img/1477742850r3v3p.jpg',
  level: 5,
  value: 80.24,
  players_skins: cards.slice(0, 5)
}

export const kingHistoryMock: IKingHistory[] = [
  {
    id: 'blalb121412',
    round: 1,
    hash: 'rqwrqwrqwrqwrojweth239h23i4un',
    champion: playerMock,
    challenger: playerSecondMock,
    winner: playerSecondMock
  },
  {
    id: 'blalb12413473463452',
    round: 1,
    hash: 'rqwrqwrqwrqwrojweth239h23i4un',
    champion: playerMock,
    challenger: playerSecondMock,
    winner: playerSecondMock
  },
  {
    id: 'bl2alb1112412',
    round: 1,
    hash: 'rqwrqwrqwrqwrojweth239h23i4un',
    champion: playerMock,
    challenger: playerSecondMock,
    winner: playerSecondMock
  },
  {
    id: 'bl6alb12417772',
    round: 1,
    hash: 'rqwrqwrqwrqwrojweth239h23i4un',
    champion: playerMock,
    challenger: playerSecondMock,
    winner: playerSecondMock
  },
  {
    id: 'bla2424l5555555555b12412',
    round: 1,
    hash: 'rqwrqwrqwrqwrojweth239h23i4un',
    champion: playerMock,
    challenger: playerSecondMock,
    winner: playerSecondMock
  }
]

export const kingGameMock: IKingChampion = {
  id: '12412s412412',
  round: 1,
  champion: playerMock,
  challenger: playerSecondMock,
  end: 1686215599,
  time: 1686215369
}

export const kingGameNullableMock: IKingChampion = {
  id: '12412s412412',
  round: 1,
  champion: playerMock,
  challenger: playerSecondMock,
  end: -1,
  time: 1686215369
}

export const kingFightMock: IKingFight[] = [
  {
    attacker: 'champion',
    weapon: 1,
    attack: 10
  },
  {
    attacker: 'challenger',
    weapon: 2,
    attack: 10
  },
  {
    attacker: 'champion',
    weapon: 3,
    attack: 10
  },
  {
    attacker: 'challenger',
    weapon: 4,
    attack: 10
  },
  {
    attacker: 'champion',
    weapon: 1,
    attack: 10
  },
  {
    attacker: 'challenger',
    weapon: 2,
    attack: 10
  },
  {
    attacker: 'champion',
    weapon: 3,
    attack: 10
  },
  {
    attacker: 'challenger',
    weapon: 4,
    attack: 10
  }
]
