import GamesSection from '../../components/home-page/GamesSection'
import { LiveFeed } from '../../components/LiveFeed/LiveFeed'

export const Home = () => {
  return (
    <div>
      <GamesSection />
      <SignInModal isAuth={false} />
      <LiveFeed />
    </div>
  )
}
