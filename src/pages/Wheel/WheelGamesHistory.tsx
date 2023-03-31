import { useEffect, useState } from 'react'
import LabelList from '../../components/common/LabelList'
import { getItemColorByIndex, getItemColorByName } from '../../helpers/wheelHelpers'
import { IWheelBetHistory, IWheelGameHistory, possibleBets } from '../../types/Wheel'

interface IWheelGamesHistory {
  gamesHistory: IWheelGameHistory[]
  betsHistory: IWheelBetHistory[]
}

type BetHistoryRecord = Record<possibleBets, IWheelBetHistory[]>

const WheelGamesHistory = ({ gamesHistory, betsHistory }: IWheelGamesHistory) => {
  const [sortedBetsHistory, setSortedBetsHistory] = useState<BetHistoryRecord>({
    [possibleBets.GREY]: [],
    [possibleBets.BLUE]: [],
    [possibleBets.YELLOW]: [],
    [possibleBets.RED]: []
  })
  const betsHistoryData = (history: IWheelBetHistory[]): BetHistoryRecord => {
    return history.reduce((prev, item) => {
      prev[item.betColor].push(item)
      return prev
    }, sortedBetsHistory)
  }

  useEffect(() => {
    setSortedBetsHistory(() => betsHistoryData(betsHistory))
  }, [betsHistory])

  return (
    <div className='flex flex-col md:flex-row gap-4 w-full md:w-auto overflow-hidden md:overflow-visible'>
      <div className='flex flex-row md:flex-col gap-5'>
        <LabelList>Last 20</LabelList>
        <div className='flex flex-row md:flex-col gap-2'>
          {gamesHistory?.map(game => (
            <div
              key={`lats-20-games-${game.gameId}`}
              className="w-6 h-2 rounded-full"
              style={{ background: getItemColorByIndex(game.ticket, false) }}
            />
          ))}
        </div>
      </div>
      <div className='flex flex-row md:flex-col gap-5 items-start'>
        <LabelList>Last 100</LabelList>
        <div className='flex flex-row md:flex-col'>
          {Object.keys(sortedBetsHistory).map((game, i) => (
            <div
              key={`bet-history-${i}`}
              className='grid gap-2 grid-cols-2 items-center'
              style={{ color: getItemColorByName(game as possibleBets, false) }}
            >
              {sortedBetsHistory[game as possibleBets].length}
              <div
                className="w-6 h-2 rounded-full"
                style={{ background: getItemColorByName(game as possibleBets, false) }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WheelGamesHistory
