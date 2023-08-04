import { IMAGES } from '../../../constants/images'
import { Link } from 'react-router-dom'
import FairIcon from '../../icons/FairIcon'
import { IRootBattle, IRootBattleResult } from '../../../types/CaseBattles'
import { getDisplayedModeByGame } from '../../../helpers/caseBattleHelpers'
import { getRandomId } from '../../../helpers/casesHelpers'

interface IBoxInfoProps {
  game: IRootBattle
  currentRound: IRootBattleResult | null
}

const GameRoundsInfo = ({ game, currentRound }: IBoxInfoProps) => {
  return (
    <div className="bg-dark/15 mb-7">
      <div className="flex items-center justify-between rounded border border-dashed border-blue-highlight bg-blue-accent/40 px-5">
        <div

          className='text-gray-primary text-13 py-1 leading-2 px-4 text-center rounded  border bg-blue-highlight border-blue-highlight my-2'
        >
          {getDisplayedModeByGame(game)}
        </div>
      <div className={`${game.caselist.length > 18 ? 'pb-5 mb-1 scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full' : ''} flex items-center max-w-[864px] mx-2`}>
        {game.caselist.map((item, index) => (
          <div key={item.name + getRandomId()} className="px-1.5 py-3 w-12 shrink-0 relative">
            <img src={item.image} alt={item.name}
              width="56"
              height="62"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute w-2.5 -inset-x-full m-auto -bottom-1.5">
              {currentRound && currentRound.round > index
                ? <img src={IMAGES.pointGreen} alt="green-point" width="10" height="10" loading="lazy" decoding="async" />
                : <img src={IMAGES.pointBlue} alt="gray-point" width="10" height="10" loading="lazy" decoding="async" />}
            </div>
          </div>
        )) }
      </div>
      <Link
        to='/provably-fair#battle'
        className='relative hover:z-50 rounded text-green-primary border bg-green-primary/15 hover:bg-green-primary/30 border-green-primary whitespace-nowrap px-3.5 py-1 leading-6 cursor-pointer flex items-center'>
        <div className='w-4 shrink-0 mr-2.5'>
          <FairIcon />
        </div>
         Provably fair
      </Link>
    </div>
  </div>
  )
}

export default GameRoundsInfo
