import type { Service } from '../types'

export const SERVICES_MOCK: Service[] = [
  {
    id: 1,
    title: "Электроэнергия",
    description: "Услуги по поставке электроэнергии для вашего дома. Включает обслуживание сетей и расчет потребления.",
    imageURL: "http://localhost:9000/kartinki/electricity.png",
    tariff: 5.2,
    unit: "кВт·ч"
  },
  {
    id: 2,
    title: "Водоснабжение",
    description: "Холодное и горячее водоснабжение с поддержанием качества воды согласно стандартам.",
    imageURL: "http://localhost:9000/kartinki/water.png", 
    tariff: 40.5,
    unit: "м³"
  },
  {
    id: 3,
    title: "Отопление",
    description: "Услуги центрального отопления с поддержанием комфортной температуры в помещениях.",
    imageURL: "http://localhost:9000/kartinki/heating.png",
    tariff: 2200,
    unit: "Гкал"
  },
  {
    id: 4,
    title: "Газоснабжение",
    description: "Поставка природного газа для бытовых нужд и отопления.",
    imageURL: "/images/nothin.jpg",
    tariff: 8.3,
    unit: "м³"
  },
  {
    id: 5,
    title: "Вывоз ТБО",
    description: "Регулярный вывоз твердых бытовых отходов и их утилизация.",
    imageURL: "http://localhost:9000/kartinki/garbage.png",
    tariff: 120,
    unit: "мес"
  },
  {
    id: 6,
    title: "Канализация",
    description: "Отвод и очистка сточных вод с соблюдением экологических норм.",
    imageURL: "http://localhost:9000/kartinki/sewage.png",
    tariff: 35.7,
    unit: "м³"
  }
]