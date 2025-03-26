import { createContext, useState, useContext, useCallback } from 'react'
import productsData from '../data/products'

const ProductContext = createContext()

export function useProducts() {
  return useContext(ProductContext)
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(productsData)
  const [filteredProducts, setFilteredProducts] = useState([...productsData])
  
  // Cache para productos relacionados para mejorar rendimiento
  const relatedProductsCache = new Map()

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

  // Filter products by collection - optimizado con useCallback
  const filterByCollection = useCallback((collection) => {
    // Limpiar caché de productos relacionados al cambiar colección
    relatedProductsCache.clear()
    
    if (collection === 'todos') {
      setFilteredProducts([...products])
    } else if (collection === 'tech') {
      setFilteredProducts(products.filter(product => product.category === 'tecnologia'))
    } else if (collection === 'cocina') {
      setFilteredProducts(products.filter(product => product.category === 'cocina'))
    } else if (collection === 'hogar') {
      setFilteredProducts(products.filter(product => product.category === 'hogar'))
    } else if (collection === 'fitness') {
      setFilteredProducts(products.filter(product => product.category === 'fitness'))
    } else if (collection === 'ofertas') {
      setFilteredProducts(products.filter(product => parseFloat(product.discount) >= 20))
    } else {
      setFilteredProducts([...products])
    }
  }, [products])

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

  const value = {
    products,
    filteredProducts,
    toggleProductPik,
    filterByCollection,
    getRelatedProducts
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}