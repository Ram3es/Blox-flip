import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from './components/containers/Container'
import { Header } from './components/header/Header'
import { Cups } from './pages/Cups/Cups'
import { Home } from './pages/Home/Home'
import { Mines } from './pages/Mines/Mines'
import Plinko from './pages/Plinko/Plinko'
import { Deposit } from './pages/Deposit/Deposit'
import Wheel from './pages/Wheel/Wheel'
import King from './pages/King/King'
import { Chat } from './components/chat/Chat'
import HistoryUser from './pages/UserProfile/HistoryUser'
import { Transactions } from './components/transactions/Transactions'
import UserProfile from './pages/UserProfile/UserProfile'
import { Robux } from './pages/Withdraw/Robux'
import { Affiliates } from './pages/Affiliates/Affiliates'
import Unboxing from './pages/Unboxing/Unboxing'
import RobloxLimiteds from './pages/Withdraw/RobloxLimiteds'
import { Withdraw } from './pages/Withdraw/Withdraw'
import { Leaderboard } from './pages/Leaderboard/Leaderboard'
import { CaseOpening } from './pages/Cases/CaseOpening/CaseOpening'
import BattleLobby from './pages/Battle/BattleLobby'
import CreateBattle from './pages/Battle/CreateBattle'
import CreditCard from './pages/Deposit/methods/CreditCard'
import { DepositGift } from './pages/Deposit/methods/DepositGift'
import { DepositCrypto } from './pages/Deposit/methods/DepositCrypto'
import { DepositRobux } from './pages/Deposit/methods/DepositRobux'
import Jackpot from './pages/Jackpot/Jackpot'
import BattleCases from './pages/Battle/BattleCases'
import CoinFlip from './pages/CoinFlip/CoinFlip'
import Terms from './pages/TermsOfService/Terms'

export const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Chat />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<UserProfile />}>
            <Route path='transactions' element={<Transactions />} />
            <Route path='history' element={<HistoryUser />} />
          </Route>
          <Route path='/cups' element={<Cups />} />
          <Route path='/mines' element={<Mines />} />
          <Route path='/wheel' element={<Wheel />} />
          <Route path='/crash' element={<Wheel />} />
          <Route path='/king' element={<King />} />
          <Route path='/plinko' element={<Plinko />} />
          <Route path='/coinflip' element={<CoinFlip />} />
          <Route path='/deposit' element={<Deposit />}>
            <Route path='robux' element={<DepositRobux />} />
            <Route path='roblox-limiteds' element={<RobloxLimiteds />} />
            <Route path='litecoin' element={<DepositCrypto />} />
            <Route path='bitcoin' element={<DepositCrypto />} />
            <Route path='ethereum' element={<DepositCrypto />} />
            <Route path='credit-card' element={<CreditCard />} />
            <Route path='g2a' element={<DepositGift />} />
            <Route path='kinguin' element={<DepositGift />} />
          </Route>
          <Route path='/withdraw' element={<Withdraw />}>
            <Route path='robux' element={<Robux />} />
            <Route path='roblox-limiteds' element={<RobloxLimiteds />} />
          </Route>
          <Route path='/affiliates' element={<Affiliates />} />
          <Route path='/unboxing' element={<Unboxing />} />
          <Route path='/unboxing/:id' element={<CaseOpening />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path='/battles-lobby' element={<BattleLobby />} />
          <Route path='/create-battle' element={<CreateBattle />} />
          <Route path='/jackpot' element={<Jackpot />} />
          <Route path='/battle/:id' element={<BattleCases />} />
          <Route path='/terms' element={<Terms />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
