import React, { useEffect, useState, useRef, useMemo } from 'react';
import Grid from './Grid';

const DesktopProductDetail = ({ product: propProduct }) => {
  const [product, setProduct] = useState(propProduct || null);
  const [isLoading, setIsLoading] = useState(!propProduct);
  const [screenSize, setScreenSize] = useState('desktop');
  const [gap, setGap] = useState(1.0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showSimilarButton, setShowSimilarButton] = useState(true);
  
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const gridRef = useRef(null);
  
  // Si no recibimos el producto como prop, extraerlo de la URL
  useEffect(() => {
    // Si ya tenemos el producto como prop, no necesitamos generarlo
    if (propProduct) {
      setProduct(propProduct);
      setIsLoading(false);
      return;
    }
    
    // Extraer ID del producto desde la URL (fallback para compatibilidad)
    const urlParts = window.location.pathname.split('/');
    const productId = urlParts[urlParts.length - 1];
    
    // Si no tenemos ID, no podemos continuar
    if (!productId) return;
    
    // Generar el producto mediante las funciones existentes
    const idNumber = parseInt(productId.split('-')[1]) || 1;
    
    // Ver si hay una imagen precargada en sessionStorage
    const precachedImageUrl = getPrecachedImage(productId);
    
    // URL para la imagen principal
    const mainImageUrl = precachedImageUrl || 
      `https://picsum.photos/seed/${idNumber % 1000}/800/1422`;
    
    // URL para la imagen de baja resolución (placeholder)
    const lowResUrl = getLowResUrl(idNumber);
    
    // Precargar la imagen principal
    const img = new Image();
    img.src = mainImageUrl;
    
    const generatedProduct = {
      id: productId,
      imageUrl: mainImageUrl,
      lowResUrl: lowResUrl,
      title: generateProductTitle(idNumber),
      price: generateProductPrice(idNumber),
      description: generateProductDescription(idNumber),
      rating: generateRating(idNumber),
      reviewCount: generateReviewCount(idNumber),
      category: generateCategory(idNumber)
    };
    
    // Mostrar el producto inmediatamente, la imagen se cargará en segundo plano
    setProduct(generatedProduct);
    setIsLoading(false);
    
  }, [propProduct]);
  
  // Asegurar que el scroll comience desde arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Controlar visibilidad del botón basado en el scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      if (gridRef.current) {
        const gridRect = gridRef.current.getBoundingClientRect();
        const isGridVisible = gridRect.top <= window.innerHeight;
        const isScrollingDown = window.scrollY > lastScrollY;
        const isAtTop = window.scrollY === 0;
        
        // Ocultar el botón si:
        // 1. Se está haciendo scroll hacia abajo
        if (isScrollingDown) {
          setShowSimilarButton(false);
        }
        // Mostrar el botón si:
        // 1. Se está en la parte superior de la página O
        // 2. Se está haciendo scroll hacia arriba y el grid no está visible
        else if (isAtTop || !isGridVisible) {
          setShowSimilarButton(true);
        }
      }
      
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Determinar tamaño de pantalla y ajustar gap
  useEffect(() => {
    const updateLayout = () => {
      // Determinar categoría de tamaño de pantalla 
      if (window.innerWidth < 768) {
        setScreenSize('mobile');
      } else if (window.innerWidth < 1200) {
        setScreenSize('tablet');
      } else if (window.innerWidth < 1600) {
        setScreenSize('desktop');
      } else {
        setScreenSize('large');
      }
      
      let newGap;
      if (window.innerWidth >= 1200) {
        newGap = 1.0;
      } else if (window.innerWidth >= 768) {
        newGap = 0.7;
      } else {
        newGap = 0.4;
      }
      setGap(newGap);
    };
    
    updateLayout();
    
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateLayout, 150);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);
  
  // Buscar imagen precargada en sessionStorage
  const getPrecachedImage = (productId) => {
    try {
      return sessionStorage.getItem(`preload_${productId}`);
    } catch (e) {
      return null;
    }
  };
  
  // Generar imagen de baja resolución para placeholder
  const getLowResUrl = (idNumber) => {
    const seed = idNumber % 1000;
    return `https://picsum.photos/seed/${seed}/100/178?blur=1`; // Proporción 9:16 
  };
  
  // Pre-cargar imagen en el head del documento
  useEffect(() => {
    if (!product.id) return;
    
    const idNumber = parseInt(product.id.split('-')[1]) || 1;
    const imageUrl = `https://picsum.photos/seed/${idNumber % 1000}/800/1422`;
    
    // Agregar link de preload al head
    const linkElement = document.createElement('link');
    linkElement.rel = 'preload';
    linkElement.href = imageUrl;
    linkElement.as = 'image';
    linkElement.fetchPriority = 'high';
    document.head.appendChild(linkElement);
    
    // Limpiar al desmontar
    return () => {
      document.head.removeChild(linkElement);
    };
  }, [product.id]);
  
  // Funciones para generar datos de producto consistentes
  const generateProductTitle = (idNumber) => {
    const products = [
      "Teclado mecánico RGB con switches Blue para gaming",
      "Auriculares gaming con cancelación de ruido y micrófono",
      "Ratón inalámbrico ergonómico con DPI ajustable",
      "Monitor curvo 27 pulgadas 144Hz para gaming",
      "Alfombrilla XXL para ratón con RGB",
      "Silla gaming ergonómica con soporte lumbar",
      "Torre gaming RGB con refrigeración líquida",
      "Webcam Full HD 1080p con micrófono incorporado",
      "Tarjeta gráfica 8GB VRAM para gaming",
      "SSD NVMe 1TB de alta velocidad"
    ];
    
    return products[idNumber % products.length];
  };
  
  const generateProductPrice = (idNumber) => {
    const basePrice = (idNumber % 27) * 10 + 29.99;
    return basePrice.toFixed(2);
  };
  
  const generateProductDescription = (idNumber) => {
    const descriptions = [
      "Descubre este increíble producto seleccionado especialmente para ti. Con calidad premium y diseño innovador, es perfecto para tu estilo de vida. Miles de usuarios ya lo han probado y se ha convertido en un imprescindible. No te pierdas esta oferta por tiempo limitado.",
      "Este producto de alta gama ha sido diseñado pensando en las necesidades más exigentes. Su construcción robusta y materiales de primera calidad garantizan años de uso sin problemas. Ideal para profesionales y entusiastas que buscan lo mejor.",
      "Una opción excepcional que combina tecnología avanzada con un diseño elegante. Características innovadoras que destacan sobre la competencia y una relación calidad-precio inmejorable. Envío rápido y garantía extendida incluidos.",
      "La elección perfecta para quienes buscan rendimiento superior sin comprometer el estilo. Este producto incorpora las últimas tecnologías del mercado con un diseño pensado hasta el último detalle. Compatible con todos tus dispositivos actuales."
    ];
    
    return descriptions[idNumber % descriptions.length];
  };
  
  const generateRating = (idNumber) => {
    return (3.5 + ((idNumber % 15) / 10)).toFixed(1);
  };
  
  const generateReviewCount = (idNumber) => {
    return 10 + (idNumber % 100) * 10;
  };
  
  const generateCategory = (idNumber) => {
    const categories = [
      "Tecnología", "Gaming", "Informática", "Periféricos", 
      "Accesorios", "Audio", "Vídeo", "Ordenadores"
    ];
    
    return categories[idNumber % categories.length];
  };
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  
  // Determinar tamaño de cards según tamaño de pantalla
  const getCardWidth = () => {
    switch (screenSize) {
      case 'mobile':
        return '85%';
      case 'tablet':
        return '40%';
      case 'desktop':
        return '25%';
      case 'large':
        return '20%';
      default:
        return '25%';
    }
  };
  
  // Determinar layout según tamaño de pantalla
  const getLayout = () => {
    // Móvil: columnas, Tablet y Desktop: filas
    return screenSize === 'mobile' ? 'column' : 'row';
  };
  
  // Estilos CSS en línea - Optimizados con useMemo
  const styles = useMemo(() => ({
    container: {
      width: '100%',
      padding: '0.4rem',
      paddingTop: 'calc(4rem + 3rem)', // 4rem para el navbar + 3rem para la categoría
      backgroundColor: '#eef2ff'
    },
    productDetail: {
      display: 'flex',
      flexDirection: getLayout(),
      gap: '1rem',
      marginBottom: '2rem',
      marginTop: '1rem',
      justifyContent: 'center',
      alignItems: 'center'
    },
    imageContainer: {
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      width: getCardWidth(),
      minWidth: '250px', // Tamaño mínimo para asegurar legibilidad
      aspectRatio: '9/16',
      backgroundColor: '#f3f4f6'
    },
    videoContainer: {
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      width: getCardWidth(),
      minWidth: '250px',
      aspectRatio: '9/16',
      height: 'calc((9/16) * ' + getCardWidth() + ' - 10px)', // 10px menos alto
      backgroundColor: '#f3f4f6'
    },
    productImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      display: 'block',
      opacity: imageLoaded ? 1 : 0,
      transition: 'opacity 0.3s ease'
    },
    lowResImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      filter: 'blur(5px)',
      opacity: imageLoaded ? 0 : 1,
      transition: 'opacity 0.3s ease'
    },
    productInfo: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: `${gap * 1.5}rem`,
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      width: getCardWidth(),
      minWidth: '250px',
      aspectRatio: '9/16',
      overflow: 'auto'
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#1e293b',
      marginBottom: '0.5rem'
    },
    price: {
      fontSize: '1.875rem',
      fontWeight: 700,
      color: '#0f172a'
    },
    rating: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    stars: {
      display: 'flex',
      color: '#f59e0b'
    },
    reviewCount: {
      color: '#64748b',
      fontSize: '0.875rem'
    },
    description: {
      color: '#334155',
      lineHeight: 1.5,
      marginBottom: '1.5rem',
      fontSize: '0.9rem',
      maxHeight: '180px',
      overflowY: 'auto',
      paddingRight: '0.5rem'
    },
    category: {
      display: 'inline-block',
      backgroundColor: '#e0f2fe',
      color: '#0369a1',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 500,
      marginBottom: '1rem'
    },
    button: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      alignSelf: 'center'
    },
    buttonHover: {
      backgroundColor: '#2563eb'
    },
    disclaimer: {
      marginTop: '1rem',
      fontSize: '0.75rem',
      color: '#64748b',
      fontStyle: 'italic',
      backgroundColor: 'rgba(100, 116, 139, 0.1)',
      padding: '0.5rem',
      borderRadius: '0.375rem',
      textAlign: 'center'
    },
    similarButton: {
      position: 'fixed',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      outline: 'none'
    },
    similarButtonHover: {
      transform: 'translateX(-50%) translateY(-2px)',
      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)'
    },
    arrowIcon: {
      width: '20px',
      height: '20px',
      transition: 'transform 0.2s'
    },
    similarTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#0f172a',
      margin: '2rem 0 1rem',
      textAlign: 'center'
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh'
    },
    loadingSpinner: {
      width: '2rem',
      height: '2rem',
      borderRadius: '50%',
      border: '0.25rem solid #e2e8f0',
      borderTopColor: '#3b82f6',
      animation: 'spin 0.8s infinite linear'
    },
    likeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      backgroundColor: isLiked ? 'rgba(244, 63, 94, 0.9)' : 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: 10,
      transition: 'opacity 0.3s ease, background-color 0.3s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    },
    heartIcon: {
      width: '20px',
      height: '20px',
      transition: 'fill 0.3s ease'
    }
  }), [gap, imageLoaded, isLiked, screenSize]);
  
  // Renderizar estrellas según la calificación
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div style={styles.stars}>
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
        ))}
        
        {hasHalfStar && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
        )}
        
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
        ))}
      </div>
    );
  };
  
  // Agregar animación de spinner una sola vez
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      @keyframes heartbeat {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.2);
        }
        25%, 75% {
          transform: scale(1.1);
        }
      }
      .heart-animation {
        animation: heartbeat 500ms ease-in-out;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner}></div>
        </div>
      </div>
    );
  }
  
  // Verificar si debemos mostrar un video en lugar de una imagen
  const showVideo = product.videoUrl || product.showVideo;
  
  return (
    <div ref={containerRef} style={styles.container}>
      <div style={styles.productDetail}>
        {showVideo ? (
          <div style={styles.videoContainer}>
            <iframe
              src="https://www.youtube.com/embed/y7nL9yBHTS4?autoplay=1&mute=1&loop=1&playlist=y7nL9yBHTS4&controls=0"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{ 
                width: '100%', 
                height: 'calc(100% + 10px)', // 10px más alto para eliminar bandas negras
                border: 'none',
                marginTop: '-5px', // Ajustar posición vertical
                marginBottom: '-5px'
              }}
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div style={styles.imageContainer}>
            {/* Imagen de baja resolución como placeholder */}
            {!imageLoaded && (
              <img
                src={product.lowResUrl}
                alt=""
                style={styles.lowResImage}
              />
            )}
            
            {/* Imagen principal de alta resolución */}
            <img
              ref={imageRef}
              src={product.imageUrl}
              alt={product.title}
              style={styles.productImage}
              onLoad={handleImageLoad}
              fetchpriority="high"
            />
          </div>
        )}
        
        <div style={styles.productInfo}>
          {/* Botón de like en la esquina superior derecha */}
          <div 
            style={styles.likeButton}
            onClick={handleLike}
            className={isLiked ? 'heart-animation' : ''}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={styles.heartIcon}
              fill={isLiked ? "#ffffff" : "none"}
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>

          <div>
            <span style={styles.category}>{product.category}</span>
            <h1 style={styles.title}>{product.title}</h1>
            
            <div style={styles.rating}>
              {renderStars(parseFloat(product.rating))}
              <span style={styles.reviewCount}>{product.reviewCount} valoraciones</span>
            </div>
            
            <p style={styles.description}>{product.description}</p>
          </div>
          
          <div style={styles.buttonContainer}>
            <button 
              style={styles.button}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
              }}
            >
              Ver en Amazon
            </button>
            
            <div style={styles.disclaimer}>
              Como Asociados de Amazon, obtenemos ingresos por las compras realizadas mediante los enlaces de esta página.
            </div>
          </div>
        </div>
      </div>
      
      <button 
        style={{
          ...styles.similarButton,
          display: showSimilarButton ? 'flex' : 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = styles.similarButtonHover.transform;
          e.currentTarget.style.boxShadow = styles.similarButtonHover.boxShadow;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(-50%)';
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }}
        onClick={() => {
          const navbarHeight = 64; // Altura del navbar
          const gridPosition = gridRef.current?.getBoundingClientRect().top;
          const scrollPosition = window.scrollY + gridPosition - navbarHeight;
          
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
          
          setShowSimilarButton(false);
        }}
      >
        Productos similares
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
          style={styles.arrowIcon}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      
      {/* Separación clara entre detalles del producto y productos similares */}
      <div style={{ marginTop: '20px' }}>
        {/* Usando el componente Grid para mostrar productos similares, ocupa todo el ancho */}
        <Grid />
      </div>
    </div>
  );
};

export default DesktopProductDetail;