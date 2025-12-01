import type { Service } from '../types'
import { SERVICES_MOCK } from './mock'

const API_BASE_URL = '/api'

// Функция для обработки ImageURL
const getValidImageUrl = (imageURL: string | null | undefined): string => {
  if (!imageURL || imageURL.trim().length === 0) {
    return 'nothin.jpg'
  }

  // 1. Полный URL MinIO -> /minio + path
  try {
    if (imageURL.startsWith('http://')) {
      const u = new URL(imageURL)
      return `/minio${u.pathname}`    // /minio/kartinki/...
    }
  } catch {
    // игнорируем
  }

  // 2. Относительный путь именно к MinIO (например, /kartinki/...)
  if (imageURL.startsWith('/kartinki/')) {
    return `/minio${imageURL}`
  }

  // 3. Все остальные относительные пути (иконки фронта) не трогаем
  return imageURL
}



// Интерфейсы для ответов бэкенда
interface BackendServiceDTO {
  id: number
  title: string
  description: string
  image_url: string | null
  unit: string
  tariff: number
}

interface BackendPaginatedResponse {
  items: BackendServiceDTO[]
  total: number
}

export interface ServiceFilters {
  search?: string
}

export const servicesApi = {
  async getServices(filters: ServiceFilters = {}): Promise<Service[]> {
    try {
      const queryParams = new URLSearchParams()
      
      if (filters.search) queryParams.append('title', filters.search)

      const url = `${API_BASE_URL}/utilities?${queryParams}`

      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      
      
      if (!response.ok) {
        throw new Error(`Failed to fetch services: ${response.status}`)
      }

      const data: BackendPaginatedResponse = await response.json()
      
      return data.items.map(serviceDTO => ({
        id: serviceDTO.id,
        title: serviceDTO.title,
        description: serviceDTO.description,
        imageURL: getValidImageUrl(serviceDTO.image_url),
        tariff: serviceDTO.tariff,
        unit: serviceDTO.unit
      }))
    } catch (error) {
      return this.filterMockServices(SERVICES_MOCK, filters)
    }
  },

  async getServiceById(id: number): Promise<Service> {
    try {
      const url = `${API_BASE_URL}/utilities/${id}`
      console.log('🔄 Making API request to:', url)

      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      
      console.log('📡 API Response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch service: ${response.status}`)
      }
      
      const serviceDTO: BackendServiceDTO = await response.json()
      console.log('✅ API Success, received service:', serviceDTO.title)
      
      return {
        id: serviceDTO.id,
        title: serviceDTO.title,
        description: serviceDTO.description,
        imageURL: getValidImageUrl(serviceDTO.image_url),
        tariff: serviceDTO.tariff,
        unit: serviceDTO.unit
      }
    } catch (error) {
      console.warn('❌ API Error, using mock data:', error)
      const service = SERVICES_MOCK.find(s => s.id === id)
      if (!service) throw new Error('Service not found')
      
      return service
    }
  },

  filterMockServices(services: Service[], filters: ServiceFilters): Service[] {
    if (!filters.search) return services
    
    return services.filter(service =>
      service.title.toLowerCase().includes(filters.search!.toLowerCase())
    )
  }
}