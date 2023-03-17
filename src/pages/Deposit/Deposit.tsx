import { DepositCrypto } from './DepositCrypto'
import { DepositGift } from './DepositGift'
import { DepositRobux } from './DepositRobux'

export const Deposit = () => {
  return (
    <>
      <DepositRobux />
      <DepositGift />
      <DepositCrypto />
    </>
  )
}
