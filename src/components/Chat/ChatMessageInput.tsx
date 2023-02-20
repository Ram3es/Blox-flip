import MailIcon from '../../assets/img/mail_white.svg'

export const ChatMessageInput = () => {
  return (
    <div className='absolute inset-0 top-auto z-50 p-4 bg-blue-primary'>
      <input
        type='text'
        placeholder='Send message...'
        className='rounded p-3 pl-4 pr-14 bg-blue-secondary text-gray_96 text-13 w-full relative z-10 focus:outline focus:outline-pink-primary'
      />
      <button
        type='submit'
        className='bg-green-primary w-7 h-7 rounded leading-7 text-center absolute right-7 z-20 top-2/4 -mt-3.5'
      >
        <img
          src={MailIcon}
          alt=''
          width='19'
          height='10'
          loading='lazy'
          decoding='async'
          className='inline mr-0.5'
        />
      </button>
    </div>
  )
}
