import PlinkoGame from './PlinkoGame'
import PlinkoActions from './PlinkoActions'

const Plinko = () => {
  return (
    <div className='flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4'>
      <div className='md:w-1/4 w-full'>
        <PlinkoActions />
      </div>
      <div className='md:w-3/4 w-full'>
        <PlinkoGame />
      </div>
    </div>
  )
}

export default Plinko
