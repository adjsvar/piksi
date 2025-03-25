import { useProducts } from '../context/ProductContext'
import ProductCard from './ProductCard'
import '../styles/ProductsGrid.css'

const ProductsGrid = ({ showNotification }) => {
  const { filteredProducts } = useProducts()

  return (
    <main className="main-content" id="homeContent">
      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            showNotification={showNotification} 
          />
        ))}
      </div>
    </main>
  )
}

export default ProductsGrid