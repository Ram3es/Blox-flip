import React from 'react'
import { QuantityCoinsWithChildren } from '../../components/common/QuantityCoins/QuantityWithChildren'
import NavHeader from '../../components/navigate/NavHeader'

const BattleCases = () => {
  return (
        <div className="max-w-1190 w-full mx-auto">
            <NavHeader
              wrapperClasses='w-full flex flex-wrap mb-8'
              title='Diamond Case' >
                <div className="flex justify-between flex-wrap items-center mb-8">
                  <div className="flex items-center ">
                    <span className='mx-3'>|</span>
                    <span>{`${0} / ${6}`}</span>
                    <span className='mx-3'>|</span>
                    <div className='bg-green-primary/15 flex items-center p-1.5 pr-4 rounded'>
                      <QuantityCoinsWithChildren quantity={1500} />
                    </div>
                  </div>
                </div>
                <div className='flex items-center mb-8 ml-auto'>asfsdf</div>
            </NavHeader>

        </div>
  )
}

export default BattleCases
