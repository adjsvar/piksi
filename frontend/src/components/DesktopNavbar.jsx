import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DesktopNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const categoriesScrollRef = useRef(null);
  const navbarRef = useRef(null);
  const navigate = useNavigate();

  // Categorías
  const categories = [
    "Todos", "Trending", "Para ti", "Tecnología", 
    "Moda", "Hogar", "Deportes"
  ];

  // Estilos
  const styles = {
    navbarContainer: {
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    navbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.5rem 1rem',
      backgroundColor: '#ffffff',
      margin: '0 auto',
      height: '60px',
      maxWidth: '1400px'
    },
    logoContainer: {
      textDecoration: 'none',
      flex: '0 0 auto',
      marginLeft: '0'
    },
    logo: {
      fontWeight: 700,
      fontSize: '2.5rem',
      background: 'linear-gradient(45deg, #6B46C1, #00C9A7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '-0.5px'
    },
    searchContainer: {
      flex: 1,
      display: 'flex',
      position: 'relative',
      width: '100%',
      margin: '0 1rem',
      backgroundColor: '#f0f2f5',
      borderRadius: '20px',
      padding: '0.35rem 1rem'
    },
    searchInput: {
      width: '100%',
      padding: '0.35rem',
      border: 'none',
      fontSize: '0.95rem',
      backgroundColor: 'transparent',
      outline: 'none'
    },
    searchButton: {
      position: 'absolute',
      right: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#6B46C1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.25rem',
      pointerEvents: 'none',
      userSelect: 'none'
    },
    iconsContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      flex: '0 0 auto',
      marginRight: '0'
    },
    iconLink: {
      color: '#4A5568',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.4rem',
      transition: 'all 0.2s ease',
      textDecoration: 'none'
    },
    categoriesContainer: {
      width: '100%',
      backgroundColor: '#ffffff',
      padding: '0.35rem 0',
      display: showCategories ? 'block' : 'none'
    },
    categoriesScroll: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: '0.35rem 1rem',
      maxWidth: '1400px',
      margin: '0 auto',
      gap: '1.25rem',
      justifyContent: 'center'
    },
    categoryItem: {
      padding: '0.35rem 0.75rem',
      fontSize: '0.9rem',
      color: '#4A5568',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      borderBottom: '2px solid transparent'
    },
    selectedCategory: {
      background: 'linear-gradient(45deg, #6B46C1, #00C9A7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      borderBottom: 'none',
      borderRadius: '20px',
      padding: '0.35rem 0.75rem',
      backgroundColor: 'rgba(107, 70, 193, 0.1)'
    }
  };

  // Controlar visibilidad de categorías con scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const isScrollingUp = currentScrollY < lastScrollY;
      
      if (isScrollingDown && currentScrollY > 50) {
        const navbarElement = navbarRef.current;
        if (navbarElement && !navbarElement.matches(':hover')) {
          setShowCategories(false);
        }
      } else if (isScrollingUp) {
        setShowCategories(true);
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

  // Manejar clic en categoría
  const handleCategoryClick = (category) => {
    if (category === "Todos") {
      navigate('/');
    } else {
      const urlCategory = category.toLowerCase().replace(/ /g, '-');
      navigate(`/category/${urlCategory}`);
    }
  };

  // Mostrar categorías al hacer hover sobre el navbar
  const handleMouseEnter = () => {
    setShowCategories(true);
  };

  // Ocultar categorías al quitar el hover
  const handleMouseLeave = () => {
    const isScrollingDown = window.scrollY > lastScrollY;
    if (isScrollingDown && window.scrollY > 50) {
      setShowCategories(false);
    }
  };

  return (
    <div 
      ref={navbarRef} 
      style={styles.navbarContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={styles.navbar}>
        <div style={styles.logoContainer}>
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            style={styles.logo}
          >
            <span style={styles.logoText}>Piksi</span>
          </a>
        </div>

        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <div style={styles.searchButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        <div style={styles.iconsContainer}>
          <Link to="/favorites" style={styles.iconLink}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </Link>
          
          <Link to="/profile" style={styles.iconLink}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
        </div>
      </div>

      {showCategories && (
        <div style={styles.categoriesContainer}>
          <div 
            id="categories-scroll" 
            ref={categoriesScrollRef} 
            style={styles.categoriesScroll}
          >
            {categories.map((category, index) => (
              <div
                key={index}
                style={{
                  ...styles.categoryItem,
                  ...(window.location.pathname === `/${category.toLowerCase()}` && styles.selectedCategory)
                }}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopNavbar; 