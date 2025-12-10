import type { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import UtilitiesPage from './pages/UtilitiesPage'
import UtilityDetailPage from './pages/UtilityDetailPage'
import FloatingCart from './components/FloatingCart'
import 'bootstrap/dist/css/bootstrap.min.css'

const App: FC = () => {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '70px' }}>
        <Routes>
          {/* Пути ОТНОСИТЕЛЬНО basename */}
          <Route path="/" element={<HomePage />} />                       
          <Route path="/utilities" element={<UtilitiesPage />} />         
          <Route path="/utilities/:id" element={<UtilityDetailPage />} /> 
        </Routes>
      </main>
      <FloatingCart />
    </>
  )
}
export default App