import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from './components/Container/Container'
import { Header } from './components/Header/Header'
import { Cases } from './pages/Cases/Cases'
import { Cups } from './pages/Cups/Cups'
import { Home } from './pages/Home/Home'
import { Mines } from './pages/Mines/Mines'
import { Plinko } from './pages/Plinko/Plinko'
import { Deposit } from './pages/Deposit/Deposit'
import { Withdraw } from './pages/Withdraw/Withdraw'
import Wheel from './pages/Wheel/Wheel'
import King from './pages/King/King'
import { Chat } from './components/Chat/Chat'
import MyProfile from './pages/MyProfile/MyProfile'
import HistoryUser from './pages/MyProfile/HistoryUser'
import Transactions from './pages/MyProfile/Transactions'
import { UserProfile } from './pages/UserProfile/UserProfile'

export const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Chat />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cases' element={<Cases />} />
          <Route path='/profile' element={<MyProfile />} >
            <Route path='transactions' element={<Transactions />} />
            <Route path='history' element={<HistoryUser />} />
          </Route>
          <Route path='/cups' element={<Cups />} />
          <Route path='/mines' element={<Mines />} />
          <Route path='/wheel' element={<Wheel />} />
          <Route path='/crash' element={<Wheel />} />
          <Route path='/king' element={<King />} />
          <Route path='/plinko' element={<Plinko />} />
          <Route path='/deposit' element={<Deposit />} />
          <Route path='/withdraw' element={<Withdraw />} />
          <Route path='/:profile' element={<UserProfile />} />
          <Route path='/:profile/transactions' element={<UserProfile />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
