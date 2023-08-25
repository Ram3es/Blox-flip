import { TBaseUser } from './User'

export interface IAffiliateData {
  link: string
  totaldeposited: number // total deposits for the user
  totalearned: number // total earnings
  available: number // current earning
  users?: IAffiliateDeposit[]
}

export interface IAffiliateDeposit {
  user: TBaseUser
  date: string
  deposited: number
}
