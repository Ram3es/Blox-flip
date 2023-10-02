import { IRootJackpotNew } from '../../../types/Jackpot'
import Image from '../../base/Image'
import { UserLevel } from '../../user/UserLevel'
import CoinsWithDiamond from '../CoinsWithDiamond'

const JoinedUserRow = ({ player }: { player: IRootJackpotNew }) => {
  return (
    <div className='w-full max-w-[800px] flex items-center justify-between rounded  relative bg-[#252942]'>
      <div
        style={{
          background: 'linear-gradient(90.51deg, rgb(40, 49, 100) 9.7%, rgba(0, 0, 0, 0) 56.16%)'
        }}
        className='rounded-lg absolute -left-[1px] -top-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] -z-10'
      />
      <div className='w-full flex items-center justify-between '>
        <div className='flex items-center gap-3 py-3.5'>
          <div
            style={{
              background:
                ' linear-gradient(269.59deg, rgba(44, 221, 104, 0.19) 9.99%, rgba(41, 48, 77, 0) 181.7%)'
            }}
            className='hidden xxs:block w-fit px-2.5 py-0.5 text-green-primary text-11'
          >
            JOINED
          </div>
          <div className='w-9 h-8 shrink-0 border border-blue-highlight rounded my-1 overflow-hidden radial--blue '>
            <Image image={player.user.avatar} />
          </div>
          <div className='max-w-[120px] truncate'>{player.user.name}</div>
          <div className=' hidden xxs:flex  mx-1'>
            <UserLevel level={player.user.level} />
          </div>
        </div>
        <CoinsWithDiamond iconContainerSize='Small' typographyQuantity={player.wager} />
      </div>
      <div className='h-full w-full max-w-[70px] flex items-center justify-center rounded-r overflow-hidden ml-3'>
        <div
          style={{
            background:
              ' linear-gradient(90deg, rgba(44, 221, 104, 0.19) 9.99%, rgba(41, 48, 77, 0) 171.7%)'
          }}
          className='flex flex-col items-center justify-center grow  py-5 text-10 font-semibold'
        >
          <div className='text-green-primary text-13 min-w-[50px] text-center'>{player.chance} %</div>
          <div className='leading-none'>CHANCE</div>
        </div>
      </div>
    </div>
  )
}

export default JoinedUserRow
