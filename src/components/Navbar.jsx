import { Link } from 'react-router-dom'
import CollectionsTab from './CollectionsTab'
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <div className="top-navbar">
      <div className="search-container">
        <Link to="/" className="logo-container">
          <div className="logo-text">
            piksi
          </div>
        </Link>
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

      <CollectionsTab />
    </div>
  )
}

export default Navbar