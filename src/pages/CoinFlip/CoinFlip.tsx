import { useEffect, useState } from 'react'
import { useCoinFlip } from '../../store/CoinFlipStore'

import CoinFlipGameModal from './CoinFlipGameModal'
import CoinFlipHeader from './CoinFlipHeader'
import CoinFlipGamesTable from './CoinFlipGamesTable'

import { useMatch, useNavigate } from 'react-router-dom'
import { ICoinFlip } from '../../types/CoinFlip'
import { getToast } from '../../helpers/toast'
import VerifyBets from '../../components/common/VerifyBets'

const CoinFlip = () => {
  const { games } = useCoinFlip()

  const navigate = useNavigate()
  const match = useMatch('/coinflip/:id')

  const [currentGame, setCurrentGame] = useState<ICoinFlip | null>(null)

  useEffect(() => {
    if (match && games.length > 0) {
      const currentGame = games.find((game) => String(game.id) === match?.params.id)
      if (currentGame) {
        setCurrentGame(currentGame)
      } else {
        getToast('Game not found')
        navigate('/coinflip')
      }
    }
  }, [match, games])

  return (
    <>
      <CoinFlipHeader />
      <VerifyBets wrapClasses='flex text-blue-golf pt-4 mx-auto sm:mx-0 sm:ml-auto sm:mr-4' path="/provably-fair#coinflip" />
      <CoinFlipGamesTable />
      {currentGame && match?.params.id && <CoinFlipGameModal game={currentGame} />}
    </>
  )
}

export default CoinFlip
