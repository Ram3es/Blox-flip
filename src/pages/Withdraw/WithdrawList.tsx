import RobuxIcon from '../../assets/img/deposit2.png'
import RobloxIcon from '../../assets/img/deposit1.png'

export const WithdrawList = () => {
  return (
    <div className='max-w-1190 w-full m-auto'>
      <div className='border-t border-b border-t-sky-primary/40 border-b-sky-primary/40 rounded mb-9'>
        <div className='border--mask border--radial-blue  bg-gradient-radial from-blue-light-secondary/20 to-blue-accent-secondary/0 rounded text-sm p-5 xs:p-9 overflow-hidden relative'>
          <div className='flex flex-wrap -mx-6 relative z-20'>
            <div className='px-6 w-full md:w-2/5 flex flex-col'>
              <div className='text-gray-primary font-bold text-lg mb-6'>Roblox Methods</div>
              <div className='flex flex-wrap -mx-1.5 grow'>
                <div className='px-1.5 pb-3 w-1/2 xxs:w-1/3 md:w-1/2 deposite--case'>
                  <a
                    href='#'
                    className='border--mask-hover border--radial-blue rounded h-full overflow-hidden text-sm group'
                  >
                    <div className='bg-gradient--blue-darken from-blue-accent-secondary/20 hover:bg-transparent hover:bg-gradient-radial-80 hover:from-blue-light-secondary/30 hover:to-blue-accent-secondary/0 rounded h-full text-center relative z-20 border-y border-y-transparent group-hover:border-y-sky-primary/40'>
                      <div className='flex flex-col items-center justify-between rounded h-full py-4 px-2'>
                        <div className='bg-blue-primary/30 rounded px-2 w-10/12 py-1 leading-4 font-semibold text-gray-primary mb-5 flex flex-col justify-center group-hover:bg-blue-highlight'>
                          Roblox Limiteds
                        </div>
                        <div className='w-full pb-60% h-0 relative mb-2'>
                          <img
                            src={RobloxIcon}
                            alt=''
                            width='158'
                            height='114'
                            loading='lazy'
                            decoding='async'
                            className='absolute -inset-full m-auto'
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className='px-1.5 pb-3 w-1/2 xxs:w-1/3 md:w-1/2 deposite--case'>
                  <a
                    href='#'
                    className='border--mask-hover border--radial-blue rounded h-full overflow-hidden text-sm group'
                  >
                    <div className='bg-gradient--blue-darken from-blue-accent-secondary/20 hover:bg-transparent hover:bg-gradient-radial-80 hover:from-blue-light-secondary/30 hover:to-blue-accent-secondary/0 rounded h-full text-center relative z-20 border-y border-y-transparent group-hover:border-y-sky-primary/40'>
                      <div className='flex flex-col items-center justify-between rounded h-full py-4 px-2'>
                        <div className='bg-blue-primary/30 rounded px-2 w-10/12 py-1 leading-4 font-semibold text-gray-primary mb-5 flex flex-col justify-center group-hover:bg-blue-highlight'>
                          Robux
                        </div>
                        <div className='w-full pb-60% h-0 relative mb-2'>
                          <img
                            src={RobuxIcon}
                            alt=''
                            width='159'
                            height='103'
                            loading='lazy'
                            decoding='async'
                            className='absolute -inset-full m-auto'
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
