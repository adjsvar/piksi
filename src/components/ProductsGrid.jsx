import { useEffect } from 'react'
import { useProducts } from '../context/ProductContext'
import ProductCard from './ProductCard'
import '../styles/ProductsGrid.css'

const ProductsGrid = ({ showNotification }) => {
  const { filteredProducts, currentCollection, showFavorites } = useProducts()

  // Función para obtener el nombre de la categoría para el título
  const getCategoryTitle = () => {
    if (showFavorites) return "Piks"
    
    switch(currentCollection) {
      case 'todos': return "Todos los Productos"
      case 'tech': return "Tecnología"
      case 'cocina': return "Cocina"
      case 'hogar': return "Hogar"
      case 'fitness': return "Fitness"
      case 'mascotas': return "Mascotas"
      case 'viajes': return "Viajes"
      case 'ofertas': return "Ofertas"
      default: return "Todos los Productos"
    }
  }

  return (
    <main className="main-content" id="homeContent">
      <div className="section-title">
        <h2>{getCategoryTitle()}</h2>
      </div>
      
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