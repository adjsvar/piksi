import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProductsGrid from './components/ProductsGrid'
import ProductDetail from './components/ProductDetail'
import Notification from './components/Notification'
import { ProductProvider } from './context/ProductContext'

function App() {
  const [notification, setNotification] = useState({ show: false, product: null, boardName: '' })
  const location = useLocation()

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const showNotification = (product, boardName = 'Piksis') => {
    setNotification({
      show: true,
      product,
      boardName
    })

    // Auto hide after 3 seconds
    setTimeout(() => {
      hideNotification()
    }, 3000)
  }

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, show: false }))
  }

  return (
    <ProductProvider>
      <div className="piksi-app">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<ProductsGrid showNotification={showNotification} />} />
          <Route path="/product/:productId" element={<ProductDetail showNotification={showNotification} />} />
        </Routes>

        {notification.show && notification.product && (
          <Notification 
            product={notification.product} 
            boardName={notification.boardName} 
            onClose={hideNotification} 
          />
        )}
      </div>
    </ProductProvider>
  )
}

export default App