import React from 'react'
import { Button } from '../../components/base/Button'
import { QuantityCoinsWithChildren } from '../../components/common/QuantityCoins/QuantityWithChildren'
import { CopyIconSecond } from '../../components/icons/CopyIconSecond'
import { FairIcon } from '../../components/icons/FairIcon'
import VerticalDivider from '../../components/icons/VerticalDivider'
import NavHeader from '../../components/navigate/NavHeader'
import { IMAGES } from '../../constants/images'

const BattleCases = () => {
  return (
        <div className="max-w-1190 w-full mx-auto text-sm">
            <NavHeader
              wrapperClasses='w-full flex flex-wrap'
              title='Diamond Case' >
                <div className="flex justify-between flex-wrap items-center mb-8 text-gray-primary mr-auto">
                  <div className="flex items-center ">
                    <VerticalDivider className='mx-4'/>
                    <div className=' font-semibold'>
                      <span className='text-white' >{0}</span>
                      {` / ${6}`}
                    </div>
                    <VerticalDivider className='mx-4' />
                    <div className='bg-green-primary/15 flex items-center p-1.5 pr-4 rounded mr-4'>
                      <QuantityCoinsWithChildren
                         quantityClasses='flex items-center text-base font-bold '
                         quantity={1500} />
                    </div>
                  </div>
                </div>
                <div className='flex flex-wrap items-center ml-4 mb-8  text-gray-primary'>
                  <div className='flex items-center cursor-pointer mb-5 xxs:mb-0 '>
                    <CopyIconSecond/>
                    <span className='ml-2'>Copy Link</span>
                  </div>
                  <VerticalDivider className='mx-4  mb-5 xxs:mb-0'/>
                  <div className='flex items-center  mb-5 xxs:mb-0'>
                    <span className='mr-3'>Total cost</span>
                    <div className='bg-green-primary/15 flex items-center p-1.5 pr-4 rounded '>
                      <QuantityCoinsWithChildren
                        quantityClasses='flex items-center text-base font-bold '
                        quantity={1500} />
                    </div>
                  </div>
                </div>
            </NavHeader>
            <div className="overflow-auto xs:overflow-visible">
              <div className="min-w-3xl xs:min-w-full">
              <div className="bg-dark/15 mb-7">
                <div className="flex items-center justify-between rounded border border-dashed border-blue-highlight bg-blue-accent/40 px-5">
                  <Button
                    onClick={() => {}}
                    className='text-gray-primary text-13 py-1 leading-2 px-4 text-center rounded  border bg-blue-highlight border-blue-highlight hover:text-white my-2'
                  >
                    1v1
                  </Button>
                  <div className='relative flex items-center max-w-[80%]   '>
                    {Array.from(Array(34)).map((_, i) => (
                      <div key={i} className="px-1.5 py-3 w-12 shrink-0 relative ">
                        <img src={IMAGES.greenBox} alt="caseBox"
                          width="56"
                          height="62"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className=" absolute w-2.5 -inset-x-full m-auto -bottom-1.5">
                          {i >= 1
                            ? <img src={IMAGES.pointBlue} alt="green-point" width="10" height="10" loading="lazy" decoding="async" />
                            : <img src={IMAGES.pointGreen} alt="gray-point" width="10" height="10" loading="lazy" decoding="async" />}

                        </div>
                      </div>
                    )) }
                  </div>
                  <Button className='relative hover:z-50 rounded text-green-primary border bg-green-primary/15 hover:bg-green-primary/30 border-green-primary whitespace-nowrap px-3.5 py-1 leading-6 cursor-pointer flex items-center'>
                    <div className='w-4 shrink-0 mr-2.5'>
                      <FairIcon />
                    </div>
                     Provably fair
                  </Button>

                </div>
              </div>

              </div>
            </div>
        </div>
  )
}

export default BattleCases
