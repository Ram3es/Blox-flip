import { Button } from '../common/Button/Button'
import { DiamondIcon } from '../DiamondIcon/DiamondIcon'

export const ChatLotteryInput = () => {
  return (
    <div className='relative z-10 rounded border bg-green-primary/15 border-green-primary border-dashed flex items-center justify-between p-1.5'>
      <span className='w-5 h-5 text-center leading-6 shrink-0 bg-green-primary/20 rounded relative mr-2 text-green-primary'>
        <DiamondIcon className='-inset-full absolute m-auto' />
      </span>
      <input
        type='text'
        className='group grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none appearance-none m-0'
        placeholder='...'
      />
      <Button variant='GRADIENT'>Tip Rain</Button>
    </div>
  )
}
