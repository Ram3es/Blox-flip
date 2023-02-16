import React, { FC } from 'react'

interface IGameCardProps {
  titleBtn: string
  isLeftCorner: boolean
}

const GameCard: FC<IGameCardProps> = ({ titleBtn, isLeftCorner }) => {
  return isLeftCorner
    ? (
    <div className="px-3 mb-6 xs:mb-10 sm:mb-18 w-full xxs:w-1/2 xs:w-1/3 lg:w-1/6">
        <div className="relative overflow-hidden h-full">
            <img src="/src/assets/img/case_bg.svg" alt="" width="241" height="228" loading="lazy" decoding="async" className="relative z-20 object-cover w-full"/>
            <div className="absolute inset-4 z-40 flex flex-col items-center">
                <div className="grow">
                    3
                </div>
                <a href="#" className="px-2 py-2 max-w-36 w-full text-center rounded-full leading-4 bg-black/15">{titleBtn}</a>
            </div>
            <div className="absolute inset-0 z-0 top-16 overflow-hidden">
                <img src="/src/assets/img/case_bg2.svg" alt="" width="241" height="760" loading="lazy" decoding="async" className="absolute left-0 bottom-0 w-full"/>
            </div>
            <div className="absolute inset-0 z-30 top-16 overflow-hidden">
                <img src="/src/assets/img/case_radial.svg" alt="" width="241" height="228" loading="lazy" decoding="async" className="absolute left-0 bottom-0 w-full"/>
            </div>
        </div>
    </div>
      )
    : (
    <div className="px-3 mb-6 xs:mb-10 sm:mb-18 w-full xxs:w-1/2 xs:w-1/3 lg:w-1/6">
    <div className="relative overflow-hidden h-full">
        <img src="/src/assets/img/case_bg.svg" alt="" width="241" height="228" loading="lazy" decoding="async" className="relative z-20 object-cover w-full flip--h" />
        <div className="absolute inset-4 z-40 flex flex-col items-center">
            <div className="grow">
                case 2
            </div>
            <a href="#" className="px-2 py-2 max-w-36 w-full text-center rounded-full leading-4 bg-black/15">{titleBtn}</a>
        </div>
        <div className="absolute inset-0 z-0 top-16 overflow-hidden">
            <img src="/src/assets/img/case_bg2.svg" alt="" width="241" height="760" loading="lazy" decoding="async" className="absolute left-0 bottom-0 w-full" />
        </div>
        <div className="absolute inset-0 z-30 top-16 overflow-hidden">
            <img src="/src/assets/img/case_radial.svg" alt="" width="241" height="228" loading="lazy" decoding="async" className="absolute left-0 bottom-0 w-full" />
        </div>
    </div>
</div>

      )
}

export default GameCard
