import React from 'react'
import ReactLoading from 'react-loading'

const Loader = ({ color }: { color?: string }) => {
  return (
        <ReactLoading
          type='spinningBubbles'
          color={color ?? '#2CDD68'}
          height={'17px'}
          width={'17px'}
           />
  )
}

export default Loader
