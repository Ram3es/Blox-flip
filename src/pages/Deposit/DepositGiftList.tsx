import GiftCardImage from '../../assets/img/gift1.png'

const GiftCard = () => {
  return (
    <div>
      <img src={GiftCardImage} alt='' width='279' height='141' loading='lazy' decoding='async' />
    </div>
  )
}

export const DepositGiftList = () => {
  return (
    <div className='grid grid-cols-1 xxs:grid-cols-3 sm:grid-cols-4 gap-4'>
      {Array.from({ length: 8 }).map((_, index) => (
        <GiftCard key={index + 1} />
      ))}
    </div>
  )
}
