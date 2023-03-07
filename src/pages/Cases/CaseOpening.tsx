import { ArrowGrayIcon } from '../../components/ArrowGrayIcon/ArrowGrayIcon'
import { Button } from '../../components/base/Button'
import { QuantityCoins } from '../../components/common/QuantityCoins/QuantityCoins'
import { FairIcon } from '../../components/icons/FairIcon'
import { UnboxingIcon } from '../../components/icons/UnboxingIcon'

import ItemBig from '../../assets/img/item_big1.png'
import { OpeningLineIcon } from '../../components/icons/OpeningLineIcon'
import FirstCase from '../../assets/img/case1.png'
import SecondCase from '../../assets/img/case2.png'
import { DoubleRombIcon } from '../../components/icons/DoubleRombIcon'
import SelectedIcon from '../../components/icons/SelectedIcon'

export const CaseOpening = () => {
  return (
    <div className='max-w-1190 w-full m-auto'>
      <div className='flex flex-wrap justify-between mb-5'>
        <div className='w-36 flex'>
          <Button className='rounded p-2 leading-4 text-gray-primary font-semibold flex  items-center bg-blue-accent-secondary hover:bg-blue-accent hover:text-white mb-4 mr-auto'>
            <span className='mr-1.5 rotate-90'>
              <ArrowGrayIcon />
            </span>
            Back
          </Button>
        </div>
        <div className='flex items-center mb-4 mx-2'>
          <div className='w-6 shrink-0 mr-3'>
            <UnboxingIcon />
          </div>
          <span className='text-2xl font-bold'>Diamond Case</span>
        </div>
        <Button className='relative hover:z-50 rounded text-green-primary border bg-green-primary/15 hover:bg-green-primary/30 border-green-primary whitespace-nowrap px-3.5 py-1 leading-6 cursor-pointer mb-4 flex items-center'>
          <div className='w-4 shrink-0 mr-2.5'>
            <FairIcon />
          </div>
          Provably fair
        </Button>
      </div>
      <div className='border-t border-b border-t-sky-primary/40 border-b-sky-primary/40 rounded mb-9'>
        <div className='border--mask border--radial-blue  bg-gradient-radial from-blue-light-secondary/30 to-blue-accent-secondary/1 rounded text-sm px-4 sm:px-12 py-9 overflow-hidden relative'>
          <div className='flex flex-wrap justify-center relative items-start z-10 mb-4 px-4 sm:px-12 -mx-4 sm:-mx-12'>
            <div className='flex flex-wrap justify-center sm:justify-start min-w-fit mb-5 z-20 relative'>
              <div className='bg-green-primary/15 flex items-center px-1 pr-4 rounded mr-2.5 mb-2'>
                {/* <span className='w-6 h-6 text-center leading-6 bg-green-primary/20 rounded relative mr-3'>
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
                <span className='font-bold text-base whitespace-nowrap'>
                  1,500<span className='text-white/50'>.00</span>
                </span> */}
                <QuantityCoins quantity={1500} />
              </div>
              <Button className='bg-green-primary hover:bg-green-500  border border-green-primary py-2 px-7 leading-4 rounded mb-2'>
                Create
              </Button>
            </div>
            <div className='flex flex-wrap items-center justify-center xs:justify-end sm:justify-end -mx-0.5 text-center leading-10 text-gray-primary font-semibold xs:ml-auto min-w-fit xs:min-w-0 xs:w-1/3 z-20 relative'>
              <Button className='mx-0.5 mb-1 w-10 h-10 rounded bg-blue-accent-secondary border border-blue-accent-secondary hover:bg-blue-accent-secondary/30 hover:text-white pag--active'>
                1
              </Button>
              <Button className='mx-0.5 mb-1 w-10 h-10 rounded bg-blue-accent-secondary border border-blue-accent-secondary hover:bg-blue-accent-secondary/30 hover:text-white pag--active'>
                2
              </Button>
              <Button className='mx-0.5 mb-1 w-10 h-10 rounded bg-blue-accent-secondary border border-blue-accent-secondary hover:bg-blue-accent-secondary/30 hover:text-white pag--active'>
                3
              </Button>
              <Button className='mx-0.5 mb-1 w-10 h-10 rounded bg-blue-accent-secondary border border-blue-accent-secondary hover:bg-blue-accent-secondary/30 hover:text-white pag--active'>
                4
              </Button>
            </div>
            <div className='xs:-mt-18 min-w-full flex items-center relative z-10'>
              <div className='bg-gradient-to-l from:bg-blue-highlight/0 to-bg-blue-highlight h-px grow'></div>
              <div className="flex before:content-[''] before:pb-60% before:w-0 before:shrink-0">
                <div className='text-center min-w-fit mb-5 w-64 min-h-1/2 px-4 relative shrink-0'>
                  <img
                    src={ItemBig}
                    alt=''
                    width='148'
                    height='161'
                    loading='lazy'
                    decoding='async'
                    className='mx-auto'
                  />
                </div>
              </div>
              <div className='bg-gradient-to-r from:bg-blue-highlight/0 to-bg-blue-highlight h-px grow'></div>
            </div>
          </div>
          <div className='relative z-10 bg-dark/30 overflow-hidden mb-2.5 rounded'>
            <div className='flex overflow-x-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full py-3'>
              <div className='absolute left-1/2 -ml-0.5 top-0 z-20 w-0.5 xs:w-1'>
                <OpeningLineIcon />
              </div>
              <div className='absolute left-1/2 -ml-0.5 bottom-0 z-20 rotate-180 w-0.5 xs:w-1'>
                <OpeningLineIcon />
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='relative z-10 bg-dark/30 overflow-hidden mb-2.5 rounded'>
            <div className='flex overflow-x-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full py-3'>
              <div className='absolute left-1/2 -ml-0.5 top-0 z-20 w-0.5 xs:w-1'>
                <OpeningLineIcon />
              </div>
              <div className='absolute left-1/2 -ml-0.5 bottom-0 z-20 rotate-180 w-0.5 xs:w-1'>
                <OpeningLineIcon />
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='relative z-10 bg-dark/30 overflow-hidden mb-2.5 rounded'>
            <div className='flex overflow-x-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full py-3'>
              <div className='absolute left-1/2 -ml-0.5 top-0 z-20 w-0.5 xs:w-1'>
                <OpeningLineIcon />
              </div>
              <div className='absolute left-1/2 -ml-0.5 bottom-0 z-20 rotate-180 w-0.5 xs:w-1'>
                <OpeningLineIcon />
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className='mx-1.5 w-16 h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 shrink-0 relative z-10'>
                <div className='rounded border-b border-b-red-secondary/40 h-full'>
                  <a
                    href='#'
                    className='border--mask before:border-t-0 before:bg-gradient-to-t before:from-red-secondary/40 before:to-blue-primary/0 rounded h-full overflow-hidden relative'
                  >
                    <div className='bg-gradient-radial-60 from-red-primary/25 to-dark/0  h-full rounded relative border-8 border-transparent'>
                      <img
                        src={FirstCase}
                        alt=''
                        width='68'
                        height='52'
                        loading='lazy'
                        decoding='async'
                        className='absolute object-contain w-full h-full'
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center mb-6'>
        <div className='h-px grow mr-2.5 bg-gradient-to-r from-blue-highlight to-blue-light-secondary/0'></div>
        <div className='min-w-fit'>
          <DoubleRombIcon />
        </div>
        <span className='text-lg font-extrabold bg-clip-text text-transparent gradient-violet-text mx-2'>
          POTENTIAL DROPS
        </span>
        <div className='min-w-fit rotate-180'>
          <DoubleRombIcon />
        </div>
        <div className='h-px grow mr-2.5 bg-gradient-to-l from-blue-highlight to-blue-light-secondary/0'></div>
      </div>
      <div className='flex flex-wrap -mx-1 mb-8 md:mb-12 text-xs'>
        <div className='px-1 w-1/2 xxs:w-1/4 xs:w-1/5 md:w-1/7 shrink-0 lg:w-1/9 mb-2 group/item is-percent'>
          <a
            href='#'
            className='border--mask border--radial-orange rounded h-full overflow-hidden relative z-20 group-[.is-selected]/item:border-0 group-[.is-selected]/item:before:hidden'
          >
            {/* ???? */}
            <div className='gradient-blue-secondary rounded h-full text-center relative z-20 group-[.is-selected]/item:border-0'>
              <div className='absolute inset-0 rounded bg-dark/40 z-30 hidden group-[.is-selected]/item:block'>
                <div className='flex items-center justify-center text-xs m-auto absolute w-full h-5 leading-5 -inset-full'>
                  <div className='w-4 shrink-0 mr-1.5'>
                    <SelectedIcon />
                  </div>
                  SELECTED
                </div>
                <div className='absolute flex justify-center z-40 bottom-4 w-full left-0'>
                  <div className='flex bg-green-primary/15 items-center px-1.5 py-1 rounded'>
                    <QuantityCoins quantity={1500} />
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
              <div className='bg-gradient-radial-60 from-orange-primary-light/20 to-dark/0 flex flex-col group-[.is-added]/item:block items-center justify-between rounded h-full py-2.5 px-2 group-[.is-added]/item:px-5 group-[.is-selected]/item:blur-3xl'>
                <div className='mb-2 hidden group-[.is-percent]/item:block'>1.5%</div>
                <div className='w-2 h-2 outline outline-4 rounded-full bg-green-primary outline-green-primary/25 shadow-green-primary-10 mb-2 group-[.is-added]/item:hidden group-[.is-percent]/item:hidden'></div>
                <div className='text-gray-primary mb-2.5 grow flex flex-col justify-center group-[.is-added]/item:text-left'>
                  <span>Fiery Horns of the Netherworld</span>
                </div>
                <div className='w-full group-[.is-added]/item:flex group-[.is-added]/item:items-start'>
                  <div className='w-full shrink-0 pb-60% h-0 relative mb-2.5 group-[.is-added]/item:mr-3 group-[.is-added]/item:mb-0 group-[.is-added]/item:w-2/5'>
                    <img
                      src={FirstCase}
                      alt=''
                      width='68'
                      height='52'
                      loading='lazy'
                      decoding='async'
                      className='absolute object-contain w-full h-full'
                    />
                  </div>
                  <div className='flex items-center justify-center relative z-40'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
            </div>
            {/* ???? */}
          </a>
        </div>
        <div className='px-1 w-1/2 xxs:w-1/4 xs:w-1/5 md:w-1/7 shrink-0 lg:w-1/9 mb-2 group/item is-percent'>
          <a
            href='#'
            className='border--mask border--radial-orange rounded h-full overflow-hidden relative z-20 group-[.is-selected]/item:border-0 group-[.is-selected]/item:before:hidden'
          >
            <div className='gradient-blue-secondary rounded h-full text-center relative z-20 group-[.is-selected]/item:border-0'>
              <div className='absolute inset-0 rounded bg-dark/40 z-30 hidden group-[.is-selected]/item:block'>
                <div className='flex items-center justify-center text-xs m-auto absolute w-full h-5 leading-5 -inset-full'>
                  <div className='w-4 shrink-0 mr-1.5'>
                    <SelectedIcon />
                  </div>
                  SELECTED
                </div>
                <div className='absolute flex justify-center z-40 bottom-4 w-full left-0'>
                  <div className='flex bg-green-primary/15 items-center px-1.5 py-1 rounded'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
              <div className='bg-gradient-radial-60 from-orange-primary-light/20 to-dark/0 flex flex-col group-[.is-added]/item:block items-center justify-between rounded h-full py-2.5 px-2 group-[.is-added]/item:px-5 group-[.is-selected]/item:blur-3xl'>
                <div className='mb-2 hidden group-[.is-percent]/item:block'>1.5%</div>
                <div className='w-2 h-2 outline outline-4 rounded-full bg-green-primary outline-green-primary/25 shadow-green-primary-10 mb-2 group-[.is-added]/item:hidden group-[.is-percent]/item:hidden'></div>
                <div className='text-gray-primary mb-2.5 grow flex flex-col justify-center group-[.is-added]/item:text-left'>
                  <span>Fiery Horns of the Netherworld</span>
                </div>
                <div className='w-full group-[.is-added]/item:flex group-[.is-added]/item:items-start'>
                  <div className='w-full shrink-0 pb-60% h-0 relative mb-2.5 group-[.is-added]/item:mr-3 group-[.is-added]/item:mb-0 group-[.is-added]/item:w-2/5'>
                    <img
                      src={FirstCase}
                      alt=''
                      width='68'
                      height='52'
                      loading='lazy'
                      decoding='async'
                      className='absolute object-contain w-full h-full'
                    />
                  </div>
                  <div className='flex items-center justify-center relative z-40'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className='px-1 w-1/2 xxs:w-1/4 xs:w-1/5 md:w-1/7 shrink-0 lg:w-1/9 mb-2 group/item is-percent'>
          <a
            href='#'
            className='border--mask border--radial-orange rounded h-full overflow-hidden relative z-20 group-[.is-selected]/item:border-0 group-[.is-selected]/item:before:hidden'
          >
            <div className='gradient-blue-secondary rounded h-full text-center relative z-20 group-[.is-selected]/item:border-0'>
              <div className='absolute inset-0 rounded bg-dark/40 z-30 hidden group-[.is-selected]/item:block'>
                <div className='flex items-center justify-center text-xs m-auto absolute w-full h-5 leading-5 -inset-full'>
                  <div className='w-4 shrink-0 mr-1.5'>
                    <SelectedIcon />
                  </div>
                  SELECTED
                </div>
                <div className='absolute flex justify-center z-40 bottom-4 w-full left-0'>
                  <div className='flex bg-green-primary/15 items-center px-1.5 py-1 rounded'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
              <div className='bg-gradient-radial-60 from-orange-primary-light/20 to-dark/0 flex flex-col group-[.is-added]/item:block items-center justify-between rounded h-full py-2.5 px-2 group-[.is-added]/item:px-5 group-[.is-selected]/item:blur-3xl'>
                <div className='mb-2 hidden group-[.is-percent]/item:block'>1.5%</div>
                <div className='w-2 h-2 outline outline-4 rounded-full bg-green-primary outline-green-primary/25 shadow-green-primary-10 mb-2 group-[.is-added]/item:hidden group-[.is-percent]/item:hidden'></div>
                <div className='text-gray-primary mb-2.5 grow flex flex-col justify-center group-[.is-added]/item:text-left'>
                  <span>Fiery Horns of the Netherworld</span>
                </div>
                <div className='w-full group-[.is-added]/item:flex group-[.is-added]/item:items-start'>
                  <div className='w-full shrink-0 pb-60% h-0 relative mb-2.5 group-[.is-added]/item:mr-3 group-[.is-added]/item:mb-0 group-[.is-added]/item:w-2/5'>
                    <img
                      src={FirstCase}
                      alt=''
                      width='68'
                      height='52'
                      loading='lazy'
                      decoding='async'
                      className='absolute object-contain w-full h-full'
                    />
                  </div>
                  <div className='flex items-center justify-center relative z-40'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className='px-1 w-1/2 xxs:w-1/4 xs:w-1/5 md:w-1/7 shrink-0 lg:w-1/9 mb-2 group/item is-percent'>
          <a
            href='#'
            className='border--mask border--radial-orange rounded h-full overflow-hidden relative z-20 group-[.is-selected]/item:border-0 group-[.is-selected]/item:before:hidden'
          >
            <div className='gradient-blue-secondary rounded h-full text-center relative z-20 group-[.is-selected]/item:border-0'>
              <div className='absolute inset-0 rounded bg-dark/40 z-30 hidden group-[.is-selected]/item:block'>
                <div className='flex items-center justify-center text-xs m-auto absolute w-full h-5 leading-5 -inset-full'>
                  <div className='w-4 shrink-0 mr-1.5'>
                    <SelectedIcon />
                  </div>
                  SELECTED
                </div>
                <div className='absolute flex justify-center z-40 bottom-4 w-full left-0'>
                  <div className='flex bg-green-primary/15 items-center px-1.5 py-1 rounded'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
              <div className='bg-gradient-radial-60 from-orange-primary-light/20 to-dark/0 flex flex-col group-[.is-added]/item:block items-center justify-between rounded h-full py-2.5 px-2 group-[.is-added]/item:px-5 group-[.is-selected]/item:blur-3xl'>
                <div className='mb-2 hidden group-[.is-percent]/item:block'>1.5%</div>
                <div className='w-2 h-2 outline outline-4 rounded-full bg-green-primary outline-green-primary/25 shadow-green-primary-10 mb-2 group-[.is-added]/item:hidden group-[.is-percent]/item:hidden'></div>
                <div className='text-gray-primary mb-2.5 grow flex flex-col justify-center group-[.is-added]/item:text-left'>
                  <span>Fiery Horns of the Netherworld</span>
                </div>
                <div className='w-full group-[.is-added]/item:flex group-[.is-added]/item:items-start'>
                  <div className='w-full shrink-0 pb-60% h-0 relative mb-2.5 group-[.is-added]/item:mr-3 group-[.is-added]/item:mb-0 group-[.is-added]/item:w-2/5'>
                    <img
                      src={FirstCase}
                      alt=''
                      width='68'
                      height='52'
                      loading='lazy'
                      decoding='async'
                      className='absolute object-contain w-full h-full'
                    />
                  </div>
                  <div className='flex items-center justify-center relative z-40'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className='px-1 w-1/2 xxs:w-1/4 xs:w-1/5 md:w-1/7 shrink-0 lg:w-1/9 mb-2 group/item is-percent'>
          <a
            href='#'
            className='border--mask border--radial-blue rounded h-full overflow-hidden relative z-20 group-[.is-selected]/item:border-0 group-[.is-selected]/item:before:hidden'
          >
            <div className='gradient-blue-secondary rounded h-full text-center relative z-20 group-[.is-selected]/item:border-0'>
              <div className='absolute inset-0 rounded bg-dark/40 z-30 hidden group-[.is-selected]/item:block'>
                <div className='flex items-center justify-center text-xs m-auto absolute w-full h-5 leading-5 -inset-full'>
                  <div className='w-4 shrink-0 mr-1.5'>
                    <SelectedIcon />
                  </div>
                  SELECTED
                </div>
                <div className='absolute flex justify-center z-40 bottom-4 w-full left-0'>
                  <div className='flex bg-green-primary/15 items-center px-1.5 py-1 rounded'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
              <div className='radial--blue-light flex flex-col group-[.is-added]/item:block items-center justify-between rounded h-full py-2.5 px-2 group-[.is-added]/item:px-5 group-[.is-selected]/item:blur-3xl'>
                <div className='mb-2 hidden group-[.is-percent]/item:block'>1.5%</div>
                <div className='w-2 h-2 outline outline-4 rounded-full bg-green-primary outline-green-primary/25 shadow-green-primary-10 mb-2 group-[.is-added]/item:hidden group-[.is-percent]/item:hidden'></div>
                <div className='text-gray-primary mb-2.5 grow flex flex-col justify-center group-[.is-added]/item:text-left'>
                  <span>Fiery Horns of the Netherworld</span>
                </div>
                <div className='w-full group-[.is-added]/item:flex group-[.is-added]/item:items-start'>
                  <div className='w-full shrink-0 pb-60% h-0 relative mb-2.5 group-[.is-added]/item:mr-3 group-[.is-added]/item:mb-0 group-[.is-added]/item:w-2/5'>
                    <img
                      src={SecondCase}
                      alt=''
                      width='73'
                      height='84'
                      loading='lazy'
                      decoding='async'
                      className='absolute object-contain w-full h-full'
                    />
                  </div>
                  <div className='flex items-center justify-center'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className='px-1 w-1/2 xxs:w-1/4 xs:w-1/5 md:w-1/7 shrink-0 lg:w-1/9 mb-2 group/item is-percent'>
          <a
            href='#'
            className='border--mask border--radial-blue rounded h-full overflow-hidden relative z-20 group-[.is-selected]/item:border-0 group-[.is-selected]/item:before:hidden'
          >
            <div className='gradient-blue-secondary rounded h-full text-center relative z-20 group-[.is-selected]/item:border-0'>
              <div className='absolute inset-0 rounded bg-dark/40 z-30 hidden group-[.is-selected]/item:block'>
                <div className='flex items-center justify-center text-xs m-auto absolute w-full h-5 leading-5 -inset-full'>
                  <div className='w-4 shrink-0 mr-1.5'>
                    <SelectedIcon />
                  </div>
                  SELECTED
                </div>
                <div className='absolute flex justify-center z-40 bottom-4 w-full left-0'>
                  <div className='flex bg-green-primary/15 items-center px-1.5 py-1 rounded'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
              <div className='radial--blue-light flex flex-col group-[.is-added]/item:block items-center justify-between rounded h-full py-2.5 px-2 group-[.is-added]/item:px-5 group-[.is-selected]/item:blur-3xl'>
                <div className='mb-2 hidden group-[.is-percent]/item:block'>1.5%</div>
                <div className='w-2 h-2 outline outline-4 rounded-full bg-green-primary outline-green-primary/25 shadow-green-primary-10 mb-2 group-[.is-added]/item:hidden group-[.is-percent]/item:hidden'></div>
                <div className='text-gray-primary mb-2.5 grow flex flex-col justify-center group-[.is-added]/item:text-left'>
                  <span>Fiery Horns of the Netherworld</span>
                </div>
                <div className='w-full group-[.is-added]/item:flex group-[.is-added]/item:items-start'>
                  <div className='w-full shrink-0 pb-60% h-0 relative mb-2.5 group-[.is-added]/item:mr-3 group-[.is-added]/item:mb-0 group-[.is-added]/item:w-2/5'>
                    <img
                      src={SecondCase}
                      alt=''
                      width='73'
                      height='84'
                      loading='lazy'
                      decoding='async'
                      className='absolute object-contain w-full h-full'
                    />
                  </div>
                  <div className='flex items-center justify-center'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className='px-1 w-1/2 xxs:w-1/4 xs:w-1/5 md:w-1/7 shrink-0 lg:w-1/9 mb-2 group/item is-percent'>
          <a
            href='#'
            className='border--mask border--radial-blue rounded h-full overflow-hidden relative z-20 group-[.is-selected]/item:border-0 group-[.is-selected]/item:before:hidden'
          >
            <div className='gradient-blue-secondary rounded h-full text-center relative z-20 group-[.is-selected]/item:border-0'>
              <div className='absolute inset-0 rounded bg-dark/40 z-30 hidden group-[.is-selected]/item:block'>
                <div className='flex items-center justify-center text-xs m-auto absolute w-full h-5 leading-5 -inset-full'>
                  <div className='w-4 shrink-0 mr-1.5'>
                    <SelectedIcon />
                  </div>
                  SELECTED
                </div>
                <div className='absolute flex justify-center z-40 bottom-4 w-full left-0'>
                  <div className='flex bg-green-primary/15 items-center px-1.5 py-1 rounded'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
              <div className='radial--blue-light flex flex-col group-[.is-added]/item:block items-center justify-between rounded h-full py-2.5 px-2 group-[.is-added]/item:px-5 group-[.is-selected]/item:blur-3xl'>
                <div className='mb-2 hidden group-[.is-percent]/item:block'>1.5%</div>
                <div className='w-2 h-2 outline outline-4 rounded-full bg-green-primary outline-green-primary/25 shadow-green-primary-10 mb-2 group-[.is-added]/item:hidden group-[.is-percent]/item:hidden'></div>
                <div className='text-gray-primary mb-2.5 grow flex flex-col justify-center group-[.is-added]/item:text-left'>
                  <span>Fiery Horns of the Netherworld</span>
                </div>
                <div className='w-full group-[.is-added]/item:flex group-[.is-added]/item:items-start'>
                  <div className='w-full shrink-0 pb-60% h-0 relative mb-2.5 group-[.is-added]/item:mr-3 group-[.is-added]/item:mb-0 group-[.is-added]/item:w-2/5'>
                    <img
                      src={SecondCase}
                      alt=''
                      width='73'
                      height='84'
                      loading='lazy'
                      decoding='async'
                      className='absolute object-contain w-full h-full'
                    />
                  </div>
                  <div className='flex items-center justify-center'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className='px-1 w-1/2 xxs:w-1/4 xs:w-1/5 md:w-1/7 shrink-0 lg:w-1/9 mb-2 group/item is-percent'>
          <a
            href='#'
            className='border--mask border--radial-blue rounded h-full overflow-hidden relative z-20 group-[.is-selected]/item:border-0 group-[.is-selected]/item:before:hidden'
          >
            <div className='gradient-blue-secondary rounded h-full text-center relative z-20 group-[.is-selected]/item:border-0'>
              <div className='absolute inset-0 rounded bg-dark/40 z-30 hidden group-[.is-selected]/item:block'>
                <div className='flex items-center justify-center text-xs m-auto absolute w-full h-5 leading-5 -inset-full'>
                  <div className='w-4 shrink-0 mr-1.5'>
                    <SelectedIcon />
                  </div>
                  SELECTED
                </div>
                <div className='absolute flex justify-center z-40 bottom-4 w-full left-0'>
                  <div className='flex bg-green-primary/15 items-center px-1.5 py-1 rounded'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
              <div className='radial--blue-light flex flex-col group-[.is-added]/item:block items-center justify-between rounded h-full py-2.5 px-2 group-[.is-added]/item:px-5 group-[.is-selected]/item:blur-3xl'>
                <div className='mb-2 hidden group-[.is-percent]/item:block'>1.5%</div>
                <div className='w-2 h-2 outline outline-4 rounded-full bg-green-primary outline-green-primary/25 shadow-green-primary-10 mb-2 group-[.is-added]/item:hidden group-[.is-percent]/item:hidden'></div>
                <div className='text-gray-primary mb-2.5 grow flex flex-col justify-center group-[.is-added]/item:text-left'>
                  <span>Fiery Horns of the Netherworld</span>
                </div>
                <div className='w-full group-[.is-added]/item:flex group-[.is-added]/item:items-start'>
                  <div className='w-full shrink-0 pb-60% h-0 relative mb-2.5 group-[.is-added]/item:mr-3 group-[.is-added]/item:mb-0 group-[.is-added]/item:w-2/5'>
                    <img
                      src={SecondCase}
                      alt=''
                      width='73'
                      height='84'
                      loading='lazy'
                      decoding='async'
                      className='absolute object-contain w-full h-full'
                    />
                  </div>
                  <div className='flex items-center justify-center'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className='px-1 w-1/2 xxs:w-1/4 xs:w-1/5 md:w-1/7 shrink-0 lg:w-1/9 mb-2 group/item is-percent'>
          <a
            href='#'
            className='border--mask border--radial-blue rounded h-full overflow-hidden relative z-20 group-[.is-selected]/item:border-0 group-[.is-selected]/item:before:hidden'
          >
            <div className='gradient-blue-secondary rounded h-full text-center relative z-20 group-[.is-selected]/item:border-0'>
              <div className='absolute inset-0 rounded bg-dark/40 z-30 hidden group-[.is-selected]/item:block'>
                <div className='flex items-center justify-center text-xs m-auto absolute w-full h-5 leading-5 -inset-full'>
                  <div className='w-4 shrink-0 mr-1.5'>
                    <SelectedIcon />
                  </div>
                  SELECTED
                </div>
                <div className='absolute flex justify-center z-40 bottom-4 w-full left-0'>
                  <div className='flex bg-green-primary/15 items-center px-1.5 py-1 rounded'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
              <div className='radial--blue-light flex flex-col group-[.is-added]/item:block items-center justify-between rounded h-full py-2.5 px-2 group-[.is-added]/item:px-5 group-[.is-selected]/item:blur-3xl'>
                <div className='mb-2 hidden group-[.is-percent]/item:block'>1.5%</div>
                <div className='w-2 h-2 outline outline-4 rounded-full bg-green-primary outline-green-primary/25 shadow-green-primary-10 mb-2 group-[.is-added]/item:hidden group-[.is-percent]/item:hidden'></div>
                <div className='text-gray-primary mb-2.5 grow flex flex-col justify-center group-[.is-added]/item:text-left'>
                  <span>Fiery Horns of the Netherworld</span>
                </div>
                <div className='w-full group-[.is-added]/item:flex group-[.is-added]/item:items-start'>
                  <div className='w-full shrink-0 pb-60% h-0 relative mb-2.5 group-[.is-added]/item:mr-3 group-[.is-added]/item:mb-0 group-[.is-added]/item:w-2/5'>
                    <img
                      src={SecondCase}
                      alt=''
                      width='73'
                      height='84'
                      loading='lazy'
                      decoding='async'
                      className='absolute object-contain w-full h-full'
                    />
                  </div>
                  <div className='flex items-center justify-center'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className='px-1 w-1/2 xxs:w-1/4 xs:w-1/5 md:w-1/7 shrink-0 lg:w-1/9 mb-2 group/item is-percent'>
          <a
            href='#'
            className='border--mask border--radial-blue rounded h-full overflow-hidden relative z-20 group-[.is-selected]/item:border-0 group-[.is-selected]/item:before:hidden'
          >
            <div className='gradient-blue-secondary rounded h-full text-center relative z-20 group-[.is-selected]/item:border-0'>
              <div className='absolute inset-0 rounded bg-dark/40 z-30 hidden group-[.is-selected]/item:block'>
                <div className='flex items-center justify-center text-xs m-auto absolute w-full h-5 leading-5 -inset-full'>
                  <div className='w-4 shrink-0 mr-1.5'>
                    <SelectedIcon />
                  </div>
                  SELECTED
                </div>
                <div className='absolute flex justify-center z-40 bottom-4 w-full left-0'>
                  <div className='flex bg-green-primary/15 items-center px-1.5 py-1 rounded'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
              <div className='radial--blue-light flex flex-col group-[.is-added]/item:block items-center justify-between rounded h-full py-2.5 px-2 group-[.is-added]/item:px-5 group-[.is-selected]/item:blur-3xl'>
                <div className='mb-2 hidden group-[.is-percent]/item:block'>1.5%</div>
                <div className='w-2 h-2 outline outline-4 rounded-full bg-green-primary outline-green-primary/25 shadow-green-primary-10 mb-2 group-[.is-added]/item:hidden group-[.is-percent]/item:hidden'></div>
                <div className='text-gray-primary mb-2.5 grow flex flex-col justify-center group-[.is-added]/item:text-left'>
                  <span>Fiery Horns of the Netherworld</span>
                </div>
                <div className='w-full group-[.is-added]/item:flex group-[.is-added]/item:items-start'>
                  <div className='w-full shrink-0 pb-60% h-0 relative mb-2.5 group-[.is-added]/item:mr-3 group-[.is-added]/item:mb-0 group-[.is-added]/item:w-2/5'>
                    <img
                      src={SecondCase}
                      alt=''
                      width='73'
                      height='84'
                      loading='lazy'
                      decoding='async'
                      className='absolute object-contain w-full h-full'
                    />
                  </div>
                  <div className='flex items-center justify-center'>
                    <QuantityCoins quantity={1500} />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
