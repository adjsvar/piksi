import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import ProductsGrid from './components/ProductsGrid'
import ProductDetail from './components/ProductDetail'
import ProfilePage from './components/ProfilePage'
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
        
        <div className="main-container">
          <Routes>
            <Route path="/" element={
              <>
                <SearchBar />
                <ProductsGrid showNotification={showNotification} />
              </>
            } />
            <Route path="/product/:productId" element={
              <>
                <SearchBar />
                <ProductDetail showNotification={showNotification} />
              </>
            } />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>

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