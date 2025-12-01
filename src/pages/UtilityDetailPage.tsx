import type { FC } from 'react'
import type { Service } from '../types'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { servicesApi } from '../modules/api'
import BreadCrumbs from '../components/BreadCrumbs'
import { ROUTES, ROUTE_LABELS } from '../Routes'
import './UtilityDetailPage.css'
import nothinImg from '/nothin.jpg'

const UtilityDetailPage: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      navigate(ROUTES.UTILITIES)
      return
    }

    let isMounted = true

    const loadService = async () => {
      try {
        const serviceData = await servicesApi.getServiceById(Number(id))
        if (isMounted) {
          setService(serviceData)
        }
      } catch (error) {
        console.error('Error loading service:', error)
        if (isMounted) {
          navigate(ROUTES.UTILITIES)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadService()

    return () => {
      isMounted = false
    }
  }, [id, navigate])

  if (loading) {
    return (
      <div className="container service">
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </Spinner>
        </div>
      </div>
    )
  }

  if (!service) {
    return null
  }

  return (
    <div className="container service">
      <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.UTILITIES, path: ROUTES.UTILITIES },
          { label: service.title }
        ]}
      />
      
      <h1 className="h1">{service.title}</h1>

      <div className="rows">
        <div className="panel media">
          <img 
            src={service.imageURL} 
            alt={service.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = nothinImg
            }}
          />
        </div>
        <div className="panel text">{service.description}</div>
      </div>

      <div className="tariff">
        <label htmlFor="tariff">Тариф</label>
        <input id="tariff" type="text" value={service.tariff} readOnly />
        <span className="u">₽ / {service.unit}</span>
      </div>
    </div>
  )
}

export default UtilityDetailPage