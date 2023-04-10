import { ListIcon } from '../../components/icons/ListIcon'
import { IUser } from '../../types/User'

interface KingGameInventoriesProps {
  user?: IUser
}

const KingGameInventories = ({ user }: KingGameInventoriesProps) => {
  return (
    <div className='bg-[#1F2438] relative rounded-sm'>
      <div className='bg-gradient-to-r from-[rgba(255,172,46,0.25)] via-transparent to-transparent absolute inset-0 rounded-sm'></div>
      <div className='bg-black bg-opacity-15 h-full w-full rounded-sm gradient-king-text'>
        <ListIcon />
      </div>
    </div>
  )
}

export default KingGameInventories
