import clsx from 'clsx'
import { Button } from '../../base/Button'
import CoinsWithDiamond from '../CoinsWithDiamond'
import { GiftCardInterface } from '../../../pages/Withdraw/WithdrawGifts'

interface GiftCardHorizontalProps extends GiftCardInterface {
  handleClaim?: () => void
}

const GiftCardHorizontal = ({
  id,
  pic,
  name,
  price,
  amount,
  status,
  handleClaim
}: GiftCardHorizontalProps) => {
  return (
    <div className="w-full xxs:w-1/2 xs:w-full ">
      <div className="border--mask border--radial-blue rounded overflow-hidden relative z-20">
        <div className="gradient-blue-secondary rounded relative z-20 px-5 py-[12px] h-[125px] grid grid-cols-2 grid-rows-3 gap-2.5">
          <div className="flex items-center gap-1 col-span-2">
            {amount > 0 && <span>{amount}x</span>}
            <span className="font-medium text-13 text-gray-primary">{name}</span>
          </div>
          <div className="row-span-2 row-start-2 w-[52px] h-full">
            <img className="h-full w-full object-contain" src={pic} alt={name} />
          </div>
          <div className="row-start-2">
            {status === 'active' && (
              <div className="px-2">
                <Button variant="GreenGradient" onClick={handleClaim}>
                  <span className="px-2 w-[56px] h-[27px] flex items-center justify-center">
                    Claim
                  </span>
                </Button>
              </div>
            )}
            {status === 'pending' && <CoinsWithDiamond typographyQuantity={price} />}
          </div>
          <div className="col-start-2 row-start-3 px-2 flex items-center gap-[5px]">
            <div
              className={clsx('p-[3px] rounded-full w-[11px] h-[11px]', {
                'bg-orange-third/25 animate-ping': status === 'pending',
                'bg-green-primary/25': status === 'active'
              })}
            >
              <svg
                className={clsx('', {
                  'text-orange-third shadow-orange-20': status === 'pending',
                  'text-green-primary shadow-green-primary-10': status === 'active'
                })}
                width="5"
                height="5"
                viewBox="0 0 5 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="5" height="5" rx="2.5" fill="currentColor" />
              </svg>
            </div>

            <span
              className={clsx('text-11 font-extrabold uppercase', {
                'text-orange-third': status === 'pending',
                'text-green-primary': status === 'active'
              })}
            >
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GiftCardHorizontal
