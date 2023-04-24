import React, { useContext } from 'react'
import ChallengesBar from './ChallengesBar'
import { Context } from '../../store/Store'
import ChallengesBanner from './ChallengesBanner'

const Challenges = () => {
  const { state } = useContext(Context)

  return (
        <div className='max-w-5xl w-full mx-auto'>
          <ChallengesBanner />
          <ChallengesBar userRole={state.user?.role} />
        </div>
  )
}

export default Challenges
