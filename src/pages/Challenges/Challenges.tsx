import { useCallback, useState } from 'react'
import ChallengeCreationModal from '../../components/containers/ChallengeCreationModal'

const Challenges = () => {
  const [isOpenChallengeCreation, setIsOpenChallengeCreation] = useState(true)

  const handleCloseChallengeCreation = useCallback(() => {
    setIsOpenChallengeCreation(false)
  }, [])

  return (
    <div>
      {isOpenChallengeCreation && (
        <ChallengeCreationModal
          onClose={handleCloseChallengeCreation}
          handleFunction={() => console.log('mde')}
        />
      )}
    </div>
  )
}

export default Challenges
