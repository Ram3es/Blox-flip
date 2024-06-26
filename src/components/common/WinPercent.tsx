interface WinPercentProps {
  percent?: number
}

const WinPercent = ({ percent }: WinPercentProps) => {
  return (
    <div className='w-[90px] h-9 bg-blue-ocean-secondary/25 border-2 border-blue-ocean-secondary/50 px-3 md:px-4 rounded font-bold text-sm flex items-center'>
      {percent ?? <span className='text-blue-ocean-third'>...</span>}
      <span className='text-gray-primary uppercase font-semibold text-xs pt-0.5'>
        &nbsp;<span className='font-semibold text-base'>%</span>
      </span>
    </div>
  )
}

export default WinPercent
