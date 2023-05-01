import { useState } from 'react'
import { Button } from '../../components/base/Button'
import ItemCard from '../../components/common/Cards/ItemCard'
import JackpotUserCard from '../../components/common/Cards/JackpotUserCard'
import GameInfoListItem from '../../components/common/GameInfoListItem'
import { QuantityCoinsWithChildren } from '../../components/common/QuantityCoins/QuantityWithChildren'
import StrippedBgItem from '../../components/common/StrippedBgItem'
import VerifyBets from '../../components/common/VerifyBets'
import Image from '../../components/base/Image'
import { cards } from '../../mocks/cards'
import { IJackpotPlayer, jackpotPlayer } from '../../mocks/jackpotPlayer'
import { IJackpotCard } from '../../types/Jackpot'
import JackpotWheel from './JackpotWheel'
import JackpotJoinModal from './JackpotJoinModal'

const Jackpot = () => {
  const [joinedUsers, setUserJoined] = useState<IJackpotPlayer[]>(jackpotPlayer)
  const [selectedCards, setSelectedCard] = useState<IJackpotCard[]>([])
  const [timer, setTimer] = useState<number>(30)
  const [isOpenModal, setOpenModal] = useState<boolean>(false)

  const toggleModal = () => setOpenModal((state) => !state)

  const joinUserToGame = () => {
    toggleModal()
    setUserJoined((state) => [...state])
  }
  return (
    <div className='max-w-[1200px] w-full mx-auto'>
      <div className='w-full flex-col gap-1'>
        <VerifyBets />
        <div className='w-full flex flex-col-reverse ls:flex-row gap-10'>
          <div className='flex flex-col md:flex-row ls:flex-col gap-2 ls:gap-6 items-center'>
            <div className='w-[492px] h-[492px] flex justify-center items-center mx-0 xs:mx-auto md:mx-0 scale-75 xs:scale-100'>
              <JackpotWheel timer={timer} setTimer={setTimer} />
            </div>
            <div className='max-w-[382px] w-full mx-auto flex flex-col gap-4'>
              <div className='flex gap-3 justify-between'>
                <GameInfoListItem label='TOTAL PLAYERS'>
                  <span>23</span>
                </GameInfoListItem>
                <GameInfoListItem label='WIN CHANCE %'>
                  <span className='text-green-primary'>23.59%</span>
                </GameInfoListItem>
                <GameInfoListItem label='YOUR DEPOSIT'>
                  <QuantityCoinsWithChildren quantity={3500} />
                </GameInfoListItem>
              </div>
              <div className='w-full border-b border-blue-accent-secondary ' />
              <div
                style={{ direction: 'rtl' }}
                className='h-[490px] overflow-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full pl-2.5 '
              >
                <div className='h-[480px]' style={{ direction: 'ltr' }}>
                  {selectedCards.map((card, idx) => (
                    <ItemCard
                      key={card.id}
                      id={card.id}
                      name={card.name}
                      price={card.price}
                      image={card.image}
                      color={card.color}
                      userAvatar={card.avatar}
                      itemClasses={`${
                        cards.length - 1 === idx ? 'mb-0' : 'mb-2'
                      } px-1 shrink-0 w-full xs:w-full group/item is-user is-added`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-5 w-full'>
            <div className='flex w-full gap-3 items-end flex-wrap'>
              <GameInfoListItem label='MIN. BET'>
                <QuantityCoinsWithChildren quantity={1500} />
              </GameInfoListItem>
              <GameInfoListItem label='MAX. BET'>
                <QuantityCoinsWithChildren quantity={115500} />
              </GameInfoListItem>
              <GameInfoListItem label='MIN. ITEMS'>
                <span>1</span>
              </GameInfoListItem>
              <GameInfoListItem label='MAX. ITEMS'>
                <span>15</span>
              </GameInfoListItem>
              <Button color='GreenPrimary' variant='Gradient' onClick={joinUserToGame}>
                <div className='w-[121px] h-12 flex justify-center items-center'>Join Game</div>
              </Button>
            </div>
            <div className='w-full border-b border-blue-accent-secondary ' />
            <StrippedBgItem color='Blue'>
              <div className='w-full flex flex-col items-center'>
                <div className='flex items-center'>
                  <span className='text-green-primary text-base font-bold uppercase mr-1'>
                    Round starts in
                  </span>
                  {`0.${timer}s`}
                </div>
                <div className='text-gray-primary w-full text-center truncate'>{`Hash: ${'895b7f3ef391e048da04ce3d42c528f336fafef36596f4d41f864fe16850acd5asd'}`}</div>
              </div>
            </StrippedBgItem>
            <div className='h-[310px] scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full pr-6'>
              <div className='flex flex-col gap-y-2 p-0.5 '>
                {joinedUsers.map((player) => (
                  <JackpotUserCard key={player.id} user={player} />
                ))}
              </div>
            </div>
            <div className='w-full border-b border-blue-accent-secondary ' />
            <StrippedBgItem color='Green' wrapContentClasses='py-2 px-6 xs:py-5 '>
              <div className='flex flex-col xs:flex-row items-center justify-between'>
                <div className='w-full flex flex-col xs:flex-row  items-center text-sm gap-1 mb-2 xs:mb-0'>
                  <div className=' mx-auto xs:mx-0 w-[50px] h-11 shrink-0 border border-blue-highlight rounded my-1 overflow-hidden radial--blue '>
                    <Image image={joinedUsers[0].avatar} />
                  </div>
                  <div className='flex items-center gap-1 ml-2'>
                    <span className='text-green-primary  max-w-[150px] truncate block'>
                      {joinedUsers[2].userName}
                    </span>
                    <span className='block'>has won the jackpot</span>
                  </div>
                </div>
                <div className='rounded text-green-primary border bg-green-primary/15 border-green-primary whitespace-nowrap px-3 py-2 leading-6 '>
                  <QuantityCoinsWithChildren
                    quantityClasses='flex items-center text-base font-bold'
                    quantity={115500}
                  />
                </div>
              </div>
            </StrippedBgItem>
            <div className='flex flex-col gap-y-2 p-0.5 opacity-50 '>
              {joinedUsers.map((player) => (
                <JackpotUserCard key={player.id} user={player} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {isOpenModal && <JackpotJoinModal onClose={toggleModal} handleFunction={setSelectedCard} />}
    </div>
  )
}

export default Jackpot
