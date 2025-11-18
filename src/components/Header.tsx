import type { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { ROUTES } from '../Routes'
import './Header.css'

const Header: FC = () => {
  const location = useLocation()

  return (
    <Navbar bg="light" expand="lg" className="header" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to={ROUTES.HOME} className="brand">
          mos.ru
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to={ROUTES.HOME}
              className={location.pathname === ROUTES.HOME ? 'active' : ''}
            >
              Домой
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to={ROUTES.UTILITIES}
              className={location.pathname === ROUTES.UTILITIES ? 'active' : ''}
            >
              Коммунальные услуги
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header