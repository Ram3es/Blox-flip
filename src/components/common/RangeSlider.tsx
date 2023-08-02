import { ChangeEvent, memo } from 'react'

interface RangeSliderProps {
  sliderValueChanged: (eventOrValue: ChangeEvent<HTMLInputElement> | number) => void
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
  return (
    <input
      className="rounded-lg overflow-hidden appearance-none bg-blue-accent-third h-3 w-full cursor-pointer"
      type="range"
      min={min}
      max={max}
      disabled={disabled}
      value={value}
      onChange={sliderValueChanged}
    />
  )
}

export default memo(RangeSlider)
