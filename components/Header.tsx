'use client'

import React, { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import styles from '../src/app/page.module.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; // Import useRouter for client-side routing
import axios from 'axios'; // Import Axios
import { useUserData } from '../hooks/useUserData';

const Header: React.FC = () => {
  const router = useRouter();
  const { user } = useUserData(); // Use user data from useUserData hook

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Initialize as false

  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const fetchUserData = async () => {
      // Retrieve the user ID from cookies
      const userId = Cookies.get('userId');
      console.log("authenticated", userId)
      // Check if userId is defined
      if (userId) {
        
        setIsAuthenticated(true)
        // try {
        //   // Construct the URL using the retrieved user ID
        //   const apiUrl = `/api/user/${userId}`;

        //   // Make the GET request to fetch user data
        //   const response = await axios.get(apiUrl);

        //   // Set the user data in state
        //   setUserData(response.data);

        //   // Update authentication status to true
        //   setIsAuthenticated(true);

        //   // Log the authentication status
        //   console.log('Authentication Status:', isAuthenticated);
        // } catch (error) {
        //   console.error('Error fetching user data:', error);
        // }
      }
    };

    fetchUserData(); // Call the function to fetch user data
  }, []); // Remove the empty dependency array to fetch user data on each render

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout'); // Use Axios for the logout request

      // Remove the authentication status cookie
      Cookies.remove('userId');

      // Update authentication status to false
      setIsAuthenticated(false);

      console.log('Before redirecting');
      router.push('/login');
      console.log('After redirecting');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <React.Suspense fallback={null}>
      <div className={styles.appbar}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            JP Express
          </Typography>
          {isAuthenticated ? (
            <>
              <Button color="inherit" className={styles['nav-link-container']}>
                <Link href="/" className={styles.nav}>
                  Home
                </Link>
              </Button>
              <Button className={styles['nav-link-container']}>
                <Link href="/contact" className={styles.nav}>
                  Contact
                </Link>
              </Button>
              <Button color="inherit">
                <Link href={`/profile/${user?.userId}`} className={styles.nav}>
                  Profile
                </Link>
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" className={styles['nav-link-container']}>
                <Link href="/" className={styles.nav}>
                  Home
                </Link>
              </Button>
              <Button className={styles['nav-link-container']}>
                <Link href="/contact" className={styles.nav}>
                  Contact
                </Link>
              </Button>
              <Button color="inherit">
                <Link href={`/profile/${user?.userId}`} className={styles.nav}>
                  Profile
                </Link>
              </Button>
              <Button color="inherit">
                <Link href="/register" className={styles.nav}>
                  Register
                </Link>
              </Button> 
              <Button color="inherit">
                <Link href="/login" className={styles.nav}>
                  Log In
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </div>
    </React.Suspense>
  );
};

export default Header;
