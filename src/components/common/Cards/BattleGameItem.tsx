import React from 'react'
import { IMAGES } from '../../../constants/images'

const BattleGameItem = ({ itsWinning, image }: { itsWinning?: boolean, image: string }) => {
  return (
            <div className={!itsWinning ? 'h-[120px] shrink-0 pt-3' : 'h-[160px] shrink-0 pt-3  [&>img]:grayscale-0 [&>img]:opacity-100' }>
                <img
                  src={IMAGES[image]}
                  alt=""
                  width="118"
                  height="90"
                  loading="lazy"
                  decoding="async"
                  className=" grayscale opacity-40 h-full w-auto"/>
            </div>
  )
}

export default BattleGameItem
