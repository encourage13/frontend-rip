export interface Service {
  id: number
  title: string
  description: string
  imageURL: string // Всегда string, обработка null происходит в API модуле
  tariff: number
  unit: string
}

export interface CartItem {
  service: Service
  quantity: number
  customTariff?: number
  total: number
}

export interface ApplicationData {
  address: string
  cartItems: CartItem[]
  total: number
  cartItemCount: number
}

export interface ServiceFilters {
  search?: string
}