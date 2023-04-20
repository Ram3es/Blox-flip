import ChallengesCard from '../../components/common/Cards/ChallengesCard'
import GamesSection from '../../components/home-page/GamesSection'
import { LiveFeed } from '../../components/live-feed/LiveFeed'

export const Home = () => {
  return (
    <div>
      <GamesSection />
      <LiveFeed />
      <ChallengesCard />
    </div>
  )
}
