import { Link } from 'react-router-dom'
import '../styles/SimilarProductCard.css'

const SimilarProductCard = ({ product, index }) => {
  const delay = index * 100 // Retraso escalonado para la animación

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="similar-product-card slide-in" 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="similar-product-header">
        {product.videoId ? (
          <>
            <img 
              src={`https://img.youtube.com/vi/${product.videoId}/maxresdefault.jpg`} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
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
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 5, opacity: 0.9 }}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="10 8 16 12 10 16 10 8" fill="black" stroke="black"></polygon>
            </svg>
          </>
        ) : (
          <div style={{ width: '100%', height: '100%', backgroundColor: `#${product.color}` }}></div>
        )}
      </div>
      <div className="similar-product-info">
        <h3 className="similar-product-title">{product.title}</h3>
        <div className="product-meta">
          <div className="product-price">€{product.price.toFixed(2)}</div>
          <div className="price-discount">-{product.discount}</div>
        </div>
      </div>
    </Link>
  )
}

export default SimilarProductCard