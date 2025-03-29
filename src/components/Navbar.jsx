import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import '../styles/Navbar.css'

const Navbar = () => {
  const { 
    showFavorites, 
    toggleShowFavorites, 
    filterByCollection, 
    currentCollection, 
    resetSearch,
    setShowFavorites,
    setFilteredProducts,
    products
  } = useProducts()
  
  const navigate = useNavigate()
  const location = useLocation()
  const [showCategories, setShowCategories] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [mobileSearchQuery, setMobileSearchQuery] = useState("")

  // Cerrar menú de categorías cuando se cambia de página
  useEffect(() => {
    setShowCategories(false);
    setShowMobileSearch(false);
  }, [location.pathname]);

  const handleMyPiksClick = () => {
    // Cerrar cualquier menú abierto
    setShowCategories(false);
    setShowMobileSearch(false);
    
    toggleShowFavorites()
    navigate('/')
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    
    // Cerrar cualquier menú abierto
    setShowCategories(false);
    setShowMobileSearch(false);
    
    // Si no estamos en la página principal, navegar a ella
    if (location.pathname !== '/') {
      navigate('/')
    }
    
    // Desactivar favoritos si están activos
    if (showFavorites) {
      setShowFavorites(false)
    }
    
    // Aplicar filtro a todos los productos
    filterByCollection('todos')
    resetSearch()
  }

  const categories = [
    { id: 'todos', name: 'Todos', icon: 'home' },
    { id: 'trending', name: 'Trending', icon: 'trending-up' },
    { id: 'para-ti', name: 'Para ti', icon: 'user' },
    { id: 'tech', name: 'Tech', icon: 'smartphone' },
    { id: 'cocina', name: 'Cocina', icon: 'utensils' },
    { id: 'hogar', name: 'Hogar', icon: 'couch' },
    { id: 'fitness', name: 'Fitness', icon: 'dumbbell' },
    { id: 'mascotas', name: 'Mascotas', icon: 'paw' }
  ]

  const handleCategoryClick = (categoryId) => {
    console.log("Clic en categoría:", categoryId)
    
    // Primero navegar a la página principal si no estamos en ella
    if (location.pathname !== '/') {
      navigate('/')
    }
    
    // Aplicar filtro de categoría - solo una llamada
    filterByCollection(categoryId)
    
    // Cerrar el menú de categorías en móvil
    setShowCategories(false)
  }

  const toggleCategories = () => {
    setShowCategories(prevState => !prevState)
    // Cerrar búsqueda si está abierta
    if (showMobileSearch) setShowMobileSearch(false)
  }

  const toggleMobileSearch = () => {
    setShowMobileSearch(prevState => !prevState)
    // Cerrar categorías si están abiertas
    if (showCategories) setShowCategories(false)
  }

  const handleHomeClick = () => {
    // Cerrar cualquier menú abierto
    setShowCategories(false);
    setShowMobileSearch(false);
    
    // Si no estamos en la página principal, navegar a ella
    if (location.pathname !== '/') {
      navigate('/')
    }
    
    // Aplicar filtro a todos los productos
    filterByCollection('todos')
  }
  
  const handleMobileSearch = (e) => {
    e.preventDefault()
    
    // Primero navegar a la página principal
    if (location.pathname !== '/') {
      navigate('/')
    }
    
    // Implementar búsqueda
    if (mobileSearchQuery.trim() !== '') {
      // Filtrar productos según término de búsqueda
      const lowercaseQuery = mobileSearchQuery.toLowerCase()
      
      // Filtrar productos basados en la consulta
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
      )
      
      // Pasar los productos filtrados
      setFilteredProducts(filtered, mobileSearchQuery)
    } else {
      // Si el campo está vacío, mostrar todos los productos
      resetSearch()
    }
    
    // Cerrar el campo de búsqueda
    setShowMobileSearch(false)
  }

  return (
    <>
      {/* Navbar para escritorio */}
      <div className="side-navbar">
        <div className="side-navbar-content">
          <Link to="/" className="logo-container" onClick={handleLogoClick}>
            <div className="logo-letter">P</div>
          </Link>
          
          <div className="categories-list">
            {categories.map(category => (
              <div 
                key={category.id}
                className={`category-item ${currentCollection === category.id && !showFavorites ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="category-icon">
                  {category.icon === 'home' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  )}
                  {category.icon === 'trending-up' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                  )}
                  {category.icon === 'user' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  )}
                  {category.icon === 'smartphone' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                      <line x1="12" y1="18" x2="12.01" y2="18"></line>
                    </svg>
                  )}
                  {category.icon === 'utensils' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                      <path d="M7 2v20"></path>
                      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
                    </svg>
                  )}
                  {category.icon === 'couch' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="8" rx="2"></rect>
                      <path d="M21 19v2h-8v-2h-2v2H3v-2"></path>
                      <path d="M3 11V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3"></path>
                    </svg>
                  )}
                  {category.icon === 'dumbbell' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6.5 6.5 11 11"></path>
                      <path d="m21 21-1-1"></path>
                      <path d="m3 3 1 1"></path>
                      <path d="m18 22 4-4"></path>
                      <path d="m2 6 4-4"></path>
                      <path d="m3 10 7-7"></path>
                      <path d="m14 21 7-7"></path>
                    </svg>
                  )}
                  {category.icon === 'paw' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="16" r="1"></circle>
                      <circle cx="9" cy="13" r="1"></circle>
                      <circle cx="15" cy="13" r="1"></circle>
                      <circle cx="17" cy="10" r="1"></circle>
                      <circle cx="7" cy="10" r="1"></circle>
                      <path d="M12 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"></path>
                    </svg>
                  )}
                </div>
                <span className="category-name">{category.name}</span>
              </div>
            ))}
          </div>
          
          <button 
            className={`piks-button ${showFavorites ? 'active' : ''}`} 
            onClick={handleMyPiksClick}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill={showFavorites ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span className="piks-button-text">Piks</span>
          </button>
        </div>
        
        <Link to="/profile" className="profile-container">
          <div className={`profile-pic ${location.pathname === '/profile' ? 'active' : ''}`}>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
          </div>
        </Link>
      </div>
      
      {/* Navbar móvil */}
      <nav className="mobile-navbar">
        <Link to="/" className="mobile-nav-item" onClick={handleHomeClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Inicio</span>
        </Link>
        
        <div className="mobile-nav-item" onClick={toggleCategories}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <span>Categorías</span>
        </div>
        
        <div className="mobile-nav-item" onClick={toggleMobileSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span>Buscar</span>
        </div>
        
        <div className="mobile-nav-item" onClick={handleMyPiksClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={showFavorites ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Piks</span>
        </div>
        
        <Link to="/profile" className={`mobile-nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
          <div className="profile-pic-small">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
          </div>
          <span>Perfil</span>
        </Link>
      </nav>

      {/* Dropdown de categorías para móvil */}
      {showCategories && (
        <div className="categories-dropdown">
          <div className="categories-list-mobile">
            {categories.map(category => (
              <div 
                key={category.id} 
                className={`category-dropdown-item ${currentCollection === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Campo de búsqueda móvil */}
      {showMobileSearch && (
        <div className="search-dropdown">
          <form onSubmit={handleMobileSearch} className="search-dropdown-form">
            <input
              type="text"
              placeholder="Buscar productos"
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              className="search-dropdown-input"
              autoFocus
            />
            <button type="submit" className="search-dropdown-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Navbar