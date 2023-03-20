import React from 'react'
import { IMAGES } from '../../../constants/images'
import pointGreen from '../../../assets/img/point_green.svg'
import pointBlue from '../../../assets/img/point_blue.svg'
import clsx from 'clsx'
import { GameStatus } from '../../../types/enums'

const CasesCell = ({ status, totalRounds, currentRound }: { status: string, totalRounds: number, currentRound?: number }) => {
  return (
    <div className=" min-w-[485px] flex items-center  ">
      <div className={`${totalRounds > 7 ? 'pb-5 scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full' : ''}  flex items-center justify-start rounded border border-dashed border-blue-highlight bg-gradient-to-t from-dark/20 to-blue-highlight/10 p-1  `}>
          {Array.from(Array(totalRounds)).map((_, i) => (
            <div key={i} className=" relative px-1.5 py-3 w-17 shrink-0">
              <img src={IMAGES.greenBox} alt=""
                  width="56"
                  height="62"
                  loading="lazy"
                  decoding="async"
                  className={clsx('', {
                    'grayscale opacity-50': status === GameStatus.Running && currentRound && currentRound <= i
                  })} />
              {status === GameStatus.Running
                ? <div className="absolute w-2.5 -inset-x-full m-auto -bottom-2.5">
                  {currentRound && currentRound <= i
                    ? <img src={pointBlue} alt="" width="10" height="10" loading="lazy" decoding="async" />
                    : <img src={pointGreen} alt="" width="10" height="10" loading="lazy" decoding="async" />}

                 </div>
                : status === GameStatus.Ended && <div className="absolute w-2.5 -inset-x-full m-auto -bottom-2.5">
                    <img src={pointGreen} alt="" width="10" height="10" loading="lazy" decoding="async" />
                 </div> }
            </div>
          ))}
          </div>

    </div>
  )
}

export default CasesCell
