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
      },
      {
        path: 'robux',
        title: 'Robux',
        image: IMAGES.robuxDeposite,
        smallSize: {
          width: '31px',
          height: '19px'
        }
      }
    ]
  },
  crypto: {
    name: 'Crypto Methods',
    methods: [
      {
        path: 'bitcoin',
        title: 'Bitcoin',
        image: IMAGES.bitcoin,
        smallSize: {
          width: '18px',
          height: '18px'
        }
      },
      {
        path: 'ethereum',
        title: 'Ethereum',
        image: IMAGES.ethereum,
        smallSize: {
          width: '18px',
          height: '18px'
        }
      },
      {
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
      },
      {
        path: 'g2a',
        title: 'G2A',
        image: IMAGES.g2a,
        smallSize: {
          width: '37px',
          height: '11px'
        }
      },
      {
        path: 'kinguin',
        title: 'Kinguin',
        image: IMAGES.kinguin,
        smallSize: {
          width: '26px',
          height: '24px'
        }
      }
    ]
  }
}
