import React from 'react'
import { IMAGES } from '../../../constants/Images'
import pointGreen from '../../../assets/img/point_green.svg'
import pointBlue from '../../../assets/img/point_blue.svg'
import clsx from 'clsx'

const CasesCell = ({ isActive, isFinished, currentRound }: { isActive: boolean, isFinished: boolean, currentRound?: number }) => {
  return (
    <div className=" min-w-[480px] flex items-center justify-center rounded border border-dashed border-blue-highlight bg-gradient-to-t from-dark/20 to-blue-highlight/10 py-1">
          {Array.from(Array(7)).map((_, i) => (
            <div key={i} className=" relative px-1.5 py-3 w-17 shrink-0">
              <img src={IMAGES.greenBox} alt=""
                  width="56"
                  height="62"
                  loading="lazy"
                  decoding="async"
                  className={clsx('', {
                    'grayscale opacity-50': isActive && currentRound && currentRound <= i
                  })} />
              {isActive
                ? <div className="absolute w-2.5 -inset-x-full m-auto -bottom-2.5">
                  {currentRound && currentRound <= i
                    ? <img src={pointBlue} alt="" width="10" height="10" loading="lazy" decoding="async" />
                    : <img src={pointGreen} alt="" width="10" height="10" loading="lazy" decoding="async" />}

                 </div>
                : isFinished && <div className="absolute w-2.5 -inset-x-full m-auto -bottom-2.5">
                    <img src={pointGreen} alt="" width="10" height="10" loading="lazy" decoding="async" />
                 </div> }
            </div>
          ))}

    </div>
  )
}

export default CasesCell
