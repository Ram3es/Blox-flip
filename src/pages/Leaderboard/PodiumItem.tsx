import { FC } from 'react'
import clsx from 'clsx'

import { Button } from '../../components/base/Button'
import Image from '../../components/base/Image'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'

import FirstPlaceIcon from '../../assets/img/coin1.svg'
import SecondPlaceIcon from '../../assets/img/coin2.svg'
import ThirdPlaceIcon from '../../assets/img/coin3.svg'
import { ILeaderboardUserData } from '../../types/Leaderboard'

interface PodiumItemProps extends Omit<ILeaderboardUserData, 'place'> {
  place: 1 | 2 | 3
}

export const PodiumItem: FC<PodiumItemProps> = ({ place, avatar, name, wager, reward }) => {
  const podiumPlaceImage = (place: number) => {
    return place === 1 ? FirstPlaceIcon : place === 2 ? SecondPlaceIcon : ThirdPlaceIcon
  }

  return (
    <div
      className={clsx('px-3, xxs:px-1 xs:px-3 md:px-7 w-full xxs:w-1/3 mb-4', {
        'order-1 xxs:order-2': place === 1,
        'order-2 xxs:order-1': place === 2,
        'order-3': place === 3
      })}
    >
      <div
        className={clsx('border--mask rounded h-full relative z-20', {
          'border--diagonal-orange': place === 1,
          'border--diagonal-gray': place === 2,
          'border--diagonal-brown': place === 3
        })}
      >
        <div className="absolute -left-1 -top-1 w-10 h-10 text-lg leading-10 text-center z-30">
          <span
            className={clsx('absolute w-full left-0 bg-clip-text text-transparent', {
              'gradient-yellow-text font-extrabold': place === 1,
              'gradient-gray-text font-semibold': place === 2,
              'gradient-brown-text font-semibold': place === 3
            })}
          >
            #{place}
          </span>
          <img
            src={podiumPlaceImage(place)}
            alt=""
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
            className="object-cover w-full h-full"
          />
        </div>
        <div
          className={clsx('rounded text-center py-3 px-6 relative', {
            'border--diagonal-orange font-base z-10 gradient--leader1': place === 1,
            'border--diagonal-gray z-10 gradient--leader2': place === 2,
            'border--diagonal-brown gradient--leader3': place === 3
          })}
        >
          <div className="relative z-20">
            <div
              className={clsx(
                'border border-blue-highlight rounded-lg radial--blue-full mb-3 mx-auto shrink-0',
                {
                  'w-20 h-18': place === 1,
                  'w-15 h-14': place === 2 || place === 3
                }
              )}
            >
              <Image image={avatar} className="object-cover w-full h-full rounded-lg" />
            </div>
            <div className="mb-3 font-bold">{name}</div>
            <div className="flex justify-center mb-3">
              <Button variant="Highlight">
                <span
                  className={clsx('py-1 px-1 leading-5 w-21 font-medium whitespace-nowrap', {
                    '': place === 1,
                    'text-xs': place === 2 || place === 3
                  })}
                >
                  Withdraw
                </span>
              </Button>
            </div>
            <div className="flex items-center justify-center mb-3">
              <CoinsWithDiamond
                iconContainerSize={place === 1 ? 'Medium' : 'Small'}
                iconClasses={`${place === 1 ? 'w-4 h-4' : 'w-3 h-3'}`}
                typographyQuantity={wager}
                typographyFontSize={place === 1 ? 'Size16' : 'Size14'}
              />
            </div>
            <div className="flex items-center mb-2">
              <div className="bg-gradient-to-r from-green-primary/0 to-green-primary h-px mr-1 grow"></div>
              <Button variant="GreenOutlined">
                <span
                  className={clsx('px-5 py-1 leading-5 whitespace-nowrap', {
                    'text-sm': place === 1,
                    'text-xs': place === 2 || place === 3
                  })}
                >
                  Reward
                </span>
              </Button>
              <div className="bg-gradient-to-r to-green-primary/0 from-green-primary h-px ml-1 grow"></div>
            </div>
            <div className="flex items-center justify-center">
              <CoinsWithDiamond
                iconContainerSize={place === 1 ? 'Medium' : 'Small'}
                iconClasses={`${place === 1 ? 'w-4 h-4' : 'w-3 h-3'}`}
                typographyQuantity={reward}
                typographyFontSize={place === 1 ? 'Size16' : 'Size14'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
