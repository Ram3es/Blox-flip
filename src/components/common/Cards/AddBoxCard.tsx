import { PlusIcon } from '../../icons/PlusIcon'

const AddBoxCard = ({ openModal }: { openModal: Function }) => {
  return (
    <div className='p-1.5 w-full xxxs:w-1/2 xxs:w-1/3 xs:w-1/4 md:w-1/5  lg:w-1/6 shrink-0'>
      <div
        onClick={() => openModal()}
        className='overflow-hidden text-sm h-full text-center relative z-20 bg-blue-accent-secondary/30 bg-gradient-to-t from-dark/20 to-dark/20 flex flex-col items-center justify-center rounded cursor-pointer'
      >
        <div className='absolute text-gray-primary rounded-2xl w-16 h-16 bg-blue-accent-secondary/30 bg-gradient-to-t from-dark/20 to-dark/20  group hover:bg-blue-accent cursor-pointer flex justify-center items-center'>
          <PlusIcon
            className='w-[18px] h-[18px]  group-hover:text-white'
          />
        </div>
        <div className='pb-60% ' >
          <div className='h-[170px]' />
        </div>
      </div>
    </div>
  )
}

export default AddBoxCard
