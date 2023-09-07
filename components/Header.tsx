// components/Header.tsx

import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import styles from '../src/app/page.module.css';
import { useAuth } from '../util/auth';

const Header: React.FC = () => {
    const { isAuthenticated, logout } = useAuth(); // You'll implement useAuth later

    const handleLogout = async () => {
    // Implement logout logic (e.g., calling a logout API endpoint)
    try {
      // Replace this with your actual logout API call
      // const response = await fetch('/api/logout', {
      //   method: 'POST',
      // });

      // if (response.ok) {
      //   logout(); // Call the logout function to clear the user's session
      //   router.push('/login'); // Redirect to the login page
      // } else {
      //   // Handle logout error
      // }

      // This is a placeholder, replace with actual logic
      logout(); // Call the logout function to clear the user's session
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <div  className={styles.appbar}>
      <Toolbar >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          JP Express
        </Typography>
        <Link href="/" className={styles['nav-link-container']} passHref>
          <Button color="inherit" className={styles.nav}>Home</Button>
        </Link>
        <Link href="/contact" className={styles['nav-link-container']} passHref>
          <Button color="inherit" className={styles.nav}>Contact</Button>
        </Link>
        {isAuthenticated ? (
          <>
            <Link href="/profile" className={styles['nav-link-container']} passHref>
              <Button color="inherit" className={styles.nav}>Profile</Button>
            </Link>
            <Button color="inherit" className={styles.nav} onClick={handleLogout}>
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" className={styles['nav-link-container']} passHref>
              <Button color="inherit" className={styles.nav}>Login</Button>
            </Link>
            <Link href="/registration" className={styles['nav-link-container']} passHref>
              <Button color="inherit" className={styles.nav}>Registration</Button>
            </Link>
          </>
        )}
      </Toolbar>
    </div>
  );
};

export default Header;
