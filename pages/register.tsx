// pages/register.tsx 
import React from 'react';
import Header from '../components/Header';
import styles from '../src/app/page.module.css';
import RegistrationForm from '../components/RegistrationForm';
import Head from 'next/head';

const RegistrationPage = () => {
  return (
    <div>
    <Head>
      <title>Registration</title>
    </Head>
    <Header />
    <main className={styles.main}>
    <h1 className={styles.h1}>Registration Form</h1>
        <RegistrationForm />
  </main>
    </div>
);
}

export default RegistrationPage;
