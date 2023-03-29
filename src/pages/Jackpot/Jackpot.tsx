import { Button } from '../../components/base/Button'
import GameInfoListItem from '../../components/common/GameInfoListItem'
import { QuantityCoinsWithChildren } from '../../components/Common/QuantityCoins/QuantityWithChildren'

const Jackpot = () => {
  return (
    <div className="max-w-[1200px] w-full mx-auto">
      <div className="w-full flex-col gap-1">
        <div>Verify Bets</div>
        <div className="w-full flex gap-10">
          <div className="flex flex-col gap-6">
            <div className="w-[492px] h-[492px] flex justify-center items-center">
              game
            </div>
            <div className='max-w-[328px] w-full mx-auto'>
              <div className='flex gap-3 justify-between'>
                <GameInfoListItem label='TOTAL PLAYERS'>
                  <span>23</span>
                </GameInfoListItem>
                <GameInfoListItem label='WIN CHANCE %'>
                  <span className='text-green-primary'>23.59%</span>
                </GameInfoListItem>
                <GameInfoListItem label='YOUR DEPOSIT'>
                  <QuantityCoinsWithChildren quantity={3500} />
                </GameInfoListItem>
              </div>
              <div>
                items
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full">
            <div className="flex w-full gap-3 items-end flex-wrap">
              <GameInfoListItem label='MIN. BET'>
                <QuantityCoinsWithChildren quantity={1500} />
              </GameInfoListItem>
              <GameInfoListItem label='MAX. BET'>
                <QuantityCoinsWithChildren quantity={115500} />
              </GameInfoListItem>
              <GameInfoListItem label='MIN. ITEMS'>
                <span>1</span>
              </GameInfoListItem>
              <GameInfoListItem label='MAX. ITEMS'>
                <span>15</span>
              </GameInfoListItem>
              <Button color='GreenPrimary' variant='Gradient'>
                <div className='w-[121px] h-12 flex justify-center items-center'>
                  Join Game
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jackpot
