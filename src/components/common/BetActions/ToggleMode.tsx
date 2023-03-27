import clsx from 'clsx'
import { MouseEventHandler } from 'react'
import { BetMode } from '../../../types/Plinko'
import { Button } from '../../base/Button'

interface ToggleModeProps {
  mode: keyof typeof BetMode
  handleChange: MouseEventHandler<HTMLButtonElement>
}

const ToggleMode = ({ mode, handleChange }: ToggleModeProps) => {
  return (
    <div className='flex items-center'>
      {Object.keys(BetMode).map((tab) => (
        <Button
          key={tab}
          onClick={handleChange}
          className={clsx(
            'capitalize font-semibold text-17 w-full h-11 border-b-[1px] flex items-center justify-center',
            {
              'text-blue-golf border-blue-golf bg-blue-golf': mode === tab,
              'text-gray-primary border-blue-light-primary': mode !== tab
            }
          )}
        >
          {tab}
        </Button>
      ))}
    </div>
  )
}

export default ToggleMode
