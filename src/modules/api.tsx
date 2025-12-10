import type { Service } from '../types'
import { SERVICES_MOCK } from './mock'

// Определяем, что сейчас сборка под Tauri
const isTauri = true

// IP бэка как у него, но под тебя:
// возьми из Vite Network IP и свой порт бэка (например 8080)
const BACKEND_IP = 'http://192.168.0.109:8080'

// Базовый URL:
// - в браузере: /api (через Vite proxy)
// - в tauri.exe: http://IP:порт/api
const API_BASE_URL = isTauri ? `${BACKEND_IP}/api` : '/api'

// Функция для обработки ImageURL (как у тебя)
const getValidImageUrl = (imageURL: string | null | undefined): string => {
  console.log('📸 ImageURL received:', imageURL, 'Type:', typeof imageURL)

  if (!imageURL || imageURL.trim().length === 0) {
    console.log('🔄 Using default image')
    return '/images/nothin.jpg'
  }

  // если бэк отдал полный URL
  if (imageURL.startsWith('http://') || imageURL.startsWith('https://')) {
    // подменяем localhost на IP, чтобы и exe, и другие машины могли ходить
    if (imageURL.includes('localhost:9000')) {
      return imageURL.replace('localhost:9000', '192.168.0.109:9000')
    }
    return imageURL
  }

  // если пришёл относительный путь, собираем полный URL
  if (imageURL.startsWith('/')) {
    return `http://192.168.0.109:9000${imageURL}`
  }

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

      const qs = queryParams.toString()
      const url = qs
        ? `${API_BASE_URL}/utilities?${qs}`
        : `${API_BASE_URL}/utilities`

      console.log('🔄 getServices URL:', url)

      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch services: ${response.status}`)
      }

      const data: BackendPaginatedResponse = await response.json()

      return data.items.map((serviceDTO) => ({
        id: serviceDTO.id,
        title: serviceDTO.title,
        description: serviceDTO.description,
        imageURL: getValidImageUrl(serviceDTO.image_url),
        tariff: serviceDTO.tariff,
        unit: serviceDTO.unit,
      }))
    } catch (error) {
      console.warn('Failed to fetch from backend, using mock data.', error)
      return this.filterMockServices(SERVICES_MOCK, filters)
    }
  },

  async getServiceById(id: number): Promise<Service> {
    try {
      const url = `${API_BASE_URL}/utilities/${id}`
      console.log('🔄 Making API request to:', url)

      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
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
        unit: serviceDTO.unit,
      }
    } catch (error) {
      console.warn('❌ API Error, using mock data:', error)
      const service = SERVICES_MOCK.find((s) => s.id === id)
      if (!service) throw new Error('Service not found')

      return service
    }
  },

  filterMockServices(services: Service[], filters: ServiceFilters): Service[] {
    if (!filters.search) return services

    const search = filters.search.toLowerCase()
    return services.filter((service) =>
      service.title.toLowerCase().includes(search)
    )
  },
}
