
const PulseGreenPoint = () => {
  return (
        <span className='w-[12px] h-[12px] relative flex '>
          <span className=" absolute animate-ping inline-flex h-full w-full rounded-full bg-green-primary-light opacity-75" />
          <span className="relative translate-x-1/4  translate-y-1/4 w-[8px] h-[8px] inline-flex rounded-full bg-green-primary "/>
        </span>
  )
}

export default PulseGreenPoint
