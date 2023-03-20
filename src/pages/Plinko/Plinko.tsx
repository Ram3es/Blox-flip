import BetActions from './BetActions'

export default function Plinko () {
  return (
    <div className='flex justify-center'>
      <div className='bg-blue-accent rounded-lg w-1/4 h-[49.125rem] mr-4'>
        <BetActions />
      </div>
      <div className='bg-blue-primary rounded-lg w-3/4'>game</div>
    </div>
  )
}
