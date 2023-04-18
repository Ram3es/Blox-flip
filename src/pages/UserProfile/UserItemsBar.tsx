import React from 'react'
import { QuantityCoinsWithChildren } from '../../components/common/QuantityCoins/QuantityWithChildren'
import DiamondIcon from '../../components/icons/DiamondIcon'
import { Button } from '../../components/base/Button'
import { useNavigate } from 'react-router-dom'
import ItemsIcon from '../../components/icons/ItemsIcon'

const UserItemsBar = ({ isOwnProfile, totalPriceSelected, amountSelected }: { isOwnProfile: boolean, totalPriceSelected: number, amountSelected: number }) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-wrap items-center text-gray-primary text-base">
        <div className=" mr-2.5 font-bold text-base flex items-center">
          <div className="w-4 mr-2 5 shrink-0">
            <ItemsIcon />
          </div>
        </div>
        { isOwnProfile
          ? <>
              <span>My Items</span>
              <p className='ml-2'>-</p>
              <p className="text-green-secondary font-normal text-sm min-w-[100px] leading-6 mx-2.5 ">{amountSelected} SELECTED</p>
              <div className="flex items-center rounded min-w-[100px] mr-2.5">
                <QuantityCoinsWithChildren
                  quantity={totalPriceSelected}
                  quantityClasses='flex items-center text-sm font-bold '
                >
                  <span className="w-6 h-6 text-center leading-6 bg-green-primary/20 rounded relative mr-1.5 text-green-secondary">
                    <DiamondIcon className='-inset-full absolute m-auto' />
                  </span>
                </QuantityCoinsWithChildren>
              </div>
              <Button
                onClick={() => {}}
                className='flex items-center justify-center text-sm font-bold text-white rounded border border-green-primary bg-green-primary hover:bg-green-500 py-1.5 px-7'
              >
                Sell items
              </Button>
              <Button
                  onClick={() => { navigate('/withdraw') }}
                  className='flex items-center justify-center py-1.5 px-4 ml-3 text-gray-primary text-13 font-semibold rounded bg-blue-highlight border border-blue-highlight hover:text-white '
              >
                Withdraw
              </Button>
            </>
          : (
             <span>User inventory</span>
            )
        }
    </div>
  )
}

export default UserItemsBar
