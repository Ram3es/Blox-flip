import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const CircularProgressBar = ({ progress, wrapClasses }: { progress: number, wrapClasses?: string }) => {
  return (
        <div className={ wrapClasses ?? 'w-[250px] h-[250px]'}>
          <CircularProgressbar
          value={progress}
          strokeWidth={1}
          styles={{
            path: {
              stroke: 'rgba(72, 101, 214, 1)',
              strokeLinecap: 'round',
              transition: 'stroke-dashoffset 0.5s ease 0s',
              transformOrigin: 'center center'
            },
            trail: {
              stroke: '#171F42',
              strokeLinecap: 'butt',
              transformOrigin: 'center center'
            }
          }}
           />
        </div>
  )
}

export default CircularProgressBar
