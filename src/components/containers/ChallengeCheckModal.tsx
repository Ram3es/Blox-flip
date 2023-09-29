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
      modalClasses="max-w-3xl w-full h-[85%] xxs:h-max m-auto xs:mt-4 md:mt-auto py-6 px-4 xs:px-6  rounded-2xl shadow-dark-15 gradient-blue-primary relative "
    >
      <div className="h-full space-y-3 xxs:space-y-6">
        <div className="flex items-center justify-center flex-col gap-2  xxs:gap-6 border-b-[1px] border-blue-accent-primary pb-4 xxs:pb-8 xs:px-28">
          <div className="flex items-center gap-2">
            <ChallengeIcon />
            <h3 className="uppercase text-gradient-gold text-xl xs:text-3xl font-black">challenges</h3>
          </div>
          <span className="xs:text-xl font-medium text-center max-w-full truncate ">{challenge?.name}</span>
        </div>
        <div className='h-[calc(100%_-_90px)] xxs:h-full flex flex-col gap-6 overflow-y-scroll xxs:overflow-hidden pt-[28px] '>
        <div className="flex flex-col xm:flex-row items-center gradient-trivia-info rounded-15 rounded-tr-15  ">
          <div className="w-2/3 xxxs:w-1/2 xxs:w-1/3 xm:w-1/4 relative h-[248px] ">
            <ChallengesCard
              reward={challenge?.reward ?? 0}
              image={challenge?.image ?? ''}
              isClaimed={challenge?.completed}
              wrapClasses="w-full absolute -top-[42px] xxs:-top-[52px]"
            />
          </div>
          <div className="w-full xm:w-3/4 py-7">
            <div className="leading-8 xs:text-22 font-semibold  border-b-[1px] border-blue-accent-primary mx-9 pb-7 mb-6">
              <h3>
                First to hit <span className="text-gradient-gold">{challenge?.multiplier}x on</span>{' '}
                {challenge?.game.charAt(0).toUpperCase().concat(challenge?.game.slice(1).toLowerCase()) ?? ''}
                <p className="flex items-center gap-1">
                  Min bet:{' '}
                  <CoinsWithDiamond
                    iconContainerSize="Medium"
                    typographyQuantity={challenge?.min ?? 0}
                    typographyFontSize="Size18"
                  />
                </p>
                <p className="flex items-center gap-1">
                  Reward:{' '}
                  <CoinsWithDiamond
                    iconContainerSize="Medium"
                    typographyQuantity={(challenge?.reward as number) ?? 0}
                    typographyFontSize="Size18"
                  />
                </p>
                <p>
                  Spots: <span className="text-lg ml-1">{challenge?.spots}</span>
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
      </div>
    </ModalWrapper>
  )
}

export default ChallengeCheckModal
