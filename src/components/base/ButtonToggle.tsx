interface IButtonToggleProps<T extends { variant: string }> {
  options: T[]
  currentSelect: T
  peakFunction: Function
  activeClasses?: string
  btnClasses?: string
}

const ButtonsToggle = <T extends { variant: string }>({
  options,
  currentSelect,
  peakFunction,
  activeClasses,
  btnClasses
}: IButtonToggleProps<T>) => {
  return (
    <div className='flex gap-2 ls:gap flex-wrap'>
      {options.map((option, index) => (
        <button
          className={`${
            btnClasses ??
            'text-gray-primary text-13 py-1.5 leading-2 px-4 text-center rounded  mx-1 border bg-blue-highlight border-blue-highlight shadow-dark-5 hover:text-white'
          }${
            option === currentSelect
              ? activeClasses ?? ' text-white border bg-blue-highlight/25 cursor-default'
              : ''
          }`}
          onClick={() => peakFunction(option)}
          key={index}
        >
          {option.variant}
        </button>
      ))}
    </div>
  )
}
export default ButtonsToggle
