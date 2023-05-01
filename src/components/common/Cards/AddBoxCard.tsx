import { PlusIcon } from '../../icons/PlusIcon'

const AddBoxCard = ({ openModal }: { openModal: Function }) => {
  return (
    <div className='p-1.5 w-1/2 xxs:w-1/3 xs:w-1/4 md:w-1/6 shrink-0 lg:w-1/6'>
      <div
        onClick={() => openModal()}
        className='overflow-hidden text-sm min-h-[244px] h-full text-center relative z-20 bg-blue-accent-secondary/30 bg-gradient-to-t from-dark/20 to-dark/20 flex flex-col items-center justify-center rounded cursor-pointer'
      >
        <div className='text-gray-primary rounded-2xl w-16 h-16 bg-blue-accent-secondary/30 bg-gradient-to-t from-dark/20 to-dark/20 relative group hover:bg-blue-accent cursor-pointer'>
          <PlusIcon
            width={18}
            height={18}
            className='absolute inset-0 m-auto group-hover:text-white'
          />
        </div>
      </div>
    </div>
  )
}

export default AddBoxCard
