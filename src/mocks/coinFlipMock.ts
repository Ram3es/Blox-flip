import { CoinFlipGame } from '../types/CoinFlip'
import { cards } from './cards'

export const coinFlipMock: CoinFlipGame[] = [
  {
    firstPlayer: {
      username: 'test1',
      coin: 1,
      items: cards
    },
    secondPlayer: {
      username: 'test2',
      coin: 0,
      items: cards
    },
    status: 'Created'
  },
  {
    firstPlayer: {
      username: 'test1',
      coin: 0,
      items: cards
    },
    secondPlayer: {
      username: 'test2',
      coin: 1,
      items: cards
    },
    winCoin: 1,
    status: 'Ended'
  },
  {
    firstPlayer: {
      username: 'test1',
      coin: 0,
      items: cards
    },
    secondPlayer: {
      username: 'test2',
      coin: 1,
      items: cards
    },
    winCoin: 0,
    status: 'Ended'
  },
  {
    firstPlayer: {
      username: 'test1',
      coin: 1,
      items: cards
    },
    secondPlayer: {
      username: 'test2',
      coin: 0,
      items: cards
    },
    status: 'Running'
  },
  {
    firstPlayer: {
      username: 'test1',
      coin: 0,
      items: cards
    },
    secondPlayer: {
      username: 'test2',
      coin: 1,
      items: cards
    },
    status: 'Created'
  }
  // {
  //   firstPlayer: {
  //     username: 'test1',
  //     coin: 1,
  //     items: cards
  //   },
  //   secondPlayer: {
  //     username: 'test2',
  //     coin: 1,
  //     items: cards
  //   },
  //   status: 'Created'
  // },
  // {
  //   firstPlayer: {
  //     username: 'test1',
  //     coin: 0,
  //     items: cards
  //   },
  //   secondPlayer: {
  //     username: 'test2',
  //     coin: 1,
  //     items: cards
  //   },
  //   status: 'Ended'
  // },
  // {
  //   firstPlayer: {
  //     username: 'test1',
  //     coin: 1,
  //     items: cards
  //   },
  //   secondPlayer: {
  //     username: 'test2',
  //     coin: 1,
  //     items: cards
  //   },
  //   status: 'Ended'
  // },
  // {
  //   firstPlayer: {
  //     username: 'test1',
  //     coin: 1,
  //     items: cards
  //   },
  //   secondPlayer: {
  //     username: 'test2',
  //     coin: 1,
  //     items: cards
  //   },
  //   status: 'Ended'
  // },
  // {
  //   firstPlayer: {
  //     username: 'test1',
  //     coin: 0,
  //     items: cards
  //   },
  //   secondPlayer: {
  //     username: 'test2',
  //     coin: 1,
  //     items: cards
  //   },
  //   status: 'Running'
  // },
  // {
  //   firstPlayer: {
  //     username: 'test1',
  //     coin: 1,
  //     items: cards
  //   },
  //   secondPlayer: {
  //     username: 'test2',
  //     coin: 0,
  //     items: cards
  //   },
  //   status: 'Created'
  // },
  // {
  //   firstPlayer: {
  //     username: 'test1',
  //     coin: 1,
  //     items: cards
  //   },
  //   secondPlayer: {
  //     username: 'test2',
  //     coin: 1,
  //     items: cards
  //   },
  //   status: 'Created'
  // },
  // {
  //   firstPlayer: {
  //     username: 'test1',
  //     coin: 1,
  //     items: cards
  //   },
  //   secondPlayer: {
  //     username: 'test2',
  //     coin: 0,
  //     items: cards
  //   },
  //   status: 'Running'
  // }
]
