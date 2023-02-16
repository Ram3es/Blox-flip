import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Container } from './components/Container/Container'
import { Header } from './components/Header/Header'

import { Cases } from './pages/Cases/Cases'
import { Cups } from './pages/Cups/Cups'
import { Home } from './pages/Home/Home'
import { Mines } from './pages/Mines/Mines'
import { Plinko } from './pages/Plinko/Plinko'

export const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cases' element={<Cases />} />
          <Route path='/cups' element={<Cups />} />
          <Route path='/mines' element={<Mines />} />
          <Route path='/plinko' element={<Plinko />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
