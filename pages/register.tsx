import React from 'react';
import Header from '../components/Header';
import styles from '../src/app/page.module.css';
import RegistrationForm from '../components/RegistrationForm';

const Home: React.FC = () => {
  return (
    <div>
    <Header />
    <main className={styles.main}>
    <h1 className={styles.h1}>Registration Form</h1>
        <RegistrationForm />
  </main>
    </div>
);
}

export default Home;
