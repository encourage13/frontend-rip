import type { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from './Routes'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import UtilitiesPage from './pages/UtilitiesPage'
import UtilityDetailPage from './pages/UtilityDetailPage'
import FloatingCart from './components/FloatingCart'
import './App.css'

const App: FC = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.UTILITIES} element={<UtilitiesPage />} />
          <Route path={ROUTES.UTILITY_DETAIL} element={<UtilityDetailPage />} />
          
        </Routes>
      </main>
      <FloatingCart />
    </div>
  )
}

export default App