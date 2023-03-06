import GamesSection from '../../components/home-page/GamesSection'
import { LiveFeed } from '../../components/LiveFeed/LiveFeed'
import SignInModal from '../../components/modal/SignInModal.'

export const Home = () => {
  return (
    <div>
      <GamesSection />
      <LiveFeed />
    </div>
  )
}
