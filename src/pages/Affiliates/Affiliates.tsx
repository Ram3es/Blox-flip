import AffiliatesLeftTopIcon from '../../assets/img/affiliates_l_t.png'
import AffiliatesLeftIcon from '../../assets/img/affiliates_l.png'
import GiftIcon from '../../assets/img/gift.png'
import DiamondIcon from '../../components/icons/DiamondIcon'
import { Button } from '../../components/base/Button'
import { AffiliatesTable } from './AffiliatesTable'
import { AffiliatesForm } from './AffiliatesForm'
import { Link } from 'react-router-dom'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import { useEffect, useState } from 'react'
import { useSocketCtx } from '../../store/SocketStore'
import { IAffilateData } from '../../types/Affilates'

export const Affiliates = () => {
  const [affilateData, setAffilateData] = useState<IAffilateData>()
  const { socket } = useSocketCtx()

  useEffect(() => {
    socket.emit('affiliates_load', ({ data }: { data: IAffilateData }) => {
      setAffilateData(data)
    })
  }, [])

  useEffect(() => {
    socket.emit('load_affiliates', ({ data }: { data: IAffilateData }) => {
      setAffilateData(data)
    })
  }, [])
  return (
    <div className='max-w-5xl w-full mx-auto'>
      <div className='text-center relative rounded-2xl border border-lightblue-primary/70 mb-12 xs:mb-9'>
        <div className='bg-gradient-to-br from-lightblue-wave/75 to-green-highlight/40 rounded-2xl'>
          <div className='z-20 w-28 xxs:w-48 inset-0 right-auto absolute'>
            <img
              src={AffiliatesLeftTopIcon}
              alt=''
              width='163'
              height='177'
              loading='lazy'
              decoding='async'
              className='absolute top-0 left-0 z-20'
            />
            <img
              src={AffiliatesLeftIcon}
              alt=''
              width='175'
              height='158'
              loading='lazy'
              decoding='async'
              className='absolute z-30 left-3 -bottom-8 xxs:-bottom-3'
            />
          </div>
          <div className='relative z-30 flex flex-col items-center grow pb-12 pl-6 pt-10 xxs:pl-44 pr-6 xs:pr-48'>
            <div className='text-5xl font-extrabold mb-2 bg-clip-text text-transparent gradient-affiliate-text'>
              AFFILIATES
            </div>
            <div className='text-lg text-lightblue-accent'>
              Refer friends & randoms to earn and increase your rewards! <br />
              Additionally everyone you refer to will get a free Case, it’s a win win!
            </div>
          </div>
          <div className='z-20 w-28 xs:w-48 bottom-0 right-0 xs:top-0 left-auto absolute'>
            <img
              src={GiftIcon}
              alt=''
              width='200'
              height='192'
              loading='lazy'
              decoding='async'
              className='absolute xs:mt-auto xs:mb-auto xs:-top-full -bottom-12 xs:-bottom-full left:auto right-0  z-30'
            />
          </div>
        </div>
      </div>
      <div className='flex flex-wrap -mx-2'>
        {/* <div className='px-2 w-full xxs:w-1/2 md:w-auto grow shrink-0 mb-4 flex flex-col'>
          <div className='text-sm font-extrabold text-gray-primary mb-1.5'>TOTAL EARNINGS</div>
          <div className='gradient-blue-secondary flex items-center justify-center py-8 px-5 rounded-lg grow'>
            <CoinsWithDiamond
              iconContainerSize='XL'
              iconClasses='w-[18.5px] h-[15.5px]'
              typographyQuantity={1500}
              typographyFontSize='Size18'
            />
          </div>
        </div> */}
        <div className='px-2 w-full xxs:w-1/2 md:w-auto grow shrink-0 mb-4 flex flex-col'>
          <div className='text-sm font-extrabold text-gray-primary mb-1.5'>TOTAL DEPOSITED</div>
          <div className='gradient-blue-secondary flex items-center justify-center py-8 px-5 rounded-lg grow'>
            <CoinsWithDiamond
              iconContainerSize='XL'
              iconClasses='w-[18.5px] h-[15.5px]'
              typographyQuantity={affilateData?.totaldeposited ?? 0}
              typographyFontSize='Size18'
            />
          </div>
        </div>
        <div className='px-2 w-full xxs:w-1/2 md:w-auto grow shrink-0 mb-4 flex flex-col'>
          <div className='text-sm font-extrabold text-gray-primary mb-1.5'>TOTAL EARNINGS</div>
          <div className='gradient-blue-secondary flex items-center justify-center py-8 px-5 rounded-lg grow'>
            <CoinsWithDiamond
              iconContainerSize='XL'
              iconClasses='w-[18.5px] h-[15.5px]'
              typographyQuantity={affilateData?.totalearned ?? 0}
              typographyFontSize='Size18'
            />
          </div>
        </div>
        <div className='px-2 w-full xxs:w-1/2 md:w-1/4 min-w-fit grow mb-4 flex flex-col'>
          <div className='text-sm font-extrabold text-green-secondary mb-1.5'>
            AVAILABLE EARNINGS
          </div>
          <div className='border bg-green-primary/15 border-green-primary flex items-center justify-center py-8 px-4 rounded-lg grow'>
            <CoinsWithDiamond
              iconContainerSize='XL'
              iconClasses='w-[18.5px] h-[15.5px]'
              typographyQuantity={affilateData?.available ?? 0}
              typographyFontSize='Size18'
            />
            <Link to='/withdraw'>
              <Button color='GreenPrimary' variant='GreenGradient'>
                <div className='flex items-center gap-1 uppercase leading-7 text-xs shadow-green-35 px-2 '>
                  <DiamondIcon className='w-[16px] h-[12px]' />
                  Claim
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className='pb-5 border-b border-blue-highlight mb-6'></div>
      <AffiliatesForm referalCode={ affilateData?.link } />
      <div className='pb-5 border-b border-blue-highlight mb-6'></div>
      { affilateData?.users?.length &&
        <AffiliatesTable data={affilateData.users } />}
    </div>
  )
}
