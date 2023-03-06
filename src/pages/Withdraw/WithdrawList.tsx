import { WithdrawMethod } from './WithdrawMethod'
import { IWithdrawMethod } from '../../types/withdraw'

export const WithdrawList = ({ list }: { list: IWithdrawMethod[] }) => {
  return (
    <div className='flex flex-wrap -mx-6 relative'>
      <div className='px-6 w-full md:w-2/5 flex flex-col'>
        <div className='text-gray-primary font-bold text-lg mb-6'>Roblox Methods</div>
        <div className='flex flex-wrap -mx-1.5 grow'>
          {list.map((item) => (
            <WithdrawMethod key={item.link} link={item.link} icon={item.icon} />
          ))}
        </div>
      </div>
    </div>
  )
}
