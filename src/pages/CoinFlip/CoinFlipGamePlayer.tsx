import { forwardRef, useMemo } from 'react'

import clsx from 'clsx'

import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import LabelWithTimer from '../../components/common/LabelWithTimer'
import { Button } from '../../components/base/Button'
import Image from '../../components/base/Image'
import WinPercent from '../../components/common/WinPercent'

import QuestionIcon from '../../components/icons/QuestionIcon'

import YellowCoin from '../../assets/img/coinflip/YellowCoin.png'
import PurpleCoin from '../../assets/img/coinflip/PurpleCoin.png'
import { useSocketCtx } from '../../store/SocketStore'
import { ICoinFlip } from '../../types/CoinFlip'
import { getToast } from '../../helpers/toast'

export interface PlayerProps {
  opponent: boolean
  game: ICoinFlip
}

const CoinFlipGamePlayer = forwardRef<HTMLDivElement, PlayerProps>(({ opponent, game }, ref) => {
  const { socket } = useSocketCtx()

  const isCreatorSide = useMemo(
    () => (!opponent && game?.creator.coin === 0) || (opponent && game?.creator.coin === 1),
    [game]
  )

  const containerClasses = clsx('w-2/4 h-[400px] xs:h-[420px]', {
    'bg-coinflip-game--orange': isCreatorSide,
    'bg-coinflip-game--blue': !isCreatorSide
  })

  const avatarClasses = clsx(
    'hidden relative sm:flex mt-[-55px] w-[117px] h-[117px] justify-center border border-blue-highlight rounded-full z-1',
    {
      'bg-circle-avatar--yellow': isCreatorSide,
      'bg-circle-avatar--blue': !isCreatorSide,
      'items-end': game?.state !== '1' || isCreatorSide
    }
  )

  const handleCallBot = () => {
    socket.emit(
      'bot_coinflip',
      {
        id: game.id
      },
      (err: boolean | string) => {
        if (typeof err === 'string') {
          getToast(err)
        }
        if (!err) {
          getToast('bot called successful')
        }
      }
    )
  }

  return (
    <div ref={ref} className={containerClasses}>
      <div className="sm:bg-blue-primary-secondary space-y-6 h-full">
        <div className="mt-4 xs:mt-20 flex xs:flex-row flex-col items-center gap-4 sm:gap-0 sm:items-start justify-around">
          <div className="sm:mt-[-16px] xs:mx-0 mx-auto flex bg-green-third">
            <CoinsWithDiamond
              containerSize="Large"
              containerColor="GreenGradient"
              typographyQuantity={!opponent ? game?.creator.value ?? null : game?.joining?.value ?? null}
              typographyFontSize="Size16"
            />
          </div>
          <div className={avatarClasses}>
            {(game?.state !== '1' || isCreatorSide) && (
              <div className="w-21 h-21 rounded-full overflow-hidden">
                <Image image={!opponent ? game?.creator.avatar ?? '' : game?.joining?.avatar ?? ''} />
              </div>
            )}
            {!isCreatorSide && game?.state === '1' && (
              <div className="flex items-center justify-center text-blue-highlight-third">
                <QuestionIcon className="w-7 h-[30px]" />
              </div>
            )}
            <img
              src={isCreatorSide ? YellowCoin : PurpleCoin}
              className="w-14 h-14 absolute top-0 -right-[28px] z-10"
              alt="coinflip coin"
              style={{
                filter: `drop-shadow(0px 0px 25px ${
                  isCreatorSide ? 'rgba(255, 203, 69, 0.47)' : 'rgba(124, 80, 233, 0.47)'
                } )`
              }}
            />
          </div>
          <img
            src={isCreatorSide ? YellowCoin : PurpleCoin}
            className="sm:hidden w-12 h-12"
            alt="coinflip coin"
            style={{
              filter: `drop-shadow(0px 0px 25px ${
                isCreatorSide ? 'rgba(255, 203, 69, 0.47)' : 'rgba(124, 80, 233, 0.47)'
              } )`
            }}
          />
          <div className="ml-1 xs:ml-0 xs:mt-[-24px] max-w-[120px] truncate xs:space-y-3 text-center">
            <span className="text-base font-bold ">
              {!opponent ? game?.creator.name ?? '...' : game?.joining?.name ?? '...'}
            </span>
            <WinPercent percent={!opponent ? game?.creator.chance : game?.joining?.chance} />
          </div>
        </div>
        <div className="hidden xs:block border-b border-blue-accent ml-4 mr-7" />
        <div className="h-full w-full pr-6">
          {/* {((game?.state !== 1 && game?.state !== 2) || isCreatorSide) && (
            <CoinFlipGameItems
              items={
                !opponent ? game?.creator.skins ?? [] : game?.joining?.skins ?? []
              }
            />
          )} */}
          <div className="flex items-center justify-center">
            <div className="px-2 my-10 mx-auto space-y-2">
              {!isCreatorSide && game?.state === '1' && (
                <>
                  <Button color="GreenPrimary" onClick={handleCallBot}>
                    <div className="w-32 xs:w-40 h-9 flex items-center justify-center">Call bot</div>
                  </Button>
                  <Button color="BlueAccentSix">
                    <div className="w-32 xs:w-40 h-9 flex items-center justify-center text-blue-ocean-secondary">
                      Cancel
                    </div>
                  </Button>
                </>
              )}
              {!isCreatorSide && game?.state === '2' && (
                <LabelWithTimer userAvatar={game?.joining?.avatar ?? ''} timer={game?.start_time ?? 0}>
                  Joining in
                </LabelWithTimer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

CoinFlipGamePlayer.displayName = 'CoinFlipGamePlayer'

export default CoinFlipGamePlayer
