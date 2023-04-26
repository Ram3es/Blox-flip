import React, { useCallback, useContext, useState } from 'react'
import ChallengesBar from './ChallengesBar'
import { Context } from '../../store/Store'
import ChallengesBanner from './ChallengesBanner'
import ChallengeCreationModal from '../../components/containers/ChallengeCreationModal'
import ChallengeCheckModal from '../../components/containers/ChallengeCheckModal'

const Challenges = () => {
  const [isOpenChallengeCreation, setIsOpenChallengeCreation] = useState(false)
  const [isOpenChallengeCheck, setIsOpenChallengeCheck] = useState(true)

  const { state } = useContext(Context)

  const handleCloseChallengeCreation = useCallback(() => {
    setIsOpenChallengeCreation(false)
  }, [])

  const handleCloseChallengeCheck = useCallback(() => {
    setIsOpenChallengeCheck(false)
  }, [])

  return (
        <div className='max-w-5xl w-full mx-auto'>
          <ChallengesBanner />
          <ChallengesBar userRole={state.user?.role} />
          {isOpenChallengeCreation && (
        <ChallengeCreationModal
          onClose={handleCloseChallengeCreation}
          handleFunction={() => console.log('mde')}
        />
          )}
      {isOpenChallengeCheck && (
        <ChallengeCheckModal
          challenge='acbc'
          onClose={handleCloseChallengeCheck}
          handleFunction={() => console.log('mde')}
        />
      )}
        </div>
  )
}

export default Challenges
