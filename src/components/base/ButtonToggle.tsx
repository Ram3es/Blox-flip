
const ButtonsToggle = ({
  options,
  currentSelect,
  peackFunction
}: {
  options: string[]
  currentSelect: string
  peackFunction: Function
}) => {
  return (
        <div className="flex gap">
          {options.map((option, index) => <button
            className={`text-gray-primary text-13 py-1.5 leading-2 px-4 text-center rounded  mx-1 border bg-blue-highlight border-blue-highlight ${option === currentSelect ? 'text-white border bg-blue-highlight/25 cursor-default' : ' bg-blue-highlight shadow-dark-5 border-transparent hover:text-white'}`}
            onClick={() => peackFunction(option)}
            key={index}>{option}</button>)}
        </div>
  )
}
export default ButtonsToggle
