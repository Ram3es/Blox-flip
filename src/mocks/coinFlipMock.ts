import { ICoinFlip } from '../types/CoinFlip'
import { cards } from './cards'

export const coinFlipGamesMock: ICoinFlip[] = [
  {
    state: 1,
    id: '4124124',
    seed: '2423423ssrsqwrq',
    creator: {
      id: '52352346235',
      name: 'blablaMen',
      avatar:
        'https://vip.shuvar.com/media/catalog/product/cache/628b1a33a4779cd89563027f2a2c1a58/8/9/897-8-1.png',
      level: 7,
      value: 200,
      chance: 50,
      skins: cards.slice(0, 5),
      coin: 0
    },
    min: 100,
    max: 500
  },
  {
    state: 2,
    id: '4121241244124',
    seed: '2423423ssrsqwrq',
    creator: {
      id: '52352346235',
      name: 'blablaMen',
      avatar:
        'https://vip.shuvar.com/media/catalog/product/cache/628b1a33a4779cd89563027f2a2c1a58/8/9/897-8-1.png',
      level: 7,
      value: 200,
      chance: 50,
      skins: cards.slice(0, 5),
      coin: 0
    },
    joining: {
      id: '241412412',
      name: 'pomidorBobobo',
      avatar:
        'https://vip.shuvar.com/media/catalog/product/cache/628b1a33a4779cd89563027f2a2c1a58/8/9/897-8-1.png',
      level: 7,
      value: 200,
      chance: 50,
      skins: cards.slice(0, 5),
      coin: 0
    },
    timer: 1685786515,
    min: 100,
    max: 500
  },
  {
    state: 3,
    id: '4177724124',
    seed: '2423423ssrsqwrq',
    creator: {
      id: '52352346235',
      name: 'blablaMen',
      avatar:
        'https://vip.shuvar.com/media/catalog/product/cache/628b1a33a4779cd89563027f2a2c1a58/8/9/897-8-1.png',
      level: 7,
      value: 200,
      chance: 50,
      skins: cards.slice(0, 5),
      coin: 1
    },
    joining: {
      id: '241412412',
      name: 'pomidorBobobo',
      avatar:
        'https://vip.shuvar.com/media/catalog/product/cache/628b1a33a4779cd89563027f2a2c1a58/8/9/897-8-1.png',
      level: 7,
      value: 200,
      chance: 50,
      skins: cards.slice(0, 5),
      coin: 0
    },
    min: 100,
    max: 500
  },
  {
    state: 4,
    id: '34u6394683',
    seed: '2423423ssrsqwrq',
    creator: {
      id: '52352346235',
      name: 'blablaMen',
      avatar:
        'https://vip.shuvar.com/media/catalog/product/cache/628b1a33a4779cd89563027f2a2c1a58/8/9/897-8-1.png',
      level: 7,
      value: 200,
      chance: 50,
      skins: cards.slice(0, 5),
      coin: 0
    },
    joining: {
      id: '241412412',
      name: 'pomidorBobobo',
      avatar:
        'https://vip.shuvar.com/media/catalog/product/cache/628b1a33a4779cd89563027f2a2c1a58/8/9/897-8-1.png',
      level: 7,
      value: 200,
      chance: 50,
      skins: cards.slice(0, 5),
      coin: 1
    },
    winner: {
      id: '241412412',
      name: 'pomidorBobobo',
      avatar:
        'https://vip.shuvar.com/media/catalog/product/cache/628b1a33a4779cd89563027f2a2c1a58/8/9/897-8-1.png',
      level: 7,
      value: 200,
      coin: 1
    },
    min: 100,
    max: 500
  }
]
