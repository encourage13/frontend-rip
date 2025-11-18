import type { FC } from 'react'
import { Container } from 'react-bootstrap'
import './HomePage.css'

const HomePage: FC = () => {
  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h1>Коммунальные услуги</h1>
        <p className="mb-4">
          Добро пожаловать в сервис коммунальных услуг Москвы! 
          Здесь вы можете управлять своими коммунальными платежами.
        </p>
        
      </div>
    </Container>
  )
}

export default HomePage