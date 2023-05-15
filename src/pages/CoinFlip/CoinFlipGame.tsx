import { useEffect, useRef, useState } from 'react'

import ModalWrapper from '../../components/containers/ModalWrapper'
import CoinFlipGamePlayer from './CoinFlipGamePlayer'

import CoinFlipGameHeader from './CoinFlipGameHeader'

interface CoinFlipGameProps {
  onClose: () => void
  gameId?: number
  withBot?: boolean
}

const CoinFlipGame = ({ gameId, onClose, withBot }: CoinFlipGameProps) => {
  const [serverSeed] = useState(
    'e6c22f866c14ee6c22f866c14ee6c22f866c14ee6c22f866c14ee6c22f866c14ee6c22f866c14e'
  )

  const [timeToStartEffect, setTimeToStartEffect] = useState<number>(10)

  console.log(timeToStartEffect)

  const playerHeadRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeToStartEffect((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(countdown)
          if (playerHeadRef.current && playerRef.current) {
            playerHeadRef.current.style.filter = 'grayscale(100%)'
            playerRef.current.style.filter = 'grayscale(100%)'
          }
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)

    return () => {
      clearInterval(countdown)
    }
  }, [])

  return (
    <ModalWrapper
      closeModal={onClose}
      modalClasses='relative ls:px-0 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-6xl w-full m-auto space-y-5 min-h-[535px]'
    >
      <div className='overflow-hidden pt-6 xs:pt-0'>
        <CoinFlipGameHeader ref={playerHeadRef} withBot={withBot} />
        <div className='flex'>
          <CoinFlipGamePlayer opponent={false} selectedCoin={0} />
          <CoinFlipGamePlayer ref={playerRef} opponent={true} selectedCoin={1} isBot={withBot} />
        </div>
        <div className='absolute z-[50] bottom-0 left-0 w-full text-center py-2.5 px-6 bg-blue-highlight-secondary rounded-b-2xl'>
          <p className='text-clip overflow-hidden text-blue-ocean-third font-normal text-base'>
            <span className='font-bold'>Server Seed #</span>
            {serverSeed}
          </p>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default CoinFlipGame
