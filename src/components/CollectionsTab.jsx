import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import '../styles/CollectionsTab.css'

const CollectionsTab = () => {
  const { filterByCollection, showFavorites } = useProducts()
  const location = useLocation()
  const [activeCollection, setActiveCollection] = useState('todos')

  const collections = [
    { id: 'todos', name: 'Todos', color: 'linear-gradient(to right, #4ac6b7, #9370db)' },
    { id: 'tech', name: 'Tech', color: '#1E90FF' },
    { id: 'cocina', name: 'Cocina', color: '#FF6347' },
    { id: 'hogar', name: 'Hogar', color: '#32CD32' },
    { id: 'fitness', name: 'Fitness', color: '#9370DB' },
    { id: 'mascotas', name: 'Mascotas', color: '#FF69B4' },
    { id: 'viajes', name: 'Viajes', color: '#FFD700' },
    { id: 'ofertas', name: 'Ofertas', color: '#f43f5e' }
  ]

  // Si estamos en favoritos, no permitir cambiar la colección
  const handleCollectionChange = (collection) => {
    if (showFavorites) return;
    
    setActiveCollection(collection)
    filterByCollection(collection)
  }
  
  // Resetear la colección activa cuando cambia showFavorites
  useEffect(() => {
    if (!showFavorites) {
      filterByCollection(activeCollection)
    }
  }, [showFavorites, activeCollection, filterByCollection])

  return (
    <div className="collections-tab">
      <div className="collections-container">
        {collections.map(collection => (
          <div 
            key={collection.id}
            className={`collection-item ${showFavorites ? 'disabled' : ''}`}
            onClick={() => handleCollectionChange(collection.id)}
          >
            <div className={`collection-thumbnail ${activeCollection === collection.id && !showFavorites ? 'active' : ''}`}>
              <div 
                className="collection-color" 
                style={{ background: collection.color }}
              ></div>
            </div>
            <div className="collection-name">{collection.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CollectionsTab