import AffiliatesLeftTopIcon from '../../assets/img/affiliates_l_t.png'
import AffiliatesLeftIcon from '../../assets/img/affiliates_l.png'
import GiftIcon from '../../assets/img/gift.png'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import { DiamondIcon } from '../../components/DiamondIcon/DiamondIcon'
import { Button } from '../../components/base/Button'
import InputWithLabel from '../../components/base/InputWithLabel'
import { CopyIcon } from '../../components/icons/CopyIcon'
import { AffiliatesTable } from './AffiliatesTable'

export const Affiliates = () => {
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
        <div className='px-2 w-full xxs:w-1/2 md:w-auto grow shrink-0 mb-4 flex flex-col'>
          <div className='text-sm font-extrabold text-gray-primary mb-1.5'>TOTAL EARNINGS</div>
          <div className='gradient-blue-secondary flex items-center justify-center py-8 px-5 rounded-lg grow'>
            <QuantityCoins
              textSize='text-lg'
              iconHeight='8'
              iconWidth='8'
              iconSize='XL'
              quantity={1500}
            />
          </div>
        </div>
        <div className='px-2 w-full xxs:w-1/2 md:w-auto grow shrink-0 mb-4 flex flex-col'>
          <div className='text-sm font-extrabold text-gray-primary mb-1.5'>TOTAL EARNINGS</div>
          <div className='gradient-blue-secondary flex items-center justify-center py-8 px-5 rounded-lg grow'>
            <QuantityCoins
              textSize='text-lg'
              iconHeight='8'
              iconWidth='8'
              iconSize='XL'
              quantity={1500}
            />
          </div>
        </div>
        <div className='px-2 w-full xxs:w-1/2 md:w-auto grow shrink-0 mb-4 flex flex-col'>
          <div className='text-sm font-extrabold text-gray-primary mb-1.5'>TOTAL EARNINGS</div>
          <div className='gradient-blue-secondary flex items-center justify-center py-8 px-5 rounded-lg grow'>
            <QuantityCoins
              textSize='text-lg'
              iconHeight='8'
              iconWidth='8'
              iconSize='XL'
              quantity={1500}
            />
          </div>
        </div>
        <div className='px-2 w-full xxs:w-1/2 md:w-1/4 min-w-fit grow mb-4 flex flex-col'>
          <div className='text-sm font-extrabold text-green-secondary mb-1.5'>
            AVAILABLE EARNINGS
          </div>
          <div className='border bg-green-primary/15 border-green-primary flex items-center justify-center py-8 px-5 rounded-lg grow'>
            <QuantityCoins
              textSize='text-lg'
              iconHeight='8'
              iconWidth='8'
              iconSize='XL'
              quantity={1500}
            />
            <Button color='GreenPrimary' variant='Gradient'>
              <div className='flex items-center gap-1 uppercase leading-7 text-xs shadow-green-35 px-1.5 '>
                <DiamondIcon />
                Claim
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className='pb-5 border-b border-blue-highlight mb-6'></div>
      <div className='flex flex-wrap -mx-2'>
        <div className='relative px-2 w-full xs:w-1/2 md:w-auto grow shrink-0 mb-4'>
          <InputWithLabel
            type='text'
            name='affiliate'
            label='Your referral link'
            labelClasses='flex flex-col w-full mb-4 items-center'
            titleClasses='gradient-blue-secondary text-gray-primary rounded-t-xl py-2 px-5 inline-block'
            inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
            inputClasses='overflow-ellipsis grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none leading-5 py-4'
            value={1}
            placeholder='...'
            onChange={(event) => console.log(event)}
          />
          <div className='absolute z-20 top-[60px] right-7'>
            <div className='w-7 shrink-0'>
              <CopyIcon />
            </div>
          </div>
        </div>
        <div className='relative px-2 w-full xs:w-1/2 md:w-auto grow shrink-0 mb-4'>
          <InputWithLabel
            type='text'
            name='affiliate'
            label='Your referral code'
            labelClasses='flex flex-col w-full mb-4 items-center'
            titleClasses='gradient-blue-secondary text-gray-primary rounded-t-xl py-2 px-5 inline-block'
            inputWrapperClasses='bg-dark/25 rounded-xl overflow-hidden w-full'
            inputClasses='overflow-ellipsis grow w-0 mr-2 bg-transparent bg-none border-none outline-none shadow-none leading-5 py-4'
            value={1}
            placeholder='...'
            onChange={(event) => console.log(event)}
          />
          <div className='absolute z-20 top-[53px] right-7'>
            <Button color='GreenPrimary' variant='Gradient'>
              <p className='text-xs font-bold gradient-green shadow-green-35 rounded px-4 py-3'>
                Change
              </p>
            </Button>
          </div>
        </div>
      </div>
      <div className='pb-5 border-b border-blue-highlight mb-6'></div>
      {/* <div className='overflow-auto max-w-full'>
        <table className='text-13 min-w-full border-separate border-spacing-y-1'>
          <thead className='text-left'>
            <tr className='contents'>
              <th className='pb-2 font-medium'>
                <div className='inline-block text-gray-primary py-1 leading-2 px-4 rounded bg-blue-secondary border border-blue-secondary'>
                  User
                </div>
              </th>
              <th className='pb-2 font-medium'>
                <div className='inline-block text-gray-primary py-1 leading-2 px-4 mx-auto rounded bg-blue-secondary whitespace-nowrap border border-blue-secondary'>
                  Date referred
                </div>
              </th>
              <th className='pb-2 font-medium'>
                <div className='inline-block text-gray-primary py-1 leading-2 px-4 mx-auto rounded bg-blue-secondary border border-blue-secondary'>
                  Wagered
                </div>
              </th>
              <th className='pb-2 font-medium text-right'>
                <div className='inline-block text-green-primary py-1 leading-2 px-2 ml-auto rounded bg-green-primary/15 border border-green-primary'>
                  Earned
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='py-2 px-2 md:px-4 rounded-l bg-blue-secondary'>
                <div className='flex items-center justify-between text-left'>
                  <div className='w-8 h-8 shrink-0 border border-blue-highlight rounded-full overflow-hidden radial--blue mr-2.5'>
                    <img
                      src='img/avatar_img.png'
                      alt=''
                      width='40'
                      height='37'
                      loading='lazy'
                      decoding='async'
                      className='object-cover w-full h-full'
                    />
                  </div>
                  <div className='flex grow items-center'>
                    <span className='font-bold grow relative py-1 whitespace-nowrap mr-2 text-white'>
                      <span
                        className='absolute leading-4 -top-1 left-0 right-0 overflow-hidden text-ellipsis'
                        title='ArtheusArtheus Artheus Artheus Artheus'
                      >
                        ArtheusArtheus Artheus Artheus Artheus
                      </span>
                    </span>
                    <span className='border border-pink-primary text-pink-primary font-extrabold rounded leading-5 px-2 radial--pink text-11'>
                      31
                    </span>
                  </div>
                </div>
              </td>

              <td className='py-2 px-2 md:px-4 text-gray-primary bg-blue-secondary'>1/11/2023</td>

              <td className='py-2 px-2 md:px-4 text-gray-primary bg-blue-secondary'>
                <div className='flex items-center'>
                  <span className='w-5 h-5 shrink-0 text-center leading-6 bg-green-primary/20 rounded relative mr-2'>
                    <img
                      src='img/diamond_green.svg'
                      alt=''
                      width='15'
                      height='12'
                      loading='lazy'
                      decoding='async'
                      className='-inset-full absolute m-auto'
                    />
                  </span>
                  <span className='font-bold text-13 mr-2 whitespace-nowrap text-white'>
                    25, 500500<span className='text-white/50'>.00</span>
                  </span>
                </div>
              </td>

              <td className='py-2 px-2 md:px-4 text-gray-primary rounded-r bg-blue-secondary'>
                <div className='flex items-center'>
                  <span className='w-5 h-5 shrink-0 text-center leading-6 bg-green-primary/20 rounded relative mr-2'>
                    <img
                      src='img/diamond_green.svg'
                      alt=''
                      width='15'
                      height='12'
                      loading='lazy'
                      decoding='async'
                      className='-inset-full absolute m-auto'
                    />
                  </span>
                  <span className='font-bold text-13 mr-2 whitespace-nowrap text-green-primary'>
                    25, 500<span className='opacity-50'>.00</span>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td className='py-2 px-2 md:px-4 rounded-l bg-blue-secondary'>
                <div className='flex items-center justify-between text-left'>
                  <div className='w-8 h-8 shrink-0 border border-blue-highlight rounded-full overflow-hidden radial--blue mr-2.5'>
                    <img
                      src='img/avatar_img.png'
                      alt=''
                      width='40'
                      height='37'
                      loading='lazy'
                      decoding='async'
                      className='object-cover w-full h-full'
                    />
                  </div>
                  <div className='flex grow items-center'>
                    <span className='font-bold grow relative py-1 mr-2 text-white'>
                      ArtheusArtheus Artheus Artheus Artheus
                    </span>
                    <span className='border border-pink-primary text-pink-primary font-extrabold rounded leading-5 px-2 radial--pink text-11'>
                      31
                    </span>
                  </div>
                </div>
              </td>

              <td className='py-2 px-2 md:px-4 text-gray-primary bg-blue-secondary'>1/11/2023</td>

              <td className='py-2 px-2 md:px-4 text-gray-primary bg-blue-secondary'>
                <div className='flex items-center'>
                  <span className='w-5 h-5 shrink-0 text-center leading-6 bg-green-primary/20 rounded relative mr-2'>
                    <img
                      src='img/diamond_green.svg'
                      alt=''
                      width='15'
                      height='12'
                      loading='lazy'
                      decoding='async'
                      className='-inset-full absolute m-auto'
                    />
                  </span>
                  <span className='font-bold text-13 mr-2 whitespace-nowrap text-white'>
                    25, 500500<span className='text-white/50'>.00</span>
                  </span>
                </div>
              </td>

              <td className='py-2 px-2 md:px-4 text-gray-primary rounded-r bg-blue-secondary'>
                <div className='flex items-center'>
                  <span className='w-5 h-5 shrink-0 text-center leading-6 bg-green-primary/20 rounded relative mr-2'>
                    <img
                      src='img/diamond_green.svg'
                      alt=''
                      width='15'
                      height='12'
                      loading='lazy'
                      decoding='async'
                      className='-inset-full absolute m-auto'
                    />
                  </span>
                  <span className='font-bold text-13 mr-2 whitespace-nowrap text-green-primary'>
                    25, 500<span className='opacity-50'>.00</span>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td className='py-2 px-2 md:px-4 rounded-l bg-blue-secondary'>
                <div className='flex items-center justify-between text-left'>
                  <div className='w-8 h-8 shrink-0 border border-blue-highlight rounded-full overflow-hidden radial--blue mr-2.5'>
                    <img
                      src='img/avatar_img.png'
                      alt=''
                      width='40'
                      height='37'
                      loading='lazy'
                      decoding='async'
                      className='object-cover w-full h-full'
                    />
                  </div>
                  <div className='flex grow items-center'>
                    <span className='font-bold grow relative py-1 whitespace-nowrap mr-2 text-white'>
                      <span
                        className='absolute leading-4 -top-1 left-0 right-0 overflow-hidden text-ellipsis'
                        title='ArtheusArtheus Artheus Artheus Artheus'
                      >
                        ArtheusArtheus Artheus Artheus Artheus
                      </span>
                    </span>
                    <span className='border border-pink-primary text-pink-primary font-extrabold rounded leading-5 px-2 radial--pink text-11'>
                      31
                    </span>
                  </div>
                </div>
              </td>

              <td className='py-2 px-2 md:px-4 text-gray-primary bg-blue-secondary'>1/11/202</td>

              <td className='py-2 px-2 md:px-4 text-gray-primary bg-blue-secondary'>
                <div className='flex items-center'>
                  <span className='w-5 h-5 shrink-0 text-center leading-6 bg-green-primary/20 rounded relative mr-2'>
                    <img
                      src='img/diamond_green.svg'
                      alt=''
                      width='15'
                      height='12'
                      loading='lazy'
                      decoding='async'
                      className='-inset-full absolute m-auto'
                    />
                  </span>
                  <span className='font-bold text-13 mr-2 whitespace-nowrap text-white'>
                    25, 500500<span className='text-white/50'>.00</span>
                  </span>
                </div>
              </td>

              <td className='py-2 px-2 md:px-4 text-gray-primary rounded-r bg-blue-secondary'>
                <div className='flex items-center'>
                  <span className='w-5 h-5 shrink-0 text-center leading-6 bg-green-primary/20 rounded relative mr-2'>
                    <img
                      src='img/diamond_green.svg'
                      alt=''
                      width='15'
                      height='12'
                      loading='lazy'
                      decoding='async'
                      className='-inset-full absolute m-auto'
                    />
                  </span>
                  <span className='font-bold text-13 mr-2 whitespace-nowrap text-green-primary'>
                    25, 500<span className='opacity-50'>.00</span>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td className='py-2 px-2 md:px-4 rounded-l bg-blue-secondary'>
                <div className='flex items-center justify-between text-left'>
                  <div className='w-8 h-8 shrink-0 border border-blue-highlight rounded-full overflow-hidden radial--blue mr-2.5'>
                    <img
                      src='img/avatar_img.png'
                      alt=''
                      width='40'
                      height='37'
                      loading='lazy'
                      decoding='async'
                      className='object-cover w-full h-full'
                    />
                  </div>
                  <div className='flex grow items-center'>
                    <span className='font-bold grow relative py-1 mr-2 text-white'>
                      ArtheusArtheus Artheus Artheus Artheus
                    </span>
                    <span className='border border-pink-primary text-pink-primary font-extrabold rounded leading-5 px-2 radial--pink text-11'>
                      31
                    </span>
                  </div>
                </div>
              </td>

              <td className='py-2 px-2 md:px-4 text-gray-primary bg-blue-secondary'>1/11/2023</td>

              <td className='py-2 px-2 md:px-4 text-gray-primary bg-blue-secondary'>
                <div className='flex items-center'>
                  <span className='w-5 h-5 shrink-0 text-center leading-6 bg-green-primary/20 rounded relative mr-2'>
                    <img
                      src='img/diamond_green.svg'
                      alt=''
                      width='15'
                      height='12'
                      loading='lazy'
                      decoding='async'
                      className='-inset-full absolute m-auto'
                    />
                  </span>
                  <span className='font-bold text-13 mr-2 whitespace-nowrap text-white'>
                    25, 500500<span className='text-white/50'>.00</span>
                  </span>
                </div>
              </td>

              <td className='py-2 px-2 md:px-4 text-gray-primary rounded-r bg-blue-secondary'>
                <div className='flex items-center'>
                  <span className='w-5 h-5 shrink-0 text-center leading-6 bg-green-primary/20 rounded relative mr-2'>
                    <img
                      src='img/diamond_green.svg'
                      alt=''
                      width='15'
                      height='12'
                      loading='lazy'
                      decoding='async'
                      className='-inset-full absolute m-auto'
                    />
                  </span>
                  <span className='font-bold text-13 mr-2 whitespace-nowrap text-green-primary'>
                    25, 500<span className='opacity-50'>.00</span>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
      <AffiliatesTable />
    </div>
  )
}
