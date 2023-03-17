import React, { useState } from 'react'
import BattleModal from '../../components/Containers/BattleModal'

const CreateBattle = () => {
  const [isOpenModal, setOpenModal] = useState(true)
  return (
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eaque ea saepe
            mollitia nostrum est asperiores reprehenderit minima itaque
            similique rerum soluta, repudiandae sunt? Molestias aut numquam modi nulla iure?
          <BattleModal isOpen={isOpenModal} onClose={() => setOpenModal(false)} />
        </div>
  )
}

export default CreateBattle
