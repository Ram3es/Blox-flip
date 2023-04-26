import ModalWrapper from './ModalWrapper'

import { QuantityCoins } from '../common/QuantityCoins/QuantityCoins'

import ChallengeIcon from '../icons/ChallengeIcon'
import CheckMarkRoundedIcon from '../icons/CheckMarkRoundedIcon'

interface ChallengeCheckModalProps {
  challenge: any
  onClose: () => void
  handleFunction: Function
}

const ChallengeCheckModal = ({ challenge, onClose }: ChallengeCheckModalProps) => {
  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses='mt-4 md:mt-auto relative py-6 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-4xl w-full m-auto'
    >
      <div className='space-y-6'>
        <div className='flex items-center justify-center flex-col gap-6 border-b-[1px] border-blue-accent-primary pb-8 mb-6 xs:px-28'>
          <div className='flex items-center gap-2'>
            <ChallengeIcon />
            <h3 className='uppercase text-gradient-gold text-xl xs:text-3xl font-black'>challenges</h3>
          </div>
          <span className='xs:text-xl font-medium'>
            Below you will see the challenge you have completed, it’s requirements and what you were
            rewarded.
          </span>
        </div>
        <div className='flex items-center'>
          <div className='w-1/4'>ICON</div>
          <div className='w-3/4 gradient-trivia-info rounded-br-15 rounded-tr-15 py-7'>
            <div className='leading-8 xs:text-22 font-semibold inline-block border-b-[1px] border-blue-accent-primary mx-9 pb-7 mb-6'>
              <h3>
                First to hit <span className='text-gradient-gold'>10x on</span> Wheel with minimum
                <span className='ml-2 inline-block align-top'>
                  <QuantityCoins textSize='22' quantity={1500} />
                </span>{' '}
                wins{' '}
                <span className='ml-2 inline-block align-top'>
                  <QuantityCoins textSize='22' quantity={11500} />
                </span>
              </h3>
            </div>
            <span className='text-green-accent-secondary flex gap-2 items-center justify-center my-auto font-bold xs:text-lg mx-9 xs:mx-0'>
              <CheckMarkRoundedIcon /> You completed and claimed this challenge
            </span>
          </div>
        </div>
        <div className='rounded-15 gradient-trivia-info py-2 xs:px-20 px-4 text-center space-y-6 font-semibold xs:text-base'>
          <p className='text-gray-secondary-light'>
            Please double check the challenge and your bet amounts before proceeding with it
          </p>
          <p className='text-orange-light'>
            We are NOT responsible for any miss-clicks or wrong input amounts when trying to win the
            challenge. You and only you are responsible for your bets.
          </p>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ChallengeCheckModal
