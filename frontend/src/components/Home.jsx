import React, { useState, useEffect } from 'react';
import Grid from './Grid';

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const styles = {
    homeContainer: {
      marginTop: isMobile ? '60px' : '120px',
      minHeight: '100vh'
    }
  };

  return (
    <div style={styles.homeContainer}>
      <Grid />
    </div>
  );
};

export default Home; 