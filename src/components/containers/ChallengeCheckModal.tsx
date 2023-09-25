import ModalWrapper from './ModalWrapper'
import ChallengeIcon from '../icons/ChallengeIcon'
import CheckMarkRoundedIcon from '../icons/CheckMarkRoundedIcon'
import ChallengesCard from '../common/Cards/ChallengesCard'
import CoinsWithDiamond from '../common/CoinsWithDiamond'
import { IChallenge } from '../../types/Challenges'

interface ChallengeCheckModalProps {
  challenge: IChallenge | null
  onClose: () => void
}

const ChallengeCheckModal = ({ challenge, onClose }: ChallengeCheckModalProps) => {
  console.log(challenge, 'ch')
  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses="xs:mt-4 md:mt-auto relative py-6 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-4xl w-full m-auto"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-center flex-col gap-6 border-b-[1px] border-blue-accent-primary pb-8 mb-12 xs:px-28">
          <div className="flex items-center gap-2">
            <ChallengeIcon />
            <h3 className="uppercase text-gradient-gold text-xl xs:text-3xl font-black">challenges</h3>
          </div>
          <span className="xs:text-xl font-medium text-center">{challenge?.name}</span>
        </div>
        <div className="flex flex-col xm:flex-row items-center gradient-trivia-info rounded-15 rounded-tr-15 ">
          <div className="w-2/3 xxxs:w-1/2 xxs:w-1/3 xm:w-1/4 relative h-[248px] ">
            <ChallengesCard
              reward={challenge?.reward ?? 0}
              image={challenge?.image ?? ''}
              isClaimed={challenge?.completed}
              wrapClasses="w-full absolute -top-[42px]"
            />
          </div>
          <div className="w-full xm:w-3/4 py-7">
            <div className="leading-8 xs:text-22 font-semibold  border-b-[1px] border-blue-accent-primary mx-9 pb-7 mb-6">
              <h3>
                First to hit <span className="text-gradient-gold">{challenge?.multiplier}x on</span>{' '}
                {challenge?.game.charAt(0).toUpperCase().concat(challenge?.game.slice(1).toLowerCase()) ?? ''}
                <p>
                  Win bet:{' '}
                  <span className="inline-block align-top">
                    <CoinsWithDiamond
                      iconContainerSize="Large"
                      typographyQuantity={challenge?.min ?? 0}
                      typographyFontSize="Size18"
                    />
                  </span>
                </p>
                <p>
                  Reward:{' '}
                  <span className="inline-block align-top">
                    <CoinsWithDiamond
                      iconContainerSize="Large"
                      typographyQuantity={(challenge?.reward as number) ?? 0}
                      typographyFontSize="Size18"
                    />
                  </span>
                </p>
                <p>
                  Spots: <span className="inline-block text-lg">{challenge?.spots}</span>
                </p>
              </h3>
            </div>
            <span className="text-green-accent-secondary flex gap-2 items-center justify-center my-auto font-bold xs:text-lg mx-9 xs:mx-0">
              <CheckMarkRoundedIcon />
              {challenge?.completed ? 'You completed and claimed this challenge' : 'Your account hits all requirements'}
            </span>
          </div>
        </div>
        {!challenge?.completed && (
          <div className="rounded-15 gradient-trivia-info py-2 xs:px-20 px-4 text-center space-y-6 font-semibold xs:text-base">
            <p className="text-gray-secondary-light">{challenge?.description}</p>
            <p className="text-orange-light">
              We are NOT responsible for any miss-clicks or wrong input amounts when trying to win the challenge. You
              and only you are responsible for your bets.
            </p>
          </div>
        )}
      </div>
    </ModalWrapper>
  )
}

export default ChallengeCheckModal
