import { memo } from 'react'
import { Link } from 'react-router-dom'
import '../styles/ProductCard.css'

// Usando React.memo para evitar re-renderizados innecesarios
const SimilarProductCard = memo(({ product, index }) => {
  // Limitar el delay de animación para mejorar rendimiento
  const delay = Math.min(index * 25, 200) 

  const truncateText = (text, maxLength) => {
    if (typeof text !== 'string') return ''
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    return text
  }

  // Early return para evitar errores con datos inválidos
  if (!product || !product.id) {
    return null
  }

  return (
    <div className="product-card-wrapper">
      <Link 
        to={`/product/${product.id}`} 
        className="product-card" 
        style={{ 
          animationDelay: `${delay}ms`,
          willChange: 'transform' // Optimización para dispositivos móviles
        }}
      >
        <div className="product-image">
          <div className="product-color-bg" style={{ backgroundColor: '#000' }}>
            {product.videoId ? (
              <img 
                src={`https://img.youtube.com/vi/${product.videoId}/maxresdefault.jpg`} 
                className="product-thumbnail" 
                alt={product.title} 
                loading="lazy" 
              />
            ) : (
              <div style={{ width: '100%', height: '100%', backgroundColor: `#${product.color}` }}></div>
            )}
          </div>
          
          <div className="product-title-overlay">
            <h3 className="product-title-text-overlay">
              {truncateText(product.title, 40)}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  )
})

// Nombre de display para DevTools
SimilarProductCard.displayName = 'SimilarProductCard'

export default SimilarProductCard