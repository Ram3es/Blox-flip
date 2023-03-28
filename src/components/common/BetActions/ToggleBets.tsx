import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '../../base/Button'
import { BetToolkit } from '../../../types/Bets'

type BetToolkitOrNull = BetToolkit | null
interface ToggleBetsProps {
  value: BetToolkitOrNull
  handleChange: (value: BetToolkitOrNull) => void
  betToolkit: () => BetToolkit[]
}

const ToggleBets = ({ value, handleChange, betToolkit }: ToggleBetsProps) => {
  return (
    <RadioGroup value={value} onChange={handleChange}>
      <div className='flex items-center justify-between'>
        {betToolkit().map((toolkit: BetToolkit) => (
          <RadioGroup.Option key={toolkit.label} value={toolkit.label}>
            {({ checked }) => (
              <Button
                color={
                  checked && toolkit.label !== 'Clear' ? 'GreenPrimaryOpacity' : 'BlueHighlight'
                }
                onClick={toolkit.function}
              >
                <span
                  className={clsx('px-2 py-2.5 items-center flex font-bold text-15', {
                    'text-green-primary': checked && toolkit.label !== 'Clear',
                    'text-gray-primary': !checked || toolkit.label === 'Clear'
                  })}
                >
                  {toolkit.label}
                </span>
              </Button>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}

export default ToggleBets
