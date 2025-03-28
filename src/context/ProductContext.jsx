import { createContext, useState, useContext, useCallback, useEffect, useMemo } from 'react'
import productsData from '../data/products'

const ProductContext = createContext()

export function useProducts() {
  return useContext(ProductContext)
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(productsData)
  const [filteredProducts, setFilteredProducts] = useState([...productsData])
  const [showFavorites, setShowFavorites] = useState(false)
  const [currentCollection, setCurrentCollection] = useState('todos')
  const [similarProducts, setSimilarProducts] = useState([])
  const [searchActive, setSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Cache para productos relacionados para mejorar rendimiento
  const relatedProductsCache = new Map()

  // Aplicar filtro inicial con 'todos' seleccionado
  useEffect(() => {
    console.log("Inicializando productos...");
    setFilteredProducts([...products])
    setCurrentCollection('todos')
  }, [])

  // Aplicar filtro
  const applyFilter = useCallback((collection) => {
    console.log(`Aplicando filtro: ${collection}`)

    // Obtener productos filtrados por categoría
    let categoryFiltered = []
    
    if (collection === 'todos') {
      categoryFiltered = [...products]
    } else if (collection === 'tech') {
      categoryFiltered = products.filter(product => product.category === 'tecnologia')
    } else if (collection === 'cocina') {
      categoryFiltered = products.filter(product => product.category === 'cocina')
    } else if (collection === 'hogar') {
      categoryFiltered = products.filter(product => product.category === 'hogar')
    } else if (collection === 'fitness') {
      categoryFiltered = products.filter(product => product.category === 'fitness')
    } else if (collection === 'mascotas') {
      categoryFiltered = products.filter(product => product.category === 'mascotas')
    } else {
      categoryFiltered = [...products]
    }

    // Si hay búsqueda activa, aplicar filtro de búsqueda también
    if (searchActive && searchQuery.trim() !== '') {
      const lowercaseQuery = searchQuery.toLowerCase()
      categoryFiltered = categoryFiltered.filter(product => 
        product.title.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
      )
    }
    
    setFilteredProducts(categoryFiltered)
  }, [products, searchActive, searchQuery])

  // Toggle product "pik" status - optimizado con useCallback
  const toggleProductPik = useCallback((productId) => {
    setProducts(prevProducts => {
      return prevProducts.map(product => {
        if (product.id === productId) {
          return { ...product, piked: !product.piked }
        }
        return product
      })
    })

    setFilteredProducts(prevProducts => {
      return prevProducts.map(product => {
        if (product.id === productId) {
          return { ...product, piked: !product.piked }
        }
        return product
      })
    })
  }, [])

  // Get related products - optimizado con useCallback y caché
  const getRelatedProducts = useCallback((productId, count = 4) => {
    // Revisamos si tenemos resultados en caché
    const cacheKey = `${productId}-${count}`
    if (relatedProductsCache.has(cacheKey)) {
      return relatedProductsCache.get(cacheKey)
    }
    
    const currentProduct = products.find(p => p.id === productId)
    
    // Si no hay productos o es inválido, retornamos arreglo vacío
    if (!currentProduct || !Array.isArray(products) || products.length === 0) {
      return []
    }
    
    // Limitamos count para evitar problemas de rendimiento
    const safeCount = Math.min(count, 12)
    
    // Algoritmo simplificado para mejorar rendimiento
    let result = []
    
    // 1. Primero buscamos productos de la misma categoría
    const sameCategory = products.filter(p => 
      p.id !== productId && p.category === currentProduct.category
    )
    
    // 2. Luego productos de otras categorías
    const otherProducts = products.filter(p => 
      p.id !== productId && p.category !== currentProduct.category
    )
    
    // Mezclamos los resultados, priorizando misma categoría
    const maxSameCategory = Math.min(Math.ceil(safeCount * 0.6), sameCategory.length)
    
    if (maxSameCategory > 0) {
      result = sameCategory
        .sort(() => 0.5 - Math.random())
        .slice(0, maxSameCategory)
    }
    
    // Completamos con productos aleatorios
    const remaining = safeCount - result.length
    if (remaining > 0 && otherProducts.length > 0) {
      const randomOthers = otherProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, remaining)
      
      result = [...result, ...randomOthers]
    }
    
    // Completamos con duplicados si es necesario pero con IDs diferentes
    if (result.length < safeCount) {
      const neededDuplicates = safeCount - result.length
      
      // Creamos copias con IDs modificados
      for (let i = 0; i < neededDuplicates; i++) {
        const originalIndex = i % products.length
        const duplicate = {
          ...products[originalIndex],
          id: products[originalIndex].id + 1000 + i
        }
        result.push(duplicate)
      }
    }
    
    // Guardamos en caché
    relatedProductsCache.set(cacheKey, result)
    
    return result
  }, [products])

  // Toggle mostrar favoritos
  const toggleShowFavorites = useCallback(() => {
    setShowFavorites(prev => {
      const newValue = !prev;
      
      if (newValue) {
        // Mostrar favoritos
        const favorites = products.filter(product => product.piked);
        setFilteredProducts(favorites);
        
        // Al activar favoritos, desactivar búsqueda
        setSearchActive(false);
        setSearchQuery("");
        
        // Generar recomendaciones si hay favoritos
        if (favorites.length > 0) {
          const allSimilar = [];
          favorites.forEach(fav => {
            const similar = getRelatedProducts(fav.id, 4);
            allSimilar.push(...similar);
          });
          
          // Eliminar duplicados y favoritos
          const uniqueSimilar = allSimilar.filter((product, index, self) => {
            const uniqueIndex = self.findIndex(p => p.id === product.id);
            const isFavorite = favorites.some(fav => fav.id === product.id);
            return index === uniqueIndex && !isFavorite;
          });
          
          setSimilarProducts(uniqueSimilar.slice(0, 12));
        } else {
          setSimilarProducts([]);
        }
      } else {
        // Mostrar productos normales según colección
        applyFilter(currentCollection);
        setSimilarProducts([]);
      }
      
      return newValue;
    });
  }, [currentCollection, products, getRelatedProducts, applyFilter]);

  // Establecer showFavorites directamente con manejo de estado
  const setShowFavoritesWithState = useCallback((value) => {
    setShowFavorites(value);
    
    if (value) {
      // Mostrar favoritos
      const favorites = products.filter(product => product.piked);
      setFilteredProducts(favorites);
      
      // Al activar favoritos, desactivar búsqueda
      setSearchActive(false);
      setSearchQuery("");
    } else {
      // Mostrar productos normales según colección
      applyFilter(currentCollection);
      setSimilarProducts([]);
    }
  }, [products, currentCollection, applyFilter]);

  // Filter products by collection - optimizado con useCallback
  const filterByCollection = useCallback((collection) => {
    console.log("filterByCollection llamado con:", collection);
    
    // Actualizar colección actual siempre
    setCurrentCollection(collection);
    
    // Si estamos en favoritos y cambiamos categoría, desactivar favoritos
    if (showFavorites) {
      setShowFavorites(false);
    }
    
    // Limpiar caché de productos relacionados al cambiar colección
    relatedProductsCache.clear();
    
    // Aplicar filtro manteniendo el estado de búsqueda
    applyFilter(collection);
  }, [showFavorites, applyFilter]);

  // Función para establecer productos filtrados y marcar búsqueda como activa
  const setFilteredProductsAndSearch = useCallback((filtered, query = "") => {
    setFilteredProducts(filtered);
    setSearchActive(filtered.length !== products.length);
    setSearchQuery(query);
    
    // Reaplica el filtro de categoría si hay búsqueda activa
    if (query.trim() !== '') {
      applyFilter(currentCollection);
    }
  }, [products.length, currentCollection, applyFilter]);

  // Función para resetear búsqueda
  const resetSearch = useCallback(() => {
    setSearchActive(false);
    setSearchQuery("");
    
    if (showFavorites) {
      // Si estamos en favoritos, mostrar favoritos
      const favorites = products.filter(product => product.piked);
      setFilteredProducts(favorites);
    } else {
      // Si no, mostrar productos según categoría
      applyFilter(currentCollection);
    }
  }, [currentCollection, applyFilter, products, showFavorites]);

  const value = {
    products,
    filteredProducts,
    similarProducts,
    showFavorites,
    currentCollection,
    searchActive,
    searchQuery,
    toggleProductPik,
    filterByCollection,
    getRelatedProducts,
    toggleShowFavorites,
    setFilteredProducts: setFilteredProductsAndSearch,
    resetSearch,
    setShowFavorites: setShowFavoritesWithState
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}