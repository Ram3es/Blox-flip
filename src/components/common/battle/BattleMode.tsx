
import React, { FC, ReactNode } from 'react'
import { IMAGES } from '../../../constants/images'
import { IBattleUser, IModeGame } from '../../../mocks/battle'
import { IUnboxCard } from '../../../types/ItemCard'
import Loader from '../../base/Loader'
import BattleDaggers from '../../icons/BattleDaggers'
import DaggersGreenGradient from '../../icons/DaggersGreenGradient'
import FriendlyBlue from '../../icons/FriendlyBlue'
import FriendlyGreen from '../../icons/FriendlyGreen'
import FriendlyOrange from '../../icons/FriendlyOrange'
import SpinItems from './SpinItems'
import UserBar from './UserBar'
import UsersDrops from './UsersDrops'

interface IBattleModeProps {
  status: string
  players: IBattleUser[]
  mode: IModeGame
  onJoinUser: Function
  casesBox?: IUnboxCard[]
  updateRewards: Function
}

const case2v2Icons: Record<number, ReactNode> = {
  0: <FriendlyBlue />,
  1: <BattleDaggers />,
  2: <FriendlyOrange />
}

const getIcons = (type: string, index: number) => {
  switch (type) {
    case '2v2':
      return case2v2Icons[index]
    case 'group':
      return <FriendlyGreen />
    default:
      return <BattleDaggers />
  }
}

const BattleMode: FC<IBattleModeProps> = ({ status, mode, players, onJoinUser, casesBox, updateRewards }) => {
  const handleJoinUser = (idx: number) => {
    onJoinUser(idx, {
      dropsCards: [],
      wonDiamonds: 0,
      id: new Date().getTime().toString(),
      avatar: '/src/assets/img/avatar_img.png',
      name: 'CurrentUsr sfsgfsdg 7777',
      level: 55
    })
  }

  const playersInGame = Array.from(Array(mode.requiredPlayers))
  return (
        <div className='flex -mx-2'>
          {playersInGame.map((_, i) => (
            <div key={i} className={`w-1/${mode.requiredPlayers} px-1 mb-9 relative`}>
              <UserBar
                 user={players[i]}
                 amountPlayers={mode.requiredPlayers}
                 onJoinGame={() => handleJoinUser(i)}
              />
              <div className='bg-blue-accent rounded-b flex items-center relative mb-9'>
                    {i !== playersInGame.length - 1 && (
                         <div className="absolute left-full -ml-7 -mt-8 top-1/2 w-16 z-30 ">
                           { getIcons(mode.variant, i)}
                        </div>
                    )}
                <div className="grow -translate-y-[2px] ">
                  <img src={IMAGES.graySeparator} alt="divider" width="92" height="1" loading="lazy" decoding="async" className="w-full h-px" />
                </div>
                <div className="min-h-[380px] w-52 mx-auto relative shrink-0 max-w-full z-10">
                  <div className="relative z-10">
                        {players[i]
                          ? <img src={IMAGES.greenBackdrop} alt="green-backdrop" width="206" height="300" loading="lazy" decoding="async" className="object-contain w-full h-full max-w-full z-10 relative" />
                          : <img src={IMAGES.grayBackdrop} alt="gray-backdrop" width="206" height="300" loading="lazy" decoding="async" className="object-contain w-full h-full max-w-full z-10 relative" />}
                  </div>
                </div>
                {status === 'created'
                  ? <div className="z-20 absolute inset-0 flex flex-col justify-center items-center pt-1 pb-2">
              {players[i]
                ? <>
                     <DaggersGreenGradient />
                      <span className='text-base font-bold'>Ready</span>
                    </>
                : <>
                      <Loader height='40px' width='40px' color='rgba(147, 155, 185)' />
                      <span className='text-base font-bold text-gray-primary'>Waiting</span>
                    </>
              }
               </div>
                  : <SpinItems
                      status={status}
                      playerId={players[i]?.id}
                      updateRewards={updateRewards}
                 />
                }
                <div className="grow rotate-180 translate-y-[-2px]">
                  <img src={IMAGES.graySeparator} alt="divider" width="92" height="1" loading="lazy" decoding="async" className="w-full h-px" />
                </div>
                 </div>
              <UsersDrops amountGamePlates={mode.requiredPlayers} cards={players[i]?.dropsCards} />
            </div>
          ))}

        </div>
  )
}

export default BattleMode
