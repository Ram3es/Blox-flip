import { useCallback, useState } from 'react'
import ChallengeCreationModal from '../../components/containers/ChallengeCreationModal'
import ChallengeCheckModal from '../../components/containers/ChallengeCheckModal'

const Challenges = () => {
  const [isOpenChallengeCreation, setIsOpenChallengeCreation] = useState(false)
  const [isOpenChallengeCheck, setIsOpenChallengeCheck] = useState(true)

  const handleCloseChallengeCreation = useCallback(() => {
    setIsOpenChallengeCreation(false)
  }, [])

  const handleCloseChallengeCheck = useCallback(() => {
    setIsOpenChallengeCheck(false)
  }, [])

  return (
    <div>
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
