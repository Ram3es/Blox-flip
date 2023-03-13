import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../base/Button'
import { DiamondIcon } from '../DiamondIcon/DiamondIcon'
import TriangleArrow from '../icons/TriangleArrow'
import PageLabel from './PageLabel'

const pageLabels: Record<string, { title: string, image: string }> = {
  robux: { title: 'Robux', image: 'robuxDeposite' },
  bitcoin: { title: 'Bitcoin', image: 'bitcoinSmall' },
  g2a: { title: 'G2A', image: 'g2a' },
  kinguin: { title: 'Kinguin', image: 'kinguinSmall' },
  'credit-card': { title: 'Credit Card', image: 'creditCard' },
  'roblox-limiteds': { title: ' Roblox Limiteds', image: 'robloxDeposite' }
}

// interface IToolBarProps {
//   value: string
//   onChange: Function
// }

const NavHeader = ({ title, path, children }: { title: string, path: string, children?: ReactNode }) => {
  const navigate = useNavigate()
  return (
    <div className=' w-full flex flex-wrap justify-between mb-8'>
    <div className="flex items-center gap-4 mb-8">
      <Button
        onClick={() => navigate(-1)}
        className='flex items-center justify-center font-semibold p-2 leading-4 gap-1.5 group text-gray-primary rounded bg-blue-accent-secondary hover:bg-blue-accent border border-transparent '
      >
        <TriangleArrow iconClasses='rotate-90' />
        <span className='group-hover:text-white'>Back</span>
      </Button>
      <DiamondIcon className='w-[29px] h-[25px] text-green-secondary ml-2' />
      <h3 className='text-2xl font-bold mr-6 md:mr-0'>{title}</h3>
    </div>
     { children }
     {path && <PageLabel {...pageLabels[path]}/> }
  </div>
  )
}

export default NavHeader
