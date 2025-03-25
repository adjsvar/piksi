import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import '../styles/ProductCard.css'

const ProductCard = ({ product, showNotification }) => {
  const { toggleProductPik } = useProducts()

  const handlePikClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    toggleProductPik(product.id)
    
    if (!product.piked) {
      showNotification(product)
    }
  }

  const handleShareClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // En una implementación real, esto abriría un modal de compartir
    alert(`Compartir: ${product.title} - En una implementación real, esto abriría opciones para compartir en redes sociales, WhatsApp, etc.`)
  }

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    return text
  }

  return (
    <div className="product-card-wrapper">
      <Link to={`/product/${product.id}`} className="product-card">
        <div className="product-image">
          <div className="product-color-bg" style={{ backgroundColor: '#000' }}>
            {product.videoId && (
              <>
                <img 
                  src={`https://img.youtube.com/vi/${product.videoId}/maxresdefault.jpg`} 
                  className="product-thumbnail" 
                  alt={product.title} 
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="white" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  style={{ position: 'absolute', zIndex: 5, opacity: 0.9 }}
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8" fill="black" stroke="black"></polygon>
                </svg>
              </>
            )}
          </div>
          
          {product.trending && (
            <div className="trending-badge">
              Trending
            </div>
          )}
          
          <div className="pik-button-container">
            <button 
              className={`pik-button ${product.piked ? 'active' : ''}`} 
              onClick={handlePikClick}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill={product.piked ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                strokeWidth={product.piked ? '1' : '2'} 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </button>
          </div>
          
          <div className="share-button-container">
            <button 
              className="share-button" 
              onClick={handleShareClick}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </button>
          </div>
          
          <div className="product-title-overlay">
            <h3 className="product-title-text-overlay">
              {truncateText(product.title, 45)}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard