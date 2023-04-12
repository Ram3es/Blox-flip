import React from 'react'
import VerifyIcon from '../icons/VerifyIcon'

const VerifyBets = ({ wrapClasses }: { wrapClasses?: string }) => {
  return (
    <div className={wrapClasses ?? 'flex text-blue-golf pb-4'}>
      <span className='mr-2'>Verify Bets</span>
      <VerifyIcon />
    </div>
  )
}

export default VerifyBets
