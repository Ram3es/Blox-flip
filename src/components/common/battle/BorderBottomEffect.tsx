import clsx from 'clsx'

interface BorderBottomEffectProps {
  isWinner: boolean
  isVisible: boolean
}

const BorderBottomEffect = ({ isWinner, isVisible }: BorderBottomEffectProps) => {
  return (
    <div
      className={clsx('relative z-10', {
        block: isVisible,
        hidden: !isVisible
      })}
    >
      <span
        className={clsx('border w-1/2 absolute -inset-x-full mx-auto bottom-0 z-20', {
          'border-green-primary': isWinner,
          'border-red-primary': !isWinner
        })}
      />
    </div>
  )
}

export default BorderBottomEffect
