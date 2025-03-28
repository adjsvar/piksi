import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import '../styles/MobileNavbar.css'

const MobileNavbar = () => {
  const { showFavorites, toggleShowFavorites, filterByCollection } = useProducts()
  const navigate = useNavigate()
  const [showCategories, setShowCategories] = useState(false)

  const handleHomeClick = () => {
    if (showFavorites) {
      toggleShowFavorites()
    }
    filterByCollection('todos')
    navigate('/')
  }

  const handlePiksClick = () => {
    if (!showFavorites) {
      toggleShowFavorites()
    }
    navigate('/')
  }

  const toggleCategories = () => {
    setShowCategories(!showCategories)
  }

  const handleCategoryClick = (categoryId) => {
    if (showFavorites) {
      toggleShowFavorites()
    }
    filterByCollection(categoryId)
    setShowCategories(false)
    navigate('/')
  }

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'tech', name: 'Tech' },
    { id: 'cocina', name: 'Cocina' },
    { id: 'hogar', name: 'Hogar' },
    { id: 'fitness', name: 'Fitness' },
    { id: 'mascotas', name: 'Mascotas' },
    { id: 'viajes', name: 'Viajes' },
    { id: 'ofertas', name: 'Ofertas' }
  ]

  return (
    <>
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
        
        <div className="mobile-nav-item" onClick={handlePiksClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={showFavorites ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Piks</span>
        </div>
      </nav>

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

export default MobileNavbar