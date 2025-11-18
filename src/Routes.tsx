export const ROUTES = {
  HOME: "/",
  UTILITIES: "/utilities",
  UTILITY_DETAIL: "/utilities/:id",
}

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  HOME: "Главная",
  UTILITIES: "Коммунальные услуги", 
  UTILITY_DETAIL: "Подробнее об услуге",
};