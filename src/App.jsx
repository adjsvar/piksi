import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Grid from './components/Grid';
import ProductDetail from './components/ProductDetail';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Grid />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

// Componente para la página de categoría
const CategoryPage = () => {
  const { categoryName } = useParams();
  
  const styles = {
    headerContainer: {
      width: '100%',
      padding: '0.5rem 1rem',
      backgroundColor: '#f8fafc'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0.5rem'
    },
    backButton: {
      background: 'none',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '0.25rem',
      color: '#1e40af',
      fontSize: '0.875rem',
      fontWeight: 500
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#1e293b',
      margin: '0.5rem 0',
      textAlign: 'center'
    }
  };
  
  // Manejar clic en botón de volver
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  
  // Convertir nombre de categoría a formato de título
  const formattedCategoryName = categoryName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return (
    <>
      <div style={styles.headerContainer}>
        <div style={styles.header}>
          <button 
            style={styles.backButton}
            onClick={handleBack}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e2e8f0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Volver
          </button>
        </div>
        
        <h1 style={styles.title}>Productos de {decodeURIComponent(formattedCategoryName)}</h1>
      </div>
      <Grid categoryFilter={decodeURIComponent(categoryName)} />
    </>
  );
};

// No olvides importar estos hooks
import { useParams, useNavigate } from 'react-router-dom';

export default App;