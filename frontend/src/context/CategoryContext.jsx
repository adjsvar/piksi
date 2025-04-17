import React, { createContext, useState, useContext } from 'react';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    "Todos", "Fiesta para peques", "Cocina", "Color de pintura", 
    "Recetas saludables", "Habitación de los peques", "Cuidado del hogar", 
    "Temas de fotografía", "Sala de juegos", "Estilo de cocina", 
    "Viajes para comidistas", "Electrónica"
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const selectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <CategoryContext.Provider value={{ 
      categories, 
      selectedCategory, 
      selectCategory 
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory debe ser usado dentro de un CategoryProvider');
  }
  return context;
}; 