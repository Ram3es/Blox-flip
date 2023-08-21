import { useCallback, useContext, useEffect, useState } from 'react'
import ChallengesBar from './ChallengesBar'
import { Context } from '../../store/Store'
import ChallengesBanner from './ChallengesBanner'
import ChallengeCreationModal from '../../components/containers/ChallengeCreationModal'
import ChallengeCheckModal from '../../components/containers/ChallengeCheckModal'
import { IChallengeCard } from '../../mocks/challenges'
import { useSocketCtx } from '../../store/SocketStore'
import { IChallenge } from '../../types/Challenges'
import { getToast } from '../../helpers/toast'

const Challenges = () => {
  const { state } = useContext(Context)
  const { socket } = useSocketCtx()

  const [challenges, setChallenges] = useState<IChallenge[]>([])

  const [isOpenChallengeCreation, setIsOpenChallengeCreation] = useState(false)
  const [isOpenChallengeCheck, setIsOpenChallengeCheck] = useState<{
    isOpen: boolean
    challengeCard: IChallenge | null
  }>({ isOpen: false, challengeCard: null })

  const handleCloseChallengeCreation = useCallback(() => {
    setIsOpenChallengeCreation(false)
  }, [])

  const handleCloseChallengeCheck = useCallback(() => {
    setIsOpenChallengeCheck((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const openChallengeModal = (challengeCard: IChallenge) => {
    setIsOpenChallengeCheck((prev) => ({ ...prev, isOpen: !prev.isOpen, challengeCard }))
  }

  useEffect(() => {
    socket.emit('load_challenges', (err: boolean | string, data: IChallenge[]) => {
      if (typeof err === 'string') {
        getToast('err')
      }

      if (!err) {
        setChallenges(data)
      }
    })
  }, [])

  return (
    <div className="max-w-5xl w-full mx-auto">
      <ChallengesBanner />
      <ChallengesBar
        userRole={state.user?.role}
        openAdminModal={() => setIsOpenChallengeCreation((state) => !state)}
        openChallengeModal={openChallengeModal}
        challenges={challenges}
      />

      {isOpenChallengeCreation && (
        <ChallengeCreationModal onClose={handleCloseChallengeCreation} handleFunction={handleCloseChallengeCreation} />
      )}
      {isOpenChallengeCheck.isOpen && (
        <ChallengeCheckModal challenge={isOpenChallengeCheck.challengeCard} onClose={handleCloseChallengeCheck} />
      )}
    </div>
  )
}

export default Challenges
