import Mountains from '../../assets/img/bg-mountain.png'
import Logo from '../../assets/img/logo.png'
import Pilot from '../../assets/img/pilot.png'
import RobloForm from '../sign-in/RobloForm'
import ModalWrapper from './ModalWrapper'
import { useSocketCtx } from '../../store/SocketStore'
import VideoPlayer from '../../assets/img/videoPlayerImg.png'
import RobloVideo from '../../assets/video/gametery.mp4'
import { useEffect, useRef, useState } from 'react'

const RobloxModal = () => {
  const [isShownVideo, setIsShownVideo] = useState(false)
  const { setIsShownRobloxModal, socket } = useSocketCtx()

  const videoRef = useRef<HTMLVideoElement>(null)

  const handleCloseModal = () => {
    setIsShownRobloxModal(false)
    socket.emit('link_roblox_remove')
  }

  const playVideo = () => {
    if (videoRef.current) {
      void videoRef.current.play()
    }
  }

  useEffect(() => {
    if (videoRef.current && isShownVideo) {
      playVideo()
    }
  }, [isShownVideo])

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
            <div className='sm:min-h-[520px] sm:min-w-[600px]'>
              <div className=' flex flex-col h-full p-5 xs:pb-10'>
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
                <div className=' hidden sm:flex items-center max-w-[580px]  gradient-modal-video mt-auto'>
                    <div className='text-lightblue-secondary max-w-[70%]'>
                      <p className='mb-4'>In order for *Site* to operate correctly, we need access to your Roblox account.</p>
                      <p> Press the play button to view a vide of how exactly to sign in using either credentials or .roblosecurity on our website.</p>
                  </div>
                  <div onClick={() => { setIsShownVideo(true) }} className='mx-auto'>
                    <img src={VideoPlayer} alt='mock' className=' object-contain cursor-pointer'/>
                  </div>
                </div>
              </div>
            </div>
        </div>
        {
          isShownVideo &&
          <div className='absolute z-10 top-0 left-0 h-full w-full flex items-center'>
            <div className='relative group'>
              <video
                ref={videoRef}
                src={RobloVideo}
                controls
              />
              <div
                onClick={() => { setIsShownVideo(false) }}
                className='absolute z-20 top-4 right-6 text-white opacity-0 group-hover:opacity-100 px-1 cursor-pointer duration-300'
                >
                  X
                </div>
            </div>
          </div>
        }

      </ModalWrapper>
  )
}

export default RobloxModal
