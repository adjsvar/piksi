import { createContext, useState, useContext, useCallback } from 'react'
import productsData from '../data/products'

const ProductContext = createContext()

export function useProducts() {
  return useContext(ProductContext)
}

export function ProductProvider({ children }) {
  // Estado principal
  const [products, setProducts] = useState(productsData)
  const [filteredProducts, setFilteredProducts] = useState([...productsData])
  const [showFavorites, setShowFavorites] = useState(false)
  const [currentCollection, setCurrentCollection] = useState('todos')
  const [similarProducts, setSimilarProducts] = useState([])
  const [searchActive, setSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Cache para productos relacionados para mejorar rendimiento
  const relatedProductsCache = new Map()

  /**
   * Filtra los productos según la categoría o colección
   * Esta es la ÚNICA función que debe modificar filteredProducts basado en colección
   */
  const filterByCollection = useCallback((collection) => {
    console.log("filterByCollection llamado con:", collection)
    
    // Actualizar colección actual
    setCurrentCollection(collection)
    
    // Limpiar caché de productos relacionados al cambiar colección
    relatedProductsCache.clear()

    // Desactivar favoritos si estaban activos
    if (showFavorites) {
      setShowFavorites(false)
    }

    // Filtrar productos según la colección
    let filteredResults = []
    
    if (collection === 'todos') {
      filteredResults = [...products]
    } else if (collection === 'trending') {
      filteredResults = products.filter(product => product.trending === true)
    } else if (collection === 'para-ti') {
      // Para ti - productos con rating alto
      filteredResults = products.filter(product => product.rating >= 4.6)
    } else if (collection === 'tech') {
      filteredResults = products.filter(product => product.category === 'tecnologia')
    } else if (collection === 'cocina') {
      filteredResults = products.filter(product => product.category === 'cocina')
    } else if (collection === 'hogar') {
      filteredResults = products.filter(product => product.category === 'hogar')
    } else if (collection === 'fitness') {
      filteredResults = products.filter(product => product.category === 'fitness')
    } else if (collection === 'mascotas') {
      filteredResults = products.filter(product => product.category === 'mascotas')
    } else {
      filteredResults = [...products]
    }

    // Aplicar filtro de búsqueda si está activo
    if (searchActive && searchQuery.trim() !== '') {
      const lowercaseQuery = searchQuery.toLowerCase()
      filteredResults = filteredResults.filter(product => 
        product.title.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
      )
    }
    
    // Actualizar productos filtrados
    setFilteredProducts(filteredResults)
  }, [products, searchActive, searchQuery, showFavorites])

  // Toggle product "pik" status (favorito)
  const toggleProductPik = useCallback((productId) => {
    // Actualizar el estado de "piked" en todos los productos
    setProducts(prevProducts => {
      return prevProducts.map(product => {
        if (product.id === productId) {
          return { ...product, piked: !product.piked }
        }
        return product
      })
    })

    // Actualizar también en los productos filtrados
    setFilteredProducts(prevProducts => {
      return prevProducts.map(product => {
        if (product.id === productId) {
          return { ...product, piked: !product.piked }
        }
        return product
      })
    })
  }, [])

  // Obtener productos relacionados
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
    
    // Guardamos en caché
    relatedProductsCache.set(cacheKey, result)
    
    return result
  }, [products])

  // Toggle mostrar favoritos
  const toggleShowFavorites = useCallback(() => {
    setShowFavorites(prev => {
      const newValue = !prev
      
      if (newValue) {
        // Mostrar favoritos
        const favorites = products.filter(product => product.piked)
        setFilteredProducts(favorites)
        
        // Al activar favoritos, desactivar búsqueda
        setSearchActive(false)
        setSearchQuery("")
        
        // Generar recomendaciones si hay favoritos
        if (favorites.length > 0) {
          const allSimilar = []
          favorites.forEach(fav => {
            const similar = getRelatedProducts(fav.id, 4)
            allSimilar.push(...similar)
          })
          
          // Eliminar duplicados y favoritos
          const uniqueSimilar = allSimilar.filter((product, index, self) => {
            const uniqueIndex = self.findIndex(p => p.id === product.id)
            const isFavorite = favorites.some(fav => fav.id === product.id)
            return index === uniqueIndex && !isFavorite
          })
          
          setSimilarProducts(uniqueSimilar.slice(0, 12))
        } else {
          setSimilarProducts([])
        }
      } else {
        // Mostrar productos normales según colección
        let filteredResults = []
        
        if (currentCollection === 'todos') {
          filteredResults = [...products]
        } else if (currentCollection === 'trending') {
          filteredResults = products.filter(product => product.trending === true)
        } else if (currentCollection === 'para-ti') {
          filteredResults = products.filter(product => product.rating >= 4.6)
        } else if (currentCollection === 'tech') {
          filteredResults = products.filter(product => product.category === 'tecnologia')
        } else if (currentCollection === 'cocina') {
          filteredResults = products.filter(product => product.category === 'cocina')
        } else if (currentCollection === 'hogar') {
          filteredResults = products.filter(product => product.category === 'hogar')
        } else if (currentCollection === 'fitness') {
          filteredResults = products.filter(product => product.category === 'fitness')
        } else if (currentCollection === 'mascotas') {
          filteredResults = products.filter(product => product.category === 'mascotas')
        } else {
          filteredResults = [...products]
        }
        
        setFilteredProducts(filteredResults)
        setSimilarProducts([])
      }
      
      return newValue
    })
  }, [currentCollection, products, getRelatedProducts])

  // Establecer showFavorites directamente
  const setShowFavoritesWithState = useCallback((value) => {
    setShowFavorites(value)
    
    if (value) {
      // Mostrar favoritos
      const favorites = products.filter(product => product.piked)
      setFilteredProducts(favorites)
      
      // Al activar favoritos, desactivar búsqueda
      setSearchActive(false)
      setSearchQuery("")
    } else {
      // Mostrar productos normales según la colección actual
      filterByCollection(currentCollection)
    }
  }, [products, currentCollection, filterByCollection])

  // Función para establecer productos filtrados por búsqueda
  const setFilteredProductsAndSearch = useCallback((filtered, query = "") => {
    setFilteredProducts(filtered)
    setSearchActive(filtered.length !== products.length)
    setSearchQuery(query)
  }, [products.length])

  // Función para resetear búsqueda
  const resetSearch = useCallback(() => {
    setSearchActive(false)
    setSearchQuery("")
    
    if (showFavorites) {
      // Si estamos en favoritos, mostrar favoritos
      const favorites = products.filter(product => product.piked)
      setFilteredProducts(favorites)
    } else {
      // Si no, mostrar productos según la colección actual
      filterByCollection(currentCollection)
    }
  }, [currentCollection, filterByCollection, products, showFavorites])

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