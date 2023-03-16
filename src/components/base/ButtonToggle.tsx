
const ButtonsToggle = ({
  options,
  currentSelect,
  peackFunction,
  activeClasses,
  btnClasses
}: {
  options: string[]
  currentSelect: string
  peackFunction: Function
  activeClasses?: string
  btnClasses?: string
}) => {
  return (
        <div className= 'flex gap'>
          {options.map((option, index) => <button
            className={`${btnClasses ?? 'text-gray-primary text-13 py-1.5 leading-2 px-4 text-center rounded  mx-1 border bg-blue-highlight border-blue-highlight shadow-dark-5 hover:text-white'}${option === currentSelect ? activeClasses ?? ' text-white border bg-blue-highlight/25 cursor-default' : ''}`}
            onClick={() => peackFunction(option)}
            key={index}>{option}</button>)}
        </div>
  )
}
export default ButtonsToggle
