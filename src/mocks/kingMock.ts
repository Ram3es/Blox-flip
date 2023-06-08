import { IKingHistory, IKingPlayer } from '../types/King'
import { cards } from './cards'

export const kingMock = [
  {
    firstPlayer: {
      username: 'test1',
      items: cards
    },
    secondPlayer: {
      username: 'test2',
      items: cards
    }
  },
  {
    firstPlayer: {
      username: 'test1',
      items: cards
    },
    secondPlayer: {
      username: 'test2',
      items: cards
    }
  },
  {
    firstPlayer: {
      username: 'test1',
      items: cards
    },
    secondPlayer: {
      username: 'test2',
      items: cards
    }
  },
  {
    firstPlayer: {
      username: 'test1',
      items: cards
    },
    secondPlayer: {
      username: 'test2',
      items: cards
    }
  },
  {
    firstPlayer: {
      username: 'test1',
      items: cards
    },
    secondPlayer: {
      username: 'test2',
      items: cards
    }
  }
]

export const kingMockInitial = {
  firstPlayer: {
    username: 'test1',
    items: cards.slice(0, 9)
  },
  secondPlayer: {
    username: 'test2',
    items: cards.slice(0, 8)
  }
}

const playerMock: IKingPlayer = {
  id: '232rqwsrqe',
  name: 'Arbuz',
  avatar:
    'https://avatars.cloudflare.steamstatic.com/063dc7e51bde42a6b4580e976a70efa19fb12e73_full.jpg',
  level: 5,
  value: 2.24,
  players_skins: cards.slice(0, 5)
}

const playerSecondMock: IKingPlayer = {
  id: '23211rq242wsrqe',
  name: 'Baklajan',
  avatar: 'https://steamavatar.io/img/1477742850r3v3p.jpg',
  level: 5,
  value: 2.24,
  players_skins: cards.slice(0, 5)
}

export const kingHistoryMock: IKingHistory[] = [
  {
    id: 'blalb12412',
    round: 1,
    hash: 'rqwrqwrqwrqwrojweth239h23i4un',
    champion: playerMock,
    challenger: playerSecondMock,
    winner: playerSecondMock
  },
  {
    id: 'blalb12412',
    round: 1,
    hash: 'rqwrqwrqwrqwrojweth239h23i4un',
    champion: playerMock,
    challenger: playerSecondMock,
    winner: playerSecondMock
  },
  {
    id: 'blalb12412',
    round: 1,
    hash: 'rqwrqwrqwrqwrojweth239h23i4un',
    champion: playerMock,
    challenger: playerSecondMock,
    winner: playerSecondMock
  },
  {
    id: 'blalb12412',
    round: 1,
    hash: 'rqwrqwrqwrqwrojweth239h23i4un',
    champion: playerMock,
    challenger: playerSecondMock,
    winner: playerSecondMock
  },
  {
    id: 'blalb12412',
    round: 1,
    hash: 'rqwrqwrqwrqwrojweth239h23i4un',
    champion: playerMock,
    challenger: playerSecondMock,
    winner: playerSecondMock
  }
]
