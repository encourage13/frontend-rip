import type { FC } from 'react'
import type { Service, ServiceFilters } from '../types'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { servicesApi } from '../modules/api'
import './UtilitiesPage.css'

const UtilitiesPage: FC = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  useEffect(() => {
    const loadServices = async () => {
      setLoading(true)
      try {
        const filters: ServiceFilters = {}
        if (searchQuery) {
          filters.search = searchQuery
        }
        
        const data = await servicesApi.getServices(filters)
        setServices(data)
      } catch (error) {
        console.error('Error loading services:', error)
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(loadServices, 300)
    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="container index">
      
      
      <h1 className="h1">Коммунальные услуги</h1>

      
      <div className="search-wrap">
        <form className="search" onSubmit={handleSearchSubmit}>
          <input 
            type="search" 
            name="searchUtilities" 
            placeholder="Поиск услуг" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner">Загрузка...</div>
        </div>
      ) : (
        <section className="grid">
          {services.map(service => (
            <article key={service.id} className="card">
              <div className="media">
                <img 
                  src={service.imageURL} 
                  alt={service.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/nothin.jpg'
                  }}
                />
              </div>
              <div className="body">
                <h3>{service.title}</h3>
                <div className="actions">
                  <Link className="btn" to={`/utilities/${service.id}`}>
                    Подробнее
                  </Link>
                  <button className="btn btn--green">
                    Добавить
                  </button>
                </div>
              </div>
            </article>
          ))}
          
          {services.length === 0 && (
            <div className="no-services">
              <h3>Услуги не найдены</h3>
              <p>Попробуйте изменить поисковый запрос</p>
            </div>
          )}
        </section>
      )}
    </div>
  )
}

export default UtilitiesPage