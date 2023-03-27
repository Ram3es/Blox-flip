import PlinkoGame from './PlinkoGame'
import PlinkoActions from './PlinkoActions'

const Plinko = () => {
  return (
    <div className='flex flex-col md:flex-row justify-center space-x-4'>
      <div className='md:w-1/4'>
        <PlinkoActions />
      </div>
      <div className='md:w-3/4'>
        <PlinkoGame />
      </div>
    </div>
  )
}

export default Plinko
