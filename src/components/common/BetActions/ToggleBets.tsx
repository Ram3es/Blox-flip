import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '../../base/Button'
import { BetToolkit } from '../../../types/Bets'
import { BaseSize } from '../../../types/enums'

type BetToolkitOrNull = BetToolkit | null
interface ToggleBetsProps {
  value: BetToolkitOrNull
  handleChange: (value: BetToolkitOrNull) => void
  betToolkit: BetToolkit[]
  buttonSize?: keyof typeof BaseSize
}

const ToggleBets = ({ value, handleChange, betToolkit, buttonSize = 'LARGE' }: ToggleBetsProps) => {
  return (
    <RadioGroup value={value} onChange={handleChange}>
      <div className='flex items-center justify-between space-x-2'>
        {betToolkit.map((toolkit: BetToolkit) => (
          <RadioGroup.Option key={toolkit.label} value={toolkit.label}>
            {({ checked }) => (
              <Button
                color={
                  checked && toolkit.label !== 'Clear' ? 'GreenPrimaryOpacity' : 'BlueHighlight'
                }
                onClick={toolkit.function}
              >
                <span
                  className={clsx('px-2 items-center flex font-bold text-15', {
                    'text-green-primary': checked && toolkit.label !== 'Clear',
                    'text-gray-primary': !checked || toolkit.label === 'Clear',
                    'py-2': buttonSize === BaseSize.LARGE,
                    'py-1.5': buttonSize === BaseSize.MEDIUM,
                    'py-1': buttonSize === BaseSize.SMALL

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
