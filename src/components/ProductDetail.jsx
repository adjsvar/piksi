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
  const [cycleCount, setCycleCount] = useState(0)
  const [videoLoaded, setVideoLoaded] = useState(false)
  
  // Ref para el contenedor del iframe
  const iframeContainerRef = useRef(null)
  const scrollListenerRef = useRef(null)
  
  // Usamos el mismo ID de video para todos los productos
  const videoId = "6vavVtGDCvA"
  
  // Efecto para limpiar recursos al desmontar el componente
  useEffect(() => {
    return () => {
      // Limpiar el listener de scroll
      if (scrollListenerRef.current) {
        window.removeEventListener('scroll', scrollListenerRef.current)
      }
      
      // Limpiar iframe
      if (iframeContainerRef.current) {
        iframeContainerRef.current.innerHTML = ''
      }
    }
  }, [])
  
  // Cargar producto y datos relacionados cuando cambia el ID
  useEffect(() => {
    // Resetear estado
    setRelatedProducts([])
    setCurrentPage(1)
    setLoadingMoreProducts(false)
    setCycleCount(0)
    setVideoLoaded(false)
    
    // Limpiar iframe
    if (iframeContainerRef.current) {
      iframeContainerRef.current.innerHTML = ''
    }
    
    const foundProduct = products.find(p => p.id === parseInt(productId))
    if (foundProduct) {
      setProduct(foundProduct)
      
      // Cargamos los productos iniciales
      const related = getRelatedProducts(foundProduct.id, 12)
      setRelatedProducts(related)
      
      // Cargar el iframe con un pequeño retraso
      setTimeout(() => {
        loadVideoIframe()
      }, 100)
    }
  }, [productId, products, getRelatedProducts])

  // Handler de scroll optimizado con useCallback
  const handleScroll = useCallback(() => {
    if (loadingMoreProducts) return
    
    const scrollPosition = window.innerHeight + window.scrollY
    const bodyHeight = document.body.offsetHeight
    
    // Aumentamos la distancia de trigger para cargar más temprano
    if (scrollPosition >= bodyHeight - 1000) {
      loadMoreSimilarProducts()
    }
  }, [loadingMoreProducts])

  // Configurar el listener de scroll
  useEffect(() => {
    // Guardamos la referencia para poder limpiarla después
    scrollListenerRef.current = handleScroll
    window.addEventListener('scroll', scrollListenerRef.current)
    
    return () => {
      window.removeEventListener('scroll', scrollListenerRef.current)
    }
  }, [handleScroll])

  // Función para cargar más productos con ciclo continuo y límite de productos
  const loadMoreSimilarProducts = useCallback(() => {
    if (loadingMoreProducts) return
    
    setLoadingMoreProducts(true)
    
    setTimeout(() => {
      try {
        const nextPage = currentPage + 1
        
        // Verificamos que productId sea válido
        const parsedProductId = parseInt(productId)
        if (isNaN(parsedProductId)) {
          console.error("ID de producto inválido:", productId)
          setLoadingMoreProducts(false)
          return
        }
        
        // Cargamos más productos
        const moreProducts = getRelatedProducts(parsedProductId, 8)
        
        // Verificamos si llegamos al límite de páginas
        const isNewCycle = nextPage > 3
        const newCycleCount = isNewCycle ? cycleCount + 1 : cycleCount
        const adjustedPage = isNewCycle ? 1 : nextPage
        
        // Aseguramos IDs únicos para cada producto
        const uniqueMoreProducts = moreProducts.map((p, idx) => ({
          ...p,
          uniqueId: `${p.id}-cycle${newCycleCount}-page${adjustedPage}-${idx}`
        }))
        
        // Limitamos el número total de productos mostrados
        setRelatedProducts(prev => {
          // Si superamos el límite, eliminamos los más antiguos
          const maxProducts = 36;
          const newProducts = [...prev, ...uniqueMoreProducts];
          return newProducts.length > maxProducts ? 
            newProducts.slice(newProducts.length - maxProducts) : 
            newProducts;
        })
        
        setCurrentPage(adjustedPage)
        setCycleCount(newCycleCount)
      } catch (error) {
        console.error("Error al cargar más productos:", error)
      } finally {
        setLoadingMoreProducts(false)
      }
    }, 150)
  }, [currentPage, cycleCount, getRelatedProducts, loadingMoreProducts, productId])

  const handleTogglePik = () => {
    if (!product) return
    
    toggleProductPik(parseInt(productId))
    
    if (!product.piked) {
      showNotification(product, "Piksis")
    }
  }
  
  const handleShareClick = () => {
    if (!product) return
    
    // En una implementación real, esto abriría un modal de compartir
    alert(`Compartir: ${product.title} - En una implementación real, esto abriría opciones para compartir en redes sociales, WhatsApp, etc.`)
  }

  // Cargar iframe de YouTube sin controles y sin lista de reproducción
  const loadVideoIframe = () => {
    if (!iframeContainerRef.current) return
    
    try {
      iframeContainerRef.current.innerHTML = `
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&modestbranding=1&fs=0&disablekb=1&iv_load_policy=3&color=white" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        ></iframe>
      `
      
      // Ocultar placeholder y botón de play
      setVideoLoaded(true)
    } catch (error) {
      console.error("Error al cargar el iframe:", error)
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
              <div id="iframeContainer" className="iframe-container" ref={iframeContainerRef}></div>
              
              {!videoLoaded && (
                <>
                  <div 
                    className="detail-video-play-icon" 
                    onClick={loadVideoIframe}
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
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                    className="detail-video-placeholder" 
                    alt={product.title} 
                  />
                </>
              )}
            </div>
          </div>

          {/* Columna derecha: Info del producto */}
          <div className="product-detail-info slide-in">
            <div className="product-action-header">
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
              
              <div className="product-action-buttons-top">
                <button 
                  className={`action-button-icon ${product.piked ? 'active' : ''}`} 
                  onClick={handleTogglePik}
                  title={product.piked ? "Guardado" : "Guardar"}
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
                </button>
                
                <button 
                  className="action-button-icon" 
                  onClick={handleShareClick}
                  title="Compartir"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
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