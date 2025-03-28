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
    setShowFavorites 
  } = useProducts()
  
  const navigate = useNavigate()
  const location = useLocation()
  const [showCategories, setShowCategories] = useState(false)

  // Cerrar menú de categorías cuando se cambia de página
  useEffect(() => {
    setShowCategories(false);
  }, [location.pathname]);

  const handleMyPiksClick = () => {
    toggleShowFavorites()
    navigate('/')
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    // Desactivar favoritos si están activos
    if (showFavorites) {
      setShowFavorites(false)
    }
    filterByCollection('todos')
    resetSearch()
    navigate('/')
  }

  const categories = [
    { id: 'todos', name: 'Inicio', icon: 'home' },
    { id: 'tech', name: 'Tech', icon: 'smartphone' },
    { id: 'cocina', name: 'Cocina', icon: 'utensils' },
    { id: 'hogar', name: 'Hogar', icon: 'couch' },
    { id: 'fitness', name: 'Fitness', icon: 'dumbbell' },
    { id: 'mascotas', name: 'Mascotas', icon: 'paw' }
  ]

  const handleCategoryClick = (categoryId) => {
    console.log("Clic en categoría:", categoryId)
    
    // Si estamos en favoritos, desactivarlos
    if (showFavorites) {
      setShowFavorites(false)
    }
    
    // Aplicar filtro de categoría
    filterByCollection(categoryId)
    resetSearch()
    
    // Navegar a la página principal
    navigate('/')
    
    // Cerrar el menú de categorías en móvil
    setShowCategories(false)
  }

  const toggleCategories = () => {
    setShowCategories(prevState => !prevState)
  }

  const handleHomeClick = () => {
    if (showFavorites) {
      toggleShowFavorites()
    }
    filterByCollection('todos')
    navigate('/')
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
        
        <div className="mobile-nav-item" onClick={handleMyPiksClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={showFavorites ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Piks</span>
        </div>
        
        <Link to="/profile" className={`mobile-nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
          <div className="profile-pic" style={{ width: '24px', height: '24px', marginBottom: '4px' }}>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
          </div>
          <span>Perfil</span>
        </Link>
      </nav>

      {/* Dropdown de categorías para móvil - Ahora desde abajo con wrap */}
      {showCategories && (
        <div className="categories-dropdown">
          <div className="categories-list">
            {categories.map(category => (
              <div 
                key={category.id} 
                className="category-dropdown-item" 
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar