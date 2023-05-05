import { FC } from 'react'
import { IMAGES } from '../../../constants/images'
import { Button } from '../../base/Button'
import FairIcon from '../../icons/FairIcon'

interface IBoxInfoProps {
  gameVariant: string
  amountRounds: number
  currentRound?: number
}

const GameRoundsInfo: FC<IBoxInfoProps> = ({ gameVariant, amountRounds, currentRound }) => {
  return (
    <div className="bg-dark/15 mb-7">
      <div className="flex items-center justify-between rounded border border-dashed border-blue-highlight bg-blue-accent/40 px-5">
        <div

          className='text-gray-primary text-13 py-1 leading-2 px-4 text-center rounded  border bg-blue-highlight border-blue-highlight my-2'
        >
          {gameVariant}
        </div>
      <div className={`${amountRounds > 18 ? 'pb-5 mb-1 scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full' : ''} flex items-center max-w-[864px]  mx-2  `}>
        {Array.from(Array(amountRounds)).map((_, i) => (
          <div key={i} className="px-1.5 py-3 w-12 shrink-0 relative ">
            <img src={IMAGES.greenBox} alt="caseBox"
              width="56"
              height="62"
              loading="lazy"
              decoding="async"
            />
            <div className=" absolute w-2.5 -inset-x-full m-auto -bottom-1.5">
              {currentRound && currentRound > i
                ? <img src={IMAGES.pointGreen} alt="green-point" width="10" height="10" loading="lazy" decoding="async" />
                : <img src={IMAGES.pointBlue} alt="gray-point" width="10" height="10" loading="lazy" decoding="async" />}

            </div>
          </div>
        )) }
      </div>
      <Button className='relative hover:z-50 rounded text-green-primary border bg-green-primary/15 hover:bg-green-primary/30 border-green-primary whitespace-nowrap px-3.5 py-1 leading-6 cursor-pointer flex items-center'>
        <div className='w-4 shrink-0 mr-2.5'>
          <FairIcon />
        </div>
         Provably fair
      </Button>

    </div>
  </div>
  )
}

export default GameRoundsInfo
