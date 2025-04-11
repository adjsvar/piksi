import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  // Estados para datos de usuario
  const [userData, setUserData] = useState({
    username: 'Usuario123',
    fullName: 'Nombre Apellido',
    followers: 1254,
    following: 432,
    posts: 87,
    bio: 'Apasionado por la fotografía y el diseño. Amante de la naturaleza y los viajes.',
    profileImage: 'https://picsum.photos/seed/user123/200/200'
  });

  // Estado para pestañas
  const [activeTab, setActiveTab] = useState('publicaciones');
  
  // Estado para la detección de pantalla
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

  // Función para verificar el tamaño de la pantalla
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 768);
    setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
  };

  // Agregar listener para cambios de tamaño de pantalla
  useEffect(() => {
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Estilos
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: isMobile ? '70px auto 0' : '90px auto 0',
      padding: isMobile ? '0.5rem' : '1rem',
      backgroundColor: '#ffffff'
    },
    header: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'center' : 'flex-start',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      padding: isMobile ? '0.5rem 0' : '1rem 0',
      borderBottom: '1px solid #E2E8F0'
    },
    profileImageContainer: {
      width: isMobile ? '100px' : (isTablet ? '120px' : '150px'),
      height: isMobile ? '100px' : (isTablet ? '120px' : '150px'),
      borderRadius: '50%',
      overflow: 'hidden',
      marginRight: isMobile ? 0 : '2rem',
      marginBottom: isMobile ? '1rem' : 0,
      border: '1px solid #E2E8F0'
    },
    profileImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    userInfo: {
      flex: 1,
      textAlign: isMobile ? 'center' : 'left',
      width: isMobile ? '100%' : 'auto'
    },
    username: {
      fontSize: isMobile ? '1.5rem' : '1.75rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#2D3748'
    },
    statsContainer: {
      display: 'flex',
      gap: isMobile ? '1rem' : '1.5rem',
      marginBottom: '1rem',
      justifyContent: isMobile ? 'center' : 'flex-start'
    },
    statItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    statValue: {
      fontWeight: '600',
      fontSize: isMobile ? '1rem' : '1.1rem',
      color: '#2D3748'
    },
    statLabel: {
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      color: '#718096'
    },
    bio: {
      margin: isMobile ? '0.75rem 0' : '1rem 0',
      color: '#4A5568',
      lineHeight: '1.5'
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'stretch' : 'center',
      gap: isMobile ? '0.5rem' : 0
    },
    actionButton: {
      backgroundColor: '#6B46C1',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: isMobile ? '0.5rem 1rem' : '0.75rem 1.5rem',
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      marginRight: isMobile ? 0 : '1rem',
      width: isMobile ? '100%' : 'auto'
    },
    secondaryButton: {
      backgroundColor: '#EDF2F7',
      color: '#4A5568',
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      padding: isMobile ? '0.5rem 1rem' : '0.75rem 1.5rem',
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      width: isMobile ? '100%' : 'auto'
    },
    tabsContainer: {
      display: 'flex',
      borderBottom: '1px solid #E2E8F0',
      marginBottom: '1.5rem',
      overflowX: isMobile ? 'auto' : 'visible',
      justifyContent: isMobile ? 'flex-start' : 'center'
    },
    tab: {
      padding: isMobile ? '0.75rem 1.5rem' : '1rem 2rem',
      cursor: 'pointer',
      color: '#718096',
      fontWeight: '500',
      borderBottom: '2px solid transparent',
      transition: 'all 0.2s',
      whiteSpace: 'nowrap'
    },
    activeTab: {
      color: '#6B46C1',
      borderBottomColor: '#6B46C1'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : (isTablet ? 'repeat(3, 1fr)' : 'repeat(auto-fill, minmax(250px, 1fr))'),
      gap: isMobile ? '0.5rem' : '1rem',
      marginTop: '1.5rem'
    },
    gridItem: {
      aspectRatio: '1/1',
      borderRadius: isMobile ? '6px' : '8px',
      overflow: 'hidden',
      cursor: 'pointer',
      backgroundColor: '#F7FAFC'
    },
    gridImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s'
    },
    emptyMessage: {
      textAlign: 'center',
      padding: isMobile ? '2rem 0' : '3rem 0',
      color: '#718096',
      fontSize: isMobile ? '1rem' : '1.1rem'
    }
  };

  // Generar publicaciones de muestra
  const generateSamplePosts = () => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: `post-${i}`,
      imageUrl: `https://picsum.photos/seed/post${i}/400/400`
    }));
  };

  const posts = generateSamplePosts();

  // Renderizado condicional según la pestaña activa
  const renderTabContent = () => {
    switch (activeTab) {
      case 'publicaciones':
        return (
          <div style={styles.gridContainer}>
            {posts.map(post => (
              <div key={post.id} style={styles.gridItem}>
                <img 
                  src={post.imageUrl} 
                  alt="Post" 
                  style={styles.gridImage}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        );
      case 'guardados':
        return (
          <div style={styles.emptyMessage}>
            No tienes elementos guardados
          </div>
        );
      case 'etiquetados':
        return (
          <div style={styles.emptyMessage}>
            No has sido etiquetado en ninguna publicación
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.profileImageContainer}>
          <img 
            src={userData.profileImage} 
            alt="Foto de perfil" 
            style={styles.profileImage} 
          />
        </div>
        
        <div style={styles.userInfo}>
          <h1 style={styles.username}>{userData.username}</h1>
          
          <div style={styles.statsContainer}>
            <div style={styles.statItem}>
              <span style={styles.statValue}>{userData.posts}</span>
              <span style={styles.statLabel}>Publicaciones</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statValue}>{userData.followers}</span>
              <span style={styles.statLabel}>Seguidores</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statValue}>{userData.following}</span>
              <span style={styles.statLabel}>Siguiendo</span>
            </div>
          </div>
          
          <div>
            <p style={styles.bio}>{userData.bio}</p>
          </div>
          
          <div style={styles.buttonContainer}>
            <button style={styles.actionButton}>Editar perfil</button>
            <button style={styles.secondaryButton}>Compartir perfil</button>
          </div>
        </div>
      </div>
      
      <div style={styles.tabsContainer}>
        <div 
          style={{
            ...styles.tab, 
            ...(activeTab === 'publicaciones' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('publicaciones')}
        >
          Publicaciones
        </div>
        <div 
          style={{
            ...styles.tab, 
            ...(activeTab === 'guardados' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('guardados')}
        >
          Guardados
        </div>
        <div 
          style={{
            ...styles.tab, 
            ...(activeTab === 'etiquetados' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('etiquetados')}
        >
          Etiquetados
        </div>
      </div>
      
      {renderTabContent()}
    </div>
  );
};

export default UserProfile; 