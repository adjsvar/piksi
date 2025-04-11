import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

const Grid = () => {
  const [columnData, setColumnData] = useState([]);
  const [columnCount, setColumnCount] = useState(7);
  const [isLoading, setIsLoading] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [likedCards, setLikedCards] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [preloadedDetails, setPreloadedDetails] = useState({});
  
  // Constantes
  const [gap, setGap] = useState(0.5);
  const ASPECT_RATIO = 16/9;
  const PRELOAD_AHEAD = 5;
  
  // Referencias
  const idCounter = useRef(0);
  const scrollCounter = useRef(0);
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const scrollAnchorRef = useRef(null);
  const scrollAnchorPositionRef = useRef(null);
  const imageCache = useRef({});
  const usedCategoriesRef = useRef([]);
  const categoryIndexRef = useRef(0);
  const nextCategoryColumnRef = useRef(0);
  const visibleRowsObserver = useRef(null);
  
  // Lista completa de categorías disponibles
  const allCategories = [
    "Viajes", "Recetas", "Moda", "Tecnología", "Música", 
    "Deportes", "Gaming", "Películas", "Decoración", "Arte",
    "Libros", "Jardín", "Fotografía", "Mascotas", "Coches",
    "Educación", "Salud", "Belleza", "Cocina", "Naturaleza"
  ];
  
  // Ajustar layout según tamaño de pantalla
  useEffect(() => {
    const updateLayout = () => {
      if (!containerRef.current) return;
      
      setIsResizing(true);
      
      // Determinar si es móvil o tablet basado en ancho de ventana
      const isMobileDevice = window.innerWidth < 768;
      const isTabletDevice = window.innerWidth >= 768 && window.innerWidth < 1200;
      setIsMobileOrTablet(isMobileDevice || isTabletDevice);
      
      // Establecer gap constante según tamaño de pantalla
      const newGap = isMobileDevice ? 0.3 : 0.5;
      setGap(newGap);
      
      // Obtener el ancho disponible
      const containerWidth = containerRef.current.offsetWidth;
      const gapInPx = newGap * 16; // Convertir rem a px (aproximado)
      
      // Determinar target de columnas según ancho
      let targetCols;
      if (window.innerWidth < 576) {
        targetCols = 2;
      } else if (window.innerWidth < 768) {
        targetCols = 3;
      } else if (window.innerWidth < 992) {
        targetCols = 4;
      } else if (window.innerWidth < 1200) {
        targetCols = 5;
      } else if (window.innerWidth < 1920) {
        targetCols = 6;
      } else {
        targetCols = 7;
      }
      
      // Verificar si el espacio es suficiente para el número target de columnas
      const availableWidthPerColumn = (containerWidth - (gapInPx * (targetCols - 1))) / targetCols;
      const minCardWidth = 200; // Mínimo ancho de tarjeta aceptable en px
      
      // Si el ancho disponible es menor que el mínimo, reducir columnas
      let finalCols = targetCols;
      if (availableWidthPerColumn < minCardWidth && targetCols > 2) {
        const maxPossibleCols = Math.floor((containerWidth + gapInPx) / (minCardWidth + gapInPx));
        finalCols = Math.max(2, maxPossibleCols); // Mínimo 2 columnas
      }
      
      if (finalCols !== columnCount) {
        setColumnCount(finalCols);
        nextCategoryColumnRef.current = 0; // Reset del índice de columna para categorías
      }
      
      setTimeout(() => {
        setIsResizing(false);
      }, 100);
    };
    
    updateLayout();
    
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      setIsResizing(true);
      resizeTimer = setTimeout(updateLayout, 150);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [columnCount]);
  
  // Obtener siguiente categoría de forma cíclica
  const getNextCategory = () => {
    if (usedCategoriesRef.current.length >= allCategories.length) {
      usedCategoriesRef.current = [];
    }
    
    let category;
    if (categoryIndexRef.current < allCategories.length) {
      category = allCategories[categoryIndexRef.current];
      categoryIndexRef.current = (categoryIndexRef.current + 1) % allCategories.length;
    } else {
      categoryIndexRef.current = 0;
      category = allCategories[0];
    }
    
    if (usedCategoriesRef.current.includes(category)) {
      for (let i = 0; i < allCategories.length; i++) {
        const candidate = allCategories[i];
        if (!usedCategoriesRef.current.includes(candidate)) {
          category = candidate;
          break;
        }
      }
    }
    
    usedCategoriesRef.current.push(category);
    return category;
  };
  
  // Generar URL de imagen
  const getRandomImageUrl = (width, height, id) => {
    const seed = parseInt(id.split('-')[1]) % 1000;
    return `https://picsum.photos/seed/${seed}/${width}/${height}`;
  };
  
  // Generar URL de imagen detalle
  const getDetailImageUrl = (id) => {
    const seed = parseInt(id.split('-')[1]) % 1000;
    return `https://picsum.photos/seed/${seed}/800/1422`; // Proporción 9:16 para ProductDetail
  };
  
  // Generar URL de imagen de baja resolución
  const getLowResImageUrl = (id) => {
    const seed = parseInt(id.split('-')[1]) % 1000;
    return `https://picsum.photos/seed/${seed}/50/50?blur=1`;
  };
  
  // Guardar imagen precargada en sessionStorage
  const savePreloadedImage = (id, url) => {
    try {
      sessionStorage.setItem(`preload_${id}`, url);
    } catch (e) {
      // Ignorar errores de sessionStorage
    }
  };
  
  // Precargar solo las imágenes visibles
  const setupVisibleRowsObserver = () => {
    if (visibleRowsObserver.current) {
      visibleRowsObserver.current.disconnect();
    }
    
    const cards = document.querySelectorAll('.grid-card');
    if (!cards.length) return;
    
    visibleRowsObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cardId = entry.target.dataset.cardId;
            const card = findCardById(cardId);
            
            if (card && !card.isCategory && card.imageUrl && !loadedImages[cardId]) {
              // Cargar la imagen cuando está visible
              preloadImage(card.imageUrl, cardId, true);
            }
          }
        });
      },
      {
        rootMargin: '200px', // Precarga cuando está a 200px de distancia
        threshold: 0.01
      }
    );
    
    // Observar cada tarjeta
    cards.forEach(card => {
      visibleRowsObserver.current.observe(card);
    });
  };
  
  // Precargar una imagen
  const preloadImage = (imageUrl, id, priority = false) => {
    if (loadedImages[id] || imageCache.current[imageUrl]) {
      if (imageCache.current[imageUrl] === true) {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
      }
      return;
    }
    
    imageCache.current[imageUrl] = false;
    
    const img = new Image();
    if (priority) {
      img.fetchPriority = "high";
    }
    
    img.onload = () => {
      imageCache.current[imageUrl] = true;
      setLoadedImages(prev => ({ ...prev, [id]: true }));
    };
    img.onerror = () => {
      delete imageCache.current[imageUrl];
    };
    img.src = imageUrl;
  };
  
  // Configurar observador para tarjetas cuando se renderiza
  useEffect(() => {
    // Configurar observadores después de que el DOM se actualice
    setTimeout(() => {
      setupVisibleRowsObserver();
    }, 100);
    
    return () => {
      if (visibleRowsObserver.current) {
        visibleRowsObserver.current.disconnect();
      }
    };
  }, [columnData]);
  
  // Precargar imagen de detalle al hacer hover
  useEffect(() => {
    if (hoveredCard && !preloadedDetails[hoveredCard]) {
      const card = findCardById(hoveredCard);
      
      if (card && !card.isCategory) {
        const detailUrl = getDetailImageUrl(card.id);
        
        // Precargar la imagen de detalle
        const img = new Image();
        img.fetchPriority = "high";
        img.onload = () => {
          savePreloadedImage(card.id, detailUrl);
        };
        img.src = detailUrl;
        
        // Precargar versión de baja resolución
        const lowResUrl = `https://picsum.photos/seed/${parseInt(card.id.split('-')[1]) % 1000}/100/178?blur=1`;
        const lowResImg = new Image();
        lowResImg.src = lowResUrl;
        
        setPreloadedDetails(prev => ({ ...prev, [hoveredCard]: true }));
      }
    }
  }, [hoveredCard, preloadedDetails]);
  
  // Función auxiliar para encontrar una tarjeta por ID
  const findCardById = (id) => {
    for (const column of columnData) {
      const card = column.find(card => card.id === id);
      if (card) return card;
    }
    return null;
  };
  
  // Determinar cuántas categorías generar por lote
  const getCategoryCountForBatch = () => {
    if (scrollCounter.current < 1) {
      return 0; // Sin categorías en la primera pantalla
    }
    return scrollCounter.current % 2 === 0 ? 1 : 2;
  };
  
  // Generar tarjetas
  const generateCards = (cardsPerColumn, numColumns) => {
    const totalCards = cardsPerColumn * numColumns;
    
    const categoryCount = getCategoryCountForBatch();
    const normalCards = totalCards - categoryCount;
    const largeCards = Math.floor(normalCards * 0.7);
    const mediumCards = normalCards - largeCards;
    
    const allSizes = [
      ...Array(largeCards).fill(100),
      ...Array(mediumCards).fill(75)
    ];
    
    if (categoryCount > 0) {
      allSizes.push(...Array(categoryCount).fill(25));
    }
    
    // Mezclar tamaños
    const shuffled = [...allSizes];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Crear tarjetas
    const cards = shuffled.map(size => {
      const id = `card-${idCounter.current++}`;
      const isCategory = size === 25;
      
      const imageUrl = isCategory ? null : getRandomImageUrl(500, 500, id);
      const lowResUrl = isCategory ? null : getLowResImageUrl(id);
      
      return {
        id,
        value: size,
        isCategory,
        categoryName: isCategory ? getNextCategory() : null,
        imageUrl,
        lowResUrl,
        targetColumn: isCategory ? nextCategoryColumnRef.current++ % columnCount : null
      };
    });
    
    return cards;
  };
  
  // Distribuir tarjetas en columnas
  const distributeCards = (cards) => {
    if (cards.length === 0 || columnCount === 0) return [];
    
    const columns = Array(columnCount).fill().map(() => []);
    
    // Primero distribuir categorías en sus columnas objetivo
    const categories = cards.filter(card => card.isCategory);
    const nonCategories = cards.filter(card => !card.isCategory);
    
    categories.forEach(card => {
      const colIndex = card.targetColumn !== null ? card.targetColumn % columnCount : Math.floor(Math.random() * columnCount);
      columns[colIndex].push(card);
    });
    
    // Distribuir resto de tarjetas uniformemente
    nonCategories.forEach((card) => {
      let minColumn = 0;
      let minCount = columns[0].length;
      
      for (let i = 1; i < columnCount; i++) {
        if (columns[i].length < minCount) {
          minCount = columns[i].length;
          minColumn = i;
        }
      }
      
      columns[minColumn].push(card);
    });
    
    return columns;
  };
  
  // Restaurar posición de scroll
  const restoreScrollPosition = () => {
    if (scrollAnchorRef.current && scrollAnchorPositionRef.current) {
      const newRect = scrollAnchorRef.current.getBoundingClientRect();
      const deltaY = newRect.top - scrollAnchorPositionRef.current.top;
      
      if (Math.abs(deltaY) > 2) {
        window.scrollBy(0, deltaY);
      }
      
      scrollAnchorPositionRef.current = null;
    }
  };
  
  // Capturar posición de scroll
  const captureScrollPosition = () => {
    if (scrollAnchorRef.current) {
      const rect = scrollAnchorRef.current.getBoundingClientRect();
      scrollAnchorPositionRef.current = {
        top: rect.top,
        left: rect.left
      };
    }
  };
  
  // Cargar más tarjetas
  const loadMoreCards = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    scrollCounter.current += 1;
    
    captureScrollPosition();
    
    // Generar más tarjetas
    const newCards = generateCards(columnCount * 6, 1);
    
    // Distribuir nuevas tarjetas
    setColumnData(prevColumns => {
      if (prevColumns.length === 0) {
        return distributeCards(newCards);
      }

      const updatedColumns = [...prevColumns.map(col => [...col])]; // Copia profunda

      // Primero distribuir categorías
      const categories = newCards.filter(card => card.isCategory);
      const nonCategories = newCards.filter(card => !card.isCategory);
      
      categories.forEach(card => {
        const colIndex = card.targetColumn !== null ? card.targetColumn % columnCount : Math.floor(Math.random() * columnCount);
        updatedColumns[colIndex].push(card);
      });
      
      // Distribuir resto de tarjetas uniformemente
      nonCategories.forEach((card) => {
        let minColumn = 0;
        let minCount = updatedColumns[0].length;
        
        for (let i = 1; i < columnCount; i++) {
          if (updatedColumns[i].length < minCount) {
            minCount = updatedColumns[i].length;
            minColumn = i;
          }
        }
        
        updatedColumns[minColumn].push(card);
      });
      
      return updatedColumns;
    });
    
    setTimeout(() => {
      setIsLoading(false);
    }, 10);
  };
  
  // Mantener scroll después de renderizado
  useLayoutEffect(() => {
    restoreScrollPosition();
  }, [columnData]);
  
  // Verificar si se necesita cargar más contenido
  const checkContentHeight = () => {
    if (isLoading) return;
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // Cargar más cuando esté a varias pantallas de distancia del final
    if (documentHeight - (scrollTop + windowHeight) < windowHeight * PRELOAD_AHEAD) {
      loadMoreCards();
    }
  };
  
  // Obtener elemento de anclaje
  const getScrollAnchorItem = (columnIndex) => {
    if (!columnData[columnIndex] || columnData[columnIndex].length === 0) return null;
    const visibleItems = Math.min(5, columnData[columnIndex].length);
    return Math.floor(visibleItems / 2);
  };
  
  // Inicializar y configurar carga infinita
  useEffect(() => {
    // Redistribuir tarjetas existentes cuando cambia el columnCount
    if (columnData.length > 0 && columnData.length !== columnCount) {
      captureScrollPosition();
      
      // Aplanar todas las tarjetas existentes
      const allCards = columnData.flatMap(column => column);
      // Redistribuir en el nuevo número de columnas
      setColumnData(distributeCards(allCards));
    } else if (columnData.length === 0) {
      // Cargar más tarjetas por columna inicialmente
      const initialCards = generateCards(15 * columnCount, 1);
      setColumnData(distributeCards(initialCards));
    }
    
    // Configurar observer para carga infinita
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMoreCards();
        }
      },
      { rootMargin: "1500px", threshold: 0.1 }
    );
    
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    
    // También usar scroll handler como respaldo
    let scrollTimer;
    const handleScrollCheck = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(checkContentHeight, 100);
    };
    
    window.addEventListener('scroll', handleScrollCheck, { passive: true });
    
    // Verificar si se necesita más contenido después de carga inicial
    setTimeout(checkContentHeight, 100);
    setTimeout(checkContentHeight, 1000);
    
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
      window.removeEventListener('scroll', handleScrollCheck);
      clearTimeout(scrollTimer);
      
      if (visibleRowsObserver.current) {
        visibleRowsObserver.current.disconnect();
      }
    };
  }, [columnCount, loadedImages]);
  
  // Calcular ancho de columna
  const getColumnWidth = () => {
    if (!containerRef.current) return 240;
    const containerWidth = containerRef.current.offsetWidth;
    const gapInPx = gap * 16; // Convertir rem a px (aproximado)
    return Math.floor((containerWidth - (gapInPx * (columnCount - 1))) / columnCount);
  };
  
  // Calcular altura basada en el tipo de tarjeta y el ancho de columna
  const getCardHeight = (cardValue) => {
    const columnWidth = getColumnWidth();
    let largeHeight = columnWidth * ASPECT_RATIO; // Formato 9:16 exacto
    
    if (cardValue === 100) {
      return largeHeight;
    }
    if (cardValue === 75) {
      return largeHeight * 0.75;
    }
    return largeHeight * 0.15; // Categoría - 15% de la altura grande
  };
  
  // Manejar carga de imágenes
  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };
  
  // Manejar clic en categoría
  const handleCategoryClick = (categoryName) => {
    console.log(`Categoría seleccionada: ${categoryName}`);
  };
  
  // Manejar clic en botón de like
  const handleLike = (cardId, e) => {
    e.stopPropagation();
    setLikedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };
  
  // Manejar clic en tarjeta para redirigir al detalle
  const handleCardClick = (card) => {
    if (card.isCategory) return;
    
    // Precargar la imagen inmediatamente antes de navegar
    const detailUrl = getDetailImageUrl(card.id);
    const lowResUrl = `https://picsum.photos/seed/${parseInt(card.id.split('-')[1]) % 1000}/100/178?blur=1`;
    
    // Guardar en sessionStorage para recuperarla en ProductDetail
    savePreloadedImage(card.id, detailUrl);
    
    // Precargar la imagen antes de navegar
    const img = new Image();
    img.src = detailUrl;
    
    // Precargar la versión de baja resolución
    const lowResImg = new Image();
    lowResImg.src = lowResUrl;
    
    // Navegar a la página de detalle
    requestAnimationFrame(() => {
      window.location.href = `/product/${card.id}`;
    });
  };
  
  // Estilos CSS en línea
  const styles = {
    container: {
      width: '100%',
      padding: '0.4rem'
    },
    grid: {
      display: 'grid'
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      gap: `${gap}rem`
    },
    categoryCard: {
      backgroundColor: '#3b82f6',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      transition: 'transform 0.2s, background-color 0.2s',
      overflow: 'hidden'
    },
    categoryCardHover: {
      backgroundColor: '#2563eb',
      transform: 'translateY(-2px)'
    },
    categoryText: {
      color: '#ffffff',
      fontWeight: 600,
      textAlign: 'center',
      padding: '0 1rem',
      fontSize: '0.95rem'
    },
    card: {
      position: 'relative',
      backgroundColor: '#f3f4f6',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      cursor: 'pointer'
    },
    cardOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      zIndex: 2
    },
    cardImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      display: 'block',
      transition: 'opacity 0.3s ease',
      zIndex: 1
    },
    lowResImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'blur(5px)',
      opacity: 0.7,
      transition: 'opacity 0.3s ease'
    },
    observer: {
      height: '20px',
      width: '100%',
      marginTop: '1rem',
      backgroundColor: 'transparent'
    },
    loadingIndicator: {
      textAlign: 'center',
      padding: '1rem 0',
      color: '#6b7280'
    },
    likeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  };
  
  // Estilos CSS para animaciones
  useEffect(() => {
    // Añadir estilos para la animación del corazón
    const styleElement = document.createElement('style');
    styleElement.textContent = `
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
  
  return (
    <div style={styles.container} ref={containerRef}>
      <div 
        style={{
          ...styles.grid,
          gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
          gap: `${gap}rem`
        }}
      >
        {columnData.map((column, colIndex) => (
          <div key={`col-${colIndex}`} style={styles.column}>
            {column.map((card, itemIndex) => {
              // Calcular altura según tipo
              const cardHeight = getCardHeight(card.value);
              
              // Tarjeta de categoría
              if (card.isCategory) {
                return (
                  <div 
                    key={card.id}
                    style={{
                      ...styles.categoryCard,
                      height: `${cardHeight}px`
                    }}
                    onClick={() => handleCategoryClick(card.categoryName)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = styles.categoryCardHover.backgroundColor;
                      e.currentTarget.style.transform = styles.categoryCardHover.transform;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = styles.categoryCard.backgroundColor;
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span style={styles.categoryText}>{card.categoryName}</span>
                  </div>
                );
              }
              
              const isLoaded = loadedImages[card.id];
              const isLiked = likedCards[card.id] || false;
              const isHovered = hoveredCard === card.id;
              
              // Mostrar botón siempre visible en móvil/tablet o cuando está hover/likeado
              const showLikeButton = isMobileOrTablet || isLiked || isHovered;
              
              return (
                <div
                  key={card.id}
                  className="grid-card"
                  data-card-id={card.id}
                  ref={colIndex === 1 && itemIndex === getScrollAnchorItem(colIndex) ? scrollAnchorRef : null}
                  style={{
                    ...styles.card,
                    height: `${cardHeight}px`
                  }}
                  onClick={() => handleCardClick(card)}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Botón de like */}
                  <div 
                    style={{
                      ...styles.likeButton,
                      backgroundColor: isLiked ? 'rgba(244, 63, 94, 0.9)' : 'rgba(0, 0, 0, 0.5)',
                      opacity: showLikeButton ? 1 : 0
                    }}
                    onClick={(e) => handleLike(card.id, e)}
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
                  
                  {/* Overlay para efecto hover */}
                  <div 
                    className="card-overlay" 
                    style={{
                      ...styles.cardOverlay,
                      opacity: isHovered ? 1 : 0
                    }}
                  ></div>
                  
                  {/* Imagen de baja resolución mientras carga */}
                  {!isLoaded && card.lowResUrl && (
                    <img 
                      src={card.lowResUrl}
                      alt=""
                      style={styles.lowResImage}
                    />
                  )}
                  
                  {/* Imagen principal */}
                  <img 
                    src={card.imageUrl}
                    alt=""
                    className="card-image"
                    style={isLoaded ? styles.cardImage : { ...styles.cardImage, opacity: 0 }}
                    onLoad={() => handleImageLoad(card.id)}
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      <div ref={observerRef} style={styles.observer}></div>
      
      {isLoading && (
        <div style={styles.loadingIndicator}>
          Cargando más contenido...
        </div>
      )}
    </div>
  );
};

export default Grid;