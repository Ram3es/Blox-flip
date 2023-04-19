import React from 'react'
import boxIcon from '../../assets/img/box-with-gradient.svg'
import productIcon from '../../assets/img/product-package.svg'
import { IMAGES } from '../../constants/images'
import { QuantityCoinsWithChildren } from '../../components/common/QuantityCoins/QuantityWithChildren'
import DiamondIcon from '../../components/icons/DiamondIcon'

const Preferences = () => {
  return (
        <div className="flex flex-col md:flex-row pt-6 pb-2 px-2 border-t border-blue-highlight">
          <div className="px-2 w-full md:w-1/2  grow shrink-0 mb-4 flex flex-col">
            <div className="text-sm font-extrabold  mb-1.5 uppercase text-gradient-gold">Favourite case</div>
                <div className=" gradient-gold-profile flex items-center py-1 px-3 xxs:px-5 rounded-lg grow border--mask border-gold-gradient">
                  <img src={boxIcon} alt='box' width={26} height={26} />
                  <div className='leading-6 text-sm xxxs:text-base xm:text-[20px] ml-3 font-extrabold'>Diamond Case</div>
                  <img src={IMAGES.greenBox} alt='greenBox' className='mx-auto object-contain w-[100px] h-[100px] scale-75 xxs:scale-100'/>
                </div>
           </div>
           <div className="px-2 w-full md:w-1/2  grow shrink-0 mb-4 flex flex-col ">
             <div className="text-sm font-extrabold  mb-1.5 uppercase text-gradient-gold ">Best Drops</div>
             <div className=" gradient-gold-profile flex items-center py-1 px-3 xxs:px-5 rounded-lg grow border--mask border-gold-gradient">
               <img src={productIcon} alt='box' width={26} height={26} />
               <div className='leading-6 text-sm xxxs:text-base xm:text-[20px] ml-3 font-extrabold  '>Fiery Horns of the Netherworld</div>
                 <div className='flex flex-col xxs:flex-row md:flex-col ls:flex-row items-center w-full'>
                   <img src={IMAGES.helmet} alt='greenBox' className='mx-auto object-contain w-[100px] h-[100px] scale-75 xxs:scale-100'/>
                   <QuantityCoinsWithChildren
                      quantity={4200}
                      quantityClasses='flex items-center text-xs xxxs:text-sm xm:text-lg font-bold '
                    >
                      <span className="w-8 h-8 scale-75 sm:scale-100 shrink-0 text-center leading-8 bg-green-primary/20 rounded text-green-secondary relative mr-1 xxs:mr-3">
                        <DiamondIcon className='w-[19px] h-[18px] -inset-full absolute m-auto' />
                      </span>
                    </QuantityCoinsWithChildren>
                 </div>
             </div>
          </div>
        </div>
  )
}

export default Preferences
