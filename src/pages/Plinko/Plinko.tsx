import BetActions from './BetActions/BetActions'
import GamePlinko from './Game/GamePlinko'

export default function Plinko () {
  return (
    <div className='flex justify-center'>
      <div className='bg-blue-accent rounded-lg w-1/4 py-6 mr-4'>
        <BetActions />
      </div>
      <div className='bg-blue-primary rounded-lg w-3/4 flex items-start justify-center'>
        <GamePlinko />
      </div>
    </div>
  )
}
