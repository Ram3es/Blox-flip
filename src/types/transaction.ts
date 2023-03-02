export interface ITransaction {
  type: 'Deposit' | 'Withdraw'
  date: string
  paymentMethod: 'Crypto' | 'Robux' | 'Limiteds'
  status: 'Confirmed' | 'Pending' | 'Failed'
  amount: number
}
