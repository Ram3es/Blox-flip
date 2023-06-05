import { memo, useEffect, useState } from 'react'
import LabelList from '../../components/common/LabelList'
import { getColorHistory, getItemColorByName } from '../../helpers/wheelHelpers'
import { possibleBets } from '../../types/Wheel'

interface IWheelGamesHistory {
  historyGames: possibleBets[]
}

type BetHistoryRecord = Record<possibleBets, possibleBets[]>

const WheelGamesHistory = memo(({ historyGames }: IWheelGamesHistory) => {
  const [sortedBetsHistory, setSortedBetsHistory] = useState<BetHistoryRecord>()

  const container: BetHistoryRecord = {
    [possibleBets.GREY]: [],
    [possibleBets.BLUE]: [],
    [possibleBets.YELLOW]: [],
    [possibleBets.RED]: []
  }

  const betsHistoryData = (history: possibleBets[]): BetHistoryRecord => {
    return history.reduce((prev, item) => {
      prev[item].push(item)
      return prev
    }, container)
  }

  useEffect(() => {
    setSortedBetsHistory(betsHistoryData(historyGames))
  }, [historyGames])

  console.log(historyGames)

  return (
    <div className='flex flex-col md:flex-row gap-4 w-full md:w-auto overflow-hidden md:overflow-visible'>
      <div className='flex flex-row md:flex-col gap-5'>
        <LabelList>Last 20</LabelList>
        <div className='flex flex-row md:flex-col gap-2'>
          {historyGames.slice(-20).reverse()?.map((game, idx) => (
            <div
              key={`lats-20-games-${idx}`}
              className="w-6 h-2 rounded-full"
              style={{ background: getColorHistory(game) }}
            />
          ))}
        </div>
      </div>
      <div className='flex flex-row md:flex-col gap-5 items-start'>
        <LabelList>Last 100</LabelList>
        <div className='flex flex-row md:flex-col'>
           { sortedBetsHistory && Object.keys(sortedBetsHistory).map((game, i) => (
            <div
              key={`bet-history-${i}`}
              className='grid gap-2 grid-cols-2 items-center'
              style={{ color: getItemColorByName(game as possibleBets, false) }}
            >
              {sortedBetsHistory?.[game as possibleBets].length}
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
})
WheelGamesHistory.displayName = 'WheelGamesHistory'
export default WheelGamesHistory
