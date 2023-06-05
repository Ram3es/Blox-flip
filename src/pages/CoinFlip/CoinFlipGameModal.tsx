import { useEffect, useRef, useState } from 'react'
import { useCoinFlip } from '../../store/CoinFlipStore'
import { useSocketCtx } from '../../store/SocketStore'

import ModalWrapper from '../../components/containers/ModalWrapper'
import CoinFlipGamePlayer from './CoinFlipGamePlayer'

import CoinFlipGameHeader from './CoinFlipGameHeader'
import { ICoinFlip } from '../../types/CoinFlip'

const CoinFlipGameModal = () => {
  const { setIsOpenBattleGame, setCurrentGame, currentGame } = useCoinFlip()
  const { socket } = useSocketCtx()

  const [timeToStartEffect, setTimeToStartEffect] = useState<number>(10)

  const playerHeadRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeToStartEffect((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(countdown)
          if (playerHeadRef.current && playerRef.current) {
            playerHeadRef.current.style.filter = 'grayscale(30%)'
            playerRef.current.style.filter = 'grayscale(30%)'
            playerHeadRef.current.style.opacity = '0.3'
            playerRef.current.style.opacity = '0.3'
          }
          return 0
        }
        return prevTimer - 1
      })
    }, timeToStartEffect * 100)

    return () => {
      clearInterval(countdown)
    }
  }, [])

  useEffect(() => {
    socket.emit('coinflip_update', {}, (response: { data: ICoinFlip }) => {
      if (!response.data) {
        return
      }
      if (response.data) {
        setCurrentGame(response.data)
      }
    })
  }, [])

  const handleCloseGameModal = () => {
    setIsOpenBattleGame(false)
    setCurrentGame(null)
  }

  return (
    <ModalWrapper
      closeModal={handleCloseGameModal}
      modalClasses='relative ls:px-0 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-6xl w-full m-auto space-y-5 min-h-[535px]'
    >
      <div className='overflow-hidden pt-6 xs:pt-0'>
        <CoinFlipGameHeader ref={playerHeadRef} />
        <div className='flex'>
          <CoinFlipGamePlayer opponent={false} selectedCoin={0} />
          <CoinFlipGamePlayer ref={playerRef} opponent={true} selectedCoin={1} isBot={true} />
        </div>
        <div className='absolute z-[50] bottom-0 left-0 w-full text-center py-2.5 px-6 bg-blue-highlight-secondary rounded-b-2xl'>
          <p className='text-clip overflow-hidden text-blue-ocean-third font-normal text-base'>
            <span className='font-bold'>Server Seed #</span>
            {currentGame?.seed}
          </p>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default CoinFlipGameModal
