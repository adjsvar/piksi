import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import '../styles/CollectionsTab.css'

const CollectionsTab = () => {
  const { filterByCollection, showFavorites } = useProducts()
  const location = useLocation()
  const [activeCollection, setActiveCollection] = useState('todos')

  const collections = [
    { 
      id: 'todos', 
      name: 'Todos', 
      color: 'linear-gradient(to right, #4ac6b7, #9370db)',
      posts: '5,000+'
    },
    { 
      id: 'tech', 
      name: 'Tech', 
      color: '#1E90FF',
      posts: '2,500+'
    },
    { 
      id: 'cocina', 
      name: 'Cocina', 
      color: '#FF6347',
      posts: '1,800+'
    },
    { 
      id: 'hogar', 
      name: 'Hogar', 
      color: '#32CD32',
      posts: '3,200+'
    },
    { 
      id: 'fitness', 
      name: 'Fitness', 
      color: '#9370DB',
      posts: '1,500+'
    },
    { 
      id: 'mascotas', 
      name: 'Mascotas', 
      color: '#FF69B4',
      posts: '2,100+'
    },
    { 
      id: 'viajes', 
      name: 'Viajes', 
      color: '#FFD700',
      posts: '1,900+'
    },
    { 
      id: 'ofertas', 
      name: 'Ofertas', 
      color: '#f43f5e',
      posts: '900+'
    }
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
            className={`collection-item ${activeCollection === collection.id && !showFavorites ? 'active' : ''} ${showFavorites ? 'disabled' : ''}`}
            onClick={() => handleCollectionChange(collection.id)}
          >
            <div 
              className="collection-thumbnail"
              style={{ background: collection.color }}
            >
              <div 
                className="collection-color"
              ></div>
              <div className="collection-posts">{collection.posts}</div>
              <div className="collection-name">{collection.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CollectionsTab