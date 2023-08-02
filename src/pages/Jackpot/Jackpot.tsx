import { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Button } from '../../components/base/Button'
import ItemCard from '../../components/common/Cards/ItemCard'
import GameInfoListItem from '../../components/common/GameInfoListItem'
import StrippedBgItem from '../../components/common/StrippedBgItem'
import VerifyBets from '../../components/common/VerifyBets'
import Image from '../../components/base/Image'
import { cards } from '../../mocks/cards'
import { IJackpotPlayer, jackpotPlayer } from '../../mocks/jackpotPlayer'
import { IJackpotCard } from '../../types/Jackpot'
import JackpotWheel from './JackpotWheel'
import { Context } from '../../store/Store'
import SignInModal from '../../components/containers/SignInModal'
import JoinedUserRow from '../../components/common/Cards/JackpotUserCard'
import CoinsWithDiamond from '../../components/common/CoinsWithDiamond'
import { formatNumber, getCostByFieldName, localeStringToNumber } from '../../helpers/numbers'
import { Input } from '../../components/base/Input'
import DiamondIcon from '../../components/icons/DiamondIcon'

const Jackpot = () => {
  const [joinedUsers, setUserJoined] = useState<IJackpotPlayer[]>(jackpotPlayer)
  const [selectedCards, setSelectedCard] = useState<IJackpotCard[]>([])
  const [isOpenLoginModal, setOpenLoginModal] = useState<boolean>(false)
  // const [isOpenModal, setOpenModal] = useState<boolean>(false)
  const [wager, setWager] = useState({ amountString: '', amountNumber: 0 })

  const [timer, setTimer] = useState<number>(30)

  const {
    state: { user }
  } = useContext(Context)

  //   const AVATAR_URL =
  // 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/563.jpg'

  const jackpot = joinedUsers.reduce((acc, user) => acc + user.deposit, 0)

  // const toggleModal = () => setOpenModal((state) => !state)
  const calculateWinChance = useCallback(
    (bet: number) => Number(((bet / jackpot) * 100).toFixed(2)),
    [joinedUsers]
  )

  const joinUserToGame = () => {
    if (user) {
      setUserJoined((state) => [
        ...state,
        {
          id: user?.id,
          avatar: user?.avatar,
          level: user?.level,
          userName: user?.name,
          deposit: getCostByFieldName(selectedCards, 'price')
        }
      ])
    } else {
      setOpenLoginModal(true)
    }
  }

  // const onSubmitJackpotModal = (selectedCards: IJackpotCard[]) => {
  //   setSelectedCard(selectedCards)
  //   if (user) {
  //     setUserJoined((state) => [
  //       ...state,
  //       {
  //         id: user?.id,
  //         avatar: user?.avatar,
  //         level: user?.level,
  //         userName: user?.name,
  //         deposit: getCostByFieldName(selectedCards, 'price')
  //       }
  //     ])
  //   }
  // }
  const wagerRef = useRef<HTMLInputElement>(null)

  const handleWagerChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setWager({ amountString: value, amountNumber: Number(localeStringToNumber(value, 'en-US')) })
    },
    [wager]
  )

  const handleKeyPress = (event: KeyboardEvent) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault()
    }
  }

  const inputValue =
    wager.amountNumber === 0 ? wager.amountString : formatNumber(wager.amountNumber)

  useEffect(() => {
    const wager = wagerRef.current

    if (wager) {
      wager.addEventListener('keypress', handleKeyPress)
    }

    return () => {
      if (wager) {
        wager.removeEventListener('keypress', handleKeyPress)
      }
    }
  }, [wagerRef])

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <div className="w-full flex-col gap-1">
        <VerifyBets path="/provably-fair#jackpot" />
        <div className="flex w-full flex-col-reverse gap-10 ls:flex-row">
          <div className="flex flex-col items-center gap-2 md:flex-row ls:flex-col ls:gap-6">
            <div className="mx-0 flex h-[492px] w-[492px] scale-75 items-center justify-center xs:mx-auto xs:scale-100 md:mx-0">
              <JackpotWheel
                timer={timer}
                setTimer={setTimer}
                jackPot={jackpot}
                joinedUsers={joinedUsers}
              />
            </div>
            <div className="mx-auto flex w-full max-w-[382px] flex-col gap-4">
              <div className="flex justify-between gap-3">
                <GameInfoListItem label="TOTAL PLAYERS">
                  <span>{joinedUsers.length}</span>
                </GameInfoListItem>
                <GameInfoListItem label="WIN CHANCE %">
                  <span className="text-green-primary">
                    {calculateWinChance(
                      joinedUsers.find((player) => player.id === user?.id)?.deposit ?? 0
                    )}{' '}
                    %
                  </span>
                </GameInfoListItem>
                <GameInfoListItem label="YOUR DEPOSIT">
                  <CoinsWithDiamond
                    iconContainerSize="Small"
                    typographyQuantity={getCostByFieldName(selectedCards, 'price')}
                  />
                </GameInfoListItem>
              </div>
              <div className="w-full border-b border-blue-accent-secondary" />
              <div
                style={{ direction: 'rtl' }}
                className="h-[490px] overflow-auto pl-2.5 scrollbar-thin scrollbar-track-blue-darken/40 scrollbar-thumb-blue-secondary scrollbar-track-rounded-full scrollbar-thumb-rounded-full "
              >
                <div className="h-[480px]" style={{ direction: 'ltr' }}>
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
          <div className="flex w-full flex-col gap-5">
            <div className="flex w-full flex-wrap items-end gap-3">
              <GameInfoListItem label="MIN. BET">
                <CoinsWithDiamond iconContainerSize="Small" typographyQuantity={1500} />
              </GameInfoListItem>
              <GameInfoListItem label="MAX. BET">
                <CoinsWithDiamond iconContainerSize="Small" typographyQuantity={115500} />
              </GameInfoListItem>
              <GameInfoListItem label="bet amount:" labelStyle="Green" childrenStyle="None">
                <div className="h-[45px] relative z-10 rounded-lg border bg-green-primary/15 border-green-primary/40 border-dashed flex items-center justify-between px-2">
                  <span className="w-5 h-5 text-center leading-6 shrink-0 bg-green-primary/20 rounded relative mr-2 text-green-primary">
                    <DiamondIcon className="-inset-full absolute m-auto" width="15" height="12" />
                  </span>
                  <Input
                    type="text"
                    placeholder="..."
                    variant="OUTLINED"
                    value={inputValue}
                    onChange={handleWagerChange}
                    ref={wagerRef}
                  />
                </div>
              </GameInfoListItem>
              <Button color="GreenPrimary" variant="GreenGradient" onClick={joinUserToGame}>
                <div className="flex h-12 w-[121px] items-center justify-center">Join Game</div>
              </Button>
            </div>
            <div className="w-full border-b border-blue-accent-secondary " />
            <StrippedBgItem color="Blue">
              <div className="flex w-full flex-col items-center">
                <div className="flex items-center">
                  <span className="mr-1 text-base font-bold uppercase text-green-primary">
                    Round starts in
                  </span>
                  {`0.${timer}s`}
                </div>
                <div className="w-full truncate text-center text-gray-primary">{`Hash: ${'895b7f3ef391e048da04ce3d42c528f336fafef36596f4d41f864fe16850acd5asd'}`}</div>
              </div>
            </StrippedBgItem>
            <div className="h-[310px] z-10  pr-6 scrollbar-thin scrollbar-track-blue-darken/40 scrollbar-thumb-blue-secondary scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
              <div className="flex flex-col  gap-y-2 p-0.5 ">
                {joinedUsers.map((player) => (
                  <JoinedUserRow
                    key={player.id}
                    user={player}
                    userChance={calculateWinChance(player.deposit)}
                  />
                ))}
              </div>
            </div>
            <div className="w-full border-b border-blue-accent-secondary " />
            <StrippedBgItem color="Green" wrapContentClasses="py-2 px-6 xs:py-5 ">
              <div className="flex flex-col items-center justify-between xs:flex-row">
                <div className="mb-2 flex w-full flex-col  items-center gap-1 text-sm xs:mb-0 xs:flex-row">
                  <div className=" radial--blue mx-auto my-1 h-11 w-[50px] shrink-0 overflow-hidden rounded border border-blue-highlight xs:mx-0 ">
                    <Image image={joinedUsers[0].avatar} />
                  </div>
                  <div className="ml-2 flex items-center gap-1">
                    <span className="block  max-w-[150px] truncate text-green-primary">
                      {joinedUsers[2].userName}
                    </span>
                    <span className="block">has won the jackpot</span>
                  </div>
                </div>
                <CoinsWithDiamond
                  containerColor="GreenGradient"
                  containerSize="XL"
                  typographyQuantity={115500}
                />
              </div>
            </StrippedBgItem>
            <div className="flex flex-col  gap-y-2 p-0.5 opacity-50 ">
              {joinedUsers.map((player) => (
                <JoinedUserRow
                  key={player.id}
                  user={player}
                  userChance={calculateWinChance(player.deposit)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <SignInModal isOpen={isOpenLoginModal} onClose={() => setOpenLoginModal(false)} />
    </div>
  )
}

export default Jackpot
