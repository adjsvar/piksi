import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import BackButton from './BackButton'
import SimilarProductCard from './SimilarProductCard'
import { categoryColors } from '../data/products'
import '../styles/ProductDetail.css'

const ProductDetail = ({ showNotification }) => {
  const { productId } = useParams()
  const { products, toggleProductPik, getRelatedProducts } = useProducts()
  
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loadingMoreProducts, setLoadingMoreProducts] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMoreProducts, setHasMoreProducts] = useState(true)
  
  // Refs para limpiar recursos
  const youtubeContainerRef = useRef(null)
  const scrollListenerRef = useRef(null)
  
  // Efecto para limpiar recursos al desmontar el componente
  useEffect(() => {
    return () => {
      // Limpiar el listener de scroll
      if (scrollListenerRef.current) {
        window.removeEventListener('scroll', scrollListenerRef.current)
      }
      
      // Limpiar el iframe de YouTube
      if (youtubeContainerRef.current) {
        youtubeContainerRef.current.innerHTML = ''
      }
    }
  }, [])
  
  // Cargar producto y datos relacionados cuando cambia el ID
  useEffect(() => {
    // Resetear estado
    setRelatedProducts([])
    setCurrentPage(1)
    setHasMoreProducts(true)
    setLoadingMoreProducts(false)
    
    // Limpiar iframe de YouTube
    if (youtubeContainerRef.current) {
      youtubeContainerRef.current.innerHTML = ''
    }
    
    const foundProduct = products.find(p => p.id === parseInt(productId))
    if (foundProduct) {
      setProduct(foundProduct)
      
      // Limitar a 8 productos similares iniciales para mejorar rendimiento
      const related = getRelatedProducts(foundProduct.id, 8)
      setRelatedProducts(related)
      
      // Iniciar video con un pequeño retraso
      setTimeout(() => {
        initVideo(foundProduct.videoId || '-_70_SIGNCs')
      }, 100)
    }
  }, [productId, products, getRelatedProducts])

  // Handler de scroll optimizado con useCallback
  const handleScroll = useCallback(() => {
    if (!hasMoreProducts || loadingMoreProducts) return
    
    const scrollPosition = window.innerHeight + window.scrollY
    const bodyHeight = document.body.offsetHeight
    
    if (scrollPosition >= bodyHeight - 500) {
      loadMoreSimilarProducts()
    }
  }, [loadingMoreProducts, hasMoreProducts])

  // Configurar el listener de scroll
  useEffect(() => {
    // Guardamos la referencia para poder limpiarla después
    scrollListenerRef.current = handleScroll
    window.addEventListener('scroll', scrollListenerRef.current)
    
    return () => {
      window.removeEventListener('scroll', scrollListenerRef.current)
    }
  }, [handleScroll])

  // Función para cargar más productos
  const loadMoreSimilarProducts = useCallback(() => {
    if (loadingMoreProducts || !hasMoreProducts) return
    
    setLoadingMoreProducts(true)
    
    setTimeout(() => {
      const nextPage = currentPage + 1
      
      // Cargamos menos productos para mejorar el rendimiento
      const moreProducts = getRelatedProducts(parseInt(productId), 6)
      
      // Aseguramos IDs únicos para evitar problemas de renderizado
      const uniqueMoreProducts = moreProducts.map((p, idx) => ({
        ...p,
        uniqueId: `${p.id}-page${nextPage}-${idx}`
      }))
      
      setRelatedProducts(prev => [...prev, ...uniqueMoreProducts])
      setCurrentPage(nextPage)
      setLoadingMoreProducts(false)
      
      // Limitamos a máximo 3 páginas para evitar sobrecarga
      if (nextPage >= 3) {
        setHasMoreProducts(false)
      }
    }, 300) // Reducimos el tiempo de espera
  }, [currentPage, getRelatedProducts, hasMoreProducts, loadingMoreProducts, productId])

  const handleTogglePik = () => {
    if (!product) return
    
    toggleProductPik(parseInt(productId))
    
    if (!product.piked) {
      showNotification(product, "Piksis")
    }
  }

  // Inicializar video de manera más eficiente
  const initVideo = (videoId) => {
    if (!youtubeContainerRef.current) return
    
    try {
      // Versión simplificada para mejorar rendimiento
      youtubeContainerRef.current.innerHTML = `
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&rel=0&modestbranding=1&playlist=${videoId}&iv_load_policy=3&playsinline=1" 
          title="YouTube video" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        ></iframe>
      `
      
      // Ocultar placeholder y botón de play
      const placeholder = document.querySelector('.detail-video-placeholder')
      const playIcon = document.querySelector('.detail-video-play-icon')
      
      if (placeholder) placeholder.style.display = 'none'
      if (playIcon) playIcon.style.display = 'none'
    } catch (error) {
      console.error("Error al iniciar el video:", error)
    }
  }

  if (!product) {
    return <div className="loading">Cargando...</div>
  }

  return (
    <div className="product-detail-page">
      <BackButton />
      
      <div className="product-detail-content">
        <div className="product-detail-main">
          {/* Columna izquierda: Video */}
          <div className="product-detail-header">
            <div className="product-detail-video-container">
              <div id="detailYoutubePlayerContainer" ref={youtubeContainerRef}></div>
              <div 
                className="detail-video-play-icon" 
                onClick={() => initVideo(product.videoId || '-_70_SIGNCs')}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="30" 
                  height="30" 
                  viewBox="0 0 24 24" 
                  fill="white" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              <img 
                src={`https://img.youtube.com/vi/${product.videoId || '-_70_SIGNCs'}/maxresdefault.jpg`} 
                className="detail-video-placeholder" 
                alt={product.title} 
              />
            </div>
          </div>

          {/* Columna derecha: Info del producto */}
          <div className="product-detail-info slide-in">
            <div className="product-detail-badge-container">
              {product.trending && (
                <div className="small-badge trending">
                  Trending
                </div>
              )}
              <div 
                className="small-badge category" 
                style={{ 
                  backgroundColor: `${categoryColors[product.category]}20`, 
                  color: categoryColors[product.category] 
                }}
              >
                {product.category === 'tecnologia' 
                  ? 'Tecnología' 
                  : product.category.charAt(0).toUpperCase() + product.category.slice(1)
                }
              </div>
              {product.amazonChoice && (
                <div className="small-badge amazon">
                  Amazon's Choice
                </div>
              )}
            </div>
            
            <h2 className="product-detail-title">{product.title}</h2>
            
            <div className="product-detail-price-container">
              <div className="product-detail-price">€{product.price.toFixed(2)}</div>
              <div className="product-detail-price-original">€{product.originalPrice.toFixed(2)}</div>
              <div className="product-detail-discount">-{product.discount}</div>
            </div>
            
            <div className="product-detail-rating">
              <div className="rating-stars">
                {'★'.repeat(Math.floor(product.rating))}
                {product.rating % 1 >= 0.5 ? '½' : ''}
              </div>
              <div className="rating-number">{product.rating}</div>
              <div className="rating-count">({product.reviewCount} valoraciones)</div>
            </div>
            
            <div className="product-detail-action-buttons">
              <a 
                href={`https://amazon.es/dp/${product.asin}?tag=affiliatetag-21`} 
                className="cta-button" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                  <line x1="12" y1="2" x2="12" y2="12"></line>
                </svg>
                Ver oferta en Amazon
              </a>
              <button 
                className={`pik-button-large ${product.piked ? 'active' : ''}`} 
                onClick={handleTogglePik}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill={product.piked ? 'currentColor' : 'none'} 
                  stroke="currentColor" 
                  strokeWidth={product.piked ? '1' : '2'} 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                {product.piked ? 'Guardado' : 'Guardar'}
              </button>
            </div>
            
            <div className="affiliate-disclaimer">
              <p className="affiliate-disclaimer-text">
                <strong>Información de afiliados:</strong> Como Asociados de Amazon, obtenemos ingresos por las compras realizadas mediante los enlaces de esta página.
              </p>
            </div>
          </div>
        </div>
        
        <h3 className="similar-products-title slide-in">Productos similares</h3>
        <div className="similar-products-container">
          {relatedProducts.map((relProd, index) => (
            <SimilarProductCard 
              key={relProd.uniqueId || `${relProd.id}-${index}`} 
              product={relProd} 
              index={index} 
            />
          ))}
        </div>
        
        {loadingMoreProducts && (
          <div className="loading-indicator">
            Cargando más productos...
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail