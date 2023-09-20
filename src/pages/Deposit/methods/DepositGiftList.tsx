import { DEPOSIT_GIFT_CARDS } from '../../../constants/gift-cards'

const GiftCard = ({ src, name }: { src: string, name: string }) => {
  return (
    <div>
      <img src={src} alt={name} width='279' height='141' loading='lazy' decoding='async' />
    </div>
  )
}

export const DepositGiftList = () => {
  return (
    <div className='grid grid-cols-1 xxs:grid-cols-3 sm:grid-cols-4 gap-4'>
      {DEPOSIT_GIFT_CARDS.map(card => (
        <GiftCard key={card.id} src={card.img} name={card.name} />
      ))}
    </div>
  )
}
