import type { FC, FormEvent } from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Service, ServiceFilters } from '../types'
import { servicesApi } from '../modules/api'
import './UtilitiesPage.css'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectSearchTerm, setSearchTerm } from '../store/slices/filterSlice'

const UtilitiesPage: FC = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [isBlue, setIsBlue] = useState(true)

  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector(selectSearchTerm)

  // таймер смены цвета кнопки "Подробнее"
  useEffect(() => {
    const id = setInterval(() => {
      setIsBlue(prev => !prev)
    }, 3000)

    return () => clearInterval(id)
  }, [])

  // первый запрос: загрузить все услуги
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

    loadServices()
  }, [searchQuery]) // дергаем бэк, когда в Redux поменялся фильтр

  // поиск только по кнопке
  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(setSearchTerm(searchInput.trim()))
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
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="search-button">
            Поиск
          </button>
        </form>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner">Загрузка...</div>
        </div>
      ) : (
        <section className="grid">
          {services.map((service) => (
            <article key={service.id} className="card">
              <div className="media">
                <img
                  src={service.imageURL}
                  alt={service.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'nothin.jpg'
                  }}
                />
              </div>
              <div className="body">
                <h3>{service.title}</h3>
                <div className="actions">
                  <Link
                    className={`btn btn-more ${
                      isBlue ? 'btn-more--blue' : 'btn-more--red'
                    }`}
                    to={`/utilities/${service.id}`}
                  >
                    Подробнее
                  </Link>
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
