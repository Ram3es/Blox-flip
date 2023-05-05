import React, { useCallback, useContext, useState } from 'react'
import ChallengesBar from './ChallengesBar'
import { Context } from '../../store/Store'
import ChallengesBanner from './ChallengesBanner'
import ChallengeCreationModal from '../../components/containers/ChallengeCreationModal'
import ChallengeCheckModal from '../../components/containers/ChallengeCheckModal'
import { IChallengeCard } from '../../mocks/challenges'

const Challenges = () => {
  const [isOpenChallengeCreation, setIsOpenChallengeCreation] = useState(false)
  const [isOpenChallengeCheck, setIsOpenChallengeCheck] = useState<{ isOpen: boolean, challengeCard: IChallengeCard | null }>({ isOpen: false, challengeCard: null })

  const { state } = useContext(Context)

  const handleCloseChallengeCreation = useCallback(() => {
    setIsOpenChallengeCreation(false)
  }, [])

  const handleCloseChallengeCheck = useCallback(() => {
    setIsOpenChallengeCheck(prev => ({ ...prev, isOpen: false }))
  }, [])

  const openChallengeModal = (challengeCard: IChallengeCard) => {
    setIsOpenChallengeCheck(prev => ({ ...prev, isOpen: !prev.isOpen, challengeCard }))
  }

  return (
        <div className='max-w-5xl w-full mx-auto'>
          <ChallengesBanner />
          <ChallengesBar
            userRole={state.user?.role}
            openAdminModal={() => setIsOpenChallengeCreation(state => !state)}
            openChallengeModal={openChallengeModal} />

          {isOpenChallengeCreation && (
            <ChallengeCreationModal
              onClose={handleCloseChallengeCreation}
              handleFunction={() => { console.log('mde'); handleCloseChallengeCreation() }}
            />
          )}
          {isOpenChallengeCheck.isOpen && (
            <ChallengeCheckModal
              challenge={isOpenChallengeCheck.challengeCard}
              onClose={handleCloseChallengeCheck}
            />
          )}
        </div>
  )
}

export default Challenges
