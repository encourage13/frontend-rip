import { useEffect, useState } from 'react'
import type { FC } from 'react'
import type { Service } from '../types'

interface ServiceCardProps {
  service: Service
  onMoreClick: (id: number) => void
  // если нужно что-то ещё – добавь
}

const ServiceCard: FC<ServiceCardProps> = ({ service, onMoreClick }) => {
  const [isBlue, setIsBlue] = useState(true)

  // таймер при монтировании
  useEffect(() => {
    const id = setInterval(() => {
      setIsBlue(prev => !prev)
    }, 3000)

    return () => clearInterval(id)
  }, [])

  return (
    <div className="card">
      <div className="media">
        {service.imageURL && (
          <img src={service.imageURL} alt={service.title} />
        )}
      </div>

      <div className="body">
        <h3>{service.title}</h3>
        <p>{service.description}</p>

        <div className="actions">
          <button
            type="button"
            className={`btn btn-more ${isBlue ? 'btn-more--blue' : 'btn-more--red'}`}
            onClick={() => onMoreClick(service.id)}
          >
            Подробнее
          </button>
          {/* Кнопку "Добавить" ты убрал, оставляем только "Подробнее" */}
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
