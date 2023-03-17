import { InputHTMLAttributes, memo, useEffect, useState } from 'react'

interface RangeSliderProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: () => void
  value: number
}

const RangeSlider = memo(({ onChange, value, ...inputProps }: RangeSliderProps) => {
  const [sliderVal, setSliderVal] = useState(0)
  const [mouseState, setMouseState] = useState(null)

  useEffect(() => {
    setSliderVal(value)
  }, [value])

  const changeCallback = (e: any) => {
    setSliderVal(e.target.value)
  }

  useEffect(() => {
    if (mouseState === 'up') {
      onChange(sliderVal)
    }
  }, [mouseState])

  return (
    <div className='range-slider'>
      <input
        className='bg-green-primary'
        type='range'
        value={sliderVal}
        id='myRange'
        onChange={changeCallback}
        onMouseDown={() => console.log('hi')}
        onMouseUp={() => console.log('hi')}
      />
    </div>
  )
})

RangeSlider.displayName = 'RangeSlider'

export default RangeSlider
