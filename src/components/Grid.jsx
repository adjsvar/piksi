import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import products from '../db/products';

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
  const [cards, setCards] = useState([]);
  
  // Constantes
  const [gap, setGap] = useState(0.5);
  const ASPECT_RATIO = 16/9;
  const PRELOAD_AHEAD = 10; // Aumentado de 5 a 10 para precargar más elementos
  
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
  const usedProductsRef = useRef(new Set()); // Mantener registro de productos ya usados como strings
  const nextBatchRef = useRef([]);
  const preloadObserverRef = useRef(null);
  const preloadTriggerRef = useRef(null);
  const isPreloadingRef = useRef(false);
  
  // Lista de categorías únicas de los productos
  const allCategories = [...new Set(products.map(product => product.category))];
  
  // Reiniciar productos usados cuando cambia la cantidad de productos
  useEffect(() => {
    // Si los productos cambian, reiniciar el Set
    usedProductsRef.current = new Set();
    console.log("Set de productos usados reiniciado");
  }, [products.length]);
  
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
  
  // Función para obtener un producto no usado o cualquiera si todos han sido usados
  const getNextProduct = () => {
    // Si no hay productos, no podemos continuar
    if (!products || products.length === 0) {
      console.error("No hay productos disponibles");
      return null;
    }
    
    // Si todos los productos han sido usados, reiniciar el set
    if (usedProductsRef.current.size >= products.length) {
      console.log("Todos los productos han sido usados, reiniciando");
      usedProductsRef.current = new Set();
    }
    
    // Obtener los IDs de productos que aún no han sido usados
    const unusedProducts = products.filter(product => 
      !usedProductsRef.current.has(product.id.toString())
    );
    
    let selectedProduct;
    
    if (unusedProducts.length > 0) {
      // Seleccionar un producto aleatorio entre los no usados
      const randomIndex = Math.floor(Math.random() * unusedProducts.length);
      selectedProduct = unusedProducts[randomIndex];
      
      // Marcar como usado (convertir a string para asegurar consistencia)
      usedProductsRef.current.add(selectedProduct.id.toString());
      
      console.log(`Producto seleccionado: ${selectedProduct.id} - ${selectedProduct.title}`);
    } else {
      // Esto no debería ocurrir, pero por si acaso
      const randomIndex = Math.floor(Math.random() * products.length);
      selectedProduct = products[randomIndex];
      console.warn("Fallback: seleccionando producto aleatorio", selectedProduct.id);
    }
    
    return selectedProduct;
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
  
  // Precargar proactivamente todas las imágenes al llegar al 65% del scroll
  const setupVisibleRowsObserver = () => {
    if (visibleRowsObserver.current) {
      visibleRowsObserver.current.disconnect();
    }

    // Precargar todas las imágenes actuales sin esperar a que sean visibles
    const preloadAllCurrentImages = () => {
      // Obtener todos los IDs de tarjetas actualmente renderizadas
      const allCards = [];
      columnData.forEach(column => {
        column.forEach(card => {
          if (!card.isCategory && card.imageUrl && !loadedImages[card.id]) {
            allCards.push(card);
          }
        });
      });
      
      // Precargar todas las imágenes de una vez
      allCards.forEach(card => {
        preloadImage(card.imageUrl, card.id, true);
      });
      
      console.log(`Precargando proactivamente ${allCards.length} imágenes`);
    };
    
    // Configurar listener para detectar el 65% del scroll
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      
      // Calcular porcentaje de scroll (0-100)
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      
      // Si estamos más allá del 65% del scroll, precargar todas las imágenes
      if (scrollPercentage > 65) {
        preloadAllCurrentImages();
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // También mantenemos el observador como respaldo, pero con margen mucho mayor
    const cards = document.querySelectorAll('.grid-card');
    if (!cards.length) return;
    
    visibleRowsObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cardId = entry.target.dataset.cardId;
            const card = findCardById(cardId);
            
            if (card && !card.isCategory && card.imageUrl && !loadedImages[cardId]) {
              // Cargar la imagen cuando está visible (como respaldo)
              preloadImage(card.imageUrl, cardId, true);
            }
          }
        });
      },
      {
        rootMargin: '500px', // Margen mucho mayor para precarga muy anticipada
        threshold: 0.01
      }
    );
    
    // Observar cada tarjeta como respaldo
    cards.forEach(card => {
      visibleRowsObserver.current.observe(card);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
  
  // ENFOQUE SIMPLIFICADO: Generar cards directamente a partir de los productos
  const generateCards = () => {
    // Limitamos a mostrar solo los productos disponibles (sin repeticiones)
    const maxProducts = Math.min(products.length, 70);
    const newCards = [];
    
    console.log("Generando tarjetas. Productos disponibles:", products.length);
    console.log("Max productos a mostrar:", maxProducts);
    
    // Crear un array de índices y mezclarlo para obtener productos aleatorios sin repetir
    const indices = Array.from({ length: products.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    // Crear una card para cada producto usando el índice aleatorio
    for (let i = 0; i < maxProducts; i++) {
      const productIndex = indices[i % indices.length]; // Uso módulo para evitar salirse del rango
      const product = products[productIndex];
      
      // Verificar que el producto tenga un ID válido
      if (!product || !product.id) {
        console.error("Producto sin ID válido:", product);
        continue;
      }
      
      // Generar un ID único para la card pero mantener asociación con el producto real
      const id = `card-${idCounter.current++}`;
      
      // 70% grandes, 30% medianas
      const isLarge = Math.random() < 0.7;
      
      newCards.push({
        id,
        value: isLarge ? 100 : 75,
        isCategory: false,
        productId: product.id.toString(), // Asegurar que sea string
        title: product.title || "",
        description: product.description || "",
        rating: product.rating || "",
        reviewCount: product.reviewCount || "",
        category: product.category || "",
        // Generar URLs de imágenes basadas en el id de la card
        imageUrl: getRandomImageUrl(500, 500, id),
        lowResUrl: getLowResImageUrl(id)
      });
    }
    
    console.log("Nuevas tarjetas generadas:", newCards.length);
    return newCards;
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

  // Calcular posición para el trigger de precarga (65% del scroll)
  const calculatePreloadTriggerPosition = () => {
    // Crear elemento para detectar precarga al 65% de la página
    const preloadTrigger = document.createElement('div');
    preloadTrigger.id = 'preload-trigger';
    preloadTrigger.style.position = 'absolute';
    preloadTrigger.style.width = '100%';
    preloadTrigger.style.height = '10px';
    preloadTrigger.style.background = 'transparent';
    preloadTrigger.style.pointerEvents = 'none';
    
    // Insertar en el DOM y posicionar
    document.body.appendChild(preloadTrigger);
    
    // Posicionar al 65% del scroll
    const updatePosition = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      // Calcular posición al 65% entre la posición actual y el final del documento
      const scrollBottom = window.scrollY + viewportHeight;
      const remainingScroll = scrollHeight - scrollBottom;
      const triggerPosition = scrollBottom + (remainingScroll * 0.65);
      
      preloadTrigger.style.top = `${triggerPosition}px`;
    };
    
    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    
    return preloadTrigger;
  };
  
  // Inicializar y configurar carga
  useEffect(() => {
    // Generar 70 productos iniciales
    const initialCards = generateCards();
    setCards(initialCards);
    
    // Una vez que las cards iniciales están listas, comenzar a precargar el siguiente lote
    setTimeout(() => {
      preloadNextBatch(initialCards);
    }, 1000);
    
    // Elemento para detectar el 65% del scroll
    const preloadTrigger = calculatePreloadTriggerPosition();
    preloadTriggerRef.current = preloadTrigger;
    
    // Configurar observador para el trigger de precarga al 65%
    setupPreloadObserver();
    
    // Manejar scroll para cargar nuevas cards al 65% y también al final como respaldo
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      
      // Calcular porcentaje de scroll (0-100)
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      
      // Si alcanzamos el 65% del scroll y tenemos cards precargadas, cargarlas
      if (scrollPercentage > 65 && nextBatchRef.current && nextBatchRef.current.length > 0) {
        console.log("Alcanzado 65% del scroll, añadiendo nuevas cards proactivamente");
        const precachedCards = nextBatchRef.current;
        nextBatchRef.current = []; // Limpiar para la próxima precarga
        
        setCards(prevCards => [...prevCards, ...precachedCards]);
        
        // Comenzar a precargar el siguiente lote inmediatamente
        setTimeout(() => {
          preloadNextBatch([...cards, ...precachedCards]);
        }, 500);
        
        // No ejecutar el código siguiente para evitar doble carga
        return;
      }
      
      // Como respaldo, también cargar al llegar casi al final
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 250) {
        // Si tenemos cards precargadas, usarlas
        if (nextBatchRef.current && nextBatchRef.current.length > 0) {
          console.log("Usando lote precargado de cards (respaldo final de scroll)");
          const precachedCards = nextBatchRef.current;
          nextBatchRef.current = []; // Limpiar para la próxima precarga
          
          setCards(prevCards => [...prevCards, ...precachedCards]);
          
          // Comenzar a precargar el siguiente lote
          setTimeout(() => {
            preloadNextBatch([...cards, ...precachedCards]);
          }, 500);
        } else {
          // Fallback: generar nuevas cards si no hay precargadas
          console.log("No hay cards precargadas, generando nuevas (respaldo)");
          const newCards = generateCards();
          setCards(prevCards => [...prevCards, ...newCards]);
          
          // Comenzar a precargar el siguiente lote
          setTimeout(() => {
            preloadNextBatch([...cards, ...newCards]);
          }, 500);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (preloadTrigger && preloadTrigger.parentNode) {
        preloadTrigger.parentNode.removeChild(preloadTrigger);
      }
      if (preloadObserverRef.current) {
        preloadObserverRef.current.disconnect();
      }
    };
  }, []);
  
  // Actualizar columnData cuando cambian las cards
  useEffect(() => {
    if (cards.length > 0) {
      setColumnData(distributeCards(cards));
    }
  }, [cards, columnCount]);
  
  // Mantener scroll después de renderizado
  useLayoutEffect(() => {
    restoreScrollPosition();
  }, [columnData]);
  
  // Obtener elemento de anclaje
  const getScrollAnchorItem = (columnIndex) => {
    if (!columnData[columnIndex] || columnData[columnIndex].length === 0) return null;
    const visibleItems = Math.min(5, columnData[columnIndex].length);
    return Math.floor(visibleItems / 2);
  };
  
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
    
    // Usar directamente el ID del producto para la navegación
    const productId = card.productId;
    
    console.log("Navegando al producto:", productId, card.title);
    
    // Navegar directamente a la URL del ID del producto sin el prefijo "/product/"
    // Usar window.location.href para asegurar una recarga completa
    window.location.href = `/${productId}`;
  };
  
  // Precargar imágenes de las próximas cards
  const preloadNextBatch = (currentCards) => {
    if (!currentCards || currentCards.length === 0 || isPreloadingRef.current) return;
    
    isPreloadingRef.current = true;
    console.log("Precargando próximo lote de imágenes proactivamente...");
    
    // Generar el próximo lote de cards pero no añadirlo al estado todavía
    const nextCards = generateCards();
    
    // Precargar sus imágenes en segundo plano con alta prioridad
    // Usamos Promise.all para hacer un seguimiento de cuándo se han cargado
    const preloadPromises = [];
    
    nextCards.forEach(card => {
      if (!card.isCategory && card.imageUrl) {
        // Crear una promesa para cada imagen
        const promise = new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            imageCache.current[card.imageUrl] = true;
            setLoadedImages(prev => ({ ...prev, [card.id]: true }));
            resolve();
          };
          img.onerror = () => {
            delete imageCache.current[card.imageUrl];
            resolve();
          };
          img.src = card.imageUrl;
          img.fetchPriority = "high"; // Dar alta prioridad
        });
        
        preloadPromises.push(promise);
      }
    });
    
    // Almacenar las próximas cards precargadas para usarlas después
    nextBatchRef.current = nextCards;
    console.log(`${nextCards.length} imágenes puestas en cola para precarga proactiva`);
    
    // Resolver la bandera de precarga cuando la mayoría de las imágenes se hayan cargado
    // o después de un tiempo máximo, lo que ocurra primero
    Promise.race([
      // Cuando al menos el 70% de las imágenes se hayan cargado
      Promise.all(preloadPromises.slice(0, Math.floor(preloadPromises.length * 0.7))),
      // O después de 3 segundos como máximo
      new Promise(resolve => setTimeout(resolve, 3000))
    ]).then(() => {
      isPreloadingRef.current = false;
      console.log("Precarga proactiva completada");
    });
  };
  
  // Configurar precarga basada en scroll al 65%
  const setupPreloadObserver = () => {
    if (preloadObserverRef.current) {
      preloadObserverRef.current.disconnect();
    }
    
    // Función de manejo de scroll para iniciar precarga al 65%
    const handleScrollForPreload = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      
      // Calcular porcentaje de scroll (0-100)
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      
      // Si estamos más allá del 65% del scroll, iniciar precarga del próximo lote
      if (scrollPercentage > 65 && !isPreloadingRef.current) {
        console.log("Punto de precarga al 65% alcanzado, iniciando precarga proactiva");
        
        // Si no hay un lote precargado, generar uno nuevo
        if (!nextBatchRef.current || nextBatchRef.current.length === 0) {
          preloadNextBatch(cards);
        }
      }
    };
    
    // Agregamos el listener de scroll
    window.addEventListener('scroll', handleScrollForPreload, { passive: true });
    
    // Mantenemos el observer como respaldo por si el listener falla
    preloadObserverRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isPreloadingRef.current) {
          console.log("Zona de precarga alcanzada a través del observer (respaldo)");
          
          // Si no hay un lote precargado, generar uno nuevo
          if (!nextBatchRef.current || nextBatchRef.current.length === 0) {
            preloadNextBatch(cards);
          }
        }
      },
      { 
        threshold: 0.1 
      }
    );
    
    if (preloadTriggerRef.current) {
      preloadObserverRef.current.observe(preloadTriggerRef.current);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScrollForPreload);
    };
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
      objectPosition: 'center',
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
  
  // Configurar observadores para visibilidad y precarga
  useEffect(() => {
    // Configurar observadores después de que el DOM se actualice
    setTimeout(() => {
      setupVisibleRowsObserver();
      setupPreloadObserver();
    }, 100);
    
    return () => {
      if (visibleRowsObserver.current) {
        visibleRowsObserver.current.disconnect();
      }
      if (preloadObserverRef.current) {
        preloadObserverRef.current.disconnect();
      }
    };
  }, [columnData]);
  
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
                  data-product-id={card.productId}
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
      
      {/* Elemento observador para iniciar scroll infinito */}
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