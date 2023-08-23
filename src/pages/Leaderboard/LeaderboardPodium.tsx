import { getPlaceByIndex } from '../../helpers/leaderboardHelpers'
import { ILeaderboardUserData } from '../../types/Leaderboard'

import { PodiumItem } from './PodiumItem'

export const LeaderboardPodium = ({ users }: { users: ILeaderboardUserData[] }) => {
  return (
    <div className="flex flex-wrap items-end">
      {users.map(({ place, ...user }, index) => (
        <PodiumItem key={user.id} {...user} place={getPlaceByIndex(index)} />
      ))}
    </div>
  )
}
