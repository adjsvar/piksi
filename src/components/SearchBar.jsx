import { useState, useEffect } from 'react'
import { useProducts } from '../context/ProductContext'
import '../styles/SearchBar.css'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { products, setFilteredProducts, currentCollection } = useProducts()

  // Realizar búsqueda en tiempo real
  useEffect(() => {
    if (searchQuery.trim() === '') {
      // No hay término de búsqueda, no aplicamos filtro adicional
      return
    }

    // Filtrar productos según término de búsqueda
    const lowercaseQuery = searchQuery.toLowerCase()
    
    // Primero filtramos por la categoría actual
    let baseProducts = products
    if (currentCollection !== 'todos') {
      let categoryName = currentCollection
      if (currentCollection === 'tech') categoryName = 'tecnologia'
      
      baseProducts = products.filter(product => 
        product.category === categoryName
      )
    }
    
    // Luego aplicamos el filtro de búsqueda sobre los productos de la categoría actual
    const filtered = baseProducts.filter(product => 
      product.title.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    )
    
    // Pasamos tanto los productos filtrados como la consulta de búsqueda
    setFilteredProducts(filtered, searchQuery)
  }, [searchQuery, products, setFilteredProducts, currentCollection])

  const handleSearch = (e) => {
    e.preventDefault()
    // La búsqueda ya se realiza en el useEffect
  }

  return (
    <div className="search-bar-container">
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-wrapper">
          <div className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Buscar productos" 
            className="search-input" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <div className="search-clear" onClick={() => setSearchQuery('')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default SearchBar