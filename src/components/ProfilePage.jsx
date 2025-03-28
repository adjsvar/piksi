import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();

  // Simular carga de datos de usuario
  const user = {
    name: "Félix Hernández",
    email: "felix@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    joinDate: "Abril 2024",
    saved: 15,
    boards: 3
  };

  const handleBackClick = () => {
    navigate(-1); // Volver a la página anterior
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button className="back-button" onClick={handleBackClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1>Mi Perfil</h1>
      </div>
      
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-info">
            <div className="profile-avatar">
              <img src={user.avatar} alt="Avatar de perfil" />
            </div>
            <div className="profile-details">
              <h2>{user.name}</h2>
              <p className="profile-email">{user.email}</p>
              <p className="profile-join-date">Miembro desde {user.joinDate}</p>
            </div>
          </div>
        </div>
        
        <div className="profile-stats-card">
          <h3>Estadísticas</h3>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">{user.saved}</span>
              <span className="stat-label">Productos guardados</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{user.boards}</span>
              <span className="stat-label">Tableros</span>
            </div>
          </div>
        </div>
        
        <div className="profile-actions-card">
          <h3>Acciones</h3>
          <div className="profile-actions">
            <button className="action-button primary-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Editar perfil
            </button>
            <button className="action-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Cerrar sesión
            </button>
          </div>
        </div>
        
        <div className="profile-settings-card">
          <h3>Configuración</h3>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Notificaciones
              </div>
              <label className="switch">
                <input type="checkbox" checked readOnly />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Privacidad
              </div>
              <label className="switch">
                <input type="checkbox" readOnly />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Tema oscuro
              </div>
              <label className="switch">
                <input type="checkbox" readOnly />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="profile-collections-card">
          <h3>Mis tableros</h3>
          <div className="collections-list">
            <div className="collection-item">
              <div className="collection-color" style={{ background: 'linear-gradient(to right, #4ac6b7, #9370db)' }}></div>
              <div className="collection-info">
                <span className="collection-name">Favoritos</span>
                <span className="collection-count">8 productos</span>
              </div>
            </div>
            <div className="collection-item">
              <div className="collection-color" style={{ background: '#1E90FF' }}></div>
              <div className="collection-info">
                <span className="collection-name">Para comprar</span>
                <span className="collection-count">5 productos</span>
              </div>
            </div>
            <div className="collection-item">
              <div className="collection-color" style={{ background: '#FF6347' }}></div>
              <div className="collection-info">
                <span className="collection-name">Regalos</span>
                <span className="collection-count">2 productos</span>
              </div>
            </div>
          </div>
          <button className="new-collection-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Crear nuevo tablero
          </button>
        </div>
        
        <div className="delete-account">
          <button className="delete-account-button">Eliminar cuenta</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;