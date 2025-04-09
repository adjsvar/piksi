import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const categoriesScrollRef = useRef(null);
  const categoriesContainerRef = useRef(null);
  const navigate = useNavigate();

  // Categorías para la segunda fila
  const categories = [
    "Todos", "Fiesta para peques", "Cocina", "Color de pintura", 
    "Recetas saludables", "Habitación de los peques", "Cuidado del hogar", 
    "Temas de fotografía", "Sala de juegos", "Estilo de cocina", 
    "Viajes para comidistas", "Electrónica"
  ];

  // Verificar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Controlar visibilidad de categorías con scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setShowCategories(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Ocultar scrollbar para la fila de categorías
  useEffect(() => {
    if (categoriesScrollRef.current) {
      const style = document.createElement('style');
      style.textContent = `
        #categories-scroll::-webkit-scrollbar {
          display: none;
        }
        #categories-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  // Manejar envío de búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Buscando:', searchQuery);
      // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Manejar clic en categoría
  const handleCategoryClick = (category) => {
    if (category === "Todos") {
      navigate('/');
    } else {
      // Convertir nombre de categoría a formato amigable para URL
      const urlCategory = category.toLowerCase().replace(/ /g, '-');
      navigate(`/category/${urlCategory}`);
    }
  };

  // Manejar mouse hover para mostrar categorías
  const handleMouseEnter = () => {
    if (!showCategories) {
      setShowCategories(true);
    }
  };

  return (
    <div style={styles.navbarContainer}>
      {/* Navbar Principal */}
      <div style={styles.navbar}>
        {/* Logo */}
        <Link to="/" style={styles.logoContainer}>
          <div style={styles.logo}>PIKSI</div>
        </Link>

        {/* Barra de Búsqueda */}
        <form style={styles.searchContainer} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>

        {/* Iconos */}
        <div style={styles.iconsContainer}>
          {/* Icono de Likes */}
          <Link to="/favorites" style={styles.iconLink}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </Link>
          
          {/* Icono de Perfil */}
          <Link to="/profile" style={styles.iconLink}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
        </div>
      </div>

      {/* Área detectora para mostrar categorías al hover */}
      <div 
        style={styles.categoriesHoverDetector} 
        onMouseEnter={handleMouseEnter}
      >
        {/* Fila de Categorías */}
        <div 
          ref={categoriesContainerRef}
          style={{
            ...styles.categoriesContainer,
            height: showCategories ? 'auto' : '0',
            overflow: showCategories ? 'visible' : 'hidden',
            padding: showCategories ? undefined : 0,
            borderWidth: showCategories ? '1px' : '0',
            transition: 'all 0.3s ease'
          }}
        >
          <div 
            id="categories-scroll" 
            ref={categoriesScrollRef} 
            style={styles.categoriesScroll}
          >
            {categories.map((category, index) => (
              <div
                key={index}
                style={styles.categoryItem}
                onClick={() => handleCategoryClick(category)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = styles.categoryItem.color;
                }}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Estilos
const styles = {
  navbarContainer: {
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: 'white',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  },
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1rem',
    backgroundColor: 'white'
  },
  logoContainer: {
    textDecoration: 'none',
    marginRight: '1rem'
  },
  logo: {
    fontWeight: 700,
    fontSize: '1.5rem',
    color: '#3b82f6'
  },
  searchContainer: {
    flex: '1',
    display: 'flex',
    position: 'relative',
    maxWidth: '1000px',
    margin: '0 1rem'
  },
  searchInput: {
    width: '100%',
    padding: '0.5rem 1rem',
    paddingRight: '2.5rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '0.875rem',
    backgroundColor: '#f8fafc'
  },
  searchButton: {
    position: 'absolute',
    right: '0.5rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  iconLink: {
    color: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
    textDecoration: 'none'
  },
  categoriesHoverDetector: {
    width: '100%',
    height: '20px',
    position: 'relative'
  },
  categoriesContainer: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderTop: '1px solid #e2e8f0',
    borderBottom: '1px solid #e2e8f0',
    overflow: 'hidden'
  },
  categoriesScroll: {
    display: 'flex',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    WebkitOverflowScrolling: 'touch',
    padding: '0.5rem 1rem',
    gap: '1rem'
  },
  categoryItem: {
    fontSize: '0.875rem',
    color: '#334155',
    padding: '0.25rem 0.5rem',
    cursor: 'pointer',
    transition: 'color 0.2s',
    whiteSpace: 'nowrap'
  }
};

export default Navbar;