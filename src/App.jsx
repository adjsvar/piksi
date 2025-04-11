import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import UserProfile from './components/UserProfile';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Resetear scroll al cambiar de ruta
    window.scrollTo(0, 0);

    // Observar cambios en el DOM para mantener el scroll en la parte superior
    const observer = new MutationObserver(() => {
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    });

    // Configurar el observer para observar cambios en el body
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });

    // Limpiar después de un tiempo para permitir scroll normal
    const timer = setTimeout(() => {
      observer.disconnect();
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;