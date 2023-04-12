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
            // Customize the root svg element
            root: {},
            // Customize the path, i.e. the "completed progress"
            path: {
              // Path color
              stroke: 'rgba(72, 101, 214, 1)',
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'round',
              // Customize transition animation
              transition: 'stroke-dashoffset 0.5s ease 0s',
              // Rotate the path
              transformOrigin: 'center center'
            },
            // Customize the circle behind the path, i.e. the "total progress"
            trail: {
              // Trail color
              stroke: '#171F42',
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'butt',
              // Rotate the trail
              transformOrigin: 'center center'
            }
          }}
           />
        </div>
  )
}

export default CircularProgressBar
