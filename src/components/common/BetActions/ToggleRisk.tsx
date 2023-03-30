import clsx from 'clsx'
import { RiskVariant } from '../../../types/enums'
import { GreenRhombusIcon } from '../../icons/GreenRhombusIcon'
import { RhombusIcon } from '../../icons/RhombusIcon'

interface ToggleRiskProps {
  value: keyof typeof RiskVariant
  handleChange: (value: keyof typeof RiskVariant) => void
  isBlocked?: boolean
}

const ToggleRisk = ({ value, handleChange, isBlocked = false }: ToggleRiskProps) => {
  return (
    <div
      className={`${
        isBlocked ? 'pointer-events-none' : 'pointer-event-auto'
      } flex items-start justify-between text-17`}
    >
      <div className='bg-blue-highlight rounded px-3 py-1 items-center flex font-bold text-gray-primary'>
        <span className='gradient-gold-yellow-text font-bold'>Risk</span>
      </div>
      {Object.keys(RiskVariant).map((risk) => (
        <div
          key={risk}
          onClick={() => {
            handleChange(risk as keyof typeof RiskVariant)
          }}
          className='flex flex-col items-center space-y-2 cursor-pointer'
        >
          <span
            className={clsx('', {
              '': value === risk,
              'text-gray-primary': value !== risk
            })}
          >
            {risk}
          </span>
          {value === risk ? <GreenRhombusIcon /> : <RhombusIcon />}
        </div>
      ))}
    </div>
  )
}

export default ToggleRisk
