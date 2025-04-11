import React, { useState, useEffect } from 'react';
import DesktopProductDetail from './DesktopProductDetail';
import MobileProductDetail from './MobileProductDetail';

const ProductDetail = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generateProductData = (id) => {
    const titles = [
      "Smartphone Pro Max Ultra",
      "Laptop Gaming Elite",
      "Auriculares Inalámbricos Premium",
      "Smartwatch Fitness Pro",
      "Tablet Ultra HD",
      "Cámara Mirrorless 4K",
      "Monitor Curvo Gaming",
      "Teclado Mecánico RGB",
      "Ratón Gaming Pro",
      "Altavoz Bluetooth Premium",
      "Proyector 4K HDR",
      "Disco Duro SSD 2TB",
      "Router WiFi 6",
      "Impresora 3D Pro",
      "Drone 4K Pro",
      "Consola Gaming Next-Gen",
      "Controlador Gaming Elite",
      "Micrófono Streaming Pro",
      "Webcam 4K Pro",
      "Monitor Portátil USB-C",
      "Cargador Inalámbrico Fast",
      "Power Bank 20000mAh",
      "Adaptador USB-C Hub",
      "Estación de Carga Magsafe",
      "Funda Smartphone Premium",
      "Soporte Tablet Ajustable",
      "Luz LED RGB Gaming",
      "Ventilador Gaming RGB",
      "Silla Gaming Ergonómica",
      "Escritorio Gaming Ajustable",
      "Monitor Curvo UltraWide",
      "Tarjeta Gráfica RTX Pro",
      "Procesador Gaming Elite",
      "Memoria RAM RGB 32GB",
      "Placa Base Gaming Pro",
      "Fuente de Alimentación Modular",
      "Caja PC Gaming RGB",
      "Refrigeración Líquida RGB",
      "Disipador CPU Gaming",
      "Ventiladores RGB Pack",
      "Cable RGB Extension",
      "Controlador RGB Hub",
      "Panel LED RGB Gaming",
      "Alfombrilla Gaming XL",
      "Soporte Monitor VESA",
      "Brazos Monitor Ajustables",
      "Soporte Laptop Ergonómico",
      "Organizador Cable Gaming",
      "Filtro Anti-Polvo PC",
      "Kit Limpieza Premium"
    ];

    const descriptions = [
      "Experimenta el poder de la tecnología de última generación con este dispositivo premium que redefine los límites de la innovación.",
      "Diseñado para los usuarios más exigentes, este producto combina rendimiento excepcional con un diseño elegante y funcional.",
      "Sumérgete en una experiencia inmersiva con características avanzadas y un rendimiento sin igual en su categoría.",
      "Optimizado para el rendimiento máximo, este dispositivo ofrece una experiencia fluida y sin compromisos.",
      "Con tecnología de punta y materiales premium, este producto está diseñado para durar y superar expectativas.",
      "La combinación perfecta de estilo y funcionalidad, ideal para usuarios que buscan lo mejor en tecnología.",
      "Experimenta la innovación en cada detalle, desde su diseño ergonómico hasta sus características avanzadas.",
      "Diseñado para adaptarse a tu estilo de vida, este producto ofrece versatilidad y rendimiento excepcional.",
      "Conecta con el futuro de la tecnología a través de un dispositivo que combina potencia y elegancia.",
      "Optimizado para ofrecer la mejor experiencia posible, este producto redefine los estándares de su categoría."
    ];

    const categories = [
      "Tecnología", "Gaming", "Audio", "Smart Home",
      "Fotografía", "Video", "Computación", "Accesorios",
      "Móviles", "Tablets", "Monitores", "Periféricos",
      "Componentes", "Almacenamiento", "Redes", "Impresión",
      "Drones", "Consolas", "Audio Pro", "Streaming",
      "Carga", "Iluminación", "Mobiliario", "Organización"
    ];

    const title = titles[id % titles.length];
    const description = descriptions[id % descriptions.length];
    const category = categories[id % categories.length];
    const rating = (Math.random() * 2 + 3).toFixed(1);
    const reviewCount = Math.floor(Math.random() * 1000) + 100;
    const price = (Math.random() * 900 + 100).toFixed(2);

    return {
      title,
      description,
      category,
      rating,
      reviewCount,
      price
    };
  };

  return isMobile ? <MobileProductDetail /> : <DesktopProductDetail />;
};

export default ProductDetail;