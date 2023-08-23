import { TBaseUser } from './User'

export interface IAffilateData {
  link: string
  totaldeposited: number // total deposits for the user
  totalearned: number // total earnings
  available: number // current earning
  users?: IAffilateDeposit[]
}

export interface IAffilateDeposit {
  user: TBaseUser
  date: string
  deposited: number
}

export interface ILeaderbordData extends Pick<IAffilateDeposit, 'user'> {
  wagered: number
  reward: number
}
