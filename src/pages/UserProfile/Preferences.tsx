import boxIcon from '../../assets/img/box-with-gradient.svg'
import productIcon from '../../assets/img/product-package.svg'
import { IMAGES } from '../../constants/images'
import DiamondIcon from '../../components/icons/DiamondIcon'
import CoinsContainer from '../../components/common/Coins/CoinsContainer'
import IconContainer from '../../components/common/Coins/IconContainer'
import CoinsTypography from '../../components/common/Coins/CoinsTypography'

const Preferences = () => {
  return (
    <div className='flex flex-col md:flex-row pt-6 pb-2 px-2 border-t border-blue-highlight'>
      <div className='px-2 w-full md:w-1/2  grow shrink-0 mb-4 flex flex-col'>
        <div className='text-sm font-extrabold  mb-1.5 uppercase text-gradient-gold'>
          Favorite case
        </div>
        <div className=' gradient-gold-profile flex items-center py-1 px-3 xxs:px-5 rounded-lg grow border--mask border-gold-gradient'>
          <img src={boxIcon} alt='box' width={26} height={26} />
          <div className='leading-6 text-sm xxxs:text-base xm:text-[20px] ml-3 font-extrabold'>
            Diamond Case
          </div>
          <img
            src={IMAGES.greenBox}
            alt='greenBox'
            className='mx-auto object-contain w-[100px] h-[100px] scale-75 xxs:scale-100'
          />
        </div>
      </div>
      <div className='px-2 w-full md:w-1/2  grow shrink-0 mb-4 flex flex-col '>
        <div className='text-sm font-extrabold  mb-1.5 uppercase text-gradient-gold '>
          Best Drops
        </div>
        <div className=' gradient-gold-profile flex items-center py-1 px-3 xxs:px-5 rounded-lg grow border--mask border-gold-gradient'>
          <img src={productIcon} alt='box' width={26} height={26} />
          <div className='leading-6 text-sm xxxs:text-base xm:text-[20px] ml-3 font-extrabold  '>
            Fiery Horns of the Netherworld
          </div>
          <div className='flex flex-col xxs:flex-row md:flex-col ls:flex-row items-center w-full'>
            <img
              src={IMAGES.helmet}
              alt='greenBox'
              className='mx-auto object-contain w-[100px] h-[100px] scale-75 xxs:scale-100'
            />
            <CoinsContainer color='Transparent'>
              <IconContainer color='GreenPrimary' size='XL'>
                <DiamondIcon className='w-[18.5px] h-[15.5px]' />
              </IconContainer>
              <CoinsTypography quantity={4200} fontSize='Size18' />
            </CoinsContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preferences
