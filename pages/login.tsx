// pages/login.tsx
'use client'
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import styles from '../src/app/page.module.css';
import Head from 'next/head';

const LoginPage = () => {

  return (
    <div>
      <Head>
        <title>Log-In</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <LoginForm />
      </main>
    </div>
  );
};

export default LoginPage;
