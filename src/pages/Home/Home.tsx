import GamesSection from '../../components/home-page/GamesSection'
import SignInModal from '../../components/modal/SignInModal.'
import { LiveFeed } from '../../components/LiveFeed/LiveFeed'
import { Transactions } from '../../components/Transactions/Transactions'

export const Home = () => {
  return (
    <div>
      {/* <GamesSection /> */}
      {/* <SignInModal isAuth={false} /> */}
      <LiveFeed />
      <Transactions />
      {/* <SignInModal /> */}
    </div>
  )
}
