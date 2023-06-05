import { TBaseUser } from './User'

export interface IAffilateData {
  code: string
  deposits: number // total deposits for the user
  total: number // total earnings
  current: number // current earning
  users: IAffilateDeposit[]
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
