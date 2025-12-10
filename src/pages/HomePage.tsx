import type { FC } from 'react'
import { Container } from 'react-bootstrap'
import './HomePage.css'
import { getAsset } from '../utils/path'

const HomePage: FC = () => {
  return (
    <div className="home-page-video-wrapper">
      <video
        className="home-page-video-bg"
        src={getAsset('bg.mp4')}         
        autoPlay
        muted
        loop
        playsInline
      />
      <Container
        className="home-page min-vh-100 d-flex align-items-center justify-content-center"
      >
        <div className="home-page-overlay text-center">
          <h1>Коммунальные услуги</h1>
          <p className="mb-4">
            Добро пожаловать в сервис коммунальных услуг Москвы!
            Здесь вы можете управлять своим и коммунальными платежами.
          </p>
        </div>
      </Container>
    </div>
  )
}

export default HomePage
