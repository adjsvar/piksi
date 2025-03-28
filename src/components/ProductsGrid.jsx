import { useEffect } from 'react'
import { useProducts } from '../context/ProductContext'
import ProductCard from './ProductCard'
import '../styles/ProductsGrid.css'

const ProductsGrid = ({ showNotification }) => {
  const { filteredProducts, currentCollection, showFavorites } = useProducts()

  // Eliminar completamente el título de categoría
  return (
    <main className="main-content" id="homeContent">
      {filteredProducts.length === 0 ? (
        <div className="no-products-message">
          <p>No hay productos disponibles en esta categoría.</p>
          {showFavorites && (
            <p className="no-products-sub">Guarda productos para verlos aquí.</p>
          )}
        </div>
      ) : (
        <div className="pinterest-grid">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="pinterest-item"
            >
              <ProductCard 
                product={product}
                showNotification={showNotification}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default ProductsGrid