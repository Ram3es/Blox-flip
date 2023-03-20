import { StatusCode } from './enums'

export interface ITransaction {
  type: 'Deposit' | 'Withdraw'
  date: string
  paymentMethod: 'Crypto' | 'Robux' | 'Limiteds'
  status: `${StatusCode}`
  amount: number
  isError?: boolean
  isWinner?: boolean
}
