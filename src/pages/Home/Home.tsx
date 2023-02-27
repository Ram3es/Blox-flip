import GamesSection from '../../components/home-page/GamesSection'
import SignInModal from '../../components/modal/SignInModal.'
import { LiveFeed } from '../../components/LiveFeed/LiveFeed'

export const Home = () => {
  return (
    <div>
      <GamesSection />
      <LiveFeed />
      <SignInModal />
    </div>
  )
}
