import { StatusCode } from './enums'

export interface ITransaction {
  id: string
  type: 'Deposit' | 'Withdraw'
  time: string
  currency: string
  status: `${StatusCode}`
  amount: number
}
