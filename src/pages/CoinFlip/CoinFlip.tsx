import { useEffect, useState } from 'react'
import { useCoinFlip } from '../../store/CoinFlipStore'

import CoinFlipGameModal from './CoinFlipGameModal'
import CoinFlipHeader from './CoinFlipHeader'
import CoinFlipGamesTable from './CoinFlipGamesTable'

import { useMatch, useNavigate } from 'react-router-dom'
import { ICoinFlip } from '../../types/CoinFlip'
import { getToast } from '../../helpers/toast'

const CoinFlip = () => {
  const { games } = useCoinFlip()

  const navigate = useNavigate()
  const match = useMatch('/coinflip/:id')

  const [currentGame, setCurrentGame] = useState<ICoinFlip | null>(null)

  useEffect(() => {
    if (match) {
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
      <CoinFlipGamesTable />
      {currentGame && match?.params.id && <CoinFlipGameModal game={currentGame} />}
    </>
  )
}

export default CoinFlip
