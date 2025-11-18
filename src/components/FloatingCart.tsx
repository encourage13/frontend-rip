import type { FC } from 'react'
import { useState, useEffect } from 'react'
import './FloatingCart.css'

const FloatingCart: FC = () => {
  const [cartItemCount, setCartItemCount] = useState(0)
  

  // Загрузка состояния корзины
  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    const savedCart = localStorage.getItem('utilityCart')
    if (savedCart) {
      const cart = JSON.parse(savedCart)
      setCartItemCount(cart.length)
    }
  }, [])



  if (cartItemCount === 0) {
    return (
      <button className="fab disabled" disabled>
        <img src="http://localhost:9000/kartinki/cart_new.png" alt="К заявке" />
      </button>
    )
  }

}

export default FloatingCart