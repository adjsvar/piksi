import { useState, useEffect } from 'react'
import '../styles/Notification.css'

const Notification = ({ product, boardName, onClose }) => {
  const [isHiding, setIsHiding] = useState(false)

  const handleClose = () => {
    setIsHiding(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  useEffect(() => {
    // Auto hide after 3 seconds
    const timer = setTimeout(() => {
      handleClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`notification ${isHiding ? 'hiding' : ''}`}>
      <div className="notification-icon">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </div>
      <div className="notification-content">
        <p className="notification-title">Piksi guardado</p>
        <p className="notification-subtitle">{product.title}</p>
      </div>
      <div className="notification-close" onClick={handleClose}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
    </div>
  )
}

export default Notification