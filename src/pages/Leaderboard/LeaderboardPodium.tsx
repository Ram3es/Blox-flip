import { PodiumItem } from './PodiumItem'

export const LeaderboardPodium = () => {
  const user1 = {
    isWinner: true,
    game: 'game 3',
    date: '2032-07-12T23:46:58.567Z',
    bet: 78,
    rate: 91,
    profit: 8.08,
    username: 'Alexis35',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/367.jpg',
    level: 56,
    id: '3'
  }
  const user2 = {
    isWinner: true,
    game: 'game 5',
    date: '2086-12-26T12:28:31.792Z',
    bet: 65,
    rate: 39,
    profit: 1,
    username: 'Kaela.Feeney',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/578.jpg',
    level: 42,
    id: '5'
  }

  const user3 = {
    isWinner: true,
    game: 'game 7',
    date: '2041-03-29T23:21:53.766Z',
    bet: 7,
    rate: 18,
    profit: 59,
    username: 'Marlene.Muller',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1104.jpg',
    level: 82,
    id: '7'
  }

  return (
    <div className='flex flex-wrap items-end'>
      <PodiumItem user={user1} place={1} />
      <PodiumItem user={user2} place={2} />

      <PodiumItem user={user3} place={3} />
    </div>
  )
}
