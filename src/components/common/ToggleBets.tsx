import { FC } from 'react'
import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import { Button } from '../base/Button'
import { BetToolkit } from '../../types/Bets'

type BetToolkitOrNull = BetToolkit | null
interface ToggleBetsProps {
  value: BetToolkitOrNull
  handleChange: (value: BetToolkitOrNull) => void
  betToolkitArray: BetToolkit[]
}

const ToggleBets: FC<ToggleBetsProps> = ({ value, handleChange, betToolkitArray }) => {
  return (
    <RadioGroup value={value} onChange={handleChange}>
      <div className='flex items-center justify-between'>
        <Button color='BlueHighlight' onClick={() => handleChange(null)}>
          <span className='px-2 py-2.5 items-center flex font-bold text-15 text-gray-primary'>
            Clear
          </span>
        </Button>
        {betToolkitArray?.map((toolkit: BetToolkit) => (
          <RadioGroup.Option key={toolkit.label} value={toolkit.label}>
            {({ checked }) => (
              <Button
                color={checked ? 'GreenPrimaryOpacity' : 'BlueHighlight'}
                onClick={toolkit.function}
              >
                <span
                  className={clsx('px-2 py-2.5 items-center flex font-bold text-15', {
                    'text-green-primary': checked,
                    'text-gray-primary': !checked
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
