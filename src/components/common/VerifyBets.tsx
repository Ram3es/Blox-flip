import React from 'react'
import VerifyIcon from '../icons/VerifyIcon'
import { Link } from 'react-router-dom'

const VerifyBets = ({ wrapClasses, path }: { wrapClasses?: string, path?: string }) => {
  return (
    <div className={wrapClasses ?? 'flex text-blue-golf pb-4'}>
      <Link to={path ?? '/'} className='flex'>
        <span className='mr-2'>Verify Bets</span>
        <VerifyIcon />
      </Link>
    </div>
  )
}

export default VerifyBets
