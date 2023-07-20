import { useEffect, useState } from 'react'
import LeaderBoardIcon from '../../assets/img/leaderboard.svg'
import FighterFirstIcon from '../../assets/img/leaderboard1.png'
import FighterSecondIcon from '../../assets/img/leaderboard2.png'
import { useSocketCtx } from '../../store/SocketStore'
import { LeaderboardPodium } from './LeaderboardPodium'
import { LeaderboardTable } from './LeaderboardTable'
import { ILeaderbordData } from '../../types/Affilates'
import { ILeaderboardUser } from '../../types/User'
import { getTopThreeUsers } from '../../helpers/leaderboardHelpers'
import { getToast } from '../../helpers/toast'

export const Leaderboard = () => {
  const [boardData, setBoardData] = useState<ILeaderboardUser[]>([])
  const { socket } = useSocketCtx()

  useEffect(() => {
    socket.emit('load_leaderboards', (err: string | boolean, data: ILeaderbordData[]) => {
      if (typeof err === 'string') {
        getToast(err)
      }

      if (!err) {
        setBoardData(
          data.map((item) => ({
            ...item.user,
            bet: item.wagered,
            profit: item.reward
          }))
        )
      }
    })
  }, [])
  return (
    <div className="max-w-5xl w-full mx-auto">
      <div className="flex flex-wrap xxs:flex-nowrap items-end relative">
        <div className="w-1/3 xxs:w-1/4 shrink-0 pr-12 order-2 xxs:order-1  absolute left-0 top-0 xxs:static z-10">
          <img
            src={FighterFirstIcon}
            alt=""
            width="159"
            height="302"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="w-full xxs:w-auto grow text-center yellow--shadow order-1 xxs:order-2 z-20 pb-12">
          <div className="mb-5">
            <img
              src={LeaderBoardIcon}
              alt=""
              width="69"
              height="61"
              loading="lazy"
              decoding="async"
              className="mx-auto"
            />
          </div>
          <div className="font-black xxs:text-3xl xs:text-5xl sm:text-4xl md:text-5xl bg-clip-text text-transparent gradient-yellow-text mb-2.5">
            LEADERBOARD
          </div>
          <div className="text-base">
            This is the weekly leaderboard, where users can compete against each other to reach the
            number one spot to earn the best rewards!
          </div>
        </div>
        <div className="w-2/5 ml-auto xxs:w-1/4 shrink-0 pl-12 order-3 absolute right-0 top-4 xxs:static z-10">
          <img
            src={FighterSecondIcon}
            alt=""
            width="175"
            height="234"
            loading="lazy"
            decoding="async"
            className="mx-auto"
          />
        </div>
      </div>
      <LeaderboardPodium users={getTopThreeUsers(boardData, 'level')} />
      <div className="pb-5 border-b border-blue-highlight mb-6"></div>
      <LeaderboardTable data={boardData} />
    </div>
  )
}
