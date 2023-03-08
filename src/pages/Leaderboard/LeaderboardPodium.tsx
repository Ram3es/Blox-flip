import { useState } from 'react'
import { getPlaceByIndex, getTopThreeUsers } from '../../helpers/leaderboardHelpers'
import { ISecondUser } from '../../types/User'
import { users } from './mock'
import { PodiumItem } from './PodiumItem'

export const LeaderboardPodium = () => {
  const [topThreeUsers] = useState<ISecondUser[]>([...getTopThreeUsers(users, 'level')])

  const fakeUsers: ISecondUser[] = new Array(3 - topThreeUsers.length).fill({
    isWinner: true,
    game: 'game 64',
    date: '2047-06-14T19:24:08.234Z',
    bet: 0,
    rate: 0,
    profit: 0,
    username: 'No data',
    avatar: '',
    level: 0,
    id: '64'
  })
  const usersToRender = [...topThreeUsers, ...fakeUsers]

  return (
    <div className='flex flex-wrap items-end'>
      {usersToRender.map((user, index) => (
        <PodiumItem key={user.id} user={user} place={getPlaceByIndex(index)} />
      ))}
    </div>
  )
}
