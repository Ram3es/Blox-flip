import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Container } from './components/containers/Container'
import { Chat } from './components/chat/Chat'
import { Header } from './components/header/Header'

import { Home } from './pages/Home/Home'
import UserProfile from './pages/UserProfile/UserProfile'
import { Transactions } from './components/transactions/Transactions'
import { History } from './components/history/History'
import { Deposit } from './pages/Deposit/Deposit'
import CreditCard from './pages/Deposit/methods/CreditCard'
import { DepositGift } from './pages/Deposit/methods/DepositGift'
import { DepositRobux } from './pages/Deposit/methods/DepositRobux'

import { Withdraw } from './pages/Withdraw/Withdraw'
import { Robux } from './pages/Withdraw/Robux'

import RobloxLimiteds from './pages/Withdraw/RobloxLimiteds'

import { Affiliates } from './pages/Affiliates/Affiliates'

import Plinko from './pages/Plinko/Plinko'
import Wheel from './pages/Wheel/Wheel'
import Jackpot from './pages/Jackpot/Jackpot'
import CoinFlip from './pages/CoinFlip/CoinFlip'

import Unboxing from './pages/Unboxing/Unboxing'
import { CaseOpening } from './pages/Cases/CaseOpening/CaseOpening'

import BattleLobby from './pages/Battle/BattleLobby'
import CreateBattle from './pages/Battle/CreateBattle'
import BattleCases from './pages/Battle/BattleCases'

import Challenges from './pages/Challenges/Challenges'

import { Leaderboard } from './pages/Leaderboard/Leaderboard'

import CaseAdmin from './pages/CaseAdmin/CaseAdmin'
import Terms from './pages/ServicePages/Terms'
import FAQ from './pages/ServicePages/FAQ'
import ProvablyFair from './pages/ServicePages/ProvablyFair'
import { ToastContainer } from 'react-toastify'
import { useSocketCtx } from './store/SocketStore'
import TwoFactorAuthModal from './components/containers/TwoFactorAuthModal'
import CryptoForm from './components/containers/CryptoForm'
import WithdrawGifts from './pages/Withdraw/WithdrawGifts'
import Survey from './pages/Deposit/methods/Survey'
import RobloxModal from './components/containers/RobloxLinkedModal'
import ChangeNameModal from './components/containers/ChangeNameModal'

export const App = () => {
  const {
    twoFactorAuthModal,
    isShownRobloxModal,
    isShownChangeNameModal,
    setTwoFactorAuthModal
  } = useSocketCtx()

  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Chat />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfile />}>
            <Route path="transactions" element={<Transactions />} />
            <Route path="history" element={<History />} />
          </Route>
          <Route path="/deposit" element={<Deposit />}>
            <Route path="robux" element={<DepositRobux />} />
            <Route path="roblox-limiteds" element={<RobloxLimiteds />} />
            <Route path="litecoin" element={<CryptoForm variant='Deposit' />} />
            <Route path="bitcoin" element={<CryptoForm variant='Deposit' />} />
            <Route path="ethereum" element={<CryptoForm variant='Deposit' />} />
            <Route path="credit-card" element={<CreditCard />} />
            <Route path="g2a" element={<DepositGift />} />
            <Route path="kinguin" element={<DepositGift />} />
            {['toro', 'lootably', 'adgatemedia'].map(path => <Route key={path} path={path} element={<Survey />} />)}
          </Route>
          <Route path="/withdraw" element={<Withdraw />}>
            <Route path="robux" element={<Robux />} />
            <Route path="roblox-limiteds" element={<RobloxLimiteds />} />
            <Route path="gift" element={<WithdrawGifts />} />
            <Route path="litecoin" element={<CryptoForm variant='Withdraw' />} />
            <Route path="bitcoin" element={<CryptoForm variant='Withdraw' />} />
            <Route path="ethereum" element={<CryptoForm variant='Withdraw' />} />
          </Route>
          <Route path="/affiliates" element={<Affiliates />} />

          <Route path="/wheel" element={<Wheel />} />
          <Route path="/plinko" element={<Plinko />} />
          <Route path="/coinflip" element={<CoinFlip />} />
          <Route path="/coinflip/:id" element={<CoinFlip />} />

          <Route path="/jackpot" element={<Jackpot />} />

          <Route path="/unboxing" element={<Unboxing />} />
          <Route path="/unboxing/:short" element={<CaseOpening />} />

          <Route path="/battles-lobby" element={<BattleLobby />} />
          <Route path="/create-battle" element={<CreateBattle />} />
          <Route path="/battle/:id" element={<BattleCases />} />

          <Route path="/challenges" element={<Challenges />} />

          <Route path="/leaderboard" element={<Leaderboard />} />

          <Route path="/case-admin" element={<CaseAdmin />} />

          <Route path="/terms" element={<Terms />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/provably-fair" element={<ProvablyFair />} />
          <Route path='*' element={<Home />} />
        </Routes>
        {twoFactorAuthModal && <TwoFactorAuthModal handleClose={() => setTwoFactorAuthModal(false)} />}
        {isShownRobloxModal && <RobloxModal />}
        {isShownChangeNameModal && <ChangeNameModal />}
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Container>
    </BrowserRouter>
  )
}
