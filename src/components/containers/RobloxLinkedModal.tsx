import Mountains from '../../assets/img/bg-mountain.png'
import Logo from '../../assets/img/logo.png'
import Pilot from '../../assets/img/pilot.png'
import RobloForm from '../sign-in/RobloForm'
import ModalWrapper from './ModalWrapper'
import { useSocketCtx } from '../../store/SocketStore'

const RobloxModal = () => {
  const { setIsShownRobloxModal, socket } = useSocketCtx()

  const handleCloseModal = () => {
    setIsShownRobloxModal(false)
    socket.emit('link_roblox_remove')
  }
  return (
        <ModalWrapper
          closeModal={handleCloseModal}
          modalClasses='relative grid grid-cols-3 rounded-2xl overflow-hidden gradient-blue-primary shadow-dark-15'
          closeBtnClasses='rounded w-7 h-7 leading-7 absolute top-4 left-4 z-[2] text-center bg-blue-highlight shadow-dark-5 hover:bg-blue-accent cursor-pointer'
        >
           <div className='col-span-1 text-center relative'>
             <div className='absolute w-full h-full  flex-col items-center  p-4 z-[1] hidden sm:flex'>
               <img
                 src={Logo}
                 alt=''
                 width='126'
                 height='30'
                 loading='lazy'
                 decoding='async'
                 className='min-w-[126px]'
                />
               <img
                 src={Pilot}
                 alt='pilot'
                 loading='lazy'
                 decoding='async'
                 className='mt-10'
                />
                <h3 className="text-3xl font-extrabold text-white uppercase mt-5">Link your roblox account</h3>
             </div>
             <div className=' h-full w-full mix-blend-luminosity bg-cover' style={{ backgroundImage: `url(${Mountains})` }}>
                <div className='h-full w-full  gradient-light-gray'>
                    <div className='h-full w-full bg-blue-darken/75'/>
                </div>
            </div>
          </div>
          <div className=" flex flex-col  justify-between h-full col-span-3 mt-6 sm:mt-0 sm:col-span-2  relative  w-full">
            <div className='sm:min-h-[400px] sm:min-w-[600px]'>
              <div className=' p-5'>
                <div className=' border-b border-blue-highlight mb-6 pb-6 '>
                  <div className='flex justify-around items-center'>
                    <h3
                      className={'text-3xl text-lightblue-secondary font-extrabold uppercase shrink-0 mr-4 duration-200'}
                    >
                      roblosecurity
                    </h3>
                  </div>
                </div>
                <RobloForm onClose={() => setIsShownRobloxModal(false)} />
              </div>
            </div>
        </div>
        </ModalWrapper>
  )
}

export default RobloxModal
