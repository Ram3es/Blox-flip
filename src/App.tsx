import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Container } from './components/Container/Container'
import { Header } from './components/Header/Header'
import { Chat } from './components/Chat/Chat'

import { Cases } from './pages/Cases/Cases'
import { Cups } from './pages/Cups/Cups'
import { Home } from './pages/Home/Home'
import { Mines } from './pages/Mines/Mines'
import { Plinko } from './pages/Plinko/Plinko'
import { Deposit } from './pages/Deposit/Deposit'
import { Withdraw } from './pages/Withdraw/Withdraw'

export const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Chat />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cases' element={<Cases />} />
          <Route path='/cups' element={<Cups />} />
          <Route path='/mines' element={<Mines />} />
          <Route path='/plinko' element={<Plinko />} />
          <Route path='/deposit' element={<Deposit />} />
          <Route path='/withdraw' element={<Withdraw />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
