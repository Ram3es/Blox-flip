import { useEffect, useRef, useState } from 'react'
import { useCoinFlip } from '../../store/CoinFlipStore'
import { useSocketCtx } from '../../store/SocketStore'

import ModalWrapper from '../../components/containers/ModalWrapper'
import CoinFlipGamePlayer from './CoinFlipGamePlayer'
import AvatarWithUsername from '../../components/common/AvatarWithUsername'

import CoinFlipLogoIcon from '../../components/icons/CoinFlipLogoIcon'
import VersusBattleIcon from '../../assets/img/versus_battle.png'
import SkinBigIcon from '../../assets/img/coinflip/SkinBigIcon.png'

import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import { ICoinFlip } from '../../types/CoinFlip'
import clsx from 'clsx'

const CoinFlipGameModal = () => {
  const { setIsOpenBattleGame, setCurrentGame, currentGame } = useCoinFlip()
  const { socket } = useSocketCtx()

  const [timeToStartEffect, setTimeToStartEffect] = useState<number>(7)

  const [animation, setAnimation] = useState(false)

  const creatorHeadRef = useRef<HTMLDivElement>(null)
  const opponentHeadRef = useRef<HTMLDivElement>(null)
  const creatorBodyRef = useRef<HTMLDivElement>(null)
  const opponentBodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentGame?.winner) {
      setAnimation(true)

      const countdown = setInterval(() => {
        setTimeToStartEffect((prevTimer) => {
          if (prevTimer <= 0) {
            clearInterval(countdown)
            if (
              creatorHeadRef.current &&
              opponentHeadRef.current &&
              creatorBodyRef.current &&
              opponentBodyRef.current
            ) {
              if (currentGame.winner?.coin === currentGame.creator.coin) {
                opponentHeadRef.current.style.opacity = '0.3'
                opponentHeadRef.current.style.filter = 'grayscale(30%)'
                opponentBodyRef.current.style.opacity = '0.3'
                opponentBodyRef.current.style.filter = 'grayscale(30%)'
                console.log('winner creator')
              }
              if (currentGame.winner?.coin === currentGame.joining?.coin) {
                creatorHeadRef.current.style.opacity = '0.3'
                creatorHeadRef.current.style.filter = 'grayscale(30%)'
                creatorBodyRef.current.style.opacity = '0.3'
                creatorBodyRef.current.style.filter = 'grayscale(30%)'
                console.log('winner opponent')
              }
            }
            return 0
          }
          return prevTimer - 1
        })
      }, timeToStartEffect * 100)

      return () => {
        clearInterval(countdown)
      }
    }
  }, [currentGame])

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
        <div className='px-4 flex flex-col xs:flex-row justify-between items-center space-y-2 xs:space-y-0 xs:space-x-4 pb-4 xs:pr-10'>
          <div className='flex items-center justify-center space-x-2 xs:space-x-6 text-lg font-bold'>
            <div className='flex border--coinflip-game w-8 h-8 items-center justify-center'>
              <CoinFlipLogoIcon />
            </div>
            <div className='flex items-center'>
              <span className='hidden xxs:block'>CF&nbsp;</span>
              <span className='text-orange-primary-light'>#{currentGame?.id}</span>
            </div>
            <CoinsWithDiamond
              containerColor='GreenGradient'
              containerSize='Large'
              typographyQuantity={14214.51}
            />
          </div>
          <div className='p-3 flex z-40 absolute top-[-20%] xs:left-[calc(50%-96px)] xs:top-[-14%] border--coinflip-game w-32 xs:w-40 h-32 xs:h-40 justify-center items-center'>
            {animation && (
              <div className='relative'>
                <div
                  className={`${
                    currentGame?.winner?.coin === 0 ? 'blue' : 'white'
                  } coinflip-animation absolute -left-[250px] -top-[250px] z-1`}
                />
              </div>
            )}
            {!animation && (
              <div
                className={clsx('absolute z-1', {
                  'opacity-60 grayscale': currentGame?.state === 1
                })}
              >
                <img
                  style={{
                    filter: 'drop-shadow(0px 0px 25px rgba(124, 80, 233, 0.47))'
                  }}
                  src={SkinBigIcon}
                  alt='skin icon'
                />
              </div>
            )}
          </div>
          <div className='z-40 absolute hidden left-[45.2%] md:left-[46.4%] xs:top-[62%] bg-rectangle--yellow w-10 h-10 xs:flex items-center justify-center'>
            <img className='rotate-[-48deg]' src={VersusBattleIcon} alt='versus' />
          </div>
          <div className='sm:w-96 flex justify-center items-center'>
            <AvatarWithUsername
              ref={creatorHeadRef}
              username={currentGame?.creator.name}
              avatar={currentGame?.creator.avatar}
            />
            <span className='mx-6'>
              <img src={VersusBattleIcon} alt='versus' />
            </span>
            <AvatarWithUsername
              ref={opponentHeadRef}
              username={currentGame?.joining?.name}
              avatar={currentGame?.joining?.avatar}
            />
          </div>
        </div>
        <div className='flex'>
          <CoinFlipGamePlayer ref={creatorBodyRef} opponent={false} />
          <CoinFlipGamePlayer ref={opponentBodyRef} opponent={true} />
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
