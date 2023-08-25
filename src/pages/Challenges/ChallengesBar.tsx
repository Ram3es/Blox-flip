import { useMemo, useState } from 'react'
import SortSelect from '../../components/common/SortSelect'
import { CHALLENGE_SORT_VARIANTS } from '../../constants/sorting'
import ButtonsToggle from '../../components/base/ButtonToggle'
import { Button } from '../../components/base/Button'
import ChallengesCard from '../../components/common/Cards/ChallengesCard'
import { IChallenge } from '../../types/Challenges'

const TOGGLE_VARIANTS = [{ variant: 'All' }, { variant: 'Claimed' }]

interface ChallengesBarProps {
  challenges: IChallenge[]
  openChallengeModal: Function
  openAdminModal: Function
  userRole?: string
}

const ChallengesBar = ({ openChallengeModal, openAdminModal, userRole = 'admin', challenges }: ChallengesBarProps) => {
  const [filterClaimed, setFilteringVariant] = useState(TOGGLE_VARIANTS[0])
  const [gameFilter, setGameFilter] = useState(CHALLENGE_SORT_VARIANTS[0])

  const filtered = useMemo(
    () => (gameFilter.value === 'all' ? challenges : challenges.filter((card) => card.name === gameFilter.value)),
    [gameFilter.value, challenges]
  )

  const filterClaimedStatus = useMemo(
    () => (filterClaimed.variant === 'Claimed' ? filtered.filter((card) => card.completed) : filtered),
    [filterClaimed, filtered]
  )

  return (
    <div>
      <div className="relative mb-[130px] xm:mb-[100px] md:mb-10">
        <div className="w-full flex items-center relative ">
          <div className="w-1/2 h-[1px] gradient-line-divider rotate-180"></div>
          <div className="px-2 bg-transparent ">
            <div className="text-gray-primary text-base py-1 leading-2 px-4 text-center rounded  mx-1 border bg-blue-highlight border-blue-highlight shadow-dark-5 hover:text-white">
              Challenges
            </div>
          </div>
          <div className="w-1/2 h-[1px]  gradient-line-divider"></div>
          <div className="w-full flex flex-wrap justify-between items-center absolute top-11 md:top-0 ">
            <SortSelect options={CHALLENGE_SORT_VARIANTS} onSelect={setGameFilter} currentOptions={gameFilter.title} />
            <div className="flex flex-wrap items-center ml-3 mt-2 xxxs:mt-0">
              {userRole === 'admin' && (
                <Button
                  onClick={() => openAdminModal()}
                  className="challenge-btn-gradient text-sm py-1.5  px-4 text-center rounded  mr-3 hover:opacity-80"
                >
                  Create challenge
                </Button>
              )}
              <ButtonsToggle
                options={TOGGLE_VARIANTS}
                currentSelect={filterClaimed}
                peakFunction={setFilteringVariant}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-wrap -mx-2 mb-8 md:mb-12">
        {filterClaimedStatus.map((card) => (
          <ChallengesCard
            key={card.name}
            isClaimed={card.completed}
            reward={card.reward}
            image={card.image}
            openModal={() => openChallengeModal(card)}
          />
        ))}
      </div>
    </div>
  )
}

export default ChallengesBar
