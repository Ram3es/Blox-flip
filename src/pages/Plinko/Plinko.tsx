import BetActions from './BetActions/BetActions'
import GamePlinko from './Game/GamePlinko'

export default function Plinko() {
  return (
    <div className='flex flex-col md:flex-row justify-center'>
      <div className='bg-blue-accent rounded-lg md:w-1/4 w-full py-6 mr-4'>
        <BetActions />
      </div>
      <div className='bg-blue-primary rounded-lg md:w-3/4 w-full flex items-start justify-center'>
        <GamePlinko />
      </div>
    </div>
  )
}
