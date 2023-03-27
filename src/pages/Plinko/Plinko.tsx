import PlinkoGame from './PlinkoGame'
import PlinkoActions from './PlinkoActions'

const Plinko = () => {
  return (
    <div className='flex flex-col md:flex-row justify-center'>
      <PlinkoActions />
      <div className='bg-blue-primary rounded-lg md:w-3/4 flex justify-center'>
        <PlinkoGame />
      </div>
    </div>
  )
}

export default Plinko
