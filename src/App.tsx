import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from './components/Container/Container'
import { Header } from './components/Header/Header'
import { Cases } from './pages/Cases/Cases'
import { Cups } from './pages/Cups/Cups'
import { Home } from './pages/Home/Home'
import { Mines } from './pages/Mines/Mines'
import { Plinko } from './pages/Plinko/Plinko'
import { Deposit } from './pages/Deposit/Deposit'
import Wheel from './pages/Wheel/Wheel'
import King from './pages/King/King'
import { Chat } from './components/Chat/Chat'
import HistoryUser from './pages/UserProfile/HistoryUser'
import { Transactions } from './components/Transactions/Transactions'
import UserProfile from './pages/UserProfile/UserProfile'
import { Robux } from './pages/Withdraw/Robux'
import { Affiliates } from './pages/Affiliates/Affiliates'
import Unboxing from './pages/Unboxing/Unboxing'
import RobloxLimiteds from './pages/Withdraw/RobloxLimiteds'
import { Withdraw } from './pages/Withdraw/Withdraw'
import { Leaderboard } from './pages/Leaderboard/Leaderboard'
import RobuxDeposit from './pages/Deposit/methods/RobuxDeposit'
import RobloxLimitedsDeposit from './pages/Deposit/methods/RobloxLimitedsDeposit'
import Bitcoin from './pages/Deposit/methods/Bitcoin'
import CreditCard from './pages/Deposit/methods/CreditCard'
import GiftCards from './pages/Deposit/methods/GiftCards'

export const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Chat />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cases' element={<Cases />} />
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
          <Route path='/deposit' element={<Deposit />} >
            <Route path='robux' element={<RobuxDeposit />} />
            <Route path='roblox-limiteds' element={<RobloxLimitedsDeposit />} />
            <Route path='litecoin' element={<Bitcoin />} />
            <Route path='bitcoin' element={<Bitcoin />} />
            <Route path='ethereum' element={<Bitcoin />} />
            <Route path='credit-card' element={<CreditCard />} />
            <Route path='g2a' element={<GiftCards />} />
            <Route path='kinguin' element={<GiftCards />} />
          </Route>
          <Route path='/withdraw' element={<Withdraw />}>
            <Route path='robux' element={<Robux />} />
            <Route path='roblox-limiteds' element={<RobloxLimiteds />} />
          </Route>
          <Route path='/affiliates' element={<Affiliates />} />
          <Route path='/unboxing' element={<Unboxing />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
