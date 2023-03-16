import { DepositCrypto } from './DepositCrypto'
import { DepositRobux } from './DepositRobux'

export const Deposit = () => {
  return (
    <>
      <DepositRobux />
      <DepositCrypto />
    </>
  )
}
