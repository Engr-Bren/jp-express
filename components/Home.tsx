// components/Home.tsx
'use client'
import React from 'react';
import styles from '../src/app/page.module.css';

const Header: React.FC = () => {
  return (
    <div className={styles.express}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome to JP Express</h1>
        </header>
        <section className={styles.content}>
          <p>
            JP Express is your one-stop destination for entertainment and more.
          </p>
          <p>
            Explore our latest articles, videos, and much more to keep you entertained.
          </p>
          <button className={styles.exploreButton}>Explore</button>
        </section>
    </div>
  );
};

export default Header;
