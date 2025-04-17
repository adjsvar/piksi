import React, { useState, useEffect } from 'react';
import MobileNavbar from './MobileNavbar';
import DesktopNavbar from './DesktopNavbar';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Función para identificar el tamaño de pantalla
  const checkScreenSize = () => {
    const width = window.innerWidth;
    setIsMobile(width < 768); // Móvil: < 768px
    setIsTablet(width >= 768 && width < 1024); // Tablet: 768px - 1023px
  };

  // Verificar tamaño de pantalla al montar y en cambios de tamaño
  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Renderizar el navbar apropiado según el tamaño de pantalla
  return isMobile || isTablet ? <MobileNavbar /> : <DesktopNavbar />;
};

export default Navbar;