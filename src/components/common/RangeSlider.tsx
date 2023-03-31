import { ChangeEvent, useEffect, useState } from 'react'

interface RangeSliderProps {
  sliderValueChanged: (value: number) => void
  value: number
  min: number
  max: number
  disabled?: boolean
}

const RangeSlider = ({
  value,
  sliderValueChanged,
  min,
  max,
  disabled = false
}: RangeSliderProps) => {
  const [sliderValue, setSliderValue] = useState(value)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    setSliderValue(value)
  }, [value])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value))
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      sliderValueChanged(sliderValue)
    }
  }

  return (
    <div className='range-slider'>
      <input
        className='rounded-lg overflow-hidden appearance-none bg-blue-accent-third h-3 w-full'
        type='range'
        min={min}
        max={max}
        disabled={disabled}
        value={sliderValue}
        onChange={handleChange}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={handleMouseUp}
      />
    </div>
  )
}

export default RangeSlider
