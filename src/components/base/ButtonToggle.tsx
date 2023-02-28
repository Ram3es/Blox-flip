import { Button } from './Button'

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
    <div className='flex gap-2'>
      {options.map((option, index) => (
        <Button
          className={`py-2 px-3 rounded capitalize w-max ${
            option === currentSelect
              ? 'text-white border bg-blue-higlight-2 border-blue-highlight cursor-default'
              : 'text-purple bg-blue-highlight shadow-dark-5 hover:bg-blue-accent'
          }`}
          onClick={() => peackFunction(option)}
          key={index}
        >
          {option}
        </Button>
      ))}
    </div>
  )
}
export default ButtonsToggle
