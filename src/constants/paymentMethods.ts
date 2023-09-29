import { IPaymentMethods } from '../types/PaymentsMethods'
import { IMAGES } from './images'

export const METHODS: IPaymentMethods = {
  roblox: {
    name: 'Roblox Methods',
    methods: [
      {
        path: 'roblox-limiteds',
        title: 'Roblox',
        image: IMAGES.robloxDeposite,
        smallSize: {
          width: '31px',
          height: '19px'
        }
      }
      // {
      //   path: 'robux',
      //   title: 'Robux',
      //   image: IMAGES.robuxDeposite,
      //   smallSize: {
      //     width: '31px',
      //     height: '19px'
      //   }
      // }
    ]
  },
  crypto: {
    name: 'Crypto Methods',
    methods: [
      {
        type: 'load_address',
        shortName: 'btc',
        path: 'bitcoin',
        title: 'Bitcoin',
        image: IMAGES.bitcoin,
        smallSize: {
          width: '18px',
          height: '18px'
        }
      },
      {
        type: 'load_address',
        shortName: 'eth',
        path: 'ethereum',
        title: 'Ethereum',
        image: IMAGES.ethereum,
        smallSize: {
          width: '18px',
          height: '18px'
        }
      },
      {
        type: 'load_address',
        shortName: 'ltc',
        path: 'litecoin',
        title: 'Litecoin',
        image: IMAGES.litecoin,
        smallSize: {
          width: '18px',
          height: '18px'
        }
      }
    ]
  },
  fiat: {
    name: 'Fiat Methods',
    methods: [
      {
        path: 'credit-card',
        title: 'Credit Card',
        image: IMAGES.creditCard,
        smallSize: {
          width: '20px',
          height: '20px'
        }
      }
      // {
      //   path: 'g2a',
      //   title: 'G2A',
      //   image: IMAGES.g2a,
      //   smallSize: {
      //     width: '37px',
      //     height: '11px'
      //   }
      // },
      // {
      //   path: 'kinguin',
      //   title: 'Kinguin',
      //   image: IMAGES.kinguin,
      //   smallSize: {
      //     width: '26px',
      //     height: '24px'
      //   }
      // }
    ]
  },
  survey: {
    name: ' Survey Section',
    methods: [
      // {
      //   path: 'toro',
      //   title: 'OfferToro',
      //   image: IMAGES.torro,
      //   smallSize: {
      //     width: '40px',
      //     height: '24px'
      //   }
      // },
      {
        path: 'lootably',
        title: 'Lootably',
        image: IMAGES.lootably,
        smallSize: {
          width: '40px',
          height: '24px'
        }
      }
      // {
      //   path: 'adgatemedia ',
      //   title: 'AdGateMedia ',
      //   image: IMAGES.adGate,
      //   smallSize: {
      //     width: '26px',
      //     height: '24px'
      //   }
      // }
    ]

  },
  gift: {
    name: 'Gift Methods',
    methods: [
      {
        path: 'gift',
        title: 'Gift Cards',
        image: IMAGES.creditCard,
        smallSize: {
          width: '20px',
          height: '20px'
        }
      }
    ]
  }
}
