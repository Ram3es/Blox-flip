import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'
import ModalWrapper from '../../containers/ModalWrapper'

interface GameLobbyProps {
  onClose: Dispatch<SetStateAction<boolean>>
}

const GameLobbyContainer: FC<PropsWithChildren<GameLobbyProps>> = ({ onClose, children }) => {
  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses='relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-5xl w-full m-auto space-y-5 max-h-[555px] overflow-hidden'
    >
      {children}
    </ModalWrapper>
  )
}

export default GameLobbyContainer
