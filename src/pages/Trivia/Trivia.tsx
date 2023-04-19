import React, { useState } from 'react'
import TriviaModal from '../../components/containers/TriviaModal'

const Trivia = () => {
  const [isOpenModal, setOpenModal] = useState(true)
  return (
        <div>
          <TriviaModal isOpen={isOpenModal} onClose={() => setOpenModal(false)} />
        </div>
  )
}

export default Trivia
