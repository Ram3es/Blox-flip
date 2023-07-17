import { useEffect, useRef, useState } from 'react'
import { useCoinFlip } from '../../store/CoinFlipStore'
import { useSocketCtx } from '../../store/SocketStore'

import ModalWrapper from '../../components/containers/ModalWrapper'
import CoinFlipGamePlayer from './CoinFlipGamePlayer'
import AvatarWithUsername from '../../components/common/AvatarWithUsername'

import CoinFlipLogoIcon from '../../components/icons/CoinFlipLogoIcon'
import VersusBattleIcon from '../../assets/img/versus_battle.png'

import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import { ICoinFlip } from '../../types/CoinFlip'
import { loadImage } from '../../helpers/loadImages'

import blueSide from '../../assets/img/coinflip-blue-winin-sprite.png'
import whiteSide from '../../assets/img/coinflip-white-win-sprite.png'
import { getToast } from '../../helpers/toast'

const CoinFlipGameModal = () => {
  const { setIsOpenBattleGame, setCurrentGame, currentGame } = useCoinFlip()
  const { socket } = useSocketCtx()

  const [timeToStartEffect, setTimeToStartEffect] = useState<number>(7)

  const [animation, setAnimation] = useState<boolean>(false)
  const [isLoadedSprites, setIsloadedSprites] = useState<boolean>(false)

  const creatorHeadRef = useRef<HTMLDivElement>(null)
  const opponentHeadRef = useRef<HTMLDivElement>(null)
  const creatorBodyRef = useRef<HTMLDivElement>(null)
  const opponentBodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentGame?.winner && isLoadedSprites) {
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
              }
              if (currentGame.winner?.coin === currentGame.joining?.coin) {
                creatorHeadRef.current.style.opacity = '0.3'
                creatorHeadRef.current.style.filter = 'grayscale(30%)'
                creatorBodyRef.current.style.opacity = '0.3'
                creatorBodyRef.current.style.filter = 'grayscale(30%)'
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
  }, [currentGame, isLoadedSprites])

  useEffect(() => {
    socket.on('coinflip_update', (joining: ICoinFlip | boolean) => {
      if (typeof joining === 'boolean') {
        getToast('user failed join')
      } else {
        setCurrentGame(joining)
      }
    })

    socket.on('coinflip_over', (joining: ICoinFlip | boolean) => {
      if (typeof joining === 'boolean') {
        getToast('user failed join')
      } else {
        setCurrentGame(joining)
      }
    })

    return () => {
      socket.off('coinflip_update')
      socket.off('coinflip_over')
    }
  }, [])

  const handleCloseGameModal = () => {
    setIsOpenBattleGame(false)
    setCurrentGame(null)
  }

  useEffect(() => {
    loadImage([blueSide, whiteSide], () => setIsloadedSprites(true))
  }, [])

  return (
    <ModalWrapper
      closeModal={handleCloseGameModal}
      modalClasses="relative ls:px-0 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-6xl w-full m-auto space-y-5 min-h-[535px]"
    >
      <div className="overflow-hidden pt-6 xs:pt-0">
        <div className="px-4 flex flex-col xs:flex-row justify-between items-center space-y-2 xs:space-y-0 xs:space-x-4 pb-4 xs:pr-10">
          <div className="flex items-center justify-center space-x-2 xs:space-x-6 text-lg font-bold">
            <div className="flex border--coinflip-game w-8 h-8 items-center justify-center">
              <CoinFlipLogoIcon />
            </div>
            <div className="flex items-center">
              <span className="hidden xxs:block">CF&nbsp;</span>
              <span className="text-orange-primary-light">#{currentGame?.id}</span>
            </div>
            <CoinsWithDiamond
              containerColor="GreenGradient"
              containerSize="Large"
              typographyQuantity={
                (currentGame?.creator.value ?? 0) + (currentGame?.joining?.value ?? 0)
              }
            />
          </div>
          <div className="p-3 flex z-40 absolute top-[-20%] xs:left-[calc(50%-96px)] xs:top-[-14%] border--coinflip-game w-32 xs:w-40 h-32 xs:h-40 justify-center items-center">
            <div
              className={`
                 ${currentGame?.winner?.coin === 0 ? 'blue' : 'white'} 
                 ${animation ? 'play' : 'grayscale opacity-80'} coinflip-animation absolute z-1`}
            />
          </div>
          <div className="z-40 absolute hidden left-[45.2%] md:left-[46.4%] xs:top-[62%] bg-rectangle--yellow w-10 h-10 xs:flex items-center justify-center">
            <img className="rotate-[-48deg]" src={VersusBattleIcon} alt="versus" />
          </div>
          <div className="sm:w-96 flex justify-center items-center">
            <AvatarWithUsername
              ref={creatorHeadRef}
              username={currentGame?.creator.name}
              avatar={currentGame?.creator.avatar}
            />
            <span className="mx-6">
              <img src={VersusBattleIcon} alt="versus" />
            </span>
            <AvatarWithUsername
              ref={opponentHeadRef}
              username={currentGame?.joining?.name}
              avatar={currentGame?.joining?.avatar}
            />
          </div>
        </div>
        <div className="flex">
          <CoinFlipGamePlayer ref={creatorBodyRef} opponent={false} />
          <CoinFlipGamePlayer ref={opponentBodyRef} opponent={true} />
        </div>
        <div className="absolute z-[50] bottom-0 left-0 w-full text-center py-2.5 px-6 bg-blue-highlight-secondary rounded-b-2xl">
          <p className="text-clip overflow-hidden text-blue-ocean-third font-normal text-base">
            <span className="font-bold">Server Seed #</span>
            {currentGame?.seed}
          </p>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default CoinFlipGameModal
