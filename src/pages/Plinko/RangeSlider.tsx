import { ChangeEvent, InputHTMLAttributes, memo, useEffect, useState } from 'react'

interface RangeSliderProps extends InputHTMLAttributes<HTMLInputElement> {
  sliderValueChanged: (value: number) => void
  value: number
}

const RangeSlider = memo(({ sliderValueChanged, value, ...inputProps }: RangeSliderProps) => {
  const [sliderValue, setSliderValue] = useState(value || 0)
  const [mouseState, setMouseState] = useState<string>('')

  useEffect(() => {
    setSliderValue(value)
  }, [value])

  const changeCallback = (event: ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value))
  }

  useEffect(() => {
    if (mouseState === 'up') {
      sliderValueChanged(sliderValue)
    }
  }, [mouseState])

  return (
    <div className='range-slider'>
      <input
        className='rounded-lg overflow-hidden appearance-none bg-blue-accent-third h-3 w-full'
        type='range'
        value={value}
        onChange={changeCallback}
        onMouseDown={() => setMouseState('down')}
        onMouseUp={() => setMouseState('up')}
        {...inputProps}
      />
    </div>
  )
})

RangeSlider.displayName = 'RangeSlider'

export default RangeSlider
