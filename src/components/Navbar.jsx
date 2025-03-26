import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import CollectionsTab from './CollectionsTab'
import '../styles/Navbar.css'

const Navbar = () => {
  const { showFavorites, toggleShowFavorites } = useProducts()
  const navigate = useNavigate()

  const handleMyPiksClick = () => {
    toggleShowFavorites()
    navigate('/')
  }

  return (
    <div className="top-navbar">
      <div className="search-container">
        <Link to="/" className="logo-container">
          <div className="logo-text">
            piksi
          </div>
        </Link>
        
        <div className="main-nav-section">
          <div className="search-wrapper">
            <div className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input type="text" placeholder="Buscar productos, gadgets, ofertas..." className="search-input" />
          </div>
        </div>
        
        <button 
          className={`my-piks-button ${showFavorites ? 'active' : ''}`} 
          onClick={handleMyPiksClick}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          Mis Piks
        </button>
      </div>

      <CollectionsTab />
    </div>
  )
}

export default Navbar