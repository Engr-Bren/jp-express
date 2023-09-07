// pages/index.js

import React from 'react';
import './page.module.css';
import Header from '../../components/Header';
import Express from '../../components/Home';
import styles from './page.module.css';

export default function Home() {
  return (
  <div style={{ margin: '8px' }}>
    <Header />
    <main className={styles.main}>
    <Express />
  </main>
  </div>
);
}
