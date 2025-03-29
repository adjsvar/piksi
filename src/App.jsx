import { useEffect, useState, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import ProductsGrid from './components/ProductsGrid'
import ProductDetail from './components/ProductDetail'
import ProfilePage from './components/ProfilePage'
import Notification from './components/Notification'
import { ProductProvider } from './context/ProductContext'
import './styles/global.css'

function App() {
  const [notification, setNotification] = useState({ show: false, product: null, boardName: '' })
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isResizing, setIsResizing] = useState(false)
  const resizeTimer = useRef(null)
  const location = useLocation()
  
  // Clase para controlar el comportamiento durante el redimensionamiento
  useEffect(() => {
    if (isResizing) {
      document.body.classList.add('resize-in-progress');
    } else {
      document.body.classList.remove('resize-in-progress');
    }
  }, [isResizing]);

  // Detectar cambios en el tamaño de pantalla con debounce
  useEffect(() => {
    const handleResizeStart = () => {
      if (!isResizing) {
        setIsResizing(true);
      }
      
      // Limpiar el temporizador anterior si existe
      if (resizeTimer.current) {
        clearTimeout(resizeTimer.current);
      }
      
      // Establecer un nuevo temporizador
      resizeTimer.current = setTimeout(() => {
        setIsResizing(false);
        setIsMobile(window.innerWidth < 768);
      }, 250); // Esperar 250ms después de que el usuario deje de redimensionar
    };
    
    window.addEventListener('resize', handleResizeStart);
    
    return () => {
      window.removeEventListener('resize', handleResizeStart);
      if (resizeTimer.current) {
        clearTimeout(resizeTimer.current);
      }
    };
  }, [isResizing]);
  
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const showNotification = (product, boardName = 'Piksis') => {
    setNotification({
      show: true,
      product,
      boardName
    });

    // Auto hide after 3 seconds
    setTimeout(() => {
      hideNotification();
    }, 3000);
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  return (
    <ProductProvider>
      <div className={`piksi-app ${isResizing ? 'resize-active' : ''}`}>
        <Navbar />
        
        <div className="main-container">
          <Routes>
            <Route path="/" element={
              <>
                {!isMobile && <SearchBar />}
                <ProductsGrid showNotification={showNotification} />
              </>
            } />
            <Route path="/product/:productId" element={
              <>
                {!isMobile && <SearchBar />}
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
  );
}

export default App