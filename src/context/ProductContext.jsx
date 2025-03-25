import { createContext, useState, useContext } from 'react'
import productsData from '../data/products'

const ProductContext = createContext()

export function useProducts() {
  return useContext(ProductContext)
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(productsData)
  const [filteredProducts, setFilteredProducts] = useState([...productsData])

  // Toggle product "pik" status
  const toggleProductPik = (productId) => {
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
  }

  // Filter products by collection
  const filterByCollection = (collection) => {
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
  }

  // Get related products
  const getRelatedProducts = (productId, count = 4) => {
    const otherProducts = products.filter(p => p.id !== productId)
    return [...otherProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, count)
  }

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