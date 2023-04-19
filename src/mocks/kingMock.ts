import { IKingGame } from '../types/King'
import { cards } from './cards'

export const kingMock: IKingGame[] = [
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

export const kingMockInitial: IKingGame = {
  firstPlayer: {
    username: 'test1',
    items: cards.slice(0, 9)
  },
  secondPlayer: {
    username: 'test2',
    items: cards.slice(0, 8)
  }
}
