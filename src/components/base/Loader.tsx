import React from 'react'
import ReactLoading from 'react-loading'

const Loader = ({ color, height = '17px', width = '17px' }: { color?: string, height?: string, width?: string }) => {
  return (
        <ReactLoading
          type='spinningBubbles'
          color={color ?? '#2CDD68'}
          height={height}
          width={width}
           />
  )
}

export default Loader
