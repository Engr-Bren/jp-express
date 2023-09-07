// components/Header.tsx

import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import styles from '../src/app/page.module.css';

const Header: React.FC = () => {
  return (
    <div  className={styles.appbar}>
      <Toolbar >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          JP Express
        </Typography>
        <Button color="inherit" className={styles['nav-link-container']}>
          <Link href="/" className={styles.nav}>Home</Link>
        </Button>
        <Button className={styles['nav-link-container']}>
          <Link href="/contact" className={styles.nav}>Contact</Link>
        </Button>
        <Button color="inherit" >
          <Link href="/register" className={styles.nav}>Register</Link>
        </Button>
        <Button color="inherit">
          <Link href="/login" className={styles.nav}>Log In</Link>
        </Button>
      </Toolbar>
    </div>
  );
};

export default Header;
